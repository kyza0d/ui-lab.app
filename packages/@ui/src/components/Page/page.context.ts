"use client"

import React from 'react';
import { PageContextValue } from './page.types';

export const PageContext = React.createContext<PageContextValue | null>(null);

export function usePageContext() {
  const context = React.useContext(PageContext);
  if (!context) {
    throw new Error('usePageContext must be used within Page');
  }
  return context;
}
