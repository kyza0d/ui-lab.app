export { BannerCTA } from './01-banner/index.js';
export { SplitCTA } from './02-split/index.js';

export const DEMO_MAP = {
  'cta-banner': { key: '01-banner', export: 'BannerCTA' },
  'cta-split': { key: '02-split', export: 'SplitCTA' },
} as const;
