"use client";

import React from "react";
import { useSwitch, useFocusRing, useHover, mergeProps } from "react-aria";
import { useToggleState } from "react-stately";
import { cn } from "@/lib/utils";

import styles from "./switch.module.css";

const sizeMap = {
  sm: styles["sm"],
  md: styles["md"],
  lg: styles["lg"],
};

const shapeMap = {
  pill: styles["pill"],
  round: styles["round"],
};

const thumbPositions = {
  sm: { unchecked: 0.25, checked: 1.25 },
  md: { unchecked: 0.25, checked: 1.5 },
  lg: { unchecked: 0.25, checked: 1.75 },
};

export interface SwitchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size" | "onChange" | "checked" | "defaultChecked"> {
  isSelected?: boolean;
  onChange?: (isSelected: boolean) => void;
  defaultSelected?: boolean;
  size?: "sm" | "md" | "lg";
  pill?: boolean;
  isDisabled?: boolean;
}

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      className,
      size = "md",
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
    const { inputProps, isSelected } = useSwitch(
      { isDisabled },
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

    return (
      <div
        className={cn(
          'switch',
          styles.switch,
          sizeMap[size],
          shapeClass,
          className
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
            shapeClass
          )}
        />
        <div
          className={cn(
            'switch-thumb',
            styles["switch-thumb"],
            sizeMap[size],
            shapeClass
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
          {...props}
        />
      </div>
    );
  }
);

Switch.displayName = "Switch";

export { Switch };
