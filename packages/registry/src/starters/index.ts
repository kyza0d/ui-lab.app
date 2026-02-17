import type { StarterRegistry, StarterMetadata } from '../types.js';
import nextjsStarter from './NextJS/index.js';
import viteStarter from './Vite/index.js';
import tauriStarter from './Tauri/index.js';
import astroStarter from './Astro/index.js';
import documentationStarter from './Documentation/index.js';
import productivityStarter from './Productivity/index.js';
import crmStarter from './CRM/index.js';
import blogStarter from './Blog/index.js';

export const starterRegistry: StarterRegistry = {
  [nextjsStarter.id]: nextjsStarter,
  [viteStarter.id]: viteStarter,
  [tauriStarter.id]: tauriStarter,
  [astroStarter.id]: astroStarter,
  [documentationStarter.id]: documentationStarter,
  [productivityStarter.id]: productivityStarter,
  [crmStarter.id]: crmStarter,
  [blogStarter.id]: blogStarter,
};

export function getStarterById(id: string): StarterMetadata | undefined {
  return starterRegistry[id.toLowerCase()];
}

export function getAllStarters(): StarterMetadata[] {
  return Object.values(starterRegistry);
}

export function getStartersByCategory(categoryId: string): StarterMetadata[] {
  return Object.values(starterRegistry).filter(starter => starter.category === categoryId);
}

export function getStartersInCategory(starters: StarterMetadata[], categoryId: string): StarterMetadata[] {
  return starters.filter(s => s.category === categoryId);
}

export function getStartersByTag(tag: string): StarterMetadata[] {
  return Object.values(starterRegistry).filter(starter =>
    starter.tags.some(t => t.toLowerCase().includes(tag.toLowerCase()))
  );
}

export function searchStarters(query: string): StarterMetadata[] {
  const lowerQuery = query.toLowerCase();
  return Object.values(starterRegistry).filter(starter =>
    starter.name.toLowerCase().includes(lowerQuery) ||
    starter.description.toLowerCase().includes(lowerQuery) ||
    starter.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
}

export function getAllStarterCategories(): string[] {
  const categories = new Set<string>();
  Object.values(starterRegistry).forEach(starter => {
    categories.add(starter.category);
  });
  return Array.from(categories).sort();
}

export function getAllStarterTags(): string[] {
  const tags = new Set<string>();
  Object.values(starterRegistry).forEach(starter => {
    starter.tags.forEach(tag => tags.add(tag));
  });
  return Array.from(tags).sort();
}

export type { StarterRegistry, StarterMetadata, StarterVariant } from '../types.js';
