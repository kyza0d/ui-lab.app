"use client";

import React, { forwardRef, type ComponentPropsWithoutRef } from "react";

import { useFocusRing } from "@react-aria/focus"
import { mergeProps, } from "@react-aria/utils";

import { ChevronUp, ChevronDown } from "lucide-react";
import { cn, type StyleValue } from "@/lib/utils";
import { type StylesProp, createStylesResolver } from "@/lib/styles";
import { Tooltip } from "@/components/Tooltip";
import css from "./Input.module.css";

type Variant = "default" | "ghost";

export interface InputStyleSlots {
  root?: StyleValue;
}

export type InputStylesProp = StylesProp<InputStyleSlots>;

export type InputAction = InputActionDef | React.ReactNode;
type InputIconSlots = {
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
};

export type InputActionDef = {
  icon: React.ReactNode;
  title: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

type InputActionSlots = {
  left?: InputAction[];
  right?: InputAction[];
};

const resolveInputStyles = createStylesResolver(['root'] as const);

export interface InputProps extends Omit<ComponentPropsWithoutRef<"input">, "size"> {
  /** Controls the visual style of the input */
  variant?: Variant;
  /** Whether the input is in an error state */
  error?: boolean;
  /** Icon displayed before the input value by default, or in named prefix/suffix slots */
  icon?: React.ReactNode | InputIconSlots;
  /** Inline actions rendered on the left or right side of the input. Passing an array keeps the existing right-side behavior. */
  actions?: InputAction[] | InputActionSlots;
  /** Hint content rendered inside a badge on the right side of the input, commonly used for keyboard shortcuts. */
  hint?: React.ReactNode;
  /** Classes applied to the root or named slots. Accepts a string, cn()-compatible array, slot object, or array of any of those. */
  styles?: InputStylesProp;
}

function isInputIconSlots(icon: InputProps["icon"]): icon is InputIconSlots {
  return typeof icon === "object" && icon !== null && !React.isValidElement(icon) && ("prefix" in icon || "suffix" in icon);
}

function resolveInputIcon(icon: InputProps["icon"]) {
  if (!icon) {
    return undefined;
  }

  if (isInputIconSlots(icon)) {
    return icon;
  }

  return { prefix: icon };
}

function isInputActionSlots(actions: InputProps["actions"]): actions is InputActionSlots {
  return typeof actions === "object" && actions !== null && !Array.isArray(actions) && !React.isValidElement(actions) && ("left" in actions || "right" in actions);
}

function resolveInputActions(actions: InputProps["actions"]): InputActionSlots {
  if (!actions) {
    return {};
  }

  if (isInputActionSlots(actions)) {
    return actions;
  }

  return { right: actions };
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
      icon,
      actions,
      hint,
      type = "text",
      onFocus,
      onBlur,
      styles: stylesProp,
      ...props
    },
    ref
  ) => {
    const resolvedActions = resolveInputActions(actions);
    const resolvedIcon = resolveInputIcon(icon);
    const leftActions = resolvedActions.left ?? [];
    const rightActions = resolvedActions.right ?? [];
    const hasPrefix = !!resolvedIcon?.prefix;
    const hasSuffix = !!resolvedIcon?.suffix;
    const hasLeftActions = leftActions.length > 0;
    const hasRightActions = rightActions.length > 0;
    const hasHint = hint !== undefined && hint !== null;
    const hasStartAdornment = hasPrefix || hasLeftActions;
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
    const hasEndAdornment = hasSuffix || hasRightActions || hasHint || isNumberType;
    const inputPaddingStyle: React.CSSProperties = {
      ...(hasStartAdornment ? { paddingLeft: '8px' } : {}),
      ...(hasEndAdornment ? { paddingRight: '8px' } : {}),
    };

    const renderAction = (action: InputAction, index: number) => {
      const key = React.isValidElement(action) ? index : ((action as InputActionDef).title || index);

      return React.isValidElement(action) ? (
        <React.Fragment key={key}>{action}</React.Fragment>
      ) : (
        <Tooltip key={key} content={(action as InputActionDef).title} position="top">
          <button
            type="button"
            className={css.action}
            aria-label={(action as InputActionDef).title}
            onClick={(action as InputActionDef).onClick}
          >
            {(action as InputActionDef).icon}
          </button>
        </Tooltip>
      );
    };

    return (
      <div
        className={cn('input', css.container)}
        data-active={isFocused ? "true" : undefined}
        data-focus-visible={isFocusVisible ? "true" : undefined}
        data-disabled={disabled || undefined}
        data-error={error ? "true" : undefined}
        data-variant={variant}
      >
        {hasStartAdornment && (
          <div className={css['start-adornments']} data-start-adornments>
            {hasPrefix && (
              <div className={cn('input', 'icon-wrapper', css['icon-wrapper'], css['prefix-icon'])}>
                {resolvedIcon?.prefix}
              </div>
            )}
            {hasLeftActions && (
              <div className={css.actions} data-actions data-actions-position="left">
                {leftActions.map(renderAction)}
              </div>
            )}
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
            'input',
            css.input,
            className,
            resolved.root
          )}
          style={inputPaddingStyle}
          {...mergeProps(focusProps, {
            onFocus: handleFocus,
            onBlur: handleBlur,
            ...props,
          })}
        />
        {hasEndAdornment && (
          <div className={css['end-adornments']} data-end-adornments>
            {hasSuffix && (
              <div className={cn('input', 'icon-wrapper', css['icon-wrapper'], css['suffix-icon'])}>
                {resolvedIcon?.suffix}
              </div>
            )}
            {hasRightActions && (
              <div className={css.actions} data-actions data-actions-position="right">
                {rightActions.map(renderAction)}
              </div>
            )}
            {hasHint && <span data-hint>{hint}</span>}
            {isNumberType && (
              <div
                className={cn(css['number-controls'], disabled && css.disabled)}
                data-disabled={disabled || undefined}
              >
                <button
                  type="button"
                  className={cn('input', 'spin-button', css['spin-button'])}
                  onClick={() => handleSpinClick("up")}
                  disabled={disabled}
                  tabIndex={-1}
                  aria-label="Increment"
                >
                  <ChevronUp size={12} />
                </button>
                <button
                  type="button"
                  className={cn('input', 'spin-button', css['spin-button'])}
                  onClick={() => handleSpinClick("down")}
                  disabled={disabled}
                  tabIndex={-1}
                  aria-label="Decrement"
                >
                  <ChevronDown size={12} />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
