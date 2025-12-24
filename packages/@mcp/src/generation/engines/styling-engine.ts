/**
 * Styling Engine
 * Applies design tokens (colors, spacing) to components
 *
 * Handles:
 * - Color token application
 * - Spacing token application
 * - CSS variable generation
 * - Inline style generation
 */

import type { ComponentGenerationSpec, DesignTokenAssignment } from '../../types/index.js';

/**
 * Generate inline style object from color assignments
 */
export function generateColorStyles(colors: Record<string, DesignTokenAssignment>): {
  styles: Record<string, string>;
  cssVars: string[];
} {
  const styles: Record<string, string> = {};
  const cssVars: string[] = [];

  for (const [role, assignment] of Object.entries(colors)) {
    const cssVar = assignment.cssVar;
    cssVars.push(cssVar);

    // Map role to CSS property
    if (role === 'background' || role === 'bg') {
      styles.backgroundColor = `var(${cssVar})`;
    } else if (role === 'text' || role === 'foreground' || role === 'color') {
      styles.color = `var(${cssVar})`;
    } else if (role === 'border' || role === 'borderColor') {
      styles.borderColor = `var(${cssVar})`;
    } else if (role === 'hover') {
      // Hover styles need to be in CSS, not inline
      cssVars.push(`/* hover: ${cssVar} */`);
    } else if (role === 'active') {
      // Active styles need to be in CSS, not inline
      cssVars.push(`/* active: ${cssVar} */`);
    } else if (role === 'disabled') {
      // Disabled styles may need special handling
      cssVars.push(`/* disabled: ${cssVar} */`);
    } else {
      // Generic role, apply as is (camelCase)
      styles[role] = `var(${cssVar})`;
    }
  }

  return { styles, cssVars };
}

/**
 * Generate inline style object from spacing assignments
 */
export function generateSpacingStyles(spacing: Record<string, string>): {
  styles: Record<string, string>;
  cssVars: string[];
} {
  const styles: Record<string, string> = {};
  const cssVars: string[] = [];

  for (const [property, value] of Object.entries(spacing)) {
    // Check if value is a CSS variable reference
    if (value.startsWith('--') || value.startsWith('var(')) {
      cssVars.push(value);
      styles[property] = `var(${value.replace(/^var\(/, '').replace(/\)$/, '')})`;
    } else {
      // Direct value
      styles[property] = value;
    }
  }

  return { styles, cssVars };
}

/**
 * Generate style attribute string from styles object
 */
export function generateStyleAttribute(styles: Record<string, string>): string {
  if (Object.keys(styles).length === 0) {
    return '';
  }

  const pairs = Object.entries(styles).map(([key, value]) => {
    // Convert camelCase to camelCase for React
    return `${key}: '${value}'`;
  });

  return `style={{ ${pairs.join(', ')} }}`;
}

/**
 * Generate className string with design token classes
 */
export function generateDesignTokenClasses(spec: ComponentGenerationSpec): string[] {
  const classes: string[] = [];

  if (spec.design?.colors) {
    for (const [_role, assignment] of Object.entries(spec.design.colors)) {
      // Generate Tailwind-style class name
      const family = assignment.family;
      const shade = assignment.shade;
      classes.push(`${family}-${shade}`);
    }
  }

  if (spec.design?.spacing) {
    for (const [property, value] of Object.entries(spec.design.spacing)) {
      // Generate Tailwind-style spacing class
      const normalized = value.replace(/[^\w]/g, '-');
      classes.push(`${property}-${normalized}`);
    }
  }

  return classes;
}

/**
 * Merge design tokens into existing className prop
 */
export function mergeDesignTokensIntoClassName(
  existingClassName: string | undefined,
  designTokenClasses: string[]
): string {
  const classes: string[] = [];

  if (existingClassName) {
    classes.push(existingClassName);
  }

  classes.push(...designTokenClasses);

  return classes.filter((c) => c.length > 0).join(' ');
}

/**
 * Generate complete style object combining colors and spacing
 */
export function generateCompleteStyles(spec: ComponentGenerationSpec): {
  style: Record<string, string>;
  cssVars: string[];
  classes: string[];
} {
  const cssVars: string[] = [];
  const style: Record<string, string> = {};

  // Apply colors
  if (spec.design?.colors) {
    const colorStyles = generateColorStyles(spec.design.colors);
    Object.assign(style, colorStyles.styles);
    cssVars.push(...colorStyles.cssVars);
  }

  // Apply spacing
  if (spec.design?.spacing) {
    const spacingStyles = generateSpacingStyles(spec.design.spacing);
    Object.assign(style, spacingStyles.styles);
    cssVars.push(...spacingStyles.cssVars);
  }

  // Generate token classes
  const classes = generateDesignTokenClasses(spec);

  return { style, cssVars, classes };
}

/**
 * Generate CSS imports needed for tokens
 */
export function generateTokenImports(cssVars: string[]): string[] {
  const imports: string[] = [];

  // Check if we're using any CSS variables
  if (cssVars.some((v) => v.includes('var('))) {
    imports.push("import '@/styles/tokens.css'");
  }

  return imports;
}
