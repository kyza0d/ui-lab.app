/**
 * Base Component Engine
 * Generates the basic JSX structure for a component
 */

import type { ComponentGenerationSpec } from '../../types/index.js';

/**
 * Generate the opening tag for a component
 */
export function generateComponentOpeningTag(
  componentId: string,
  variant?: string
): string {
  const ComponentName = formatComponentName(componentId);
  let tag = `<${ComponentName}`;

  if (variant) {
    tag += ` variant="${variant}"`;
  }

  return tag;
}

/**
 * Generate the closing tag for a component
 */
export function generateComponentClosingTag(componentId: string): string {
  const ComponentName = formatComponentName(componentId);
  return `</${ComponentName}>`;
}

/**
 * Format component ID to React component name
 * button -> Button, command-palette -> CommandPalette
 */
export function formatComponentName(componentId: string): string {
  return componentId
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

/**
 * Generate base component JSX structure
 * This is a simple wrapper - the props engine, children engine, and styling engine
 * will add their parts
 */
export function generateBaseComponentJSX(spec: ComponentGenerationSpec): {
  opening: string;
  closing: string;
  componentName: string;
} {
  const componentName = formatComponentName(spec.component.id);

  let opening = `<${componentName}`;

  // Add variant if specified
  if (spec.component.variant) {
    opening += `\n  variant="${spec.component.variant}"`;
  }

  return {
    opening,
    closing: `</${componentName}>`,
    componentName,
  };
}

/**
 * Determine if a component should be self-closing
 */
export function isSelfClosing(componentId: string): boolean {
  const selfClosingComponents = ['input', 'divider'];
  return selfClosingComponents.includes(componentId);
}

/**
 * Generate complete opening tag with all props included
 */
export function buildOpeningTag(
  base: string,
  propsString: string,
  isComplete: boolean
): string {
  let tag = base;

  if (propsString) {
    tag += propsString;
  }

  // Close the tag
  tag += isComplete ? ' />' : ' >';

  return tag;
}
