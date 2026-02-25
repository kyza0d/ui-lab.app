"use client";

import React, { useRef, useState } from "react";
import { useFocusRing } from "react-aria";
import styles from "./Color.module.css";

export interface ColorOpacitySliderProps {
  /** Current opacity value (0–1) */
  value: number;
  /** Base RGB color string used to render the transparency gradient on the slider track */
  color: string;
  /** Called when the user drags the opacity slider with the new opacity value (0–1) */
  onChange?: (opacity: number) => void;
  /** Disables pointer interaction on the slider */
  disabled?: boolean;
  /** Size of the opacity slider */
  size?: "sm" | "md" | "lg";
}

/** Slider for adjusting the alpha/opacity of the selected color */
export const ColorOpacitySlider = React.forwardRef<
  HTMLDivElement,
  ColorOpacitySliderProps
>(({ value, color, onChange, disabled, size = "md" }, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (disabled) return;
    setIsDragging(true);
    updateOpacity(e);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || disabled) return;
    updateOpacity(e);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const updateOpacity = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!trackRef.current) return;

    const rect = trackRef.current.getBoundingClientRect();
    const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const opacity = Math.round(percent * 100) / 100;

    onChange?.(opacity);
  };

  const { focusProps, isFocusVisible } = useFocusRing();

  const basePosition = value * 100;
  const thumbWidth = trackRef.current ? (10 / trackRef.current.offsetWidth) * 100 : 4;
  const thumbPosition = Math.max(thumbWidth / 2, Math.min(100 - thumbWidth / 2, basePosition));
  const gradientColor = color || "rgb(0, 0, 0)";

  return (
    <div
      ref={containerRef}
      className={styles.opacitySlider}
      data-size={size}
      data-disabled={disabled || undefined}
      data-focus-visible={isFocusVisible || undefined}
      {...focusProps}
      tabIndex={disabled ? -1 : 0}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      aria-label="Opacity"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(value * 100)}
    >
      <div
        className={styles.opacityTrack}
        ref={trackRef}
        style={{
          backgroundImage: `linear-gradient(to right, ${gradientColor}00, ${gradientColor}ff)`,
        }}
      >
        <div
          className={styles.opacityThumb}
          style={{ left: `${thumbPosition}%` }}
          role="presentation"
          data-focus-visible={isFocusVisible || undefined}
        />
      </div>
    </div>
  );
});

ColorOpacitySlider.displayName = "ColorOpacitySlider";
