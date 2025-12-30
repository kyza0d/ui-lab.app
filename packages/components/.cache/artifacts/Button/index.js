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

// src/components/Button/Button.tsx
import * as React from "react";
import { useButton, useFocusRing, useHover, mergeProps } from "react-aria";

// src/lib/utils.ts
import { clsx } from "clsx";
function cn(...inputs) {
  return clsx(inputs);
}

// src/components/Button/Button.module.css
var Button_default = {};

// src/components/Button/Button.tsx
import { jsx } from "react/jsx-runtime";
var variantMap = {
  primary: Button_default["primary"],
  secondary: Button_default["secondary"],
  outline: Button_default["outline"],
  ghost: Button_default["ghost"]
};
var sizeMap = {
  sm: Button_default["sm"],
  md: Button_default["md"],
  lg: Button_default["lg"]
};
var Button = React.forwardRef(
  (_a, ref) => {
    var _b = _a, { className, variant = "primary", size = "md", children, onClick, onPress, isDisabled, disabled } = _b, props = __objRest(_b, ["className", "variant", "size", "children", "onClick", "onPress", "isDisabled", "disabled"]);
    var _a2;
    const buttonRef = React.useRef(null);
    const mergedRef = useMergedRef(ref, buttonRef);
    const isButtonDisabled = (_a2 = isDisabled != null ? isDisabled : disabled) != null ? _a2 : false;
    const [isPressed, setIsPressed] = React.useState(false);
    const handlePress = React.useCallback((e) => {
      if (onPress)
        onPress({ target: e.target });
      if (onClick)
        onClick(e);
    }, [onPress, onClick]);
    const handleMouseDown = React.useCallback((e) => {
      var _a3;
      if (!isButtonDisabled) {
        setIsPressed(true);
      }
      (_a3 = props.onMouseDown) == null ? void 0 : _a3.call(props, e);
    }, [isButtonDisabled, props]);
    const handleMouseUp = React.useCallback((e) => {
      var _a3;
      setIsPressed(false);
      (_a3 = props.onMouseUp) == null ? void 0 : _a3.call(props, e);
    }, [props]);
    const handleMouseLeave = React.useCallback((e) => {
      var _a3;
      setIsPressed(false);
      (_a3 = props.onMouseLeave) == null ? void 0 : _a3.call(props, e);
    }, [props]);
    const { buttonProps } = useButton({
      isDisabled: isButtonDisabled,
      onPress: handlePress
    }, buttonRef);
    const { focusProps, isFocused, isFocusVisible } = useFocusRing({ autoFocus: props.autoFocus });
    const { hoverProps, isHovered } = useHover({ isDisabled: isButtonDisabled });
    return /* @__PURE__ */ jsx(
      "button",
      __spreadProps(__spreadValues({}, mergeProps(buttonProps, focusProps, hoverProps, props)), {
        ref: mergedRef,
        onMouseDown: handleMouseDown,
        onMouseUp: handleMouseUp,
        onMouseLeave: handleMouseLeave,
        className: cn("button", variant, size, Button_default.button, variantMap[variant], sizeMap[size], className),
        "data-variant": variant,
        "data-size": size,
        "data-disabled": isButtonDisabled ? "true" : void 0,
        "data-pressed": isPressed ? "true" : "false",
        "data-hovered": isHovered ? "true" : "false",
        "data-focused": isFocused ? "true" : "false",
        "data-focus-visible": isFocusVisible ? "true" : "false",
        children
      })
    );
  }
);
function useMergedRef(...refs) {
  return (value) => {
    refs.forEach((ref) => {
      if (typeof ref === "function")
        ref(value);
      else if (ref && typeof ref === "object")
        ref.current = value;
    });
  };
}
Button.displayName = "Button";
export {
  Button
};
