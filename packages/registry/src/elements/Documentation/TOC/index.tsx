import React from 'react';
import type { ElementMetadata } from '../../../types';
import variationsData from './variations.json';

const baseMetadata = {
  id: 'toc',
  name: 'Table of Contents',
  description: 'Hierarchical document navigation component for displaying table of contents with nested sections.',
  category: 'documentation' as const,
  tags: ['toc', 'navigation', 'documentation', 'outline'],
  layout: {
    layoutClass: 'toc',
    columnSpan: 2,
    rowSpan: 2,
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
    <div className="flex flex-col gap-2 w-full h-full p-3 bg-background-900 rounded-sm border border-background-700">
      <div className="space-y-2 text-xs">
        <div className="font-semibold text-foreground-200 mb-2">Contents</div>
        <div className="text-foreground-400">• Introduction</div>
        <div className="ml-3 text-foreground-500 text-xs">◦ Overview</div>
        <div className="ml-3 text-foreground-500 text-xs">◦ Getting Started</div>
        <div className="text-foreground-400">• Installation</div>
        <div className="text-foreground-400">• Usage</div>
        <div className="ml-3 text-foreground-500 text-xs">◦ Basic</div>
      </div>
    </div>
  );
}

export const metadata = baseMetadata;
export default elementMetadata;

export { BasicTOC } from './variations';
export type { TOCVariations } from './variations';

export { DEMO_MAP, variationComponentMap } from './variations';
