"use client";

import React, { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
import styles from "./ColorPicker.module.css";
import {
  rgbToHsl,
  hslToRgb,
  formatColorHex,
  formatColorRgb,
  parseColor,
  addRecentColor,
  isValidColor,
} from "./color-utils";
import { ColorPickerCanvas } from "./ColorPicker.Canvas";
import { ColorPickerHueSlider } from "./ColorPicker.HueSlider";
import { ColorPickerOpacitySlider } from "./ColorPicker.OpacitySlider";
import { ColorPickerRecentColors } from "./ColorPicker.RecentColors";
import { ColorPickerInput } from "./ColorPicker.Input";

export interface ColorPickerProps
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

export const ColorPicker = React.forwardRef<HTMLDivElement, ColorPickerProps>(
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
    // Determine if component is controlled or uncontrolled
    const isControlled = controlledValue !== undefined;
    const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
    const currentValue = isControlled ? controlledValue : uncontrolledValue;

    const [format, setFormat] = useState<"hex" | "rgb">(controlledFormat);
    const [isDragging, setIsDragging] = useState(false);

    // Parse current color value
    const parsed = parseColor(currentValue);
    const { h, s, l, a } = rgbToHsl(parsed.r, parsed.g, parsed.b);
    const opacity = a ?? 1;

    // Format display value
    const displayValue =
      format === "hex"
        ? formatColorHex(parsed.r, parsed.g, parsed.b, opacity < 1 ? opacity : undefined)
        : formatColorRgb(parsed.r, parsed.g, parsed.b, opacity < 1 ? opacity : undefined);

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
      (saturation: number, lightness: number) => {
        setIsDragging(true);
        const { r, g, b } = hslToRgb(h, saturation, lightness);
        const newColor = formatColorHex(r, g, b, opacity < 1 ? opacity : undefined);
        handleColorChange(newColor);
      },
      [h, opacity, handleColorChange]
    );

    const handleCanvasChangeComplete = useCallback(() => {
      setIsDragging(false);
      const { r, g, b } = hslToRgb(h, s, l);
      const newColor = formatColorHex(r, g, b, opacity < 1 ? opacity : undefined);
      handleChangeComplete(newColor);
    }, [h, s, l, opacity, handleChangeComplete]);

    const handleHueChange = useCallback(
      (newHue: number) => {
        setIsDragging(true);
        const { r, g, b } = hslToRgb(newHue, s, l);
        const newColor = formatColorHex(r, g, b, opacity < 1 ? opacity : undefined);
        handleColorChange(newColor);
      },
      [s, l, opacity, handleColorChange]
    );

    const handleHueChangeComplete = useCallback(() => {
      setIsDragging(false);
      const { r, g, b } = hslToRgb(h, s, l);
      const newColor = formatColorHex(r, g, b, opacity < 1 ? opacity : undefined);
      handleChangeComplete(newColor);
    }, [h, s, l, opacity, handleChangeComplete]);

    const handleOpacityChange = useCallback(
      (newOpacity: number) => {
        setIsDragging(true);
        const newColor = formatColorHex(
          parsed.r,
          parsed.g,
          parsed.b,
          newOpacity < 1 ? newOpacity : undefined
        );
        handleColorChange(newColor);
      },
      [parsed.r, parsed.g, parsed.b, handleColorChange]
    );

    const handleOpacityChangeComplete = useCallback(() => {
      setIsDragging(false);
      const newColor = formatColorHex(
        parsed.r,
        parsed.g,
        parsed.b,
        opacity < 1 ? opacity : undefined
      );
      handleChangeComplete(newColor);
    }, [parsed.r, parsed.g, parsed.b, opacity, handleChangeComplete]);

    const handleRecentColorSelect = useCallback(
      (color: string) => {
        handleColorChange(color);
        handleChangeComplete(color);
      },
      [handleColorChange, handleChangeComplete]
    );

    const handleInputChange = useCallback(
      (newValue: string) => {
        if (isValidColor(newValue)) {
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
        className={cn(styles.colorPicker, className)}
        data-size={size}
        data-disabled={disabled || undefined}
        {...props}
      >
        {/* Recent Colors */}
        <ColorPickerRecentColors
          onSelect={handleRecentColorSelect}
          disabled={disabled}
          size={size}
        />

        {/* Canvas for saturation/lightness */}
        <ColorPickerCanvas
          hue={h}
          saturation={s}
          lightness={l}
          onChange={handleCanvasChange}
          disabled={disabled}
          size={size}
        />

        {/* Hue Slider */}
        <ColorPickerHueSlider
          value={h}
          onChange={handleHueChange}
          disabled={disabled}
          size={size}
        />

        {/* Opacity Slider */}
        {showOpacity && (
          <ColorPickerOpacitySlider
            value={opacity}
            color={formatColorRgb(parsed.r, parsed.g, parsed.b)}
            onChange={handleOpacityChange}
            disabled={disabled}
            size={size}
          />
        )}

        {/* Input & Format Selector */}
        <ColorPickerInput
          value={displayValue}
          format={format}
          onValueChange={handleInputChange}
          onFormatChange={handleFormatChange}
          disabled={disabled}
          size={size}
          showPreview={showPreview}
          previewColor={formatColorRgb(
            parsed.r,
            parsed.g,
            parsed.b,
            opacity < 1 ? opacity : undefined
          )}
        />
      </div>
    );
  }
);

ColorPicker.displayName = "ColorPicker";
