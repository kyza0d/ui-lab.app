"use client";

import React, { useState, useId, createContext, useContext } from "react";
import { cn } from "@/lib/utils";
import styles from "./radio.module.css";

type Size = "sm" | "md" | "lg";

// Context for Radio.Group
interface RadioGroupContextType {
  value?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  size?: Size;
}

const RadioGroupContext = createContext<RadioGroupContextType | undefined>(undefined);

const useRadioGroup = () => {
  const context = useContext(RadioGroupContext);
  return context;
};

// Radio.Group Component
export interface RadioGroupProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  size?: Size;
  children: React.ReactNode;
  className?: string;
}

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  ({
    value: controlledValue,
    defaultValue,
    onValueChange,
    disabled = false,
    size = "md",
    children,
    className,
  }, ref) => {
    const [internalValue, setInternalValue] = useState(defaultValue || "");
    const isControlled = controlledValue !== undefined;
    const value = isControlled ? controlledValue : internalValue;

    const handleValueChange = (newValue: string) => {
      if (!isControlled) {
        setInternalValue(newValue);
      }
      onValueChange?.(newValue);
    };

    return (
      <RadioGroupContext.Provider
        value={{ value, onValueChange: handleValueChange, disabled, size }}
      >
        <div ref={ref} className={className} role="group">
          {children}
        </div>
      </RadioGroupContext.Provider>
    );
  }
);

RadioGroup.displayName = "RadioGroup";

// Radio.Item Component
export interface RadioItemProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  size?: Size;
  label?: React.ReactNode;
  description?: React.ReactNode;
  helperText?: React.ReactNode;
  helperTextError?: boolean;
  error?: boolean;
  value: string;
}

const RadioItem = React.forwardRef<HTMLInputElement, RadioItemProps>(
  ({
    className,
    size: sizeProp,
    disabled: disabledProp = false,
    error = false,
    label,
    description,
    helperText,
    helperTextError = false,
    value,
    id,
    ...props
  }, ref) => {
    const radioGroup = useRadioGroup();
    const generatedId = useId();
    const radioId = id || `radio-${generatedId}`;

    // Use group context if available, otherwise allow standalone use
    const isInGroup = radioGroup !== undefined;
    const size = sizeProp || radioGroup?.size || "md";
    const disabled = disabledProp || radioGroup?.disabled || false;
    const checked = isInGroup ? radioGroup.value === value : false;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (isInGroup && radioGroup?.onValueChange) {
        radioGroup.onValueChange(value);
      }
    };

    return (
      <div className="w-full">
        <div className="flex items-start gap-3">
          <div className="relative">
            <div
              className={cn(
                styles.radio,
                styles[size],
                className
              )}
              data-checked={String(checked)}
              data-disabled={String(disabled)}
              data-error={String(error)}
              role="presentation"
            >
              {checked && (
                <div
                  className={cn(
                    styles["radio-dot"],
                    styles[size]
                  )}
                />
              )}
            </div>
            <input
              ref={ref}
              type="radio"
              id={radioId}
              value={value}
              checked={checked}
              onChange={handleChange}
              disabled={disabled}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              aria-label={typeof label === "string" ? label : undefined}
              suppressHydrationWarning
              {...props}
            />
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

RadioItem.displayName = "RadioItem";

// Standalone Radio component for backward compatibility
export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  size?: Size;
  label?: React.ReactNode;
  description?: React.ReactNode;
  helperText?: React.ReactNode;
  helperTextError?: boolean;
  error?: boolean;
}

const RadioBase = React.forwardRef<HTMLInputElement, RadioProps>(
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
    const [internalChecked, setInternalChecked] = useState(checkedProp ?? defaultChecked ?? false);
    const generatedId = useId();

    const isControlled = checkedProp !== undefined;
    const checked = isControlled ? checkedProp : internalChecked;

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
          <div className="relative">
            <div
              className={cn(
                styles.radio,
                styles[size],
                className
              )}
              data-checked={String(checked)}
              data-disabled={String(disabled)}
              data-error={String(error)}
              role="presentation"
            >
              {checked && (
                <div
                  className={cn(
                    styles["radio-dot"],
                    styles[size]
                  )}
                />
              )}
            </div>
            <input
              ref={ref}
              type="radio"
              id={radioId}
              checked={checked}
              onChange={handleChange}
              disabled={disabled ?? false}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              aria-label={typeof label === "string" ? label : undefined}
              suppressHydrationWarning
              {...props}
            />
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

RadioBase.displayName = "Radio";

// Compound component
const Radio = Object.assign(RadioBase, {
  Group: RadioGroup,
  Item: RadioItem,
});

export { Radio };
