import { componentRegistry } from './registry.js';
import { categories } from './categories.js';
import type { ComponentMetadata, ComponentCategory } from './types.js';

export function getComponentById(id: string): ComponentMetadata | undefined {
  return componentRegistry[id];
}

export function getComponentsByCategory(category: ComponentCategory): ComponentMetadata[] {
  return Object.values(componentRegistry).filter(c => c.category === category);
}

export function getComponentsGroupedByCategory(): Record<ComponentCategory, ComponentMetadata[]> {
  const grouped = {} as Record<ComponentCategory, ComponentMetadata[]>;
  categories.forEach(cat => {
    grouped[cat.id] = getComponentsByCategory(cat.id);
  });
  return grouped;
}

export function getRelatedComponents(id: string): ComponentMetadata[] {
  const component = getComponentById(id);
  if (!component) return [];
  return component.relatedComponents
    .map(relId => getComponentById(relId))
    .filter((c): c is ComponentMetadata => c !== undefined);
}

export function searchComponents(query: string): ComponentMetadata[] {
  const lowerQuery = query.toLowerCase();
  return Object.values(componentRegistry).filter(comp =>
    comp.name.toLowerCase().includes(lowerQuery) ||
    comp.description.toLowerCase().includes(lowerQuery) ||
    comp.tags?.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
}

export function getAllComponentIds(): string[] {
  return Object.keys(componentRegistry);
}

export function getComponentCount(): number {
  return Object.keys(componentRegistry).length;
}
