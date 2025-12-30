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

// src/components/Progress/Progress.tsx
import * as React from "react";

// src/lib/utils.ts
import { clsx } from "clsx";
function cn(...inputs) {
  return clsx(inputs);
}

// src/components/Progress/Progress.module.css
var Progress_default = {};

// src/components/Progress/Progress.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var sizeMap = {
  sm: Progress_default.sm,
  md: Progress_default.md,
  lg: Progress_default.lg
};
var variantMap = {
  default: Progress_default.default,
  success: Progress_default.success,
  warning: Progress_default.warning,
  error: Progress_default.error
};
var Progress = React.forwardRef(
  (_a, ref) => {
    var _b = _a, {
      className,
      value = 0,
      max = 100,
      variant = "default",
      size = "md",
      indeterminate = false,
      label,
      showValue = false,
      animated = false
    } = _b, props = __objRest(_b, [
      "className",
      "value",
      "max",
      "variant",
      "size",
      "indeterminate",
      "label",
      "showValue",
      "animated"
    ]);
    const clampedValue = Math.min(Math.max(value, 0), max);
    const percentage = clampedValue / max * 100;
    const hasLabelContent = label || showValue;
    return /* @__PURE__ */ jsxs(
      "div",
      {
        className: cn(Progress_default.wrapper, hasLabelContent && Progress_default.hasLabel),
        children: [
          hasLabelContent && /* @__PURE__ */ jsxs("div", { className: Progress_default.labelRow, children: [
            label && /* @__PURE__ */ jsx("span", { className: Progress_default.label, children: label }),
            showValue && !indeterminate && /* @__PURE__ */ jsxs("span", { className: Progress_default.value, children: [
              Math.round(percentage),
              "%"
            ] })
          ] }),
          /* @__PURE__ */ jsx(
            "div",
            __spreadProps(__spreadValues({
              ref,
              role: "progressbar",
              "aria-valuenow": indeterminate ? void 0 : clampedValue,
              "aria-valuemin": 0,
              "aria-valuemax": max,
              "aria-label": label,
              className: cn(Progress_default.progress, sizeMap[size], className),
              "data-variant": variant,
              "data-size": size,
              "data-indeterminate": indeterminate || void 0
            }, props), {
              children: /* @__PURE__ */ jsx(
                "div",
                {
                  className: cn(
                    Progress_default.fill,
                    variantMap[variant],
                    (animated || indeterminate) && Progress_default.animated,
                    indeterminate && Progress_default.indeterminate
                  ),
                  style: indeterminate ? void 0 : { width: `${percentage}%` }
                }
              )
            })
          )
        ]
      }
    );
  }
);
Progress.displayName = "Progress";
export {
  Progress
};
