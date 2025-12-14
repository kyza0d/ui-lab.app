import {
  getComponentById,
  getAllComponentIds,
  searchComponents as registrySearch,
  getRelatedComponents as registryRelated,
  type ComponentMetadata
} from 'ui-lab-registry'

export class RegistryClient {
  getAllComponents(): ComponentMetadata[] {
    const ids = getAllComponentIds()
    return ids.map(id => getComponentById(id)).filter((c): c is ComponentMetadata => c !== undefined)
  }

  getComponent(id: string): ComponentMetadata | undefined {
    return getComponentById(id)
  }

  searchComponents(query: string): ComponentMetadata[] {
    return registrySearch(query)
  }

  getRelatedComponents(id: string): ComponentMetadata[] {
    return registryRelated(id)
  }

  getAllComponentIds(): string[] {
    return getAllComponentIds()
  }

  validateComponentIds(ids: string[]): { valid: string[]; invalid: string[] } {
    const allIds = new Set(getAllComponentIds())
    const valid: string[] = []
    const invalid: string[] = []

    for (const id of ids) {
      if (allIds.has(id)) {
        valid.push(id)
      } else {
        invalid.push(id)
      }
    }

    return { valid, invalid }
  }

  componentExists(id: string): boolean {
    return getComponentById(id) !== undefined
  }

  getComponentExportName(id: string): string | undefined {
    const component = getComponentById(id)
    return component?.source.exportName
  }

  getComponentsByCategory(category: string): ComponentMetadata[] {
    return this.getAllComponents().filter(c => c.category === category)
  }

  getComponentCount(): number {
    return getAllComponentIds().length
  }
}

export function createRegistryClient(): RegistryClient {
  return new RegistryClient()
}
