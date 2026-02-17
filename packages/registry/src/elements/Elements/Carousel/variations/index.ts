// Export all variation components
export { BasicCarousel } from './01-basic/index.js';

// Type for all variations
export type CarouselVariations = 'BasicCarousel';

// Demo path mapping for dynamic imports and routing
export const DEMO_MAP = {
  'carousel-basic': { key: '01-basic', export: 'BasicCarousel' },
} as const;

// Component map for internal use
export const variationComponentMap = {
  '01-basic': async () => (await import('./01-basic')).BasicCarousel,
} as const;
