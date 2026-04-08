"use client";

import React, { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useFocusRing } from "@react-aria/focus";
import { asElementProps } from "@/lib/react-aria";
import { hsvToRgb } from "./color-utils";
import styles from "./Color.module.css";

interface ColorCanvasProps {
  /** Current hue value (0–360) used to tint the canvas gradient */
  hue: number;
  /** Current saturation value (0–100) determining the horizontal position of the pointer */
  saturation: number;
  /** Current brightness value (0–100) determining the vertical position of the pointer */
  brightness: number;
  /** Called when the user drags the canvas pointer with updated saturation and brightness values */
  onChange?: (saturation: number, brightness: number) => void;
  /** Disables pointer interaction on the canvas */
  disabled?: boolean;
  /** Size of the canvas */
  size?: "sm" | "md" | "lg";
  /** Additional CSS class names */
  className?: string;
  innerClassName?: string;
  gradientHueClassName?: string;
  gradientSaturationClassName?: string;
  gradientBrightnessClassName?: string;
  pointerClassName?: string;
}

/** 2D saturation/lightness gradient canvas for picking color values */
export const ColorCanvas = React.forwardRef<
  HTMLDivElement,
  ColorCanvasProps
>(
  ({ hue, saturation, brightness, onChange, disabled, size = "md", className, innerClassName, gradientHueClassName, gradientSaturationClassName, gradientBrightnessClassName, pointerClassName }, ref) => {
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
      const b = Math.max(
        0,
        Math.min(100, ((rect.height - (e.clientY - rect.top)) / rect.height) * 100)
      );

      onChange?.(s, b);
    };

    const { focusProps, isFocused, isFocusVisible } = useFocusRing();

    const gradientStyle = {
      backgroundColor: `hsl(${hue}, 100%, 50%)`,
    };

    const { r, g, b } = hsvToRgb(hue, saturation, brightness);
    const positionStyle = {
      left: `${saturation}%`,
      top: `${100 - brightness}%`,
      backgroundColor: `rgb(${r}, ${g}, ${b})`,
    };

    return (
      <div
        ref={mergedRef}
        className={cn("color", "canvas", styles["canvas"], className)}
        data-size={size}
        data-disabled={disabled || undefined}
        data-focused={isFocused ? "true" : undefined}
        data-focus-visible={isFocusVisible || undefined}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        {...asElementProps<"div">(focusProps)}
        tabIndex={disabled ? -1 : 0}
        role="slider"
        aria-label="Color saturation and brightness"
        aria-valuetext={`Saturation: ${saturation.toFixed(0)}%, Brightness: ${brightness.toFixed(0)}%`}
      >
        <div className={cn("color", "canvas-inner", styles["canvas-inner"], innerClassName)}>
          <div className={cn("color", "canvas-gradient-hue", styles["canvas-gradient-hue"], gradientHueClassName)} style={gradientStyle} />
          <div className={cn("color", "canvas-gradient-saturation", styles["canvas-gradient-saturation"], gradientSaturationClassName)} />
          <div className={cn("color", "canvas-gradient-brightness", styles["canvas-gradient-brightness"], gradientBrightnessClassName)} />
        </div>
        <div className={cn("color", "canvas-pointer", styles["canvas-pointer"], pointerClassName)} style={positionStyle} />
      </div>
    );
  }
);

ColorCanvas.displayName = "ColorCanvas";
