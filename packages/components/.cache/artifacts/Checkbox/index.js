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

// src/components/Checkbox/Checkbox.tsx
import React, { forwardRef, useState } from "react";

// src/lib/utils.ts
import { clsx } from "clsx";
function cn(...inputs) {
  return clsx(inputs);
}

// src/components/Checkbox/Checkbox.module.css
var Checkbox_default = {};

// src/components/Checkbox/Checkbox.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var sizeMap = {
  sm: Checkbox_default["size-sm"],
  md: Checkbox_default["size-md"],
  lg: Checkbox_default["size-lg"]
};
var labelSizeMap = {
  sm: Checkbox_default["label-sm"],
  md: Checkbox_default["label-md"],
  lg: Checkbox_default["label-lg"]
};
var Checkbox = forwardRef(
  (_a, ref) => {
    var _b = _a, {
      className,
      size = "md",
      label,
      helperText,
      helperTextError = false,
      id,
      disabled = false,
      checked,
      defaultChecked,
      onChange,
      isIndeterminate = false
    } = _b, props = __objRest(_b, [
      "className",
      "size",
      "label",
      "helperText",
      "helperTextError",
      "id",
      "disabled",
      "checked",
      "defaultChecked",
      "onChange",
      "isIndeterminate"
    ]);
    const inputRef = React.useRef(null);
    const [isFocused, setIsFocused] = useState(false);
    const [isPressed, setIsPressed] = useState(false);
    const [internalChecked, setInternalChecked] = useState(
      () => checked !== void 0 ? checked : defaultChecked != null ? defaultChecked : false
    );
    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);
    const handleMouseDown = React.useCallback((e) => {
      var _a2;
      if (!disabled) {
        setIsPressed(true);
      }
      (_a2 = props.onMouseDown) == null ? void 0 : _a2.call(props, e);
    }, [disabled, props]);
    const handleMouseUp = React.useCallback((e) => {
      var _a2;
      setIsPressed(false);
      (_a2 = props.onMouseUp) == null ? void 0 : _a2.call(props, e);
    }, [props]);
    const handleMouseLeave = React.useCallback((e) => {
      var _a2;
      setIsPressed(false);
      (_a2 = props.onMouseLeave) == null ? void 0 : _a2.call(props, e);
    }, [props]);
    const handleKeyDown = React.useCallback((e) => {
      var _a2;
      if (!disabled && (e.key === " " || e.key === "Enter")) {
        setIsPressed(true);
      }
      (_a2 = props.onKeyDown) == null ? void 0 : _a2.call(props, e);
    }, [disabled, props]);
    const handleKeyUp = React.useCallback((e) => {
      var _a2;
      if (e.key === " " || e.key === "Enter") {
        setIsPressed(false);
      }
      (_a2 = props.onKeyUp) == null ? void 0 : _a2.call(props, e);
    }, [props]);
    React.useEffect(() => {
      if (checked !== void 0) {
        setInternalChecked(checked);
      }
    }, [checked]);
    const handleChange = (e) => {
      setInternalChecked(e.target.checked);
      onChange == null ? void 0 : onChange(e);
    };
    const domProps = Object.fromEntries(
      Object.entries(props).filter(([, value]) => typeof value !== "boolean")
    );
    const isControlled = checked !== void 0;
    const displayChecked = isControlled ? checked : internalChecked;
    return /* @__PURE__ */ jsxs("div", { className: "w-full", ref, children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
        /* @__PURE__ */ jsx(
          "input",
          __spreadValues(__spreadProps(__spreadValues({
            ref: inputRef,
            type: "checkbox",
            id,
            disabled
          }, isControlled ? { checked } : { defaultChecked: internalChecked }), {
            onChange: handleChange,
            onFocus: handleFocus,
            onBlur: handleBlur,
            onMouseDown: handleMouseDown,
            onMouseUp: handleMouseUp,
            onMouseLeave: handleMouseLeave,
            onKeyDown: handleKeyDown,
            onKeyUp: handleKeyUp,
            className: cn(
              Checkbox_default.base,
              sizeMap[size],
              isIndeterminate && Checkbox_default.indeterminate,
              className
            ),
            "data-size": size,
            "data-selected": displayChecked ? "true" : void 0,
            "data-disabled": disabled ? "true" : void 0,
            "data-indeterminate": isIndeterminate ? "true" : void 0,
            "data-focused": isFocused ? "true" : void 0,
            "data-pressed": isPressed ? "true" : void 0
          }), domProps)
        ),
        label && /* @__PURE__ */ jsx(
          "label",
          {
            htmlFor: id,
            className: cn(
              Checkbox_default.label,
              labelSizeMap[size],
              disabled && Checkbox_default["label-disabled"]
            ),
            children: label
          }
        )
      ] }),
      helperText && /* @__PURE__ */ jsx(
        "p",
        {
          className: cn(
            Checkbox_default["helper-text"],
            helperTextError ? Checkbox_default["helper-text-error"] : Checkbox_default["helper-text-normal"]
          ),
          children: helperText
        }
      )
    ] });
  }
);
Checkbox.displayName = "Checkbox";
export {
  Checkbox
};
