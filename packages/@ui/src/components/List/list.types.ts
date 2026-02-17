import React from 'react';
import { DividerProps } from '@/components/Divider';

// Ref API for List
export interface ListRef {
  focusNext: () => void;
  focusPrev: () => void;
  focusFirst: () => void;
  focusLast: () => void;
  selectHighlighted: () => void;
  clearHighlight: () => void;
  getHighlightedIndex: () => number | null;
}

// Keyboard navigation callbacks
export interface ListNavigateCallbacks {
  up?: () => void;
  down?: () => void;
  enter?: () => void;
  escape?: () => void;
}

// Root container props
export interface ListContainerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  items?: unknown[];
  variant?: 'default' | 'feed';
  spacing?: 'default' | 'sm';
  onNavigate?: ListNavigateCallbacks;
  children: React.ReactNode;
}

export interface ListHeaderProps extends React.HTMLAttributes<HTMLElement> {
  sticky?: boolean;
  children: React.ReactNode;
}

// Item sub-component props
export interface ListItemProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  children: React.ReactNode;
}

export interface ListCheckboxProps extends React.HTMLAttributes<HTMLDivElement> {
  checked?: boolean;
  children?: React.ReactNode;
}

export interface ListMediaProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export interface ListDescProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export interface ActionGroupComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  justify?: 'flex-start' | 'space-between' | 'flex-end';
}

export interface ListActionGroupProps extends ActionGroupComponentProps {
  children: React.ReactNode;
}

export interface ListDividerProps extends DividerProps {}

export interface FooterComponentProps extends React.HTMLAttributes<HTMLElement> {
  align?: 'center' | 'flex-start' | 'flex-end';
}

export interface ListFooterProps extends FooterComponentProps {
  children: React.ReactNode;
}
