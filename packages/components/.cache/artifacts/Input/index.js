var __defProp = Object.defineProperty;
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

// src/components/Input/Input.tsx
import React, { forwardRef } from "react";
import { useFocusRing, mergeProps } from "react-aria";

// src/lib/utils.ts
import { clsx } from "clsx";
function cn(...inputs) {
  return clsx(inputs);
}

// src/components/Input/Input.module.css
var Input_default = {};

// src/components/Input/Input.tsx
import { jsx, jsxs } from "react/jsx-runtime";
function useMergedRef(...refs) {
  return React.useCallback((value) => {
    refs.forEach((ref) => {
      if (typeof ref === "function")
        ref(value);
      else if (ref && typeof ref === "object")
        ref.current = value;
    });
  }, refs);
}
var Input = forwardRef(
  (_a, ref) => {
    var _b = _a, {
      className,
      variant = "default",
      size = "md",
      error = false,
      disabled,
      prefixIcon,
      suffixIcon,
      type = "text"
    } = _b, props = __objRest(_b, [
      "className",
      "variant",
      "size",
      "error",
      "disabled",
      "prefixIcon",
      "suffixIcon",
      "type"
    ]);
    const hasPrefix = !!prefixIcon;
    const hasSuffix = !!suffixIcon;
    const inputRef = React.useRef(null);
    const mergedRef = useMergedRef(ref, inputRef);
    const { focusProps, isFocusVisible } = useFocusRing();
    return /* @__PURE__ */ jsxs("div", { className: Input_default.container, children: [
      hasPrefix && /* @__PURE__ */ jsx("div", { className: cn(Input_default.iconWrapper, Input_default.prefixIcon), children: prefixIcon }),
      /* @__PURE__ */ jsx(
        "input",
        __spreadValues({
          ref: mergedRef,
          type,
          disabled,
          "data-focus-visible": isFocusVisible ? "true" : void 0,
          "data-disabled": disabled || void 0,
          "data-error": error ? "true" : void 0,
          "data-variant": variant,
          "data-size": size,
          className: cn(
            Input_default.input,
            hasPrefix && "pl-10",
            hasSuffix && "pr-10",
            className
          )
        }, mergeProps(focusProps, props))
      ),
      hasSuffix && /* @__PURE__ */ jsx("div", { className: cn(Input_default.iconWrapper, Input_default.suffixIcon), children: suffixIcon })
    ] });
  }
);
Input.displayName = "Input";
export {
  Input
};
