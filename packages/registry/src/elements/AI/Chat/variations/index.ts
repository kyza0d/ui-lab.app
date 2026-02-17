// Export all variation components
export { BasicChat } from './01-basic/index.js';
export { ChatWithActions } from './02-with-actions/index.js';

// Type for all variations
export type ChatVariations = 'BasicChat' | 'ChatWithActions';

// Demo path mapping for dynamic imports and routing
export const DEMO_MAP = {
  'chat-basic': { key: '01-basic', export: 'BasicChat' },
  'chat-actions': { key: '02-with-actions', export: 'ChatWithActions' },
} as const;

// Component map for internal use
export const variationComponentMap = {
  '01-basic': async () => (await import('./01-basic')).BasicChat,
  '02-with-actions': async () => (await import('./02-with-actions')).ChatWithActions,
} as const;
