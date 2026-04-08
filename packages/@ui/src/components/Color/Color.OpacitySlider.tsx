"use client";

import React, { useRef, useState } from "react";
import { useFocusRing } from "@react-aria/focus";
import { asElementProps } from "@/lib/react-aria";
import { cn } from "@/lib/utils";
import styles from "./Color.module.css";

interface ColorOpacitySliderProps {
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
  className?: string;
  trackClassName?: string;
  thumbClassName?: string;
}

/** Slider for adjusting the alpha/opacity of the selected color */
export const ColorOpacitySlider = React.forwardRef<
  HTMLDivElement,
  ColorOpacitySliderProps
>(({ value, color, onChange, disabled, size = "md", className, trackClassName, thumbClassName }, ref) => {
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

  const { focusProps, isFocused, isFocusVisible } = useFocusRing();

  const basePosition = value * 100;
  const thumbWidth = trackRef.current ? (10 / trackRef.current.offsetWidth) * 100 : 4;
  const thumbPosition = Math.max(thumbWidth / 2, Math.min(100 - thumbWidth / 2, basePosition));
  const gradientColor = color || "rgb(0, 0, 0)";

  return (
    <div
      ref={containerRef}
      className={cn("color", "opacity-slider", styles["opacity-slider"], className)}
      data-size={size}
      data-disabled={disabled || undefined}
      data-focused={isFocused ? "true" : undefined}
      data-focus-visible={isFocusVisible || undefined}
      {...asElementProps<"div">(focusProps)}
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
        className={cn("color", "opacity-track", styles["opacity-track"], trackClassName)}
        ref={trackRef}
        style={{
          backgroundImage: `linear-gradient(to right, ${gradientColor}00, ${gradientColor}ff), repeating-linear-gradient(45deg, var(--checkerboard-dark), var(--checkerboard-dark) 10px, var(--checkerboard-light) 10px, var(--checkerboard-light) 20px)`,
        }}
      >
        <div
          className={cn("color", "opacity-thumb", styles["opacity-thumb"], thumbClassName)}
          style={{ left: `${thumbPosition}%` }}
          role="presentation"
          data-focused={isFocused ? "true" : undefined}
          data-focus-visible={isFocusVisible || undefined}
        />
      </div>
    </div>
  );
});

ColorOpacitySlider.displayName = "ColorOpacitySlider";
