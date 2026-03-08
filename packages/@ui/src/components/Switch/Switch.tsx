"use client";

import React from "react";

import { mergeProps, } from "@react-aria/utils";
import { useHover } from "@react-aria/interactions";
import { useFocusRing } from "@react-aria/focus"
import { useSwitch } from "@react-aria/switch";

import { useToggleState } from "react-stately";
import { cn, type StyleValue } from "@/lib/utils";
import { type StylesProp, createStylesResolver } from "@/lib/styles";

import styles from "./Switch.module.css";



export interface SwitchStyleSlots {
  root?: StyleValue;
  track?: StyleValue;
  thumb?: StyleValue;
}

export type SwitchStylesProp = StylesProp<SwitchStyleSlots>;

const resolveSwitchBaseStyles = createStylesResolver(['root', 'track', 'thumb'] as const);

export interface SwitchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size" | "onChange" | "checked" | "defaultChecked"> {
  /** Controlled selected (on) state */
  isSelected?: boolean;
  /** Called when the switch is toggled */
  onChange?: (isSelected: boolean) => void;
  /** Initial selected state for uncontrolled usage */
  defaultSelected?: boolean;

  /** Whether the switch is disabled */
  isDisabled?: boolean;
  /** Classes applied to the root or named slots. Accepts a string, cn()-compatible array, slot object, or array of any of those. */
  styles?: SwitchStylesProp;
}


const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  ({
      className,
      styles: stylesProp,
      isDisabled = false,
      isSelected: controlledSelected,
      onChange,
      defaultSelected,
      ...props
    },
    ref
  ) => {
    const state = useToggleState({
      isSelected: controlledSelected,
      defaultSelected: defaultSelected ?? false,
      onChange,
    });

    const inputRef = React.useRef<HTMLInputElement>(null);

    // Extract aria-label from props if provided
    const { "aria-label": ariaLabel, "aria-labelledby": ariaLabelledby, ...otherProps } = props;

    const { inputProps, isSelected } = useSwitch(
      {
        isDisabled,
        ...(ariaLabel && { "aria-label": ariaLabel }),
        ...(ariaLabelledby && { "aria-labelledby": ariaLabelledby }),
      },
      state,
      inputRef
    );
    const { focusProps, isFocusVisible } = useFocusRing();
    const { hoverProps, isHovered } = useHover({ isDisabled });



    React.useImperativeHandle(ref, () => inputRef.current!);

    const resolved = resolveSwitchBaseStyles(stylesProp);

    return (
      <div
        className={cn(
          'switch',
          styles.switch,
          className,
          resolved.root
        )}
        data-selected={isSelected || undefined}
        data-disabled={isDisabled || undefined}
        data-focus-visible={isFocusVisible || undefined}
        data-hovered={isHovered || undefined}
      >
        <div
          className={cn(
            'switch-track',
            styles["switch-track"],
            resolved.track
          )}
        />
        <div
          className={cn(
            'switch-thumb',
            styles["switch-thumb"],
            resolved.thumb
          )}
        />
        <input
          ref={inputRef}
          type="checkbox"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          {...mergeProps(inputProps, focusProps, hoverProps)}
          {...otherProps}
        />
      </div>
    );
  }
);

Switch.displayName = "Switch";

export { Switch };
