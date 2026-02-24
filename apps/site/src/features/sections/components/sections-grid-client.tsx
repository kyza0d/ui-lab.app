'use client';
import { GenericContentGrid } from '@/features/packages/components/generic-content-grid';
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
      getLayoutConfig={(item) => ({ ...getLayoutConfig(item), columnSpan: 1 })}
      getPreviewComponent={getPreviewComponent}
      showCTA={true}
      ctaContentType="sections"
    />
  );
}
