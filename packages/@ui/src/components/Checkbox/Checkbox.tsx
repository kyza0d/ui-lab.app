"use client";

import React, { forwardRef, useId, useState } from "react";
import { useFocusRing } from "@react-aria/focus";
import { mergeProps } from "@react-aria/utils";
import { cn, type StyleValue } from "@/lib/utils";
import { type StylesProp, createStylesResolver } from "@/lib/styles";
import { useFocus } from "@/hooks/useFocus";
import { useMergeRefs } from "@/hooks/useMergeRefs";
import css from "./Checkbox.module.css";

interface CheckboxIconStyles {
  checkmark?: StyleValue;
  indeterminate?: StyleValue;
}

export interface CheckboxStyleSlots {
  root?: StyleValue;
  checkbox?: StyleValue;
  "icon-checkmark"?: StyleValue;
  "icon-indeterminate"?: StyleValue;
  icon?: StyleValue | CheckboxIconStyles;
  label?: StyleValue;
  "helper-text"?: StyleValue;
}

export type CheckboxStylesProp = StylesProp<CheckboxStyleSlots>;

const resolveCheckboxBaseStyles = createStylesResolver([
  "root",
  "checkbox",
  "icon-checkmark",
  "icon-indeterminate",
  "label",
  "helper-text",
] as const);

function resolveCheckboxStyles(styles: CheckboxStylesProp | undefined) {
  if (!styles || typeof styles === "string" || Array.isArray(styles)) return resolveCheckboxBaseStyles(styles);
  const { root, checkbox, icon, label } = styles;

  let iconCheckmark: StyleValue | undefined = styles["icon-checkmark"];
  let iconIndeterminate: StyleValue | undefined = styles["icon-indeterminate"];

  if (icon) {
    if (typeof icon === "string" || Array.isArray(icon)) {
      iconCheckmark = cn(icon, iconCheckmark);
      iconIndeterminate = cn(icon, iconIndeterminate);
    } else {
      iconCheckmark = cn(icon.checkmark, iconCheckmark);
      iconIndeterminate = cn(icon.indeterminate, iconIndeterminate);
    }
  }

  return resolveCheckboxBaseStyles({
    root,
    checkbox,
    "icon-checkmark": iconCheckmark,
    "icon-indeterminate": iconIndeterminate,
    label,
    "helper-text": styles["helper-text"],
  });
}

export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  /** Label text or element displayed next to the checkbox */
  label?: React.ReactNode;
  /** Helper text shown below the checkbox. Prefer `helper`; `helperText` is kept as a compatibility alias. */
  helper?: React.ReactNode;
  /** Compatibility alias for `helper`. */
  helperText?: React.ReactNode;
  /** Whether to style the helper text as an error and mark the checkbox invalid. */
  helperTextError?: boolean;
  /** Whether the checkbox is invalid. Prefer `error`; `isInvalid` is an alias for form libraries. */
  error?: boolean;
  /** Alias for `error`. */
  isInvalid?: boolean;
  /** Whether to show an indeterminate (partial selection) state. Prefer `indeterminate`; `isIndeterminate` is kept as an alias. */
  isIndeterminate?: boolean;
  /** Whether to show an indeterminate (partial selection) state. */
  indeterminate?: boolean;
  /** Ref for the underlying input. The forwarded ref remains attached to the wrapper element. */
  inputRef?: React.Ref<HTMLInputElement>;
  /** Classes applied to the root or named slots. Accepts a string, cn()-compatible array, slot object, or array of any of those. */
  styles?: CheckboxStylesProp;
}

