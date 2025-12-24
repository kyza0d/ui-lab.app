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
  const lowerQuery = query.toLowerCase().trim();
  if (!lowerQuery) return [];

  // Split query into tokens for flexible matching
  const tokens = lowerQuery
    .split(/\s+/) // Split on whitespace
    .filter(token => token.length > 0);

  // Score each component based on matches
  const scored = Object.values(componentRegistry).map(comp => {
    let score = 0;
    const compName = comp.name.toLowerCase();
    const compDesc = comp.description.toLowerCase();
    const compCategory = comp.category.toLowerCase();
    const compTags = (comp.tags || []).map(t => t.toLowerCase());
    const relatedNames = (comp.relatedComponents || [])
      .map(id => (getComponentById(id)?.name || '').toLowerCase());

    for (const token of tokens) {
      if (compName === token) score += 100;
      else if (compName.includes(token)) score += 50;
      else if (compCategory.includes(token)) score += 30;
      else if (compDesc.includes(token)) score += 20;
      else if (compTags.some(tag => tag === token)) score += 25;
      else if (compTags.some(tag => tag.includes(token))) score += 15;
      else if (relatedNames.some(name => name.includes(token))) score += 10;
    }

    return { component: comp, score };
  });

  return scored
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ component }) => component);
}

export function getAllComponentIds(): string[] {
  return Object.keys(componentRegistry);
}

export function getComponentCount(): number {
  return Object.keys(componentRegistry).length;
}
