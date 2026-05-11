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
import { ColorRecentColors } from "./Color.RecentColors";
import { ColorInput } from "./Color.Input";
import { Popover, type PopoverProps } from "../Popover";
import { Slider } from "../Slider";

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
  provider?: StyleValue;
  root?: StyleValue;
  trigger?: StyleValue;
  triggerSwatch?: StyleValue;
  triggerValue?: StyleValue;
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
  "provider",
  "root",
  "trigger",
  "triggerSwatch",
  "triggerValue",
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
    provider,
    root,
    trigger,
    triggerSwatch,
    triggerValue,
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
    provider,
    root,
    trigger,
    triggerSwatch,
    triggerValue,
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

type ResolvedColorStyles = ReturnType<typeof resolveColorStyles>;

interface ColorContextValue {
  value: string;
  displayValue: string;
  baseColor: string;
  previewColor: string;
  format: "hex" | "rgb";
  size: "sm" | "md" | "lg";
  disabled: boolean;
  showOpacity: boolean;
  showPreview: boolean;
  hue: number;
  canvasSaturation: number;
  canvasBrightness: number;
  opacity: number;
  resolved: ResolvedColorStyles;
  handleRecentColorSelect: (color: string) => void;
  handleCanvasChange: (saturation: number, brightness: number) => void;
  handleHueChange: (hue: number) => void;
  handleOpacityChange: (opacity: number) => void;
  handleInputChange: (value: string) => void;
  handleFormatChange: (format: "hex" | "rgb") => void;
}

const ColorContext = React.createContext<ColorContextValue | null>(null);

function useColorContext() {
  const context = React.useContext(ColorContext);
  if (!context) {
    throw new Error("Color compound components must be used within Color");
  }

  return context;
}

function useOptionalColorContext() {
  return React.useContext(ColorContext);
}

const ColorRoot = React.forwardRef<HTMLDivElement, ColorProps>(
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
      children,
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
    const baseColor = formatColorRgb(displayR, displayG, displayB);
    const previewColor = formatColorRgb(
      displayR,
      displayG,
      displayB,
      opacity < 1 ? opacity : undefined
    );
    const contextValue = React.useMemo<ColorContextValue>(
      () => ({
        value: currentValue,
        displayValue,
        baseColor,
        previewColor,
        format,
        size,
        disabled,
        showOpacity,
        showPreview,
        hue,
        canvasSaturation,
        canvasBrightness,
        opacity,
        resolved,
        handleRecentColorSelect,
        handleCanvasChange,
        handleHueChange,
        handleOpacityChange,
        handleInputChange,
        handleFormatChange,
      }),
      [
        currentValue,
        displayValue,
        baseColor,
        previewColor,
        format,
        size,
        disabled,
        showOpacity,
        showPreview,
        hue,
        canvasSaturation,
        canvasBrightness,
        opacity,
        resolved,
        handleRecentColorSelect,
        handleCanvasChange,
        handleHueChange,
        handleOpacityChange,
        handleInputChange,
        handleFormatChange,
      ]
    );

    if (children === undefined) {
      return (
        <ColorContext.Provider value={contextValue}>
          <ColorArea ref={ref} className={className} {...props} />
        </ColorContext.Provider>
      );
    }

    return (
      <ColorContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={cn("color-provider", styles["color-provider"], resolved.provider, className)}
          data-size={size}
          data-disabled={disabled || undefined}
          {...props}
        >
          {children}
        </div>
      </ColorContext.Provider>
    );
  }
);

ColorRoot.displayName = "Color";

export interface ColorAreaProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Visual treatment for the picker area. Popover mode removes the standalone shell. */
  variant?: "standalone" | "popover";
}