export const Checkbox = forwardRef<HTMLDivElement, CheckboxProps>(
  (
    {
      className,
      label,
      helper,
      helperText,
      helperTextError = false,
      error = false,
      isInvalid = false,
      id,
      disabled = false,
      checked,
      defaultChecked,
      onChange,
      isIndeterminate = false,
      indeterminate = false,
      inputRef: forwardedInputRef,
      styles,
      ...props
    },
    ref
  ) => {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const rootRef = React.useRef<HTMLDivElement>(null);
    const generatedId = useId();
    const inputId = id ?? `checkbox-${generatedId}`;
    const helperId = `${inputId}-helper`;
    const resolvedHelper = helper ?? helperText;
    const resolvedIndeterminate = indeterminate || isIndeterminate;
    // Track pressed state for tactile feedback animation (data-pressed attribute)
    const [isPressed, setIsPressed] = useState(false);
    const [internalChecked, setInternalChecked] = useState(() =>
      checked !== undefined ? checked : (defaultChecked ?? false)
    );
    const { focusProps, isFocused, isFocusVisible } = useFocusRing();
    const { scopeProps, indicatorProps } = useFocus({
      scopeRef: rootRef,
      containerRef: rootRef,
      surfaceSelector: '[data-checkbox-focus-surface="true"]',
      radiusSource: "surface",
    });

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

    React.useEffect(() => {
      if (inputRef.current) {
        inputRef.current.indeterminate = resolvedIndeterminate;
      }
    }, [resolvedIndeterminate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      // Update internal state (needed for uncontrolled mode)
      setInternalChecked(e.target.checked);
      // Call parent handler if provided
      onChange?.(e);
    };

    const inputProps = mergeProps(props, focusProps, {
      onChange: handleChange,
      onMouseDown: handleMouseDown,
      onMouseUp: handleMouseUp,
      onMouseLeave: handleMouseLeave,
      onKeyDown: handleKeyDown,
      onKeyUp: handleKeyUp,
    }) as React.InputHTMLAttributes<HTMLInputElement>;

    // Determine if this is a controlled component
    const isControlled = checked !== undefined;
    const displayChecked = isControlled ? checked : internalChecked;
    const propAriaInvalid = props["aria-invalid"];
    const resolvedInvalid =
      error ||
      isInvalid ||
      helperTextError ||
      propAriaInvalid === true ||
      propAriaInvalid === "true";
    const describedBy = [props["aria-describedby"], resolvedHelper ? helperId : undefined]
      .filter(Boolean)
      .join(" ") || undefined;

    const resolved = resolveCheckboxStyles(styles);
    const mergedRootRef = useMergeRefs(rootRef, ref);
    const mergedInputRef = useMergeRefs(inputRef, forwardedInputRef);

    return (
      <div
        ref={mergedRootRef}
        className={cn("checkbox-root", scopeProps.className, css['checkbox-root'], resolved.root)}
        data-disabled={disabled ? "true" : undefined}
        data-invalid={resolvedInvalid ? "true" : undefined}
        data-indeterminate={resolvedIndeterminate ? "true" : undefined}
      >
        <div {...indicatorProps} data-focus-indicator="local" />
        <div className={cn(css.container)}>
          <input
            {...inputProps}
            ref={mergedInputRef}
            type="checkbox"
            id={inputId}
            disabled={disabled}
            {...(isControlled ? { checked } : { defaultChecked: internalChecked })}
            className={cn(
              'checkbox',
              css.checkbox,
              className,
              resolved.checkbox
            )}
            data-selected={displayChecked ? "true" : undefined}
            data-disabled={disabled ? "true" : undefined}
            data-invalid={resolvedInvalid ? "true" : undefined}
            data-error={resolvedInvalid ? "true" : undefined}
            data-indeterminate={resolvedIndeterminate ? "true" : undefined}
            data-focused={isFocused ? "true" : undefined}
            data-focus-visible={isFocusVisible ? "true" : undefined}
            data-pressed={isPressed ? "true" : undefined}
            data-checkbox-focus-surface="true"
            aria-invalid={resolvedInvalid || undefined}
            aria-checked={resolvedIndeterminate ? "mixed" : props["aria-checked"]}
            aria-describedby={describedBy}
          />
          {displayChecked && !resolvedIndeterminate && (
            <svg
              className={cn('checkmark', css.checkmark, resolved["icon-checkmark"])}
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
          {resolvedIndeterminate && (
            <svg
              className={cn('indeterminate', css.indeterminate, resolved["icon-indeterminate"])}
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <line x1="5" y1="12" x2="19" y2="12" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            </svg>
          )}
        </div>
        {label && (
          <label
            htmlFor={inputId}
            className={cn(
              css.label,
              css["label-md"],
              resolved.label
            )}
            data-disabled={disabled ? "true" : undefined}
          >
            {label}
          </label>
        )}
        {resolvedHelper && (
          <p
            id={helperId}
            className={cn(
              css["helper-text"],
              resolved["helper-text"]
            )}
            data-error={resolvedInvalid ? "true" : undefined}
          >
            {resolvedHelper}
          </p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";
