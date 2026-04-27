"use client";

import React, { forwardRef, useState, type ComponentPropsWithoutRef } from "react";

import { useFocusRing } from "@react-aria/focus";
import { useHover } from "@react-aria/interactions";
import { mergeProps } from "@react-aria/utils";

import { cn, type StyleValue } from "@/lib/utils";
import { type StylesProp, createStylesResolver } from "@/lib/styles";
import { useFocusIndicator } from "@/hooks/useFocusIndicator";
import { useMergeRefs } from "@/hooks/useMergeRefs";
import { Scroll } from "@/components/Scroll";
import css from "./Textarea.module.css";

type TextareaSize = "sm" | "md" | "lg";
type ResizeAxis = "both" | "x" | "y" | "none";

export interface TextareaResizeHandleStyles {
  both?: StyleValue;
  x?: StyleValue;
  y?: StyleValue;
}

export interface TextareaStyleSlots {
  root?: StyleValue;
  container?: StyleValue;
  surface?: StyleValue;
  scrollWrapper?: StyleValue;
  resizeHandle?: StyleValue | TextareaResizeHandleStyles;
  characterCount?: StyleValue;
}

export type TextareaStylesProp = StylesProp<TextareaStyleSlots>;
export type TextAreaStyleSlots = TextareaStyleSlots;
export type TextAreaStylesProp = TextareaStylesProp;

const resolveTextareaBaseStyles = createStylesResolver([
  "root",
  "container",
  "surface",
  "scrollWrapper",
  "resizeHandleBoth",
  "resizeHandleX",
  "resizeHandleY",
  "characterCount",
] as const);

function resolveTextareaStyles(styles: TextareaStylesProp | undefined) {
  if (!styles || typeof styles === "string" || Array.isArray(styles)) {
    return resolveTextareaBaseStyles(styles);
  }

  const { root, container, surface, scrollWrapper, resizeHandle, characterCount } = styles;

  let resizeHandleBoth: StyleValue | undefined;
  let resizeHandleX: StyleValue | undefined;
  let resizeHandleY: StyleValue | undefined;

  if (resizeHandle) {
    if (typeof resizeHandle === "string" || Array.isArray(resizeHandle)) {
      resizeHandleBoth = resizeHandle;
      resizeHandleX = resizeHandle;
      resizeHandleY = resizeHandle;
    } else {
      resizeHandleBoth = resizeHandle.both;
      resizeHandleX = resizeHandle.x;
      resizeHandleY = resizeHandle.y;
    }
  }

  return resolveTextareaBaseStyles({
    root,
    container,
    surface,
    scrollWrapper,
    resizeHandleBoth,
    resizeHandleX,
    resizeHandleY,
    characterCount,
  });
}

export interface TextareaProps extends Omit<ComponentPropsWithoutRef<"textarea">, "size"> {
  /** Size of the textarea. */
  size?: TextareaSize;
  /** Whether to apply error styling. */
  error?: boolean;
  /** Whether the textarea can be manually resized by the user. When enabled, `className` may include Tailwind `resize`, `resize-x`, `resize-y`, or `resize-none` to select the resize axis. */
  resizable?: boolean;
  /** Whether to display a character count below the textarea. */
  showCharacterCount?: boolean;
  /** Maximum number of characters allowed. */
  maxCharacters?: number;
  /** Maximum height before the custom scrollbar activates. */
  maxHeight?: string;
  /** Classes applied to the root or named slots. Accepts a string, cn()-compatible array, slot object, or array of any of those. */
  styles?: TextareaStylesProp;
}

export type TextAreaProps = TextareaProps;

const resizeClassMap: Record<string, ResizeAxis> = {
  resize: "both",
  "resize-x": "x",
  "resize-y": "y",
  "resize-none": "none",
};

const sizeMap: Record<TextareaSize, string> = {
  sm: css["size-sm"],
  md: css["size-md"],
  lg: css["size-lg"],
};

