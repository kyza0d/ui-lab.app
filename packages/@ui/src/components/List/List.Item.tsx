'use client';

import React from 'react';
import { cn, type StyleValue } from '@/lib/utils';
import { useListContext } from './list.context';
import { ListItemProps, ListStylesProp } from './list.types';
import styles from './List.module.css';
import { type StylesProp, createStylesResolver } from '@/lib/styles';

const resolveListItemStyles = createStylesResolver(['root'] as const);

/** A single interactive row in the list */
const Item = React.forwardRef<HTMLDivElement, ListItemProps>(
  ({ value, children, className, interactive, selected, styles: stylesProp, ...props }, ref) => {
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

    const resolvedStyles = resolveListItemStyles(stylesProp);

    return (
      <div
        ref={itemRef}
        role="listitem"
        className={cn(styles.item, className, resolvedStyles.root)}
        data-highlighted={isHighlighted ? 'true' : 'false'}
        data-value={value}
        data-interactive={interactive ? 'true' : undefined}
        data-selected={selected ? 'true' : undefined}
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
