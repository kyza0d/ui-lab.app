'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Divider as FoldDivider } from '@/components/Divider';
import styles from './List.module.css';
import {
  ListContainerProps,
  ListHeaderProps,
  ListItemProps,
  ListActionGroupProps,
  ListDividerProps,
  ListFooterProps,
} from './list.types';

const Container = React.forwardRef<HTMLDivElement, ListContainerProps>(
  ({ ariaLabel, variant = 'default', children, className, onSelect, ...props }, ref) => (
    <div
      ref={ref}
      role="list"
      aria-label={ariaLabel}
      className={cn(styles.container, className)}
      data-variant={variant}
      {...(props as React.HTMLAttributes<HTMLDivElement>)}
    >
      {children}
    </div>
  )
);
Container.displayName = 'List.Container';

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

const Item = React.forwardRef<HTMLElement, ListItemProps>(
  ({ selected, interactive, onClick, children, className, ...props }, ref) => (
    <article
      ref={ref}
      className={cn(styles.item, className)}
      data-interactive={interactive ? 'true' : 'false'}
      data-selected={selected ? 'true' : 'false'}
      onClick={onClick}
      {...props}
    >
      {children}
    </article>
  )
);
Item.displayName = 'List.Item';

const ActionGroup = React.forwardRef<HTMLDivElement, ListActionGroupProps>(
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

const Divider = React.forwardRef<HTMLDivElement, ListDividerProps>(
  ({ className, ...props }, ref) => (
    <FoldDivider
      ref={ref}
      className={className}
      {...props}
    />
  )
);
Divider.displayName = 'List.Divider';

const Footer = React.forwardRef<HTMLElement, ListFooterProps>(
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
  Item,
  ActionGroup,
  Divider,
  Footer,
});

export { List, Container, Header, Item, ActionGroup, Divider, Footer };
export type {
  ListContainerProps,
  ListHeaderProps,
  ListItemProps,
  ListActionGroupProps,
  ListDividerProps,
  ListFooterProps,
};
