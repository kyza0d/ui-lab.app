"use client";

import React, { useId, createContext, useContext } from "react";
import { useRadioGroupState } from "react-stately";

import { mergeProps, } from "@react-aria/utils";
import { useFocusRing } from "@react-aria/focus"
import { useRadioGroup, useRadio } from "@react-aria/radio";

import { cn, type StyleValue } from "@/lib/utils";
import { type StylesProp, createStylesResolver } from "@/lib/styles";
import styles from "./Radio.module.css";

export interface RadioStyleSlots {
  root?: StyleValue;
  label?: StyleValue;
  description?: StyleValue;
  helperText?: StyleValue;
}

export type RadioStylesProp = StylesProp<RadioStyleSlots>;

const resolveRadioBaseStyles = createStylesResolver(['root', 'label', 'description', 'helperText'] as const);

type Size = "sm" | "md" | "lg";

// Context for Radio.Group
interface RadioGroupContextType {
  state?: ReturnType<typeof useRadioGroupState>;
  disabled?: boolean;
  size?: Size;
}

const RadioGroupContext = createContext<RadioGroupContextType | undefined>(undefined);

const useRadioGroupContext = () => {
  const context = useContext(RadioGroupContext);
  return context;
};

// Radio.Group Component
export interface RadioGroupProps {
  /** Controlled selected radio value */
  value?: string;
  /** Initial selected value for uncontrolled usage */
  defaultValue?: string;
  /** Called when the selected value changes */
  onValueChange?: (value: string) => void;
  /** Whether all radios in the group are disabled */
  disabled?: boolean;
  /** Size of all radio buttons in the group */
  size?: Size;
  children: React.ReactNode;
  /** Additional CSS class names */
  className?: string;
  /** Accessible label for the radio group */
  label?: string;
  /** Descriptive text shown below the group label */
  description?: string;
}

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  ({
    value: controlledValue,
    defaultValue,
    onValueChange,
    disabled = false,
    size = "md",
    children,
    className,
    label,
    description,
  }, ref) => {
    const state = useRadioGroupState({
      value: controlledValue,
      defaultValue,
      onChange: onValueChange,
      isDisabled: disabled,
    });

    useRadioGroup(
      {
        isDisabled: disabled,
        label,
        description,
      },
      state
    );

    return (
      <RadioGroupContext.Provider
        value={{ state, disabled, size }}
      >
        <div
          ref={ref}
          className={className}
          role="group"
        >
          {label && (
            <label
              className={cn(
                styles["radio-label"],
                disabled && styles["radio-label-disabled"]
              )}
            >
              {label}
            </label>
          )}
          {description && (
            <p className="text-sm text-foreground-400">
              {description}
            </p>
          )}
          <div className={styles["radio-group"]}>
            {children}
          </div>
        </div>
      </RadioGroupContext.Provider>
    );
  }
);

RadioGroup.displayName = "RadioGroup";

// Radio.Item Component
export interface RadioItemProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  /** Size of the radio button */
  size?: Size;
  /** Label text or element displayed next to the radio */
  label?: React.ReactNode;
  /** Secondary description shown below the label */
  description?: React.ReactNode;
  /** Helper text shown below the radio item */
  helperText?: React.ReactNode;
  /** Whether to style the helper text as an error */
  helperTextError?: boolean;
  /** Whether to apply error styling */
  error?: boolean;
  /** Value submitted when this radio is selected */
  value: string;
  /** Classes applied to named slots */
  styles?: RadioStylesProp;
}

