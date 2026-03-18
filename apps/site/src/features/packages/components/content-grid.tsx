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
  layoutConfigs: Record<string, LayoutConfig>;
  previews: Record<string, React.ReactNode>;
  onItemClick?: (item: T) => void;
  getCategory?: (item: T) => string;
  categoryLabels?: Record<string, string>;
  fullWidth?: boolean;
  hideGroupHeaders?: boolean;
}

export function GenericContentGrid<T extends ContentItem>({
  items,
  basePath,
  layoutConfigs,
  previews,
  onItemClick,
  getCategory,
  categoryLabels,
  fullWidth = false,
  hideGroupHeaders = false,
}: GenericContentGridProps<T>) {
  const router = useRouter();

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-foreground-400">No items found matching your filters.</p>
      </div>
    );
  }

  const renderItem = (item: T) => {
    const layoutConfig = layoutConfigs[item.id];
    const preview = previews[item.id] ?? null;
    const href = `${basePath}/${item.id}`;
    const isPlaceholder = !preview;

    const handlePress = (passedHref?: string) => {
      if (onItemClick) {
        onItemClick(item);
        return;
      }
      router.push(passedHref || href);
    };

    const isNonClickable = isPlaceholder && !onItemClick;
    const columnSpan = fullWidth ? 1 : Math.min(layoutConfig.columnSpan || 1, 3);

    return (
      <Gallery.Item
        key={item.id}
        href={isNonClickable ? undefined : (onItemClick ? undefined : href)}
        onPress={isNonClickable ? undefined : handlePress}
        columnSpan={columnSpan}
        rowSpan={layoutConfig.rowSpan}
        className={`relative overflow-hidden ${isNonClickable ? 'pointer-events-none' : ''}`}
        {...(isNonClickable && { tabIndex: -1 })}
      >
        <PreviewContainer layoutConfig={layoutConfig}>
          {preview ?? <div className="text-foreground-400">Preview</div>}
        </PreviewContainer>
        <Gallery.Body className="p-3 w-full">
          <div className="flex flex-col gap-2">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <strong className="font-semibold text-foreground-50">{item.name}</strong>
                <p className="text-sm text-foreground-400 mt-0.5 line-clamp-2">{item.description}</p>
              </div>
            </div>
          </div>
        </Gallery.Body>
        {item.pricing && item.pricing.price !== null && (
          <div className="absolute right-2 top-2 shrink-0">
            <PricingBadge price={item.pricing.price} />
          </div>
        )}
      </Gallery.Item>
    );
  };

  const galleryColumns = fullWidth ? { sm: "1" as const, md: "1" as const, xl: "1" as const } : { sm: "1" as const, md: "2" as const, xl: "3" as const };

  // If no categorization, render flat grid
  if (!getCategory) {
    return (
      <div className="flex flex-col gap-12">
        <Gallery columns={{ sm: "1", md: "2", lg: "3" }} gap="sm" className='p-1'>
          {items.map(renderItem)}
        </Gallery>
      </div>
    );
  }

  // Group items by category
  const grouped = items.reduce((acc, item) => {
    const category = getCategory(item);
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {} as Record<string, T[]>);

  return (
    <div className="flex flex-col gap-16">
      {Object.entries(grouped).map(([categoryId, categoryItems]) => (
        <div key={categoryId} className="flex flex-col gap-2">
          {!hideGroupHeaders && (
            <h2 className="ml-2 text-md font-semibold text-foreground-50">
              {categoryLabels?.[categoryId] || categoryId}
            </h2>
          )}
          <Gallery columns={galleryColumns} gap="sm" className='p-1'>
            {categoryItems.map(renderItem)}
          </Gallery>
        </div>
      ))}
    </div>
  );
}
