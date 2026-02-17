'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Checkbox as UICheckbox } from '../Checkbox';
import { ListCheckboxProps } from './list.types';
import styles from './List.module.css';

const Checkbox = React.forwardRef<HTMLDivElement, ListCheckboxProps>(
  ({ checked, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(styles.checkbox, className)}
      data-checked={checked ? 'true' : 'false'}
      {...props}
    >
      <UICheckbox
        checked={checked}
        size="sm"
        readOnly
        tabIndex={-1}
      />
    </div>
  )
);
Checkbox.displayName = 'List.Checkbox';

export { Checkbox };
