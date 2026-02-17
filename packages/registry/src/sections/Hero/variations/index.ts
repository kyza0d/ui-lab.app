export { SimpleHero } from './01-simple/index.js';
export { HeroWithCTA } from './02-with-cta/index.js';
export { HeroWithStats } from './03-with-stats/index.js';
export { HeroWithFeatures } from './04-with-features/index.js';

export const DEMO_MAP = {
  'hero-simple': { key: '01-simple', export: 'SimpleHero' },
  'hero-with-cta': { key: '02-with-cta', export: 'HeroWithCTA' },
  'hero-with-stats': { key: '03-with-stats', export: 'HeroWithStats' },
  'hero-with-features': { key: '04-with-features', export: 'HeroWithFeatures' },
} as const;
