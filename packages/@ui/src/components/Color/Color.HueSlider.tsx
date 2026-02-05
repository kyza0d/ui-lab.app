"use client";

import React, { useRef, useState } from "react";
import { useFocusRing } from "react-aria";
import styles from "./Color.module.css";

export interface ColorHueSliderProps {
  value: number;
  onChange?: (hue: number) => void;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
}

export const ColorHueSlider = React.forwardRef<
  HTMLDivElement,
  ColorHueSliderProps
>(({ value, onChange, disabled, size = "md" }, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (disabled) return;
    setIsDragging(true);
    updateHue(e);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || disabled) return;
    updateHue(e);
  };

  const handlePointerUp = () => {
    setIsDragging(false);
  };

  const updateHue = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!trackRef.current) return;

    const rect = trackRef.current.getBoundingClientRect();
    const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const hue = Math.round(percent * 360);

    onChange?.(hue);
  };

  const { focusProps, isFocusVisible } = useFocusRing();

  const thumbPosition = (value / 360) * 100;

  return (
    <div
      ref={containerRef}
      className={styles.hueSlider}
      data-size={size}
      data-disabled={disabled || undefined}
      data-focus-visible={isFocusVisible || undefined}
      {...focusProps}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      aria-label="Hue"
      aria-valuemin={0}
      aria-valuemax={360}
      aria-valuenow={value}
    >
      <div className={styles.hueTrack} ref={trackRef}>
        <div
          className={styles.hueThumb}
          style={{ left: `${thumbPosition}%` }}
          role="presentation"
          data-focus-visible={isFocusVisible || undefined}
        />
      </div>
    </div>
  );
});

ColorHueSlider.displayName = "ColorHueSlider";
