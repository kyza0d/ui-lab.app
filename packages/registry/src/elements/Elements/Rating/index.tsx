import React from 'react';
import type { ElementMetadata } from '../../../types';
import variationsData from './variations.json' with { type: 'json' };

const baseMetadata = {
  id: 'rating',
  name: 'Rating',
  description: 'Star rating component for user feedback and reviews.',
  category: 'input' as const,
  tags: ['rating', 'stars', 'feedback', 'review'],
  layout: {
    layoutClass: 'rating',
    columnSpan: 1,
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
    <div className="flex flex-col gap-2 w-full">
      <div className="p-2 bg-background-900 rounded-sm border border-background-700">
        {/* Rating placeholder preview */}
      </div>
    </div>
  );
}

export const metadata = baseMetadata;
export default elementMetadata;

export { BasicRating } from './variations/index.js';
export type { RatingVariations } from './variations/index.js';

export { DEMO_MAP, variationComponentMap } from './variations/index.js';
