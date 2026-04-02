"use client";

import React, { useRef, useState, useEffect, useCallback, useLayoutEffect } from "react";

import { createPortal } from "react-dom";
import { useTooltip, mergeProps } from "react-aria";
import { useFloating } from "../../hooks/useFloat/react/useFloating";
import { flip } from "../../hooks/useFloat/core/middleware/flip";
import { offset } from "../../hooks/useFloat/core/middleware/offset";
import { shift } from "../../hooks/useFloat/core/middleware/shift";
import { autoUpdate } from "../../hooks/useFloat/dom/autoUpdate";
import { cn } from "@/lib/utils";
import { useTooltipTriggerState } from "react-stately";
import { asElementProps } from "@/lib/react-aria";
import { Frame } from "../Frame";
import { Badge } from "../Badge";
import css from "./Tooltip.module.css";
import { type StylesProp, createStylesResolver } from "@/lib/styles";
import { type StyleValue } from "@/lib/utils";

const ARROW_PATH = "M 0 0 C 3 0 4 -9 6 -9 C 8 -9 9 0 12 0";
const ARROW_WIDTH = 12;
const TOOLTIP_GAP = 4;
const ARROW_POSITIONING_SIZE = 6;
const DEFAULT_SHOW_DELAY_MS = 600;
const SWAP_WINDOW_MS = 150;
const EXIT_ANIMATION_MS = 160;

let lastCloseTime = 0;
let lastOpenTime = 0;
let pendingExit: (() => void) | null = null;

function useTimeout() {
  const idRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const start = useCallback((fn: () => void, ms: number) => {
    clearTimeout(idRef.current);
    idRef.current = setTimeout(fn, ms);
  }, []);

  const clear = useCallback(() => {
    clearTimeout(idRef.current);
  }, []);

  useEffect(() => () => clearTimeout(idRef.current), []);

  return [start, clear] as const;
}

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

interface TooltipStyleSlots {
  root?: StyleValue;
  trigger?: StyleValue;
  content?: StyleValue;
  frame?: StyleValue;
  hintBadge?: StyleValue;
}

type TooltipStylesProp = StylesProp<TooltipStyleSlots>;

const resolveTooltipStyles = createStylesResolver([
  'root',
  'trigger',
  'content',
  'frame',
  'hintBadge',
] as const);

export interface TooltipProps {
  children: React.ReactNode;
  /** Content to display inside the tooltip */
  content: React.ReactNode;
  /** Preferred side of the trigger where the tooltip appears */
  position?: TooltipPosition;
  /** Additional CSS class for the trigger wrapper */
  className?: string;
  /** Milliseconds before the tooltip appears after hover */
  delay?: number;
  /** Whether the tooltip is disabled */
  isDisabled?: boolean;
  /** Controlled open state */
  isOpen?: boolean;
  /** Called when the tooltip opens or closes */
  onOpenChange?: (isOpen: boolean) => void;
  /** Whether to render a directional arrow pointing at the trigger */
  showArrow?: boolean;
  /** Keyboard shortcut or hint text rendered as a Badge at the end of the tooltip */
  hint?: string;
  /** Classes applied to the root or named slots. Accepts a string, cn()-compatible array, slot object, or array of any of those. */
  styles?: TooltipStylesProp;
}

