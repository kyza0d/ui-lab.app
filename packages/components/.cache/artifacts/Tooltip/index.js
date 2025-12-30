var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));

// src/components/Tooltip/Tooltip.tsx
import React, { useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { useTooltipTrigger, useTooltip, mergeProps } from "react-aria";

// src/lib/utils.ts
import { clsx } from "clsx";
function cn(...inputs) {
  return clsx(inputs);
}

// src/components/Tooltip/Tooltip.tsx
import { useTooltipTriggerState } from "react-stately";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
var ARROW_SIZE = 12;
var ARROW_MASK_THICKNESS = 2;
var TOOLTIP_GAP = 8;
var ARROW_POSITIONING_SIZE = 6;
var DEFAULT_SHOW_DELAY_MS = 200;
var TooltipArrow = ({ position }) => {
  const [borderWidth, setBorderWidth] = React.useState(1);
  React.useEffect(() => {
    const root = document.documentElement;
    const borderWidthStr = getComputedStyle(root).getPropertyValue("--border-width-base").trim();
    const width = parseFloat(borderWidthStr) || 1;
    setBorderWidth(width);
  }, []);
  const getArrowPoints = () => {
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
  const getBorderLines = () => {
    const halfSize = ARROW_SIZE / 2;
    switch (position) {
      case "top":
        return [
          { x1: halfSize, y1: ARROW_SIZE, x2: 0, y2: 0 },
          { x1: halfSize, y1: ARROW_SIZE, x2: ARROW_SIZE, y2: 0 }
        ];
      case "bottom":
        return [
          { x1: halfSize, y1: 0, x2: 0, y2: ARROW_SIZE },
          { x1: halfSize, y1: 0, x2: ARROW_SIZE, y2: ARROW_SIZE }
        ];
      case "left":
        return [
          { x1: ARROW_SIZE, y1: halfSize, x2: 0, y2: 0 },
          { x1: ARROW_SIZE, y1: halfSize, x2: 0, y2: ARROW_SIZE }
        ];
      case "right":
        return [
          { x1: 0, y1: halfSize, x2: ARROW_SIZE, y2: 0 },
          { x1: 0, y1: halfSize, x2: ARROW_SIZE, y2: ARROW_SIZE }
        ];
    }
  };
  const getArrowStyles = () => {
    const borderOffset = borderWidth / 2;
    switch (position) {
      case "top":
        return {
          top: `calc(100% + ${borderOffset}px)`,
          left: "50%",
          transform: `translateX(-50%) translateY(-${borderOffset}px)`
        };
      case "bottom":
        return {
          bottom: `calc(100% + ${borderOffset}px)`,
          left: "50%",
          transform: `translateX(-50%) translateY(${borderOffset}px)`
        };
      case "left":
        return {
          left: `calc(100% + ${borderOffset}px)`,
          top: "50%",
          transform: `translateY(-50%) translateX(-${borderOffset}px)`
        };
      case "right":
        return {
          right: `calc(100% + ${borderOffset}px)`,
          top: "50%",
          transform: `translateY(-50%) translateX(${borderOffset}px)`
        };
    }
  };
  const getMaskRect = () => {
    switch (position) {
      case "top":
        return /* @__PURE__ */ jsx("rect", { x: "0", y: ARROW_SIZE - ARROW_MASK_THICKNESS, width: ARROW_SIZE, height: ARROW_MASK_THICKNESS, fill: "black" });
      case "bottom":
        return /* @__PURE__ */ jsx("rect", { x: "0", y: "0", width: ARROW_SIZE, height: ARROW_MASK_THICKNESS, fill: "black" });
      case "left":
        return /* @__PURE__ */ jsx("rect", { x: ARROW_SIZE - ARROW_MASK_THICKNESS, y: "0", width: ARROW_MASK_THICKNESS, height: ARROW_SIZE, fill: "black" });
      case "right":
        return /* @__PURE__ */ jsx("rect", { x: "0", y: "0", width: ARROW_MASK_THICKNESS, height: ARROW_SIZE, fill: "black" });
    }
  };
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      width: ARROW_SIZE,
      height: ARROW_SIZE,
      viewBox: `0 0 ${ARROW_SIZE} ${ARROW_SIZE}`,
      className: "absolute pointer-events-none",
      style: getArrowStyles(),
      children: [
        /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsxs("mask", { id: `arrow-mask-${position}`, children: [
          /* @__PURE__ */ jsx("rect", { width: ARROW_SIZE, height: ARROW_SIZE, fill: "white" }),
          getMaskRect()
        ] }) }),
        /* @__PURE__ */ jsx(
          "polygon",
          {
            points: getArrowPoints(),
            fill: "var(--color-background-900)",
            mask: `url(#arrow-mask-${position})`
          }
        ),
        getBorderLines().map((line, idx) => /* @__PURE__ */ jsx(
          "line",
          {
            x1: line.x1,
            y1: line.y1,
            x2: line.x2,
            y2: line.y2,
            stroke: "var(--color-background-700)",
            strokeWidth: borderWidth,
            strokeLinecap: "round"
          },
          idx
        ))
      ]
    }
  );
};
var Tooltip = React.forwardRef(
  ({
    children,
    content,
    position = "top",
    className,
    contentClassName,
    delay = DEFAULT_SHOW_DELAY_MS,
    isDisabled = false,
    isOpen: controlledIsOpen,
    onOpenChange,
    showArrow = false
  }, _ref) => {
    const triggerRef = useRef(null);
    const tooltipRef = useRef(null);
    const state = useTooltipTriggerState({
      isOpen: controlledIsOpen,
      onOpenChange,
      delay,
      isDisabled
    });
    const { triggerProps, tooltipProps } = useTooltipTrigger(
      { isDisabled },
      state,
      triggerRef
    );
    const { tooltipProps: ariaTooltipProps } = useTooltip({}, state);
    const [tooltipPosition, setTooltipPosition] = React.useState({
      top: 0,
      left: 0
    });
    useEffect(() => {
      if (!state.isOpen || !triggerRef.current)
        return;
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
    const positionClasses = {
      top: "-translate-x-1/2 -translate-y-full",
      bottom: "-translate-x-1/2 translate-y-0",
      left: "-translate-y-1/2 -translate-x-full",
      right: "-translate-y-1/2 translate-x-0"
    };
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(
        "div",
        __spreadProps(__spreadValues({
          ref: triggerRef
        }, mergeProps(triggerProps)), {
          className: cn("inline-block", className),
          children
        })
      ),
      state.isOpen && createPortal(
        /* @__PURE__ */ jsx(
          "div",
          __spreadProps(__spreadValues({
            ref: tooltipRef
          }, mergeProps(tooltipProps, ariaTooltipProps)), {
            className: cn("absolute pointer-events-none z-50 transition-opacity", positionClasses[position], {
              "opacity-100": state.isOpen
            }),
            style: {
              top: `${tooltipPosition.top}px`,
              left: `${tooltipPosition.left}px`
            },
            children: /* @__PURE__ */ jsxs(
              "div",
              {
                className: cn(
                  "relative bg-background-900 text-foreground-50 text-sm px-3 py-2 rounded-lg whitespace-nowrap shadow-lg border border-background-700",
                  contentClassName
                ),
                children: [
                  content,
                  showArrow && /* @__PURE__ */ jsx(TooltipArrow, { position })
                ]
              }
            )
          })
        ),
        document.body
      )
    ] });
  }
);
Tooltip.displayName = "Tooltip";
export {
  Tooltip
};
