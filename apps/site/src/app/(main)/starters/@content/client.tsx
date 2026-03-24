'use client';
import React from 'react';
import { getAllStarters } from 'ui-lab-registry';
import { GenericContentGrid } from '@/features/layout';
import { getLayoutConfig as getStarterLayoutConfig, getPreviewComponent as getStarterPreview } from '@/features/starters';
import { GridCTA } from '@/features/landing/components/grid-cta';
import type { StarterMetadata } from 'ui-lab-registry';

const placeholderStarters: StarterMetadata[] = [
  {
    id: 'premium-dashboard',
    name: 'Premium Dashboard',
    description: 'Full-featured enterprise dashboard with analytics, charts, and real-time data visualization.',
    category: 'dashboard',
    tags: ['premium', 'enterprise', 'dashboard', 'analytics'],
    files: [],
    pricing: { price: 99.99, gumroadProductId: 'premium-dashboard' },
    gumroadProductId: 'premium-dashboard',
    bundledElements: ['chart', 'analytics', 'data-table'],
  },
  {
    id: 'saas-landing',
    name: 'SaaS Landing',
    description: 'Modern SaaS landing page with conversion-optimized sections and responsive design.',
    category: 'landing',
    tags: ['saas', 'landing', 'conversion', 'premium'],
    files: [],
    pricing: { price: 79.99, gumroadProductId: 'saas-landing' },
    gumroadProductId: 'saas-landing',
    bundledElements: ['hero', 'cta', 'testimonials'],
  }
];

export default function StartersPage() {
  const allStarters = getAllStarters();
  const combinedStarters = [...allStarters, ...placeholderStarters];
  const previews: Record<string, React.ReactNode> = {};
  const layoutConfigs: Record<string, import('ui-lab-registry').LayoutConfig> = {};
  for (const starter of combinedStarters) {
    const C = getStarterPreview(starter.id);
    if (C) previews[starter.id] = <C />;
    layoutConfigs[starter.id] = { ...getStarterLayoutConfig(starter), columnSpan: 1 };
  }

  return (
    <div className='mt-20 pt-(header-height)  pointer-events-none'>
      <div className="w-full bg-background-950 px-4 mx-auto pb-12">
        <div className="relative overflow-hidden h-screen">
          <div className="space-y-6">
            <GenericContentGrid
              items={combinedStarters}
              basePath="/starters"
              layoutConfigs={layoutConfigs}
              previews={previews}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-background-950/60 from-0% via-background-950/90 via-40% to-background-950 pointer-events-none z-20" />
          <div className="absolute left-0 right-0 top-1/3 -translate-y-1/2 flex justify-center z-30 pointer-events-auto px-6 py-16">
            <GridCTA contentType="starters" />
          </div>
        </div>
      </div>
    </div>
  );
}
