"use client";

import React, { useRef, useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useTooltipTrigger, useTooltip, mergeProps } from "react-aria";
import { useFloating, offset, flip, shift, autoUpdate } from "@floating-ui/react-dom";
import { cn } from "@/lib/utils";
import { useTooltipTriggerState } from "react-stately";
import { Frame } from "../Frame";

const ARROW_PATH = "M 0 0 L 6 -12 L 12 0";
const ARROW_WIDTH = 12;
const TOOLTIP_GAP = 8;
const ARROW_POSITIONING_SIZE = 6;
const DEFAULT_SHOW_DELAY_MS = 200;

type TooltipPosition = "top" | "right" | "bottom" | "left";

const getFrameSide = (position: TooltipPosition): "top" | "right" | "bottom" | "left" => {
  switch (position) {
    case "top":
      return "bottom";
    case "bottom":
      return "top";
    case "left":
      return "right";
    case "right":
      return "left";
  }
};

const placementMap: Record<TooltipPosition, "top" | "bottom" | "left" | "right"> = {
  top: "top",
  bottom: "bottom",
  left: "left",
  right: "right",
};

/**
 * Maps placement to initial transform for directional entrance animation.
 * When animating in, the component slides from its placement direction toward the center.
 * For example, "top" placement slides up (-Y) and fades in.
 */
const getInitialTransform = (placement: string): string => {
  switch (placement) {
    case "top":
      return "translateY(3px) scale(0.95)";
    case "bottom":
      return "translateY(-3px) scale(0.95)";
    case "left":
      return "translateX(3px) scale(0.95)";
    case "right":
      return "translateX(-3px) scale(0.95)";
    default:
      return "scale(0.95)";
  }
};

export interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  position?: TooltipPosition;
  className?: string;
  contentClassName?: string;
  delay?: number;
  isDisabled?: boolean;
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  showArrow?: boolean;
}


/**
 * Tooltip component that displays additional information on hover or focus.
 * Uses React Aria hooks for accessibility with custom positioning and styling.
 * Supports positioning in four directions with smooth animations.
 * Uses Frame component for arrow rendering via SVG-based system.
 */
const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
  (
    {
      children,
      content,
      position = "top",
      className,
      contentClassName,
      delay = DEFAULT_SHOW_DELAY_MS,
      isDisabled = false,
      isOpen: controlledIsOpen,
      onOpenChange,
      showArrow = false,
    },
    _ref
  ) => {
    const triggerRef = useRef<HTMLDivElement>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isExiting, setIsExiting] = useState(false);

    // Create state using React Aria's state management
    const state = useTooltipTriggerState({
      isOpen: controlledIsOpen,
      onOpenChange,
      delay,
      isDisabled,
    });

    // Get props from React Aria hooks
    const { triggerProps, tooltipProps } = useTooltipTrigger(
      { isDisabled },
      state,
      triggerRef
    );
    const { tooltipProps: ariaTooltipProps } = useTooltip({}, state);

    // Setup floating-ui positioning
    const { refs, floatingStyles, placement } = useFloating({
      placement: placementMap[position],
      whileElementsMounted: autoUpdate,
      middleware: [
        offset(TOOLTIP_GAP + ARROW_POSITIONING_SIZE),
        flip(),
        shift({ padding: 8 }),
      ],
    });

    // Check if tooltip is positioned
    const isPositioned = floatingStyles.transform !== undefined;

    // Trigger animation when tooltip is opened and positioned
    React.useEffect(() => {
      if (state.isOpen && isPositioned) {
        setIsExiting(false);
        setIsAnimating(true);
      }
    }, [state.isOpen, isPositioned]);

    // Handle exit animation when closing
    React.useEffect(() => {
      if (!state.isOpen && isAnimating) {

        setIsExiting(true);
        requestAnimationFrame(() => setIsAnimating(false));
        const timer = setTimeout(() => setIsExiting(false), 50);
        return () => clearTimeout(timer);
      }
    }, [state.isOpen, isAnimating]);

    // Merge trigger ref with floating-ui reference setter
    useLayoutEffect(() => {
      refs.setReference(triggerRef.current);
    }, [refs]);

    return (
      <>
        <div
          ref={triggerRef}
          {...mergeProps(triggerProps)}
          className={cn("inline-block", className)}
        >
          {children}
        </div>

        {(state.isOpen || isExiting) &&
          createPortal(
            <div
              ref={(el) => {
                (tooltipRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
                refs.setFloating(el);
              }}
              {...mergeProps(tooltipProps, ariaTooltipProps)}
              className="absolute pointer-events-none z-50"
              style={{
                ...floatingStyles,
                pointerEvents: "none",
              }}
            >
              <div
                style={{
                  opacity: isAnimating ? 1 : 0,
                  transform: isAnimating ? "scale(1)" : getInitialTransform(placement),
                  transition: "opacity 0.15s ease-out, transform 0.15s ease-out",
                  pointerEvents: isAnimating ? "auto" : "none",
                }}
              >
                <Frame
                  side={showArrow ? getFrameSide(position) : position}
                  shapeMode={showArrow ? "extend" : undefined}
                  path={showArrow ? ARROW_PATH : undefined}
                  pathWidth={showArrow ? ARROW_WIDTH : undefined}
                  fill="var(--color-background-900)"
                  borderColor="var(--color-background-700)"
                  cornerRadius={8}
                  padding="none"
                  className={cn("w-auto text-foreground-50 text-sm whitespace-nowrap shadow-lg", contentClassName)}
                  style={{ padding: "0.5rem 0.75rem" }}
                >
                  {content}
                </Frame>
              </div>
            </div>,
            document.body
          )}
      </>
    );
  }
);

Tooltip.displayName = "Tooltip";

export { Tooltip };
