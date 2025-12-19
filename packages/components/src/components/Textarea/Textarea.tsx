"use client";

import React, { forwardRef, useState, type ComponentPropsWithoutRef } from "react";
import { useFocusRing, mergeProps } from "react-aria";
import { cn } from "@/lib/utils";
import styles from "./Textarea.module.css";

type Size = "sm" | "md" | "lg";

export interface TextAreaProps extends Omit<ComponentPropsWithoutRef<"textarea">, "size"> {
  size?: Size;
  error?: boolean;
  resizable?: boolean;
  showCharacterCount?: boolean;
  maxCharacters?: number;
}

function useMergedRef<T>(...refs: (React.Ref<T> | undefined)[]): React.RefCallback<T> {
  return React.useCallback((value: T) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") ref(value);
      else if (ref && typeof ref === "object") (ref as React.MutableRefObject<T | null>).current = value;
    });
  }, refs);
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      className,
      size = "md",
      error = false,
      disabled,
      resizable = true,
      showCharacterCount = false,
      maxCharacters,
      value: controlledValue,
      defaultValue,
      onChange,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState(controlledValue ?? defaultValue ?? "");

    const textareaRef = React.useRef<HTMLTextAreaElement>(null);
    const mergedRef = useMergedRef(ref, textareaRef);

    const { focusProps, isFocusVisible } = useFocusRing();

    const currentValue = controlledValue !== undefined ? controlledValue : internalValue;
    const charCount = typeof currentValue === "string" ? currentValue.length : 0;
    const isOverLimit = maxCharacters ? charCount > maxCharacters : false;

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value;

      if (maxCharacters && newValue.length > maxCharacters) {
        const truncated = newValue.slice(0, maxCharacters);
        if (controlledValue === undefined) {
          setInternalValue(truncated);
        }
        onChange?.({
          ...e,
          target: { ...e.target, value: truncated },
        } as React.ChangeEvent<HTMLTextAreaElement>);
      } else {
        if (controlledValue === undefined) {
          setInternalValue(newValue);
        }
        onChange?.(e);
      }
    };

    return (
      <div className={styles.container}>
        <textarea
          ref={mergedRef}
          disabled={disabled}
          data-focus-visible={isFocusVisible || undefined}
          data-disabled={disabled || undefined}
          data-error={error || isOverLimit ? "true" : undefined}
          data-size={size}
          data-resizable={resizable ? undefined : "false"}
          className={cn(styles.textarea, className)}
          value={currentValue}
          {...mergeProps(focusProps, { onChange: handleChange, ...props })}
        />
        {showCharacterCount && (
          <div
            className={styles.characterCount}
            data-over-limit={isOverLimit || undefined}
          >
            {charCount}{maxCharacters ? ` / ${maxCharacters}` : ""} characters
          </div>
        )}
      </div>
    );
  }
);

TextArea.displayName = "TextArea";
