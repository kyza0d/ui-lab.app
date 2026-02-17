'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { useListContext } from './list.context';
import { ListItemProps } from './list.types';
import styles from './List.module.css';

const Item = React.forwardRef<HTMLDivElement, ListItemProps>(
  ({ value, children, className, ...props }, ref) => {
    const { highlightedIndex, focusItem, registerItem } = useListContext();
    const itemRef = React.useRef<HTMLDivElement>(null);
    const itemIndexRef = React.useRef<number | null>(null);

    // Register item on mount
    React.useLayoutEffect(() => {
      if (itemRef.current) {
        itemIndexRef.current = registerItem(itemRef.current);
      }
    }, [registerItem]);

    const isHighlighted = itemIndexRef.current !== null && highlightedIndex === itemIndexRef.current;

    React.useImperativeHandle(ref, () => itemRef.current as HTMLDivElement);

    return (
      <div
        ref={itemRef}
        role="listitem"
        className={cn(styles.item, className)}
        data-highlighted={isHighlighted ? 'true' : 'false'}
        data-value={value}
        onMouseEnter={() => {
          if (itemIndexRef.current !== null) {
            focusItem(itemIndexRef.current);
          }
        }}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Item.displayName = 'List.Item';

export { Item };
