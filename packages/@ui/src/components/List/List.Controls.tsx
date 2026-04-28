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
import { useListContext } from './list.context';

/** Interactive checkbox inside a list item */
const Checkbox = React.forwardRef<React.ElementRef<typeof UICheckbox>, ListCheckboxProps>(
  ({ checked, className, onChange, onCheckedChange, placement = 'end', ...props }, ref) => {
    const { styles: listStyles } = useListContext();
    const handleChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
      onChange?.(event);
      onCheckedChange?.(event.currentTarget.checked, event);
    }, [onChange, onCheckedChange]);

    return (
      <div className={cn(styles.control, listStyles.control, className)} data-placement={placement} data-list-primary-action="true">
        <UICheckbox
          ref={ref}
          checked={checked}
          onChange={handleChange}
          {...props}
        />
      </div>
    );
  }
);
Checkbox.displayName = 'List.Checkbox';

/** Non-interactive checkbox indicator inside a list item */
const CheckboxIndicator = React.forwardRef<HTMLDivElement, ListCheckboxIndicatorProps>(
  ({ checked, className, ...props }, ref) => {
    const { styles: listStyles } = useListContext();

    return (
      <div
        ref={ref}
        className={cn(styles.checkbox, listStyles.checkbox, className)}
        data-checked={checked ? 'true' : 'false'}
        {...props}
      >
        <UICheckbox
          checked={checked}
          readOnly
          tabIndex={-1}
        />
      </div>
    );
  }
);
CheckboxIndicator.displayName = 'List.CheckboxIndicator';

/** Interactive switch inside a list item */
const Switch = React.forwardRef<React.ElementRef<typeof UISwitch>, ListSwitchProps>(
  ({ isSelected, isDisabled, className, ...props }, ref) => {
    const { styles: listStyles } = useListContext();

    return (
      <div className={cn(styles.control, listStyles.control, className)} data-list-primary-action="true">
        <UISwitch
          ref={ref}
          isSelected={isSelected}
          isDisabled={isDisabled}
          {...props}
        />
      </div>
    );
  }
);
Switch.displayName = 'List.Switch';

/** Input element inside a list item */
const Input = React.forwardRef<React.ElementRef<typeof UIInput>, ListInputProps>(
  ({ className, ...props }, ref) => {
    const { styles: listStyles } = useListContext();

    return (
      <div className={cn(styles.control, listStyles.control, 'w-48', className)}>
        <UIInput
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = 'List.Input';

/** Select element wrapper inside a list item */
const Select = React.forwardRef<React.ElementRef<typeof UISelect>, ListSelectProps>(
  ({ isDisabled, children, className, ...props }, ref) => {
    const { styles: listStyles } = useListContext();

    return (
      <div className={cn(styles.control, listStyles.control, className)} data-list-primary-action="true">
        <UISelect
          ref={ref}
          isDisabled={isDisabled}
          {...props}
        >
          {children}
        </UISelect>
      </div>
    );
  }
);
Select.displayName = 'List.Select';

export { Checkbox, CheckboxIndicator, Switch, Input, Select };
