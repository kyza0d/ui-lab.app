"use client";

import * as React from "react";

import { useFocusRing } from "@react-aria/focus";
import { useHover } from "@react-aria/interactions";
import { mergeProps } from "@react-aria/utils";

import { cn, type StyleValue } from "@/lib/utils";
import { type StylesProp, createStylesResolver } from "@/lib/styles";
import { asElementProps } from "@/lib/react-aria";
import { useFocus } from "@/hooks/useFocus";
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
  onValueChange: (index: number, value: number) => void;
  onThumbRef: (index: number, element: HTMLDivElement | null) => void;
  isDragging?: boolean;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  className?: string;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function snapToStep(value: number, min: number, max: number, step: number): number {
  const effectiveStep = Number.isFinite(step) && step > 0 ? step : 1;
  const snapped = Math.round((value - min) / effectiveStep) * effectiveStep + min;
  const precision = Math.min(
    Math.max(getDecimalPrecision(effectiveStep), getDecimalPrecision(min), getDecimalPrecision(max)),
    12
  );

  return clamp(Number(snapped.toFixed(precision)), min, max);
}

function normalizeValue(value: number | number[] | undefined): number[] | undefined {
  if (value === undefined) return undefined;
  return Array.isArray(value) ? value : [value];
}

function getValuePercent(value: number, min: number, max: number): number {
  if (max <= min) return 0;
  return ((value - min) / (max - min)) * 100;
}

function getDecimalPrecision(value: number): number {
  if (!Number.isFinite(value)) return 0;

  const valueString = value.toString();
  const exponentMatch = valueString.match(/e-(\d+)$/);

  if (exponentMatch) {
    return Number(exponentMatch[1]);
  }

  return valueString.split(".")[1]?.length ?? 0;
}

function getClosestValueIndex(values: number[], targetValue: number): number {
  let closestIndex = 0;
  let closestDistance = Math.abs(values[0] - targetValue);

  for (let index = 1; index < values.length; index += 1) {
    const distance = Math.abs(values[index] - targetValue);
    if (distance < closestDistance) {
      closestDistance = distance;
      closestIndex = index;
    }
  }

  return closestIndex;
}

