'use client';
import { GenericContentGrid } from '@/shared/components/generic-content-grid';
import { getLayoutConfig } from '../lib/layout-registry';
import { getPreviewComponent } from '../lib/get-starter-preview';
import type { StarterMetadata } from 'ui-lab-registry';

interface StartersGridClientProps {
  starters: StarterMetadata[];
}

export function StartersGridClient({ starters }: StartersGridClientProps) {
  return (
    <GenericContentGrid
      items={starters}
      basePath="/starters"
      getLayoutConfig={getLayoutConfig}
      getPreviewComponent={getPreviewComponent}
      showCTA={true}
      ctaContentType="starters"
    />
  );
}
