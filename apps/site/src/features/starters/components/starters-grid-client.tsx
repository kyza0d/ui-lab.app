'use client';
import { GenericContentGrid } from '@/features/packages/components/generic-content-grid';
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
      getLayoutConfig={(item) => ({ ...getLayoutConfig(item), columnSpan: 1 })}
      getPreviewComponent={getPreviewComponent}
      showCTA={true}
      ctaContentType="starters"
    />
  );
}
