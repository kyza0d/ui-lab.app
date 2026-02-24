"use client";

import React, { useRef, useLayoutEffect, useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { useTooltipTrigger, useTooltip, mergeProps } from "react-aria";
import { useFloating, offset, flip, shift, autoUpdate } from "@floating-ui/react-dom";
import { cn } from "@/lib/utils";
import { useTooltipTriggerState } from "react-stately";
import { Frame } from "../Frame";
import styles from "./Tooltip.module.css";

const ARROW_PATH = "M 0 0 L 6 -12 L 12 0";
const ARROW_WIDTH = 12;
const TOOLTIP_GAP = 8;
const ARROW_POSITIONING_SIZE = 6;
const DEFAULT_SHOW_DELAY_MS = 600;
const SWAP_WINDOW_MS = 150;
const EXIT_ANIMATION_MS = 160;

// Module-level timestamps set synchronously in onOpenChange (before effects).
// This eliminates DOM-order dependency: both opening and closing effects
// can reliably read these regardless of which effect runs first.
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

const placementMap: Record<TooltipPosition, "top" | "bottom" | "left" | "right"> = {
  top: "top",
  bottom: "bottom",
  left: "left",
  right: "right",
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
    },
    _ref
  ) => {
    const triggerRef = useRef<HTMLDivElement>(null);
    const tooltipRef = useRef<HTMLDivElement>(null);
    const [shouldRender, setShouldRender] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isInstant, setIsInstant] = useState(false);
    const wasOpenRef = useRef(false);
    const [startSwapTimer, clearSwapTimer] = useTimeout();
    const [startUnmountTimer, clearUnmountTimer] = useTimeout();

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

    const { triggerProps, tooltipProps } = useTooltipTrigger(
      { isDisabled },
      state,
      triggerRef
    );
    const { tooltipProps: ariaTooltipProps } = useTooltip({}, state);

    const { refs, floatingStyles, placement } = useFloating({
      placement: placementMap[position],
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

        // Batched swap: onOpenChange timestamps are set synchronously
        // before effects, so if another tooltip opened in this cycle,
        // lastOpenTime will be >= lastCloseTime.
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
          requestAnimationFrame(() => setIsInstant(false));
        } else {
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              setIsVisible(true);
            });
          });
        }
      }
    }, [shouldRender, state.isOpen, isPositioned]);

    useLayoutEffect(() => {
      refs.setReference(triggerRef.current);
    }, [refs]);

    return (
      <>
        <div
          ref={triggerRef}
          {...mergeProps(triggerProps)}
          className={cn(styles.trigger, className)}
        >
          {children}
        </div>

        {shouldRender &&
          createPortal(
            <div
              ref={(el) => {
                (tooltipRef as React.MutableRefObject<HTMLDivElement | null>).current = el;
                refs.setFloating(el);
              }}
              {...mergeProps(tooltipProps, ariaTooltipProps)}
              className={styles.root}
              style={{
                ...floatingStyles,
              }}
            >
              <div
                className={styles.content}
                data-visible={isVisible ? "true" : "false"}
                data-instant={isInstant || undefined}
                style={{
                  transform: isVisible ? "scale(1)" : getInitialTransform(placement),
                  pointerEvents: isVisible ? "auto" : "none",
                }}
              >
                <Frame
                  side={showArrow ? getFrameSide(position) : position}
                  shapeMode={showArrow ? "extend" : undefined}
                  path={showArrow ? ARROW_PATH : undefined}
                  pathWidth={showArrow ? ARROW_WIDTH : undefined}
                  cornerRadius={8}
                  padding="none"
                >
                  <div className={styles["content-frame"]}>
                    {content}
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
