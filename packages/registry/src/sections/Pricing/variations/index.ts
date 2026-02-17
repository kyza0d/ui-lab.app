export { PricingCards } from './01-cards/index.js';
export { PricingComparison } from './02-comparison/index.js';

export const DEMO_MAP = {
  'pricing-cards': { key: '01-cards', export: 'PricingCards' },
  'pricing-comparison': { key: '02-comparison', export: 'PricingComparison' },
} as const;
