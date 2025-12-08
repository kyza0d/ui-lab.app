import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

// Layout and spacing constants
const ARROW_SIZE = 12;
const ARROW_MASK_THICKNESS = 2;
const TOOLTIP_GAP = 8;
const ARROW_POSITIONING_SIZE = 6;
const DEFAULT_SHOW_DELAY_MS = 200;

// Position type
type TooltipPosition = "top" | "right" | "bottom" | "left";

export interface TooltipProps {
  children: React.ReactNode;
  content: React.ReactNode;
  position?: TooltipPosition;
  className?: string;
  contentClassName?: string;
  delay?: number;
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
 * Tooltip component that displays additional information on hover.
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
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isPositioned, setIsPositioned] = useState(false);
    const [tooltipPosition, setTooltipPosition] = useState<TooltipCoordinates>({
      top: 0,
      left: 0,
    });
    const triggerRef = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

    /**
     * Calculate tooltip position based on trigger element and position preference.
     * Positions the tooltip with appropriate spacing and arrow alignment.
     * Sets isPositioned flag after calculation to prevent flickering on first render.
     */
    useEffect(() => {
      if (!isVisible || !triggerRef.current) return;

      const triggerRect = triggerRef.current.getBoundingClientRect();
      let top = 0;
      let left = 0;

      switch (position) {
        case "top":
          top = triggerRect.top - TOOLTIP_GAP - ARROW_POSITIONING_SIZE;
          left = triggerRect.left + triggerRect.width / 2;
          break;
        case "bottom":
          top = triggerRect.bottom + TOOLTIP_GAP + ARROW_POSITIONING_SIZE;
          left = triggerRect.left + triggerRect.width / 2;
          break;
        case "left":
          top = triggerRect.top + triggerRect.height / 2;
          left = triggerRect.left - TOOLTIP_GAP - ARROW_POSITIONING_SIZE;
          break;
        case "right":
          top = triggerRect.top + triggerRect.height / 2;
          left = triggerRect.right + TOOLTIP_GAP + ARROW_POSITIONING_SIZE;
          break;
      }

      setTooltipPosition({ top, left });
      setIsPositioned(true);
    }, [isVisible, position]);

    /**
     * Handle mouse enter with configurable delay before showing tooltip.
     */
    const handleMouseEnter = () => {
      timeoutRef.current = setTimeout(() => {
        setIsVisible(true);
      }, delay);
    };

    /**
     * Handle mouse leave by canceling any pending show and hiding the tooltip.
     * Reset positioning flag for next show.
     */
    const handleMouseLeave = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setIsVisible(false);
      setIsPositioned(false);
    };

    /**
     * Cleanup timeout on unmount.
     */
    useEffect(() => {
      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }, []);

    /**
     * Handle Escape key to close tooltip.
     */
    useEffect(() => {
      if (!isVisible) return;

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          setIsVisible(false);
        }
      };

      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }, [isVisible]);

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
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={cn("inline-block", className)}
        >
          {children}
        </div>

        {isVisible &&
          createPortal(
            <div
              role="tooltip"
              className={cn("fixed pointer-events-none z-50 transition-opacity", positionClasses[position], {
                "opacity-0": !isPositioned,
                "opacity-100": isPositioned,
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
                <TooltipArrow position={position} />
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
