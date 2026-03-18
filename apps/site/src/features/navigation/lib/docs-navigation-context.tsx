'use client';

import { createContext, useContext } from 'react';

import type { DocsNavigationData } from './sidebar-registry-resolver';

const EMPTY_DOCS_NAVIGATION_DATA: DocsNavigationData = {
  docs: {
    pageTree: [],
    pages: [],
  },
  'design-system': {
    pageTree: [],
    pages: [],
  },
};

const DocsNavigationContext = createContext<DocsNavigationData>(EMPTY_DOCS_NAVIGATION_DATA);

interface DocsNavigationProviderProps {
  children: React.ReactNode;
  data: DocsNavigationData;
}

export function DocsNavigationProvider({ children, data }: DocsNavigationProviderProps) {
  return (
    <DocsNavigationContext.Provider value={data}>
      {children}
    </DocsNavigationContext.Provider>
  );
}

export function useDocsNavigationData() {
  return useContext(DocsNavigationContext);
}
