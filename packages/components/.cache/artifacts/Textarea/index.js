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

// src/components/Textarea/Textarea.tsx
import React, { forwardRef, useState } from "react";
import { useFocusRing, mergeProps } from "react-aria";

// src/lib/utils.ts
import { clsx } from "clsx";
function cn(...inputs) {
  return clsx(inputs);
}

// src/components/Textarea/Textarea.module.css
var Textarea_default = {};

// src/components/Textarea/Textarea.tsx
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
var TextArea = forwardRef(
  (_a, ref) => {
    var _b = _a, {
      className,
      size = "md",
      error = false,
      disabled,
      resizable = true,
      showCharacterCount = false,
      maxCharacters,
      value: controlledValue,
      defaultValue,
      onChange
    } = _b, props = __objRest(_b, [
      "className",
      "size",
      "error",
      "disabled",
      "resizable",
      "showCharacterCount",
      "maxCharacters",
      "value",
      "defaultValue",
      "onChange"
    ]);
    var _a2;
    const [internalValue, setInternalValue] = useState((_a2 = controlledValue != null ? controlledValue : defaultValue) != null ? _a2 : "");
    const textareaRef = React.useRef(null);
    const mergedRef = useMergedRef(ref, textareaRef);
    const { focusProps, isFocusVisible } = useFocusRing();
    const currentValue = controlledValue !== void 0 ? controlledValue : internalValue;
    const charCount = typeof currentValue === "string" ? currentValue.length : 0;
    const isOverLimit = maxCharacters ? charCount > maxCharacters : false;
    const handleChange = (e) => {
      const newValue = e.target.value;
      if (maxCharacters && newValue.length > maxCharacters) {
        const truncated = newValue.slice(0, maxCharacters);
        if (controlledValue === void 0) {
          setInternalValue(truncated);
        }
        onChange == null ? void 0 : onChange(__spreadProps(__spreadValues({}, e), {
          target: __spreadProps(__spreadValues({}, e.target), { value: truncated })
        }));
      } else {
        if (controlledValue === void 0) {
          setInternalValue(newValue);
        }
        onChange == null ? void 0 : onChange(e);
      }
    };
    return /* @__PURE__ */ jsxs("div", { className: Textarea_default.container, children: [
      /* @__PURE__ */ jsx(
        "textarea",
        __spreadValues({
          ref: mergedRef,
          disabled,
          "data-focus-visible": isFocusVisible || void 0,
          "data-disabled": disabled || void 0,
          "data-error": error || isOverLimit ? "true" : void 0,
          "data-size": size,
          "data-resizable": resizable ? void 0 : "false",
          className: cn(Textarea_default.textarea, className),
          value: currentValue
        }, mergeProps(focusProps, __spreadValues({ onChange: handleChange }, props)))
      ),
      showCharacterCount && /* @__PURE__ */ jsxs(
        "div",
        {
          className: Textarea_default.characterCount,
          "data-over-limit": isOverLimit || void 0,
          children: [
            charCount,
            maxCharacters ? ` / ${maxCharacters}` : "",
            " characters"
          ]
        }
      )
    ] });
  }
);
TextArea.displayName = "TextArea";
export {
  TextArea
};
