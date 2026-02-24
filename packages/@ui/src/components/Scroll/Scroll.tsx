"use client";

import React, { useRef, useLayoutEffect, useState, useCallback, useEffect } from "react";
import { cn } from "@/lib/utils";
import styles from "./Scroll.module.css";

export interface ScrollProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Content to render inside the scroll container */
  children: React.ReactNode;
  /** Maximum height before scrolling becomes active */
  maxHeight?: string;
  /** Maximum width before scrolling becomes active */
  maxWidth?: string;
  /** Scroll direction */
  direction?: "vertical" | "horizontal";
  /** Padding on the top and bottom of the scrollbar track in pixels */
  paddingY?: string | number;
  /** Whether to apply a fade mask at the top and bottom scroll edges */
  fadeY?: boolean;
  /** Pixels scrolled before the fade mask begins to appear */
  fadeDistance?: number;
  /** Percentage of container height used for the fade gradient */
  fadeSize?: number;
  /** Whether to render the custom scrollbar; when false, renders children without scroll */
  enabled?: boolean;
  /** Whether to hide the scrollbar when not actively scrolling */
  hide?: boolean;
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
      fadeY = false,
      fadeDistance = 5,
      fadeSize = 4,
      enabled = true,
      hide = true,
      ...props
    },
    ref
  ) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const internalContentRef = useRef<HTMLDivElement>(null);
    const contentRef = internalContentRef;
    const thumbRef = useRef<HTMLDivElement>(null);
    const childrenRef = useRef(children);
    const mergedRef = useMergedRef(ref, containerRef);

    const [needsScrollbar, setNeedsScrollbar] = useState(false);
    const [isHoveredRight, setIsHoveredRight] = useState(false);
    const [thumbSize, setThumbSize] = useState(0);
    const [thumbPosition, setThumbPosition] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ origin: 0, scrollOrigin: 0 });
    const [isScrolling, setIsScrolling] = useState(false);
    const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const updateScrollbar = useCallback(() => {
      if (!containerRef.current || !contentRef.current) return;

      const container = containerRef.current;
      const content = contentRef.current;
      const paddingYValue = paddingY ? (typeof paddingY === 'number' ? paddingY : parseInt(paddingY)) : 0;

      if (direction === "horizontal") {
        const containerWidth = container.clientWidth;
        const contentWidth = content.scrollWidth || containerWidth;
        const scrollLeft = content.scrollLeft;

        const needs = contentWidth > containerWidth;
        setNeedsScrollbar(needs);

        const scrollRatio = containerWidth / Math.max(1, contentWidth);
        const newThumbWidth = Math.max(20, Math.min(containerWidth, containerWidth * scrollRatio));
        const scrollProgress = needs ? scrollLeft / (contentWidth - containerWidth) : 0;
        const maxThumbLeft = containerWidth - newThumbWidth;
        const newThumbLeft = scrollProgress * maxThumbLeft;

        setThumbSize(newThumbWidth);
        setThumbPosition(newThumbLeft);
      } else {
        const containerHeight = container.clientHeight;
        const contentHeight = content.scrollHeight || containerHeight;
        const scrollTop = content.scrollTop;
        const trackHeight = containerHeight - (paddingYValue * 2);

        const needs = contentHeight > containerHeight;
        setNeedsScrollbar(needs);

        const scrollRatio = trackHeight / Math.max(1, contentHeight);
        const newThumbHeight = Math.max(20, Math.min(trackHeight, trackHeight * scrollRatio));
        const scrollProgress = needs ? scrollTop / (contentHeight - containerHeight) : 0;
        const maxThumbTop = trackHeight - newThumbHeight;
        const newThumbTop = scrollProgress * maxThumbTop;

        setThumbSize(newThumbHeight);
        setThumbPosition(newThumbTop);

        if (fadeY && needs) {
          const maxScroll = contentHeight - containerHeight;
          const topP = Math.min(1, Math.max(0, scrollTop / fadeDistance));
          const botP = Math.min(1, Math.max(0, (maxScroll - scrollTop) / fadeDistance));
          const gradient = `linear-gradient(to bottom, transparent 0%, black ${topP * fadeSize}%, black ${100 - botP * fadeSize}%, transparent 100%)`;
          content.style.maskImage = gradient;
          content.style.webkitMaskImage = gradient;
        } else {
          content.style.maskImage = "";
          content.style.webkitMaskImage = "";
        }
      }
    }, [contentRef, direction, paddingY, fadeY, fadeDistance, fadeSize]);

    const handleScroll = useCallback(() => {
      updateScrollbar();
      setIsScrolling(true);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false);
      }, 1500);
    }, [updateScrollbar]);

    const handleContainerMouseMove = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        let newIsHovered = false;

        if (direction === "horizontal") {
          const mouseY = e.clientY - rect.top;
          const hoverZone = 20;
          newIsHovered = mouseY > rect.height - hoverZone;
        } else {
          const mouseX = e.clientX - rect.left;
          const hoverZone = 20;
          newIsHovered = mouseX > rect.width - hoverZone;
        }

        if (newIsHovered !== isHoveredRight) {
          setIsHoveredRight(newIsHovered);
        }
      },
      [isHoveredRight, direction]
    );

    const handleContainerMouseLeave = useCallback(() => {
      setIsHoveredRight(false);
    }, []);

    const handleMouseDown = useCallback(
      (e: React.MouseEvent) => {
        if (!contentRef.current) return;
        e.preventDefault();
        setIsDragging(true);
        if (direction === "horizontal") {
          setDragStart({
            origin: e.clientX,
            scrollOrigin: contentRef.current.scrollLeft,
          });
        } else {
          setDragStart({
            origin: e.clientY,
            scrollOrigin: contentRef.current.scrollTop,
          });
        }
      },
      [contentRef, direction]
    );

    const handleMouseMove = useCallback(
      (e: MouseEvent) => {
        if (!isDragging || !contentRef.current || !containerRef.current) return;

        const container = containerRef.current;
        const content = contentRef.current;

        if (direction === "horizontal") {
          const deltaX = e.clientX - dragStart.origin;
          const containerWidth = container.clientWidth;
          const contentWidth = content.scrollWidth;
          const maxScroll = contentWidth - containerWidth;
          const scrollRatio = maxScroll / (containerWidth - thumbSize);
          const newScrollLeft = Math.max(
            0,
            Math.min(
              maxScroll,
              dragStart.scrollOrigin + deltaX * scrollRatio
            )
          );

          content.scrollLeft = newScrollLeft;
        } else {
          const deltaY = e.clientY - dragStart.origin;
          const containerHeight = container.clientHeight;
          const contentHeight = content.scrollHeight;
          const maxScroll = contentHeight - containerHeight;
          const scrollRatio = maxScroll / (containerHeight - thumbSize);
          const newScrollTop = Math.max(
            0,
            Math.min(
              maxScroll,
              dragStart.scrollOrigin + deltaY * scrollRatio
            )
          );

          content.scrollTop = newScrollTop;
        }
      },
      [isDragging, dragStart, thumbSize, contentRef, direction]
    );

    const handleMouseUp = useCallback(() => {
      setIsDragging(false);
    }, []);

    const handleTrackClick = useCallback(
      (e: React.MouseEvent) => {
        if (
          !containerRef.current ||
          !contentRef.current ||
          !thumbRef.current
        )
          return;

        const container = containerRef.current;
        const content = contentRef.current;
        const rect = container.getBoundingClientRect();
        const thumbRect = thumbRef.current.getBoundingClientRect();
        const paddingYValue = paddingY ? (typeof paddingY === 'number' ? paddingY : parseInt(paddingY)) : 0;

        if (direction === "horizontal") {
          const clickX = e.clientX - rect.left;
          const relativeThumbLeft = thumbRect.left - rect.left;
          const relativeThumbRight = thumbRect.right - rect.left;

          if (clickX >= relativeThumbLeft && clickX <= relativeThumbRight)
            return;

          const containerWidth = container.clientWidth;
          const contentWidth = content.scrollWidth;
          const maxScroll = contentWidth - containerWidth;

          const newThumbWidth = Math.max(
            20,
            containerWidth * (containerWidth / contentWidth)
          );
          const targetThumbCenter = clickX;
          const targetThumbLeft = targetThumbCenter - newThumbWidth / 2;
          const maxThumbLeft = containerWidth - newThumbWidth;
          const clampedThumbLeft = Math.max(
            0,
            Math.min(maxThumbLeft, targetThumbLeft)
          );

          const scrollProgress = clampedThumbLeft / maxThumbLeft;
          const targetScrollLeft = scrollProgress * maxScroll;

          content.scrollLeft = Math.max(
            0,
            Math.min(maxScroll, targetScrollLeft)
          );

          setIsDragging(true);
          setDragStart({
            origin: e.clientX,
            scrollOrigin: content.scrollLeft,
          });
        } else {
          const clickY = e.clientY - rect.top - paddingYValue;
          const relativeThumbTop = thumbRect.top - rect.top - paddingYValue;
          const relativeThumbBottom = thumbRect.bottom - rect.top - paddingYValue;

          if (clickY >= relativeThumbTop && clickY <= relativeThumbBottom)
            return;

          const containerHeight = container.clientHeight;
          const contentHeight = content.scrollHeight;
          const maxScroll = contentHeight - containerHeight;
          const trackHeight = containerHeight - (paddingYValue * 2);

          const newThumbHeight = Math.max(
            20,
            trackHeight * (trackHeight / contentHeight)
          );
          const targetThumbCenter = clickY;
          const targetThumbTop = targetThumbCenter - newThumbHeight / 2;
          const maxThumbTop = trackHeight - newThumbHeight;
          const clampedThumbTop = Math.max(
            0,
            Math.min(maxThumbTop, targetThumbTop)
          );

          const scrollProgress = clampedThumbTop / maxThumbTop;
          const targetScrollTop = scrollProgress * maxScroll;

          content.scrollTop = Math.max(
            0,
            Math.min(maxScroll, targetScrollTop)
          );

          setIsDragging(true);
          setDragStart({
            origin: e.clientY,
            scrollOrigin: content.scrollTop,
          });
        }
      },
      [contentRef, direction, paddingY]
    );

    const handleWheel = useCallback(
      (e: React.WheelEvent) => {
        if (!contentRef.current) return;
        if (direction !== "horizontal") return;

        e.preventDefault();
        const scrollAmount = e.deltaY || e.deltaX;
        const content = contentRef.current;
        const containerWidth = content.clientWidth;
        const contentWidth = content.scrollWidth;
        const maxScroll = contentWidth - containerWidth;

        const newScrollLeft = Math.max(
          0,
          Math.min(maxScroll, content.scrollLeft + scrollAmount)
        );
        content.scrollLeft = newScrollLeft;
      },
      [contentRef, direction]
    );

    useLayoutEffect(() => {
      updateScrollbar();

      const resizeObserver = new ResizeObserver(() => {
        requestAnimationFrame(updateScrollbar);
      });

      const mutationObserver = new MutationObserver(() => {
        requestAnimationFrame(updateScrollbar);
      });

      if (containerRef.current) {
        resizeObserver.observe(containerRef.current);
      }

      if (contentRef.current) {
        resizeObserver.observe(contentRef.current);
        mutationObserver.observe(contentRef.current, {
          childList: true,
          subtree: true,
        });
      }

      return () => {
        resizeObserver.disconnect();
        mutationObserver.disconnect();
      };
    }, [updateScrollbar, contentRef, enabled]);

    useEffect(() => {
      if (childrenRef.current !== children) {
        childrenRef.current = children;
        const timeoutId = setTimeout(() => {
          updateScrollbar();
        }, 0);
        return () => clearTimeout(timeoutId);
      }
    }, [children, updateScrollbar]);

    useEffect(() => {
      if (isDragging) {
        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
        document.body.style.userSelect = "none";
        return () => {
          document.removeEventListener("mousemove", handleMouseMove);
          document.removeEventListener("mouseup", handleMouseUp);
          document.body.style.userSelect = "";
        };
      }
    }, [isDragging, handleMouseMove, handleMouseUp]);

    useEffect(() => {
      return () => {
        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
      };
    }, []);

    // When disabled, just render children without scroll functionality
    if (!enabled) {
      const { style: propsStyle, ...restProps } = props;
      return (
        <div
          ref={ref}
          className={cn(styles.root, className)}
          style={{
            ...(direction === "horizontal"
              ? { width: "100%", maxWidth }
              : { height: "100%", maxHeight }),
            ...propsStyle,
          }}
          {...restProps}
        >
          {children}
        </div>
      );
    }

    const showOpacity = !hide ? 1 : (needsScrollbar && (isHoveredRight || isDragging || isScrolling) ? 1 : 0);

    if (direction === "horizontal") {
      const { style: propsStyle, ...restProps } = props;
      return (
        <div
          ref={mergedRef}
          className={cn(styles.root, styles.horizontal, className)}
          style={{
            width: "100%",
            maxWidth,
            ...propsStyle,
          }}
          onMouseMove={handleContainerMouseMove}
          onMouseLeave={handleContainerMouseLeave}
          data-dragging={isDragging ? "true" : "false"}
          {...restProps}
        >
          <div
            ref={contentRef}
            className={styles.content}
            onScroll={handleScroll}
            onWheel={handleWheel}
            style={{ maxWidth: "inherit" }}
          >
            {children}
          </div>

          <div
            className={styles.track}
            data-hide={hide ? "true" : "false"}
            style={{
              opacity: showOpacity,
              pointerEvents: needsScrollbar ? "auto" : "none",
            }}
            onMouseDown={handleTrackClick}
          >
            {(needsScrollbar || !hide) && (
              <div
                ref={thumbRef}
                className={styles.thumb}
                style={{
                  width: `${thumbSize}px`,
                  left: `${thumbPosition}px`,
                }}
                onMouseDown={handleMouseDown}
              />
            )}
          </div>
        </div>
      );
    }

    const { style: propsStyle, ...restProps } = props;
    const paddingYValue = paddingY ? (typeof paddingY === 'number' ? `${paddingY}px` : paddingY) : undefined;
    return (
      <div
        ref={mergedRef}
        className={cn(styles.root, styles.vertical, className)}
        style={{
          height: "100%",
          maxHeight,
          ...(paddingYValue ? { "--scroll-padding-y": paddingYValue } : {}),
          ...propsStyle,
        } as React.CSSProperties}
        onMouseMove={handleContainerMouseMove}
        onMouseLeave={handleContainerMouseLeave}
        data-dragging={isDragging ? "true" : "false"}
        {...restProps}
      >
        <div
          ref={contentRef}
          className={styles.content}
          onScroll={handleScroll}
          style={{ maxHeight: "inherit" }}
        >
          {children}
        </div>

        <div
          className={styles.track}
          data-hide={hide ? "true" : "false"}
          style={{
            opacity: showOpacity,
            pointerEvents: needsScrollbar ? "auto" : "none",
          }}
          onMouseDown={handleTrackClick}
        >
          {(needsScrollbar || !hide) && (
            <div
              ref={thumbRef}
              className={styles.thumb}
              style={{
                height: `${thumbSize}px`,
                top: `${thumbPosition}px`,
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

function useMergedRef<T>(
  ...refs: (React.Ref<T> | undefined)[]
): React.RefCallback<T> {
  return (value: T) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") ref(value);
      else if (ref && typeof ref === "object")
        (ref as React.MutableRefObject<T | null>).current = value;
    });
  };
}

export { Scroll };
