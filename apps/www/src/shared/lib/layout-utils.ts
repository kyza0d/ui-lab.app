import type { LayoutConfig } from 'ui-lab-registry';

interface RegistryItem {
  layout?: Partial<LayoutConfig>;
}

interface Registry {
  [key: string]: RegistryItem;
}

export function createLayoutConfigGetter<T extends Registry>(
  registry: T,
  defaultLayout: LayoutConfig
) {
  return function getLayoutConfig(itemId: string): LayoutConfig {
    const item = registry[itemId.toLowerCase()];

    if (!item?.layout) {
      return defaultLayout;
    }

    return {
      layoutClass: item.layout.layoutClass ?? defaultLayout.layoutClass,
      columnSpan: item.layout.columnSpan ?? defaultLayout.columnSpan,
      rowSpan: item.layout.rowSpan ?? defaultLayout.rowSpan,
      previewConfig: item.layout.previewConfig,
    } as LayoutConfig;
  };
}

export function createMetadataLayoutGetter<T extends { layout?: Partial<LayoutConfig> }>(
  getItemLayoutConfig: (itemId: string) => LayoutConfig
) {
  return function getLayoutConfig(item: T): LayoutConfig {
    const centralizedConfig = getItemLayoutConfig((item as any).id);

    return {
      layoutClass: item.layout?.layoutClass ?? centralizedConfig.layoutClass,
      columnSpan: item.layout?.columnSpan ?? centralizedConfig.columnSpan,
      rowSpan: item.layout?.rowSpan ?? centralizedConfig.rowSpan,
      previewConfig: item.layout?.previewConfig ?? centralizedConfig.previewConfig ?? {},
    };
  };
}
