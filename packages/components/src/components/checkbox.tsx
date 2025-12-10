"use client";

import React, { useId, forwardRef } from "react";
import { cn } from "@/lib/utils";
import styles from "./checkbox.module.css";

type Size = "sm" | "md" | "lg";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  size?: Size;
  label?: React.ReactNode;
  helperText?: React.ReactNode;
  helperTextError?: boolean;
  error?: boolean;
}

const sizeMap: Record<Size, string> = {
  sm: styles["size-sm"],
  md: styles["size-md"],
  lg: styles["size-lg"],
};

const labelSizeMap: Record<Size, string> = {
  sm: styles["label-sm"],
  md: styles["label-md"],
  lg: styles["label-lg"],
};

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      className,
      size = "md",
      disabled = false,
      error = false,
      label,
      helperText,
      helperTextError = false,
      id,
      checked,
      onChange,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const checkboxId = id || `checkbox-${generatedId}`;

    return (
      <div className="w-full">
        <div className="flex items-start gap-3">
          <input
            ref={ref}
            type="checkbox"
            id={checkboxId}
            disabled={disabled}
            className={cn(
              styles.base,
              sizeMap[size],
              error && styles.error,
              disabled && styles.disabled,
              className
            )}
            {...(onChange
              ? { checked, onChange }
              : { defaultChecked: checked })}
            {...props}
          />
          {label && (
            <label
              htmlFor={checkboxId}
              className={cn(
                styles.label,
                labelSizeMap[size],
                disabled && styles["label-disabled"]
              )}
            >
              {label}
            </label>
          )}
        </div>
        {helperText && (
          <p
            className={cn(
              styles["helper-text"],
              helperTextError
                ? styles["helper-text-error"]
                : styles["helper-text-normal"]
            )}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";
