"use client";

import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const progressVariants = cva("relative w-full overflow-hidden rounded-full", {
  variants: {
    size: {
      sm: "h-1",
      md: "h-2",
      lg: "h-3",
    },
  },
  defaultVariants: { size: "md" },
});

const progressFillVariants = cva(
  "h-full transition-all duration-300 ease-out rounded-full",
  {
    variants: {
      variant: {
        default: "bg-accent-500",
        success: "bg-success-500",
        warning: "bg-warning-500",
        error: "bg-danger-500",
      },
      animated: {
        true: "animate-pulse",
        false: "",
      },
    },
    defaultVariants: { variant: "default", animated: false },
  }
);

export interface ProgressProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children">,
    VariantProps<typeof progressVariants>,
    VariantProps<typeof progressFillVariants> {
  value?: number;
  max?: number;
  indeterminate?: boolean;
  label?: string;
  showValue?: boolean;
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  (
    {
      className,
      size = "md",
      variant = "default",
      animated = false,
      value = 0,
      max = 100,
      indeterminate = false,
      label,
      showValue = false,
      ...props
    },
    ref
  ) => {
    const clampedValue = Math.min(Math.max(value, 0), max);
    const percentage = (clampedValue / max) * 100;

    return (
      <div className={cn("w-full", showValue || label ? "space-y-1" : "")}>
        {(label || showValue) && (
          <div className="flex items-center justify-between text-sm text-foreground-400">
            {label && <span>{label}</span>}
            {showValue && !indeterminate && (
              <span className="tabular-nums">{Math.round(percentage)}%</span>
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
          className={cn(
            progressVariants({ size }),
            "bg-background-700",
            className
          )}
          {...props}
        >
          <div
            className={cn(
              progressFillVariants({ variant, animated: animated || indeterminate }),
              indeterminate && "w-1/3 animate-[progress-indeterminate_1.5s_ease-in-out_infinite]"
            )}
            style={indeterminate ? undefined : { width: `${percentage}%` }}
          />
        </div>
      </div>
    );
  }
);

Progress.displayName = "Progress";

export { Progress, progressVariants, progressFillVariants };
