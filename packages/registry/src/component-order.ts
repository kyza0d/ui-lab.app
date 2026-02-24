import type { ComponentCategory } from './types.js';

/**
 * Component order organized by category.
 * The order of items within each category array defines how components are displayed.
 * Simply move a component to a different position in the array to change its order.
 */
export const componentOrder: Record<ComponentCategory, string[]> = {
  layout: ['grid', 'flex', 'gallery', 'divider', 'fold', 'card'],
  composition: ['group', 'list', 'panel',],
  action: ['button', 'confirm', 'command'],
  input: ['date', 'checkbox', 'color', 'input', 'radio', 'select', 'slider', 'switch', 'textarea'],
  information: ['banner', 'badge', 'label', 'tooltip'],
  feedback: ['popover', 'progress', 'toast'],
  navigation: ['breadcrumbs', 'menu', 'tabs', 'anchor'],
  container: ['page', 'modal', 'scroll', 'mask', 'frame'],
  display: ['table', 'code'],
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
