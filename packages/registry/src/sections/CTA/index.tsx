import React from 'react';
import type { SectionMetadata } from '../../types';
import { createSectionSkeleton } from '../utils/create-section-skeleton';
import variationsData from './variations.json';

const baseMetadata = {
  id: 'cta',
  name: 'CTA',
  description: 'Call-to-action sections designed to drive user engagement and conversions',
  category: 'cta' as const,
  tags: ['cta', 'conversion', 'action', 'engagement'],
  layout: {
    layoutClass: 'cta',
    columnSpan: 4,
    rowSpan: 3,
  },
  componentDependencies: ['Button'],
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
        {createSectionSkeleton('cta')}
      </div>
    </div>
  );
}

export const metadata = baseMetadata;
export default sectionMetadata;
