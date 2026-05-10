'use client';
import React from 'react';
import { getAllPatterns } from 'ui-lab-registry';
import { GenericContentGrid } from '@/features/layout';
import { getPatternLayoutConfig, getPatternPreviewComponent } from '@/features/patterns';
import { GridCTA } from '@/features/landing/components/grid-cta';

export default function PatternsPage() {
  const patterns = getAllPatterns();
  const previews: Record<string, React.ReactNode> = {};
  const layoutConfigs: Record<string, import('ui-lab-registry').LayoutConfig> = {};
  for (const pattern of patterns) {
    const C = getPatternPreviewComponent(pattern.id);
    if (C) previews[pattern.id] = <C />;
    layoutConfigs[pattern.id] = { ...getPatternLayoutConfig(pattern), columnSpan: 1 };
  }

  return (
    <div className='pointer-events-none mt-20 pt-(header-height)'>
      <div className="w-full bg-background-950 px-4 mx-auto pb-12">
        <div className="relative overflow-hidden h-screen">
          <div className="space-y-6">
            <GenericContentGrid
              items={patterns}
              basePath="/patterns"
              layoutConfigs={layoutConfigs}
              previews={previews}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-background-950/60 from-0% via-background-950/90 via-40% to-background-950 pointer-events-none z-20" />
          <div className="absolute left-0 right-0 top-1/3 -translate-y-1/2 flex justify-center z-30 pointer-events-auto px-6 py-16">
            <GridCTA contentType="patterns" />
          </div>
        </div>
      </div>
    </div>
  );
}
