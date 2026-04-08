'use client';

import React from 'react';
import { cn, type StyleValue } from '@/lib/utils';
import { type StylesProp, createStylesResolver } from '@/lib/styles';
import { Divider as FoldDivider } from '@/components/Divider';
import styles from './List.module.css';
import { ListContext } from './list.context';
import {
  ListContainerProps,
  ListHeaderProps,
  ListNavigateCallbacks,
  ListRef,
  ActionGroupComponentProps,
  FooterComponentProps,
} from './list.types';
import { DividerProps } from '@/components/Divider';
import { scrollItemIntoView } from '@/utils/list-navigation';

export interface ListStyleSlots {
  root?: StyleValue;
  header?: StyleValue;
  item?: StyleValue;
  checkbox?: StyleValue;
  control?: StyleValue;
  media?: StyleValue;
  desc?: StyleValue;
  actionGroup?: StyleValue;
  actions?: StyleValue;
  action?: StyleValue;
  footer?: StyleValue;
}

export type ListStylesProp = StylesProp<ListStyleSlots>;

const resolveListBaseStyles = createStylesResolver([
  'root',
  'header',
  'item',
  'checkbox',
  'control',
  'media',
  'desc',
  'actionGroup',
  'actions',
  'action',
  'footer'
] as const);

// Ref container for keyboard navigation
const Container = React.forwardRef<ListRef, ListContainerProps>(
  ({ items: _items = [], variant = 'default', spacing = 'default', onNavigate, children, className, ...props }, ref) => {
    const rootRef = React.useRef<HTMLDivElement | null>(null);
    const [focusedItem, setFocusedItemState] = React.useState<HTMLElement | null>(null);
    const [isFocusMode, setIsFocusMode] = React.useState(false);
    const shouldScrollFocusedItemRef = React.useRef(false);

    const getFocusableItems = React.useCallback(() => {
      if (!rootRef.current) return [];

      return Array.from(rootRef.current.querySelectorAll<HTMLElement>('[role="listitem"]')).filter((item) => (
        item.isConnected &&
        item.tabIndex >= 0 &&
        item.getAttribute('aria-hidden') !== 'true' &&
        item.getAttribute('aria-disabled') !== 'true' &&
        item.getAttribute('data-disabled') !== 'true'
      ));
    }, []);

    const getFocusedIndex = React.useCallback(() => {
      if (!focusedItem || !isFocusMode) return null;
      const itemIndex = getFocusableItems().indexOf(focusedItem);
      return itemIndex >= 0 ? itemIndex : null;
    }, [focusedItem, getFocusableItems, isFocusMode]);

    const setFocusedItem = React.useCallback((
      item: HTMLElement | null,
      options: { enterFocusMode?: boolean; scroll?: boolean } = {},
    ) => {
      if (!item) {
        shouldScrollFocusedItemRef.current = false;
        setFocusedItemState(null);
        setIsFocusMode(false);
        return;
      }

      if (options.scroll) {
        shouldScrollFocusedItemRef.current = true;
      }

      setFocusedItemState(item);
      setIsFocusMode(options.enterFocusMode ?? true);
    }, []);

    const focusItemAtIndex = React.useCallback((index: number, scroll = true) => {
      const itemsInOrder = getFocusableItems();
      const target = itemsInOrder[index];
      if (!target) return false;

      shouldScrollFocusedItemRef.current = scroll;
      target.focus({ preventScroll: true });
      return true;
    }, [getFocusableItems]);

    const focusAdjacentItem = React.useCallback((currentItem: HTMLElement | null, direction: 1 | -1, scroll = true) => {
      const itemsInOrder = getFocusableItems();
      if (itemsInOrder.length === 0) return false;

      const currentIndex = currentItem ? itemsInOrder.indexOf(currentItem) : -1;
      const nextIndex = currentIndex === -1
        ? (direction === 1 ? 0 : itemsInOrder.length - 1)
        : Math.min(Math.max(currentIndex + direction, 0), itemsInOrder.length - 1);

      if (currentIndex !== -1 && nextIndex === currentIndex) {
        return false;
      }

      return focusItemAtIndex(nextIndex, scroll);
    }, [focusItemAtIndex, getFocusableItems]);

    const focusBoundaryItem = React.useCallback((position: 'first' | 'last', scroll = true) => {
      const itemsInOrder = getFocusableItems();
      if (itemsInOrder.length === 0) return false;

      return focusItemAtIndex(position === 'first' ? 0 : itemsInOrder.length - 1, scroll);
    }, [focusItemAtIndex, getFocusableItems]);

    // Expose ref methods for keyboard navigation
    React.useImperativeHandle(ref, () => ({
      focusNext: () => {
        focusAdjacentItem(focusedItem, 1);
        onNavigate?.down?.();
      },
      focusPrev: () => {
        focusAdjacentItem(focusedItem, -1);
        onNavigate?.up?.();
      },
      focusFirst: () => {
        focusBoundaryItem('first');
        onNavigate?.down?.();
      },
      focusLast: () => {
        focusBoundaryItem('last');
        onNavigate?.up?.();
      },
      selectHighlighted: () => {
        onNavigate?.enter?.();
      },
      clearHighlight: () => {
        setFocusedItem(null, { enterFocusMode: false });
      },
      getHighlightedIndex: () => getFocusedIndex(),
    }), [focusAdjacentItem, focusBoundaryItem, focusedItem, getFocusedIndex, onNavigate, setFocusedItem]);

    React.useEffect(() => {
      if (!isFocusMode || !focusedItem || !shouldScrollFocusedItemRef.current) return;
      shouldScrollFocusedItemRef.current = false;
      scrollItemIntoView(focusedItem);
    }, [focusedItem, isFocusMode]);

    React.useEffect(() => {
      if (!focusedItem) return;
      if (focusedItem.isConnected) return;
      setFocusedItem(null, { enterFocusMode: false });
    }, [focusedItem, setFocusedItem]);

    const contextValue = React.useMemo(
      () => ({
        focusedItem,
        isFocusMode,
        rootRef,
        setFocusedItem,
        focusAdjacentItem,
        focusBoundaryItem,
      }),
      [focusAdjacentItem, focusBoundaryItem, focusedItem, isFocusMode, setFocusedItem]
    );

    return (
      <ListContext.Provider value={contextValue}>
        <div
          ref={rootRef}
          role="list"
          className={cn('list', styles.container, className)}
          data-variant={variant}
          data-spacing={spacing}
          data-focus-mode={isFocusMode ? 'row' : undefined}
          data-keyboard-mode={isFocusMode ? 'true' : undefined}
          {...(props as React.HTMLAttributes<HTMLDivElement>)}
        >
          {children}
        </div>
      </ListContext.Provider>
    );
  }
);
Container.displayName = 'List';

