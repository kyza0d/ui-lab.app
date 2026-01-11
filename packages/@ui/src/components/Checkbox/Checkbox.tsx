"use client";

import React, { forwardRef, useState } from "react";
import { cn } from "@/lib/utils";
import styles from "./Checkbox.module.css";

type Size = "sm" | "md" | "lg";

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  size?: Size;
  label?: React.ReactNode;
  helperText?: React.ReactNode;
  helperTextError?: boolean;
  isIndeterminate?: boolean;
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

export const Checkbox = forwardRef<HTMLDivElement, CheckboxProps>(
  (
    {
      className,
      size = "md",
      label,
      helperText,
      helperTextError = false,
      id,
      disabled = false,
      checked,
      defaultChecked,
      onChange,
      isIndeterminate = false,
      ...props
    },
    ref
  ) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [isFocused, setIsFocused] = useState(false);
    // Track pressed state for tactile feedback animation (data-pressed attribute)
    const [isPressed, setIsPressed] = useState(false);
    const [internalChecked, setInternalChecked] = useState(() =>
      checked !== undefined ? checked : (defaultChecked ?? false)
    );

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    // React Aria press state handlers for tactile scale animation (mouse)
    const handleMouseDown = React.useCallback((e: React.MouseEvent<HTMLInputElement>) => {
      if (!disabled) {
        setIsPressed(true);
      }
      props.onMouseDown?.(e);
    }, [disabled, props]);

    const handleMouseUp = React.useCallback((e: React.MouseEvent<HTMLInputElement>) => {
      setIsPressed(false);
      props.onMouseUp?.(e);
    }, [props]);

    const handleMouseLeave = React.useCallback((e: React.MouseEvent<HTMLInputElement>) => {
      setIsPressed(false);
      props.onMouseLeave?.(e);
    }, [props]);

    // React Aria press state handlers for keyboard interactions (Space/Enter)
    const handleKeyDown = React.useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!disabled && (e.key === " " || e.key === "Enter")) {
        setIsPressed(true);
      }
      props.onKeyDown?.(e);
    }, [disabled, props]);

    const handleKeyUp = React.useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === " " || e.key === "Enter") {
        setIsPressed(false);
      }
      props.onKeyUp?.(e);
    }, [props]);

    React.useEffect(() => {
      if (checked !== undefined) {
        setInternalChecked(checked);
      }
    }, [checked]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      // Update internal state (needed for uncontrolled mode)
      setInternalChecked(e.target.checked);
      // Call parent handler if provided
      onChange?.(e);
    };

    // Filter out boolean props to avoid DOM attribute warnings
    const domProps = Object.fromEntries(
      Object.entries(props).filter(([, value]) => typeof value !== 'boolean')
    );

    // Determine if this is a controlled component
    const isControlled = checked !== undefined;
    const displayChecked = isControlled ? checked : internalChecked;

    return (
      <div className="w-full" ref={ref}>
        <div className="flex items-start gap-3">
          <input
            ref={inputRef}
            type="checkbox"
            id={id}
            disabled={disabled}
            {...(isControlled ? { checked } : { defaultChecked: internalChecked })}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onKeyDown={handleKeyDown}
            onKeyUp={handleKeyUp}
            className={cn(
              styles.base,
              sizeMap[size],
              isIndeterminate && styles.indeterminate,
              className
            )}
            data-size={size}
            data-selected={displayChecked ? "true" : undefined}
            data-disabled={disabled ? "true" : undefined}
            data-indeterminate={isIndeterminate ? "true" : undefined}
            data-focused={isFocused ? "true" : undefined}
            data-pressed={isPressed ? "true" : undefined}
            {...domProps}
          />
          {label && (
            <label
              htmlFor={id}
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
