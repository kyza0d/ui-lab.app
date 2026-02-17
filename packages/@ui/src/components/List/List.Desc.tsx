'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { ListDescProps } from './list.types';
import styles from './List.module.css';

const Desc = React.forwardRef<HTMLDivElement, ListDescProps>(
  ({ children, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(styles.desc, className)}
      {...props}
    >
      {children}
    </div>
  )
);
Desc.displayName = 'List.Desc';

export { Desc };
