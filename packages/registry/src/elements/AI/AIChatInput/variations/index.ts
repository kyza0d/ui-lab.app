// Export all variation components
export { BasicAIChatInput } from './01-basic';
export { AIChatInputWithSuggestions } from './02-with-suggestions';

// Type for all variations
export type AIChatInputVariations = 'BasicAIChatInput' | 'AIChatInputWithSuggestions';

// Demo path mapping for dynamic imports and routing
export const DEMO_MAP = {
  'ai-chat-input-basic': { key: '01-basic', export: 'BasicAIChatInput' },
  'ai-chat-input-suggestions': { key: '02-with-suggestions', export: 'AIChatInputWithSuggestions' },
} as const;

// Component map for internal use
export const variationComponentMap = {
  '01-basic': async () => (await import('./01-basic')).BasicAIChatInput,
  '02-with-suggestions': async () => (await import('./02-with-suggestions')).AIChatInputWithSuggestions,
} as const;