const resizeHandleClassMap: Record<Exclude<ResizeAxis, "none">, string> = {
  both: css["resize-handle-both"],
  x: css["resize-handle-x"],
  y: css["resize-handle-y"],
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

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
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

    const scopeRef = React.useRef<HTMLDivElement>(null);
    const containerRef = React.useRef<HTMLDivElement>(null);
    const surfaceRef = React.useRef<HTMLDivElement>(null);
    const scrollWrapperRef = React.useRef<HTMLDivElement>(null);
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);
    const mergedRef = useMergeRefs(ref, textareaRef);

    const { focusProps, isFocusVisible } = useFocusRing();
    const { hoverProps, isHovered } = useHover({ isDisabled: disabled });
    const { indicatorProps } = useFocusIndicator({
      scopeRef,
      containerRef,
      surfaceSelector: '[data-textarea-focus-surface="true"]',
      radiusSource: "surface",
      dependencies: [maxHeight, size],
    });

    const currentValue = controlledValue !== undefined ? controlledValue : internalValue;
    const charCount = typeof currentValue === "string" ? currentValue.length : 0;
    const isOverLimit = maxCharacters ? charCount > maxCharacters : false;
    const hasScrollSurface = maxHeight !== undefined;
    const resizeAxis = resolveResizeAxis(className, resizable);
    const canResize = resizeAxis !== "none" && !disabled;
    const textareaClassName = stripResizeClasses(className);
    const resolved = resolveTextareaStyles(styles);

    const handleFocus = (event: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused(true);
      onFocus?.(event);
    };

    const handleBlur = (event: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused(false);
      onBlur?.(event);
    };

    const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      const nextValue = event.target.value;

      if (maxCharacters && nextValue.length > maxCharacters) {
        const truncatedValue = nextValue.slice(0, maxCharacters);

        if (controlledValue === undefined) {
          setInternalValue(truncatedValue);
        }

        onChange?.({
          ...event,
          target: { ...event.target, value: truncatedValue },
        } as React.ChangeEvent<HTMLTextAreaElement>);
        return;
      }

      if (controlledValue === undefined) {
        setInternalValue(nextValue);
      }

      onChange?.(event);
    };

    const handleResizeMouseDown = React.useCallback(
      (event: React.MouseEvent<HTMLDivElement>) => {
        if (!canResize) return;

        event.preventDefault();

        const textarea = textareaRef.current;
        const surface = surfaceRef.current;
        const scrollWrapper = scrollWrapperRef.current;
        if (!textarea || !surface) return;

        const computed = window.getComputedStyle(textarea);
        const minHeight = Number.parseFloat(computed.minHeight) || 60;
        const minWidth = Number.parseFloat(computed.minWidth) || 160;
        const startX = event.clientX;
        const startY = event.clientY;
        const startWidth = surface.getBoundingClientRect().width;
        const startHeight = hasScrollSurface
          ? (scrollWrapper?.getBoundingClientRect().height ?? surface.getBoundingClientRect().height)
          : surface.getBoundingClientRect().height;

        const onMouseMove = (nextEvent: MouseEvent) => {
          if (resizeAxis === "x" || resizeAxis === "both") {
            const deltaX = nextEvent.clientX - startX;
            setInternalWidth(Math.max(minWidth, startWidth + deltaX));
          }

          if (resizeAxis === "y" || resizeAxis === "both") {
            const deltaY = nextEvent.clientY - startY;
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
      },
      [canResize, hasScrollSurface, resizeAxis]
    );

    const effectiveMaxHeight = internalHeight !== null ? `${internalHeight}px` : maxHeight;

    const autoResize = React.useCallback(() => {
      const element = textareaRef.current;
      if (!element || !maxHeight) return;

      element.style.height = "auto";
      element.style.height = `${element.scrollHeight}px`;
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

    const resolvedResizeHandle =
      resizeAxis === "none"
        ? undefined
        : resizeAxis === "x"
          ? resolved.resizeHandleX
          : resizeAxis === "y"
            ? resolved.resizeHandleY
            : resolved.resizeHandleBoth;

    const textareaElement = (
      <textarea
        ref={mergedRef}
        disabled={disabled}
        data-size={size}
        data-scroll={hasScrollSurface ? "true" : undefined}
        data-resize-axis={resizeAxis}
        data-disabled={disabled ? "true" : undefined}
        data-error={error || isOverLimit ? "true" : undefined}
        data-focused={isFocused ? "true" : undefined}
        data-focus-visible={isFocusVisible ? "true" : undefined}
        data-hovered={isHovered ? "true" : undefined}
        data-textarea-focus-surface={hasScrollSurface ? undefined : "true"}
        className={cn(
          "textarea",
          css.textarea,
          sizeMap[size],
          textareaClassName,
          resolved.root
        )}
        style={textareaStyle}
        value={currentValue}
        {...mergeProps(focusProps, hoverProps, {
          onFocus: handleFocus,
          onBlur: handleBlur,
          onChange: handleChange,
          ...props,
        })}
      />
    );

    return (
      <div ref={scopeRef} className={cn("textarea-scope", css.scope)}>
        <div {...indicatorProps} data-focus-indicator="local" />
        <div
          ref={containerRef}
          className={cn("textarea", "container", css.container, resolved.container)}
        >
          <div
            ref={surfaceRef}
            className={cn("textarea", "surface", css.surface, resolved.surface)}
            data-disabled={disabled ? "true" : undefined}
            data-error={error || isOverLimit ? "true" : undefined}
            data-focused={isFocused ? "true" : undefined}
            data-focus-visible={isFocusVisible ? "true" : undefined}
            data-hovered={isHovered ? "true" : undefined}
            data-resize-axis={resizeAxis}
            style={surfaceStyle}
          >
            {hasScrollSurface ? (
              <div
                ref={scrollWrapperRef}
                data-textarea-focus-surface="true"
                data-disabled={disabled ? "true" : undefined}
                data-error={error || isOverLimit ? "true" : undefined}
                data-focused={isFocused ? "true" : undefined}
                data-focus-visible={isFocusVisible ? "true" : undefined}
                data-hovered={isHovered ? "true" : undefined}
                className={cn(
                  "textarea",
                  "scroll-wrapper",
                  css["scroll-wrapper"],
                  resolved.scrollWrapper
                )}
              >
                <Scroll maxHeight={effectiveMaxHeight} style={{ height: "auto" }}>
                  {textareaElement}
                </Scroll>
              </div>
            ) : (
              textareaElement
            )}
            {canResize && (
              <div
                aria-hidden="true"
                data-axis={resizeAxis}
                data-slot="resize-handle"
                className={cn(
                  "textarea",
                  "resize-handle",
                  css["resize-handle"],
                  resizeHandleClassMap[resizeAxis],
                  resolvedResizeHandle
                )}
                onMouseDown={handleResizeMouseDown}
              />
            )}
          </div>
          {showCharacterCount && (
            <div
              className={cn(
                "textarea",
                "character-count",
                css["character-count"],
                resolved.characterCount
              )}
              data-over-limit={isOverLimit ? "true" : undefined}
            >
              {charCount}
              {maxCharacters ? ` / ${maxCharacters}` : ""} characters
            </div>
          )}
        </div>
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

const TextArea = Textarea;

export { Textarea, TextArea };
