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

// src/components/Popover/Popover.tsx
import React from "react";
import { createPortal } from "react-dom";
import { useOverlayTrigger, useDialog, mergeProps } from "react-aria";
import { useOverlayTriggerState } from "react-stately";
import { useFloating, offset, flip, shift, autoUpdate } from "@floating-ui/react-dom";

// src/lib/utils.ts
import { clsx } from "clsx";
function cn(...inputs) {
  return clsx(inputs);
}

// src/components/Popover/Popover.tsx
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
var ARROW_SIZE = 12;
var ARROW_MASK_THICKNESS = 2;
var POPOVER_GAP = 8;
var ARROW_POSITIONING_SIZE = 6;
var PopoverArrow = ({ position }) => {
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
        /* @__PURE__ */ jsx("defs", { children: /* @__PURE__ */ jsxs("mask", { id: `popover-arrow-mask-${position}`, children: [
          /* @__PURE__ */ jsx("rect", { width: ARROW_SIZE, height: ARROW_SIZE, fill: "white" }),
          getMaskRect()
        ] }) }),
        /* @__PURE__ */ jsx(
          "polygon",
          {
            points: getArrowPoints(),
            fill: "var(--color-background-900)",
            mask: `url(#popover-arrow-mask-${position})`
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
var Popover = React.forwardRef(
  ({ children, content, position = "bottom", className, contentClassName, isOpen: controlledIsOpen, onOpenChange, showArrow = false }, ref) => {
    const triggerRef = React.useRef(null);
    const popoverContentRef = React.useRef(null);
    const [mounted, setMounted] = React.useState(false);
    const [portalContainer, setPortalContainer] = React.useState(null);
    const state = useOverlayTriggerState({
      isOpen: controlledIsOpen,
      onOpenChange
    });
    React.useEffect(() => {
      setMounted(true);
    }, []);
    const { triggerProps, overlayProps } = useOverlayTrigger({ type: "dialog" }, state, triggerRef);
    const { dialogProps } = useDialog({}, popoverContentRef);
    const placementMap = {
      top: "top",
      bottom: "bottom",
      left: "left",
      right: "right"
    };
    const { refs, floatingStyles, placement } = useFloating({
      placement: placementMap[position],
      whileElementsMounted: autoUpdate,
      middleware: [
        offset(POPOVER_GAP + ARROW_POSITIONING_SIZE),
        flip(),
        shift({ padding: 8 })
      ]
    });
    const isPositioned = floatingStyles.transform !== void 0;
    React.useLayoutEffect(() => {
      refs.setReference(triggerRef.current);
    }, [refs]);
    React.useEffect(() => {
      if (typeof document === "undefined")
        return;
      const container = document.createElement("div");
      container.setAttribute("data-popover-portal", "");
      container.style.cssText = "position: fixed; top: 0; left: 0; z-index: 500;";
      document.body.appendChild(container);
      setPortalContainer(container);
      return () => {
        document.body.removeChild(container);
      };
    }, []);
    React.useEffect(() => {
      if (!state.isOpen)
        return;
      const handleClickOutside = (e) => {
        const target = e.target;
        if (triggerRef.current && !triggerRef.current.contains(target) && popoverContentRef.current && !popoverContentRef.current.contains(target)) {
          state.close();
        }
      };
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }, [state.isOpen, state]);
    React.useEffect(() => {
      if (!state.isOpen)
        return;
      const handleKeyDown = (event) => {
        if (event.key === "Escape")
          state.close();
      };
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }, [state.isOpen, state]);
    const mergedTriggerRef = React.useCallback(
      (el) => {
        triggerRef.current = el;
        refs.setReference(el);
        if (typeof ref === "function")
          ref(el);
        else if (ref)
          ref.current = el;
      },
      [refs, ref]
    );
    const mergedContentRef = React.useCallback(
      (el) => {
        popoverContentRef.current = el;
        refs.setFloating(el);
      },
      [refs]
    );
    const triggerElement = React.isValidElement(children) ? React.cloneElement(children, __spreadProps(__spreadValues({}, triggerProps), {
      className: cn(children.props.className, className),
      ref: mergedTriggerRef
    })) : /* @__PURE__ */ jsx("div", __spreadProps(__spreadValues({ ref: mergedTriggerRef }, triggerProps), { className: cn("inline-block", className), children }));
    if (!mounted || !portalContainer) {
      return triggerElement;
    }
    return /* @__PURE__ */ jsxs(Fragment, { children: [
      triggerElement,
      state.isOpen && createPortal(
        /* @__PURE__ */ jsxs(
          "div",
          __spreadProps(__spreadValues({}, mergeProps(overlayProps, dialogProps)), {
            ref: mergedContentRef,
            role: "dialog",
            className: cn("relative pointer-events-auto bg-background-900 text-foreground-50 text-sm p-3 rounded-lg shadow-lg border border-background-700", contentClassName),
            style: __spreadProps(__spreadValues({}, floatingStyles), {
              visibility: isPositioned ? "visible" : "hidden"
            }),
            children: [
              content,
              showArrow && /* @__PURE__ */ jsx(PopoverArrow, { position })
            ]
          })
        ),
        portalContainer
      )
    ] });
  }
);
Popover.displayName = "Popover";
export {
  Popover
};
