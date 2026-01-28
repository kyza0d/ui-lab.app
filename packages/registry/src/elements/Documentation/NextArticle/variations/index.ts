// Export all variation components
export { BasicNextArticle } from './01-basic';
export { NextArticleWithIcon } from './02-with-icon';

// Type for all variations
export type NextArticleVariations = 'BasicNextArticle' | 'NextArticleWithIcon';

// Demo path mapping for dynamic imports and routing
export const DEMO_MAP = {
  'next-article-basic': { key: '01-basic', export: 'BasicNextArticle' },
  'next-article-icon': { key: '02-with-icon', export: 'NextArticleWithIcon' },
} as const;

// Component map for internal use
export const variationComponentMap = {
  '01-basic': async () => (await import('./01-basic')).BasicNextArticle,
  '02-with-icon': async () => (await import('./02-with-icon')).NextArticleWithIcon,
} as const;
