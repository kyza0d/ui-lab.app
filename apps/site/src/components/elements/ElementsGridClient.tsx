'use client';
import { useRouter } from 'next/navigation';
import { Gallery } from 'ui-lab-components';
import { getDemoComponent } from '@/lib/get-element-demo';
import { getLayoutConfig } from '@/lib/layout-registry';
import { PreviewContainer } from './PreviewContainer';
import type { ElementMetadata } from 'ui-lab-registry';

interface ElementsGridClientProps {
  elements: ElementMetadata[];
}

export function ElementsGridClient({ elements }: ElementsGridClientProps) {
  const router = useRouter();

  if (elements.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-foreground-400">No elements found matching your filters.</p>
      </div>
    );
  }

  return (
    <Gallery columns={5} gap="1.5rem">
      {elements.map((element) => {
        const layoutConfig = getLayoutConfig(element);
        const firstVariant = element.variants[0];
        const Element = firstVariant?.demoPath ? getDemoComponent(firstVariant.demoPath) : null;
        const adaptiveProps = layoutConfig.previewConfig?.adaptiveProps ?? {};

        return (
          <Gallery.Item
            key={element.id}
            columnSpan={layoutConfig.columnSpan}
            rowSpan={layoutConfig.rowSpan}
            onPress={() => router.push(`/elements/${element.id}`)}
            className="overflow-hidden hover:border-accent-500 transition-colors"
          >
            <PreviewContainer element={element} layoutConfig={layoutConfig}>
              {Element ? (<Element {...adaptiveProps} />) : (
                <div className="text-foreground-500">Preview</div>
              )}
            </PreviewContainer>
            <Gallery.Body className="p-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <strong className="font-semibold text-foreground-50">{element.name}</strong>
                  <p className="text-sm text-foreground-400 mt-0.5 line-clamp-2">{element.description}</p>
                </div>
              </div>
            </Gallery.Body>
          </Gallery.Item>
        );
      })}
    </Gallery>
  );
}
