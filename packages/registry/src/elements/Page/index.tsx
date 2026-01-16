import React from 'react';
import type { ElementMetadata, LayoutConfig } from '../../types';
import variationsData from './variations.json';

const baseMetadata = {
  id: 'page',
  name: 'Page',
  description: 'A minimal page shell with header, main content area, and footer. Perfect starting point for any Next.js page.',
  category: 'layout' as const,
  tags: ['page', 'layout', 'template', 'shell'],
  layout: {
    layoutClass: 'page',
    columnSpan: 3,
    rowSpan: 7,
  },
  componentDependencies: [],
};

const elementMetadata: ElementMetadata = {
  ...baseMetadata,
  variants: Object.entries(variationsData).map(([_key, variation]: any) => ({
    name: variation.name,
    description: variation.description,
    demoPath: variation.demoPath,
    files: variation.files,
  })),
};

export function getPreview(): React.ReactNode {
  return (
    <div className="flex flex-col gap-1 w-full h-full">
      <div style={{ height: 28 }} className="w-full bg-background-900 border border-background-700 rounded-sm" />
      <div style={{ height: 24 }} className="w-full flex gap-2 px-2">
        <div style={{ width: 80, height: 16 }} className="bg-background-900 border border-background-700 rounded-sm" />
        <div style={{ flex: 1, height: 16 }} className="bg-background-900 border border-background-700 rounded-sm opacity-70" />
      </div>
      <div style={{ flex: 1 }} className="w-full bg-background-900 border border-background-700 rounded-sm" />
      <div style={{ height: 20 }} className="w-full bg-background-900 border border-background-700 rounded-sm opacity-60" />
    </div>
  );
}

export const metadata = baseMetadata;
export default elementMetadata;

export { BasicPage } from './variations';
export type { PageVariations } from './variations';

export { DEMO_MAP, variationComponentMap } from './variations';
