'use client';
import { GenericContentGrid } from '@/shared/components/generic-content-grid';
import { getLayoutConfig } from '../lib/layout-registry';
import { getPreviewComponent } from '@/features/elements/lib/get-element-preview';
import type { ElementMetadata } from 'ui-lab-registry';

interface ElementsGridClientProps {
  elements: ElementMetadata[];
}

export function ElementsGridClient({ elements }: ElementsGridClientProps) {
  return (
    <GenericContentGrid
      items={elements}
      basePath="/elements"
      getLayoutConfig={getLayoutConfig}
      getPreviewComponent={getPreviewComponent}
    />
  );
}
