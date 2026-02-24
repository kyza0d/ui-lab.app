"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import styles from "./Grid.module.css";

type GridColumns = "1" | "2" | "3" | "4" | "5" | "6" | "auto-fit" | "auto-fill";
type GridRows = "1" | "2" | "3" | "4" | "5" | "6" | "auto" | "masonry";
type GridGap = "xs" | "sm" | "md" | "lg" | "xl";
type GridJustifyItems = "start" | "end" | "center" | "stretch";
type GridAlignItems = "start" | "end" | "center" | "stretch" | "baseline";
type GridJustifyContent = "start" | "end" | "center" | "stretch" | "space-between" | "space-around" | "space-evenly";
type GridAlignContent = "start" | "end" | "center" | "stretch" | "space-between" | "space-around" | "space-evenly";
type GridAutoFlow = "row" | "column" | "row-dense" | "column-dense";

type ResponsiveValue<T> = { sm?: T; md?: T; lg?: T; xl?: T };

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Number of grid columns, or responsive object per breakpoint */
  columns?: GridColumns | ResponsiveValue<GridColumns>;
  /** Number of grid rows, or responsive object per breakpoint */
  rows?: GridRows | ResponsiveValue<GridRows>;
  /** Gap between all grid cells, or responsive object per breakpoint */
  gap?: GridGap | ResponsiveValue<GridGap>;
  /** Override gap between rows only */
  rowGap?: GridGap;
  /** Override gap between columns only */
  columnGap?: GridGap;
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
  containerQueryResponsive?: boolean;
}

const isResponsive = <T,>(v: unknown): v is ResponsiveValue<T> =>
  typeof v === "object" && v !== null && !Array.isArray(v);

const colsToTpl = (c: GridColumns): string => {
  if (c === "auto-fit") return "repeat(auto-fit, minmax(200px, 1fr))";
  if (c === "auto-fill") return "repeat(auto-fill, minmax(200px, 1fr))";
  return `repeat(${c}, 1fr)`;
};

const rowsToTpl = (r: GridRows): string => {
  if (r === "masonry" || r === "auto") return r;
  return `repeat(${r}, auto)`;
};

const gapVal: Record<GridGap, string> = {
  xs: "calc(var(--spacing, 0.25rem) * 1)",
  sm: "calc(var(--spacing, 0.25rem) * 2)",
  md: "calc(var(--spacing, 0.25rem) * 4)",
  lg: "calc(var(--spacing, 0.25rem) * 6)",
  xl: "calc(var(--spacing, 0.25rem) * 8)",
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
      children,
      ...props
    },
    ref
  ) => {
    const responsiveCols = isResponsive<GridColumns>(columns);
    const responsiveRows = isResponsive<GridRows>(rows);
    const responsiveGap = isResponsive<GridGap>(gap);
    const needsContainer = responsiveCols || responsiveRows || responsiveGap || containerQueryResponsive;

    const vars: Record<string, string> = {};

    if (responsiveCols) {
      const rc = columns as ResponsiveValue<GridColumns>;
      if (rc.sm) vars["--grid-tpl-sm"] = colsToTpl(rc.sm);
      if (rc.md) vars["--grid-tpl-md"] = colsToTpl(rc.md);
      if (rc.lg) vars["--grid-tpl-lg"] = colsToTpl(rc.lg);
      if (rc.xl) vars["--grid-tpl-xl"] = colsToTpl(rc.xl);
    } else {
      vars["--grid-tpl"] = colsToTpl(columns as GridColumns);
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
      const rg = gap as ResponsiveValue<GridGap>;
      if (rg.sm) vars["--grid-gap-sm"] = gapVal[rg.sm];
      if (rg.md) vars["--grid-gap-md"] = gapVal[rg.md];
      if (rg.lg) vars["--grid-gap-lg"] = gapVal[rg.lg];
      if (rg.xl) vars["--grid-gap-xl"] = gapVal[rg.xl];
    } else {
      vars["--grid-gap"] = gapVal[gap as GridGap];
    }

    if (rowGap) vars["--grid-row-gap"] = gapVal[rowGap];
    if (columnGap) vars["--grid-col-gap"] = gapVal[columnGap];

    vars["--grid-ji"] = justifyItems;
    vars["--grid-ai"] = alignItems;
    vars["--grid-jc"] = justifyContent;
    vars["--grid-ac"] = alignContent;
    vars["--grid-flow"] = flowVal[autoFlow];

    const gridClasses = cn(
      styles.grid,
      responsiveCols && styles["responsive-cols"],
      responsiveGap && styles["responsive-gap"],
      responsiveRows && styles["responsive-rows"],
      rowGap && styles["has-row-gap"],
      columnGap && styles["has-col-gap"],
    );

    if (needsContainer) {
      return (
        <div
          ref={ref}
          className={cn(styles.container, className)}
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
        className={cn(gridClasses, className)}
        style={{ ...vars, ...style } as React.CSSProperties}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Grid.displayName = "Grid";

export { Grid };
export type { GridColumns, GridRows, GridGap, GridAutoFlow, ResponsiveValue };
