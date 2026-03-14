"use client";

import React, { forwardRef, useState } from "react";
import { cn, type StyleValue } from "@/lib/utils";
import { type StylesProp, createStylesResolver } from "@/lib/styles";
import css from "./Checkbox.module.css";

type Size = "sm" | "md" | "lg";

export interface CheckboxStyleSlots {
  root?: StyleValue;
  label?: StyleValue;
  helperText?: StyleValue;
}

export type CheckboxStylesProp = StylesProp<CheckboxStyleSlots>;

const resolveCheckboxBaseStyles = createStylesResolver(['root', 'label', 'helperText'] as const);

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  /** Size of the checkbox */
  size?: Size;
  /** Label text or element displayed next to the checkbox */
  label?: React.ReactNode;
  /** Helper text shown below the checkbox */
  helperText?: React.ReactNode;
  /** Whether to style the helper text as an error */
  helperTextError?: boolean;
  /** Whether to show an indeterminate (partial selection) state */
  isIndeterminate?: boolean;
  /** Classes applied to the root or named slots. Accepts a string, cn()-compatible array, slot object, or array of any of those. */
  styles?: CheckboxStylesProp;
}

const sizeMap: Record<Size, string> = {
  sm: css["size-sm"],
  md: css["size-md"],
  lg: css["size-lg"],
};

const labelSizeMap: Record<Size, string> = {
  sm: css["label-sm"],
  md: css["label-md"],
  lg: css["label-lg"],
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
      styles,
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

    const resolved = resolveCheckboxBaseStyles(styles);

    return (
      <div ref={ref} className={cn("checkbox-root", css['checkbox-root'], resolved.root)}>
        <div className={cn((css as any)['checkbox-container'], sizeMap[size])}>
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
              'checkbox',
              css.checkbox,
              isIndeterminate && css.indeterminate,
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
          {displayChecked && !isIndeterminate && (
            <svg
              className={cn('checkbox-root', 'checkbox-checkmark', (css as any)['checkbox-checkmark'])}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          )}
          {isIndeterminate && (
            <svg
              className={cn('checkbox-root', 'checkbox-indeterminate', css['checkbox-indeterminate'])}
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <line x1="5" y1="12" x2="19" y2="12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            </svg>
          )}
        </div>
        {label && (
          <label
            htmlFor={id}
            className={cn(
              css.label,
              labelSizeMap[size],
              disabled && css["label-disabled"],
              resolved.label
            )}
          >
            {label}
          </label>
        )}
        {helperText && (
          <p
            className={cn(
              'checkbox-root',
              'helper-text',
              css["helper-text"],
              helperTextError && 'helper-text-error',
              helperTextError
                ? css["helper-text-error"]
                : css["helper-text-normal"],
              resolved.helperText
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
