import type { LayoutConfig } from 'ui-lab-registry';

const DEFAULT_LAYOUT: LayoutConfig = {
  layoutClass: 'default',
  columnSpan: 1,
  rowSpan: 1,
};

const ELEMENT_LAYOUT_MAP: Record<string, Partial<LayoutConfig>> = {
  header: {
    layoutClass: 'featured-header',
    columnSpan: 3,
    rowSpan: 1,
  },
};

export function getElementLayoutConfig(elementId: string): LayoutConfig {
  const customLayout = ELEMENT_LAYOUT_MAP[elementId.toLowerCase()];

  if (!customLayout) {
    return DEFAULT_LAYOUT;
  }

  return {
    layoutClass: customLayout.layoutClass ?? DEFAULT_LAYOUT.layoutClass,
    columnSpan: customLayout.columnSpan ?? DEFAULT_LAYOUT.columnSpan,
    rowSpan: customLayout.rowSpan ?? DEFAULT_LAYOUT.rowSpan,
    previewConfig: customLayout.previewConfig,
  };
}
