"use client";

import React, {
  useRef,
  useLayoutEffect,
  useState,
  useCallback,
} from "react";
import { cn, type StyleValue } from "@/lib/utils";
import { type StylesProp, createStylesResolver } from "@/lib/styles";
import css from "./Scroll.module.css";
import {
  SCROLL_RESTORE_AXIS_ATTR,
  SCROLL_RESTORE_DEBUG_ID_KEY,
  SCROLL_RESTORE_FLAG,
  SCROLL_RESTORE_STORAGE_KEY_ATTR,
  getBootstrapRestoredNode,
  getScrollRestoreDebugId,
  getScrollRestoreMetrics,
  getScrollPositionProperty,
  recordScrollRestoreTrace,
} from "./scripts/restore-scroll.constants";

interface ScrollStyleSlots {
  root?: StyleValue;
  content?: StyleValue;
  track?: StyleValue;
  thumb?: StyleValue;
  horizontal?: StyleValue;
  vertical?: StyleValue;
}

type ScrollStylesProp = StylesProp<ScrollStyleSlots>;

export interface ScrollProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  maxHeight?: string;
  maxWidth?: string;
  direction?: "vertical" | "horizontal";
  paddingY?: string | number;
  "fade-y"?: boolean;
  fadeDistance?: number;
  fadeSize?: number;
  enabled?: boolean;
  hide?: boolean;
  inline?: boolean;
  styles?: ScrollStylesProp;
  storageKey?: string;
}

const resolveScrollBaseStyles = createStylesResolver([
  "root",
  "content",
  "track",
  "thumb",
  "horizontal",
  "vertical",
] as const);

function readStoredScrollOffset(storageKey: string): number | null {
  if (typeof window === "undefined") return null;

  try {
    const storedValue = window.sessionStorage.getItem(storageKey);
    if (storedValue === null) return null;

    const parsedValue = parseInt(storedValue, 10);
    return Number.isNaN(parsedValue) ? null : parsedValue;
  } catch {
    return null;
  }
}

function persistStoredScrollOffset(storageKey: string, scrollOffset: number): void {
  if (typeof window === "undefined") return;

  try {
    window.sessionStorage.setItem(storageKey, String(scrollOffset));
  } catch {
    // Ignore storage failures. The live scroll position is already updated.
  }
}

function hasPreHydrationScrollRestore(node: HTMLDivElement): boolean {
  return Boolean((node as HTMLDivElement & Record<string, unknown>)[SCROLL_RESTORE_FLAG]);
}

