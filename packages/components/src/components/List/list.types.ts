import React from 'react';

export interface ListContainerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  ariaLabel: string;
  variant?: 'default' | 'feed';
  onSelect?: (id: string | number) => void;
  children: React.ReactNode;
}

export interface ListHeaderProps extends React.HTMLAttributes<HTMLElement> {
  sticky?: boolean;
  children: React.ReactNode;
}

export interface ListItemProps extends React.HTMLAttributes<HTMLElement> {
  selected?: boolean;
  interactive?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  children: React.ReactNode;
}

export interface ListActionGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  justify?: 'flex-start' | 'space-between' | 'flex-end';
  children: React.ReactNode;
}

export interface ListDividerProps extends React.HTMLAttributes<HTMLHRElement> {}

export interface ListFooterProps extends React.HTMLAttributes<HTMLElement> {
  align?: 'center' | 'flex-start' | 'flex-end';
  children: React.ReactNode;
}
