import React from 'react';

export type PagePadding = 'none' | 'sm' | 'md' | 'lg' | 'xl';

export interface PageContextValue {
  pageWidth: string | number | undefined;
  isMobile: boolean;
  pageMaxWidth: string | number | undefined;
  pagePadding: PagePadding;
}

export interface PageProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Maximum width of the page content area */
  maxWidth?: string | number;
  /** Controls the internal padding of the page */
  padding?: PagePadding;
  /** Whether the page content is horizontally centered */
  centered?: boolean;
  /** Whether the page expands to fill the full viewport */
  fullscreen?: boolean;
  children: React.ReactNode;
}
