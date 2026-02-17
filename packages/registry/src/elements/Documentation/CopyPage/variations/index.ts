// Export all variation components
export { BasicCopyPage } from './01-basic/index.js';
export { CopyPageWithSuccess } from './02-with-success/index.js';

// Type for all variations
export type CopyPageVariations = 'BasicCopyPage' | 'CopyPageWithSuccess';

// Demo path mapping for dynamic imports and routing
export const DEMO_MAP = {
  'copy-page-basic': { key: '01-basic', export: 'BasicCopyPage' },
  'copy-page-success': { key: '02-with-success', export: 'CopyPageWithSuccess' },
} as const;

// Component map for internal use
export const variationComponentMap = {
  '01-basic': async () => (await import('./01-basic')).BasicCopyPage,
  '02-with-success': async () => (await import('./02-with-success')).CopyPageWithSuccess,
} as const;
