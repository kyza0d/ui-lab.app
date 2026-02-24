import type { LayoutConfig } from 'ui-lab-registry';
import { sectionRegistry } from 'ui-lab-registry/sections';
import { createLayoutConfigGetter } from '@/shared/lib/layout-utils';

const DEFAULT_LAYOUT: LayoutConfig = {
  layoutClass: 'default',
  columnSpan: 1,
  rowSpan: 6,
};

export const getSectionLayoutConfig = createLayoutConfigGetter(sectionRegistry, DEFAULT_LAYOUT);
