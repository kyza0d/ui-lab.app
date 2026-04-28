"use client";

import * as React from "react";

import { useFocusRing } from "@react-aria/focus";
import { useHover } from "@react-aria/interactions";
import { mergeProps } from "@react-aria/utils";

import { cn, type StyleValue } from "@/lib/utils";
import { type StylesProp, createStylesResolver } from "@/lib/styles";
import { asElementProps } from "@/lib/react-aria";
import { useFocusIndicator } from "@/hooks/useFocusIndicator";
import { useMergeRefs } from "@/hooks/useMergeRefs";

import css from "./Slider.module.css";

type SliderOrientation = "horizontal" | "vertical";

export interface SliderStyleSlots {
  root?: StyleValue;
  track?: StyleValue;
  range?: StyleValue;
  thumb?: StyleValue;
}

export type SliderStylesProp = StylesProp<SliderStyleSlots>;

const resolveSliderBaseStyles = createStylesResolver([
  "root",
  "track",
  "range",
  "thumb",
] as const);

function resolveSliderStyles(styles: SliderStylesProp | undefined) {
  if (!styles || typeof styles === "string" || Array.isArray(styles)) {
    return resolveSliderBaseStyles(styles);
  }

  const { root, track, range, thumb } = styles;

  return resolveSliderBaseStyles({
    root,
    track,
    range,
    thumb,
  });
}

export interface SliderProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "defaultValue" | "value" | "onChange"> {
  /** Whether the slider is disabled. */
  disabled?: boolean;
  /** Minimum value of the slider range. */
  min?: number;
  /** Maximum value of the slider range. */
  max?: number;
  /** Step increment between values. */
  step?: number;
  /** Initial value or values for uncontrolled usage. */
  defaultValue?: number | number[];
  /** Controlled value or values for the slider thumbs. */
  value?: number | number[];
  /** Called when the slider value changes. */
  onValueChange?: (value: number[]) => void;
  /** Orientation of the slider track. */
  orientation?: SliderOrientation;
  /** Accessible label for the slider. */
  "aria-label"?: string;
  /** ID of an element that labels the slider. */
  "aria-labelledby"?: string;
  /** Classes applied to the root or named slots. Accepts a string, cn()-compatible array, slot object, or array of any of those. */
  styles?: SliderStylesProp;
}

interface SliderThumbProps {
  index: number;
  value: number;
  min: number;
  max: number;
  step: number;
  disabled?: boolean;
  orientation: SliderOrientation;
  trackRef: React.RefObject<HTMLDivElement | null>;
  onValueChange: (index: number, value: number) => void;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  className?: string;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function snapToStep(value: number, min: number, max: number, step: number): number {
  const snapped = Math.round((value - min) / step) * step + min;
  return clamp(snapped, min, max);
}

function normalizeValue(value: number | number[] | undefined): number[] | undefined {
  if (value === undefined) return undefined;
  return Array.isArray(value) ? value : [value];
}

function getValuePercent(value: number, min: number, max: number): number {
  if (max <= min) return 0;
  return ((value - min) / (max - min)) * 100;
}

function getValueFromPointer(
  clientX: number,
  clientY: number,
  track: HTMLDivElement,
  orientation: SliderOrientation,
  min: number,
  max: number,
  step: number
) {
  const rect = track.getBoundingClientRect();

  const percent =
    orientation === "vertical"
      ? clamp((rect.bottom - clientY) / rect.height, 0, 1)
      : clamp((clientX - rect.left) / rect.width, 0, 1);

  const rawValue = percent * (max - min) + min;
  return snapToStep(rawValue, min, max, step);
}

function SliderThumb({
  index,
  value,
  min,
  max,
  step,
  disabled,
  orientation,
  trackRef,
  onValueChange,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  className,
}: SliderThumbProps) {
  const thumbRef = React.useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const [isPressed, setIsPressed] = React.useState(false);
  const { focusProps, isFocused, isFocusVisible } = useFocusRing();
  const { hoverProps, isHovered } = useHover({ isDisabled: disabled });
  const { scopeProps, indicatorProps } = useFocusIndicator({
    scopeRef: thumbRef,
    containerRef: thumbRef,
    surfaceSelector: '[data-slider-focus-surface="true"]',
    radiusSource: "surface",
    mode: "self",
    dependencies: [value, orientation, disabled],
  });

  const percent = getValuePercent(value, min, max);

  const updateValueFromPointer = React.useCallback(
    (clientX: number, clientY: number) => {
      const track = trackRef.current;
      if (!track) return;

      const newValue = getValueFromPointer(clientX, clientY, track, orientation, min, max, step);
      if (newValue !== value) {
        onValueChange(index, newValue);
      }
    },
    [index, max, min, onValueChange, orientation, step, trackRef, value]
  );

  const handlePointerDown = React.useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (disabled) return;

      event.preventDefault();
      setIsDragging(true);
      setIsPressed(true);
      thumbRef.current?.setPointerCapture(event.pointerId);
      thumbRef.current?.focus();
      updateValueFromPointer(event.clientX, event.clientY);
    },
    [disabled, updateValueFromPointer]
  );

  const handlePointerMove = React.useCallback(
    (event: React.PointerEvent<HTMLDivElement>) => {
      if (!isDragging || disabled) return;
      updateValueFromPointer(event.clientX, event.clientY);
    },
    [disabled, isDragging, updateValueFromPointer]
  );

  const handlePointerEnd = React.useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(false);
    setIsPressed(false);
    thumbRef.current?.releasePointerCapture(event.pointerId);
  }, []);

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (disabled) return;

      let newValue = value;
      const largeStep = step * 10;

      switch (event.key) {
        case "ArrowRight":
          newValue = orientation === "horizontal" ? clamp(value + step, min, max) : value;
          break;
        case "ArrowUp":
          newValue = clamp(value + step, min, max);
          break;
        case "ArrowLeft":
          newValue = orientation === "horizontal" ? clamp(value - step, min, max) : value;
          break;
        case "ArrowDown":
          newValue = clamp(value - step, min, max);
          break;
        case "PageUp":
          newValue = clamp(value + largeStep, min, max);
          break;
        case "PageDown":
          newValue = clamp(value - largeStep, min, max);
          break;
        case "Home":
          newValue = min;
          break;
        case "End":
          newValue = max;
          break;
        default:
          return;
      }

      event.preventDefault();
      setIsPressed(true);

      if (newValue !== value) {
        onValueChange(index, newValue);
      }
    },
    [disabled, index, max, min, onValueChange, orientation, step, value]
  );

  const handleKeyUp = React.useCallback(() => {
    setIsPressed(false);
  }, []);

  const positionStyle =
    orientation === "vertical"
      ? { bottom: `${percent}%` }
      : { left: `${percent}%` };

  return (
    <div
      ref={thumbRef}
      role="slider"
      tabIndex={disabled ? -1 : 0}
      aria-orientation={orientation}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={value}
      aria-disabled={disabled || undefined}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      className={cn("thumb", scopeProps.className, css.thumb, className)}
      style={positionStyle}
      data-disabled={disabled ? "true" : undefined}
      data-focused={isFocused ? "true" : undefined}
      data-focus-visible={isFocusVisible ? "true" : undefined}
      data-hovered={isHovered ? "true" : undefined}
      data-pressed={isPressed ? "true" : undefined}
      data-dragging={isDragging ? "true" : undefined}
      data-slider-focus-surface="true"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerEnd}
      onPointerCancel={handlePointerEnd}
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
      {...asElementProps<"div">(mergeProps(focusProps, hoverProps))}
    >
      <div {...indicatorProps} data-focus-indicator="local" />
    </div>
  );
}

