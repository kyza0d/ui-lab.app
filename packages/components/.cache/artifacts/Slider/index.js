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

// src/components/Slider/Slider.tsx
import * as React from "react";
import { useFocusRing } from "react-aria";

// src/lib/utils.ts
import { clsx } from "clsx";
function cn(...inputs) {
  return clsx(inputs);
}

// src/components/Slider/Slider.module.css
var Slider_default = {};

// src/components/Slider/Slider.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var SliderContext = React.createContext(null);
function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}
function snapToStep(value, min, max, step) {
  const snapped = Math.round((value - min) / step) * step + min;
  return clamp(snapped, min, max);
}
function SliderThumbInternal({
  index,
  value,
  min,
  max,
  step,
  disabled,
  trackRef,
  onValueChange,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy
}) {
  const thumbRef = React.useRef(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const { focusProps, isFocusVisible } = useFocusRing();
  const percent = (value - min) / (max - min) * 100;
  const getValueFromPointer = React.useCallback((clientX) => {
    const track = trackRef.current;
    if (!track)
      return value;
    const rect = track.getBoundingClientRect();
    const percent2 = clamp((clientX - rect.left) / rect.width, 0, 1);
    const rawValue = percent2 * (max - min) + min;
    return snapToStep(rawValue, min, max, step);
  }, [trackRef, min, max, step, value]);
  const handlePointerDown = (e) => {
    var _a, _b;
    if (disabled)
      return;
    e.preventDefault();
    setIsDragging(true);
    (_a = thumbRef.current) == null ? void 0 : _a.setPointerCapture(e.pointerId);
    (_b = thumbRef.current) == null ? void 0 : _b.focus();
  };
  const handlePointerMove = (e) => {
    if (!isDragging || disabled)
      return;
    const newValue = getValueFromPointer(e.clientX);
    if (newValue !== value) {
      onValueChange(index, newValue);
    }
  };
  const handlePointerUp = (e) => {
    var _a;
    if (isDragging) {
      setIsDragging(false);
      (_a = thumbRef.current) == null ? void 0 : _a.releasePointerCapture(e.pointerId);
    }
  };
  const handleKeyDown = (e) => {
    if (disabled)
      return;
    let newValue = value;
    const largeStep = step * 10;
    switch (e.key) {
      case "ArrowRight":
      case "ArrowUp":
        newValue = clamp(value + step, min, max);
        break;
      case "ArrowLeft":
      case "ArrowDown":
        newValue = clamp(value - step, min, max);
        break;
      case "PageUp":
        newValue = clamp(value + largeStep, min, max);
        break;
      case "PageDown":
        newValue = clamp(value - largeStep, min, max);
        break;
      case "Home":
        newValue = min;
        break;
      case "End":
        newValue = max;
        break;
      default:
        return;
    }
    e.preventDefault();
    if (newValue !== value) {
      onValueChange(index, newValue);
    }
  };
  return /* @__PURE__ */ jsx(
    "div",
    __spreadValues({
      ref: thumbRef,
      role: "slider",
      tabIndex: disabled ? -1 : 0,
      "aria-valuemin": min,
      "aria-valuemax": max,
      "aria-valuenow": value,
      "aria-disabled": disabled || void 0,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      className: cn("slider thumb", Slider_default.thumb),
      style: { left: `${percent}%` },
      "data-dragging": isDragging || void 0,
      "data-focus-visible": isFocusVisible || void 0,
      onPointerDown: handlePointerDown,
      onPointerMove: handlePointerMove,
      onPointerUp: handlePointerUp,
      onPointerCancel: handlePointerUp,
      onKeyDown: handleKeyDown
    }, focusProps)
  );
}
var Root = React.forwardRef(
  (_a, ref) => {
    var _b = _a, {
      className,
      size = "md",
      disabled,
      style,
      defaultValue,
      value: controlledValue,
      onValueChange,
      min = 0,
      max = 100,
      step = 1,
      orientation = "horizontal",
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy
    } = _b, props = __objRest(_b, [
      "className",
      "size",
      "disabled",
      "style",
      "defaultValue",
      "value",
      "onValueChange",
      "min",
      "max",
      "step",
      "orientation",
      "aria-label",
      "aria-labelledby"
    ]);
    const trackRef = React.useRef(null);
    const normalizeValue = (v) => {
      if (v === void 0)
        return void 0;
      return Array.isArray(v) ? v : [v];
    };
    const [internalValues, setInternalValues] = React.useState(() => {
      var _a2, _b2;
      return (_b2 = (_a2 = normalizeValue(defaultValue)) != null ? _a2 : normalizeValue(controlledValue)) != null ? _b2 : [min];
    });
    const isControlled = controlledValue !== void 0;
    const values = isControlled ? normalizeValue(controlledValue) : internalValues;
    const handleValueChange = React.useCallback((index, newValue) => {
      const newValues = [...values];
      newValues[index] = newValue;
      if (!isControlled) {
        setInternalValues(newValues);
      }
      onValueChange == null ? void 0 : onValueChange(newValues);
    }, [values, isControlled, onValueChange]);
    const handleTrackClick = (e) => {
      if (disabled)
        return;
      if (e.target !== trackRef.current)
        return;
      const track = trackRef.current;
      if (!track)
        return;
      const rect = track.getBoundingClientRect();
      const percent = clamp((e.clientX - rect.left) / rect.width, 0, 1);
      const rawValue = percent * (max - min) + min;
      const newValue = snapToStep(rawValue, min, max, step);
      let closestIndex = 0;
      let closestDistance = Math.abs(values[0] - newValue);
      for (let i = 1; i < values.length; i++) {
        const distance = Math.abs(values[i] - newValue);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = i;
        }
      }
      handleValueChange(closestIndex, newValue);
    };
    return /* @__PURE__ */ jsx(SliderContext.Provider, { value: { size, disabled }, children: /* @__PURE__ */ jsx(
      "div",
      __spreadProps(__spreadValues({
        ref,
        "data-size": size,
        "data-disabled": disabled || void 0,
        "data-orientation": orientation,
        style,
        className: cn("slider", Slider_default.slider, className)
      }, props), {
        children: /* @__PURE__ */ jsxs(
          "div",
          {
            ref: trackRef,
            className: cn("slider track", Slider_default.track),
            onPointerDown: handleTrackClick,
            children: [
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: cn("slider range", Slider_default.range),
                  style: {
                    left: `${values.length === 1 ? 0 : (values[0] - min) / (max - min) * 100}%`,
                    right: `${values.length === 1 ? 100 - (values[0] - min) / (max - min) * 100 : 100 - (values[values.length - 1] - min) / (max - min) * 100}%`
                  }
                }
              ),
              values.map((value, index) => /* @__PURE__ */ jsx(
                SliderThumbInternal,
                {
                  index,
                  value,
                  min,
                  max,
                  step,
                  disabled,
                  trackRef,
                  onValueChange: handleValueChange,
                  "aria-label": ariaLabel,
                  "aria-labelledby": ariaLabelledBy
                },
                index
              ))
            ]
          }
        )
      })
    ) });
  }
);
Root.displayName = "SliderRoot";
export {
  Root
};
