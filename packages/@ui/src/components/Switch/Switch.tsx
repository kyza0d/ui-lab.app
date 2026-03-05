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

const sizeMap = {
  md: styles["md"],
  lg: styles["lg"],
};

const shapeMap = {
  pill: styles["pill"],
  round: styles["round"],
};

const thumbPositions = {
  md: { unchecked: 0.25, checked: 1 },
  lg: { unchecked: 0.25, checked: 1.5 },
};


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
  /** Size of the switch */
  size?: "md" | "lg";
  /** Whether to render with a fully rounded pill shape */
  pill?: boolean;
  /** Whether the switch is disabled */
  isDisabled?: boolean;
  /** Classes applied to the root or named slots. Accepts a string, cn()-compatible array, slot object, or array of any of those. */
  styles?: SwitchStylesProp;
}


const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      className,
      styles: stylesProp,
      size = "lg",
      isDisabled = false,
      isSelected: controlledSelected,
      onChange,
      defaultSelected,
      pill,
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

    const isPill = pill === true;
    const shapeClass = isPill ? shapeMap.pill : shapeMap.round;
    const position = thumbPositions[size];
    const thumbLeft = isSelected ? position.checked : position.unchecked;

    React.useImperativeHandle(ref, () => inputRef.current!);

    const resolved = resolveSwitchBaseStyles(stylesProp);

    return (
      <div
        className={cn(
          'switch',
          styles.switch,
          sizeMap[size],
          shapeClass,
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
            shapeClass,
            resolved.track
          )}
        />
        <div
          className={cn(
            'switch-thumb',
            styles["switch-thumb"],
            sizeMap[size],
            shapeClass,
            resolved.thumb
          )}
          style={{
            left: `${thumbLeft}rem`,
          }}
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
