import type { LayoutConfig } from 'ui-lab-registry';
import { elementRegistry } from 'ui-lab-registry/elements';

const DEFAULT_LAYOUT: LayoutConfig = {
  layoutClass: 'default',
  columnSpan: 1,
  rowSpan: 1,
};

export function getElementLayoutConfig(elementId: string): LayoutConfig {
  const element = elementRegistry[elementId.toLowerCase()];

  if (!element?.layout) {
    return DEFAULT_LAYOUT;
  }

  return {
    layoutClass: element.layout.layoutClass ?? DEFAULT_LAYOUT.layoutClass,
    columnSpan: element.layout.columnSpan ?? DEFAULT_LAYOUT.columnSpan,
    rowSpan: element.layout.rowSpan ?? DEFAULT_LAYOUT.rowSpan,
    previewConfig: element.layout.previewConfig,
  } as LayoutConfig;
}
