// Export all variation components
export { BasicRating } from './01-basic/index.js';

// Type for all variations
export type RatingVariations = 'BasicRating';

// Demo path mapping for dynamic imports and routing
export const DEMO_MAP = {
  'rating-basic': { key: '01-basic', export: 'BasicRating' },
} as const;

// Component map for internal use
export const variationComponentMap = {
  '01-basic': async () => (await import('./01-basic')).BasicRating,
} as const;
