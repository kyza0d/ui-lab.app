/**
 * Registry Adapter
 * Wraps ui-lab-registry package to provide queryable component metadata
 */

import {
  getComponentById,
  getComponentsByCategory,
  searchComponents,
  getAllComponentIds,
  getComponentCount,
  generatedAPI,
} from 'ui-lab-registry';

import type {
  ComponentMetadata,
  ComponentCategory,
} from 'ui-lab-registry';

export class RegistryAdapter {
  private cache: Map<string, ComponentMetadata> = new Map();
  private searchCache: Map<string, ComponentMetadata[]> = new Map();

  /**
   * Get a single component by ID
   */
  getComponentById(id: string): ComponentMetadata | null {
    if (this.cache.has(id)) {
      return this.cache.get(id) || null;
    }

    try {
      const component = getComponentById(id);
      if (component) {
        // Merge API data from generatedAPI
        const api = generatedAPI[id as keyof typeof generatedAPI];
        if (api) {
          component.api = api;
        }
        this.cache.set(id, component);
      }
      return component || null;
    } catch {
      return null;
    }
  }

  /**
   * Search for components by query string
   */
  searchComponentsByQuery(
    query: string,
    limit: number = 20
  ): ComponentMetadata[] {
    const cacheKey = `search:${query}:${limit}`;
    if (this.searchCache.has(cacheKey)) {
      return this.searchCache.get(cacheKey) || [];
    }

    try {
      const results = searchComponents(query).slice(0, limit);
      this.searchCache.set(cacheKey, results);
      return results;
    } catch {
      return [];
    }
  }

  /**
   * Get components by category
   */
  getComponentsByCategory(
    category: ComponentCategory,
    limit: number = 50
  ): ComponentMetadata[] {
    try {
      return getComponentsByCategory(category).slice(0, limit);
    } catch {
      return [];
    }
  }

  /**
   * Get all component IDs
   */
  getAllComponentIds(): string[] {
    try {
      return getAllComponentIds();
    } catch {
      return [];
    }
  }

  /**
   * Get total component count
   */
  getComponentCount(): number {
    try {
      return getComponentCount();
    } catch {
      return 0;
    }
  }

  /**
   * Search with optional category filter
   */
  search(
    query: string,
    category?: ComponentCategory,
    limit: number = 20
  ): ComponentMetadata[] {
    let results: ComponentMetadata[] = [];

    if (query) {
      results = this.searchComponentsByQuery(query, limit);
    } else if (category) {
      results = this.getComponentsByCategory(category, limit);
    } else {
      // Return all components if no query or category
      const ids = this.getAllComponentIds().slice(0, limit);
      results = ids.map((id) => this.getComponentById(id)).filter(Boolean) as ComponentMetadata[];
    }

    // Apply category filter if provided
    if (category && query) {
      results = results.filter((c) => c.category === category);
    }

    return results;
  }

  /**
   * Clear caches (useful for memory management)
   */
  clearCache(): void {
    this.cache.clear();
    this.searchCache.clear();
  }
}

export const registryAdapter = new RegistryAdapter();
