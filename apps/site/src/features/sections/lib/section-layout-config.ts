import type { LayoutConfig } from 'ui-lab-registry';
import { sectionRegistry } from 'ui-lab-registry/sections';

const DEFAULT_LAYOUT: LayoutConfig = {
  layoutClass: 'default',
  columnSpan: 5,
  rowSpan: 6,
};

export function getSectionLayoutConfig(sectionId: string): LayoutConfig {
  const section = sectionRegistry[sectionId.toLowerCase()];

  if (!section?.layout) {
    return DEFAULT_LAYOUT;
  }

  return {
    layoutClass: section.layout.layoutClass ?? DEFAULT_LAYOUT.layoutClass,
    columnSpan: section.layout.columnSpan ?? DEFAULT_LAYOUT.columnSpan,
    rowSpan: section.layout.rowSpan ?? DEFAULT_LAYOUT.rowSpan,
    previewConfig: section.layout.previewConfig,
  } as LayoutConfig;
}
