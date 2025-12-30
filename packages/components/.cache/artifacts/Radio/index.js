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

// src/components/Radio/Radio.tsx
import React, { useId, createContext, useContext } from "react";
import { useRadioGroupState } from "react-stately";
import {
  useRadioGroup,
  useRadio,
  useFocusRing,
  mergeProps
} from "react-aria";

// src/lib/utils.ts
import { clsx } from "clsx";
function cn(...inputs) {
  return clsx(inputs);
}

// src/components/Radio/Radio.module.css
var Radio_default = {};

// src/components/Radio/Radio.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var RadioGroupContext = createContext(void 0);
var useRadioGroupContext = () => {
  const context = useContext(RadioGroupContext);
  return context;
};
var RadioGroup = React.forwardRef(
  ({
    value: controlledValue,
    defaultValue,
    onValueChange,
    disabled = false,
    size = "md",
    children,
    className,
    label,
    description
  }, ref) => {
    const state = useRadioGroupState({
      value: controlledValue,
      defaultValue,
      onChange: onValueChange,
      isDisabled: disabled
    });
    useRadioGroup(
      {
        isDisabled: disabled,
        label,
        description
      },
      state
    );
    return /* @__PURE__ */ jsx(
      RadioGroupContext.Provider,
      {
        value: { state, disabled, size },
        children: /* @__PURE__ */ jsxs(
          "div",
          {
            ref,
            className,
            role: "group",
            children: [
              label && /* @__PURE__ */ jsx(
                "label",
                {
                  className: cn(
                    Radio_default["radio-label"],
                    disabled && Radio_default["radio-label-disabled"]
                  ),
                  children: label
                }
              ),
              description && /* @__PURE__ */ jsx("p", { className: "text-sm text-foreground-500", children: description }),
              /* @__PURE__ */ jsx("div", { className: Radio_default["radio-group"], children })
            ]
          }
        )
      }
    );
  }
);
RadioGroup.displayName = "RadioGroup";
var RadioItem = React.forwardRef(
  (_a, ref) => {
    var _b = _a, {
      className,
      size: sizeProp,
      disabled: disabledProp = false,
      error = false,
      label,
      description,
      helperText,
      helperTextError = false,
      value,
      id
    } = _b, props = __objRest(_b, [
      "className",
      "size",
      "disabled",
      "error",
      "label",
      "description",
      "helperText",
      "helperTextError",
      "value",
      "id"
    ]);
    var _a2;
    const radioGroupContext = useRadioGroupContext();
    const generatedId = useId();
    const radioId = id || `radio-${generatedId}`;
    if (!(radioGroupContext == null ? void 0 : radioGroupContext.state)) {
      throw new Error("RadioItem must be used within a Radio.Group");
    }
    const { state } = radioGroupContext;
    const size = sizeProp || (radioGroupContext == null ? void 0 : radioGroupContext.size) || "md";
    const disabled = (_a2 = disabledProp != null ? disabledProp : radioGroupContext == null ? void 0 : radioGroupContext.disabled) != null ? _a2 : false;
    const isSelected = state.selectedValue === value;
    const inputRef = React.useRef(null);
    const { inputProps } = useRadio(
      {
        value,
        isDisabled: disabled,
        "aria-label": typeof label === "string" ? label : void 0
      },
      state,
      inputRef
    );
    const { focusProps, isFocusVisible } = useFocusRing();
    return /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
      /* @__PURE__ */ jsxs(
        "div",
        {
          className: Radio_default["radio-item"],
          "data-disabled": disabled || void 0,
          children: [
            /* @__PURE__ */ jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: cn(
                    Radio_default.radio,
                    Radio_default[size],
                    className
                  ),
                  "data-checked": isSelected || void 0,
                  "data-disabled": disabled || void 0,
                  "data-error": error ? "true" : void 0,
                  "data-focus-visible": isFocusVisible || void 0,
                  role: "presentation",
                  children: isSelected && /* @__PURE__ */ jsx("div", { className: cn(Radio_default["radio-dot"], Radio_default[size]) })
                }
              ),
              /* @__PURE__ */ jsx(
                "input",
                __spreadValues(__spreadProps(__spreadValues({}, mergeProps(inputProps, focusProps)), {
                  ref: ref || inputRef,
                  type: "radio",
                  id: radioId,
                  className: Radio_default["radio-input"],
                  suppressHydrationWarning: true
                }), props)
              )
            ] }),
            (label || description) && /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1", children: [
              label && /* @__PURE__ */ jsx(
                "label",
                {
                  htmlFor: radioId,
                  className: cn(
                    Radio_default["radio-label"],
                    disabled && Radio_default["radio-label-disabled"]
                  ),
                  suppressHydrationWarning: true,
                  children: label
                }
              ),
              description && /* @__PURE__ */ jsx(
                "p",
                {
                  className: cn(
                    Radio_default["radio-description"],
                    error && Radio_default["radio-description-error"]
                  ),
                  children: description
                }
              )
            ] })
          ]
        }
      ),
      helperText && /* @__PURE__ */ jsx(
        "p",
        {
          className: cn(
            "text-xs mt-2 ml-8 transition-colors",
            helperTextError ? "text-danger-600" : "text-foreground-500"
          ),
          children: helperText
        }
      )
    ] });
  }
);
RadioItem.displayName = "RadioItem";
var RadioBase = React.forwardRef(
  (_a, ref) => {
    var _b = _a, {
      className,
      size = "md",
      disabled = false,
      error = false,
      label,
      description,
      helperText,
      helperTextError = false,
      checked: checkedProp,
      defaultChecked,
      onChange,
      id
    } = _b, props = __objRest(_b, [
      "className",
      "size",
      "disabled",
      "error",
      "label",
      "description",
      "helperText",
      "helperTextError",
      "checked",
      "defaultChecked",
      "onChange",
      "id"
    ]);
    var _a2;
    const [internalChecked, setInternalChecked] = React.useState((_a2 = checkedProp != null ? checkedProp : defaultChecked) != null ? _a2 : false);
    const generatedId = useId();
    const isControlled = checkedProp !== void 0;
    const checked = isControlled ? checkedProp : internalChecked;
    const { focusProps, isFocusVisible } = useFocusRing();
    const handleChange = (e) => {
      if (!isControlled) {
        setInternalChecked(e.target.checked);
      }
      onChange == null ? void 0 : onChange(e);
    };
    const radioId = id || `radio-${generatedId}`;
    const inputRef = React.useRef(null);
    return /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
      /* @__PURE__ */ jsxs(
        "div",
        {
          className: Radio_default["radio-item"],
          "data-disabled": disabled || void 0,
          children: [
            /* @__PURE__ */ jsxs("div", { className: "relative", children: [
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: cn(
                    Radio_default.radio,
                    Radio_default[size],
                    className
                  ),
                  "data-checked": checked || void 0,
                  "data-disabled": disabled || void 0,
                  "data-error": error ? "true" : void 0,
                  "data-focus-visible": isFocusVisible || void 0,
                  role: "presentation",
                  children: checked && /* @__PURE__ */ jsx("div", { className: cn(Radio_default["radio-dot"], Radio_default[size]) })
                }
              ),
              /* @__PURE__ */ jsx(
                "input",
                __spreadValues(__spreadProps(__spreadValues({}, focusProps), {
                  ref: inputRef,
                  type: "radio",
                  id: radioId,
                  checked,
                  onChange: handleChange,
                  disabled: disabled != null ? disabled : false,
                  className: Radio_default["radio-input"],
                  "aria-label": typeof label === "string" ? label : void 0,
                  suppressHydrationWarning: true
                }), props)
              )
            ] }),
            (label || description) && /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1", children: [
              label && /* @__PURE__ */ jsx(
                "label",
                {
                  htmlFor: radioId,
                  className: cn(
                    Radio_default["radio-label"],
                    disabled && Radio_default["radio-label-disabled"]
                  ),
                  suppressHydrationWarning: true,
                  children: label
                }
              ),
              description && /* @__PURE__ */ jsx(
                "p",
                {
                  className: cn(
                    Radio_default["radio-description"],
                    error && Radio_default["radio-description-error"]
                  ),
                  children: description
                }
              )
            ] })
          ]
        }
      ),
      helperText && /* @__PURE__ */ jsx(
        "p",
        {
          className: cn(
            "text-xs mt-2 ml-8 transition-colors",
            helperTextError ? "text-danger-600" : "text-foreground-500"
          ),
          children: helperText
        }
      )
    ] });
  }
);
RadioBase.displayName = "Radio";
var Radio = Object.assign(RadioBase, {
  Group: RadioGroup,
  Item: RadioItem
});
export {
  Radio
};
