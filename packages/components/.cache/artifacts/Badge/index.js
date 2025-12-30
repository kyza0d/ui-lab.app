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

// src/components/Badge/Badge.tsx
import * as React from "react";
import { useButton, useFocusRing, useHover, mergeProps } from "react-aria";

// src/lib/utils.ts
import { clsx } from "clsx";
function cn(...inputs) {
  return clsx(inputs);
}

// src/components/Badge/Badge.module.css
var Badge_default = {};

// src/components/Badge/Badge.tsx
import { jsx, jsxs } from "react/jsx-runtime";
var variantMap = {
  default: Badge_default["default"],
  success: Badge_default["success"],
  warning: Badge_default["warning"],
  danger: Badge_default["danger"],
  info: Badge_default["info"]
};
var sizeMap = {
  sm: Badge_default["sm"],
  md: Badge_default["md"],
  lg: Badge_default["lg"]
};
function DismissButton({ onDismiss, size }) {
  const buttonRef = React.useRef(null);
  const { buttonProps, isPressed } = useButton(
    {
      "aria-label": "Dismiss",
      onPress: onDismiss
    },
    buttonRef
  );
  const { focusProps, isFocusVisible } = useFocusRing();
  const { hoverProps, isHovered } = useHover({});
  const iconSize = size === "sm" ? "w-3 h-3" : size === "lg" ? "w-5 h-5" : "w-4 h-4";
  return /* @__PURE__ */ jsx(
    "button",
    __spreadProps(__spreadValues({}, mergeProps(buttonProps, focusProps, hoverProps)), {
      ref: buttonRef,
      type: "button",
      className: Badge_default.dismissButton,
      "data-pressed": isPressed || void 0,
      "data-hovered": isHovered || void 0,
      "data-focus-visible": isFocusVisible || void 0,
      children: /* @__PURE__ */ jsx(
        "svg",
        {
          className: iconSize,
          fill: "none",
          stroke: "currentColor",
          viewBox: "0 0 24 24",
          "aria-hidden": "true",
          children: /* @__PURE__ */ jsx(
            "path",
            {
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeWidth: 2,
              d: "M6 18L18 6M6 6l12 12"
            }
          )
        }
      )
    })
  );
}
var Badge = React.forwardRef(
  (_a, ref) => {
    var _b = _a, {
      variant = "default",
      size = "md",
      icon,
      dismissible = false,
      onDismiss,
      pill = false,
      children,
      className
    } = _b, props = __objRest(_b, [
      "variant",
      "size",
      "icon",
      "dismissible",
      "onDismiss",
      "pill",
      "children",
      "className"
    ]);
    return /* @__PURE__ */ jsxs(
      "span",
      __spreadProps(__spreadValues({
        ref,
        className: cn(
          "badge",
          variant,
          size,
          Badge_default.badge,
          variantMap[variant],
          sizeMap[size],
          pill && Badge_default.pill,
          className
        ),
        "data-variant": variant,
        "data-size": size,
        "data-pill": pill ? "true" : void 0
      }, props), {
        children: [
          icon && /* @__PURE__ */ jsx("span", { className: Badge_default.iconWrapper, "aria-hidden": "true", children: icon }),
          /* @__PURE__ */ jsx("span", { children }),
          dismissible && /* @__PURE__ */ jsx(DismissButton, { onDismiss, size })
        ]
      })
    );
  }
);
Badge.displayName = "Badge";
export {
  Badge
};
