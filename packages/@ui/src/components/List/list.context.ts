'use client';

import React from 'react';

export interface ListContextValue {
  highlightedIndex: number | null;
  focusItem: (index: number) => void;
  registerItem: (ref: HTMLElement | null) => number;
  itemRefs: React.MutableRefObject<(HTMLElement | null)[]>;
}

export const ListContext = React.createContext<ListContextValue | undefined>(undefined);

export const useListContext = () => {
  const context = React.useContext(ListContext);
  if (!context) {
    throw new Error('List sub-components must be used within a List component');
  }
  return context;
};
