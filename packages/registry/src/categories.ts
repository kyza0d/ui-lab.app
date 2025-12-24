import type { CategoryDefinition, ComponentCategory } from './types.js';

export const categories: CategoryDefinition[] = [
  {
    id: 'input',
    name: 'Input Components',
    label: 'Input',
    description: 'Form elements for capturing and validating user input, such as text fields, checkboxes, radio buttons, selects, and sliders.',
  },
  {
    id: 'information',
    name: 'Information Components',
    label: 'Information',
    description: 'Read-only components for displaying static content like labels, badges, tooltips, and descriptive text.',
  },
  {
    id: 'feedback',
    name: 'Feedback Components',
    label: 'Feedback',
    description: 'Components that notify users of system status, success, errors, or progress through alerts and temporary messages.',
  },
  {
    id: 'navigation',
    name: 'Navigation Components',
    label: 'Navigation',
    description: 'Elements that guide users through the app, including menus, tabs, breadcrumbs, and navigation bars.',
  },
  {
    id: 'container',
    name: 'Container Components',
    label: 'Container',
    description: 'Components that group and organize related content with visual and semantic structure.',
  },
  {
    id: 'action',
    name: 'Action Components',
    label: 'Action',
    description: 'Interactive elements like buttons and links that trigger actions, navigation, or form submission.',
  },
  {
    id: 'composition',
    name: 'Composition Components',
    label: 'Composition',
    description: 'Higher-level components combining primitives to create complex, reusable UI patterns.',
  },
  {
    id: 'layout',
    name: 'Layout Components',
    label: 'Layout',
    description: 'Components for arranging and structuring page content using grids, flexbox, or other layout systems.',
  },
  {
    id: 'data',
    name: 'Data Components',
    label: 'Data',
    description: 'Components for displaying and interacting with datasets, such as tables, lists, and data visualizations.',
  },
  {
    id: 'experimental',
    name: 'Experimental Components',
    label: 'Experimental',
    description: 'Unstable components in active development; APIs may change or be removed.',
  }
];

export const categoryMap = categories.reduce((acc, cat) => {
  acc[cat.id] = cat;
  return acc;
}, {} as Record<ComponentCategory, CategoryDefinition>);

export const categoryOrder: ComponentCategory[] = [
  'layout',
  'composition',
  'action',
  'input',
  'information',
  'feedback',
  'navigation',
  'container',
  'data',
  'experimental'
];
