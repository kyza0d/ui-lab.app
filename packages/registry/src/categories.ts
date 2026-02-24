import type { CategoryDefinition } from './types.js';
import { categoryIconConfig } from './icons-config.js';

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
    iconName: categoryIconConfig.layout.name,
  },
  composition: {
    id: 'composition',
    name: 'Composition Components',
    label: 'Composition',
    description: 'Higher-level components combining primitives to create complex, reusable UI patterns.',
    iconName: categoryIconConfig.composition.name,
  },
  action: {
    id: 'action',
    name: 'Action Components',
    label: 'Action',
    description: 'Interactive elements like buttons and links that trigger actions, navigation, or form submission.',
    iconName: categoryIconConfig.action.name,
  },
  input: {
    id: 'input',
    name: 'Input Components',
    label: 'Input',
    description: 'Form elements for capturing and validating user input, such as text fields, checkboxes, radio buttons, selects, and sliders.',
    iconName: categoryIconConfig.input.name,
  },
  information: {
    id: 'information',
    name: 'Information Components',
    label: 'Information',
    description: 'Read-only components for displaying static content like labels, badges, tooltips, and descriptive text.',
    iconName: categoryIconConfig.information.name,
  },
  feedback: {
    id: 'feedback',
    name: 'Feedback Components',
    label: 'Feedback',
    description: 'Components that notify users of system status, success, errors, or progress through alerts and temporary messages.',
    iconName: categoryIconConfig.feedback.name,
  },
  navigation: {
    id: 'navigation',
    name: 'Navigation Components',
    label: 'Navigation',
    description: 'Elements that guide users through the app, including menus, tabs, breadcrumbs, and navigation bars.',
    iconName: categoryIconConfig.navigation.name,
  },
  container: {
    id: 'container',
    name: 'Container Components',
    label: 'Container',
    description: 'Components that group and organize related content with visual and semantic structure.',
    iconName: categoryIconConfig.container.name,
  },
  display: {
    id: 'display',
    name: 'Display Components',
    label: 'Display',
    description: 'Components for displaying and presenting content, such as tables, galleries, and data visualizations.',
    iconName: categoryIconConfig.display.name,
  },
} as const;

/**
 * Category map for quick lookup by category ID.
 * Derived from the ordered categories object.
 */
export const categoryMap = categories as unknown as Record<keyof typeof categories, CategoryDefinition>;
