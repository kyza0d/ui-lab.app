'use client';
import { GenericGridClient } from '@/shared/components/generic-grid-client';
import { getLayoutConfig } from '../lib/layout-registry';
import { getPreviewComponent } from '../lib/get-section-preview';
import type { SectionMetadata } from 'ui-lab-registry';

interface SectionsGridClientProps {
  sections: SectionMetadata[];
}

export function SectionsGridClient({ sections }: SectionsGridClientProps) {
  return (
    <GenericGridClient<SectionMetadata>
      items={sections}
      getLayoutConfig={getLayoutConfig}
      getPreviewComponent={(section) => getPreviewComponent(section.id)}
      getItemPath={(section) => `/sections/${section.id}`}
      renderItemHeader={(section) => (
        <div className="flex items-start justify-between gap-2">
          <div>
            <strong className="font-semibold text-foreground-50">{section.name}</strong>
            <p className="text-sm text-foreground-400 mt-0.5 line-clamp-2">{section.description}</p>
          </div>
        </div>
      )}
    />
  );
}
