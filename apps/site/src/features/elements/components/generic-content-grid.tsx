'use client';
import { useRouter } from 'next/navigation';
import { Gallery } from 'ui-lab-components';
import { PreviewContainer } from '@/features/preview/components/preview-container';
import { PricingBadge } from '@/features/landing/components/pricing-badge';
import type { LayoutConfig, PricingInfo } from 'ui-lab-registry';

interface ContentItem {
  id: string;
  name: string;
  description: string;
  pricing?: PricingInfo;
}

interface GenericContentGridProps<T extends ContentItem> {
  items: T[];
  basePath: string;
  getLayoutConfig: (item: T) => LayoutConfig;
  getPreviewComponent: (id: string) => React.ComponentType | null;
  showCTA?: boolean;
  ctaContentType?: 'elements' | 'starters' | 'sections';
}

export function GenericContentGrid<T extends ContentItem>({
  items,
  basePath,
  getLayoutConfig,
  getPreviewComponent,
  showCTA = false,
  ctaContentType,
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
    <div className="flex flex-col gap-12">
      <Gallery columns={{ sm: "1", md: "3", xl: "4" }} gap="md" className='p-1'>
        {items.map((item) => {
          const layoutConfig = getLayoutConfig(item);
          const PreviewComponent = getPreviewComponent(item.id);
          const href = `${basePath}/${item.id}`;
          const isPlaceholder = !PreviewComponent;

          return (
            <Gallery.Item
              key={item.id}
              href={isPlaceholder ? undefined : href}
              onPress={isPlaceholder ? undefined : () => router.push(href)}
              columnSpan={2}
              rowSpan={layoutConfig.rowSpan}
              className={`overflow-hidden ${isPlaceholder ? 'pointer-events-none' : ''}`}
              {...(isPlaceholder && { tabIndex: -1 })}
            >
              <PreviewContainer layoutConfig={layoutConfig}>
                {PreviewComponent ? <PreviewComponent /> : <div className="text-foreground-500">Preview</div>}
              </PreviewContainer>
              <Gallery.Body className="p-3 relative w-full">
                <div className="flex flex-col gap-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <strong className="font-semibold text-foreground-50">{item.name}</strong>
                      <p className="text-sm text-foreground-400 mt-0.5 line-clamp-2">{item.description}</p>
                    </div>
                  </div>
                </div>
                {item.pricing && item.pricing.price !== null && (
                  <div className="absolute right-2 top-2 flex-shrink-0">
                    <PricingBadge price={item.pricing.price} />
                  </div>
                )}
              </Gallery.Body>
            </Gallery.Item>
          );
        })}
      </Gallery>
    </div>
  );
}
