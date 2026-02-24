'use client';

import { GenericContentGrid } from '@/features/packages/components/generic-content-grid';
import { getPatternLayoutConfig } from '../lib/pattern-layout-config';
import { getPreviewComponent } from '../lib/get-pattern-preview';
import type { PatternMetadata } from 'ui-lab-registry';

const CATEGORY_LABELS: Record<string, string> = {
  'layout': 'Layout',
  'form': 'Form',
  'data': 'Data Display',
  'interaction': 'Interaction',
  'feedback': 'Feedback',
};

interface PatternsGridClientProps {
  patterns: PatternMetadata[];
}

export function PatternsGridClient({ patterns }: PatternsGridClientProps) {
  return (
    <GenericContentGrid
      items={patterns}
      basePath="/patterns"
      getLayoutConfig={getPatternLayoutConfig}
      getPreviewComponent={(id) => getPreviewComponent(id)}
      getCategory={(item) => item.category}
      categoryLabels={CATEGORY_LABELS}
    />
  );
}
