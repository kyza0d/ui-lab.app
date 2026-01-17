import React from 'react';
import type { SectionMetadata } from '../../types';

const baseMetadata = {
  id: 'hero',
  name: 'Hero',
  description: 'Eye-catching introductory sections that establish visual hierarchy and guide user action. Perfect for landing pages and key entry points.',
  category: 'hero' as const,
  tags: ['hero', 'landing', 'cta', 'visual'],
  layout: {
    layoutClass: 'hero',
    columnSpan: 5,
    rowSpan: 6,
  },
  componentDependencies: ['Button'],
  fullPageLayout: true,
};

const sectionMetadata: SectionMetadata = {
  ...baseMetadata,
  variants: [
    {
      name: 'Simple Hero',
      description: 'Clean hero section with headline, subheading, and dual CTA buttons',
      demoPath: 'hero-simple',
    },
    {
      name: 'Hero with CTA',
      description: 'Alternating layout with feature highlights and visual representation',
      demoPath: 'hero-with-cta',
    },
  ],
};

export function getPreview(): React.ReactNode {
  return (
    <div className="w-full h-full bg-gradient-to-br from-background-900 to-background-950 flex items-center justify-center p-4">
      <div className="text-center space-y-2">
        <div className="text-xs text-foreground-500 uppercase tracking-widest">Hero Section</div>
        <div className="h-2 w-32 bg-background-700 rounded mx-auto opacity-60" />
        <div className="h-1.5 w-24 bg-background-700 rounded mx-auto opacity-40" />
      </div>
    </div>
  );
}

export const metadata = baseMetadata;
export default sectionMetadata;
