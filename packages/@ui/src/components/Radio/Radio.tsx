"use client";

import React, { useId, createContext, useContext } from "react";
import { useRadioGroupState } from "react-stately";

import { mergeProps } from "@react-aria/utils";
import { useHover } from "@react-aria/interactions";
import { useFocusRing } from "@react-aria/focus";
import { useRadioGroup, useRadio } from "@react-aria/radio";

import { cn, type StyleValue } from "@/lib/utils";
import { type StylesProp, createStylesResolver } from "@/lib/styles";
import { asElementProps } from "@/lib/react-aria";
import styles from "./Radio.module.css";

type Size = "sm" | "md" | "lg";

export interface RadioStyleSlots {
  root?: StyleValue;
  item?: StyleValue;
  input?: StyleValue;
  dot?: StyleValue;
  label?: StyleValue;
  description?: StyleValue;
  helperText?: StyleValue;
}

export type RadioStylesProp = StylesProp<RadioStyleSlots>;

const resolveRadioBaseStyles = createStylesResolver([
  "root",
  "item",
  "input",
  "dot",
  "label",
  "description",
  "helperText",
] as const);

function resolveRadioStyles(styles: RadioStylesProp | undefined) {
  if (!styles || typeof styles === "string" || Array.isArray(styles)) {
    return resolveRadioBaseStyles(styles);
  }

  const { root, item, input, dot, label, description, helperText } = styles;
  return resolveRadioBaseStyles({ root, item, input, dot, label, description, helperText });
}

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

export interface RadioGroupStyleSlots {
  root?: StyleValue;
  label?: StyleValue;
  description?: StyleValue;
  group?: StyleValue;
}

export type RadioGroupStylesProp = StylesProp<RadioGroupStyleSlots>;

const resolveRadioGroupBaseStyles = createStylesResolver([
  "root",
  "label",
  "description",
  "group",
] as const);

function resolveRadioGroupStyles(styles: RadioGroupStylesProp | undefined) {
  if (!styles || typeof styles === "string" || Array.isArray(styles)) {
    return resolveRadioGroupBaseStyles(styles);
  }

  const { root, label, description, group } = styles;
  return resolveRadioGroupBaseStyles({ root, label, description, group });
}

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
  /** Classes applied to the root or named slots */
  styles?: RadioGroupStylesProp;
}

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  (
    {
      value: controlledValue,
      defaultValue,
      onValueChange,
      disabled = false,
      size = "md",
      children,
      className,
      label,
      description,
      styles: stylesProp,
    },
    ref
  ) => {
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

    const resolved = resolveRadioGroupStyles(stylesProp);

    return (
      <RadioGroupContext.Provider value={{ state, disabled, size }}>
        <div ref={ref} className={cn(className, resolved.root)} role="group">
          {label && (
            <label
              className={cn("radio", "radio-label", styles["radio-label"], resolved.label)}
              data-disabled={disabled ? "true" : undefined}
            >
              {label}
            </label>
          )}
          {description && (
            <p
              className={cn("radio", "radio-description", styles["radio-description"], resolved.description)}
            >
              {description}
            </p>
          )}
          <div className={cn(styles["radio-group"], resolved.group)}>{children}</div>
        </div>
      </RadioGroupContext.Provider>
    );
  }
);

