"use client";

import React, { useRef, useLayoutEffect, useState, useCallback, useEffect } from "react";
import { cn } from "@/lib/utils";
import styles from "./Scroll.module.css";

export interface ScrollProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  maxHeight?: string;
  maxWidth?: string;
  direction?: "vertical" | "horizontal";
  fadeY?: boolean;
}

const Scroll = React.forwardRef<HTMLDivElement, ScrollProps>(
  (
    {
      children,
      className,
      maxHeight = "100%",
      maxWidth = "100%",
      direction = "vertical",
      fadeY = false,
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

      if (direction === "horizontal") {
        const containerWidth = container.clientWidth;
        const contentWidth = content.scrollWidth;
        const scrollLeft = content.scrollLeft;

        const needs = contentWidth > containerWidth;
        setNeedsScrollbar(needs);

        if (needs) {
          const scrollRatio = containerWidth / contentWidth;
          const newThumbWidth = Math.max(20, containerWidth * scrollRatio);
          const scrollProgress = scrollLeft / (contentWidth - containerWidth);
          const maxThumbLeft = containerWidth - newThumbWidth;
          const newThumbLeft = scrollProgress * maxThumbLeft;

          setThumbSize(newThumbWidth);
          setThumbPosition(newThumbLeft);
        }
      } else {
        const containerHeight = container.clientHeight;
        const contentHeight = content.scrollHeight;
        const scrollTop = content.scrollTop;

        const needs = contentHeight > containerHeight;
        setNeedsScrollbar(needs);

        if (needs) {
          const scrollRatio = containerHeight / contentHeight;
          const newThumbHeight = Math.max(20, containerHeight * scrollRatio);
          const scrollProgress = scrollTop / (contentHeight - containerHeight);
          const maxThumbTop = containerHeight - newThumbHeight;
          const newThumbTop = scrollProgress * maxThumbTop;

          setThumbSize(newThumbHeight);
          setThumbPosition(newThumbTop);
        }
      }
    }, [contentRef, direction]);

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
          const clickY = e.clientY - rect.top;
          const relativeThumbTop = thumbRect.top - rect.top;
          const relativeThumbBottom = thumbRect.bottom - rect.top;

          if (clickY >= relativeThumbTop && clickY <= relativeThumbBottom)
            return;

          const containerHeight = container.clientHeight;
          const contentHeight = content.scrollHeight;
          const maxScroll = contentHeight - containerHeight;

          const newThumbHeight = Math.max(
            20,
            containerHeight * (containerHeight / contentHeight)
          );
          const targetThumbCenter = clickY;
          const targetThumbTop = targetThumbCenter - newThumbHeight / 2;
          const maxThumbTop = containerHeight - newThumbHeight;
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
      [contentRef, direction]
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
    }, [updateScrollbar, contentRef]);

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

    const showOpacity = needsScrollbar && (isHoveredRight || isDragging || isScrolling) ? 1 : 0;
    const fadeYPadding = fadeY && needsScrollbar ? "12px 0" : "0";

    if (direction === "horizontal") {
      const { style: propsStyle, ...restProps } = props;
      return (
        <div
          ref={mergedRef}
          className={cn(styles.root, styles.horizontal, className)}
          style={{
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
            style={{
              maxWidth: "inherit",
              padding: fadeYPadding,
            }}
            data-fade-y={fadeY ? "true" : "false"}
          >
            {children}
          </div>

          <div
            className={styles.track}
            style={{
              opacity: showOpacity,
              pointerEvents: needsScrollbar ? "auto" : "none",
            }}
            onMouseDown={handleTrackClick}
          >
            {needsScrollbar && (
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
    return (
      <div
        ref={mergedRef}
        className={cn(styles.root, styles.vertical, className)}
        style={{
          maxHeight,
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
          style={{
            maxHeight: "inherit",
            padding: fadeYPadding,
          }}
          data-fade-y={fadeY ? "true" : "false"}
        >
          {children}
        </div>

        <div
          className={styles.track}
          style={{
            opacity: showOpacity,
            pointerEvents: needsScrollbar ? "auto" : "none",
          }}
          onMouseDown={handleTrackClick}
        >
          {needsScrollbar && (
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
