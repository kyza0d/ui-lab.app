'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { ListTitleProps } from './list.types';
import styles from './List.module.css';

/** Primary label text in a list item */
const Title = React.forwardRef<HTMLDivElement, ListTitleProps>(
  ({ children, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(styles.title, className)}
      {...props}
    >
      {children}
    </div>
  )
);
Title.displayName = 'List.Title';

export { Title };
