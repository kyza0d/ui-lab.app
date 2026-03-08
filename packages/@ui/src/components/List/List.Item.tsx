'use client';

import React from 'react';
import { cn, type StyleValue } from '@/lib/utils';
import { useListContext } from './list.context';
import { ListItemProps, ListStylesProp, ListActionDef } from './list.types';
import styles from './List.module.css';
import { type StylesProp, createStylesResolver } from '@/lib/styles';
import { Tooltip } from '@/components/Tooltip';

const resolveListItemStyles = createStylesResolver(['root'] as const);

/** A single interactive row in the list */
const Item = React.forwardRef<HTMLDivElement, ListItemProps>(
  ({ value, children, className, interactive, selected, styles: stylesProp, actions, ...props }, ref) => {
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
        className={cn(styles.item, 'group', className, resolvedStyles.root)}
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
        {actions && actions.length > 0 && (
          <div className={styles.actions} data-actions>
            {actions.map((action, i) => {
              const key = React.isValidElement(action) ? i : ((action as ListActionDef).title || i);
              return React.isValidElement(action) ? (
                <React.Fragment key={key}>{action}</React.Fragment>
              ) : (
                <Tooltip key={key} content={(action as ListActionDef).title} position="top">
                  <button
                    type="button"
                    className={styles.action}
                    aria-label={(action as ListActionDef).title}
                    onClick={(action as ListActionDef).onClick}
                  >
                    {(action as ListActionDef).icon}
                  </button>
                </Tooltip>
              );
            })}
          </div>
        )}
      </div>
    );
  }
);
Item.displayName = 'List.Item';

export { Item };
