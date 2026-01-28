import React from 'react';
import type { ElementMetadata } from '../../../types';
import variationsData from './variations.json';

const baseMetadata = {
  id: 'copypage',
  name: 'Copy Page',
  description: 'Component with button to copy current page content to clipboard with visual feedback.',
  category: 'other' as const,
  tags: ['copy', 'clipboard', 'utility', 'documentation'],
  layout: {
    layoutClass: 'copy-page',
    columnSpan: 1,
    rowSpan: 1,
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
    <div className="flex items-center justify-center w-full h-full p-3 bg-background-900 rounded-sm border border-background-700">
      <button className="px-3 py-2 bg-accent-500 text-foreground-50 text-xs font-medium rounded hover:bg-accent-600 transition-colors flex items-center gap-2">
        <span>📋</span>
        Copy
      </button>
    </div>
  );
}

export const metadata = baseMetadata;
export default elementMetadata;

export { BasicCopyPage } from './variations';
export type { CopyPageVariations } from './variations';

export { DEMO_MAP, variationComponentMap } from './variations';
