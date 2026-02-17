import type { ProviderCategory, ProviderMetadata } from '../types.js'
import { providerRegistry } from './registry.js'
import { providerCategories } from './categories.js'

/**
 * Get a provider by its ID
 */
export function getProviderById(id: string): ProviderMetadata | null {
  return (providerRegistry as any)[id] || null
}

/**
 * Get all providers
 */
export function getAllProviders(): ProviderMetadata[] {
  return Object.values(providerRegistry)
}

/**
 * Get all provider IDs
 */
export function getAllProviderIds(): string[] {
  return Object.keys(providerRegistry)
}

/**
 * Get providers by category
 */
export function getProvidersByCategory(category: ProviderCategory): ProviderMetadata[] {
  return getAllProviders().filter((provider) => provider.category === category)
}

/**
 * Search providers by query
 * Searches across id, name, description, and tags
 */
export function searchProviders(query: string): ProviderMetadata[] {
  if (!query || query.trim().length === 0) {
    return getAllProviders()
  }

  const lowerQuery = query.toLowerCase()

  return getAllProviders()
    .map((provider) => {
      let score = 0

      // Exact ID match
      if (provider.id === lowerQuery) score += 100

      // ID contains query
      if (provider.id.includes(lowerQuery)) score += 50

      // Name match (case-insensitive)
      if (provider.name.toLowerCase().includes(lowerQuery)) score += 40

      // Description contains query
      if (provider.description.toLowerCase().includes(lowerQuery)) score += 20

      // Tags contain query
      if (provider.tags?.some((tag) => tag.toLowerCase().includes(lowerQuery))) score += 30

      return { provider, score }
    })
    .filter(({ score }) => score > 0)
    .sort(({ score: scoreA }, { score: scoreB }) => scoreB - scoreA)
    .map(({ provider }) => provider)
}

/**
 * Get provider categories in order
 */
export function getProviderCategoriesInOrder(): string[] {
  return Object.keys(providerCategories)
}

/**
 * Get provider category definition
 */
export function getProviderCategoryDefinition(category: ProviderCategory) {
  return (providerCategories as any)[category] || null
}
