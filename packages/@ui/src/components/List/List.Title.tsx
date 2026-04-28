'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { useListContext } from './list.context';
import { ListTitleProps } from './list.types';
import styles from './List.module.css';

/** Primary label text in a list item */
const Title = React.forwardRef<HTMLDivElement, ListTitleProps>(
  ({ children, className, ...props }, ref) => {
    const { styles: listStyles } = useListContext();

    return (
      <div
        ref={ref}
        className={cn(styles.title, listStyles.title, className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Title.displayName = 'List.Title';

export { Title };
