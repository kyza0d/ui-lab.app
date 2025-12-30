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

// src/components/Switch/Switch.tsx
import React from "react";
import { useSwitch, useFocusRing, useHover, mergeProps } from "react-aria";
import { useToggleState } from "react-stately";

// src/lib/utils.ts
import { clsx } from "clsx";
function cn(...inputs) {
  return clsx(inputs);
}

// src/components/Switch/Switch.module.css
var Switch_default = {};

// src/components/Switch/Switch.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var sizeMap = {
  sm: Switch_default["sm"],
  md: Switch_default["md"],
  lg: Switch_default["lg"]
};
var shapeMap = {
  pill: Switch_default["pill"],
  round: Switch_default["round"]
};
var thumbPositions = {
  sm: { unchecked: 0.25, checked: 1.25 },
  md: { unchecked: 0.25, checked: 1.5 },
  lg: { unchecked: 0.25, checked: 1.75 }
};
var Switch = React.forwardRef(
  (_a, ref) => {
    var _b = _a, {
      className,
      size = "md",
      isDisabled = false,
      isSelected: controlledSelected,
      onChange,
      defaultSelected,
      pill
    } = _b, props = __objRest(_b, [
      "className",
      "size",
      "isDisabled",
      "isSelected",
      "onChange",
      "defaultSelected",
      "pill"
    ]);
    const state = useToggleState({
      isSelected: controlledSelected,
      defaultSelected: defaultSelected != null ? defaultSelected : false,
      onChange
    });
    const inputRef = React.useRef(null);
    const { inputProps, isSelected } = useSwitch(
      { isDisabled },
      state,
      inputRef
    );
    const { focusProps, isFocusVisible } = useFocusRing();
    const { hoverProps, isHovered } = useHover({ isDisabled });
    const isPill = pill === true;
    const shapeClass = isPill ? shapeMap.pill : shapeMap.round;
    const position = thumbPositions[size];
    const thumbLeft = isSelected ? position.checked : position.unchecked;
    React.useImperativeHandle(ref, () => inputRef.current);
    return /* @__PURE__ */ jsxs(
      "div",
      {
        className: cn(
          "switch",
          Switch_default.switch,
          sizeMap[size],
          shapeClass,
          className
        ),
        "data-selected": isSelected || void 0,
        "data-disabled": isDisabled || void 0,
        "data-focus-visible": isFocusVisible || void 0,
        "data-hovered": isHovered || void 0,
        children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              className: cn(
                "switch-track",
                Switch_default["switch-track"],
                shapeClass
              )
            }
          ),
          /* @__PURE__ */ jsx(
            "div",
            {
              className: cn(
                "switch-thumb",
                Switch_default["switch-thumb"],
                sizeMap[size],
                shapeClass
              ),
              style: {
                left: `${thumbLeft}rem`
              }
            }
          ),
          /* @__PURE__ */ jsx(
            "input",
            __spreadValues(__spreadValues({
              ref: inputRef,
              type: "checkbox",
              className: "absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            }, mergeProps(inputProps, focusProps, hoverProps)), props)
          )
        ]
      }
    );
  }
);
Switch.displayName = "Switch";
export {
  Switch
};
