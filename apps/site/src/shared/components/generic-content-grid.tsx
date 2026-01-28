'use client';
import { useRouter } from 'next/navigation';
import { Gallery } from 'ui-lab-components';
import { PreviewContainer } from './preview-container';
import type { LayoutConfig } from 'ui-lab-registry';

interface ContentItem {
  id: string;
  name: string;
  description: string;
}

interface GenericContentGridProps<T extends ContentItem> {
  items: T[];
  basePath: string;
  getLayoutConfig: (item: T) => LayoutConfig;
  getPreviewComponent: (id: string) => React.ComponentType | null;
}

export function GenericContentGrid<T extends ContentItem>({
  items,
  basePath,
  getLayoutConfig,
  getPreviewComponent,
}: GenericContentGridProps<T>) {
  const router = useRouter();

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-foreground-400">No items found matching your filters.</p>
      </div>
    );
  }

  return (
    <Gallery columns={{ md: 2, lg: 8 }}>
      {items.map((item) => {
        const layoutConfig = getLayoutConfig(item);
        const PreviewComponent = getPreviewComponent(item.id);
        const href = `${basePath}/${item.id}`;

        return (
          <Gallery.Item
            key={item.id}
            href={href}
            onPress={() => router.push(href)}
            columnSpan={2}
            rowSpan={layoutConfig.rowSpan}
            className="overflow-hidden"
          >
            <PreviewContainer layoutConfig={layoutConfig}>
              {PreviewComponent ? <PreviewComponent /> : <div className="text-foreground-500">Preview</div>}
            </PreviewContainer>
            <Gallery.Body className="p-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <strong className="font-semibold text-foreground-50">{item.name}</strong>
                  <p className="text-sm text-foreground-400 mt-0.5 line-clamp-2">{item.description}</p>
                </div>
              </div>
            </Gallery.Body>
          </Gallery.Item>
        );
      })}
    </Gallery>
  );
}
