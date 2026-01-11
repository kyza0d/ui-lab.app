"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import styles from "./Grid.module.css";

type GridColumns = "1" | "2" | "3" | "4" | "5" | "6" | "auto-fit" | "auto-fill";
type GridRows = "1" | "2" | "3" | "4" | "5" | "6" | "auto";
type GridGap = "xs" | "sm" | "md" | "lg" | "xl";
type GridGapAxis = "xs" | "sm" | "md" | "lg" | "xl";
type GridJustifyItems = "start" | "end" | "center" | "stretch";
type GridAlignItems = "start" | "end" | "center" | "stretch" | "baseline";
type GridJustifyContent = "start" | "end" | "center" | "stretch" | "space-between" | "space-around" | "space-evenly";
type GridAlignContent = "start" | "end" | "center" | "stretch" | "space-between" | "space-around" | "space-evenly";
type GridAutoFlow = "row" | "column" | "row-dense" | "column-dense";

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: GridColumns;
  rows?: GridRows;
  gap?: GridGap;
  rowGap?: GridGapAxis;
  columnGap?: GridGapAxis;
  justifyItems?: GridJustifyItems;
  alignItems?: GridAlignItems;
  justifyContent?: GridJustifyContent;
  alignContent?: GridAlignContent;
  autoFlow?: GridAutoFlow;
  containerQueryResponsive?: boolean;
}

const columnsMap = {
  "1": styles["columns-1"],
  "2": styles["columns-2"],
  "3": styles["columns-3"],
  "4": styles["columns-4"],
  "5": styles["columns-5"],
  "6": styles["columns-6"],
  "auto-fit": styles["columns-auto-fit"],
  "auto-fill": styles["columns-auto-fill"],
} as const;

const rowsMap = {
  "1": styles["rows-1"],
  "2": styles["rows-2"],
  "3": styles["rows-3"],
  "4": styles["rows-4"],
  "5": styles["rows-5"],
  "6": styles["rows-6"],
  auto: styles["rows-auto"],
} as const;

const gapMap = {
  xs: styles["gap-xs"],
  sm: styles["gap-sm"],
  md: styles["gap-md"],
  lg: styles["gap-lg"],
  xl: styles["gap-xl"],
} as const;

const rowGapMap = {
  xs: styles["row-gap-xs"],
  sm: styles["row-gap-sm"],
  md: styles["row-gap-md"],
  lg: styles["row-gap-lg"],
  xl: styles["row-gap-xl"],
} as const;

const columnGapMap = {
  xs: styles["column-gap-xs"],
  sm: styles["column-gap-sm"],
  md: styles["column-gap-md"],
  lg: styles["column-gap-lg"],
  xl: styles["column-gap-xl"],
} as const;

const justifyItemsMap = {
  start: styles["justify-items-start"],
  end: styles["justify-items-end"],
  center: styles["justify-items-center"],
  stretch: styles["justify-items-stretch"],
} as const;

const alignItemsMap = {
  start: styles["align-items-start"],
  end: styles["align-items-end"],
  center: styles["align-items-center"],
  stretch: styles["align-items-stretch"],
  baseline: styles["align-items-baseline"],
} as const;

const justifyContentMap = {
  start: styles["justify-content-start"],
  end: styles["justify-content-end"],
  center: styles["justify-content-center"],
  stretch: styles["justify-content-stretch"],
  "space-between": styles["justify-content-space-between"],
  "space-around": styles["justify-content-space-around"],
  "space-evenly": styles["justify-content-space-evenly"],
} as const;

const alignContentMap = {
  start: styles["align-content-start"],
  end: styles["align-content-end"],
  center: styles["align-content-center"],
  stretch: styles["align-content-stretch"],
  "space-between": styles["align-content-space-between"],
  "space-around": styles["align-content-space-around"],
  "space-evenly": styles["align-content-space-evenly"],
} as const;

const autoFlowMap = {
  row: styles["auto-flow-row"],
  column: styles["auto-flow-column"],
  "row-dense": styles["auto-flow-row-dense"],
  "column-dense": styles["auto-flow-column-dense"],
} as const;

const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  (
    {
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
      children,
      ...props
    },
    ref
  ) => {
    if (containerQueryResponsive) {
      return (
        <div
          ref={ref}
          className={cn(styles["container-query-parent"], className)}
          data-container-responsive="true"
          {...props}
        >
          <div
            className={cn(
              styles.grid,
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
              styles["container-responsive"]
            )}
            data-columns={columns}
            data-rows={rows}
            data-gap={gap}
            data-row-gap={rowGap}
            data-column-gap={columnGap}
            data-justify-items={justifyItems}
            data-align-items={alignItems}
            data-justify-content={justifyContent}
            data-align-content={alignContent}
            data-auto-flow={autoFlow}
          >
            {children}
          </div>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn(
          styles.grid,
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
        )}
        data-columns={columns}
        data-rows={rows}
        data-gap={gap}
        data-row-gap={rowGap}
        data-column-gap={columnGap}
        data-justify-items={justifyItems}
        data-align-items={alignItems}
        data-justify-content={justifyContent}
        data-align-content={alignContent}
        data-auto-flow={autoFlow}
        data-container-responsive={containerQueryResponsive || undefined}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Grid.displayName = "Grid";

export { Grid };
