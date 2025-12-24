import type { ElementRegistry } from '../types';
import { header } from './header';
import { sidebar } from './sidebar';
import { card } from './card';

export const elementRegistry: ElementRegistry = {
  header,
  sidebar,
  card,
};

export type { ElementMetadata, ElementVariant } from '../types';

export const elementsList = Object.values(elementRegistry);

export const getElementById = (id: string) => elementRegistry[id];

export const getElementsByCategory = (category: string) =>
  elementsList.filter((el) => el.category === category);

export const getElementsByTag = (tag: string) =>
  elementsList.filter((el) => el.tags.includes(tag));

export const searchElements = (query: string) => {
  const lowerQuery = query.toLowerCase();
  return elementsList.filter(
    (el) =>
      el.name.toLowerCase().includes(lowerQuery) ||
      el.description.toLowerCase().includes(lowerQuery) ||
      el.tags.some((tag) => tag.toLowerCase().includes(lowerQuery))
  );
};

export const getAllCategories = () => {
  const categories = new Set<string>();
  elementsList.forEach((el) => categories.add(el.category));
  return Array.from(categories).sort();
};

export const getAllTags = () => {
  const tags = new Set<string>();
  elementsList.forEach((el) => el.tags.forEach((tag) => tags.add(tag)));
  return Array.from(tags).sort();
};
