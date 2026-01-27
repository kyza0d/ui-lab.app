// Export all variation components
export { BasicSidebar } from './01-basic';

// Type for all variations
export type SidebarVariations = 'BasicSidebar';

// Demo path mapping for dynamic imports and routing
export const DEMO_MAP = {
  'sidebar-basic': { key: '01-basic', export: 'BasicSidebar' },
} as const;

// Component map for internal use
export const variationComponentMap = {
  '01-basic': async () => (await import('./01-basic')).BasicSidebar,
} as const;
