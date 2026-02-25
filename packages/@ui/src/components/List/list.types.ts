import React from 'react';
import { DividerProps } from '@/components/Divider';

// Ref API for List
export interface ListRef {
  /** Moves keyboard highlight to the next item */
  focusNext: () => void;
  /** Moves keyboard highlight to the previous item */
  focusPrev: () => void;
  /** Moves keyboard highlight to the first item */
  focusFirst: () => void;
  /** Moves keyboard highlight to the last item */
  focusLast: () => void;
  /** Triggers selection of the currently highlighted item */
  selectHighlighted: () => void;
  /** Removes keyboard highlight from all items */
  clearHighlight: () => void;
  /** Returns the index of the currently highlighted item, or null if none */
  getHighlightedIndex: () => number | null;
}

// Keyboard navigation callbacks
export interface ListNavigateCallbacks {
  /** Called when the up arrow key is pressed */
  up?: () => void;
  /** Called when the down arrow key is pressed */
  down?: () => void;
  /** Called when the enter key is pressed */
  enter?: () => void;
  /** Called when the escape key is pressed */
  escape?: () => void;
}

// Root container props
export interface ListContainerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  /** Array of data items; length used for keyboard navigation bounds */
  items?: unknown[];
  /** Controls the visual style of the list */
  variant?: 'default' | 'feed';
  /** Controls the spacing between list items */
  spacing?: 'default' | 'sm';
  /** Keyboard navigation event callbacks */
  onNavigate?: ListNavigateCallbacks;
  children: React.ReactNode;
}

export interface ListHeaderProps extends React.HTMLAttributes<HTMLElement> {
  /** Whether the header sticks to the top while scrolling */
  sticky?: boolean;
  children: React.ReactNode;
}

// Item sub-component props
export interface ListItemProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Unique value identifier for this item */
  value?: string;
  /** Whether the item responds to hover and keyboard highlight */
  interactive?: boolean;
  /** Whether the item is in a selected state */
  selected?: boolean;
  children: React.ReactNode;
}

export interface ListCheckboxProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Whether the checkbox is checked */
  checked?: boolean;
  children?: React.ReactNode;
}

export interface ListMediaProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Child content for the media slot */
  children: React.ReactNode;
}

export interface ListDescProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Secondary description text content */
  children: React.ReactNode;
}

export interface ActionGroupComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Controls the horizontal alignment of action group items */
  justify?: 'flex-start' | 'space-between' | 'flex-end';
}

export interface ListActionGroupProps extends ActionGroupComponentProps {
  children: React.ReactNode;
}

export interface ListDividerProps extends DividerProps {}

export interface FooterComponentProps extends React.HTMLAttributes<HTMLElement> {
  /** Controls the horizontal alignment of footer content */
  align?: 'center' | 'flex-start' | 'flex-end';
}

export interface ListFooterProps extends FooterComponentProps {
  children: React.ReactNode;
}
