'use client';
import { useRouter } from 'next/navigation';
import { Gallery } from 'ui-lab-components';
import { PreviewContainer } from '@/features/elements/components/preview-container';
import type { LayoutConfig } from 'ui-lab-registry';

export interface GenericGridClientProps<T> {
  items: T[];
  getLayoutConfig: (item: T) => LayoutConfig;
  getPreviewComponent: (item: T) => React.ComponentType | null;
  getItemPath: (item: T) => string;
  renderItemHeader: (item: T) => React.ReactNode;
  renderItemFooter?: (item: T) => React.ReactNode;
}

export function GenericGridClient<T extends { id: string }>({
  items,
  getLayoutConfig,
  getPreviewComponent,
  getItemPath,
  renderItemHeader,
  renderItemFooter,
}: GenericGridClientProps<T>) {
  const router = useRouter();

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-foreground-400">No items found matching your filters.</p>
      </div>
    );
  }

  return (
    <Gallery columns={8} layout='grid' gap="1.5rem" className='flex-1' style={{ gridAutoRows: '100px' }}>
      {items.map((item) => {
        const layoutConfig = getLayoutConfig(item);
        const PreviewComponent = getPreviewComponent(item);

        return (
          <Gallery.Item
            key={item.id}
            columnSpan={layoutConfig.columnSpan}
            rowSpan={layoutConfig.rowSpan}
            onPress={() => router.push(getItemPath(item))}
            className="overflow-hidden"
          >
            <PreviewContainer layoutConfig={layoutConfig}>
              {PreviewComponent ? (
                <PreviewComponent />
              ) : (
                <div className="text-foreground-500">Preview</div>
              )}
            </PreviewContainer>
            <Gallery.Body className="p-3">
              {renderItemHeader(item)}
              {renderItemFooter && renderItemFooter(item)}
            </Gallery.Body>
          </Gallery.Item>
        );
      })}
    </Gallery>
  );
}
