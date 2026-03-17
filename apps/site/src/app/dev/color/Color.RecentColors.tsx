"use client";

import React, { useSyncExternalStore } from "react";
import { getRecentColors } from "./color-utils";
import styles from "./Color.module.css";

interface ColorRecentColorsProps {
  onSelect?: (color: string) => void;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
}

export const ColorRecentColors = React.forwardRef<
  HTMLDivElement,
  ColorRecentColorsProps
>(({ onSelect, disabled, size = "md" }, ref) => {
  const recentColors = useSyncExternalStore(
    () => () => {},
    getRecentColors,
    () => [],
  );

  if (recentColors.length === 0) {
    return null;
  }

  return (
    <div
      ref={ref}
      className={styles.recentColors}
      data-size={size}
      role="group"
      aria-label="Recent colors"
      suppressHydrationWarning
    >
      {recentColors.map((color) => (
        <button
          key={color}
          className={styles.recentColorSwatch}
          style={{ backgroundColor: color }}
          onClick={() => onSelect?.(color)}
          disabled={disabled}
          aria-label={`Recent color ${color}`}
          title={color}
        />
      ))}
    </div>
  );
});

ColorRecentColors.displayName = "ColorRecentColors";
