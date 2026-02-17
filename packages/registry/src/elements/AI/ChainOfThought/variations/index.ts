// Export all variation components
export { BasicChainOfThought } from './01-basic/index.js';
export { ChainOfThoughtWithDetails } from './02-with-details/index.js';

// Type for all variations
export type ChainOfThoughtVariations = 'BasicChainOfThought' | 'ChainOfThoughtWithDetails';

// Demo path mapping for dynamic imports and routing
export const DEMO_MAP = {
  'chain-of-thought-basic': { key: '01-basic', export: 'BasicChainOfThought' },
  'chain-of-thought-details': { key: '02-with-details', export: 'ChainOfThoughtWithDetails' },
} as const;

// Component map for internal use
export const variationComponentMap = {
  '01-basic': async () => (await import('./01-basic')).BasicChainOfThought,
  '02-with-details': async () => (await import('./02-with-details')).ChainOfThoughtWithDetails,
} as const;
