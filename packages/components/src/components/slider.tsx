'use client';

import * as React from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';

import { cn } from '@/lib/utils';

const SLIDER_ROOT_NAME = 'SliderRoot';
const SLIDER_THUMB_NAME = 'SliderThumb';

type SliderSize = 'sm' | 'md' | 'lg';

const Root = React.forwardRef<
  React.ComponentRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & { disabled?: boolean; size?: SliderSize }
>(({ className, children, disabled, size = 'md', ...rest }, forwardedRef) => {
  const sizeClasses: Record<SliderSize, string> = {
    sm: 'h-3',
    md: 'h-4',
    lg: 'h-5',
  };

  const trackSizeClasses: Record<SliderSize, string> = {
    sm: 'h-1',
    md: 'h-1.5',
    lg: 'h-2',
  };

  return (
    <SliderPrimitive.Root
      ref={forwardedRef}
      className={cn(
        'relative flex w-full touch-none select-none items-center',
        sizeClasses[size as SliderSize],
        disabled && 'opacity-50 cursor-not-allowed',
        className,
      )}
      disabled={disabled}
      {...rest}
    >
      <SliderPrimitive.Track className={cn('relative w-full overflow-hidden rounded-full', trackSizeClasses[size as SliderSize], disabled ? 'bg-background-500' : 'bg-background-600')}>
        <SliderPrimitive.Range className={cn('absolute h-full', disabled ? 'bg-background-600' : 'bg-accent-500')} />
      </SliderPrimitive.Track>
      {children}
    </SliderPrimitive.Root>
  );
});
Root.displayName = SLIDER_ROOT_NAME;

const Thumb = React.forwardRef<
  React.ComponentRef<typeof SliderPrimitive.Thumb>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Thumb>
>(({ className, ...rest }, forwardedRef) => {
  return (
    <SliderPrimitive.Thumb
      ref={forwardedRef}
      className={cn(
        [
          // base
          'box-content block size-3 shrink-0 cursor-pointer rounded-full border-0 bg-accent-500 shadow-none outline-none',
          // focus
          'focus:outline-none',
        ],
        className,
      )}
      {...rest}
    />
  );
});
Thumb.displayName = SLIDER_THUMB_NAME;

export { Root, Thumb };
