// Export all variation components
export { BasicPage } from './01-basic';

// Type for all variations
export type PageVariations = 'BasicPage';

// Demo path mapping for dynamic imports and routing
export const DEMO_MAP = {
  'page-basic': { key: '01-basic', export: 'BasicPage' },
} as const;

// Component map for internal use
export const variationComponentMap = {
  '01-basic': async () => (await import('./01-basic')).BasicPage,
} as const;
