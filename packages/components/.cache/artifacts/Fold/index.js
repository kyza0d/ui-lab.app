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

// src/components/Fold/Fold.tsx
import * as React2 from "react";
import { useToggleState } from "react-stately";
import { useButton, useFocusRing, mergeProps } from "react-aria";

// src/lib/utils.ts
import { clsx } from "clsx";
function cn(...inputs) {
  return clsx(inputs);
}

// src/components/Divider/Divider.tsx
import { cva } from "class-variance-authority";
import React from "react";
import { jsx } from "react/jsx-runtime";
var dividerVariants = cva("shrink-0", {
  variants: {
    variant: {
      solid: "",
      dashed: "",
      dotted: ""
    },
    orientation: {
      horizontal: "w-full",
      vertical: ""
    },
    size: {
      sm: "",
      md: "",
      lg: ""
    },
    color: {
      default: "",
      muted: "",
      subtle: ""
    },
    spacing: {
      none: "",
      sm: "",
      md: "",
      lg: ""
    }
  },
  compoundVariants: [
    {
      orientation: "horizontal",
      size: "sm",
      class: "h-px"
    },
    {
      orientation: "vertical",
      size: "sm",
      class: "w-px self-stretch"
    },
    {
      orientation: "horizontal",
      size: "md",
      class: "h-0.5"
    },
    {
      orientation: "vertical",
      size: "md",
      class: "w-0.5 self-stretch"
    },
    {
      orientation: "horizontal",
      size: "lg",
      class: "h-1"
    },
    {
      orientation: "vertical",
      size: "lg",
      class: "w-1 self-stretch"
    },
    {
      orientation: "horizontal",
      spacing: "none",
      class: "my-0"
    },
    {
      orientation: "vertical",
      spacing: "none",
      class: "mx-0"
    },
    {
      orientation: "horizontal",
      spacing: "sm",
      class: "my-1"
    },
    {
      orientation: "vertical",
      spacing: "sm"
    },
    {
      orientation: "horizontal",
      spacing: "md",
      class: "my-1"
    },
    {
      orientation: "vertical",
      spacing: "md",
      class: "mx-1"
    },
    {
      orientation: "horizontal",
      spacing: "lg",
      class: "my-1"
    },
    {
      orientation: "vertical",
      spacing: "lg",
      class: "mx-1"
    },
    // --- Solid Variant & Color Compounds ---
    {
      variant: "solid",
      orientation: "horizontal",
      color: "default",
      class: "border-t-background-700 border-t"
    },
    {
      variant: "solid",
      orientation: "horizontal",
      color: "muted",
      class: "border-t-background-500 border-t"
    },
    {
      variant: "solid",
      orientation: "horizontal",
      color: "subtle",
      class: "border-t-background-400 border-t"
    },
    {
      variant: "solid",
      orientation: "vertical",
      color: "default",
      class: "border-l-background-700 border-l"
    },
    {
      variant: "solid",
      orientation: "vertical",
      color: "muted",
      class: "border-l-background-500 border-l"
    },
    {
      variant: "solid",
      orientation: "vertical",
      color: "subtle",
      class: "border-l-background-400 border-l"
    },
    {
      variant: "dashed",
      orientation: "horizontal",
      color: "default",
      class: "border-t-dashed border-t-background-600 border-t"
    },
    {
      variant: "dashed",
      orientation: "horizontal",
      color: "muted",
      class: "border-t-dashed border-t-background-500 border-t"
    },
    {
      variant: "dashed",
      orientation: "horizontal",
      color: "subtle",
      class: "border-t-dashed border-t-background-400 border-t"
    },
    {
      variant: "dashed",
      orientation: "vertical",
      color: "default",
      class: "border-l-dashed border-l-background-600 border-l"
    },
    {
      variant: "dashed",
      orientation: "vertical",
      color: "muted",
      class: "border-l-dashed border-l-background-500 border-l"
    },
    {
      variant: "dashed",
      orientation: "vertical",
      color: "subtle",
      class: "border-l-dashed border-l-background-400 border-l"
    },
    // --- Dotted Variant ---
    {
      variant: "dotted",
      orientation: "horizontal",
      color: "default",
      class: "border-t-dotted border-t-background-600 border-t"
    },
    {
      variant: "dotted",
      orientation: "horizontal",
      color: "muted",
      class: "border-t-dotted border-t-background-500 border-t"
    },
    {
      variant: "dotted",
      orientation: "horizontal",
      color: "subtle",
      class: "border-t-dotted border-t-background-400 border-t"
    },
    {
      variant: "dotted",
      orientation: "vertical",
      color: "default",
      class: "border-l-dotted border-l-background-600 border-l"
    },
    {
      variant: "dotted",
      orientation: "vertical",
      color: "muted",
      class: "border-l-dotted border-l-background-500 border-l"
    },
    {
      variant: "dotted",
      orientation: "vertical",
      color: "subtle",
      class: "border-l-dotted border-l-background-400 border-l"
    }
  ],
  defaultVariants: {
    variant: "solid",
    orientation: "horizontal",
    size: "md",
    color: "default",
    spacing: "md"
  }
});
var Divider = React.forwardRef(
  (_a, ref) => {
    var _b = _a, {
      className,
      variant,
      orientation,
      size,
      color: color,
      spacing,
      style
    } = _b, props = __objRest(_b, [
      "className",
      "variant",
      "orientation",
      "size",
      // Destructure 'color'
      "color",
      "spacing",
      "style"
    ]);
    const baseClasses = cn(
      dividerVariants({
        variant,
        orientation,
        size,
        color,
        // Pass the 'color' prop
        spacing,
        className
      })
    );
    const styleObject = typeof style === "string" ? {} : style;
    return /* @__PURE__ */ jsx(
      "div",
      __spreadValues({
        ref,
        className: baseClasses,
        style: styleObject,
        role: "separator",
        "aria-orientation": orientation
      }, props)
    );
  }
);
Divider.displayName = "Divider";

