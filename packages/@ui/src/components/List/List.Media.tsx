'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { ListMediaProps } from './list.types';
import styles from './List.module.css';

const Media = React.forwardRef<HTMLDivElement, ListMediaProps>(
  ({ children, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(styles.media, className)}
      {...props}
    >
      {children}
    </div>
  )
);
Media.displayName = 'List.Media';

export { Media };
