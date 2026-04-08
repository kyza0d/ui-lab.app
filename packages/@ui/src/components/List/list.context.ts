'use client';

import React from 'react';

interface SetFocusedItemOptions {
  enterFocusMode?: boolean;
  scroll?: boolean;
}

interface ListContextValue {
  focusedItem: HTMLElement | null;
  isFocusMode: boolean;
  rootRef: React.MutableRefObject<HTMLDivElement | null>;
  setFocusedItem: (item: HTMLElement | null, options?: SetFocusedItemOptions) => void;
  focusAdjacentItem: (currentItem: HTMLElement | null, direction: 1 | -1, scroll?: boolean) => boolean;
  focusBoundaryItem: (position: 'first' | 'last', scroll?: boolean) => boolean;
}

export const ListContext = React.createContext<ListContextValue | undefined>(undefined);

export const useListContext = () => {
  const context = React.useContext(ListContext);
  if (!context) {
    throw new Error('List sub-components must be used within a List component');
  }
  return context;
};
