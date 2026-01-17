import HeroMetadata from './Hero';
import type { SectionRegistry, SectionMetadata } from '../types';

export const sectionRegistry: SectionRegistry = {
  hero: HeroMetadata,
};

export function getSectionById(id: string): SectionMetadata | undefined {
  return sectionRegistry[id.toLowerCase()];
}

export function getAllSections(): SectionMetadata[] {
  return Object.values(sectionRegistry);
}

export function getSectionsByCategory(categoryId: string): SectionMetadata[] {
  return Object.values(sectionRegistry).filter(section => section.category === categoryId);
}

export function getSectionsInCategory(sections: SectionMetadata[], categoryId: string): SectionMetadata[] {
  return sections.filter(s => s.category === categoryId);
}

export function getSectionsByTag(tag: string): SectionMetadata[] {
  return Object.values(sectionRegistry).filter(section =>
    section.tags.some(t => t.toLowerCase().includes(tag.toLowerCase()))
  );
}

export function searchSections(query: string): SectionMetadata[] {
  const lowerQuery = query.toLowerCase();
  return Object.values(sectionRegistry).filter(section =>
    section.name.toLowerCase().includes(lowerQuery) ||
    section.description.toLowerCase().includes(lowerQuery) ||
    section.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
}

export function getAllSectionCategories(): string[] {
  const categories = new Set<string>();
  Object.values(sectionRegistry).forEach(section => {
    categories.add(section.category);
  });
  return Array.from(categories).sort();
}

export function getAllSectionTags(): string[] {
  const tags = new Set<string>();
  Object.values(sectionRegistry).forEach(section => {
    section.tags.forEach(tag => tags.add(tag));
  });
  return Array.from(tags).sort();
}

export type { SectionRegistry, SectionMetadata, SectionVariant } from '../types';
export type { SectionCategoryId, SectionCategoryDefinition } from './categories';
export { sectionCategories, getCategoryForSection, groupSectionsByCategory } from './categories';
