import React from 'react';
import type { ElementMetadata } from '../../../types';
import variationsData from './variations.json' with { type: 'json' };

const baseMetadata = {
  id: 'tree-view',
  name: 'Tree View',
  description: 'Hierarchical tree view component for displaying nested data structures.',
  category: 'data-display' as const,
  tags: ['tree', 'hierarchy', 'nested', 'navigation'],
  layout: {
    layoutClass: 'tree-view',
    columnSpan: 2,
    rowSpan: 3,
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
      <div className="p-2 bg-background-900 rounded-sm border border-background-700">
        {/* TreeView placeholder preview */}
      </div>
    </div>
  );
}

export const metadata = baseMetadata;
export default elementMetadata;

export { BasicTreeView } from './variations/index.js';
export type { TreeViewVariations } from './variations/index.js';

export { DEMO_MAP, variationComponentMap } from './variations/index.js';
