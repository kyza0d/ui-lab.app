import type { LayoutConfig } from 'ui-lab-registry';
import { starterRegistry } from 'ui-lab-registry';
import { createLayoutConfigGetter } from '@/shared/lib/layout-utils';

const DEFAULT_LAYOUT: LayoutConfig = {
  layoutClass: 'default',
  columnSpan: 8,
  rowSpan: 8,
};

export const getStarterLayoutConfig = createLayoutConfigGetter(starterRegistry, DEFAULT_LAYOUT);
