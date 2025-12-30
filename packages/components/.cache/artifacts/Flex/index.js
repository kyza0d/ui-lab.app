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
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};

// src/components/Flex/Flex.tsx
import * as React from "react";

// src/lib/utils.ts
import { clsx } from "clsx";
function cn(...inputs) {
  return clsx(inputs);
}

// src/components/Flex/Flex.module.css
var Flex_default = {};

// src/components/Flex/Flex.tsx
import { jsx } from "react/jsx-runtime";
var directionMap = {
  row: Flex_default["row"],
  column: Flex_default["column"]
};
var wrapMap = {
  wrap: Flex_default["wrap"],
  nowrap: Flex_default["nowrap"]
};
var justifyMap = {
  "flex-start": Flex_default["justify-flex-start"],
  "flex-end": Flex_default["justify-flex-end"],
  center: Flex_default["justify-center"],
  "space-between": Flex_default["justify-space-between"],
  "space-around": Flex_default["justify-space-around"],
  "space-evenly": Flex_default["justify-space-evenly"]
};
var alignMap = {
  "flex-start": Flex_default["align-flex-start"],
  "flex-end": Flex_default["align-flex-end"],
  center: Flex_default["align-center"],
  stretch: Flex_default["align-stretch"],
  baseline: Flex_default["align-baseline"]
};
var gapMap = {
  xs: Flex_default["gap-xs"],
  sm: Flex_default["gap-sm"],
  md: Flex_default["gap-md"],
  lg: Flex_default["gap-lg"],
  xl: Flex_default["gap-xl"]
};
var Flex = React.forwardRef(
  (_a, ref) => {
    var _b = _a, {
      className,
      direction = "row",
      wrap = "nowrap",
      gap = "md",
      justify = "flex-start",
      align = "stretch",
      containerQueryResponsive = false,
      children
    } = _b, props = __objRest(_b, [
      "className",
      "direction",
      "wrap",
      "gap",
      "justify",
      "align",
      "containerQueryResponsive",
      "children"
    ]);
    if (containerQueryResponsive) {
      return /* @__PURE__ */ jsx(
        "div",
        __spreadProps(__spreadValues({
          ref,
          className: cn(Flex_default["container-query-parent"], className),
          "data-container-responsive": "true"
        }, props), {
          children: /* @__PURE__ */ jsx(
            "div",
            {
              className: cn(
                Flex_default.flex,
                directionMap[direction],
                wrapMap[wrap],
                gapMap[gap],
                justifyMap[justify],
                alignMap[align],
                Flex_default["container-responsive"]
              ),
              "data-direction": direction,
              "data-wrap": wrap,
              "data-gap": gap,
              "data-justify": justify,
              "data-align": align,
              children
            }
          )
        })
      );
    }
    return /* @__PURE__ */ jsx(
      "div",
      __spreadProps(__spreadValues({
        ref,
        className: cn(
          Flex_default.flex,
          directionMap[direction],
          wrapMap[wrap],
          gapMap[gap],
          justifyMap[justify],
          alignMap[align],
          className
        ),
        "data-direction": direction,
        "data-wrap": wrap,
        "data-gap": gap,
        "data-justify": justify,
        "data-align": align,
        "data-container-responsive": containerQueryResponsive || void 0
      }, props), {
        children
      })
    );
  }
);
Flex.displayName = "Flex";
export {
  Flex
};
