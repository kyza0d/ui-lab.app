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

// src/components/Gallery/Gallery.tsx
import * as React from "react";
import { useFocusRing, useHover, usePress, mergeProps } from "react-aria";

// src/lib/utils.ts
import { clsx } from "clsx";
function cn(...inputs) {
  return clsx(inputs);
}

// src/components/Gallery/Gallery.module.css
var Gallery_default = {};

// src/components/Gallery/Gallery.tsx
import { jsx } from "react/jsx-runtime";
var GalleryRoot = React.forwardRef(
  (_a, ref) => {
    var _b = _a, { columns = 3, gap, layout = "grid", columnWidth, className, style, children } = _b, props = __objRest(_b, ["columns", "gap", "layout", "columnWidth", "className", "style", "children"]);
    var _a2;
    const columnValue = typeof columns === "number" ? columns : (_a2 = columns.base) != null ? _a2 : 3;
    const responsiveColumns = typeof columns === "object" ? columns : {};
    const gapValue = typeof gap === "number" ? `${gap / 16}rem` : gap;
    const columnWidthValue = typeof columnWidth === "number" ? `${columnWidth}px` : columnWidth;
    const cssVariables = {
      "--gallery-columns": columnValue,
      "--gallery-columns-sm": responsiveColumns.sm,
      "--gallery-columns-md": responsiveColumns.md,
      "--gallery-columns-lg": responsiveColumns.lg,
      "--gallery-columns-xl": responsiveColumns.xl,
      "--gallery-gap": gapValue,
      "--gallery-column-width": columnWidthValue
    };
    return /* @__PURE__ */ jsx(
      "div",
      __spreadProps(__spreadValues({
        ref,
        className: cn(Gallery_default.gallery, className),
        style: __spreadValues(__spreadValues({}, cssVariables), style),
        "data-layout": layout
      }, props), {
        children
      })
    );
  }
);
GalleryRoot.displayName = "Gallery";
var GalleryItem = React.forwardRef(
  (_a, ref) => {
    var _b = _a, { href, onPress, columnSpan, rowSpan, className, style, children } = _b, props = __objRest(_b, ["href", "onPress", "columnSpan", "rowSpan", "className", "style", "children"]);
    const elementRef = React.useRef(null);
    const combinedRef = (node) => {
      elementRef.current = node;
      if (typeof ref === "function") {
        ref(node);
      } else if (ref) {
        ref.current = node;
      }
    };
    const { focusProps, isFocusVisible } = useFocusRing();
    const { hoverProps, isHovered } = useHover({});
    const { pressProps, isPressed } = usePress({
      onPress: () => onPress == null ? void 0 : onPress(href)
    });
    const spanStyles = __spreadValues(__spreadValues(__spreadValues({}, columnSpan && { gridColumn: `span ${columnSpan}` }), rowSpan && { gridRow: `span ${rowSpan}` }), style);
    const commonProps = mergeProps(
      focusProps,
      hoverProps,
      pressProps,
      __spreadValues({
        className: cn(Gallery_default.item, className),
        style: spanStyles,
        "data-focus-visible": isFocusVisible || void 0,
        "data-hovered": isHovered || void 0,
        "data-pressed": isPressed || void 0
      }, props)
    );
    return /* @__PURE__ */ jsx(
      "div",
      __spreadProps(__spreadValues({
        ref: combinedRef,
        role: "button",
        tabIndex: 0
      }, commonProps), {
        children
      })
    );
  }
);
GalleryItem.displayName = "Gallery.Item";
var GalleryView = React.forwardRef(
  (_a, ref) => {
    var _b = _a, { aspectRatio = "16/9", className, style, children } = _b, props = __objRest(_b, ["aspectRatio", "className", "style", "children"]);
    return /* @__PURE__ */ jsx(
      "div",
      __spreadProps(__spreadValues({
        ref,
        className: cn(Gallery_default.view, className),
        style: __spreadValues({
          "--gallery-aspect-ratio": aspectRatio
        }, style)
      }, props), {
        children
      })
    );
  }
);
GalleryView.displayName = "Gallery.View";
var GalleryBody = React.forwardRef(
  (_a, ref) => {
    var _b = _a, { className, children } = _b, props = __objRest(_b, ["className", "children"]);
    return /* @__PURE__ */ jsx(
      "div",
      __spreadProps(__spreadValues({
        ref,
        className: cn(Gallery_default.body, className)
      }, props), {
        children
      })
    );
  }
);
GalleryBody.displayName = "Gallery.Body";
var Gallery = Object.assign(GalleryRoot, {
  Item: GalleryItem,
  View: GalleryView,
  Body: GalleryBody
});
export {
  Gallery,
  GalleryBody,
  GalleryItem,
  GalleryView
};
