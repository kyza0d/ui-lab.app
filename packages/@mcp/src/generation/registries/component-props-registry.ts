/**
 * Component Props Registry
 * Metadata about what props each component accepts
 *
 * This registry allows validators to check:
 * - Is a prop valid for this component?
 * - Is a prop required?
 * - What type of value does a prop expect?
 */

import type { ComponentAPIRegistry, ChildrenMetadata, PropMetadata } from '../../types/index.js';

/**
 * Pre-defined registry of component APIs
 * Maps component ID to its API metadata
 */
export const COMPONENT_PROPS_REGISTRY: Record<string, ComponentAPIRegistry> = {
  button: {
    id: 'button',
    acceptedProps: ['variant', 'disabled', 'size', 'className', 'onClick', 'children'],
    requiredProps: [],
    props: {
      variant: {
        name: 'variant',
        type: 'enum',
        required: false,
        typeSpec: { values: ['primary', 'secondary', 'danger', 'ghost'] },
        defaultValue: 'primary',
        description: 'Button style variant',
      },
      disabled: {
        name: 'disabled',
        type: 'boolean',
        required: false,
        defaultValue: false,
        description: 'Whether the button is disabled',
      },
      size: {
        name: 'size',
        type: 'enum',
        required: false,
        typeSpec: { values: ['sm', 'md', 'lg'] },
        defaultValue: 'md',
        description: 'Button size',
      },
      className: {
        name: 'className',
        type: 'string',
        required: false,
        description: 'Additional CSS classes',
      },
      onClick: {
        name: 'onClick',
        type: 'function',
        required: false,
        description: 'Click event handler',
      },
      children: {
        name: 'children',
        type: 'ReactNode',
        required: false,
        description: 'Button content',
      },
    },
    children: {
      allowedTypes: 'text',
      description: 'Accepts text content or icon components',
    },
  },

  input: {
    id: 'input',
    acceptedProps: ['type', 'placeholder', 'value', 'onChange', 'disabled', 'error', 'className'],
    requiredProps: [],
    props: {
      type: {
        name: 'type',
        type: 'enum',
        required: false,
        typeSpec: { values: ['text', 'email', 'password', 'number', 'tel', 'url'] },
        defaultValue: 'text',
        description: 'Input type',
      },
      placeholder: {
        name: 'placeholder',
        type: 'string',
        required: false,
        description: 'Placeholder text',
      },
      value: {
        name: 'value',
        type: 'string|number',
        required: false,
        description: 'Input value',
      },
      onChange: {
        name: 'onChange',
        type: 'function',
        required: false,
        description: 'Change event handler',
      },
      disabled: {
        name: 'disabled',
        type: 'boolean',
        required: false,
        defaultValue: false,
        description: 'Whether the input is disabled',
      },
      error: {
        name: 'error',
        type: 'boolean',
        required: false,
        defaultValue: false,
        description: 'Whether to show error state',
      },
      className: {
        name: 'className',
        type: 'string',
        required: false,
        description: 'Additional CSS classes',
      },
    },
    children: {
      allowedTypes: 'none',
      description: 'Input does not accept children',
    },
  },

  card: {
    id: 'card',
    acceptedProps: ['title', 'variant', 'className', 'children'],
    requiredProps: [],
    props: {
      title: {
        name: 'title',
        type: 'string|ReactNode',
        required: false,
        description: 'Card title',
      },
      variant: {
        name: 'variant',
        type: 'enum',
        required: false,
        typeSpec: { values: ['default', 'elevated', 'outlined'] },
        defaultValue: 'default',
        description: 'Card style variant',
      },
      className: {
        name: 'className',
        type: 'string',
        required: false,
        description: 'Additional CSS classes',
      },
      children: {
        name: 'children',
        type: 'ReactNode',
        required: false,
        description: 'Card content',
      },
    },
    children: {
      allowedTypes: 'any',
      description: 'Accepts any React children',
    },
  },

  badge: {
    id: 'badge',
    acceptedProps: ['variant', 'size', 'className', 'children'],
    requiredProps: [],
    props: {
      variant: {
        name: 'variant',
        type: 'enum',
        required: false,
        typeSpec: { values: ['default', 'success', 'danger', 'warning', 'info'] },
        defaultValue: 'default',
        description: 'Badge style variant',
      },
      size: {
        name: 'size',
        type: 'enum',
        required: false,
        typeSpec: { values: ['sm', 'md', 'lg'] },
        defaultValue: 'md',
        description: 'Badge size',
      },
      className: {
        name: 'className',
        type: 'string',
        required: false,
        description: 'Additional CSS classes',
      },
      children: {
        name: 'children',
        type: 'ReactNode',
        required: false,
        description: 'Badge content',
      },
    },
    children: {
      allowedTypes: 'text',
      description: 'Accepts text content',
    },
  },

  alert: {
    id: 'alert',
    acceptedProps: ['variant', 'title', 'description', 'className', 'children'],
    requiredProps: [],
    props: {
      variant: {
        name: 'variant',
        type: 'enum',
        required: false,
        typeSpec: { values: ['success', 'danger', 'warning', 'info'] },
        defaultValue: 'info',
        description: 'Alert style variant',
      },
      title: {
        name: 'title',
        type: 'string|ReactNode',
        required: false,
        description: 'Alert title',
      },
      description: {
        name: 'description',
        type: 'string|ReactNode',
        required: false,
        description: 'Alert description',
      },
      className: {
        name: 'className',
        type: 'string',
        required: false,
        description: 'Additional CSS classes',
      },
      children: {
        name: 'children',
        type: 'ReactNode',
        required: false,
        description: 'Alert content (alternative to description)',
      },
    },
    children: {
      allowedTypes: 'any',
      description: 'Accepts any React children',
    },
  },
};

/**
 * Get the API registry for a component
 */
export function getComponentRegistry(componentId: string): ComponentAPIRegistry | null {
  return COMPONENT_PROPS_REGISTRY[componentId] || null;
}

/**
 * Check if a component exists in the registry
 */
export function hasComponent(componentId: string): boolean {
  return componentId in COMPONENT_PROPS_REGISTRY;
}

/**
 * Get all registered components
 */
export function getAllComponents(): string[] {
  return Object.keys(COMPONENT_PROPS_REGISTRY);
}

/**
 * Check if a prop is valid for a component
 */
export function isPropValid(componentId: string, propName: string): boolean {
  const registry = getComponentRegistry(componentId);
  return registry ? registry.acceptedProps.includes(propName) : false;
}

/**
 * Check if a prop is required for a component
 */
export function isPropRequired(componentId: string, propName: string): boolean {
  const registry = getComponentRegistry(componentId);
  return registry ? registry.requiredProps.includes(propName) : false;
}

/**
 * Get prop metadata for a component
 */
export function getPropMetadata(componentId: string, propName: string): PropMetadata | null {
  const registry = getComponentRegistry(componentId);
  return registry?.props[propName] || null;
}

/**
 * Get children metadata for a component
 */
export function getChildrenMetadata(componentId: string): ChildrenMetadata | null {
  const registry = getComponentRegistry(componentId);
  return registry?.children || null;
}
