"use client";

import React, { useRef, useState } from "react";
import { useFocusRing } from "react-aria";
import styles from "./ColorPicker.module.css";

export interface ColorPickerCanvasProps {
  hue: number;
  saturation: number;
  lightness: number;
  onChange?: (saturation: number, lightness: number) => void;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
}

export const ColorPickerCanvas = React.forwardRef<
  HTMLDivElement,
  ColorPickerCanvasProps
>(
  ({ hue, saturation, lightness, onChange, disabled, size = "md" }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);

    const mergedRef = React.useCallback(
      (el: HTMLDivElement | null) => {
        if (typeof ref === "function") ref(el);
        else if (ref) ref.current = el;
        if (el) containerRef.current = el;
      },
      [ref]
    );

    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
      if (disabled) return;
      setIsDragging(true);
      updateColor(e);
    };

    const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
      if (!isDragging || disabled) return;
      updateColor(e);
    };

    const handlePointerUp = () => {
      setIsDragging(false);
    };

    const updateColor = (e: React.PointerEvent<HTMLDivElement>) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const s = Math.max(
        0,
        Math.min(100, ((e.clientX - rect.left) / rect.width) * 100)
      );
      const l = Math.max(
        0,
        Math.min(100, ((rect.height - (e.clientY - rect.top)) / rect.height) * 100)
      );

      onChange?.(s, l);
    };

    const { focusProps, isFocusVisible } = useFocusRing();

    const gradientStyle = {
      backgroundColor: `hsl(${hue}, 100%, 50%)`,
    };

    const positionStyle = {
      left: `${saturation}%`,
      top: `${100 - lightness}%`,
    };

    return (
      <div
        ref={mergedRef}
        className={styles.canvas}
        data-size={size}
        data-disabled={disabled || undefined}
        data-focus-visible={isFocusVisible || undefined}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        {...focusProps}
        tabIndex={disabled ? -1 : 0}
        role="slider"
        aria-label="Color saturation and lightness"
        aria-valuetext={`Saturation: ${saturation.toFixed(0)}%, Lightness: ${lightness.toFixed(0)}%`}
      >
        <div className={styles.canvasGradientHue} style={gradientStyle} />
        <div className={styles.canvasGradientSaturation} />
        <div className={styles.canvasGradientLightness} />
        <div className={styles.canvasPointer} style={positionStyle} />
      </div>
    );
  }
);

ColorPickerCanvas.displayName = "ColorPickerCanvas";
