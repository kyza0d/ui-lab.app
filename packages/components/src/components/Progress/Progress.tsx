"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import styles from "./progress.module.css";

type ProgressVariant = "default" | "success" | "warning" | "error";
type ProgressSize = "sm" | "md" | "lg";

export interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  max?: number;
  variant?: ProgressVariant;
  size?: ProgressSize;
  indeterminate?: boolean;
  label?: string;
  showValue?: boolean;
  animated?: boolean;
}

const sizeMap = {
  sm: styles.sm,
  md: styles.md,
  lg: styles.lg,
} as const;

const variantMap = {
  default: styles.default,
  success: styles.success,
  warning: styles.warning,
  error: styles.error,
} as const;

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
      ...props
    },
    ref
  ) => {
    const clampedValue = Math.min(Math.max(value, 0), max);
    const percentage = (clampedValue / max) * 100;
    const hasLabelContent = label || showValue;

    return (
      <div
        className={cn(styles.wrapper, hasLabelContent && styles.hasLabel)}
      >
        {hasLabelContent && (
          <div className={styles.labelRow}>
            {label && (
              <span className={styles.label}>
                {label}
              </span>
            )}
            {showValue && !indeterminate && (
              <span className={styles.value}>{Math.round(percentage)}%</span>
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
          className={cn(styles.progress, sizeMap[size], className)}
          data-variant={variant}
          data-size={size}
          data-indeterminate={indeterminate || undefined}
          {...props}
        >
          <div
            className={cn(
              styles.fill,
              variantMap[variant],
              (animated || indeterminate) && styles.animated,
              indeterminate && styles.indeterminate
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
