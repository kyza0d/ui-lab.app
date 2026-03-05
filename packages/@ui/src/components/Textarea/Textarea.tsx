"use client";

import React, { forwardRef, useState, type ComponentPropsWithoutRef } from "react";

import { mergeProps } from "@react-aria/utils";
import { useFocusRing } from "@react-aria/focus";

import { cn, type StyleValue } from "@/lib/utils";
import { type StylesProp, createStylesResolver } from "@/lib/styles";
import css from "./Textarea.module.css";

type Size = "sm" | "md" | "lg";

export interface TextAreaStyleSlots {
  root?: StyleValue;
  characterCount?: StyleValue;
}

export type TextAreaStylesProp = StylesProp<TextAreaStyleSlots>;

const resolveTextAreaBaseStyles = createStylesResolver(['root', 'characterCount'] as const);

export interface TextAreaProps extends Omit<ComponentPropsWithoutRef<"textarea">, "size"> {
  /** Size of the textarea */
  size?: Size;
  /** Whether to apply error styling */
  error?: boolean;
  /** Whether the textarea can be manually resized by the user */
  resizable?: boolean;
  /** Whether to display a character count below the textarea */
  showCharacterCount?: boolean;
  /** Maximum number of characters allowed */
  maxCharacters?: number;
  /** Classes applied to the root or named slots. Accepts a string, cn()-compatible array, slot object, or array of any of those. */
  styles?: TextAreaStylesProp;
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
      onFocus,
      onBlur,
      styles,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState(controlledValue ?? defaultValue ?? "");
    const [isFocused, setIsFocused] = React.useState(false);

    const textareaRef = React.useRef<HTMLTextAreaElement>(null);
    const mergedRef = useMergedRef(ref, textareaRef);

    const { focusProps, isFocusVisible } = useFocusRing();

    const currentValue = controlledValue !== undefined ? controlledValue : internalValue;
    const charCount = typeof currentValue === "string" ? currentValue.length : 0;
    const isOverLimit = maxCharacters ? charCount > maxCharacters : false;

    const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused(false);
      onBlur?.(e);
    };

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

    const resolved = resolveTextAreaBaseStyles(styles);

    return (
      <div className={css.container}>
        <textarea
          ref={mergedRef}
          disabled={disabled}
          data-focus-visible={isFocusVisible ? "true" : undefined}
          data-active={isFocused ? "true" : undefined}
          data-disabled={disabled || undefined}
          data-error={error || isOverLimit ? "true" : undefined}
          data-size={size}
          data-resizable={resizable ? undefined : "false"}
          className={cn(css.textarea, className, resolved.root)}
          value={currentValue}
          {...mergeProps(focusProps, {
            onFocus: handleFocus,
            onBlur: handleBlur,
            onChange: handleChange,
            ...props,
          })}
        />
        {showCharacterCount && (
          <div
            className={cn(css.characterCount, resolved.characterCount)}
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
