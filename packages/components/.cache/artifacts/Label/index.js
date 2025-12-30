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

// src/components/Label/Label.tsx
import { cva } from "class-variance-authority";

// src/lib/utils.ts
import { clsx } from "clsx";
function cn(...inputs) {
  return clsx(inputs);
}

// src/components/Label/Label.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var labelVariants = cva(
  "block text-foreground-300 transition-colors",
  {
    variants: {
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base"
      },
      disabled: {
        true: "text-foreground-500 opacity-60 cursor-not-allowed",
        false: ""
      },
      error: {
        true: "text-danger-600",
        false: ""
      }
    },
    defaultVariants: {
      size: "md",
      disabled: false,
      error: false
    }
  }
);
var Label = (_a) => {
  var _b = _a, {
    className,
    size,
    disabled,
    error,
    required,
    helperText,
    helperTextError,
    children
  } = _b, props = __objRest(_b, [
    "className",
    "size",
    "disabled",
    "error",
    "required",
    "helperText",
    "helperTextError",
    "children"
  ]);
  return /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
    /* @__PURE__ */ jsxs(
      "label",
      __spreadProps(__spreadValues({
        className: cn(
          labelVariants({ size, disabled, error, className })
        )
      }, props), {
        children: [
          children,
          required && /* @__PURE__ */ jsx("span", { className: "text-danger-600 ml-1", "aria-label": "required", children: "*" })
        ]
      })
    ),
    helperText && /* @__PURE__ */ jsx("p", { className: cn(
      "text-xs mt-1 transition-colors",
      helperTextError ? "text-danger-600" : "text-foreground-500"
    ), children: helperText })
  ] });
};
Label.displayName = "Label";
export {
  Label,
  labelVariants
};
