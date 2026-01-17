import type { LayoutConfig, SectionMetadata } from 'ui-lab-registry';
import { getSectionLayoutConfig } from './section-layout-config';

export function getLayoutConfig(section: SectionMetadata): LayoutConfig {
  const centralizedConfig = getSectionLayoutConfig(section.id);

  return {
    layoutClass: section.layout?.layoutClass ?? centralizedConfig.layoutClass,
    columnSpan: section.layout?.columnSpan ?? centralizedConfig.columnSpan,
    rowSpan: section.layout?.rowSpan ?? centralizedConfig.rowSpan,
    previewConfig: section.layout?.previewConfig ?? centralizedConfig.previewConfig ?? {},
  };
}
