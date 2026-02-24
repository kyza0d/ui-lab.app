import React from 'react';
import type { SectionMetadata } from '../../types';
import { createSectionSkeleton } from '../utils/create-section-skeleton.js';
import variationsData from './variations.json' with { type: 'json' };

const baseMetadata = {
  id: 'testimonials',
  name: 'Testimonials',
  description: 'Social proof and customer testimonials to build trust and credibility',
  category: 'testimonials' as const,
  tags: ['testimonials', 'social-proof', 'reviews', 'trust'],
  layout: {
    layoutClass: 'testimonials',
    columnSpan: 1,
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
        {createSectionSkeleton('testimonials')}
      </div>
    </div>
  );
}

export const metadata = baseMetadata;
export default sectionMetadata;
