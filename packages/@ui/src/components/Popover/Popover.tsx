"use client"

import React from "react";
import { createPortal } from "react-dom";
import { useOverlayTrigger, useDialog, mergeProps } from "react-aria";
import { useOverlayTriggerState } from "react-stately";
import { useFloating, offset, flip, shift, autoUpdate } from '@floating-ui/react-dom';
import { cn } from "@/lib/utils";
import { Frame } from "../Frame";

const ARROW_PATH = "M 0 0 L 6 -12 L 12 0";
const ARROW_WIDTH = 12;
const POPOVER_GAP = 8;
const ARROW_POSITIONING_SIZE = 6;

type PopoverPosition = "top" | "right" | "bottom" | "left";

const getFrameSide = (position: PopoverPosition): "top" | "right" | "bottom" | "left" => {
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

const Popover = React.forwardRef<HTMLDivElement, PopoverProps>(
  ({ children, content, position = "bottom", className, contentClassName, isOpen: controlledIsOpen, onOpenChange, showArrow = false }, ref) => {
    const triggerRef = React.useRef<HTMLDivElement>(null);
    const popoverContentRef = React.useRef<HTMLDivElement>(null);
    const [isAnimating, setIsAnimating] = React.useState(false);
    const [isExiting, setIsExiting] = React.useState(false);

    const state = useOverlayTriggerState({
      isOpen: controlledIsOpen,
      onOpenChange,
    });

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

    // Trigger animation when popover is opened and positioned
    React.useEffect(() => {
      if (state.isOpen && isPositioned) {
        setIsExiting(false);
        setIsAnimating(true);
      }
    }, [state.isOpen, isPositioned]);

    // Handle exit animation when closing
    React.useEffect(() => {
      if (!state.isOpen && isAnimating) {
        // First, enable exit mode so element stays in DOM
        setIsExiting(true);

        requestAnimationFrame(() => setIsAnimating(false));
        const timer = setTimeout(() => setIsExiting(false), 50)
        return () => clearTimeout(timer);
      }
    }, [state.isOpen, isAnimating]);

    React.useLayoutEffect(() => {
      refs.setReference(triggerRef.current);
    }, [refs]);

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

    // Convert React Aria's onPress to onClick for native HTML elements
    const nativeProps = React.useMemo(() => {
      const props: any = { ...triggerProps };
      if (props.onPress && typeof props.onPress === 'function') {
        const onPress = props.onPress;
        props.onClick = (e: React.MouseEvent) => {
          onPress({ target: e.currentTarget, type: 'press', pointerType: 'mouse', ctrlKey: e.ctrlKey, metaKey: e.metaKey, shiftKey: e.shiftKey, altKey: e.altKey });
        };
        delete props.onPress;
      }
      return props;
    }, [triggerProps]);

    const triggerElement = React.isValidElement(children)
      ? React.cloneElement(children as React.ReactElement<{ className?: string; ref?: React.Ref<HTMLButtonElement | HTMLDivElement> }>, {
        ...nativeProps,
        className: cn((children as React.ReactElement<{ className?: string }>).props.className, className),
        ref: mergedTriggerRef,
      })
      : (
        <span ref={mergedTriggerRef} {...nativeProps} className={cn("inline-block", className)}>
          {children}
        </span>
      );

    return (
      <>
        {triggerElement}
        {(state.isOpen || isExiting) &&
          createPortal(
            <div
              ref={mergedContentRef}
              style={{
                ...floatingStyles,
                pointerEvents: "none",
                transition: 'none',
                zIndex: 500,
              }}
            >
              <div
                style={{
                  opacity: isAnimating ? 1 : 0,
                  transform: isAnimating ? "scale(1)" : getInitialTransform(placement),
                  transition: 'opacity 0.2s ease-out',
                  pointerEvents: isAnimating ? 'auto' : 'none',
                }}
              >
                <Frame
                  {...mergeProps(overlayProps, dialogProps)}
                  role="dialog"
                  side={showArrow ? getFrameSide(position) : position}
                  shapeMode={showArrow ? "extend" : undefined}
                  path={showArrow ? ARROW_PATH : undefined}
                  pathWidth={showArrow ? ARROW_WIDTH : undefined}
                  fill="var(--color-background-900)"
                  borderColor="var(--color-background-700)"
                  cornerRadius={8}
                  padding="none"
                  className={cn("w-max pointer-events-auto text-foreground-50 text-sm shadow-lg", contentClassName)}
                  style={{
                    minWidth: '200px',
                    maxWidth: '400px',
                    padding: '0.75rem',
                  }}
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

Popover.displayName = "Popover";

export { Popover };
