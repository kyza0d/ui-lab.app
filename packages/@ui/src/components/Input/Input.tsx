"use client";

import React, { forwardRef, type ComponentPropsWithoutRef } from "react";
import { useFocusRing, mergeProps } from "react-aria";
import { FaChevronUp, FaChevronDown } from "react-icons/fa6";
import { cn } from "@/lib/utils";
import styles from "./Input.module.css";

type Variant = "default" | "ghost";

export interface InputProps extends Omit<ComponentPropsWithoutRef<"input">, "size"> {
  /** Controls the visual style of the input */
  variant?: Variant;
  /** Whether the input is in an error state */
  error?: boolean;
  /** Icon displayed before the input value */
  prefixIcon?: React.ReactNode;
  /** Icon displayed after the input value */
  suffixIcon?: React.ReactNode;
}

function useMergedRef<T>(...refs: (React.Ref<T> | undefined)[]): React.RefCallback<T> {
  return React.useCallback((value: T) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") ref(value);
      else if (ref && typeof ref === "object") (ref as React.MutableRefObject<T | null>).current = value;
    });
  }, refs);
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      variant = "default",
      error = false,
      disabled,
      prefixIcon,
      suffixIcon,
      type = "text",
      onFocus,
      onBlur,
      ...props
    },
    ref
  ) => {
    const hasPrefix = !!prefixIcon;
    const hasSuffix = !!suffixIcon;
    const isNumberType = type === "number";
    const [isFocused, setIsFocused] = React.useState(false);

    const inputRef = React.useRef<HTMLInputElement>(null);
    const mergedRef = useMergedRef(ref, inputRef);

    const { focusProps, isFocusVisible } = useFocusRing();

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      onBlur?.(e);
    };

    const handleSpinClick = (direction: "up" | "down") => {
      if (!inputRef.current || disabled) return;

      const input = inputRef.current;

      if (direction === "up") {
        input.stepUp();
      } else {
        input.stepDown();
      }

      // Dispatch native input event to trigger React onChange handlers
      const event = new Event("input", { bubbles: true });
      input.dispatchEvent(event);
    };

    return (
      <div className={styles.container}>
        {hasPrefix && (
          <div className={cn(styles['icon-wrapper'], styles['prefix-icon'])}>
            {prefixIcon}
          </div>
        )}
        <input
          ref={mergedRef}
          type={type}
          disabled={disabled}
          data-focus-visible={isFocusVisible ? "true" : undefined}
          data-active={isFocused ? "true" : undefined}
          data-disabled={disabled || undefined}
          data-error={error ? "true" : undefined}
          data-variant={variant}
          className={cn(
            styles.input,
            hasPrefix && "pl-10",
            (hasSuffix || isNumberType) && "pr-10",
            className
          )}
          {...mergeProps(focusProps, {
            onFocus: handleFocus,
            onBlur: handleBlur,
            ...props,
          })}
        />
        {isNumberType && (
          <div
            className={cn(styles['number-controls'], disabled && styles.disabled)}
            data-disabled={disabled || undefined}
          >
            <button
              type="button"
              className={styles['spin-button']}
              onClick={() => handleSpinClick("up")}
              disabled={disabled}
              tabIndex={-1}
              aria-label="Increment"
            >
              <FaChevronUp size={10} />
            </button>
            <button
              type="button"
              className={styles['spin-button']}
              onClick={() => handleSpinClick("down")}
              disabled={disabled}
              tabIndex={-1}
              aria-label="Decrement"
            >
              <FaChevronDown size={10} />
            </button>
          </div>
        )}
        {hasSuffix && (
          <div className={cn(styles['icon-wrapper'], styles['suffix-icon'])}>
            {suffixIcon}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
