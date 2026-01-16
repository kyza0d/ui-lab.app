"use client";

import React, { forwardRef, type ComponentPropsWithoutRef } from "react";
import { useFocusRing, mergeProps } from "react-aria";
import { cn } from "@/lib/utils";
import styles from "./Input.module.css";

type Variant = "default" | "ghost";
type Size = "sm" | "md" | "lg";

export interface InputProps extends Omit<ComponentPropsWithoutRef<"input">, "size"> {
  variant?: Variant;
  size?: Size;
  error?: boolean;
  prefixIcon?: React.ReactNode;
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
      size = "md",
      error = false,
      disabled,
      prefixIcon,
      suffixIcon,
      type = "text",
      ...props
    },
    ref
  ) => {
    const hasPrefix = !!prefixIcon;
    const hasSuffix = !!suffixIcon;

    const inputRef = React.useRef<HTMLInputElement>(null);
    const mergedRef = useMergedRef(ref, inputRef);

    const { focusProps, isFocusVisible } = useFocusRing();

    return (
      <div className={styles.container}>
        {hasPrefix && (
          <div className={cn(styles.iconWrapper, styles.prefixIcon)}>
            {prefixIcon}
          </div>
        )}
        <input
          ref={mergedRef}
          type={type}
          disabled={disabled}
          // Apply data-focus-visible only when keyboard-focused
          data-focus-visible={isFocusVisible ? "true" : undefined}
          data-disabled={disabled || undefined}
          data-error={error ? "true" : undefined}
          data-variant={variant}
          data-size={size}
          className={cn(
            styles.input,
            hasPrefix && "pl-8",
            hasSuffix && "pr-8",
            className
          )}
          // Merge React Aria focus props + user props
          {...mergeProps(focusProps, props)}
        />
        {hasSuffix && (
          <div className={cn(styles.iconWrapper, styles.suffixIcon)}>
            {suffixIcon}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
