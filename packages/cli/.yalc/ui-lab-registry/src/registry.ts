import type { ComponentRegistry } from './types.js';

export const componentRegistry: ComponentRegistry = {
  button: {
    id: 'button',
    name: 'Button',
    description: 'A clickable element that triggers an action.',
    category: 'action',
    source: {
      packageName: 'ui-lab-components',
      exportName: 'Button',
      packagePath: 'dist/index.d.ts',
    },
    relatedComponents: ['group'],
    tags: ['cta', 'interactive', 'primary-action'],
    accessibility: {
      hasAriaSupport: true,
      notes: ['Supports keyboard navigation', 'Screen reader friendly']
    }
  },

  group: {
    id: 'group',
    name: 'Group',
    description: 'A flexible container for grouping Button, Input, and Select components with unified styling.',
    category: 'composition',
    source: {
      packageName: 'ui-lab-components',
      exportName: 'Group',
      packagePath: 'dist/index.d.ts',
    },
    relatedComponents: ['button', 'input', 'select'],
    tags: ['composition', 'grouped', 'compound', 'form'],
    accessibility: {
      hasAriaSupport: true,
      notes: [
        'Uses role="group" for semantic grouping',
        'Propagates disabled state to children',
        'Maintains keyboard navigation for all child components'
      ]
    }
  },

  flex: {
    id: 'flex',
    name: 'Flex',
    description: 'A flexible layout component with container query support for responsive flex layouts.',
    category: 'layout',
    source: {
      packageName: 'ui-lab-components',
      exportName: 'Flex',
      packagePath: 'dist/index.d.ts',
    },
    relatedComponents: ['card', 'group', 'divider'],
    tags: ['layout', 'flex', 'container-queries', 'responsive'],
    accessibility: {
      hasAriaSupport: false,
      notes: [
        'Semantic div element with flexbox layout',
        'No built-in ARIA roles - use for layout purposes',
        'Compose with accessible child components'
      ]
    }
  },

  fold: {
    id: 'fold',
    name: 'Fold',
    description: 'A collapsible disclosure component for expanding and collapsing content sections.',
    category: 'layout',
    source: {
      packageName: 'ui-lab-components',
      exportName: 'Fold',
      packagePath: 'dist/index.d.ts',
    },
    relatedComponents: ['card', 'modal'],
    tags: ['disclosure', 'accordion', 'collapsible', 'expandable'],
    accessibility: {
      hasAriaSupport: true,
      notes: [
        'Full ARIA disclosure pattern support',
        'Keyboard navigation with Tab and Enter/Space',
        'Proper button and panel roles',
        'Screen reader friendly'
      ]
    }
  },

  grid: {
    id: 'grid',
    name: 'Grid',
    description: 'A powerful grid layout component with container query support for responsive grid layouts.',
    category: 'layout',
    source: {
      packageName: 'ui-lab-components',
      exportName: 'Grid',
      packagePath: 'dist/index.d.ts',
    },
    relatedComponents: ['flex', 'card', 'divider'],
    tags: ['layout', 'grid', 'container-queries', 'responsive', 'columns'],
    accessibility: {
      hasAriaSupport: false,
      notes: [
        'Semantic div element with grid layout',
        'No built-in ARIA roles - use for layout purposes',
        'Compose with accessible child components'
      ]
    }
  },

  input: {
    id: 'input',
    name: 'Input',
    description: 'Text input field for capturing user data.',
    category: 'input',
    source: {
      packageName: 'ui-lab-components',
      exportName: 'Input',
      packagePath: 'dist/index.d.ts',
    },
    relatedComponents: ['label', 'form', 'group'],
    tags: ['form', 'text', 'user-input'],
    accessibility: {
      hasAriaSupport: true,
      notes: ['Works with label elements', 'Supports placeholder text', 'Keyboard accessible']
    }
  },

  label: {
    id: 'label',
    name: 'Label',
    description: 'Text label for form elements.',
    category: 'display',
    source: {
      packageName: 'ui-lab-components',
      exportName: 'Label',
      packagePath: 'dist/index.d.ts',
    },
    relatedComponents: ['input', 'checkbox', 'radio', 'switch'],
    tags: ['form', 'text', 'accessibility'],
    accessibility: {
      hasAriaSupport: true,
      notes: ['Associates with form controls', 'Improves accessibility']
    }
  },

  select: {
    id: 'select',
    name: 'Select',
    description: 'Dropdown select component for choosing from multiple options.',
    category: 'input',
    source: {
      packageName: 'ui-lab-components',
      exportName: 'Select',
      packagePath: 'dist/index.d.ts',
    },
    relatedComponents: ['input', 'label', 'form', 'group'],
    tags: ['form', 'dropdown', 'selection'],
    accessibility: {
      hasAriaSupport: true,
      notes: ['Keyboard accessible', 'Screen reader friendly', 'ARIA roles included']
    }
  },

  textarea: {
    id: 'textarea',
    name: 'Textarea',
    description: 'Multi-line text input field for longer user input.',
    category: 'input',
    source: {
      packageName: 'ui-lab-components',
      exportName: 'TextArea',
      packagePath: 'dist/index.d.ts',
    },
    relatedComponents: ['input', 'label', 'form'],
    tags: ['form', 'text', 'multi-line'],
    accessibility: {
      hasAriaSupport: true,
      notes: ['Works with label elements', 'Resizable option available']
    }
  },

  checkbox: {
    id: 'checkbox',
    name: 'Checkbox',
    description: 'A checkbox input for selecting one or multiple options.',
    category: 'input',
    source: {
      packageName: 'ui-lab-components',
      exportName: 'Checkbox',
      packagePath: 'dist/index.d.ts',
    },
    relatedComponents: ['radio', 'switch', 'label'],
    tags: ['form', 'selection', 'boolean'],
    accessibility: {
      hasAriaSupport: true,
      notes: ['Keyboard accessible', 'Visual focus indicator', 'Works with labels']
    }
  },

  radio: {
    id: 'radio',
    name: 'Radio',
    description: 'A radio button for selecting one option from a group.',
    category: 'input',
    source: {
      packageName: 'ui-lab-components',
      exportName: 'Radio',
      packagePath: 'dist/index.d.ts',
    },
    relatedComponents: ['checkbox', 'switch', 'label'],
    tags: ['form', 'selection', 'single-choice'],
    accessibility: {
      hasAriaSupport: true,
      notes: ['Keyboard accessible', 'Radio group support', 'Arrow key navigation']
    }
  },

  badge: {
    id: 'badge',
    name: 'Badge',
    description: 'A small badge component for displaying labels or status.',
    category: 'display',
    source: {
      packageName: 'ui-lab-components',
      exportName: 'Badge',
      packagePath: 'dist/index.d.ts',
    },
    relatedComponents: [],
    tags: ['label', 'status', 'tag'],
    accessibility: {
      hasAriaSupport: false,
      notes: ['Semantic HTML', 'Use with proper context']
    }
  },

  tooltip: {
    id: 'tooltip',
    name: 'Tooltip',
    description: 'Displays additional information on hover or focus.',
    category: 'display',
    source: {
      packageName: 'ui-lab-components',
      exportName: 'Tooltip',
      packagePath: 'dist/index.d.ts',
    },
    relatedComponents: ['popover'],
    tags: ['information', 'hover', 'help-text'],
    accessibility: {
      hasAriaSupport: true,
      notes: ['Keyboard accessible', 'ARIA labels', 'Focus management']
    }
  },

  popover: {
    id: 'popover',
    name: 'Popover',
    description: 'A popover component for displaying content on demand.',
    category: 'feedback',
    source: {
      packageName: 'ui-lab-components',
      exportName: 'Popover',
      packagePath: 'dist/index.d.ts',
    },
    relatedComponents: ['tooltip', 'modal'],
    tags: ['overlay', 'content', 'information'],
    accessibility: {
      hasAriaSupport: true,
      notes: ['Focus management', 'Dismissible', 'Keyboard support']
    }
  },

  'form': {
    id: 'form',
    name: 'Form',
    description: 'A Form component for organizing form elements.',
    category: 'composition',
    source: {
      packageName: 'ui-lab-components',
      exportName: 'Form',
      packagePath: 'dist/index.d.ts',
    },
    relatedComponents: ['input', 'button', 'label'],
    tags: ['form', 'composition', 'layout'],
    accessibility: {
      hasAriaSupport: true,
      notes: ['Semantic form structure', 'Proper grouping of elements']
    }
  },

  toast: {
    id: 'toast',
    name: 'Toast',
    description: 'A notification component for displaying temporary messages.',
    category: 'feedback',
    source: {
      packageName: 'ui-lab-components',
      exportName: 'Toast',
      packagePath: 'dist/index.d.ts',
    },
    relatedComponents: [],
    tags: ['notification', 'feedback', 'temporary'],
    accessibility: {
      hasAriaSupport: true,
      notes: ['ARIA live regions', 'Role="status"', 'Auto-dismiss support']
    }
  },

  modal: {
    id: 'modal',
    name: 'Modal',
    description: 'A modal dialog for focusing user attention on important content.',
    category: 'container',
    source: {
      packageName: 'ui-lab-components',
      exportName: 'Modal',
      packagePath: 'dist/index.d.ts',
    },
    relatedComponents: ['button', 'card'],
    tags: ['dialog', 'overlay', 'container'],
    accessibility: {
      hasAriaSupport: true,
      notes: ['Focus trap', 'Backdrop focus', 'Keyboard dismissal', 'ARIA dialog role']
    }
  },

  tabs: {
    id: 'tabs',
    name: 'Tabs',
    description: 'A tabbed interface for organizing content into sections.',
    category: 'navigation',
    source: {
      packageName: 'ui-lab-components',
      exportName: 'Tabs',
      packagePath: 'dist/index.d.ts',
    },
    relatedComponents: ['card'],
    tags: ['navigation', 'organization', 'content-switching'],
    accessibility: {
      hasAriaSupport: true,
      notes: ['Keyboard navigation', 'ARIA tab roles', 'Focus management']
    }
  },

  'menu': {
    id: 'menu',
    name: 'Menu',
    description: 'A context menu for right-click actions.',
    category: 'navigation',
    source: {
      packageName: 'ui-lab-components',
      exportName: 'Menu',
      packagePath: 'dist/index.d.ts',
    },
    relatedComponents: ['popover'],
    tags: ['menu', 'right-click', 'actions'],
    accessibility: {
      hasAriaSupport: true,
      notes: ['Keyboard accessible', 'Menu role', 'Focus management']
    }
  },

  switch: {
    id: 'switch',
    name: 'Switch',
    description: 'A toggle switch for boolean input.',
    category: 'input',
    source: {
      packageName: 'ui-lab-components',
      exportName: 'Switch',
      packagePath: 'dist/index.d.ts',
    },
    relatedComponents: ['checkbox', 'radio', 'label'],
    tags: ['form', 'boolean', 'toggle'],
    accessibility: {
      hasAriaSupport: true,
      notes: ['Keyboard accessible', 'ARIA switch role', 'Visual state indication']
    }
  },

  slider: {
    id: 'slider',
    name: 'Slider',
    description: 'A slider component for selecting a value from a range.',
    category: 'input',
    source: {
      packageName: 'ui-lab-components',
      exportName: 'Slider',
      packagePath: 'dist/index.d.ts',
    },
    relatedComponents: ['input', 'label'],
    tags: ['form', 'range', 'numeric'],
    accessibility: {
      hasAriaSupport: true,
      notes: ['Keyboard accessible', 'ARIA range role', 'Arrow key support']
    }
  },

  progress: {
    id: 'progress',
    name: 'Progress',
    description: 'A progress bar component for showing completion status.',
    category: 'feedback',
    source: {
      packageName: 'ui-lab-components',
      exportName: 'Progress',
      packagePath: 'dist/index.d.ts',
    },
    relatedComponents: ['slider'],
    tags: ['feedback', 'status', 'progress'],
    accessibility: {
      hasAriaSupport: true,
      notes: ['ARIA progressbar role', 'aria-valuenow', 'aria-valuemin', 'aria-valuemax']
    }
  },

  card: {
    id: 'card',
    name: 'Card',
    description: 'A card component for grouping related content.',
    category: 'container',
    source: {
      packageName: 'ui-lab-components',
      exportName: 'Card',
      packagePath: 'dist/index.d.ts',
    },
    relatedComponents: ['modal', 'divider'],
    tags: ['container', 'grouping', 'layout'],
    accessibility: {
      hasAriaSupport: false,
      notes: ['Semantic HTML structure', 'Proper heading hierarchy']
    }
  },

  'command-palette': {
    id: 'command-palette',
    name: 'Command',
    description: 'A searchable command palette for quick access to actions.',
    category: 'action',
    source: {
      packageName: 'ui-lab-components',
      exportName: 'CommandPalette',
      packagePath: 'dist/index.d.ts',
    },
    relatedComponents: ['modal', 'input'],
    tags: ['search', 'command', 'navigation'],
    accessibility: {
      hasAriaSupport: true,
      notes: ['Keyboard shortcuts', 'Search support', 'Focus management']
    }
  },

  confirm: {
    id: 'confirm',
    name: 'Confirm',
    description: 'A confirm dialog for critical user actions.',
    category: 'action',
    source: {
      packageName: 'ui-lab-components',
      exportName: 'Confirm',
      packagePath: 'dist/index.d.ts',
    },
    relatedComponents: ['modal', 'button', 'card'],
    tags: ['dialog', 'confirm', 'safety'],
    accessibility: {
      hasAriaSupport: true,
      notes: ['Focus management', 'Clear action buttons', 'Alert dialog role']
    }
  },

  divider: {
    id: 'divider',
    name: 'Divider',
    description: 'A horizontal or vertical divider for separating content.',
    category: 'layout',
    source: {
      packageName: 'ui-lab-components',
      exportName: 'Divider',
      packagePath: 'dist/index.d.ts',
    },
    relatedComponents: ['card', 'modal'],
    tags: ['separator', 'layout', 'visual'],
    accessibility: {
      hasAriaSupport: false,
      notes: ['Semantic divider element', 'Visual separator only']
    }
  },

  table: {
    id: 'table',
    name: 'Table',
    description: 'A table component for displaying and organizing tabular data.',
    category: 'data',
    source: {
      packageName: 'ui-lab-components',
      exportName: 'Table',
      packagePath: 'dist/index.d.ts',
    },
    relatedComponents: ['card'],
    tags: ['data', 'table', 'display'],
    accessibility: {
      hasAriaSupport: true,
      notes: ['Table role', 'Header associations', 'Keyboard navigation']
    }
  },

  breadcrumbs: {
    id: 'breadcrumbs',
    name: 'Breadcrumbs',
    description: 'A navigation component that displays the current page in a hierarchy and allows users to navigate to parent pages.',
    category: 'navigation',
    source: {
      packageName: 'ui-lab-components',
      exportName: 'Breadcrumbs',
      packagePath: 'dist/index.d.ts',
    },
    relatedComponents: [],
    tags: ['navigation', 'breadcrumb', 'hierarchy', 'parent-pages'],
    accessibility: {
      hasAriaSupport: true,
      notes: [
        'Uses nav element with landmark role',
        'Semantic ordered list structure',
        'Current page marked with aria-current',
        'Full keyboard navigation support',
        'Screen reader friendly labels'
      ]
    }
  },

  gallery: {
    id: 'gallery',
    name: 'Gallery',
    description: 'A responsive grid layout component for displaying media content like images, videos, and product cards.',
    category: 'layout',
    source: {
      packageName: 'ui-lab-components',
      exportName: 'Gallery',
      packagePath: 'dist/index.d.ts',
    },
    relatedComponents: ['card', 'grid'],
    tags: ['gallery', 'grid', 'media', 'images', 'video', 'responsive'],
    accessibility: {
      hasAriaSupport: true,
      notes: [
        'Uses React Aria useFocusRing for keyboard focus indication',
        'Supports both link and button interaction modes',
        'Proper focus order through natural DOM order',
        'Hover and focus states for visual feedback'
      ]
    }
  }
};

export const componentMetadata = Object.values(componentRegistry).map(comp => ({
  id: comp.id,
  name: comp.name,
  description: comp.description,
  category: comp.category,
  tags: comp.tags || []
}));
