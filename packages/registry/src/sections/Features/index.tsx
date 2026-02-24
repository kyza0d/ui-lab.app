import React from 'react';
import type { SectionMetadata } from '../../types';
import { createSectionSkeleton } from '../utils/create-section-skeleton.js';
import variationsData from './variations.json' with { type: 'json' };

const baseMetadata = {
  id: 'features',
  name: 'Features',
  description: 'Showcase your product or service capabilities with compelling feature sections',
  category: 'features' as const,
  tags: ['features', 'capabilities', 'benefits', 'showcase'],
  layout: {
    layoutClass: 'features',
    columnSpan: 1,
    rowSpan: 4,
  },
  componentDependencies: [],
};

const sectionMetadata: SectionMetadata = {
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
    <div className="w-full h-full bg-gradient-to-br from-background-900 to-background-950 flex items-center justify-center p-4">
      <div className="flex items-center justify-center">
        {createSectionSkeleton('features')}
      </div>
    </div>
  );
}

export const metadata = baseMetadata;
export default sectionMetadata;
