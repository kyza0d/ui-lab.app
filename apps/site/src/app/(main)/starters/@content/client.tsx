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
    <div className='mt-20 pt-(header-height)'>
      <div className="w-full bg-background-950 px-4 mx-auto pb-12">
        <div className="relative overflow-hidden">
          <div className="space-y-6">
            <GenericContentGrid
              items={combinedStarters}
              basePath="/starters"
              layoutConfigs={layoutConfigs}
              previews={previews}
            />
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-[200px]  pointer-events-none bg-gradient-to-b from-transparent from-0% via-background-950 via-70% to-background-950 to-100%" />
        </div>
        <div className="-mt-60 relative z-10 px-6 py-16">
          <GridCTA contentType="starters" />
        </div>
      </div>
    </div>
  );
}
