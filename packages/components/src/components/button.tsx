"use client"

import * as React from 'react';
import { Button as AriaButton } from 'react-aria-components';
import { cn } from '@/lib/utils';
import styles from './button.module.css';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ComponentPropsWithoutRef<typeof AriaButton> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

const variantMap = {
  primary: styles['primary'],
  secondary: styles['secondary'],
  outline: styles['outline'],
  ghost: styles['ghost'],
};

const sizeMap = {
  sm: styles['sm'],
  md: styles['md'],
  lg: styles['lg'],
};

const Button = React.forwardRef<
  React.ElementRef<typeof AriaButton>,
  ButtonProps
>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    return (
      <AriaButton
        ref={ref}
        data-variant={variant}
        data-size={size}
        className={cn(
          'button',
          variant,
          size,
          variantMap[variant],
          sizeMap[size],
          styles.button,
          className
        )}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export { Button };
