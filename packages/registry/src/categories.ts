import type { CategoryDefinition } from './types.js';

/**
 * Ordered category definitions. The order of properties defines the category order.
 * Move categories to change their display order - no separate order array needed.
 */
export const categories = {
  layout: {
    id: 'layout',
    name: 'Layout Components',
    label: 'Layout',
    description: 'Components for arranging and structuring page content using grids, flexbox, or other layout systems.',
  },
  composition: {
    id: 'composition',
    name: 'Composition Components',
    label: 'Composition',
    description: 'Higher-level components combining primitives to create complex, reusable UI patterns.',
  },
  action: {
    id: 'action',
    name: 'Action Components',
    label: 'Action',
    description: 'Interactive elements like buttons and links that trigger actions, navigation, or form submission.',
  },
  input: {
    id: 'input',
    name: 'Input Components',
    label: 'Input',
    description: 'Form elements for capturing and validating user input, such as text fields, checkboxes, radio buttons, selects, and sliders.',
  },
  information: {
    id: 'information',
    name: 'Information Components',
    label: 'Information',
    description: 'Read-only components for displaying static content like labels, badges, tooltips, and descriptive text.',
  },
  feedback: {
    id: 'feedback',
    name: 'Feedback Components',
    label: 'Feedback',
    description: 'Components that notify users of system status, success, errors, or progress through alerts and temporary messages.',
  },
  navigation: {
    id: 'navigation',
    name: 'Navigation Components',
    label: 'Navigation',
    description: 'Elements that guide users through the app, including menus, tabs, breadcrumbs, and navigation bars.',
  },
  container: {
    id: 'container',
    name: 'Container Components',
    label: 'Container',
    description: 'Components that group and organize related content with visual and semantic structure.',
  },
  data: {
    id: 'data',
    name: 'Data Components',
    label: 'Data',
    description: 'Components for displaying and interacting with datasets, such as tables, lists, and data visualizations.',
  },
} as const;

/**
 * Category map for quick lookup by category ID.
 * Derived from the ordered categories object.
 */
export const categoryMap = categories as unknown as Record<keyof typeof categories, CategoryDefinition>;
