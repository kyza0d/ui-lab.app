"use client"

import React from "react";
import { createPortal } from "react-dom";
import { useOverlayTrigger, useDialog, mergeProps } from "react-aria";
import { useOverlayTriggerState } from "react-stately";
import { useFloating, offset, flip, shift, autoUpdate } from '@floating-ui/react-dom';
import { cn } from "@/lib/utils";

const ARROW_SIZE = 12;
const ARROW_MASK_THICKNESS = 2;
const POPOVER_GAP = 8;
const ARROW_POSITIONING_SIZE = 6;

type PopoverPosition = "top" | "right" | "bottom" | "left";

export interface PopoverProps {
  children: React.ReactNode;
  content: React.ReactNode;
  position?: PopoverPosition;
  className?: string;
  contentClassName?: string;
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

  const getMaskRect = (): React.ReactNode => {
    switch (position) {
      case "top":
        return <rect x="0" y={ARROW_SIZE - ARROW_MASK_THICKNESS} width={ARROW_SIZE} height={ARROW_MASK_THICKNESS} fill="black" />;
      case "bottom":
        return <rect x="0" y="0" width={ARROW_SIZE} height={ARROW_MASK_THICKNESS} fill="black" />;
      case "left":
        return <rect x={ARROW_SIZE - ARROW_MASK_THICKNESS} y="0" width={ARROW_MASK_THICKNESS} height={ARROW_SIZE} fill="black" />;
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
          <rect width={ARROW_SIZE} height={ARROW_SIZE} fill="white" />
          {getMaskRect()}
        </mask>
      </defs>
      <polygon
        points={getArrowPoints()}
        fill="var(--color-background-900)"
        mask={`url(#popover-arrow-mask-${position})`}
      />
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

const Popover = React.forwardRef<HTMLDivElement, PopoverProps>(
  ({ children, content, position = "bottom", className, contentClassName, isOpen: controlledIsOpen, onOpenChange, showArrow = false }, ref) => {
    const triggerRef = React.useRef<HTMLDivElement>(null);
    const popoverContentRef = React.useRef<HTMLDivElement>(null);
    const [mounted, setMounted] = React.useState(false);
    const [portalContainer, setPortalContainer] = React.useState<HTMLElement | null>(null);

    const state = useOverlayTriggerState({
      isOpen: controlledIsOpen,
      onOpenChange,
    });

    React.useEffect(() => {
      setMounted(true);
    }, []);

    const { triggerProps, overlayProps } = useOverlayTrigger({ type: "dialog" }, state, triggerRef);
    const { dialogProps } = useDialog({}, popoverContentRef);

    const placementMap: Record<PopoverPosition, "top" | "bottom" | "left" | "right"> = {
      top: "top",
      bottom: "bottom",
      left: "left",
      right: "right",
    };

    const { refs, floatingStyles, placement } = useFloating({
      placement: placementMap[position],
      whileElementsMounted: autoUpdate,
      middleware: [
        offset(POPOVER_GAP + ARROW_POSITIONING_SIZE),
        flip(),
        shift({ padding: 8 }),
      ],
    });

    const isPositioned = floatingStyles.transform !== undefined;

    React.useLayoutEffect(() => {
      refs.setReference(triggerRef.current);
    }, [refs]);

    React.useEffect(() => {
      if (typeof document === 'undefined') return;
      const container = document.createElement('div');
      container.setAttribute('data-popover-portal', '');
      container.style.cssText = 'position: fixed; top: 0; left: 0; z-index: 500;';
      document.body.appendChild(container);
      setPortalContainer(container);
      return () => {
        document.body.removeChild(container);
      };
    }, []);

    React.useEffect(() => {
      if (!state.isOpen) return;
      const handleClickOutside = (e: MouseEvent) => {
        const target = e.target as Node;
        if (
          triggerRef.current &&
          !triggerRef.current.contains(target) &&
          popoverContentRef.current &&
          !popoverContentRef.current.contains(target)
        ) {
          state.close();
        }
      };
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }, [state.isOpen, state]);

    React.useEffect(() => {
      if (!state.isOpen) return;
      const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key === "Escape") state.close();
      };
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }, [state.isOpen, state]);

    const mergedTriggerRef = React.useCallback(
      (el: HTMLDivElement | null) => {
        (triggerRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
        refs.setReference(el);
        if (typeof ref === "function") ref(el);
        else if (ref) ref.current = el;
      },
      [refs, ref]
    );

    const mergedContentRef = React.useCallback(
      (el: HTMLDivElement | null) => {
        (popoverContentRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
        refs.setFloating(el);
      },
      [refs]
    );

    const triggerElement = React.isValidElement(children)
      ? React.cloneElement(children as React.ReactElement<{ className?: string; ref?: React.Ref<HTMLButtonElement | HTMLDivElement> }>, {
        ...triggerProps,
        className: cn((children as React.ReactElement<{ className?: string }>).props.className, className),
        ref: mergedTriggerRef,
      })
      : (
        <div ref={mergedTriggerRef} {...triggerProps} className={cn("inline-block", className)}>
          {children}
        </div>
      );

    if (!mounted || !portalContainer) {
      return triggerElement;
    }

    return (
      <>
        {triggerElement}
        {state.isOpen &&
          createPortal(
            <div
              {...mergeProps(overlayProps, dialogProps)}
              ref={mergedContentRef}
              role="dialog"
              className={cn("relative pointer-events-auto bg-background-900 text-foreground-50 text-sm p-3 rounded-lg shadow-lg border border-background-700", contentClassName)}
              style={{
                ...floatingStyles,
                visibility: isPositioned ? 'visible' : 'hidden',
              }}
            >
              {content}
              {showArrow && <PopoverArrow position={position as PopoverPosition} />}
            </div>,
            portalContainer!
          )}
      </>
    );
  }
);

Popover.displayName = "Popover";

export { Popover };
