import type { LayoutConfig } from 'ui-lab-registry';
import { elementRegistry } from 'ui-lab-registry/elements';
import { createLayoutConfigGetter } from '@/shared/lib/layout-utils';

const DEFAULT_LAYOUT: LayoutConfig = {
  layoutClass: 'default',
  columnSpan: 1,
  rowSpan: 1,
};

export const getElementLayoutConfig = createLayoutConfigGetter(elementRegistry, DEFAULT_LAYOUT);
