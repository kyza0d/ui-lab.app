import type { CategoryDefinition, ComponentCategory } from './types.js';

export const categories: CategoryDefinition[] = [
  {
    id: 'input',
    name: 'Input Components',
    label: 'Input',
    description: 'Form inputs for capturing user data',
    icon: '⌨️'
  },
  {
    id: 'information',
    name: 'Information Components',
    label: 'Information',
    description: 'Components for presenting information',
    icon: '👁️'
  },
  {
    id: 'feedback',
    name: 'Feedback Components',
    label: 'Feedback',
    description: 'Components for system notifications and feedback',
    icon: '💬'
  },
  {
    id: 'navigation',
    name: 'Navigation Components',
    label: 'Navigation',
    description: 'Components for organizing and navigating content',
    icon: '🧭'
  },
  {
    id: 'container',
    name: 'Container Components',
    label: 'Container',
    description: 'Components for wrapping and structuring content',
    icon: '📦'
  },
  {
    id: 'action',
    name: 'Action Components',
    label: 'Action',
    description: 'Components for triggering user actions',
    icon: '⚡'
  },
  {
    id: 'composition',
    name: 'Composition Components',
    label: 'Composition',
    description: 'Components that combine other components',
    icon: '🧩'
  },
  {
    id: 'layout',
    name: 'Layout Components',
    label: 'Layout',
    description: 'Components for organizing and separating content',
    icon: '📐'
  },
  {
    id: 'data',
    name: 'Data Components',
    label: 'Data',
    description: 'Components for displaying and managing data like tables and visualizations',
    icon: '📊'
  },
  {
    id: 'experimental',
    name: 'Experimental Components',
    label: 'Experimental',
    description: 'Experimental components that are still in development and may change',
    icon: '🧪'
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
