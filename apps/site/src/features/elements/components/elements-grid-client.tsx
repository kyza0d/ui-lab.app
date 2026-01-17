'use client';
import { GenericGridClient } from '@/shared/components/generic-grid-client';
import { getLayoutConfig } from '../lib/layout-registry';
import { getPreviewComponent } from '@/features/elements/lib/get-element-preview';
import type { ElementMetadata } from 'ui-lab-registry';

interface ElementsGridClientProps {
  elements: ElementMetadata[];
}

export function ElementsGridClient({ elements }: ElementsGridClientProps) {
  return (
    <GenericGridClient<ElementMetadata>
      items={elements}
      getLayoutConfig={getLayoutConfig}
      getPreviewComponent={(element) => getPreviewComponent(element.id)}
      getItemPath={(element) => `/elements/${element.id}`}
      renderItemHeader={(element) => (
        <div className="flex items-start justify-between gap-2">
          <div>
            <strong className="font-semibold text-foreground-50">{element.name}</strong>
            <p className="text-sm text-foreground-400 mt-0.5 line-clamp-2">{element.description}</p>
          </div>
        </div>
      )}
    />
  );
}