const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
  (
    {
      children,
      content,
      position = "top",
      className,
      delay = DEFAULT_SHOW_DELAY_MS,
      isDisabled = false,
      isOpen: controlledIsOpen,
      onOpenChange,
      showArrow = false,
      hint,
      styles,
    },
    _ref
  ) => {
    const triggerWrapperRef = useRef<HTMLSpanElement>(null);
    const triggerRef = useRef<HTMLElement>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);
    const [shouldRender, setShouldRender] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isInstant, setIsInstant] = useState(false);
    const wasOpenRef = useRef(false);
    const [startSwapTimer, clearSwapTimer] = useTimeout();
    const [startUnmountTimer, clearUnmountTimer] = useTimeout();

    const resolved = resolveTooltipStyles(styles);

    const onOpenChangeRef = useRef(onOpenChange);
    onOpenChangeRef.current = onOpenChange;

    const state = useTooltipTriggerState({
      isOpen: controlledIsOpen,
      onOpenChange: useCallback((open: boolean) => {
        if (open) lastOpenTime = Date.now();
        else lastCloseTime = Date.now();
        onOpenChangeRef.current?.(open);
      }, []),
      delay,
      isDisabled,
    });

    const { tooltipProps: ariaTooltipProps } = useTooltip({}, state);

    const { refs, floatingStyles, placement } = useFloating({
      placement: position,
      // Tooltips are commonly used in fixed headers; fixed positioning avoids scroll drift.
      strategy: "fixed",
      whileElementsMounted: autoUpdate,
      middleware: [
        offset(TOOLTIP_GAP + ARROW_POSITIONING_SIZE),
        flip(),
        shift({ padding: 8 }),
      ],
    });

    const isPositioned = floatingStyles.transform !== undefined;

    useEffect(() => {
      if (state.isOpen) {
        wasOpenRef.current = true;
        const elapsed = Date.now() - lastCloseTime;
        const isSwap = lastCloseTime > 0 && elapsed < SWAP_WINDOW_MS;

        if (pendingExit) {
          pendingExit();
          pendingExit = null;
        }

        setIsInstant(isSwap);
        setShouldRender(true);
      } else if (wasOpenRef.current) {
        wasOpenRef.current = false;

        if (lastOpenTime > 0 && lastOpenTime >= lastCloseTime) {
          setIsVisible(false);
          setShouldRender(false);
          return;
        }

        // Non-batched: delay exit to allow cross-frame swap detection.
        // If another tooltip opens within the window, pendingExit cancels.
        startSwapTimer(() => {
          setIsVisible(false);
          startUnmountTimer(() => {
            setShouldRender(false);
            pendingExit = null;
          }, EXIT_ANIMATION_MS);
        }, SWAP_WINDOW_MS);

        pendingExit = () => {
          clearSwapTimer();
          clearUnmountTimer();
          setIsVisible(false);
          setShouldRender(false);
        };
      }
    }, [state.isOpen]);

    useEffect(() => {
      if (shouldRender && state.isOpen && isPositioned) {
        if (isInstant) {
          setIsVisible(true);
          const frame = requestAnimationFrame(() => setIsInstant(false));
          return () => cancelAnimationFrame(frame);
        } else {
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              setIsVisible(true);
            });
          });
        }
      }
    }, [shouldRender, state.isOpen, isPositioned, isInstant]);

    const mergedTriggerRef = useCallback((el: HTMLElement | null) => {
      (triggerRef as React.MutableRefObject<HTMLElement | null>).current = el;
      refs.setReference(el);
    }, [refs]);

    const mergedFloatingRef = useCallback((el: HTMLDivElement | null) => {
      (tooltipRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
      refs.setFloating(el);
    }, [refs]);

    useLayoutEffect(() => {
      const wrapper = triggerWrapperRef.current;
      const reference = wrapper?.firstElementChild instanceof HTMLElement
        ? wrapper.firstElementChild
        : wrapper;

      (triggerRef as React.MutableRefObject<HTMLElement | null>).current = reference;
      refs.setReference(reference);
    }, [children, refs]);

    useEffect(() => {
      const trigger = triggerRef.current;
      if (!trigger || isDisabled) {
        return;
      }

      const handleMouseEnter = () => state.open();
      const handleMouseLeave = () => state.close();
      const handleFocusIn = () => state.open(true);
      const handleFocusOut = (event: FocusEvent) => {
        if (event.relatedTarget instanceof Node && trigger.contains(event.relatedTarget)) {
          return;
        }

        state.close(true);
      };

      trigger.addEventListener("mouseenter", handleMouseEnter);
      trigger.addEventListener("mouseleave", handleMouseLeave);
      trigger.addEventListener("focusin", handleFocusIn);
      trigger.addEventListener("focusout", handleFocusOut);

      return () => {
        trigger.removeEventListener("mouseenter", handleMouseEnter);
        trigger.removeEventListener("mouseleave", handleMouseLeave);
        trigger.removeEventListener("focusin", handleFocusIn);
        trigger.removeEventListener("focusout", handleFocusOut);
      };
    }, [children, isDisabled, state]);

    const trigger = triggerRef.current;
    const isTriggerVisible = !!(trigger && (trigger.offsetWidth > 0 || trigger.offsetHeight > 0));
    const child = React.Children.only(children);

    const triggerElement = React.isValidElement(child) && child.type !== React.Fragment
      ? (
        <span
          ref={triggerWrapperRef}
          className={cn(css.trigger, className, resolved.trigger)}
        >
          {child}
        </span>
      )
      : (
        <span
          ref={mergedTriggerRef}
          className={cn(css.trigger, className, resolved.trigger)}
          style={{ display: "inline-block" }}
        >
          {children}
        </span>
      );

    return (
      <>
        {triggerElement}

        {shouldRender &&
          createPortal(
            <div
              ref={mergedFloatingRef}
              {...asElementProps<"div">(mergeProps(ariaTooltipProps))}
              className={cn(css.root, resolved.root)}
              style={{
                ...floatingStyles,
              }}
            >
              <div
                className={cn('tooltip', 'content', css.content, resolved.content)}
                data-visible={(isVisible && isTriggerVisible) ? "true" : "false"}
                data-instant={(isInstant || !isTriggerVisible) ? "true" : undefined}
                style={{
                  transform: (isVisible && isTriggerVisible) ? "scale(1)" : getInitialTransform(placement),
                }}
              >
                <Frame
                  side={showArrow ? getFrameSide(position) : position}
                  shapeMode={showArrow ? "extend" : undefined}
                  path={showArrow ? ARROW_PATH : undefined}
                  pathWidth={showArrow ? ARROW_WIDTH : undefined}
                  style={{ "--frame-radius": "8px" } as React.CSSProperties}
                >
                  <div className={cn('tooltip', 'frame', css.frame, resolved.frame)} data-hint={hint ? "" : undefined}>
                    {content}
                    {hint && <Badge variant="secondary" size="sm" className={cn(resolved.hintBadge)}>{hint}</Badge>}
                  </div>
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
