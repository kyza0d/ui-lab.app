"use client";

import * as React from "react";
import { cn, type StyleValue } from "@/lib/utils";
import { type StylesProp, createStylesResolver } from "@/lib/styles";
import { resolveGapStep, type GapSize } from "@/lib/gap";
import styles from "./Flex.module.css";

type FlexDirection = "row" | "column";
type FlexWrap = "wrap" | "nowrap";
type FlexJustify =
  | "start"
  | "end"
  | "center"
  | "between"
  | "around"
  | "evenly";
type FlexAlign =
  | "start"
  | "end"
  | "center"
  | "stretch"
  | "baseline";
interface FlexStyleSlots {
  root?: StyleValue;
}

type FlexStylesProp = StylesProp<FlexStyleSlots>;

const resolveFlexBaseStyles = createStylesResolver(['root'] as const);

export interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Direction of the flex container */
  direction?: FlexDirection;
  /** Whether items wrap to the next line when they overflow */
  wrap?: FlexWrap;
  /** Gap between flex items */
  gap?: GapSize;
  /** Alignment of items along the main axis */
  justify?: FlexJustify;
  /** Alignment of items along the cross axis */
  align?: FlexAlign;
  /** Wraps the flex container in a container query parent for breakpoint-aware responsiveness */
  containerQueryResponsive?: boolean;
  /** Classes applied to the root slot. Accepts a string, cn()-compatible array, or slot object. */
  styles?: FlexStylesProp;
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
  start: styles["justify-start"],
  end: styles["justify-end"],
  center: styles["justify-center"],
  between: styles["justify-between"],
  around: styles["justify-around"],
  evenly: styles["justify-evenly"],
} as const;

const alignMap = {
  start: styles["align-start"],
  end: styles["align-end"],
  center: styles["align-center"],
  stretch: styles["align-stretch"],
  baseline: styles["align-baseline"],
} as const;

const Flex = React.forwardRef<HTMLDivElement, FlexProps>(
  (
    {
      className,
      style,
      styles: stylesProp,
      direction,
      wrap,
      gap,
      justify,
      align,
      containerQueryResponsive = false,
      children,
      ...props
    },
    ref
  ) => {
    const resolved = resolveFlexBaseStyles(stylesProp);
    const layoutStyle = gap
      ? ({ "--flex-gap-step": resolveGapStep(gap) } as React.CSSProperties)
      : undefined;
    if (containerQueryResponsive) {
      return (
        <div
          ref={ref}
          className={cn(styles["container-query-parent"], className, resolved.root)}
          style={style}
          data-container-responsive="true"
          {...props}
        >
          <div
            className={cn(
              styles.flex,
              direction && directionMap[direction],
              wrap && wrapMap[wrap],
              justify && justifyMap[justify],
              align && alignMap[align],
              styles["container-responsive"]
            )}
            style={layoutStyle}
            data-direction={direction ?? "row"}
            data-wrap={wrap ?? "nowrap"}
            data-gap={gap ?? "md"}
            data-justify={justify ?? "start"}
            data-align={align ?? "stretch"}
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
          direction && directionMap[direction],
          wrap && wrapMap[wrap],
          justify && justifyMap[justify],
          align && alignMap[align],
          className,
          resolved.root
        )}
        style={layoutStyle ? { ...style, ...layoutStyle } : style}
        data-direction={direction ?? "row"}
        data-wrap={wrap ?? "nowrap"}
        data-gap={gap ?? "md"}
        data-justify={justify ?? "start"}
        data-align={align ?? "stretch"}
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