const Scroll = React.forwardRef<HTMLDivElement, ScrollProps>(
  (
    {
      children,
      className,
      maxHeight = "100%",
      maxWidth = "100%",
      direction = "vertical",
      paddingY = 4,
      "fade-y": fadeY = false,
      fadeDistance = 5,
      fadeSize = 4,
      enabled = true,
      hide = true,
      inline = false,
      styles,
      storageKey,
      style: propsStyle,
      ...restProps
    },
    ref,
  ) => {
    const isHoriz = direction === "horizontal";

    // Axis-Agnostic property keys
    const clientSizeKey = isHoriz ? "clientWidth" : "clientHeight";
    const scrollSizeKey = isHoriz ? "scrollWidth" : "scrollHeight";
    const scrollPosKey = getScrollPositionProperty(direction);
    const clientPosKey = isHoriz ? "clientX" : "clientY";
    const trackSizeKey = isHoriz ? "width" : "height";
    const trackPosKey = isHoriz ? "left" : "top";

    const numPaddingY = typeof paddingY === "number" ? paddingY : parseInt(String(paddingY), 10) || 0;
    const strPaddingY = typeof paddingY === "number" ? `${paddingY}px` : String(paddingY);

    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const thumbRef = useRef<HTMLDivElement>(null);
    const mergedRef = useMergedRef(ref, containerRef);

    const resolved = resolveScrollBaseStyles(styles);

    const [needsScrollbar, setNeedsScrollbar] = useState(false);
    const [isHoveredRight, setIsHoveredRight] = useState(false);
    const [thumbSize, setThumbSize] = useState(0);
    const [thumbPosition, setThumbPosition] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [isScrolling, setIsScrolling] = useState(false);

    const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const dragStartRef = useRef({ origin: 0, scrollOrigin: 0 });
    const thumbSizeRef = useRef(0);
    const resizeObserverRef = useRef<ResizeObserver | null>(null);
    const mutationObserverRef = useRef<MutationObserver | null>(null);

    const updateScrollbar = useCallback(() => {
      if (!containerRef.current || !contentRef.current) return;

      const container = containerRef.current;
      const content = contentRef.current;

      const containerSize = container[clientSizeKey];
      const contentSize = content[scrollSizeKey] || containerSize;
      const currentScroll = content[scrollPosKey];
      const trackSize = isHoriz ? containerSize : containerSize - numPaddingY * 2;

      const needs = contentSize > containerSize;
      setNeedsScrollbar(needs);

      const scrollRatio = trackSize / Math.max(1, contentSize);
      const newThumbSize = Math.max(20, Math.min(trackSize, trackSize * scrollRatio));
      const maxScroll = contentSize - containerSize;
      const scrollProgress = needs ? currentScroll / maxScroll : 0;
      const maxThumbPos = trackSize - newThumbSize;
      const newThumbPos = scrollProgress * maxThumbPos;

      setThumbSize(newThumbSize);
      thumbSizeRef.current = newThumbSize;
      setThumbPosition(newThumbPos);

      if (!isHoriz && fadeY && needs) {
        const topP = Math.min(1, Math.max(0, currentScroll / fadeDistance));
        const botP = Math.min(1, Math.max(0, (maxScroll - currentScroll) / fadeDistance));
        const gradient = `linear-gradient(to bottom, transparent 0%, black ${topP * fadeSize}%, black ${100 - botP * fadeSize}%, transparent 100%)`;
        content.style.maskImage = gradient;
        content.style.webkitMaskImage = gradient;
      } else if (!isHoriz) {
        content.style.maskImage = "";
        content.style.webkitMaskImage = "";
      }
    }, [isHoriz, clientSizeKey, scrollSizeKey, scrollPosKey, numPaddingY, fadeY, fadeDistance, fadeSize]);

    const cleanupScrollTimeout = useCallback(() => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
        scrollTimeoutRef.current = null;
      }
    }, []);

    const cleanupObservers = useCallback(() => {
      resizeObserverRef.current?.disconnect();
      mutationObserverRef.current?.disconnect();
      resizeObserverRef.current = null;
      mutationObserverRef.current = null;
    }, []);

    const cleanupDragListeners = useCallback(() => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.body.style.userSelect = "";
    }, []);

    const restoreStoredScrollPosition = useCallback(() => {
      if (!storageKey || !contentRef.current) return;

      const contentNode = contentRef.current;
      const bootstrapNode = getBootstrapRestoredNode(storageKey);
      const sameNodeAsBootstrap = Boolean(bootstrapNode) && bootstrapNode === contentNode;
      const currentNodeId = getScrollRestoreDebugId(contentNode);
      const bootstrapNodeId = getScrollRestoreDebugId(bootstrapNode);
      const beforeMetrics = getScrollRestoreMetrics(contentNode, direction);
      const hasPreHydrationRestore = hasPreHydrationScrollRestore(contentNode);

      recordScrollRestoreTrace("client:layout-effect", {
        storageKey,
        hasPreHydrationRestore,
        sameNodeAsBootstrap,
        nodeReplaced: Boolean(bootstrapNode) && bootstrapNode !== contentNode,
        currentNodeId,
        bootstrapNodeId,
        clientSize: beforeMetrics.clientSize,
        scrollSize: beforeMetrics.scrollSize,
        maxScroll: beforeMetrics.maxScroll,
        scrollOffset: beforeMetrics.scrollOffset,
      });

      if (hasPreHydrationRestore) {
        recordScrollRestoreTrace("client:skip-prehydrated", {
          storageKey,
          sameNodeAsBootstrap,
          nodeReplaced: Boolean(bootstrapNode) && bootstrapNode !== contentNode,
          currentNodeId,
          bootstrapNodeId,
        });
        return;
      }

      const savedOffset = readStoredScrollOffset(storageKey);
      if (savedOffset === null) {
        recordScrollRestoreTrace("client:no-stored-offset", {
          storageKey,
          sameNodeAsBootstrap,
          nodeReplaced: Boolean(bootstrapNode) && bootstrapNode !== contentNode,
          currentNodeId,
          bootstrapNodeId,
        });
        return;
      }

      contentNode[scrollPosKey] = savedOffset;

      const afterMetrics = getScrollRestoreMetrics(contentNode, direction);
      recordScrollRestoreTrace("client:fallback-restore", {
        storageKey,
        storedOffset: savedOffset,
        sameNodeAsBootstrap,
        nodeReplaced: Boolean(bootstrapNode) && bootstrapNode !== contentNode,
        currentNodeId,
        bootstrapNodeId,
        beforeScrollOffset: beforeMetrics.scrollOffset,
        afterScrollOffset: afterMetrics.scrollOffset,
        clientSize: afterMetrics.clientSize,
        scrollSize: afterMetrics.scrollSize,
        maxScroll: afterMetrics.maxScroll,
        clamped: savedOffset !== afterMetrics.scrollOffset,
        clampedToZero: savedOffset > 0 && afterMetrics.scrollOffset === 0,
      });
    }, [direction, scrollPosKey, storageKey]);

    const connectObservers = useCallback(() => {
      cleanupObservers();
      updateScrollbar();

      const resizeObserver = new ResizeObserver(() => requestAnimationFrame(updateScrollbar));
      const mutationObserver = new MutationObserver(() => requestAnimationFrame(updateScrollbar));

      if (containerRef.current) resizeObserver.observe(containerRef.current);
      if (contentRef.current) {
        resizeObserver.observe(contentRef.current);
        mutationObserver.observe(contentRef.current, { childList: true, subtree: true });
      }

      resizeObserverRef.current = resizeObserver;
      mutationObserverRef.current = mutationObserver;
    }, [cleanupObservers, updateScrollbar]);

    const handleContentRef = useCallback(
      (node: HTMLDivElement | null) => {
        contentRef.current = node;
        if (!node) {
          cleanupObservers();
          cleanupDragListeners();
          cleanupScrollTimeout();
          return;
        }

        recordScrollRestoreTrace("client:content-ref", {
          storageKey: storageKey ?? null,
          currentNodeId: getScrollRestoreDebugId(node),
          preHydrationFlag: hasPreHydrationScrollRestore(node),
          bootstrapDebugId: storageKey ? getScrollRestoreDebugId(getBootstrapRestoredNode(storageKey)) : null,
          debugIdPropertyKey: SCROLL_RESTORE_DEBUG_ID_KEY,
        });
        connectObservers();
      },
      [cleanupDragListeners, cleanupObservers, cleanupScrollTimeout, connectObservers, storageKey]
    );

    const handleScroll = useCallback(() => {
      updateScrollbar();
      if (storageKey && contentRef.current) {
        persistStoredScrollOffset(storageKey, contentRef.current[scrollPosKey]);
      }
      setIsScrolling(true);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => setIsScrolling(false), 1500);
    }, [updateScrollbar, storageKey, scrollPosKey]);

    const handleContainerMouseMove = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const mousePos = isHoriz ? e.clientY - rect.top : e.clientX - rect.left;
        const rectSize = isHoriz ? rect.height : rect.width;

        const newIsHovered = mousePos > rectSize - 20;
        if (newIsHovered !== isHoveredRight) setIsHoveredRight(newIsHovered);
      },
      [isHoriz, isHoveredRight]
    );

    const handleContainerMouseLeave = useCallback(() => setIsHoveredRight(false), []);

    const handleMouseMove = useCallback(
      (e: MouseEvent) => {
        if (!contentRef.current || !containerRef.current) return;

        const delta = e[clientPosKey] - dragStartRef.current.origin;
        const containerSize = containerRef.current[clientSizeKey];
        const maxScroll = contentRef.current[scrollSizeKey] - containerSize;
        const scrollRatio = maxScroll / (containerSize - thumbSizeRef.current);

        contentRef.current[scrollPosKey] = Math.max(
          0,
          Math.min(maxScroll, dragStartRef.current.scrollOrigin + delta * scrollRatio)
        );
      },
      [clientPosKey, clientSizeKey, scrollPosKey, scrollSizeKey]
    );

    const handleMouseUp = useCallback(() => {
      setIsDragging(false);
      cleanupDragListeners();
    }, [cleanupDragListeners]);

    const handleMouseDown = useCallback(
      (e: React.MouseEvent) => {
        if (!contentRef.current) return;
        e.preventDefault();

        dragStartRef.current = {
          origin: e[clientPosKey],
          scrollOrigin: contentRef.current[scrollPosKey],
        };
        setIsDragging(true);
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
        document.body.style.userSelect = "none";
      },
      [clientPosKey, scrollPosKey, handleMouseMove, handleMouseUp]
    );

    const handleTrackClick = useCallback(
      (e: React.MouseEvent) => {
        if (!containerRef.current || !contentRef.current || !thumbRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const thumbRect = thumbRef.current.getBoundingClientRect();
        const rectStartKey = isHoriz ? "left" : "top";
        const rectEndKey = isHoriz ? "right" : "bottom";
        const padOffset = isHoriz ? 0 : numPaddingY;

        const clickPos = e[clientPosKey] - rect[rectStartKey] - padOffset;
        const relThumbStart = thumbRect[rectStartKey] - rect[rectStartKey] - padOffset;
        const relThumbEnd = thumbRect[rectEndKey] - rect[rectStartKey] - padOffset;

        // Ignore clicks directly on the thumb (handled by handleMouseDown)
        if (clickPos >= relThumbStart && clickPos <= relThumbEnd) return;

        const containerSize = containerRef.current[clientSizeKey];
        const contentSize = contentRef.current[scrollSizeKey];
        const maxScroll = contentSize - containerSize;
        const trackSize = isHoriz ? containerSize : containerSize - numPaddingY * 2;

        const newThumbSize = Math.max(20, trackSize * (trackSize / contentSize));
        const targetThumbStart = clickPos - newThumbSize / 2;
        const maxThumbPos = trackSize - newThumbSize;
        const clampedThumbStart = Math.max(0, Math.min(maxThumbPos, targetThumbStart));

        const scrollProgress = clampedThumbStart / maxThumbPos;
        contentRef.current[scrollPosKey] = Math.max(0, Math.min(maxScroll, scrollProgress * maxScroll));

        dragStartRef.current = {
          origin: e[clientPosKey],
          scrollOrigin: contentRef.current[scrollPosKey],
        };
        setIsDragging(true);
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
        document.body.style.userSelect = "none";
      },
      [isHoriz, numPaddingY, clientPosKey, clientSizeKey, scrollPosKey, scrollSizeKey, handleMouseMove, handleMouseUp]
    );

    const handleWheel = useCallback(
      (e: React.WheelEvent) => {
        if (!contentRef.current || !isHoriz) return;
        e.preventDefault();

        const content = contentRef.current;
        const scrollAmount = e.deltaY || e.deltaX;
        const maxScroll = content.scrollWidth - content.clientWidth;

        content.scrollLeft = Math.max(0, Math.min(maxScroll, content.scrollLeft + scrollAmount));
      },
      [isHoriz]
    );

    useLayoutEffect(() => {
      restoreStoredScrollPosition();
      connectObservers();
    }, [restoreStoredScrollPosition, connectObservers, enabled]);

    if (!enabled) {
      return (
        <div
          ref={ref}
          className={cn("scroll", css.root, resolved.root, className)}
          style={{
            [isHoriz ? "width" : "height"]: "100%",
            [isHoriz ? "maxWidth" : "maxHeight"]: isHoriz ? maxWidth : maxHeight,
            ...propsStyle,
          }}
          {...restProps}
        >
          {children}
        </div>
      );
    }

    const showOpacity = !hide || (needsScrollbar && (isHoveredRight || isDragging || isScrolling)) ? 1 : 0;

    return (
      <div
        ref={mergedRef}
        className={cn(
          "scroll",
          css.root,
          isHoriz ? css.horizontal : css.vertical,
          className,
          resolved.root,
          isHoriz ? resolved.horizontal : resolved.vertical
        )}
        style={{
          [isHoriz ? "width" : "height"]: "100%",
          [isHoriz ? "maxWidth" : "maxHeight"]: isHoriz ? maxWidth : maxHeight,
          ...(!isHoriz && strPaddingY ? { "--scroll-padding-y": strPaddingY } : {}),
          ...propsStyle,
        } as React.CSSProperties}
        onMouseMove={handleContainerMouseMove}
        onMouseLeave={handleContainerMouseLeave}
        data-dragging={String(isDragging)}
        data-inline={String(inline)}
        {...restProps}
      >
        <div
          ref={handleContentRef}
          className={cn(css.content, resolved.content)}
          onScroll={handleScroll}
          onWheel={isHoriz ? handleWheel : undefined}
          style={{ [isHoriz ? "maxWidth" : "maxHeight"]: "inherit" }}
          {...(storageKey
            ? {
              [SCROLL_RESTORE_STORAGE_KEY_ATTR]: storageKey,
              [SCROLL_RESTORE_AXIS_ATTR]: direction,
            }
            : {})}
        >
          {children}
        </div>

        <div
          className={cn(css.track, resolved.track)}
          data-hide={String(hide)}
          style={{
            opacity: showOpacity,
            pointerEvents: needsScrollbar ? "auto" : "none",
          }}
          onMouseDown={handleTrackClick}
        >
          {(needsScrollbar || !hide) && (
            <div
              ref={thumbRef}
              className={cn(css.thumb, resolved.thumb)}
              style={{
                [trackSizeKey]: `${thumbSize}px`,
                [trackPosKey]: `${thumbPosition}px`,
              }}
              onMouseDown={handleMouseDown}
            />
          )}
        </div>
      </div>
    );
  }
);

Scroll.displayName = "Scroll";

function useMergedRef<T>(...refs: (React.Ref<T> | undefined)[]): React.RefCallback<T> {
  return (value: T) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") ref(value);
      else if (ref && typeof ref === "object") (ref as React.MutableRefObject<T | null>).current = value;
    });
  };
}

export { Scroll };
