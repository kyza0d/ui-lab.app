"use client";

import React, { useState, useEffect, useCallback, useRef, useReducer } from "react";
import { cn, type StyleValue } from "@/lib/utils";
import { type StylesProp, createStylesResolver } from "@/lib/styles";
import styles from "./Color.module.css";
import {
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

type ColorCanvasGradientStyles = {
  hue?: StyleValue;
  saturation?: StyleValue;
  brightness?: StyleValue;
};

type ColorSliderStyles = {
  hue?: StyleValue;
  opacity?: StyleValue;
};

export interface ColorStyleSlots {
  root?: StyleValue;
  controls?: StyleValue;
  canvas?: StyleValue;
  canvasInner?: StyleValue;
  canvasGradient?: StyleValue | ColorCanvasGradientStyles;
  canvasPointer?: StyleValue;
  slider?: StyleValue | ColorSliderStyles;
  sliderTrack?: StyleValue | ColorSliderStyles;
  sliderThumb?: StyleValue | ColorSliderStyles;
  recentColors?: StyleValue;
  recentColorSwatch?: StyleValue;
  inputGroup?: StyleValue;
  input?: StyleValue;
  format?: StyleValue;
  previewSwatch?: StyleValue;
}

export type ColorStylesProp = StylesProp<ColorStyleSlots>;

const resolveColorBaseStyles = createStylesResolver([
  "root",
  "controls",
  "canvas",
  "canvasInner",
  "canvasGradientHue",
  "canvasGradientSaturation",
  "canvasGradientBrightness",
  "canvasPointer",
  "sliderHue",
  "sliderOpacity",
  "sliderTrackHue",
  "sliderTrackOpacity",
  "sliderThumbHue",
  "sliderThumbOpacity",
  "recentColors",
  "recentColorSwatch",
  "inputGroup",
  "input",
  "format",
  "previewSwatch",
] as const);

function resolveColorStyles(styles: ColorStylesProp | undefined) {
  if (!styles || typeof styles === "string" || Array.isArray(styles)) return resolveColorBaseStyles(styles);
  const {
    root,
    controls,
    canvas,
    canvasInner,
    canvasGradient,
    canvasPointer,
    slider,
    sliderTrack,
    sliderThumb,
    recentColors,
    recentColorSwatch,
    inputGroup,
    input,
    format,
    previewSwatch,
  } = styles;

  let canvasGradientHue: StyleValue | undefined;
  let canvasGradientSaturation: StyleValue | undefined;
  let canvasGradientBrightness: StyleValue | undefined;
  let sliderHue: StyleValue | undefined;
  let sliderOpacity: StyleValue | undefined;
  let sliderTrackHue: StyleValue | undefined;
  let sliderTrackOpacity: StyleValue | undefined;
  let sliderThumbHue: StyleValue | undefined;
  let sliderThumbOpacity: StyleValue | undefined;

  if (canvasGradient) {
    if (typeof canvasGradient === "string" || Array.isArray(canvasGradient)) {
      canvasGradientHue = canvasGradient;
      canvasGradientSaturation = canvasGradient;
      canvasGradientBrightness = canvasGradient;
    } else {
      canvasGradientHue = canvasGradient.hue;
      canvasGradientSaturation = canvasGradient.saturation;
      canvasGradientBrightness = canvasGradient.brightness;
    }
  }

  if (slider) {
    if (typeof slider === "string" || Array.isArray(slider)) {
      sliderHue = slider;
      sliderOpacity = slider;
    } else {
      sliderHue = slider.hue;
      sliderOpacity = slider.opacity;
    }
  }

  if (sliderTrack) {
    if (typeof sliderTrack === "string" || Array.isArray(sliderTrack)) {
      sliderTrackHue = sliderTrack;
      sliderTrackOpacity = sliderTrack;
    } else {
      sliderTrackHue = sliderTrack.hue;
      sliderTrackOpacity = sliderTrack.opacity;
    }
  }

  if (sliderThumb) {
    if (typeof sliderThumb === "string" || Array.isArray(sliderThumb)) {
      sliderThumbHue = sliderThumb;
      sliderThumbOpacity = sliderThumb;
    } else {
      sliderThumbHue = sliderThumb.hue;
      sliderThumbOpacity = sliderThumb.opacity;
    }
  }

  return resolveColorBaseStyles({
    root,
    controls,
    canvas,
    canvasInner,
    canvasGradientHue,
    canvasGradientSaturation,
    canvasGradientBrightness,
    canvasPointer,
    sliderHue,
    sliderOpacity,
    sliderTrackHue,
    sliderTrackOpacity,
    sliderThumbHue,
    sliderThumbOpacity,
    recentColors,
    recentColorSwatch,
    inputGroup,
    input,
    format,
    previewSwatch,
  });
}

type CanvasState = { s: number; v: number; h: number; hg: number };
type CanvasAction =
  | { type: 'SET_FROM_COLOR'; h: number; s: number; v: number }
  | { type: 'SET_CANVAS'; s: number; v: number }
  | { type: 'SET_HUE'; h: number; updateHg: boolean };

function canvasReducer(state: CanvasState, action: CanvasAction): CanvasState {
  switch (action.type) {
    case 'SET_FROM_COLOR':
      if (action.s > 0) return { s: action.s, v: action.v, h: action.h, hg: action.h };
      return { ...state, s: action.s, v: action.v };
    case 'SET_CANVAS':
      return { ...state, s: action.s, v: action.v };
    case 'SET_HUE':
      return { ...state, h: action.h, hg: action.updateHg ? action.h : state.hg };
    default:
      return state;
  }
}

export interface ColorProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
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
  styles?: ColorStylesProp;
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
      styles: stylesProp,
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
    const [canvasState, dispatchCanvas] = useReducer(canvasReducer, {
      s: initialState.s, v: initialState.v, h: initialState.h, hg: initialState.h,
    });
    const { s: canvasSaturation, v: canvasBrightness, h: hue, hg: hueWhenGrayscale } = canvasState;

    // Track the last emitted color to distinguish external updates from internal ones
    const lastEmittedColor = useRef(currentValue);

    const parsed = parseColor(currentValue);
    const opacity = parsed.a ?? 1;

    // Sync with external updates
    useEffect(() => {
      if (currentValue !== lastEmittedColor.current) {
        const parsed = parseColor(currentValue);
        const { h, s, v } = rgbToHsv(parsed.r, parsed.g, parsed.b);

        dispatchCanvas({ type: 'SET_FROM_COLOR', h, s, v });

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
        dispatchCanvas({ type: 'SET_CANVAS', s: saturation, v: brightness });

        const { r, g, b } = hsvToRgb(hue, saturation, brightness);
        const newColor = format === "hex"
          ? formatColorHex(r, g, b, opacity < 1 ? opacity : undefined)
          : formatColorRgb(r, g, b, opacity < 1 ? opacity : undefined);

        lastEmittedColor.current = newColor;
        handleColorChange(newColor);
      },
      [hue, opacity, format, handleColorChange]
    );

    const handleHueChange = useCallback(
      (newHue: number) => {
        setIsDragging(true);
        dispatchCanvas({ type: 'SET_HUE', h: newHue, updateHg: canvasSaturation > 0 });

        const { r, g, b } = hsvToRgb(newHue, canvasSaturation, canvasBrightness);
        const newColor = format === "hex"
          ? formatColorHex(r, g, b, opacity < 1 ? opacity : undefined)
          : formatColorRgb(r, g, b, opacity < 1 ? opacity : undefined);

        lastEmittedColor.current = newColor;
        handleColorChange(newColor);
      },
      [canvasSaturation, canvasBrightness, opacity, format, handleColorChange]
    );

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

    const handleRecentColorSelect = useCallback(
      (color: string) => {
        // Update internal state immediately
        const parsed = parseColor(color);
        const { h, s, v } = rgbToHsv(parsed.r, parsed.g, parsed.b);
        dispatchCanvas({ type: 'SET_FROM_COLOR', h, s, v });

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
          dispatchCanvas({ type: 'SET_FROM_COLOR', h, s, v });

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

    const resolved = resolveColorStyles(stylesProp);

    return (
      <div
        ref={ref}
        className={cn("color", styles.color, resolved.root, className)}
        data-size={size}
        data-disabled={disabled || undefined}
        {...props}
      >
        {/* Recent Colors */}
        <ColorRecentColors
          onSelect={handleRecentColorSelect}
          disabled={disabled}
          size={size}
          className={resolved.recentColors}
          swatchClassName={resolved.recentColorSwatch}
        />

        {/* Canvas for saturation/brightness (HSV) */}
        <ColorCanvas
          hue={hue}
          saturation={canvasSaturation}
          brightness={canvasBrightness}
          onChange={handleCanvasChange}
          disabled={disabled}
          size={size}
          className={resolved.canvas}
          innerClassName={resolved.canvasInner}
          gradientHueClassName={resolved.canvasGradientHue}
          gradientSaturationClassName={resolved.canvasGradientSaturation}
          gradientBrightnessClassName={resolved.canvasGradientBrightness}
          pointerClassName={resolved.canvasPointer}
        />

        <div className={cn("color", "controls", styles["controls"], resolved.controls)}>
          {/* Hue Slider */}
          <ColorHueSlider
            value={hue}
            onChange={handleHueChange}
            disabled={disabled}
            size={size}
            className={resolved.sliderHue}
            trackClassName={resolved.sliderTrackHue}
            thumbClassName={resolved.sliderThumbHue}
          />

          {/* Opacity Slider */}
          {showOpacity && (
            <ColorOpacitySlider
              value={opacity}
              color={formatColorRgb(parsed.r, parsed.g, parsed.b)}
              onChange={handleOpacityChange}
              disabled={disabled}
              size={size}
              className={resolved.sliderOpacity}
              trackClassName={resolved.sliderTrackOpacity}
              thumbClassName={resolved.sliderThumbOpacity}
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
            groupClassName={resolved.inputGroup}
            inputClassName={resolved.input}
            formatClassName={resolved.format}
            previewClassName={resolved.previewSwatch}
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
