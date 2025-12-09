import type { ComponentRegistry } from './types';

export const componentRegistry: ComponentRegistry = {
  button: {
    id: 'button',
    name: 'Button',
    description: 'A clickable element that triggers an action.',
    category: 'action',
    source: {
      packageName: 'ui-lab-component',
      exportName: 'Button',
      packagePath: 'dist/index.d.ts',
    },
    relatedComponents: ['button-group'],
    tags: ['cta', 'interactive', 'primary-action'],
    accessibility: {
      hasAriaSupport: true,
      notes: ['Supports keyboard navigation', 'Screen reader friendly']
    }
  },

  'button-group': {
    id: 'button-group',
    name: 'Button Group',
    description: 'A group of related buttons displayed together.',
    category: 'action',
    source: {
      packageName: 'ui-lab-component',
      exportName: 'ButtonGroup',
      packagePath: 'dist/index.d.ts',
    },
    relatedComponents: ['button'],
    tags: ['grouped', 'toggle', 'multi-select'],
    accessibility: {
      hasAriaSupport: true,
      notes: ['Supports keyboard navigation', 'Role-based selection']
    }
  },

  input: {
    id: 'input',
    name: 'Input',
    description: 'Text input field for capturing user data.',
    category: 'input',
    source: {
      packageName: 'ui-lab-component',
      exportName: 'Input',
      packagePath: 'dist/index.d.ts',
    },
    relatedComponents: ['label', 'form-wrapper'],
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
      packageName: 'ui-lab-component',
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
      packageName: 'ui-lab-component',
      exportName: 'Select',
      packagePath: 'dist/index.d.ts',
    },
    relatedComponents: ['input', 'label', 'form-wrapper'],
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
      packageName: 'ui-lab-component',
      exportName: 'TextArea',
      packagePath: 'dist/index.d.ts',
    },
    relatedComponents: ['input', 'label', 'form-wrapper'],
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
      packageName: 'ui-lab-component',
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
      packageName: 'ui-lab-component',
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
      packageName: 'ui-lab-component',
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
      packageName: 'ui-lab-component',
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
      packageName: 'ui-lab-component',
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

  'form-wrapper': {
    id: 'form-wrapper',
    name: 'Form Wrapper',
    description: 'A wrapper component for organizing form elements.',
    category: 'composition',
    source: {
      packageName: 'ui-lab-component',
      exportName: 'FormWrapper',
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
      packageName: 'ui-lab-component',
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
      packageName: 'ui-lab-component',
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
      packageName: 'ui-lab-component',
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

  'context-menu': {
    id: 'context-menu',
    name: 'Context Menu',
    description: 'A context menu for right-click actions.',
    category: 'navigation',
    source: {
      packageName: 'ui-lab-component',
      exportName: 'ContextMenu',
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
      packageName: 'ui-lab-component',
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
      packageName: 'ui-lab-component',
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
      packageName: 'ui-lab-component',
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
      packageName: 'ui-lab-component',
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
    name: 'Command Palette',
    description: 'A searchable command palette for quick access to actions.',
    category: 'action',
    source: {
      packageName: 'ui-lab-component',
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

  confirmation: {
    id: 'confirmation',
    name: 'Confirmation',
    description: 'A confirmation dialog for critical user actions.',
    category: 'action',
    source: {
      packageName: 'ui-lab-component',
      exportName: 'Confirmation',
      packagePath: 'dist/index.d.ts',
    },
    relatedComponents: ['modal', 'button', 'card'],
    tags: ['dialog', 'confirmation', 'safety'],
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
      packageName: 'ui-lab-component',
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
      packageName: 'ui-lab-component',
      exportName: 'Table',
      packagePath: 'dist/index.d.ts',
    },
    relatedComponents: ['card'],
    tags: ['data', 'table', 'display'],
    accessibility: {
      hasAriaSupport: true,
      notes: ['Table role', 'Header associations', 'Keyboard navigation']
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