// src/components/Fold/Fold.module.css
var Fold_default = {};

// src/components/Fold/Fold.tsx
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
var Fold = React2.forwardRef(
  (_a, ref) => {
    var _b = _a, {
      title,
      isExpanded,
      defaultExpanded = false,
      onExpandedChange,
      isDisabled = false,
      children,
      triggerClassName,
      contentClassName,
      className
    } = _b, props = __objRest(_b, [
      "title",
      "isExpanded",
      "defaultExpanded",
      "onExpandedChange",
      "isDisabled",
      "children",
      "triggerClassName",
      "contentClassName",
      "className"
    ]);
    const state = useToggleState({
      isSelected: isExpanded,
      defaultSelected: defaultExpanded,
      onChange: onExpandedChange
    });
    const triggerRef = React2.useRef(null);
    const { buttonProps, isPressed } = useButton(
      {
        isDisabled,
        onPress: () => state.toggle()
      },
      triggerRef
    );
    const { focusProps, isFocused, isFocusVisible } = useFocusRing();
    return /* @__PURE__ */ jsxs(
      "div",
      __spreadProps(__spreadValues({
        ref,
        className: cn("fold", Fold_default.fold, className),
        "data-disabled": isDisabled || void 0
      }, props), {
        children: [
          /* @__PURE__ */ jsxs(
            "button",
            __spreadProps(__spreadValues({
              ref: triggerRef
            }, mergeProps(buttonProps, focusProps)), {
              className: cn(Fold_default.trigger, triggerClassName),
              "aria-expanded": state.isSelected,
              "data-expanded": state.isSelected || void 0,
              "data-disabled": isDisabled || void 0,
              "data-focused": isFocused || void 0,
              "data-focus-visible": isFocusVisible || void 0,
              "data-pressed": isPressed || void 0,
              children: [
                /* @__PURE__ */ jsx2("span", { className: Fold_default.title, children: title }),
                /* @__PURE__ */ jsx2("span", { className: Fold_default.icon, children: /* @__PURE__ */ jsx2(
                  "svg",
                  {
                    viewBox: "0 0 16 16",
                    width: "16",
                    height: "16",
                    fill: "currentColor",
                    children: /* @__PURE__ */ jsx2("path", { d: "M4.47 6.47a.75.75 0 000 1.06l3.5 3.5a.75.75 0 001.06 0l3.5-3.5a.75.75 0 00-1.06-1.06L8 9.44 5.53 6.97a.75.75 0 00-1.06 0z" })
                  }
                ) })
              ]
            })
          ),
          /* @__PURE__ */ jsx2(Divider, { className: "mt-2", spacing: "none", color: "default" }),
          /* @__PURE__ */ jsx2(
            "div",
            {
              className: cn(Fold_default.content, contentClassName),
              "data-expanded": state.isSelected || void 0,
              "aria-hidden": !state.isSelected,
              children: /* @__PURE__ */ jsx2("div", { className: Fold_default.contentInner, children })
            }
          )
        ]
      })
    );
  }
);
Fold.displayName = "Fold";
export {
  Fold
};
