'use client';

import React from 'react';
import { cn } from '@/lib/utils';
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

// Ref container for keyboard navigation
const Container = React.forwardRef<ListRef, ListContainerProps>(
  ({ items = [], variant = 'default', spacing = 'default', onNavigate, children, className, ...props }, ref) => {
    const [highlightedIndex, setHighlightedIndex] = React.useState<number | null>(null);
    const [isKeyboardMode, setIsKeyboardMode] = React.useState(false);
    const itemRefsContainer = React.useRef<(HTMLElement | null)[]>([]);
    const itemCountRef = React.useRef(0);
    const prevItemsLengthRef = React.useRef(items.length);

    // Reset counter if items length changes significantly
    if (items.length !== prevItemsLengthRef.current) {
      itemCountRef.current = 0;
      itemRefsContainer.current = [];
      prevItemsLengthRef.current = items.length;
    }

    // Expose ref methods for keyboard navigation
    React.useImperativeHandle(ref, () => ({
      focusNext: () => {
        setIsKeyboardMode(true);
        setHighlightedIndex((prev) => {
          const next = prev === null ? 0 : Math.min(prev + 1, items.length - 1);
          onNavigate?.down?.();
          return next;
        });
      },
      focusPrev: () => {
        setIsKeyboardMode(true);
        setHighlightedIndex((prev) => {
          const next = prev === null ? items.length - 1 : Math.max(prev - 1, 0);
          onNavigate?.up?.();
          return next;
        });
      },
      focusFirst: () => {
        setIsKeyboardMode(true);
        setHighlightedIndex(0);
        onNavigate?.down?.();
      },
      focusLast: () => {
        setIsKeyboardMode(true);
        setHighlightedIndex(items.length - 1);
        onNavigate?.up?.();
      },
      selectHighlighted: () => {
        onNavigate?.enter?.();
      },
      clearHighlight: () => {
        setHighlightedIndex(null);
      },
      getHighlightedIndex: () => highlightedIndex,
    }), [highlightedIndex, items.length, onNavigate]);

    React.useEffect(() => {
      const el = highlightedIndex !== null ? itemRefsContainer.current[highlightedIndex] : null;
      if (!el) return;
      let scroller: HTMLElement | null = el.parentElement;
      while (scroller && scroller !== document.body && scroller.scrollHeight <= scroller.clientHeight) {
        scroller = scroller.parentElement;
      }
      if (!scroller || scroller === document.body) return;
      const scrollerRect = scroller.getBoundingClientRect();
      const itemRect = el.getBoundingClientRect();
      const buffer = el.offsetHeight * 2;
      const itemTop = itemRect.top - scrollerRect.top;
      const itemBottom = itemRect.bottom - scrollerRect.top;
      if (itemTop < buffer) {
        scroller.scrollTo({ top: Math.max(0, scroller.scrollTop + itemTop - buffer), behavior: 'smooth' });
      } else if (itemBottom > scroller.clientHeight - buffer) {
        scroller.scrollTo({ top: scroller.scrollTop + itemBottom - scroller.clientHeight + buffer, behavior: 'smooth' });
      }
    }, [highlightedIndex]);

    const registerItem = React.useCallback((ref: HTMLElement | null) => {
      const index = itemCountRef.current;
      itemRefsContainer.current[index] = ref;
      itemCountRef.current++;
      return index;
    }, [items.length]);

    const contextValue = React.useMemo(
      () => ({
        highlightedIndex,
        isKeyboardMode,
        focusItem: (index: number) => {
          setIsKeyboardMode(false);
          setHighlightedIndex(index);
        },
        registerItem,
        itemRefs: itemRefsContainer,
      }),
      [highlightedIndex, isKeyboardMode, registerItem]
    );

    return (
      <ListContext.Provider value={contextValue}>
        <div
          role="list"
          className={cn(styles.container, className)}
          data-variant={variant}
          data-spacing={spacing}
          data-keyboard-mode={isKeyboardMode ? 'true' : undefined}
          {...(props as React.HTMLAttributes<HTMLDivElement>)}
        >
          {children}
        </div>
      </ListContext.Provider>
    );
  }
);
Container.displayName = 'List';

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
  Media: null as any,
  Desc: null as any,
  ActionGroup,
  Divider,
  Footer,
});

export { List, Container, Header, ActionGroup, Divider, Footer };
export type { ListRef };
