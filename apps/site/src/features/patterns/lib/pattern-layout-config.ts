import type { LayoutConfig } from 'ui-lab-registry';
import type { PatternMetadata } from 'ui-lab-registry';

const DEFAULT_LAYOUT: LayoutConfig = {
  layoutClass: 'default',
  columnSpan: 1,
  rowSpan: 4,
};

export function getPatternLayoutConfig(_item: PatternMetadata): LayoutConfig {
  return DEFAULT_LAYOUT;
}
