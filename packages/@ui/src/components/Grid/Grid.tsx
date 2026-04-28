"use client";

import * as React from "react";
import { cn, type StyleValue } from "@/lib/utils";
import { type StylesProp, createStylesResolver } from "@/lib/styles";
import { resolveGapStep, type GapSize } from "@/lib/gap";
import css from "./Grid.module.css";

interface GridStyleSlots {
  root?: StyleValue;
}

type GridStylesProp = StylesProp<GridStyleSlots>;

const resolveGridBaseStyles = createStylesResolver(['root'] as const);

type GridColumns = number | "auto-fit" | "auto-fill";
type GridRows = "1" | "2" | "3" | "4" | "5" | "6" | "auto" | "masonry";
type GridJustifyItems = "start" | "end" | "center" | "stretch";
type GridAlignItems = "start" | "end" | "center" | "stretch" | "baseline";
type GridJustifyContent = "start" | "end" | "center" | "stretch" | "space-between" | "space-around" | "space-evenly";
type GridAlignContent = "start" | "end" | "center" | "stretch" | "space-between" | "space-around" | "space-evenly";
type GridAutoFlow = "row" | "column" | "row-dense" | "column-dense";
type GridTemplateColumns = GridColumns | (string & {});

type ResponsiveValue<T> = { sm?: T; md?: T; lg?: T; xl?: T };

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Grid template columns value, or responsive object per breakpoint */
  columns?: GridTemplateColumns | ResponsiveValue<GridTemplateColumns>;
  /** Number of grid rows, or responsive object per breakpoint */
  rows?: GridRows | ResponsiveValue<GridRows>;
  /** Gap between all grid cells, or responsive object per breakpoint */
  gap?: GapSize | ResponsiveValue<GapSize>;
  /** Override gap between rows only */
  rowGap?: GapSize;
  /** Override gap between columns only */
  columnGap?: GapSize;
  /** Horizontal alignment of items within their cells */
  justifyItems?: GridJustifyItems;
  /** Vertical alignment of items within their cells */
  alignItems?: GridAlignItems;
  /** Horizontal distribution of the grid within its container */
  justifyContent?: GridJustifyContent;
  /** Vertical distribution of the grid rows within its container */
  alignContent?: GridAlignContent;
  /** Direction items are auto-placed when no explicit placement is set */
  autoFlow?: GridAutoFlow;
  /** Wraps the grid in a container query parent for breakpoint-aware responsiveness */
  responsive?: boolean;
  /** Classes applied to the root or named slots. Accepts a string, cn()-compatible array, slot object, or array of any of those. */
  styles?: GridStylesProp;
}

const isResponsive = <T,>(v: unknown): v is ResponsiveValue<T> =>
  typeof v === "object" && v !== null && !Array.isArray(v);

const colsToTpl = (c: GridTemplateColumns): string => {
  if (c === "auto-fit") return "repeat(auto-fit, minmax(200px, 1fr))";
  if (c === "auto-fill") return "repeat(auto-fill, minmax(200px, 1fr))";
  if (typeof c === "number") return `repeat(${c}, 1fr)`;
  return c;
};

const rowsToTpl = (r: GridRows): string => {
  if (r === "masonry" || r === "auto") return r;
  return `repeat(${r}, auto)`;
};

const flowVal: Record<GridAutoFlow, string> = {
  row: "row",
  column: "column",
  "row-dense": "row dense",
  "column-dense": "column dense",
};

const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  (
    {
      className,
      style,
      columns = 3,
      rows = "auto",
      gap = "md",
      rowGap,
      columnGap,
      justifyItems = "stretch",
      alignItems = "stretch",
      justifyContent = "start",
      alignContent = "start",
      autoFlow = "row",
      responsive = false,
      styles,
      children,
      ...props
    },
    ref
  ) => {
    const resolved = resolveGridBaseStyles(styles);
    const responsiveCols = isResponsive<GridTemplateColumns>(columns);
    const responsiveRows = isResponsive<GridRows>(rows);
    const responsiveGap = isResponsive<GapSize>(gap);
    const needsContainer = responsiveCols || responsiveRows || responsiveGap || responsive;

    const vars: Record<string, string> = {};

    if (responsiveCols) {
      const rc = columns as ResponsiveValue<GridTemplateColumns>;
      if (rc.sm) vars["--grid-tpl-sm"] = colsToTpl(rc.sm);
      if (rc.md) vars["--grid-tpl-md"] = colsToTpl(rc.md);
      if (rc.lg) vars["--grid-tpl-lg"] = colsToTpl(rc.lg);
      if (rc.xl) vars["--grid-tpl-xl"] = colsToTpl(rc.xl);
    } else {
      vars["--grid-tpl"] = colsToTpl(columns as GridTemplateColumns);
    }

    if (responsiveRows) {
      const rr = rows as ResponsiveValue<GridRows>;
      if (rr.sm) vars["--grid-rows-sm"] = rowsToTpl(rr.sm);
      if (rr.md) vars["--grid-rows-md"] = rowsToTpl(rr.md);
      if (rr.lg) vars["--grid-rows-lg"] = rowsToTpl(rr.lg);
      if (rr.xl) vars["--grid-rows-xl"] = rowsToTpl(rr.xl);
    } else {
      vars["--grid-rows"] = rowsToTpl(rows as GridRows);
    }

    if (responsiveGap) {
      const rg = gap as ResponsiveValue<GapSize>;
      if (rg.sm) vars["--grid-gap-step-sm"] = String(resolveGapStep(rg.sm));
      if (rg.md) vars["--grid-gap-step-md"] = String(resolveGapStep(rg.md));
      if (rg.lg) vars["--grid-gap-step-lg"] = String(resolveGapStep(rg.lg));
      if (rg.xl) vars["--grid-gap-step-xl"] = String(resolveGapStep(rg.xl));
    } else {
      vars["--grid-gap-step"] = String(resolveGapStep(gap as GapSize));
    }

    if (rowGap) vars["--grid-row-gap-step"] = String(resolveGapStep(rowGap));
    if (columnGap) vars["--grid-col-gap-step"] = String(resolveGapStep(columnGap));

    vars["--grid-ji"] = justifyItems;
    vars["--grid-ai"] = alignItems;
    vars["--grid-jc"] = justifyContent;
    vars["--grid-ac"] = alignContent;
    vars["--grid-flow"] = flowVal[autoFlow];

    const gridClasses = cn(
      css.grid,
      responsiveCols && css["responsive-cols"],
      responsiveGap && css["responsive-gap"],
      responsiveRows && css["responsive-rows"],
      rowGap && css["has-row-gap"],
      columnGap && css["has-col-gap"],
    );

    if (needsContainer) {
      return (
        <div
          ref={ref}
          className={cn(css.container, className, resolved.root)}
          style={style}
          {...props}
        >
          <div className={gridClasses} style={vars as React.CSSProperties}>
            {children}
          </div>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(gridClasses, className, resolved.root)}
        style={{ ...style, ...vars } as React.CSSProperties}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Grid.displayName = "Grid";

export { Grid };
