"use client";

import React, {
  useRef,
  useLayoutEffect,
  useState,
  useCallback,
} from "react";
import { cn, type StyleValue } from "@/lib/utils";
import { type StylesProp, createStylesResolver } from "@/lib/styles";
import { Mask } from "../Mask";
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

export interface ScrollStyleSlots {
  root?: StyleValue;
  content?: StyleValue;
  track?: StyleValue;
  thumb?: StyleValue;
}

export type ScrollStylesProp = StylesProp<ScrollStyleSlots>;

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
] as const);

function resolveScrollStyles(styles: ScrollStylesProp | undefined) {
  if (!styles || typeof styles === 'string' || Array.isArray(styles)) return resolveScrollBaseStyles(styles);
  const { root, content, track, thumb } = styles;
  return resolveScrollBaseStyles({ root, content, track, thumb });
}

const SCROLLBAR_VISIBILITY_EPSILON = 1;

function getInitialScrollFadeVars(
  direction: ScrollProps["direction"],
  fadeY: boolean,
  fadeSize: number,
): React.CSSProperties {
  if (direction !== "vertical" || !fadeY) {
    return {
      "--mask-top-fade": "0%",
      "--mask-bottom-fade": "0%",
    } as React.CSSProperties;
  }

  // SSR cannot know overflow or scroll position, so default to a bottom-only hint.
  return {
    "--mask-top-fade": "0%",
    "--mask-bottom-fade": `${fadeSize}%`,
  } as React.CSSProperties;
}

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
      maxHeight,
      maxWidth,
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
    const maskRef = useRef<HTMLDivElement>(null);
    const thumbRef = useRef<HTMLDivElement>(null);
    const mergedRef = useMergedRef(ref, containerRef);

    const resolved = resolveScrollStyles(styles);

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

      const viewportSize = content[clientSizeKey] || container[clientSizeKey];
      const contentSize = content[scrollSizeKey] || viewportSize;
      const currentScroll = content[scrollPosKey];
      const trackSize = isHoriz ? container[clientSizeKey] : container[clientSizeKey] - numPaddingY * 2;

      const maxScroll = Math.max(0, contentSize - viewportSize);
      const needs = maxScroll > SCROLLBAR_VISIBILITY_EPSILON;
      setNeedsScrollbar(needs);

      const scrollRatio = trackSize / Math.max(1, contentSize);
      const newThumbSize = Math.max(20, Math.min(trackSize, trackSize * scrollRatio));
      const scrollProgress = needs && maxScroll > 0 ? currentScroll / maxScroll : 0;
      const maxThumbPos = trackSize - newThumbSize;
      const newThumbPos = scrollProgress * maxThumbPos;

      setThumbSize(newThumbSize);
      thumbSizeRef.current = newThumbSize;
      setThumbPosition(newThumbPos);

      if (!isHoriz && maskRef.current) {
        const maskNode = maskRef.current;
        if (fadeY && needs) {
          const topP = Math.min(1, Math.max(0, currentScroll / fadeDistance));
          const botP = Math.min(1, Math.max(0, (maxScroll - currentScroll) / fadeDistance));
          maskNode.style.setProperty("--mask-top-fade", `${topP * fadeSize}%`);
          maskNode.style.setProperty("--mask-bottom-fade", `${botP * fadeSize}%`);
        } else {
          maskNode.style.setProperty("--mask-top-fade", "0%");
          maskNode.style.setProperty("--mask-bottom-fade", "0%");
        }
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
        const viewportSize = contentRef.current[clientSizeKey] || containerRef.current[clientSizeKey];
        const maxScroll = Math.max(0, contentRef.current[scrollSizeKey] - viewportSize);
        const scrollRatio = maxScroll / Math.max(1, viewportSize - thumbSizeRef.current);

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

        const viewportSize = contentRef.current[clientSizeKey] || containerRef.current[clientSizeKey];
        const contentSize = contentRef.current[scrollSizeKey];
        const maxScroll = Math.max(0, contentSize - viewportSize);
        const trackSize = isHoriz
          ? containerRef.current[clientSizeKey]
          : containerRef.current[clientSizeKey] - numPaddingY * 2;

        const newThumbSize = Math.max(20, trackSize * (trackSize / contentSize));
        const targetThumbStart = clickPos - newThumbSize / 2;
        const maxThumbPos = trackSize - newThumbSize;
        const clampedThumbStart = Math.max(0, Math.min(maxThumbPos, targetThumbStart));

        const scrollProgress = maxThumbPos > 0 ? clampedThumbStart / maxThumbPos : 0;
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

    const axisConstraintStyle = {
      ...(isHoriz
        ? (maxWidth ? { maxWidth } : {})
        : (maxHeight ? { maxHeight } : {})),
    };

    if (!enabled) {
      return (
        <div
          ref={ref}
          className={cn("scroll", css.root, resolved.root, className)}
          style={{
            [isHoriz ? "width" : "height"]: "100%",
            ...axisConstraintStyle,
            ...propsStyle,
          }}
          {...restProps}
        >
          {children}
        </div>
      );
    }

    const showOpacity = needsScrollbar && (!hide || isHoveredRight || isDragging || isScrolling) ? 1 : 0;

    return (
      <div
        ref={mergedRef}
        className={cn(
          "scroll",
          css.root,
          isHoriz ? css.horizontal : css.vertical,
          className,
          resolved.root
        )}
        style={{
          [isHoriz ? "width" : "height"]: "100%",
          ...axisConstraintStyle,
          ...(!isHoriz && strPaddingY ? { "--scroll-padding-y": strPaddingY } : {}),
          ...propsStyle,
        } as React.CSSProperties}
        onMouseMove={handleContainerMouseMove}
        onMouseLeave={handleContainerMouseLeave}
        data-pressed={isDragging || undefined}
        data-inline={String(inline && needsScrollbar)}
        {...restProps}
      >
        <Mask
          ref={maskRef}
          style={{
            [isHoriz ? "maxWidth" : "maxHeight"]: "inherit",
            overflow: "hidden",
            ...getInitialScrollFadeVars(direction, fadeY, fadeSize),
          } as React.CSSProperties}
        >
          {!isHoriz && fadeY ? <Mask.Fade /> : null}
          <div
            ref={handleContentRef}
            className={cn(css.content, resolved.content)}
            onScroll={handleScroll}
            onWheel={isHoriz ? handleWheel : undefined}
            style={{
              [isHoriz ? "maxWidth" : "maxHeight"]: "inherit",
              minHeight: 0,
              minWidth: 0,
            }}
            {...(storageKey
              ? {
                [SCROLL_RESTORE_STORAGE_KEY_ATTR]: storageKey,
                [SCROLL_RESTORE_AXIS_ATTR]: direction,
              }
              : {})}
          >
            {children}
          </div>
        </Mask>

        <div
          className={cn("scroll", "track", css.track, resolved.track)}
          data-hide={String(hide)}
          style={{
            opacity: showOpacity,
            pointerEvents: needsScrollbar ? "auto" : "none",
          }}
          onMouseDown={handleTrackClick}
        >
          {needsScrollbar && (
            <div
              ref={thumbRef}
              className={cn("scroll", "thumb", css.thumb, resolved.thumb)}
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
