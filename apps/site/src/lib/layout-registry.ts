import type { ElementMetadata, LayoutConfig } from 'ui-lab-registry';

function getDefaultLayout(): LayoutConfig {
  return {
    layoutClass: 'default',
    columnSpan: 1,
    rowSpan: 1,
  };
}

export function getLayoutConfig(element: ElementMetadata): LayoutConfig {
  if (element.layout) {
    return {
      layoutClass: element.layout.layoutClass,
      columnSpan: element.layout.columnSpan,
      rowSpan: element.layout.rowSpan,
      previewConfig: element.layout.previewConfig ?? {},
    };
  }
  return getDefaultLayout();
}
