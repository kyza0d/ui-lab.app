import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

// Layout and spacing constants
const ARROW_SIZE = 12;
const ARROW_MASK_THICKNESS = 2;
const POPOVER_GAP = 8;
const ARROW_POSITIONING_SIZE = 6;

// Position type
type PopoverPosition = "top" | "right" | "bottom" | "left";

export interface PopoverProps {
  children: React.ReactNode;
  content: React.ReactNode;
  position?: PopoverPosition;
  className?: string;
  contentClassName?: string;
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
}

interface ArrowLineSegment {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

interface PopoverArrowProps {
  position: PopoverPosition;
}

const PopoverArrow = ({ position }: PopoverArrowProps) => {
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
   * Excludes the edge that connects to the popover to avoid double borders.
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
   * Calculate positioning styles for the arrow relative to the popover.
   * Accounts for border width and positions the arrow at the popover edge.
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
   * This hides the popover border at the arrow connection point.
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
        <mask id={`popover-arrow-mask-${position}`}>
          {/* White base covers entire SVG */}
          <rect width={ARROW_SIZE} height={ARROW_SIZE} fill="white" />
          {/* Black area reveals the popover beneath the connecting edge */}
          {getMaskRect()}
        </mask>
      </defs>

      {/* Arrow fill with mask applied */}
      <polygon
        points={getArrowPoints()}
        fill="var(--color-background-900)"
        mask={`url(#popover-arrow-mask-${position})`}
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

interface PopoverCoordinates {
  top: number;
  left: number;
}

/**
 * Popover component that displays floating content triggered by click.
 * Supports positioning in four directions with click-outside-to-close behavior.
 */
const Popover = React.forwardRef<HTMLDivElement, PopoverProps>(
  (
    {
      children,
      content,
      position = "bottom",
      className,
      contentClassName,
      isOpen: controlledIsOpen,
      onOpenChange,
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(controlledIsOpen ?? false);
    const [isPositioned, setIsPositioned] = useState(false);
    const [popoverPosition, setPopoverPosition] = useState<PopoverCoordinates>({
      top: 0,
      left: 0,
    });
    const triggerRef = useRef<HTMLDivElement>(null);

    // Handle controlled/uncontrolled component
    const open = controlledIsOpen !== undefined ? controlledIsOpen : isOpen;
    const setOpen = (newOpen: boolean) => {
      if (controlledIsOpen === undefined) {
        setIsOpen(newOpen);
      }
      onOpenChange?.(newOpen);
    };

    /**
     * Calculate popover position based on trigger element and position preference.
     * Positions the popover with appropriate spacing and arrow alignment.
     * Uses a separate effect to allow immediate rendering while still applying positioning.
     */
    useEffect(() => {
      if (!open || !triggerRef.current) return;

      const triggerRect = triggerRef.current.getBoundingClientRect();
      let top = 0;
      let left = 0;

      switch (position) {
        case "top":
          top = triggerRect.top - POPOVER_GAP - ARROW_POSITIONING_SIZE;
          left = triggerRect.left + triggerRect.width / 2;
          break;
        case "bottom":
          top = triggerRect.bottom + POPOVER_GAP + ARROW_POSITIONING_SIZE;
          left = triggerRect.left + triggerRect.width / 2;
          break;
        case "left":
          top = triggerRect.top + triggerRect.height / 2;
          left = triggerRect.left - POPOVER_GAP - ARROW_POSITIONING_SIZE;
          break;
        case "right":
          top = triggerRect.top + triggerRect.height / 2;
          left = triggerRect.right + POPOVER_GAP + ARROW_POSITIONING_SIZE;
          break;
      }

      setPopoverPosition({ top, left });
    }, [open, position]);

    /**
     * Mark as positioned after position calculation to prevent layout shift.
     * Uses a separate effect to ensure positioning is calculated first.
     */
    useEffect(() => {
      if (!open) {
        setIsPositioned(false);
        return;
      }

      setIsPositioned(true);
    }, [open]);

    /**
     * Handle trigger click to toggle popover visibility.
     */
    const handleTriggerClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      setOpen(!open);
    };

    /**
     * Handle click outside popover to close it.
     * Keep track of popover content DOM node to prevent closing on internal clicks.
     */
    const popoverContentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (!open) return;

      const handleClickOutside = (e: MouseEvent) => {
        const target = e.target as Node;
        if (
          triggerRef.current &&
          !triggerRef.current.contains(target) &&
          popoverContentRef.current &&
          !popoverContentRef.current.contains(target)
        ) {
          setOpen(false);
        }
      };

      document.addEventListener("click", handleClickOutside);
      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }, [open]);

    /**
     * Handle Escape key to close popover.
     */
    useEffect(() => {
      if (!open) return;

      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
          setOpen(false);
        }
      };

      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
      };
    }, [open]);

    /**
     * CSS classes for positioning the popover container based on direction.
     * Applies negative transforms to properly center the popover relative to trigger.
     */
    const positionClasses: Record<PopoverPosition, string> = {
      top: "-translate-x-1/2 -translate-y-full",
      bottom: "-translate-x-1/2 translate-y-0",
      left: "-translate-y-1/2 -translate-x-full",
      right: "-translate-y-1/2 translate-x-0",
    };

    return (
      <>
        <div
          ref={triggerRef}
          onClick={handleTriggerClick}
          className={cn("inline-block", className)}
        >
          {children}
        </div>

        {open &&
          createPortal(
            <div
              role="dialog"
              className={cn("fixed pointer-events-none z-50 transition-opacity", positionClasses[position], {
                "opacity-0": !isPositioned,
                "opacity-100": isPositioned,
              })}
              style={{
                top: `${popoverPosition.top}px`,
                left: `${popoverPosition.left}px`,
              }}
            >
              <div
                ref={popoverContentRef}
                onClick={(e) => e.stopPropagation()}
                className={cn(
                  "relative pointer-events-auto bg-background-900 text-foreground-50 text-sm p-3 rounded-lg shadow-lg border border-background-700",
                  contentClassName
                )}
              >
                {content}
                <PopoverArrow position={position} />
              </div>
            </div>,
            document.body
          )}
      </>
    );
  }
);

Popover.displayName = "Popover";

export { Popover };
