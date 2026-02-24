import React from 'react';
import type { ElementMetadata } from '../../../types';
import variationsData from './variations.json' with { type: 'json' };

const baseMetadata = {
  id: 'nextarticle',
  name: 'Next Article',
  description: 'Navigation component showing link to next article with title and preview description.',
  category: 'navigation' as const,
  tags: ['navigation', 'article', 'documentation', 'cta'],
  layout: {
    layoutClass: 'next-article',
    columnSpan: 2,
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
    <div className="flex items-center justify-between w-full h-full p-4 bg-background-900 rounded-sm border border-background-700 cursor-pointer hover:bg-background-800 transition-colors">
      <div className="flex-1">
        <div className="text-xs text-foreground-400 mb-1">Next Article</div>
        <div className="text-sm font-medium text-foreground-200">Advanced Setup Guide</div>
      </div>
      <div className="text-foreground-400">→</div>
    </div>
  );
}

export const metadata = baseMetadata;
export default elementMetadata;

export { BasicNextArticle } from './variations/index.js';
export type { NextArticleVariations } from './variations/index.js';

export { DEMO_MAP, variationComponentMap } from './variations/index.js';
