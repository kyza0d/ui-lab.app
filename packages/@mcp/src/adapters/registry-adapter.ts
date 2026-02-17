/**
 * Registry Adapter (Simplified)
 * Provides simplified access to component metadata for the 4 core tools
 *
 * This adapter provides:
 * - getComponentById: Get full component metadata + design guidance
 * - search: Search for components by query
 * - getAllComponentIds: List all available components (for backward compatibility)
 */

import {
  getComponentById as getComponentByIdFromRegistry,
  searchComponents,
  getAllComponentIds as getAllComponentIdsFromRegistry,
  generatedAPI,
  getProviderById as getProviderByIdFromRegistry,
} from 'ui-lab-registry';

import type { ComponentMetadata } from 'ui-lab-registry';

/**
 * Get a single component by ID with enriched metadata
 */
function getComponentById(id: string): ComponentMetadata | null {
  try {
    const component = getComponentByIdFromRegistry(id);
    if (!component) return null;

    // Merge API data
    // Note: generatedAPI uses PascalCase keys (e.g., "Select"), but registry uses lowercase (e.g., "select")
    const pascalCaseId = id.charAt(0).toUpperCase() + id.slice(1);
    const api = generatedAPI[pascalCaseId as keyof typeof generatedAPI];
    if (api) {
      component.api = api;
    }

    return component;
  } catch {
    return null;
  }
}

/**
 * Search for components by query
 */
function searchRegistry(
  query: string,
  limit: number = 20
): ComponentMetadata[] {
  try {
    return searchComponents(query).slice(0, limit);
  } catch {
    return [];
  }
}

/**
 * Get all available component IDs
 */
function getAllComponentIds(): string[] {
  try {
    return getAllComponentIdsFromRegistry();
  } catch {
    return [];
  }
}

/**
 * Get a provider by ID
 */
function getProviderById(id: string): any {
  try {
    return getProviderByIdFromRegistry(id);
  } catch {
    return null;
  }
}

/**
 * Simple singleton exports for compatibility
 */
export const registryAdapter = {
  getComponentById,
  search: (query: string, _category?: any, limit?: number) =>
    searchRegistry(query, limit || 20),
  getAllComponentIds,
  getProviderById,
};