/** Sticky heading row above a section of list items */
const Header = React.forwardRef<HTMLElement, ListHeaderProps>(
  ({ sticky, children, className, ...props }, ref) => (
    <header
      ref={ref}
      className={cn(styles.header, sticky && styles.sticky, className)}
      {...props}
    >
      {children}
    </header>
  )
);
Header.displayName = 'List.Header';

/** Row of action buttons aligned to the right of a list item */
const ActionGroup = React.forwardRef<HTMLDivElement, ActionGroupComponentProps>(
  ({ justify = 'flex-start', children, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(styles.actionGroup, className)}
      data-justify={justify}
      {...props}
    >
      {children}
    </div>
  )
);
ActionGroup.displayName = 'List.ActionGroup';

/** Horizontal separator between list sections */
const Divider = React.forwardRef<HTMLDivElement, DividerProps>(
  ({ className, ...props }, ref) => (
    <FoldDivider
      ref={ref}
      className={className}
      {...props}
    />
  )
);
Divider.displayName = 'List.Divider';

/** Fixed bottom row beneath the list body */
const Footer = React.forwardRef<HTMLElement, FooterComponentProps>(
  ({ align = 'center', children, className, ...props }, ref) => (
    <footer
      ref={ref}
      className={cn(styles.footer, className)}
      data-align={align}
      {...props}
    >
      {children}
    </footer>
  )
);
Footer.displayName = 'List.Footer';

// Compound component
const List = Object.assign(Container, {
  Header,
  Item: null as any, // Set in index.ts
  Checkbox: null as any,
  CheckboxIndicator: null as any,
  Switch: null as any,
  Input: null as any,
  Select: null as any,
  Media: null as any,
  Desc: null as any,
  ActionGroup,
  Divider,
  Footer,
});

export { Container, Header, ActionGroup, Divider, Footer };
