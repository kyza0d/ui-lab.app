"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import styles from "./flex.module.css";

type FlexDirection = "row" | "column";
type FlexWrap = "wrap" | "nowrap";
type FlexJustify =
  | "flex-start"
  | "flex-end"
  | "center"
  | "space-between"
  | "space-around"
  | "space-evenly";
type FlexAlign =
  | "flex-start"
  | "flex-end"
  | "center"
  | "stretch"
  | "baseline";
type FlexGap = "xs" | "sm" | "md" | "lg" | "xl";

export interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: FlexDirection;
  wrap?: FlexWrap;
  gap?: FlexGap;
  justify?: FlexJustify;
  align?: FlexAlign;
  containerQueryResponsive?: boolean;
}

const directionMap = {
  row: styles["row"],
  column: styles["column"],
} as const;

const wrapMap = {
  wrap: styles["wrap"],
  nowrap: styles["nowrap"],
} as const;

const justifyMap = {
  "flex-start": styles["justify-flex-start"],
  "flex-end": styles["justify-flex-end"],
  center: styles["justify-center"],
  "space-between": styles["justify-space-between"],
  "space-around": styles["justify-space-around"],
  "space-evenly": styles["justify-space-evenly"],
} as const;

const alignMap = {
  "flex-start": styles["align-flex-start"],
  "flex-end": styles["align-flex-end"],
  center: styles["align-center"],
  stretch: styles["align-stretch"],
  baseline: styles["align-baseline"],
} as const;

const gapMap = {
  xs: styles["gap-xs"],
  sm: styles["gap-sm"],
  md: styles["gap-md"],
  lg: styles["gap-lg"],
  xl: styles["gap-xl"],
} as const;

const Flex = React.forwardRef<HTMLDivElement, FlexProps>(
  (
    {
      className,
      direction = "row",
      wrap = "nowrap",
      gap = "md",
      justify = "flex-start",
      align = "stretch",
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
              styles.flex,
              directionMap[direction],
              wrapMap[wrap],
              gapMap[gap],
              justifyMap[justify],
              alignMap[align],
              styles["container-responsive"]
            )}
            data-direction={direction}
            data-wrap={wrap}
            data-gap={gap}
            data-justify={justify}
            data-align={align}
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
          styles.flex,
          directionMap[direction],
          wrapMap[wrap],
          gapMap[gap],
          justifyMap[justify],
          alignMap[align],
          className
        )}
        data-direction={direction}
        data-wrap={wrap}
        data-gap={gap}
        data-justify={justify}
        data-align={align}
        data-container-responsive={containerQueryResponsive || undefined}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Flex.displayName = "Flex";

export { Flex };
