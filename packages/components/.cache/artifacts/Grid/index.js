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

// src/components/Grid/Grid.tsx
import * as React from "react";

// src/lib/utils.ts
import { clsx } from "clsx";
function cn(...inputs) {
  return clsx(inputs);
}

// src/components/Grid/Grid.module.css
var Grid_default = {};

// src/components/Grid/Grid.tsx
import { jsx } from "react/jsx-runtime";
var columnsMap = {
  "1": Grid_default["columns-1"],
  "2": Grid_default["columns-2"],
  "3": Grid_default["columns-3"],
  "4": Grid_default["columns-4"],
  "5": Grid_default["columns-5"],
  "6": Grid_default["columns-6"],
  "auto-fit": Grid_default["columns-auto-fit"],
  "auto-fill": Grid_default["columns-auto-fill"]
};
var rowsMap = {
  "1": Grid_default["rows-1"],
  "2": Grid_default["rows-2"],
  "3": Grid_default["rows-3"],
  "4": Grid_default["rows-4"],
  "5": Grid_default["rows-5"],
  "6": Grid_default["rows-6"],
  auto: Grid_default["rows-auto"]
};
var gapMap = {
  xs: Grid_default["gap-xs"],
  sm: Grid_default["gap-sm"],
  md: Grid_default["gap-md"],
  lg: Grid_default["gap-lg"],
  xl: Grid_default["gap-xl"]
};
var rowGapMap = {
  xs: Grid_default["row-gap-xs"],
  sm: Grid_default["row-gap-sm"],
  md: Grid_default["row-gap-md"],
  lg: Grid_default["row-gap-lg"],
  xl: Grid_default["row-gap-xl"]
};
var columnGapMap = {
  xs: Grid_default["column-gap-xs"],
  sm: Grid_default["column-gap-sm"],
  md: Grid_default["column-gap-md"],
  lg: Grid_default["column-gap-lg"],
  xl: Grid_default["column-gap-xl"]
};
var justifyItemsMap = {
  start: Grid_default["justify-items-start"],
  end: Grid_default["justify-items-end"],
  center: Grid_default["justify-items-center"],
  stretch: Grid_default["justify-items-stretch"]
};
var alignItemsMap = {
  start: Grid_default["align-items-start"],
  end: Grid_default["align-items-end"],
  center: Grid_default["align-items-center"],
  stretch: Grid_default["align-items-stretch"],
  baseline: Grid_default["align-items-baseline"]
};
var justifyContentMap = {
  start: Grid_default["justify-content-start"],
  end: Grid_default["justify-content-end"],
  center: Grid_default["justify-content-center"],
  stretch: Grid_default["justify-content-stretch"],
  "space-between": Grid_default["justify-content-space-between"],
  "space-around": Grid_default["justify-content-space-around"],
  "space-evenly": Grid_default["justify-content-space-evenly"]
};
var alignContentMap = {
  start: Grid_default["align-content-start"],
  end: Grid_default["align-content-end"],
  center: Grid_default["align-content-center"],
  stretch: Grid_default["align-content-stretch"],
  "space-between": Grid_default["align-content-space-between"],
  "space-around": Grid_default["align-content-space-around"],
  "space-evenly": Grid_default["align-content-space-evenly"]
};
var autoFlowMap = {
  row: Grid_default["auto-flow-row"],
  column: Grid_default["auto-flow-column"],
  "row-dense": Grid_default["auto-flow-row-dense"],
  "column-dense": Grid_default["auto-flow-column-dense"]
};
var Grid = React.forwardRef(
  (_a, ref) => {
    var _b = _a, {
      className,
      columns = "3",
      rows = "auto",
      gap = "md",
      rowGap,
      columnGap,
      justifyItems = "stretch",
      alignItems = "stretch",
      justifyContent = "start",
      alignContent = "start",
      autoFlow = "row",
      containerQueryResponsive = false,
      children
    } = _b, props = __objRest(_b, [
      "className",
      "columns",
      "rows",
      "gap",
      "rowGap",
      "columnGap",
      "justifyItems",
      "alignItems",
      "justifyContent",
      "alignContent",
      "autoFlow",
      "containerQueryResponsive",
      "children"
    ]);
    if (containerQueryResponsive) {
      return /* @__PURE__ */ jsx(
        "div",
        __spreadProps(__spreadValues({
          ref,
          className: cn(Grid_default["container-query-parent"], className),
          "data-container-responsive": "true"
        }, props), {
          children: /* @__PURE__ */ jsx(
            "div",
            {
              className: cn(
                Grid_default.grid,
                columnsMap[columns],
                rowsMap[rows],
                gapMap[gap],
                rowGap && rowGapMap[rowGap],
                columnGap && columnGapMap[columnGap],
                justifyItemsMap[justifyItems],
                alignItemsMap[alignItems],
                justifyContentMap[justifyContent],
                alignContentMap[alignContent],
                autoFlowMap[autoFlow],
                Grid_default["container-responsive"]
              ),
              "data-columns": columns,
              "data-rows": rows,
              "data-gap": gap,
              "data-row-gap": rowGap,
              "data-column-gap": columnGap,
              "data-justify-items": justifyItems,
              "data-align-items": alignItems,
              "data-justify-content": justifyContent,
              "data-align-content": alignContent,
              "data-auto-flow": autoFlow,
              children
            }
          )
        })
      );
    }
    return /* @__PURE__ */ jsx(
      "div",
      __spreadProps(__spreadValues({
        ref,
        className: cn(
          Grid_default.grid,
          columnsMap[columns],
          rowsMap[rows],
          gapMap[gap],
          rowGap && rowGapMap[rowGap],
          columnGap && columnGapMap[columnGap],
          justifyItemsMap[justifyItems],
          alignItemsMap[alignItems],
          justifyContentMap[justifyContent],
          alignContentMap[alignContent],
          autoFlowMap[autoFlow],
          className
        ),
        "data-columns": columns,
        "data-rows": rows,
        "data-gap": gap,
        "data-row-gap": rowGap,
        "data-column-gap": columnGap,
        "data-justify-items": justifyItems,
        "data-align-items": alignItems,
        "data-justify-content": justifyContent,
        "data-align-content": alignContent,
        "data-auto-flow": autoFlow,
        "data-container-responsive": containerQueryResponsive || void 0
      }, props), {
        children
      })
    );
  }
);
Grid.displayName = "Grid";
export {
  Grid
};