export interface ColorSliderProps
  extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    "defaultValue" | "value" | "onChange"
  > {
  /** Which color channel this slider controls. */
  type?: "hue" | "opacity";
  /** Current slider value. Hue uses 0-360, opacity uses 0-1. */
  value?: number;
  /** Initial slider value for uncontrolled usage. */
  defaultValue?: number;
  /** Called when the slider value changes. */
  onChange?: (value: number) => void;
  /** Base color used to render the opacity gradient when type is opacity. */
  color?: string;
  /** Disables slider interaction. */
  disabled?: boolean;
  /** Size of the slider. */
  size?: "sm" | "md" | "lg";
  className?: string;
  trackClassName?: string;
  thumbClassName?: string;
}

const ColorSlider = React.forwardRef<HTMLDivElement, ColorSliderProps>(
  (
    {
      type = "hue",
      value,
      defaultValue,
      onChange,
      color,
      disabled,
      size,
      className,
      trackClassName,
      thumbClassName,
      "aria-label": ariaLabel,
      style,
      ...props
    },
    ref
  ) => {
    const context = useOptionalColorContext();
    const usesContextValue = value === undefined && context !== null;

    const resolvedValue =
      value ??
      (context
        ? type === "opacity"
          ? context.opacity
          : context.hue
        : undefined);

    const resolvedDefaultValue =
      defaultValue ?? (type === "opacity" ? 1 : 0);
    const resolvedDisabled = disabled ?? context?.disabled ?? false;
    const resolvedSize = size ?? context?.size ?? "md";
    const resolvedTrackColor = color ?? context?.baseColor ?? "rgb(0, 0, 0)";
    const resolvedClassName =
      className ??
      (type === "opacity" ? context?.resolved.sliderOpacity : context?.resolved.sliderHue);
    const resolvedTrackClassName =
      trackClassName ??
      (type === "opacity"
        ? context?.resolved.sliderTrackOpacity
        : context?.resolved.sliderTrackHue);
    const resolvedThumbClassName =
      thumbClassName ??
      (type === "opacity"
        ? context?.resolved.sliderThumbOpacity
        : context?.resolved.sliderThumbHue);
    const contextOnChange =
      type === "opacity" ? context?.handleOpacityChange : context?.handleHueChange;

    const handleValueChange = React.useCallback(
      ([nextValue]: number[]) => {
        onChange?.(nextValue);

        if (usesContextValue) {
          contextOnChange?.(nextValue);
        }
      },
      [contextOnChange, onChange, usesContextValue]
    );

    const sliderStyle = React.useMemo(
      () => ({
        ...(style as React.CSSProperties | undefined),
        ...(type === "opacity"
          ? {
              "--color-slider-opacity-color": resolvedTrackColor,
            }
          : undefined),
      }),
      [resolvedTrackColor, style, type]
    );

    return (
      <Slider
        ref={ref}
        min={type === "opacity" ? 0 : 0}
        max={type === "opacity" ? 1 : 360}
        step={type === "opacity" ? 0.01 : 1}
        aria-label={ariaLabel ?? (type === "opacity" ? "Opacity" : "Hue")}
        value={resolvedValue}
        defaultValue={resolvedValue === undefined ? resolvedDefaultValue : undefined}
        onValueChange={handleValueChange}
        disabled={resolvedDisabled}
        data-size={resolvedSize}
        style={sliderStyle}
        className={cn(
          type === "opacity" ? "opacity-slider" : "hue-slider",
          type === "opacity" ? styles["opacity-slider"] : styles["hue-slider"],
          resolvedClassName
        )}
        styles={{
          track: cn(
            type === "opacity" ? "opacity-track" : "hue-track",
            type === "opacity" ? styles["opacity-track"] : styles["hue-track"],
            resolvedTrackClassName
          ),
          thumb: cn(
            type === "opacity" ? "opacity-thumb" : "hue-thumb",
            type === "opacity" ? styles["opacity-thumb"] : styles["hue-thumb"],
            resolvedThumbClassName
          ),
        }}
        {...props}
      />
    );
  }
);
ColorSlider.displayName = "Color.Slider";

