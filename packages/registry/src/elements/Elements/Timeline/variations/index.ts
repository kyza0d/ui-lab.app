// Export all variation components
export { BasicTimeline } from './01-basic';

// Type for all variations
export type TimelineVariations = 'BasicTimeline';

// Demo path mapping for dynamic imports and routing
export const DEMO_MAP = {
  'timeline-basic': { key: '01-basic', export: 'BasicTimeline' },
} as const;

// Component map for internal use
export const variationComponentMap = {
  '01-basic': async () => (await import('./01-basic')).BasicTimeline,
} as const;
