/**
 * Code Generation Utilities
 * Generates TypeScript/TSX code for components
 */

import type { ComponentMetadata, PropDefinition } from 'ui-lab-registry';

export interface CodeGenerationOptions {
  componentId: string;
  variant?: string;
  props?: Record<string, unknown>;
  children?: string;
  component?: ComponentMetadata;
}

/**
 * Format a value for use in JSX/TSX code
 */
function formatValue(value: unknown): string {
  if (typeof value === 'string') {
    return `"${value.replace(/"/g, '\\"')}"`;
  }
  if (typeof value === 'boolean') {
    return value.toString();
  }
  if (typeof value === 'number') {
    return value.toString();
  }
  if (Array.isArray(value)) {
    return `[${value.map(formatValue).join(', ')}]`;
  }
  if (typeof value === 'object' && value !== null) {
    const pairs = Object.entries(value).map(
      ([k, v]) => `${k}: ${formatValue(v)}`
    );
    return `{ ${pairs.join(', ')} }`;
  }
  return 'undefined';
}

/**
 * Generate import statements for a component
 */
export function generateImports(
  componentId: string
): string[] {
  const imports: string[] = [];

  // Main component import
  const componentName = componentId
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');

  imports.push(`import { ${componentName} } from '@ui-lab/components'`);

  // React import if using hooks
  imports.push(`import React from 'react'`);

  return imports;
}

/**
 * Generate component usage code
 */
export function generateComponentCode(
  componentId: string,
  variant?: string,
  props?: Record<string, unknown>,
  children?: string
): string {
  const componentName = componentId
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');

  const propsList: string[] = [];

  if (variant) {
    propsList.push(`variant="${variant}"`);
  }

  if (props) {
    for (const [key, value] of Object.entries(props)) {
      if (typeof value === 'string' && !value.includes('{')) {
        propsList.push(`${key}="${value}"`);
      } else {
        propsList.push(`${key}={${formatValue(value)}}`);
      }
    }
  }

  const propsString = propsList.length > 0 ? ' ' + propsList.join(' ') : '';
  const childrenContent = children ? children : '...';

  if (childrenContent === '...') {
    return `<${componentName}${propsString} />`;
  }

  return `<${componentName}${propsString}>${childrenContent}</${componentName}>`;
}

/**
 * Generate a complete component example file
 */
export function generateComponentFile(
  componentId: string,
  variant?: string,
  props?: Record<string, unknown>,
  children?: string
): string {
  const imports = generateImports(componentId);
  const componentCode = generateComponentCode(componentId, variant, props, children);

  const componentName = componentId
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join('');

  const code = [
    `'use client';`,
    '',
    ...imports.map((imp) => `${imp};`),
    '',
    `export default function ${componentName}Example() {`,
    `  return (`,
    `    <div className="p-4">`,
    `      ${componentCode}`,
    `    </div>`,
    `  );`,
    `}`,
    '',
  ].join('\n');

  return code;
}

/**
 * Validate props against component API
 */
export function validateProps(
  props: Record<string, unknown>,
  propDefinitions: PropDefinition[]
): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  const definedProps = new Map(
    propDefinitions.map((p) => [p.name, p])
  );

  for (const [key, value] of Object.entries(props)) {
    if (!definedProps.has(key)) {
      errors.push(`Unknown prop: ${key}`);
      continue;
    }

    const propDef = definedProps.get(key)!;

    // Check enum values if specified
    if (propDef.enumValues && propDef.enumValues.length > 0) {
      if (!propDef.enumValues.includes(String(value))) {
        errors.push(
          `Invalid value for ${key}: "${value}". Expected one of: ${propDef.enumValues.join(', ')}`
        );
      }
    }
  }

  // Check required props
  for (const propDef of propDefinitions) {
    if (propDef.required && !(propDef.name in props)) {
      errors.push(`Missing required prop: ${propDef.name}`);
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