const ColorArea = React.forwardRef<HTMLDivElement, ColorAreaProps>(
  ({ className, variant = "standalone", ...props }, ref) => {
    const {
      displayValue,
      baseColor,
      previewColor,
      format,
      size,
      disabled,
      showOpacity,
      showPreview,
      hue,
      canvasSaturation,
      canvasBrightness,
      opacity,
      resolved,
      handleRecentColorSelect,
      handleCanvasChange,
      handleHueChange,
      handleOpacityChange,
      handleInputChange,
      handleFormatChange,
    } = useColorContext();

    return (
      <div
        ref={ref}
        className={cn("color", styles.color, resolved.root, className)}
        data-size={size}
        data-disabled={disabled || undefined}
        data-variant={variant !== "standalone" ? variant : undefined}
        {...props}
      >
        <ColorRecentColors
          onSelect={handleRecentColorSelect}
          disabled={disabled}
          size={size}
          className={resolved.recentColors}
          swatchClassName={resolved.recentColorSwatch}
        />

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

        <div className={cn("controls", styles["controls"], resolved.controls)}>
          <ColorSlider
            type="hue"
            value={hue}
            onChange={handleHueChange}
            disabled={disabled}
            size={size}
            className={resolved.sliderHue}
            trackClassName={resolved.sliderTrackHue}
            thumbClassName={resolved.sliderThumbHue}
          />

          {showOpacity && (
            <ColorSlider
              type="opacity"
              value={opacity}
              color={baseColor}
              onChange={handleOpacityChange}
              disabled={disabled}
              size={size}
              className={resolved.sliderOpacity}
              trackClassName={resolved.sliderTrackOpacity}
              thumbClassName={resolved.sliderThumbOpacity}
            />
          )}

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
            previewColor={previewColor}
          />
        </div>
      </div>
    );
  }
);
ColorArea.displayName = "Color.Area";

export interface ColorTriggerProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color"> {
  /** Preferred side where the picker area appears. */
  position?: PopoverProps["position"];
  /** Picker content shown in the popover. Defaults to Color.Area. */
  area?: React.ReactNode;
  /** Classes applied to the popover primitive slots. */
  popoverStyles?: PopoverProps["styles"];
  /** Whether to render a directional popover arrow. */
  showArrow?: boolean;
}

const ColorTrigger = React.forwardRef<HTMLButtonElement, ColorTriggerProps>(
  (
    {
      children,
      className,
      position = "bottom",
      area,
      popoverStyles,
      showArrow = false,
      disabled: triggerDisabled,
      ...props
    },
    ref
  ) => {
    const { disabled, displayValue, previewColor, resolved, size } = useColorContext();
    const isDisabled = disabled || triggerDisabled;

    const trigger = (
      <button
        ref={ref}
        type="button"
        disabled={isDisabled}
        className={cn("color-trigger", styles["color-trigger"], resolved.trigger, className)}
        data-size={size}
        data-disabled={isDisabled || undefined}
        {...props}
      >
        {children ?? (
          <>
            <span
              className={cn(
                "color-trigger-swatch",
                styles["color-trigger-swatch"],
                resolved.triggerSwatch
              )}
              style={{ "--preview-color": previewColor } as React.CSSProperties}
              aria-hidden="true"
            />
            <span
              className={cn(
                "color-trigger-value",
                styles["color-trigger-value"],
                resolved.triggerValue
              )}
            >
              {displayValue}
            </span>
          </>
        )}
      </button>
    );

    if (isDisabled) {
      return trigger;
    }

    return (
      <Popover
        content={area ?? <ColorArea variant="popover" />}
        position={position}
        styles={popoverStyles}
        showArrow={showArrow}
      >
        {trigger}
      </Popover>
    );
  }
);
ColorTrigger.displayName = "Color.Trigger";

export { ColorArea, ColorRoot, ColorSlider, ColorTrigger };
