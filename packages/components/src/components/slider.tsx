"use client"

import * as React from 'react';
import { Slider, SliderTrack, SliderThumb as AriaSliderThumb } from 'react-aria-components';
import { cn } from '@/lib/utils';
import styles from './slider.module.css';

type SliderSize = 'sm' | 'md' | 'lg';

interface SliderRootProps extends Omit<React.ComponentPropsWithoutRef<typeof Slider>, 'children' | 'min' | 'max' | 'onChange'> {
  size?: SliderSize;
  disabled?: boolean;
  children?: React.ReactNode;
  min?: number;
  max?: number;
  onValueChange?: (value: number | number[]) => void;
}

const SliderContext = React.createContext<{
  size: SliderSize;
  disabled?: boolean;
} | null>(null);

const Root = React.forwardRef<
  React.ElementRef<typeof Slider>,
  SliderRootProps
>(
  (
    {
      className,
      size = 'md',
      disabled,
      style,
      defaultValue,
      value,
      onValueChange,
      min: _min,
      max: _max,
      step,
      children,
      ...props
    },
    ref
  ) => {
    const minValue = _min ?? 0;
    const maxValue = _max ?? 100;
    const stepValue = step ?? 1;

    return (
      <SliderContext.Provider value={{ size, disabled }}>
        <Slider
          ref={ref}
          isDisabled={disabled}
          defaultValue={defaultValue}
          value={value}
          onChange={onValueChange}
          minValue={minValue}
          maxValue={maxValue}
          step={stepValue}
          data-size={size}
          data-disabled={disabled}
          style={style}
          className={cn('slider', styles.slider, className)}
          {...props}
        >
          <SliderTrack className={cn('slider track', styles.track)}>
            {({ state }) => (
              <>
                <div
                  className={cn('slider range', styles.range)}
                  style={{
                    left: `${state.values.length === 1 ? 0 : state.getThumbPercent(0) * 100}%`,
                    right: `${state.values.length === 1 ? 100 - state.getThumbPercent(0) * 100 : 100 - state.getThumbPercent(state.values.length - 1) * 100}%`,
                  }}
                />
                {state.values.map((_, index) => (
                  <AriaSliderThumb
                    key={index}
                    index={index}
                    className={cn('slider thumb', styles.thumb)}
                  />
                ))}
              </>
            )}
          </SliderTrack>
        </Slider>
      </SliderContext.Provider>
    );
  }
);
Root.displayName = 'SliderRoot';

interface ThumbProps extends React.ComponentPropsWithoutRef<typeof AriaSliderThumb> {
  index?: number;
}

const Thumb = React.forwardRef<HTMLDivElement, ThumbProps>(
  ({ index: _index, style, className, ...props }, ref) => {
    const context = React.useContext(SliderContext);
    if (!context) {
      console.warn('Thumb must be used within Slider.Root');
      return null;
    }

    return (
      <AriaSliderThumb
        ref={ref}
        style={style}
        className={cn('slider thumb', styles.thumb, className)}
        {...props}
      />
    );
  }
);
Thumb.displayName = 'SliderThumb';

export { Root, Thumb };
