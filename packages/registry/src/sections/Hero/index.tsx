import React from 'react';
import type { SectionMetadata } from '../../types';
import { createSectionSkeleton } from '../utils/create-section-skeleton.js';
import variationsData from './variations.json' with { type: 'json' };

const baseMetadata = {
  id: 'hero',
  name: 'Hero',
  description: 'Eye-catching introductory sections that establish visual hierarchy and guide user action. Perfect for landing pages and key entry points.',
  category: 'hero' as const,
  tags: ['hero', 'landing', 'cta', 'visual'],
  layout: {
    layoutClass: 'hero',
    columnSpan: 4,
    rowSpan: 4,
  },
  componentDependencies: ['Button'],
  fullPageLayout: true,
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
        {createSectionSkeleton('hero')}
      </div>
    </div>
  );
}

export const metadata = baseMetadata;
export default sectionMetadata;

export { SimpleHero, HeroWithCTA } from './variations/index.js';
export { DEMO_MAP } from './variations/index.js';
