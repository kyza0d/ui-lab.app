"use client";

import React, { forwardRef, type ComponentPropsWithoutRef } from "react";

import { useFocusRing } from "@react-aria/focus"
import { mergeProps, } from "@react-aria/utils";

import { ChevronUp, ChevronDown } from "lucide-react";
import { cn, type StyleValue } from "@/lib/utils";
import { type StylesProp, createStylesResolver } from "@/lib/styles";
import css from "./Input.module.css";

type Variant = "default" | "ghost";

export interface InputStyleSlots {
  root?: StyleValue;
}

export type InputStylesProp = StylesProp<InputStyleSlots>;

const resolveInputStyles = createStylesResolver(['root'] as const);

export interface InputProps extends Omit<ComponentPropsWithoutRef<"input">, "size"> {
  /** Controls the visual style of the input */
  variant?: Variant;
  /** Whether the input is in an error state */
  error?: boolean;
  /** Icon displayed before the input value */
  prefixIcon?: React.ReactNode;
  /** Icon displayed after the input value */
  suffixIcon?: React.ReactNode;
  /** Classes applied to the root or named slots. Accepts a string, cn()-compatible array, slot object, or array of any of those. */
  styles?: InputStylesProp;
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
      styles: stylesProp,
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

    const resolved = resolveInputStyles(stylesProp);

    return (
      <div className={css.container}>
        {hasPrefix && (
          <div className={cn(css['icon-wrapper'], css['prefix-icon'])}>
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
            css.input,
            hasPrefix && "pl-10",
            (hasSuffix || isNumberType) && "pr-6",
            className,
            resolved.root
          )}
          {...mergeProps(focusProps, {
            onFocus: handleFocus,
            onBlur: handleBlur,
            ...props,
          })}
        />
        {isNumberType && (
          <div
            className={cn(css['number-controls'], disabled && css.disabled)}
            data-disabled={disabled || undefined}
          >
            <button
              type="button"
              className={css['spin-button']}
              onClick={() => handleSpinClick("up")}
              disabled={disabled}
              tabIndex={-1}
              aria-label="Increment"
            >
              <ChevronUp size={12} />
            </button>
            <button
              type="button"
              className={css['spin-button']}
              onClick={() => handleSpinClick("down")}
              disabled={disabled}
              tabIndex={-1}
              aria-label="Decrement"
            >
              <ChevronDown size={12} />
            </button>
          </div>
        )}
        {hasSuffix && (
          <div className={cn(css['icon-wrapper'], css['suffix-icon'])}>
            {suffixIcon}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
