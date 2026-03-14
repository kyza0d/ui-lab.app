"use client";

import React, { forwardRef, useState, type ComponentPropsWithoutRef } from "react";

import { mergeProps } from "@react-aria/utils";
import { useFocusRing } from "@react-aria/focus";

import { cn, type StyleValue } from "@/lib/utils";
import { type StylesProp, createStylesResolver } from "@/lib/styles";
import { Scroll } from "@/components/Scroll";
import css from "./Textarea.module.css";

type Size = "sm" | "md" | "lg";
type ResizeAxis = "both" | "x" | "y" | "none";

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
  /** Whether the textarea can be manually resized by the user. When enabled, `className` may include Tailwind `resize`, `resize-x`, `resize-y`, or `resize-none` to select the resize axis. */
  resizable?: boolean;
  /** Whether to display a character count below the textarea */
  showCharacterCount?: boolean;
  /** Maximum number of characters allowed */
  maxCharacters?: number;
  /** Maximum height before the custom scrollbar activates */
  maxHeight?: string;
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

const resizeClassMap: Record<string, ResizeAxis> = {
  resize: "both",
  "resize-x": "x",
  "resize-y": "y",
  "resize-none": "none",
};

function resolveResizeAxis(className: string | undefined, resizable: boolean): ResizeAxis {
  if (!resizable) return "none";

  let axis: ResizeAxis | undefined;
  for (const token of className?.split(/\s+/) ?? []) {
    const nextAxis = resizeClassMap[token];
    if (nextAxis) axis = nextAxis;
  }

  return axis ?? "both";
}

function stripResizeClasses(className: string | undefined) {
  if (!className) return className;

  const filtered = className
    .split(/\s+/)
    .filter((token) => token && !resizeClassMap[token])
    .join(" ");

  return filtered || undefined;
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
      maxHeight,
      value: controlledValue,
      defaultValue,
      onChange,
      onFocus,
      onBlur,
      style: propStyle,
      styles,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState(controlledValue ?? defaultValue ?? "");
    const [isFocused, setIsFocused] = React.useState(false);
    const [internalHeight, setInternalHeight] = React.useState<number | null>(null);
    const [internalWidth, setInternalWidth] = React.useState<number | null>(null);

    const textareaRef = React.useRef<HTMLTextAreaElement>(null);
    const surfaceRef = React.useRef<HTMLDivElement>(null);
    const scrollWrapperRef = React.useRef<HTMLDivElement>(null);
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
    const resizeAxis = resolveResizeAxis(className, resizable);
    const canResize = resizeAxis !== "none" && !disabled;
    const textareaClassName = stripResizeClasses(className);

    const handleResizeMouseDown = React.useCallback((e: React.MouseEvent) => {
      if (!canResize) return;

      e.preventDefault();
      const textarea = textareaRef.current;
      const surface = surfaceRef.current;
      const scrollWrapper = scrollWrapperRef.current;
      if (!textarea || !surface) return;

      const computed = window.getComputedStyle(textarea);
      const minHeight = Number.parseFloat(computed.minHeight) || 60;
      const minWidth = Number.parseFloat(computed.minWidth) || 160;
      const startX = e.clientX;
      const startY = e.clientY;
      const startWidth = surface.getBoundingClientRect().width;
      const startHeight = maxHeight
        ? (scrollWrapper?.getBoundingClientRect().height ?? surface.getBoundingClientRect().height)
        : surface.getBoundingClientRect().height;

      const onMouseMove = (ev: MouseEvent) => {
        if (resizeAxis === "x" || resizeAxis === "both") {
          const deltaX = ev.clientX - startX;
          setInternalWidth(Math.max(minWidth, startWidth + deltaX));
        }

        if (resizeAxis === "y" || resizeAxis === "both") {
          const deltaY = ev.clientY - startY;
          setInternalHeight(Math.max(minHeight, startHeight + deltaY));
        }
      };

      const onMouseUp = () => {
        document.removeEventListener("mousemove", onMouseMove);
        document.removeEventListener("mouseup", onMouseUp);
        document.body.style.userSelect = "";
      };
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
      document.body.style.userSelect = "none";
    }, [canResize, maxHeight, resizeAxis]);

    const effectiveMaxHeight = internalHeight !== null ? `${internalHeight}px` : maxHeight;

    const autoResize = React.useCallback(() => {
      const el = textareaRef.current;
      if (!el || !maxHeight) return;
      el.style.height = "auto";
      el.style.height = `${el.scrollHeight}px`;
    }, [maxHeight]);

    React.useLayoutEffect(() => {
      autoResize();
    }, [autoResize, currentValue]);

    const surfaceStyle: React.CSSProperties = {
      ...(internalWidth !== null ? { width: `${internalWidth}px`, maxWidth: "100%" } : {}),
      ...(maxHeight === undefined && internalHeight !== null ? { height: `${internalHeight}px` } : {}),
    };

    const textareaStyle: React.CSSProperties = {
      ...propStyle,
      resize: "none",
      ...(maxHeight === undefined && internalHeight !== null ? { height: "100%" } : {}),
    };

    const textareaEl = (
      <textarea
        ref={mergedRef}
        disabled={disabled}
        data-focus-visible={isFocusVisible ? "true" : undefined}
        data-active={isFocused ? "true" : undefined}
        data-disabled={disabled || undefined}
        data-error={error || isOverLimit ? "true" : undefined}
        data-size={size}
        data-resize-axis={resizeAxis}
        data-scroll={maxHeight ? "true" : undefined}
        className={cn('textarea', css.textarea, textareaClassName, resolved.root)}
        style={textareaStyle}
        value={currentValue}
        {...mergeProps(focusProps, {
          onFocus: handleFocus,
          onBlur: handleBlur,
          onChange: handleChange,
          ...props,
        })}
      />
    );

    return (
      <div className={css.container}>
        <div
          ref={surfaceRef}
          className={css.surface}
          data-resize-axis={resizeAxis}
          style={surfaceStyle}
        >
          {maxHeight ? (
            <div
              ref={scrollWrapperRef}
              className={cn('textarea', 'scroll-wrapper', css["scroll-wrapper"])}
              data-focus-visible={isFocusVisible ? "true" : undefined}
              data-active={isFocused ? "true" : undefined}
              data-disabled={disabled || undefined}
              data-error={error || isOverLimit ? "true" : undefined}
              data-size={size}
            >
              <Scroll maxHeight={effectiveMaxHeight} style={{ height: "auto" }}>
                {textareaEl}
              </Scroll>
            </div>
          ) : (
            textareaEl
          )}
          {canResize && (
            <div
              aria-hidden="true"
              data-axis={resizeAxis}
              data-slot="resize-handle"
              className={cn('textarea', 'resize-handle', css["resize-handle"])}
              onMouseDown={handleResizeMouseDown}
            />
          )}
        </div>
        {showCharacterCount && (
          <div
            className={cn('textarea', 'character-count', css["character-count"], resolved.characterCount)}
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
