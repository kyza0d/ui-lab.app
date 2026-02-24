import type { PatternMetadata, PatternRegistry, PatternCategory } from '../types.js';

import mediaObjectMetadata from './layout/media-object/metadata.json' with { type: 'json' };
import splitRowMetadata from './layout/split-row/metadata.json' with { type: 'json' };
import statBlockMetadata from './layout/stat-block/metadata.json' with { type: 'json' };
import labeledFieldMetadata from './form/labeled-field/metadata.json' with { type: 'json' };
import searchInputMetadata from './form/search-input/metadata.json' with { type: 'json' };
import toggleSettingRowMetadata from './form/toggle-setting-row/metadata.json' with { type: 'json' };
import selectRowMetadata from './form/select-row/metadata.json' with { type: 'json' };
import badgeRowMetadata from './data/badge-row/metadata.json' with { type: 'json' };
import progressMetricMetadata from './data/progress-metric/metadata.json' with { type: 'json' };
import dataTableRowMetadata from './data/data-table-row/metadata.json' with { type: 'json' };
import buttonGroupPatternMetadata from './interaction/button-group-pattern/metadata.json' with { type: 'json' };
import iconActionBarMetadata from './interaction/icon-action-bar/metadata.json' with { type: 'json' };
import tabContentHeaderMetadata from './interaction/tab-content-header/metadata.json' with { type: 'json' };
import inlineAlertMetadata from './feedback/inline-alert/metadata.json' with { type: 'json' };
import emptyStatePatternMetadata from './feedback/empty-state-pattern/metadata.json' with { type: 'json' };

export const patternRegistry: PatternRegistry = {
  [mediaObjectMetadata.id]: mediaObjectMetadata as PatternMetadata,
  [splitRowMetadata.id]: splitRowMetadata as PatternMetadata,
  [statBlockMetadata.id]: statBlockMetadata as PatternMetadata,
  [labeledFieldMetadata.id]: labeledFieldMetadata as PatternMetadata,
  [searchInputMetadata.id]: searchInputMetadata as PatternMetadata,
  [toggleSettingRowMetadata.id]: toggleSettingRowMetadata as PatternMetadata,
  [selectRowMetadata.id]: selectRowMetadata as PatternMetadata,
  [badgeRowMetadata.id]: badgeRowMetadata as PatternMetadata,
  [progressMetricMetadata.id]: progressMetricMetadata as PatternMetadata,
  [dataTableRowMetadata.id]: dataTableRowMetadata as PatternMetadata,
  [buttonGroupPatternMetadata.id]: buttonGroupPatternMetadata as PatternMetadata,
  [iconActionBarMetadata.id]: iconActionBarMetadata as PatternMetadata,
  [tabContentHeaderMetadata.id]: tabContentHeaderMetadata as PatternMetadata,
  [inlineAlertMetadata.id]: inlineAlertMetadata as PatternMetadata,
  [emptyStatePatternMetadata.id]: emptyStatePatternMetadata as PatternMetadata,
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
      pattern.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
  );
}

export function getPatternsByComplexity(
  complexity: PatternMetadata['complexity']
): PatternMetadata[] {
  return Object.values(patternRegistry).filter(
    (pattern) => pattern.complexity === complexity
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

export type { PatternMetadata, PatternRegistry, PatternCategory, PatternVariation } from '../types.js';
