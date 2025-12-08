"use client";

import React, { useState, useId } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { FaCheck } from "react-icons/fa6";

const checkboxVariants = cva(
  "inline-flex items-center justify-center rounded-md border-2 transition-all cursor-pointer flex-shrink-0",
  {
    variants: {
      size: {
        sm: "w-4 h-4",
        md: "w-5 h-5",
        lg: "w-6 h-6",
      },
      checked: {
        true: "bg-accent-500 border-accent-500",
        false: "bg-background-800 border-background-700",
      },
      indeterminate: {
        true: "bg-background-100 border-accent-500",
        false: "",
      },
      disabled: {
        true: "opacity-60 cursor-not-allowed",
        false: "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500/50",
      },
      error: {
        true: "border-danger-600 bg-danger-600/10",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      checked: false,
      indeterminate: false,
      disabled: false,
      error: false,
    },
  }
);

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size" | "checked" | "indeterminate" | "disabled" | "error">,
  VariantProps<typeof checkboxVariants> {
  label?: React.ReactNode;
  helperText?: React.ReactNode;
  helperTextError?: boolean;
  indeterminate?: boolean;
  checked?: boolean;
  disabled?: boolean;
  error?: boolean;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({
    className,
    size = "md",
    disabled = false,
    error = false,
    label,
    helperText,
    helperTextError = false,
    indeterminate = false,
    checked: checkedProp,
    onChange,
    id,
    ...props
  }, ref) => {
    const [internalChecked, setInternalChecked] = useState(checkedProp === true);
    const generatedId = useId();

    const isControlled = checkedProp !== undefined;
    const checked = isControlled ? checkedProp : internalChecked;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setInternalChecked(e.target.checked);
      }
      onChange?.(e);
    };

    const checkboxId = id || `checkbox-${generatedId}`;

    return (
      <div className="w-full">
        <div className="flex items-start gap-3">
          <input
            ref={ref}
            type="checkbox"
            id={checkboxId}
            checked={checked}
            onChange={handleChange}
            disabled={disabled}
            className="hidden"
            aria-label={typeof label === "string" ? label : undefined}
            suppressHydrationWarning
            {...props}
          />
          <div
            className={cn(
              checkboxVariants({
                size,
                checked: checked && !indeterminate,
                indeterminate,
                disabled,
                error,
                className,
              })
            )}
            onClick={() => {
              if (!disabled) {
                const input = document.getElementById(checkboxId) as HTMLInputElement;
                if (input) {
                  input.click();
                }
              }
            }}
            role="presentation"
          >
            {checked && !indeterminate && (
              <FaCheck
                className={cn(
                  "text-accent-50 transition-all",
                  size === "sm" && "w-2.5 h-2.5",
                  size === "md" && "w-3 h-3",
                  size === "lg" && "w-4 h-4"
                )}
              />
            )}
            {indeterminate && (
              <div
                className={cn(
                  "bg-background-400",
                  size === "sm" && "w-2 h-0.5",
                  size === "md" && "w-2.5 h-0.5",
                  size === "lg" && "w-3 h-0.5"
                )}
              />
            )}
          </div>
          {label && (
            <label
              htmlFor={checkboxId}
              className={cn(
                "text-foreground-300 transition-colors cursor-pointer select-none pt-1",
                disabled && "opacity-60 cursor-not-allowed text-foreground-500",
                size === "sm" && "text-xs",
                size === "md" && "text-sm",
                size === "lg" && "text-base"
              )}
              suppressHydrationWarning
            >
              {label}
            </label>
          )}
        </div>
        {helperText && (
          <p
            className={cn(
              "text-xs mt-2 ml-8 transition-colors",
              helperTextError ? "text-danger-600" : "text-foreground-500"
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

export { Checkbox, checkboxVariants };
