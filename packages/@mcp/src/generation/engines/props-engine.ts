/**
 * Props Engine
 * Formats props correctly for TSX code generation
 *
 * Handles:
 * - String props (quoted)
 * - Boolean props (bare true/false)
 * - Number props (bare numbers)
 * - Object props (formatted as {...})
 * - Function props (as references)
 */

import type { ComponentGenerationSpec, PropValue } from '../../types/index.js';

/**
 * Format a single prop value for TSX
 */
export function formatPropValue(propValue: PropValue): string {
  const { value, source } = propValue;

  // Handle different types
  if (typeof value === 'string') {
    // String values go in quotes (unless it's a CSS var reference)
    if (source === 'design-token') {
      return `var(${value})`;
    }
    return `"${value.replace(/"/g, '\\"')}"`;
  }

  if (typeof value === 'boolean') {
    // Boolean values don't need quotes or curly braces
    return value ? 'true' : 'false';
  }

  if (typeof value === 'number') {
    // Number values don't need quotes but go in braces
    return `{${value}}`;
  }

  if (value === null) {
    return 'null';
  }

  if (value === undefined) {
    return 'undefined';
  }

  if (Array.isArray(value)) {
    // Array values
    const items = value.map((item) =>
      typeof item === 'string' ? `"${item.replace(/"/g, '\\"')}"` : String(item)
    );
    return `{[${items.join(', ')}]}`;
  }

  if (typeof value === 'object') {
    // Object values
    const pairs = Object.entries(value).map(([key, val]) => {
      const formattedVal =
        typeof val === 'string' ? `"${val.replace(/"/g, '\\"')}"` : String(val);
      return `${key}: ${formattedVal}`;
    });
    return `{{${pairs.join(', ')}}}`;
  }

  // Default: convert to string and wrap in braces
  return `{${String(value)}}`;
}

/**
 * Format a single prop for inclusion in JSX
 */
export function formatProp(propName: string, propValue: PropValue): string {
  const formattedValue = formatPropValue(propValue);

  // Special handling for certain props
  if (formattedValue.startsWith('var(')) {
    // Design token reference - use style prop
    return `style={{ ${propName}: ${formattedValue} }}`;
  }

  // Boolean props can be abbreviated if true
  if (formattedValue === 'true' && propName.startsWith('is') || propName === 'disabled') {
    return propName;
  }

  if (formattedValue === 'false') {
    // Don't include false boolean props in JSX
    return '';
  }

  // Regular prop
  return `${propName}=${formattedValue}`;
}

/**
 * Format all props from a spec into JSX prop string
 */
export function formatPropsForJSX(spec: ComponentGenerationSpec): string {
  if (!spec.props || Object.keys(spec.props).length === 0) {
    return '';
  }

  const propStrings: string[] = [];

  for (const [propName, propValue] of Object.entries(spec.props)) {
    const formatted = formatProp(propName, propValue);
    if (formatted) {
      propStrings.push(formatted);
    }
  }

  if (propStrings.length === 0) {
    return '';
  }

  return '\n  ' + propStrings.join('\n  ');
}

/**
 * Generate style prop from design tokens
 */
export function generateStylePropFromTokens(spec: ComponentGenerationSpec): string | null {
  if (!spec.design?.colors) {
    return null;
  }

  const styleProperties: string[] = [];

  for (const [role, assignment] of Object.entries(spec.design.colors)) {
    // Map color role to CSS property name
    let cssProperty = role; // 'background' -> background, 'text' -> text

    if (role === 'text' || role === 'foreground') {
      cssProperty = 'color';
    }

    const value = `var(${assignment.cssVar})`;
    styleProperties.push(`${cssProperty}: ${value}`);
  }

  if (styleProperties.length === 0) {
    return null;
  }

  return `style={{ ${styleProperties.join(', ')} }}`;
}

/**
 * Build complete props string for JSX opening tag
 * Returns formatted props ready to insert in JSX
 */
export function buildPropsString(spec: ComponentGenerationSpec): string {
  const props: string[] = [];

  // Add regular props
  if (spec.props) {
    for (const [propName, propValue] of Object.entries(spec.props)) {
      const formatted = formatProp(propName, propValue);
      if (formatted) {
        props.push(formatted);
      }
    }
  }

  // Add style prop from design tokens
  const styleFromTokens = generateStylePropFromTokens(spec);
  if (styleFromTokens) {
    props.push(styleFromTokens);
  }

  // Add spacing if specified
  if (spec.design?.spacing) {
    const spacingPairs = Object.entries(spec.design.spacing).map(
      ([property, value]) => `${property}: "${value}"`
    );
    if (spacingPairs.length > 0) {
      props.push(`style={{ ${spacingPairs.join(', ')} }}`);
    }
  }

  if (props.length === 0) {
    return '';
  }

  return '\n  ' + props.join('\n  ');
}