function getThumbIndexFromTarget(target: EventTarget | null): number | undefined {
  if (!(target instanceof Element)) return undefined;

  const thumb = target.closest<HTMLElement>("[data-slider-thumb-index]");
  if (!thumb) return undefined;

  const index = Number(thumb.dataset.sliderThumbIndex);
  return Number.isInteger(index) ? index : undefined;
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
  const size = orientation === "vertical" ? rect.height : rect.width;

  if (size <= 0) return min;

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
  onValueChange,
  onThumbRef,
  isDragging,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  className,
}: SliderThumbProps) {
  const thumbRef = React.useRef<HTMLDivElement>(null);
  const [isPressed, setIsPressed] = React.useState(false);
  const { focusProps, isFocused, isFocusVisible } = useFocusRing();
  const { hoverProps, isHovered } = useHover({ isDisabled: disabled });
  const handleThumbRef = React.useCallback(
    (element: HTMLDivElement | null) => {
      onThumbRef(index, element);
    },
    [index, onThumbRef]
  );
  const mergedRef = useMergeRefs<HTMLDivElement>(thumbRef, handleThumbRef);
  const { scopeProps, indicatorProps } = useFocus({
    scopeRef: thumbRef,
    containerRef: thumbRef,
    surfaceSelector: '[data-slider-focus-surface="true"]',
    radiusSource: "surface",
    mode: "self",
    dependencies: [value, orientation, disabled],
  });

  const percent = getValuePercent(value, min, max);

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (disabled) return;

      let newValue = value;
      const largeStep = step * 10;
      const incrementValue = (amount: number) => snapToStep(value + amount, min, max, step);

      switch (event.key) {
        case "ArrowRight":
          newValue = orientation === "horizontal" ? incrementValue(step) : value;
          break;
        case "ArrowUp":
          newValue = incrementValue(step);
          break;
        case "ArrowLeft":
          newValue = orientation === "horizontal" ? incrementValue(-step) : value;
          break;
        case "ArrowDown":
          newValue = incrementValue(-step);
          break;
        case "PageUp":
          newValue = incrementValue(largeStep);
          break;
        case "PageDown":
          newValue = incrementValue(-largeStep);
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
      ref={mergedRef}
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
      data-slider-thumb="true"
      data-slider-thumb-index={index}
      data-disabled={disabled ? "true" : undefined}
      data-focused={isFocused ? "true" : undefined}
      data-focus-visible={isFocusVisible ? "true" : undefined}
      data-hovered={isHovered ? "true" : undefined}
      data-pressed={isPressed || isDragging ? "true" : undefined}
      data-dragging={isDragging ? "true" : undefined}
      data-slider-focus-surface="true"
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
      onPointerDown,
      onPointerMove,
      onPointerUp,
      onPointerCancel,
      onLostPointerCapture,
      ...props
    },
    ref
  ) => {
    const rootRef = React.useRef<HTMLDivElement>(null);
    const trackRef = React.useRef<HTMLDivElement>(null);
    const thumbRefs = React.useRef<Array<HTMLDivElement | null>>([]);
    const activeDragRef = React.useRef<{ pointerId: number; thumbIndex: number } | null>(null);
    const [draggingThumbIndex, setDraggingThumbIndex] = React.useState<number | null>(null);

    const [internalValues, setInternalValues] = React.useState<number[]>(
      () => normalizeValue(defaultValue) ?? normalizeValue(controlledValue) ?? [min]
    );

    const isControlled = controlledValue !== undefined;
    const normalizedValues = isControlled
      ? normalizeValue(controlledValue) ?? [min]
      : internalValues;
    const values = normalizedValues.length > 0 ? normalizedValues : [min];

    const mergedRef = useMergeRefs(ref, rootRef);
    const resolved = resolveSliderStyles(styles);

    const setThumbRef = React.useCallback((index: number, element: HTMLDivElement | null) => {
      thumbRefs.current[index] = element;
    }, []);

    const handleValueChange = React.useCallback(
      (index: number, newValue: number) => {
        if (values[index] === newValue) return;

        const nextValues = [...values];
        nextValues[index] = newValue;

        if (!isControlled) {
          setInternalValues(nextValues);
        }

        onValueChange?.(nextValues);
      },
      [isControlled, onValueChange, values]
    );

    const updateValueFromPointer = React.useCallback(
      (thumbIndex: number, clientX: number, clientY: number) => {
        const track = trackRef.current;
        if (!track) return undefined;

        const newValue = getValueFromPointer(
          clientX,
          clientY,
          track,
          orientation,
          min,
          max,
          step
        );

        handleValueChange(thumbIndex, newValue);
        return newValue;
      },
      [handleValueChange, max, min, orientation, step]
    );

    const stopPointerDrag = React.useCallback((pointerId: number, releaseCapture = true) => {
      const activeDrag = activeDragRef.current;
      if (!activeDrag || activeDrag.pointerId !== pointerId) return;

      const root = rootRef.current;
      if (releaseCapture && root?.releasePointerCapture) {
        try {
          if (!root.hasPointerCapture || root.hasPointerCapture(pointerId)) {
            root.releasePointerCapture(pointerId);
          }
        } catch {
          // Pointer capture can already be gone after browser-level cancellation.
        }
      }

      activeDragRef.current = null;
      setDraggingThumbIndex(null);
    }, []);

    const startPointerDrag = React.useCallback(
      (event: React.PointerEvent<HTMLDivElement>, requestedThumbIndex?: number) => {
        if (disabled || event.button !== 0 || event.isPrimary === false) return;

        const track = trackRef.current;
        const root = rootRef.current ?? event.currentTarget;
        if (!track || !root) return;

        const nextValue = getValueFromPointer(
          event.clientX,
          event.clientY,
          track,
          orientation,
          min,
          max,
          step
        );
        const thumbIndex =
          requestedThumbIndex !== undefined && requestedThumbIndex >= 0 && requestedThumbIndex < values.length
            ? requestedThumbIndex
            : getClosestValueIndex(values, nextValue);

        event.preventDefault();

        activeDragRef.current = { pointerId: event.pointerId, thumbIndex };
        setDraggingThumbIndex(thumbIndex);

        if (root.setPointerCapture) {
          try {
            root.setPointerCapture(event.pointerId);
          } catch {
            // Some test and embedded environments expose the API without active pointer capture support.
          }
        }

        thumbRefs.current[thumbIndex]?.focus({ preventScroll: true });
        handleValueChange(thumbIndex, nextValue);
      },
      [disabled, handleValueChange, max, min, orientation, step, values]
    );

    const handleRootPointerDown = React.useCallback(
      (event: React.PointerEvent<HTMLDivElement>) => {
        onPointerDown?.(event);
        if (event.defaultPrevented) return;

        startPointerDrag(event, getThumbIndexFromTarget(event.target));
      },
      [onPointerDown, startPointerDrag]
    );

    const handleRootPointerMove = React.useCallback(
      (event: React.PointerEvent<HTMLDivElement>) => {
        onPointerMove?.(event);
        if (event.defaultPrevented || disabled) return;

        const activeDrag = activeDragRef.current;
        if (!activeDrag || activeDrag.pointerId !== event.pointerId) return;

        event.preventDefault();
        updateValueFromPointer(activeDrag.thumbIndex, event.clientX, event.clientY);
      },
      [disabled, onPointerMove, updateValueFromPointer]
    );

    const handleRootPointerEnd = React.useCallback(
      (event: React.PointerEvent<HTMLDivElement>) => {
        onPointerUp?.(event);
        stopPointerDrag(event.pointerId);
      },
      [onPointerUp, stopPointerDrag]
    );

    const handleRootPointerCancel = React.useCallback(
      (event: React.PointerEvent<HTMLDivElement>) => {
        onPointerCancel?.(event);
        stopPointerDrag(event.pointerId);
      },
      [onPointerCancel, stopPointerDrag]
    );

    const handleRootLostPointerCapture = React.useCallback(
      (event: React.PointerEvent<HTMLDivElement>) => {
        onLostPointerCapture?.(event);
        stopPointerDrag(event.pointerId, false);
      },
      [onLostPointerCapture, stopPointerDrag]
    );

    React.useEffect(() => {
      const activeDrag = activeDragRef.current;
      if (disabled && activeDrag) {
        stopPointerDrag(activeDrag.pointerId);
      }
    }, [disabled, stopPointerDrag]);

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
        onPointerDown={handleRootPointerDown}
        onPointerMove={handleRootPointerMove}
        onPointerUp={handleRootPointerEnd}
        onPointerCancel={handleRootPointerCancel}
        onLostPointerCapture={handleRootLostPointerCapture}
        {...props}
      >
        <div
          ref={trackRef}
          className={cn("track", css.track, resolved.track)}
          data-slider-track="true"
          data-disabled={disabled ? "true" : undefined}
          data-orientation={orientation}
        >
          <div
            className={cn("range", css.range, resolved.range)}
            data-slider-range="true"
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
              onValueChange={handleValueChange}
              onThumbRef={setThumbRef}
              isDragging={draggingThumbIndex === index}
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
