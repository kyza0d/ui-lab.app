import React from 'react';

export type PagePadding = 'none' | 'sm' | 'md' | 'lg' | 'xl';

export interface PageContextValue {
  pageWidth: string | number | undefined;
  isMobile: boolean;
  pageMaxWidth: string | number | undefined;
  pagePadding: PagePadding;
}

export interface PageProps extends React.HTMLAttributes<HTMLDivElement> {
  maxWidth?: string | number;
  padding?: PagePadding;
  centered?: boolean;
  fullscreen?: boolean;
  children: React.ReactNode;
}