const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  (
    {
      className,
      styles,
      disabled = false,
      style,
      defaultValue,
      value: controlledValue,
      onValueChange,
      min = 0,
      max = 100,
      step = 1,
      orientation = "horizontal",
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      ...props
    },
    ref
  ) => {
    const rootRef = React.useRef<HTMLDivElement>(null);
    const trackRef = React.useRef<HTMLDivElement>(null);

    const [internalValues, setInternalValues] = React.useState<number[]>(
      () => normalizeValue(defaultValue) ?? normalizeValue(controlledValue) ?? [min]
    );

    const isControlled = controlledValue !== undefined;
    const values = isControlled
      ? normalizeValue(controlledValue) ?? [min]
      : internalValues;

    const mergedRef = useMergeRefs(ref, rootRef);
    const resolved = resolveSliderStyles(styles);

    const handleValueChange = React.useCallback(
      (index: number, newValue: number) => {
        const nextValues = [...values];
        nextValues[index] = newValue;

        if (!isControlled) {
          setInternalValues(nextValues);
        }

        onValueChange?.(nextValues);
      },
      [isControlled, onValueChange, values]
    );

    const handleTrackPointerDown = React.useCallback(
      (event: React.PointerEvent<HTMLDivElement>) => {
        if (disabled || event.target !== trackRef.current) return;

        const track = trackRef.current;
        if (!track) return;

        const newValue = getValueFromPointer(
          event.clientX,
          event.clientY,
          track,
          orientation,
          min,
          max,
          step
        );

        let closestIndex = 0;
        let closestDistance = Math.abs(values[0] - newValue);

        for (let index = 1; index < values.length; index += 1) {
          const distance = Math.abs(values[index] - newValue);
          if (distance < closestDistance) {
            closestDistance = distance;
            closestIndex = index;
          }
        }

        handleValueChange(closestIndex, newValue);
      },
      [disabled, handleValueChange, max, min, orientation, step, values]
    );

    const rangeStartPercent =
      values.length > 1 ? getValuePercent(values[0], min, max) : 0;
    const rangeEndPercent = getValuePercent(values[values.length - 1], min, max);

    const rangeStyle =
      orientation === "vertical"
        ? {
            bottom: `${rangeStartPercent}%`,
            height: `${Math.max(rangeEndPercent - rangeStartPercent, 0)}%`,
          }
        : {
            left: `${rangeStartPercent}%`,
            width: `${Math.max(rangeEndPercent - rangeStartPercent, 0)}%`,
          };

    return (
      <div
        ref={mergedRef}
        data-disabled={disabled ? "true" : undefined}
        data-orientation={orientation}
        style={style}
        className={cn(
          "slider",
          css.slider,
          className,
          resolved.root
        )}
        {...props}
      >
        <div
          ref={trackRef}
          className={cn("track", css.track, resolved.track)}
          data-disabled={disabled ? "true" : undefined}
          data-orientation={orientation}
          onPointerDown={handleTrackPointerDown}
        >
          <div
            className={cn("range", css.range, resolved.range)}
            data-disabled={disabled ? "true" : undefined}
            style={rangeStyle}
          />
          {values.map((sliderValue, index) => (
            <SliderThumb
              key={index}
              index={index}
              value={sliderValue}
              min={min}
              max={max}
              step={step}
              disabled={disabled}
              orientation={orientation}
              trackRef={trackRef}
              onValueChange={handleValueChange}
              aria-label={ariaLabel}
              aria-labelledby={ariaLabelledBy}
              className={resolved.thumb}
            />
          ))}
        </div>
      </div>
    );
  }
);

Slider.displayName = "Slider";

const SliderComponent = Object.assign(Slider, {
  Root: Slider,
});

export { SliderComponent as Slider };
