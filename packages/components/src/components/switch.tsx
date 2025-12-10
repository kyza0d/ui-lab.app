"use client";

import React, { useState } from "react";
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

export interface SwitchProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  size?: "sm" | "md" | "lg";
  pill?: boolean;
  disabled?: boolean;
}

const Switch = React.forwardRef<HTMLInputElement, SwitchProps>(
  (
    {
      className,
      size = "md",
      disabled = false,
      checked: controlledChecked,
      onCheckedChange,
      onChange,
      defaultChecked,
      pill,
      ...props
    },
    ref
  ) => {
    const [internalChecked, setInternalChecked] = useState(controlledChecked ?? defaultChecked ?? false);
    const isControlled = controlledChecked !== undefined;
    const checked = isControlled ? controlledChecked : internalChecked;
    const isPill = pill === true;
    const shapeClass = isPill ? shapeMap.pill : shapeMap.round;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newChecked = e.target.checked;
      if (!isControlled) setInternalChecked(newChecked)
      onCheckedChange?.(newChecked);
      onChange?.(e);
    };

    const thumbPositions = {
      sm: { unchecked: 0.25, checked: 1.25 },
      md: { unchecked: 0.25, checked: 1.5 },
      lg: { unchecked: 0.25, checked: 1.75 },
    };

    const position = thumbPositions[size];
    const thumbLeft = checked ? position.checked : position.unchecked;

    return (
      <div
        className={cn(
          "switch",
          `${size}`,
          sizeMap[size],
          shapeClass,
          styles.switch,
          className
        )}
        data-checked={checked}
      >
        <div
          className={cn(
            "switch-track",
            shapeClass,
            styles["switch-track"]
          )}
        />
        <div
          className={cn(
            "switch-thumb",
            `${size}`,
            sizeMap[size],
            shapeClass,
            styles["switch-thumb"]
          )}
          style={{
            left: `${thumbLeft}rem`,
          }}
        />
        <input
          ref={ref}
          type="checkbox"
          checked={checked}
          disabled={disabled ?? false}
          onChange={handleChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          {...props}
        />
      </div>
    );
  }
);

Switch.displayName = "Switch";

export { Switch };
