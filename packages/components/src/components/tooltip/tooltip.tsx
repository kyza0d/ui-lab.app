"use client";

import React, { useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { useTooltipTrigger, useTooltip, mergeProps } from "react-aria";
import { cn } from "@/lib/utils";
import { useTooltipTriggerState } from "react-stately";

const ARROW_SIZE = 12;
const ARROW_MASK_THICKNESS = 2;
const TOOLTIP_GAP = 8;
const ARROW_POSITIONING_SIZE = 6;
const DEFAULT_SHOW_DELAY_MS = 200;

type TooltipPosition = "top" | "right" | "bottom" | "left";

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

interface ArrowLineSegment {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

interface TooltipArrowProps {
  position: TooltipPosition;
}

const TooltipArrow = ({ position }: TooltipArrowProps) => {
  const [borderWidth, setBorderWidth] = React.useState(1);

  React.useEffect(() => {
    const root = document.documentElement;
    const borderWidthStr = getComputedStyle(root).getPropertyValue("--border-width-base").trim();
    const width = parseFloat(borderWidthStr) || 1;
    setBorderWidth(width);
  }, []);

  /**
   * Calculate SVG polygon points for the arrow triangle.
   * Creates a triangle pointing in the specified direction.
   */
  const getArrowPoints = (): string => {
    const halfSize = ARROW_SIZE / 2;

    switch (position) {
      case "top":
        return `${halfSize},${ARROW_SIZE} 0,0 ${ARROW_SIZE},0`;
      case "bottom":
        return `${halfSize},0 0,${ARROW_SIZE} ${ARROW_SIZE},${ARROW_SIZE}`;
      case "left":
        return `${ARROW_SIZE},${halfSize} 0,0 0,${ARROW_SIZE}`;
      case "right":
        return `0,${halfSize} ${ARROW_SIZE},0 ${ARROW_SIZE},${ARROW_SIZE}`;
    }
  };

  /**
   * Calculate border lines for the arrow.
   * Excludes the edge that connects to the tooltip to avoid double borders.
   */
  const getBorderLines = (): ArrowLineSegment[] => {
    const halfSize = ARROW_SIZE / 2;

    switch (position) {
      case "top":
        return [
          { x1: halfSize, y1: ARROW_SIZE, x2: 0, y2: 0 },
          { x1: halfSize, y1: ARROW_SIZE, x2: ARROW_SIZE, y2: 0 },
        ];
      case "bottom":
        return [
          { x1: halfSize, y1: 0, x2: 0, y2: ARROW_SIZE },
          { x1: halfSize, y1: 0, x2: ARROW_SIZE, y2: ARROW_SIZE },
        ];
      case "left":
        return [
          { x1: ARROW_SIZE, y1: halfSize, x2: 0, y2: 0 },
          { x1: ARROW_SIZE, y1: halfSize, x2: 0, y2: ARROW_SIZE },
        ];
      case "right":
        return [
          { x1: 0, y1: halfSize, x2: ARROW_SIZE, y2: 0 },
          { x1: 0, y1: halfSize, x2: ARROW_SIZE, y2: ARROW_SIZE },
        ];
    }
  };

  /**
   * Calculate positioning styles for the arrow relative to the tooltip.
   * Accounts for border width and positions the arrow at the tooltip edge.
   */
  const getArrowStyles = (): React.CSSProperties => {
    const borderOffset = borderWidth / 2;

    switch (position) {
      case "top":
        return {
          top: `calc(100% + ${borderOffset}px)`,
          left: "50%",
          transform: `translateX(-50%) translateY(-${borderOffset}px)`,
        };
      case "bottom":
        return {
          bottom: `calc(100% + ${borderOffset}px)`,
          left: "50%",
          transform: `translateX(-50%) translateY(${borderOffset}px)`,
        };
      case "left":
        return {
          left: `calc(100% + ${borderOffset}px)`,
          top: "50%",
          transform: `translateY(-50%) translateX(-${borderOffset}px)`,
        };
      case "right":
        return {
          right: `calc(100% + ${borderOffset}px)`,
          top: "50%",
          transform: `translateY(-50%) translateX(${borderOffset}px)`,
        };
    }
  };

  /**
   * Get the connecting edge mask based on arrow position.
   * This hides the tooltip border at the arrow connection point.
   */
  const getMaskRect = (): React.ReactNode => {
    switch (position) {
      case "top":
        return (
          <rect x="0" y={ARROW_SIZE - ARROW_MASK_THICKNESS} width={ARROW_SIZE} height={ARROW_MASK_THICKNESS} fill="black" />
        );
      case "bottom":
        return <rect x="0" y="0" width={ARROW_SIZE} height={ARROW_MASK_THICKNESS} fill="black" />;
      case "left":
        return (
          <rect x={ARROW_SIZE - ARROW_MASK_THICKNESS} y="0" width={ARROW_MASK_THICKNESS} height={ARROW_SIZE} fill="black" />
        );
      case "right":
        return <rect x="0" y="0" width={ARROW_MASK_THICKNESS} height={ARROW_SIZE} fill="black" />;
    }
  };

  return (
    <svg
      width={ARROW_SIZE}
      height={ARROW_SIZE}
      viewBox={`0 0 ${ARROW_SIZE} ${ARROW_SIZE}`}
      className="absolute pointer-events-none"
      style={getArrowStyles()}
    >
      <defs>
        <mask id={`arrow-mask-${position}`}>
          {/* White base covers entire SVG */}
          <rect width={ARROW_SIZE} height={ARROW_SIZE} fill="white" />
          {/* Black area reveals the tooltip beneath the connecting edge */}
          {getMaskRect()}
        </mask>
      </defs>

      {/* Arrow fill with mask applied */}
      <polygon
        points={getArrowPoints()}
        fill="var(--color-background-900)"
        mask={`url(#arrow-mask-${position})`}
      />

      {/* Border lines on outer edges only */}
      {getBorderLines().map((line, idx) => (
        <line
          key={idx}
          x1={line.x1}
          y1={line.y1}
          x2={line.x2}
          y2={line.y2}
          stroke="var(--color-background-700)"
          strokeWidth={borderWidth}
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
};

interface TooltipCoordinates {
  top: number;
  left: number;
}

/**
 * Tooltip component that displays additional information on hover or focus.
 * Uses React Aria hooks for accessibility with custom positioning and styling.
 * Supports positioning in four directions with smooth animations.
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

    // Track tooltip position for custom positioning logic
    const [tooltipPosition, setTooltipPosition] = React.useState<TooltipCoordinates>({
      top: 0,
      left: 0,
    });

    /**
     * Calculate tooltip position based on trigger element and position preference.
     * Positions the tooltip with appropriate spacing and arrow alignment.
     */
    useEffect(() => {
      if (!state.isOpen || !triggerRef.current) return;

      const triggerRect = triggerRef.current.getBoundingClientRect();
      let top = 0;
      let left = 0;

      switch (position) {
        case "top":
          top = triggerRect.top + window.scrollY - TOOLTIP_GAP - ARROW_POSITIONING_SIZE;
          left = triggerRect.left + window.scrollX + triggerRect.width / 2;
          break;
        case "bottom":
          top = triggerRect.bottom + window.scrollY + TOOLTIP_GAP + ARROW_POSITIONING_SIZE;
          left = triggerRect.left + window.scrollX + triggerRect.width / 2;
          break;
        case "left":
          top = triggerRect.top + window.scrollY + triggerRect.height / 2;
          left = triggerRect.left + window.scrollX - TOOLTIP_GAP - ARROW_POSITIONING_SIZE;
          break;
        case "right":
          top = triggerRect.top + window.scrollY + triggerRect.height / 2;
          left = triggerRect.right + window.scrollX + TOOLTIP_GAP + ARROW_POSITIONING_SIZE;
          break;
      }

      setTooltipPosition({ top, left });
    }, [state.isOpen, position]);

    /**
     * CSS classes for positioning the tooltip container based on direction.
     * Applies negative transforms to properly center the tooltip relative to trigger.
     */
    const positionClasses: Record<TooltipPosition, string> = {
      top: "-translate-x-1/2 -translate-y-full",
      bottom: "-translate-x-1/2 translate-y-0",
      left: "-translate-y-1/2 -translate-x-full",
      right: "-translate-y-1/2 translate-x-0",
    };

    return (
      <>
        <div
          ref={triggerRef}
          {...mergeProps(triggerProps)}
          className={cn("inline-block", className)}
        >
          {children}
        </div>

        {state.isOpen &&
          createPortal(
            <div
              ref={tooltipRef}
              {...mergeProps(tooltipProps, ariaTooltipProps)}
              className={cn("absolute pointer-events-none z-50 transition-opacity", positionClasses[position], {
                "opacity-100": state.isOpen,
              })}
              style={{
                top: `${tooltipPosition.top}px`,
                left: `${tooltipPosition.left}px`,
              }}
            >
              <div
                className={cn(
                  "relative bg-background-900 text-foreground-50 text-sm px-3 py-2 rounded-lg whitespace-nowrap shadow-lg border border-background-700",
                  contentClassName
                )}
              >
                {content}
                {showArrow && <TooltipArrow position={position} />}
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
