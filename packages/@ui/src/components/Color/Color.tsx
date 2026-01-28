"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { cn } from "@/lib/utils";
import styles from "./Color.module.css";
import {
  rgbToHsl,
  hslToRgb,
  rgbToHsv,
  hsvToRgb,
  formatColorHex,
  formatColorRgb,
  parseColor,
  addRecentColor,
  isValidColor,
} from "./color-utils";
import { ColorCanvas } from "./Color.Canvas";
import { ColorHueSlider } from "./Color.HueSlider";
import { ColorOpacitySlider } from "./Color.OpacitySlider";
import { ColorRecentColors } from "./Color.RecentColors";
import { ColorInput } from "./Color.Input";

export interface ColorProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value?: string;
  defaultValue?: string;
  onChange?: (color: string) => void;
  onChangeComplete?: (color: string) => void;
  showOpacity?: boolean;
  showPreview?: boolean;
  format?: "hex" | "rgb";
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const Color = React.forwardRef<HTMLDivElement, ColorProps>(
  (
    {
      value: controlledValue,
      defaultValue = "#000000",
      onChange,
      onChangeComplete,
      showOpacity = false,
      showPreview = false,
      format: controlledFormat = "hex",
      disabled = false,
      size = "md",
      className,
      ...props
    },
    ref
  ) => {
    const isControlled = controlledValue !== undefined;
    const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
    const currentValue = isControlled ? controlledValue : uncontrolledValue;

    const [format, setFormat] = useState<"hex" | "rgb">(controlledFormat);
    const [isDragging, setIsDragging] = useState(false);

    // Initialize state using HSV for better canvas mapping
    const initializeState = () => {
      const parsed = parseColor(currentValue);
      const { h, s, v } = rgbToHsv(parsed.r, parsed.g, parsed.b);
      return { h, s, v };
    };

    const [initialState] = useState(initializeState);

    // Source of truth for canvas position (HSV Saturation & Value) and hue
    const [canvasSaturation, setCanvasSaturation] = useState(initialState.s);
    const [canvasBrightness, setCanvasBrightness] = useState(initialState.v);
    const [hue, setHue] = useState(initialState.h);
    const [hueWhenGrayscale, setHueWhenGrayscale] = useState(initialState.h);

    // Track the last emitted color to distinguish external updates from internal ones
    const lastEmittedColor = useRef(currentValue);

    const parsed = parseColor(currentValue);
    const opacity = parsed.a ?? 1;

    // Sync with external updates
    useEffect(() => {
      if (currentValue !== lastEmittedColor.current) {
        const parsed = parseColor(currentValue);
        const { h, s, v } = rgbToHsv(parsed.r, parsed.g, parsed.b);

        setCanvasSaturation(s);
        setCanvasBrightness(v);

        // Preserve hue when desaturated
        if (s > 0) {
          setHue(h);
          setHueWhenGrayscale(h);
        }

        lastEmittedColor.current = currentValue;
      }
    }, [currentValue]);

    // Compute display color from current state (HSV -> RGB)
    const { r: displayR, g: displayG, b: displayB } = hsvToRgb(hue, canvasSaturation, canvasBrightness);

    const displayValue =
      format === "hex"
        ? formatColorHex(displayR, displayG, displayB, opacity < 1 ? opacity : undefined)
        : formatColorRgb(displayR, displayG, displayB, opacity < 1 ? opacity : undefined);

    const handleColorChange = useCallback(
      (newColor: string) => {
        if (!isControlled) {
          setUncontrolledValue(newColor);
        }
        onChange?.(newColor);
      },
      [isControlled, onChange]
    );

    const handleChangeComplete = useCallback(
      (newColor: string) => {
        addRecentColor(newColor);
        onChangeComplete?.(newColor);
      },
      [onChangeComplete]
    );

    const handleCanvasChange = useCallback(
      (saturation: number, brightness: number) => {
        setIsDragging(true);
        setCanvasSaturation(saturation);
        setCanvasBrightness(brightness);

        const { r, g, b } = hsvToRgb(hue, saturation, brightness);
        const newColor = format === "hex"
          ? formatColorHex(r, g, b, opacity < 1 ? opacity : undefined)
          : formatColorRgb(r, g, b, opacity < 1 ? opacity : undefined);

        lastEmittedColor.current = newColor;
        handleColorChange(newColor);
      },
      [hue, opacity, format, handleColorChange]
    );

    const handleCanvasChangeComplete = useCallback(() => {
      setIsDragging(false);
      const { r, g, b } = hsvToRgb(hue, canvasSaturation, canvasBrightness);
      const newColor = format === "hex"
        ? formatColorHex(r, g, b, opacity < 1 ? opacity : undefined)
        : formatColorRgb(r, g, b, opacity < 1 ? opacity : undefined);

      handleChangeComplete(newColor);
    }, [hue, canvasSaturation, canvasBrightness, opacity, format, handleChangeComplete]);

    const handleHueChange = useCallback(
      (newHue: number) => {
        setIsDragging(true);
        setHue(newHue);
        if (canvasSaturation > 0) {
          setHueWhenGrayscale(newHue);
        }

        const { r, g, b } = hsvToRgb(newHue, canvasSaturation, canvasBrightness);
        const newColor = format === "hex"
          ? formatColorHex(r, g, b, opacity < 1 ? opacity : undefined)
          : formatColorRgb(r, g, b, opacity < 1 ? opacity : undefined);

        lastEmittedColor.current = newColor;
        handleColorChange(newColor);
      },
      [canvasSaturation, canvasBrightness, opacity, format, handleColorChange]
    );

    const handleHueChangeComplete = useCallback(() => {
      setIsDragging(false);
      const { r, g, b } = hsvToRgb(hue, canvasSaturation, canvasBrightness);
      const newColor = format === "hex"
        ? formatColorHex(r, g, b, opacity < 1 ? opacity : undefined)
        : formatColorRgb(r, g, b, opacity < 1 ? opacity : undefined);

      handleChangeComplete(newColor);
    }, [hue, canvasSaturation, canvasBrightness, opacity, format, handleChangeComplete]);

    const handleOpacityChange = useCallback(
      (newOpacity: number) => {
        setIsDragging(true);
        const { r, g, b } = hsvToRgb(hue, canvasSaturation, canvasBrightness);
        const newColor = format === "hex"
          ? formatColorHex(r, g, b, newOpacity < 1 ? newOpacity : undefined)
          : formatColorRgb(r, g, b, newOpacity < 1 ? newOpacity : undefined);

        lastEmittedColor.current = newColor;
        handleColorChange(newColor);
      },
      [hue, canvasSaturation, canvasBrightness, format, handleColorChange]
    );

    const handleOpacityChangeComplete = useCallback(() => {
      setIsDragging(false);
      const { r, g, b } = hsvToRgb(hue, canvasSaturation, canvasBrightness);
      const newColor = format === "hex"
        ? formatColorHex(r, g, b, opacity < 1 ? opacity : undefined)
        : formatColorRgb(r, g, b, opacity < 1 ? opacity : undefined);

      handleChangeComplete(newColor);
    }, [hue, canvasSaturation, canvasBrightness, opacity, format, handleChangeComplete]);

    const handleRecentColorSelect = useCallback(
      (color: string) => {
        // Update internal state immediately
        const parsed = parseColor(color);
        const { h, s, v } = rgbToHsv(parsed.r, parsed.g, parsed.b);
        setCanvasSaturation(s);
        setCanvasBrightness(v);
        if (s > 0) {
          setHue(h);
          setHueWhenGrayscale(h);
        }

        lastEmittedColor.current = color;
        handleColorChange(color);
        handleChangeComplete(color);
      },
      [handleColorChange, handleChangeComplete]
    );

    const handleInputChange = useCallback(
      (newValue: string) => {
        if (isValidColor(newValue)) {
          // Update internal state immediately
          const parsed = parseColor(newValue);
          const { h, s, v } = rgbToHsv(parsed.r, parsed.g, parsed.b);
          setCanvasSaturation(s);
          setCanvasBrightness(v);
          if (s > 0) {
            setHue(h);
            setHueWhenGrayscale(h);
          }

          lastEmittedColor.current = newValue;
          handleColorChange(newValue);
          handleChangeComplete(newValue);
        }
      },
      [handleColorChange, handleChangeComplete]
    );

    const handleFormatChange = useCallback(
      (newFormat: "hex" | "rgb") => {
        setFormat(newFormat);
      },
      []
    );

    return (
      <div
        ref={ref}
        className={cn(styles.color, className)}
        data-size={size}
        data-disabled={disabled || undefined}
        {...props}
      >
        {/* Recent Colors */}
        <ColorRecentColors
          onSelect={handleRecentColorSelect}
          disabled={disabled}
          size={size}
        />

        {/* Canvas for saturation/brightness (HSV) */}
        <ColorCanvas
          hue={hue}
          saturation={canvasSaturation}
          brightness={canvasBrightness}
          onChange={handleCanvasChange}
          disabled={disabled}
          size={size}
        />

        <div className={styles.colorControls}>
          {/* Hue Slider */}
          <ColorHueSlider
            value={hue}
            onChange={handleHueChange}
            disabled={disabled}
            size={size}
          />

          {/* Opacity Slider */}
          {showOpacity && (
            <ColorOpacitySlider
              value={opacity}
              color={formatColorRgb(parsed.r, parsed.g, parsed.b)}
              onChange={handleOpacityChange}
              disabled={disabled}
              size={size}
            />
          )}

          {/* Input & Format Selector */}
          <ColorInput
            value={displayValue}
            format={format}
            onValueChange={handleInputChange}
            onFormatChange={handleFormatChange}
            disabled={disabled}
            size={size}
            showPreview={showPreview}
            previewColor={formatColorRgb(
              displayR,
              displayG,
              displayB,
              opacity < 1 ? opacity : undefined
            )}
          />
        </div>
      </div>
    );
  }
);

Color.displayName = "Color";
