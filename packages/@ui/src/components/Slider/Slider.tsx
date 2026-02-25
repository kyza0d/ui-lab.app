"use client"

import * as React from 'react';
import { useFocusRing } from 'react-aria';
import { cn } from '@/lib/utils';
import styles from "./Slider.module.css";

type SliderSize = 'sm' | 'md' | 'lg';

interface SliderRootProps {
  /** Size of the slider track and thumb */
  size?: SliderSize;
  /** Whether the slider is disabled */
  disabled?: boolean;
  /** Additional CSS class for the slider container */
  className?: string;
  /** Inline styles for the slider container */
  style?: React.CSSProperties;
  /** Minimum value of the slider range */
  min?: number;
  /** Maximum value of the slider range */
  max?: number;
  /** Step increment between values */
  step?: number;
  /** Initial value(s) for uncontrolled usage */
  defaultValue?: number | number[];
  /** Controlled value(s) for the slider thumb(s) */
  value?: number | number[];
  /** Called when the value changes */
  onValueChange?: (value: number[]) => void;
  /** Orientation of the slider track */
  orientation?: 'horizontal' | 'vertical';
  /** Accessible label for the slider */
  'aria-label'?: string;
  /** ID of an element that labels the slider */
  'aria-labelledby'?: string;
}

const SliderContext = React.createContext<{
  size: SliderSize;
  disabled?: boolean;
} | null>(null);

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function snapToStep(value: number, min: number, max: number, step: number): number {
  const snapped = Math.round((value - min) / step) * step + min;
  return clamp(snapped, min, max);
}

interface ThumbProps {
  index: number;
  value: number;
  min: number;
  max: number;
  step: number;
  disabled?: boolean;
  trackRef: React.RefObject<HTMLDivElement | null>;
  onValueChange: (index: number, value: number) => void;
  'aria-label'?: string;
  'aria-labelledby'?: string;
}

function SliderThumbInternal({
  index,
  value,
  min,
  max,
  step,
  disabled,
  trackRef,
  onValueChange,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
}: ThumbProps) {
  const thumbRef = React.useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = React.useState(false);
  const { focusProps, isFocusVisible } = useFocusRing();

  const percent = ((value - min) / (max - min)) * 100;

  const getValueFromPointer = React.useCallback((clientX: number) => {
    const track = trackRef.current;
    if (!track) return value;

    const rect = track.getBoundingClientRect();
    const percent = clamp((clientX - rect.left) / rect.width, 0, 1);
    const rawValue = percent * (max - min) + min;
    return snapToStep(rawValue, min, max, step);
  }, [trackRef, min, max, step, value]);

  const handlePointerDown = (e: React.PointerEvent) => {
    if (disabled) return;
    e.preventDefault();
    setIsDragging(true);
    thumbRef.current?.setPointerCapture(e.pointerId);
    thumbRef.current?.focus();
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging || disabled) return;
    const newValue = getValueFromPointer(e.clientX);
    if (newValue !== value) {
      onValueChange(index, newValue);
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (isDragging) {
      setIsDragging(false);
      thumbRef.current?.releasePointerCapture(e.pointerId);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    let newValue = value;
    const largeStep = step * 10;

    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowUp':
        newValue = clamp(value + step, min, max);
        break;
      case 'ArrowLeft':
      case 'ArrowDown':
        newValue = clamp(value - step, min, max);
        break;
      case 'PageUp':
        newValue = clamp(value + largeStep, min, max);
        break;
      case 'PageDown':
        newValue = clamp(value - largeStep, min, max);
        break;
      case 'Home':
        newValue = min;
        break;
      case 'End':
        newValue = max;
        break;
      default:
        return;
    }

    e.preventDefault();
    if (newValue !== value) {
      onValueChange(index, newValue);
    }
  };

  return (
    <div
      ref={thumbRef}
      role="slider"
      tabIndex={disabled ? -1 : 0}
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={value}
      aria-disabled={disabled || undefined}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      className={cn('slider thumb', styles.thumb)}
      style={{ left: `${percent}%` }}
      data-dragging={isDragging || undefined}
      data-focus-visible={isFocusVisible || undefined}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onKeyDown={handleKeyDown}
      {...focusProps}
    />
  );
}

/** Horizontal slider for selecting a value within a range */
const Root = React.forwardRef<HTMLDivElement, SliderRootProps>(
  (
    {
      className,
      size = 'md',
      disabled,
      style,
      defaultValue,
      value: controlledValue,
      onValueChange,
      min = 0,
      max = 100,
      step = 1,
      orientation = 'horizontal',
      'aria-label': ariaLabel,
      'aria-labelledby': ariaLabelledBy,
      ...props
    },
    ref
  ) => {
    const trackRef = React.useRef<HTMLDivElement>(null);

    // Normalize to arrays
    const normalizeValue = (v: number | number[] | undefined): number[] | undefined => {
      if (v === undefined) return undefined;
      return Array.isArray(v) ? v : [v];
    };

    const [internalValues, setInternalValues] = React.useState<number[]>(() => {
      return normalizeValue(defaultValue) ?? normalizeValue(controlledValue) ?? [min];
    });

    const isControlled = controlledValue !== undefined;
    const values = isControlled ? normalizeValue(controlledValue)! : internalValues;

    const handleValueChange = React.useCallback((index: number, newValue: number) => {
      const newValues = [...values];
      newValues[index] = newValue;

      if (!isControlled) {
        setInternalValues(newValues);
      }
      onValueChange?.(newValues);
    }, [values, isControlled, onValueChange]);

    const handleTrackClick = (e: React.PointerEvent) => {
      if (disabled) return;
      // Only handle clicks directly on the track, not on thumbs
      if (e.target !== trackRef.current) return;

      const track = trackRef.current;
      if (!track) return;

      const rect = track.getBoundingClientRect();
      const percent = clamp((e.clientX - rect.left) / rect.width, 0, 1);
      const rawValue = percent * (max - min) + min;
      const newValue = snapToStep(rawValue, min, max, step);

      // Find the closest thumb and update it
      let closestIndex = 0;
      let closestDistance = Math.abs(values[0] - newValue);
      for (let i = 1; i < values.length; i++) {
        const distance = Math.abs(values[i] - newValue);
        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = i;
        }
      }

      handleValueChange(closestIndex, newValue);
    };

    return (
      <SliderContext.Provider value={{ size, disabled }}>
        <div
          ref={ref}
          data-size={size}
          data-disabled={disabled || undefined}
          data-orientation={orientation}
          style={style}
          className={cn('slider', styles.slider, className)}
          {...props}
        >
          <div
            ref={trackRef}
            className={cn('slider track', styles.track)}
            onPointerDown={handleTrackClick}
          >
            <div
              className={cn('slider range', styles.range)}
              style={{
                left: `${values.length === 1 ? 0 : ((values[0] - min) / (max - min)) * 100}%`,
                right: `${values.length === 1 ? 100 - ((values[0] - min) / (max - min)) * 100 : 100 - ((values[values.length - 1] - min) / (max - min)) * 100}%`,
              }}
            />
            {values.map((value, index) => (
              <SliderThumbInternal
                key={index}
                index={index}
                value={value}
                min={min}
                max={max}
                step={step}
                disabled={disabled}
                trackRef={trackRef}
                onValueChange={handleValueChange}
                aria-label={ariaLabel}
                aria-labelledby={ariaLabelledBy}
              />
            ))}
          </div>
        </div>
      </SliderContext.Provider>
    );
  }
);
Root.displayName = 'SliderRoot';

export { Root };
