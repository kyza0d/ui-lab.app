'use client';
import { GenericContentGrid } from '@/shared/components/generic-content-grid';
import { getLayoutConfig } from '../lib/layout-registry';
import { getPreviewComponent } from '../lib/get-section-preview';
import type { SectionMetadata } from 'ui-lab-registry';

interface SectionsGridClientProps {
  sections: SectionMetadata[];
}

export function SectionsGridClient({ sections }: SectionsGridClientProps) {
  return (
    <GenericContentGrid
      items={sections}
      basePath="/sections"
      getLayoutConfig={getLayoutConfig}
      getPreviewComponent={getPreviewComponent}
      showCTA={true}
      ctaContentType="sections"
    />
  );
}
