import type { ElementMetadata } from '../types';

export type ElementCategoryId = 'layout' | 'form' | 'navigation' | 'content' | 'card' | 'other';

export interface ElementCategoryDefinition {
  id: ElementCategoryId;
  name: string;
  label: string;
  description: string;
}

export const elementCategories: Record<ElementCategoryId, ElementCategoryDefinition> = {
  layout: {
    id: 'layout',
    name: 'Layout',
    label: 'Layout',
    description: 'Structural elements for page layouts including headers, sidebars, and containers',
  },
  navigation: {
    id: 'navigation',
    name: 'Navigation',
    label: 'Navigation',
    description: 'Elements for navigation and routing within the application',
  },
  form: {
    id: 'form',
    name: 'Form',
    label: 'Form',
    description: 'Form elements for user input and data collection',
  },
  content: {
    id: 'content',
    name: 'Content',
    label: 'Content',
    description: 'Elements for displaying content and information',
  },
  card: {
    id: 'card',
    name: 'Card',
    label: 'Card',
    description: 'Card-based elements for grouped content display',
  },
  other: {
    id: 'other',
    name: 'Other',
    label: 'Other',
    description: 'Miscellaneous elements that do not fit other categories',
  },
};

export const elementCategoryMapping: Record<string, ElementCategoryId> = {
  header: 'layout',
  sidebar: 'layout',
};

export const getCategoryForElement = (elementId: string): ElementCategoryId =>
  elementCategoryMapping[elementId] ?? 'other';

export const getCategoryDefinition = (categoryId: ElementCategoryId): ElementCategoryDefinition =>
  elementCategories[categoryId];

export const groupElementsByCategory = (
  elements: ElementMetadata[]
): Record<ElementCategoryId, ElementMetadata[]> => {
  const grouped = Object.keys(elementCategories).reduce(
    (acc, key) => ({ ...acc, [key]: [] }),
    {} as Record<ElementCategoryId, ElementMetadata[]>
  );
  elements.forEach((element) => {
    const categoryId = getCategoryForElement(element.id);
    grouped[categoryId].push(element);
  });
  return grouped;
};

export const getElementsInCategory = (
  elements: ElementMetadata[],
  categoryId: ElementCategoryId
): ElementMetadata[] => elements.filter((el) => getCategoryForElement(el.id) === categoryId);

export const getCategoriesWithElements = (
  elements: ElementMetadata[]
): Array<{ category: ElementCategoryDefinition; elements: ElementMetadata[] }> => {
  const grouped = groupElementsByCategory(elements);
  return Object.entries(grouped)
    .filter(([, els]) => els.length > 0)
    .map(([categoryId, els]) => ({
      category: elementCategories[categoryId as ElementCategoryId],
      elements: els,
    }));
};
