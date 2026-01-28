import type { ElementCategoryId } from './elements/categories.js';

export const elementOrder: Record<ElementCategoryId, string[]> = {
  layout: ['sidebar', 'header', 'page'],
  navigation: [],
  form: [],
  content: [],
  card: [],
  documentation: [],
  ai: [],
  other: [],
};

export const getElementsInOrder = (category: ElementCategoryId): string[] => {
  return elementOrder[category] ?? [];
};

export const getAllElementsInOrder = (): string[] => {
  return Object.values(elementOrder).flat();
};
