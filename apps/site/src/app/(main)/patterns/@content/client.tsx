'use client';
import React from 'react';
import { getAllPatterns } from 'ui-lab-registry';
import { GenericContentGrid } from '@/features/layout';
import { getPatternLayoutConfig, getPatternPreviewComponent } from '@/features/patterns';

const CATEGORY_LABELS: Record<string, string> = {
  'layout': 'Layout',
  'form': 'Form',
  'data': 'Data Display',
  'interaction': 'Interaction',
  'feedback': 'Feedback',
};

export default function PatternsPage() {
  const patterns = getAllPatterns();
  const previews: Record<string, React.ReactNode> = {};
  const layoutConfigs: Record<string, import('ui-lab-registry').LayoutConfig> = {};
  for (const pattern of patterns) {
    const C = getPatternPreviewComponent(pattern.id);
    if (C) previews[pattern.id] = <C />;
    layoutConfigs[pattern.id] = getPatternLayoutConfig(pattern);
  }

  return (
    <div className='mt-20 pt-(header-height)'>
      <div className="w-full bg-background-950 px-4 mx-auto pb-12">
        <GenericContentGrid
          items={patterns}
          basePath="/patterns"
          layoutConfigs={layoutConfigs}
          previews={previews}
          getCategory={(item) => item.category}
          categoryLabels={CATEGORY_LABELS}
        />
      </div>
    </div>
  );
}
