// Export all variation components
export { BasicHeader } from './01-basic';

// Type for all variations
export type HeaderVariations = 'BasicHeader';

// Demo path mapping for dynamic imports and routing
export const DEMO_MAP = {
  'header-basic': { key: '01-basic', export: 'BasicHeader' },
} as const;

// Component map for internal use
export const variationComponentMap = {
  '01-basic': async () => (await import('./01-basic')).BasicHeader,
} as const;
