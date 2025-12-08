"use client";

import React, { useState, useId } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const radioVariants = cva(
  "inline-flex items-center justify-center rounded-full border-2 transition-all cursor-pointer flex-shrink-0",
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
      disabled: false,
      error: false,
    },
  }
);

export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size" | "checked" | "disabled">,
  VariantProps<typeof radioVariants> {
  label?: React.ReactNode;
  description?: React.ReactNode;
  helperText?: React.ReactNode;
  helperTextError?: boolean;
}

const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({
    className,
    size = "md",
    disabled = false,
    error = false,
    label,
    description,
    helperText,
    helperTextError = false,
    checked: checkedProp,
    defaultChecked,
    onChange,
    id,
    ...props
  }, ref) => {
    const [internalChecked, setInternalChecked] = useState(checkedProp === true);
    const generatedId = useId();

    const isControlled = checkedProp !== undefined;
    const checked = isControlled ? (checkedProp ?? false) : internalChecked;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setInternalChecked(e.target.checked);
      }
      onChange?.(e);
    };

    const radioId = id || `radio-${generatedId}`;

    return (
      <div className="w-full">
        <div className="flex items-start gap-3">
          <input
            ref={ref}
            type="radio"
            id={radioId}
            checked={checked}
            onChange={handleChange}
            disabled={disabled ?? false}
            className="hidden"
            aria-label={typeof label === "string" ? label : undefined}
            suppressHydrationWarning
            {...props}
          />
          <div
            className={cn(
              radioVariants({
                size,
                checked,
                disabled,
                error,
                className,
              })
            )}
            onClick={() => {
              if (!disabled) {
                const input = document.getElementById(radioId) as HTMLInputElement;
                if (input) {
                  input.click();
                }
              }
            }}
            role="presentation"
          >
            {checked && (
              <div
                className={cn(
                  "bg-accent-50 rounded-full",
                  size === "sm" && "w-2 h-2",
                  size === "md" && "w-2.5 h-2.5",
                  size === "lg" && "w-3 h-3"
                )}
              />
            )}
          </div>
          {(label || description) && (
            <div className="flex flex-col gap-1">
              {label && (
                <label
                  htmlFor={radioId}
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
              {description && (
                <p
                  className={cn(
                    "text-xs transition-colors",
                    disabled && "opacity-60 text-foreground-500",
                    error ? "text-danger-600" : "text-foreground-500"
                  )}
                >
                  {description}
                </p>
              )}
            </div>
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

Radio.displayName = "Radio";

export { Radio, radioVariants };