RadioGroup.displayName = "RadioGroup";

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
  (
    {
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
    },
    ref
  ) => {
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
    const mergedRef = useMergedRef(ref, inputRef);

    const ariaLabelFromProps = props["aria-label"];
    const ariaLabelValue = ariaLabelFromProps || (typeof label === "string" ? label : undefined);

    const { inputProps } = useRadio(
      {
        value,
        isDisabled: disabled,
        ...(ariaLabelValue && { "aria-label": ariaLabelValue }),
      },
      state,
      inputRef
    );

    const { focusProps, isFocused, isFocusVisible } = useFocusRing();
    const { hoverProps, isHovered } = useHover({ isDisabled: disabled });
    const resolved = resolveRadioStyles(stylesProp);

    return (
      <div className="w-full">
        <div className={cn(styles["radio-item"], resolved.item)} data-disabled={disabled ? "true" : undefined}>
          <div className="relative">
            <div
              className={cn("radio", styles.radio, styles[size], className, resolved.root)}
              data-selected={isSelected ? "true" : "false"}
              data-disabled={disabled ? "true" : undefined}
              data-error={error ? "true" : undefined}
              data-hovered={isHovered ? "true" : "false"}
              data-focused={isFocused ? "true" : "false"}
              data-focus-visible={isFocusVisible ? "true" : "false"}
              role="presentation"
            >
              <div className={cn(styles["radio-dot"], styles[size], resolved.dot)} />
            </div>
            <input
              {...asElementProps<"input">(mergeProps(inputProps, focusProps, hoverProps))}
              ref={mergedRef}
              type="radio"
              id={radioId}
              className={cn(styles["radio-input"], resolved.input)}
              suppressHydrationWarning
              {...props}
            />
          </div>
          {(label || description) && (
            <div className="flex flex-col gap-1">
              {label && (
                <label
                  htmlFor={radioId}
                  className={cn("radio", "radio-label", styles["radio-label"], resolved.label)}
                  data-disabled={disabled ? "true" : undefined}
                  suppressHydrationWarning
                >
                  {label}
                </label>
              )}
              {description && (
                <p
                  className={cn(
                    "radio",
                    "radio-description",
                    styles["radio-description"],
                    resolved.description
                  )}
                  data-error={error ? "true" : undefined}
                >
                  {description}
                </p>
              )}
            </div>
          )}
        </div>
        {helperText && (
          <p
            className={cn("radio", "helper-text", styles["helper-text"], resolved.helperText)}
            data-error={helperTextError ? "true" : undefined}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

RadioItem.displayName = "RadioItem";

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
  (
    {
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
    },
    ref
  ) => {
    const [internalChecked, setInternalChecked] = React.useState(checkedProp ?? defaultChecked ?? false);
    const generatedId = useId();

    const isControlled = checkedProp !== undefined;
    const checked = isControlled ? checkedProp : internalChecked;

    const { focusProps, isFocused, isFocusVisible } = useFocusRing();
    const { hoverProps, isHovered } = useHover({ isDisabled: disabled });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setInternalChecked(e.target.checked);
      }
      onChange?.(e);
    };

    const radioId = id || `radio-${generatedId}`;
    const inputRef = React.useRef<HTMLInputElement>(null);
    const mergedRef = useMergedRef(ref, inputRef);
    const resolved = resolveRadioStyles(stylesProp);

    return (
      <div className="w-full">
        <div className={cn(styles["radio-item"], resolved.item)} data-disabled={disabled ? "true" : undefined}>
          <div className="relative">
            <div
              className={cn("radio", styles.radio, styles[size], className, resolved.root)}
              data-selected={checked ? "true" : "false"}
              data-disabled={disabled ? "true" : undefined}
              data-error={error ? "true" : undefined}
              data-hovered={isHovered ? "true" : "false"}
              data-focused={isFocused ? "true" : "false"}
              data-focus-visible={isFocusVisible ? "true" : "false"}
              role="presentation"
            >
              <div className={cn(styles["radio-dot"], styles[size], resolved.dot)} />
            </div>
            <input
              {...asElementProps<"input">(mergeProps(focusProps, hoverProps))}
              ref={mergedRef}
              type="radio"
              id={radioId}
              checked={checked}
              onChange={handleChange}
              disabled={disabled ?? false}
              className={cn(styles["radio-input"], resolved.input)}
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
                  className={cn("radio", "radio-label", styles["radio-label"], resolved.label)}
                  data-disabled={disabled ? "true" : undefined}
                  suppressHydrationWarning
                >
                  {label}
                </label>
              )}
              {description && (
                <p
                  className={cn(
                    "radio",
                    "radio-description",
                    styles["radio-description"],
                    resolved.description
                  )}
                  data-error={error ? "true" : undefined}
                >
                  {description}
                </p>
              )}
            </div>
          )}
        </div>
        {helperText && (
          <p
            className={cn("radio", "helper-text", styles["helper-text"], resolved.helperText)}
            data-error={helperTextError ? "true" : undefined}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

RadioBase.displayName = "Radio";

function useMergedRef<T>(...refs: (React.Ref<T> | undefined)[]): React.RefCallback<T> {
  return (value: T) => {
    refs.forEach((slotRef) => {
      if (typeof slotRef === "function") {
        slotRef(value);
      } else if (slotRef && typeof slotRef === "object") {
        (slotRef as React.MutableRefObject<T | null>).current = value;
      }
    });
  };
}

const Radio = Object.assign(RadioBase, {
  Group: RadioGroup,
  Item: RadioItem,
});

export { Radio };
