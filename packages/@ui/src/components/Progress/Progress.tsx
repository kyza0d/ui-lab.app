"use client";

import * as React from "react";
import { cn, type StyleValue } from "@/lib/utils";
import { type StylesProp, createStylesResolver } from "@/lib/styles";
import css from "./Progress.module.css";

type ProgressVariant = "default" | "success" | "warning" | "error";
type ProgressSize = "sm" | "md" | "lg";

export interface ProgressStyleSlots {
  root?: StyleValue;
  labelRow?: StyleValue;
  label?: StyleValue;
  value?: StyleValue;
  progress?: StyleValue;
  fill?: StyleValue;
}

export type ProgressStylesProp = StylesProp<ProgressStyleSlots>;

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Current progress value */
  value?: number;
  /** Maximum value that represents 100% */
  max?: number;
  /** Visual color variant indicating progress state */
  variant?: ProgressVariant;
  /** Size of the progress bar */
  size?: ProgressSize;
  /** Whether to show an infinite loading animation instead of a fixed value */
  indeterminate?: boolean;
  /** Accessible label describing what is progressing */
  label?: string;
  /** Whether to display the percentage value next to the label */
  showValue?: boolean;
  /** Whether to show a shimmer animation on the progress fill */
  animated?: boolean;
  /** Classes applied to the root or named slots. Accepts a string, cn()-compatible array, slot object, or array of any of those. */
  styles?: ProgressStylesProp;
}

const sizeMap = {
  sm: css.sm,
  md: css.md,
  lg: css.lg,
} as const;

const variantMap = {
  default: css.default,
  success: css.success,
  warning: css.warning,
  error: css.error,
} as const;

const resolveProgressBaseStyles = createStylesResolver([
  'root',
  'labelRow',
  'label',
  'value',
  'progress',
  'fill',
] as const);

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      className,
      value = 0,
      max = 100,
      variant = "default",
      size = "md",
      indeterminate = false,
      label,
      showValue = false,
      animated = false,
      styles: stylesProp,
      ...props
    },
    ref
  ) => {
    const clampedValue = Math.min(Math.max(value, 0), max);
    const percentage = (clampedValue / max) * 100;
    const hasLabelContent = label || showValue;

    const resolved = resolveProgressBaseStyles(stylesProp);

    return (
      <div
        className={cn(css.wrapper, hasLabelContent && css.hasLabel, resolved.root)}
      >
        {hasLabelContent && (
          <div className={cn(css.labelRow, resolved.labelRow)}>
            {label && (
              <span className={cn(css.label, resolved.label)}>
                {label}
              </span>
            )}
            {showValue && !indeterminate && (
              <span className={cn(css.value, resolved.value)}>{Math.round(percentage)}%</span>
            )}
          </div>
        )}
        <div
          ref={ref}
          role="progressbar"
          aria-valuenow={indeterminate ? undefined : clampedValue}
          aria-valuemin={0}
          aria-valuemax={max}
          aria-label={label}
          className={cn(css.progress, sizeMap[size], className, resolved.progress)}
          data-variant={variant}
          data-size={size}
          data-indeterminate={indeterminate || undefined}
          {...props}
        >
          <div
            className={cn(
              css.fill,
              variantMap[variant],
              (animated || indeterminate) && css.animated,
              indeterminate && css.indeterminate,
              resolved.fill
            )}
            style={indeterminate ? undefined : { width: `${percentage}%` }}
          />
        </div>
      </div>
    );
  }
);

Progress.displayName = "Progress";

export { Progress };
