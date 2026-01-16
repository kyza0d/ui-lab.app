import React from 'react';
import type { ElementMetadata } from '../../types';
import variationsData from './variations.json';

const baseMetadata = {
  id: 'sidebar',
  name: 'Sidebar',
  description: 'Vertical navigation sidebar for layouts. Provides organized navigation links and supports collapsible menu items.',
  category: 'navigation' as const,
  tags: ['sidebar', 'navigation', 'menu', 'layout'],
  layout: {
    layoutClass: 'sidebar',
    columnSpan: 2,
    rowSpan: 12,
  },
  componentDependencies: [],
};

// Build complete ElementMetadata from variations.json
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
    <div className="flex flex-col gap-2 w-full h-full p-2 bg-background-950 border border-background-700 rounded-sm">
      <div style={{ height: 32 }} className="w-full bg-background-900 border border-background-700 rounded-sm" />
      <div className="flex flex-col gap-1">
        <div style={{ height: 6 }} className="w-full bg-background-700 rounded-sm opacity-70" />
        <div style={{ height: 6 }} className="w-3/4 bg-background-700 rounded-sm opacity-60" />
      </div>
      <div className="flex flex-col gap-1 mt-2">
        <div style={{ height: 6 }} className="w-full bg-background-700 rounded-sm opacity-70" />
        <div style={{ height: 6 }} className="w-5/6 bg-background-700 rounded-sm opacity-60" />
      </div>
      <div className="flex flex-col gap-1 mt-2">
        <div style={{ height: 6 }} className="w-full bg-background-700 rounded-sm opacity-70" />
        <div style={{ height: 6 }} className="w-4/5 bg-background-700 rounded-sm opacity-60" />
      </div>
    </div>
  );
}

export const metadata = baseMetadata;
export default elementMetadata;

export { BasicSidebar } from './variations';
export type { SidebarVariations } from './variations';

export { DEMO_MAP, variationComponentMap } from './variations';
