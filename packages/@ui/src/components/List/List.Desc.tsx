'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { useListContext } from './list.context';
import { ListDescProps } from './list.types';
import styles from './List.module.css';

/** Secondary description text below the list item label */
const Desc = React.forwardRef<HTMLDivElement, ListDescProps>(
  ({ children, className, ...props }, ref) => {
    const { styles: listStyles } = useListContext();

    return (
      <div
        ref={ref}
        className={cn(styles.desc, listStyles.desc, className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Desc.displayName = 'List.Desc';

export { Desc };
