// Export all variation components
export { BasicTreeView } from './01-basic';

// Type for all variations
export type TreeViewVariations = 'BasicTreeView';

// Demo path mapping for dynamic imports and routing
export const DEMO_MAP = {
  'tree-view-basic': { key: '01-basic', export: 'BasicTreeView' },
} as const;

// Component map for internal use
export const variationComponentMap = {
  '01-basic': async () => (await import('./01-basic')).BasicTreeView,
} as const;
