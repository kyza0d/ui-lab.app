import React from 'react';
import type { ElementMetadata } from '../../../types';
import variationsData from './variations.json' with { type: 'json' };

const baseMetadata = {
  id: 'carousel',
  name: 'Carousel',
  description: 'Carousel component for displaying content in a rotating manner.',
  category: 'display' as const,
  tags: ['carousel', 'slider', 'gallery', 'rotation'],
  layout: {
    layoutClass: 'carousel',
    columnSpan: 3,
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
        {/* Carousel placeholder preview */}
      </div>
    </div>
  );
}

export const metadata = baseMetadata;
export default elementMetadata;

export { BasicCarousel } from './variations/index.js';
export type { CarouselVariations } from './variations/index.js';

export { DEMO_MAP, variationComponentMap } from './variations/index.js';
