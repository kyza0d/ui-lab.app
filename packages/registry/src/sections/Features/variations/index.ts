export { GridFeatures } from './01-grid/index.js';
export { FeatureList } from './02-list/index.js';

export const DEMO_MAP = {
  'features-grid': { key: '01-grid', export: 'GridFeatures' },
  'features-list': { key: '02-list', export: 'FeatureList' },
} as const;