const RadioItem = React.forwardRef<HTMLInputElement, RadioItemProps>(
  ({
    className,
    size: sizeProp,
    disabled: disabledProp = false,
    error = false,
    label,
    description,
    helperText,
    helperTextError = false,
    value,
    id,
    styles: stylesProp,
    ...props
  }, ref) => {
    const radioGroupContext = useRadioGroupContext();
    const generatedId = useId();
    const radioId = id || `radio-${generatedId}`;

    if (!radioGroupContext?.state) {
      throw new Error("RadioItem must be used within a Radio.Group");
    }

    const { state } = radioGroupContext;
    const size = sizeProp || radioGroupContext?.size || "md";
    const disabled = disabledProp ?? radioGroupContext?.disabled ?? false;
    const isSelected = state.selectedValue === value;

    const inputRef = React.useRef<HTMLInputElement>(null);

    // Extract aria-label from props if provided, fallback to label if it's a string
    const ariaLabelFromProps = props["aria-label"];
    const ariaLabelValue =
      ariaLabelFromProps ||
      (typeof label === "string" ? label : undefined);

    const { inputProps } = useRadio(
      {
        value,
        isDisabled: disabled,
        ...(ariaLabelValue && { "aria-label": ariaLabelValue }),
      },
      state,
      inputRef
    );

    const { focusProps, isFocusVisible } = useFocusRing();
    const resolved = resolveRadioBaseStyles(stylesProp);

    return (
      <div className="w-full">
        <div
          className={styles["radio-item"]}
          data-disabled={disabled || undefined}
        >
          <div className="relative">
            <div
              className={cn(
                styles.radio,
                styles[size],
                className,
                resolved.root
              )}
              data-checked={isSelected || undefined}
              data-disabled={disabled || undefined}
              data-error={error ? "true" : undefined}
              data-focus-visible={isFocusVisible || undefined}
              role="presentation"
            >
              {isSelected && (
                <div className={cn(styles["radio-dot"], styles[size])} />
              )}
            </div>
            <input
              {...mergeProps(inputProps, focusProps)}
              ref={ref || inputRef}
              type="radio"
              id={radioId}
              className={styles["radio-input"]}
              suppressHydrationWarning
              {...props}
            />
          </div>
          {(label || description) && (
            <div className="flex flex-col gap-1">
              {label && (
                <label
                  htmlFor={radioId}
                  className={cn(
                    styles["radio-label"],
                    disabled && styles["radio-label-disabled"],
                    resolved.label
                  )}
                  suppressHydrationWarning
                >
                  {label}
                </label>
              )}
              {description && (
                <p
                  className={cn(
                    styles["radio-description"],
                    error && styles["radio-description-error"],
                    resolved.description
                  )}
                >
                  {description}
                </p>
              )}
            </div>
          )}
        </div>
        {helperText && (
          <p
            className={cn(
              "text-xs mt-2 ml-8 transition-colors",
              helperTextError ? "text-danger-600" : "text-foreground-400",
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

RadioItem.displayName = "RadioItem";

// Standalone Radio component for backward compatibility
export interface RadioProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  /** Size of the radio button */
  size?: Size;
  /** Label text or element displayed next to the radio */
  label?: React.ReactNode;
  /** Secondary description shown below the label */
  description?: React.ReactNode;
  /** Helper text shown below the radio item */
  helperText?: React.ReactNode;
  /** Whether to style the helper text as an error */
  helperTextError?: boolean;
  /** Whether to apply error styling */
  error?: boolean;
  /** Classes applied to named slots */
  styles?: RadioStylesProp;
}

const RadioBase = React.forwardRef<HTMLInputElement, RadioProps>(
  ({
    className,
    size = "md",
    disabled = false,
    error = false,
    label,
    description,
    helperText,
    helperTextError = false,
    checked: checkedProp,
    defaultChecked,
    onChange,
    id,
    styles: stylesProp,
    ...props
  }, ref) => {
    const [internalChecked, setInternalChecked] = React.useState(checkedProp ?? defaultChecked ?? false);
    const generatedId = useId();

    const isControlled = checkedProp !== undefined;
    const checked = isControlled ? checkedProp : internalChecked;

    const { focusProps, isFocusVisible } = useFocusRing();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setInternalChecked(e.target.checked);
      }
      onChange?.(e);
    };

    const radioId = id || `radio-${generatedId}`;
    const inputRef = React.useRef<HTMLInputElement>(null);
    const resolved = resolveRadioBaseStyles(stylesProp);

    return (
      <div className="w-full">
        <div
          className={styles["radio-item"]}
          data-disabled={disabled || undefined}
        >
          <div className="relative">
            <div
              className={cn(
                styles.radio,
                styles[size],
                className,
                resolved.root
              )}
              data-checked={checked || undefined}
              data-disabled={disabled || undefined}
              data-error={error ? "true" : undefined}
              data-focus-visible={isFocusVisible || undefined}
              role="presentation"
            >
              {checked && (
                <div className={cn(styles["radio-dot"], styles[size])} />
              )}
            </div>
            <input
              {...focusProps}
              ref={inputRef}
              type="radio"
              id={radioId}
              checked={checked}
              onChange={handleChange}
              disabled={disabled ?? false}
              className={styles["radio-input"]}
              aria-label={typeof label === "string" ? label : undefined}
              suppressHydrationWarning
              {...props}
            />
          </div>
          {(label || description) && (
            <div className="flex flex-col gap-1">
              {label && (
                <label
                  htmlFor={radioId}
                  className={cn(
                    styles["radio-label"],
                    disabled && styles["radio-label-disabled"],
                    resolved.label
                  )}
                  suppressHydrationWarning
                >
                  {label}
                </label>
              )}
              {description && (
                <p
                  className={cn(
                    styles["radio-description"],
                    error && styles["radio-description-error"],
                    resolved.description
                  )}
                >
                  {description}
                </p>
              )}
            </div>
          )}
        </div>
        {helperText && (
          <p
            className={cn(
              "text-xs mt-2 ml-8 transition-colors",
              helperTextError ? "text-danger-600" : "text-foreground-400",
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

RadioBase.displayName = "Radio";

// Compound component
const Radio = Object.assign(RadioBase, {
  Group: RadioGroup,
  Item: RadioItem,
});

export { Radio };
