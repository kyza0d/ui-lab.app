'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Checkbox as UICheckbox } from '../Checkbox';
import { Switch as UISwitch } from '../Switch';
import { Input as UIInput } from '../Input';
import { Select as UISelect } from '../Select';
import { 
  ListCheckboxProps, 
  ListCheckboxIndicatorProps,
  ListSwitchProps,
  ListInputProps,
  ListSelectProps
} from './list.types';
import styles from './List.module.css';

/** Interactive checkbox inside a list item */
const Checkbox = React.forwardRef<HTMLInputElement, ListCheckboxProps>(
  ({ checked, className, ...props }, ref) => (
    <div className={cn(styles.control, className)}>
      <UICheckbox
        ref={ref}
        checked={checked}
        {...props}
      />
    </div>
  )
);
Checkbox.displayName = 'List.Checkbox';

/** Non-interactive checkbox indicator inside a list item */
const CheckboxIndicator = React.forwardRef<HTMLDivElement, ListCheckboxIndicatorProps>(
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
CheckboxIndicator.displayName = 'List.CheckboxIndicator';

/** Interactive switch inside a list item */
const Switch = React.forwardRef<HTMLButtonElement, ListSwitchProps>(
  ({ isSelected, isDisabled, className, ...props }, ref) => (
    <div className={cn(styles.control, className)}>
      <UISwitch
        ref={ref}
        isSelected={isSelected}
        isDisabled={isDisabled}
        {...props}
      />
    </div>
  )
);
Switch.displayName = 'List.Switch';

/** Input element inside a list item */
const Input = React.forwardRef<HTMLInputElement, ListInputProps>(
  ({ className, ...props }, ref) => (
    <div className={cn(styles.control, 'w-32', className)}>
      <UIInput
        ref={ref}
        {...props}
      />
    </div>
  )
);
Input.displayName = 'List.Input';

/** Select element wrapper inside a list item */
const Select = React.forwardRef<any, ListSelectProps>(
  ({ isDisabled, children, className, ...props }, ref) => (
    <div className={cn(styles.control, className)}>
      <UISelect
        ref={ref}
        isDisabled={isDisabled}
        {...props}
      >
        {children}
      </UISelect>
    </div>
  )
);
Select.displayName = 'List.Select';

export { Checkbox, CheckboxIndicator, Switch, Input, Select };
