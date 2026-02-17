import type { PatternMetadata, PatternRegistry, PatternCategory } from '../types.js';

import heroWithCtaMetadata from './hero-landing/hero-with-cta/metadata.json' with { type: 'json' };
import featureGridMetadata from './content/feature-grid/metadata.json' with { type: 'json' };
import settingsFormLayoutMetadata from './forms/settings-form-layout/metadata.json' with { type: 'json' };
import pricingCardsMetadata from './content/pricing-cards/metadata.json' with { type: 'json' };
import stickyHeaderMetadata from './navigation/sticky-header/metadata.json' with { type: 'json' };

export const patternRegistry: PatternRegistry = {
  [heroWithCtaMetadata.id]: heroWithCtaMetadata as PatternMetadata,
  [featureGridMetadata.id]: featureGridMetadata as PatternMetadata,
  [settingsFormLayoutMetadata.id]: settingsFormLayoutMetadata as PatternMetadata,
  [pricingCardsMetadata.id]: pricingCardsMetadata as PatternMetadata,
  [stickyHeaderMetadata.id]: stickyHeaderMetadata as PatternMetadata,
};

export function getPatternById(id: string): PatternMetadata | undefined {
  return patternRegistry[id.toLowerCase()];
}

export function getAllPatterns(): PatternMetadata[] {
  return Object.values(patternRegistry);
}

export function getPatternsByCategory(category: PatternCategory): PatternMetadata[] {
  return Object.values(patternRegistry).filter(
    (pattern) => pattern.category === category
  );
}

export function getPatternsByTag(tag: string): PatternMetadata[] {
  const lowerTag = tag.toLowerCase();
  return Object.values(patternRegistry).filter((pattern) =>
    pattern.tags.some((t) => t.toLowerCase().includes(lowerTag))
  );
}

export function searchPatterns(query: string): PatternMetadata[] {
  const lowerQuery = query.toLowerCase();
  return Object.values(patternRegistry).filter(
    (pattern) =>
      pattern.name.toLowerCase().includes(lowerQuery) ||
      pattern.description.toLowerCase().includes(lowerQuery) ||
      pattern.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)) ||
      pattern.useCases.some((uc) => uc.toLowerCase().includes(lowerQuery))
  );
}

export function getPatternsByComplexity(
  complexity: PatternMetadata['complexity']
): PatternMetadata[] {
  return Object.values(patternRegistry).filter(
    (pattern) => pattern.complexity === complexity
  );
}

export function getPatternsByComponent(componentName: string): PatternMetadata[] {
  const lowerName = componentName.toLowerCase();
  return Object.values(patternRegistry).filter((pattern) =>
    pattern.components.some((c) => c.toLowerCase() === lowerName)
  );
}

export function getAllPatternCategories(): PatternCategory[] {
  const categories = new Set<PatternCategory>();
  Object.values(patternRegistry).forEach((pattern) => {
    categories.add(pattern.category);
  });
  return Array.from(categories).sort();
}

export function getAllPatternTags(): string[] {
  const tags = new Set<string>();
  Object.values(patternRegistry).forEach((pattern) => {
    pattern.tags.forEach((tag) => tags.add(tag));
  });
  return Array.from(tags).sort();
}

export function getRelatedPatterns(patternId: string): PatternMetadata[] {
  const pattern = getPatternById(patternId);
  if (!pattern) return [];
  return pattern.relatedPatterns
    .map((id) => getPatternById(id))
    .filter((p): p is PatternMetadata => p !== undefined);
}

export type { PatternMetadata, PatternRegistry, PatternCategory } from '../types.js';
