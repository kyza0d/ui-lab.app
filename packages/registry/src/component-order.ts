import type { ComponentCategory } from './types.js';

/**
 * Component order organized by category.
 * The order of items within each category array defines how components are displayed.
 * Simply move a component to a different position in the array to change its order.
 */
export const componentOrder: Record<ComponentCategory, string[]> = {
  layout: ['grid', 'flex', 'gallery', 'divider', 'fold'],
  composition: ['form', 'group', 'list'],
  action: ['button', 'confirm'],
  input: ['checkbox', 'input', 'radio', 'select', 'slider', 'switch', 'textarea'],
  information: ['badge', 'label', 'tooltip'],
  feedback: ['popover', 'progress'],
  navigation: ['breadcrumbs', 'menu', 'tabs'],
  container: ['card', 'modal', 'scrollarea'],
  data: ['table'],
  experimental: ['toast'],
};

/**
 * Get the ordered list of components for a given category.
 */
export const getComponentsInOrder = (category: ComponentCategory): string[] => {
  return componentOrder[category] ?? [];
};

/**
 * Get all components across all categories in their defined order.
 */
export const getAllComponentsInOrder = (): string[] => {
  return Object.values(componentOrder).flat();
};
