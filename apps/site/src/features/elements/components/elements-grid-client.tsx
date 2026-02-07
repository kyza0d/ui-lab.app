'use client';
import { GenericContentGrid } from '@/features/elements/components/generic-content-grid';
import { getLayoutConfig } from '../lib/layout-registry';
import { getPreviewComponent } from '@/features/elements/lib/get-element-preview';
import type { ElementMetadata } from 'ui-lab-registry';

interface ElementsGridClientProps {
  elements: ElementMetadata[];
  packageId?: string;
}

export function ElementsGridClient({ elements, packageId }: ElementsGridClientProps) {
  const basePath = packageId ? `/elements/${packageId}` : '/elements';
  return (
    <GenericContentGrid
      items={elements}
      basePath={basePath}
      getLayoutConfig={getLayoutConfig}
      getPreviewComponent={getPreviewComponent}
    />
  );
}
