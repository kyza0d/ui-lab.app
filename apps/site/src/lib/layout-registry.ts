import type { ElementMetadata, LayoutConfig } from 'ui-lab-registry';
import { getElementLayoutConfig } from './elementLayoutConfig';

export function getLayoutConfig(element: ElementMetadata): LayoutConfig {
  const centralizedConfig = getElementLayoutConfig(element.id);

  return {
    layoutClass: element.layout?.layoutClass ?? centralizedConfig.layoutClass,
    columnSpan: element.layout?.columnSpan ?? centralizedConfig.columnSpan,
    rowSpan: element.layout?.rowSpan ?? centralizedConfig.rowSpan,
    previewConfig: element.layout?.previewConfig ?? centralizedConfig.previewConfig ?? {},
  };
}
