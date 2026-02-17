// Export all variation components
export { BasicTOC } from './01-basic/index.js';
export { ExpandedTOC } from './02-expanded/index.js';

// Type for all variations
export type TOCVariations = 'BasicTOC' | 'ExpandedTOC';

// Demo path mapping for dynamic imports and routing
export const DEMO_MAP = {
  'toc-basic': { key: '01-basic', export: 'BasicTOC' },
  'toc-expanded': { key: '02-expanded', export: 'ExpandedTOC' },
} as const;

// Component map for internal use
export const variationComponentMap = {
  '01-basic': async () => (await import('./01-basic')).BasicTOC,
  '02-expanded': async () => (await import('./02-expanded')).ExpandedTOC,
} as const;
