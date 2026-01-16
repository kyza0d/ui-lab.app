import React from 'react';
import type { ElementMetadata } from '../../types';
import variationsData from './variations.json';

const baseMetadata = {
  id: 'header',
  name: 'Header',
  description: 'Navigation header with branding and navigation elements. Provides a consistent top navigation bar for layouts.',
  category: 'navigation' as const,
  tags: ['header', 'navigation', 'layout', 'branding'],
  layout: {
    layoutClass: 'header',
    columnSpan: 3,
    rowSpan: 4,
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
    <div className="flex flex-col gap-2 w-full">
      <div style={{ height: 36 }} className="w-full gap-3 flex px-2 bg-background-900 items-center justify-between border border-background-700 rounded-sm">
        <div style={{ width: 32, height: 20 }} className="bg-background-700 rounded-sm" />
        <div className="flex gap-2">
          <div style={{ width: 16, height: 4 }} className="bg-background-700 rounded-sm opacity-60" />
          <div style={{ width: 16, height: 4 }} className="bg-background-700 rounded-sm opacity-60" />
          <div style={{ width: 16, height: 4 }} className="bg-background-700 rounded-sm opacity-60" />
        </div>
      </div>
    </div>
  );
}

export const metadata = baseMetadata;
export default elementMetadata;

export { BasicHeader } from './variations';
export type { HeaderVariations } from './variations';

export { DEMO_MAP, variationComponentMap } from './variations';
