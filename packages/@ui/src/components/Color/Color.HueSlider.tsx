"use client";

import React, { useRef, useState } from "react";
import { useFocusRing } from "@react-aria/focus";
import { asElementProps } from "@/lib/react-aria";
import { cn } from "@/lib/utils";
import styles from "./Color.module.css";

interface ColorHueSliderProps {
  /** Current hue value (0–360) */
  value: number;
  /** Called when the user drags the hue slider with the new hue value */
  onChange?: (hue: number) => void;
  /** Disables pointer interaction on the slider */
  disabled?: boolean;
  /** Size of the hue slider */
  size?: "sm" | "md" | "lg";
  className?: string;
  trackClassName?: string;
  thumbClassName?: string;
}

/** Horizontal slider for selecting the hue component (0–360°) */
export const ColorHueSlider = React.forwardRef<
  HTMLDivElement,
  ColorHueSliderProps
>(({ value, onChange, disabled, size = "md", className, trackClassName, thumbClassName }, ref) => {
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

  const { focusProps, isFocused, isFocusVisible } = useFocusRing();

  const thumbPosition = (value / 360) * 100;

  return (
    <div
      ref={containerRef}
      className={cn("color", "hue-slider", styles["hue-slider"], className)}
      data-size={size}
      data-disabled={disabled || undefined}
      data-focused={isFocused ? "true" : undefined}
      data-focus-visible={isFocusVisible || undefined}
      {...asElementProps<"div">(focusProps)}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
      aria-label="Hue"
      aria-valuemin={0}
      aria-valuemax={360}
      aria-valuenow={value}
    >
      <div className={cn("color", "hue-track", styles["hue-track"], trackClassName)} ref={trackRef}>
        <div
          className={cn("color", "hue-thumb", styles["hue-thumb"], thumbClassName)}
          style={{ left: `${thumbPosition}%` }}
          role="presentation"
          data-focused={isFocused ? "true" : undefined}
          data-focus-visible={isFocusVisible || undefined}
        />
      </div>
    </div>
  );
});

ColorHueSlider.displayName = "ColorHueSlider";
