/**
 * Import Templates
 * Generates correct import statements for components and dependencies
 */

/**
 * Generate import for a component
 */
export function generateComponentImport(componentId: string): string {
  const ComponentName = formatComponentName(componentId);
  return `import { ${ComponentName} } from '@ui-lab/components'`;
}

/**
 * Generate imports for multiple components
 */
export function generateComponentImports(componentIds: string[]): string[] {
  return componentIds.map(generateComponentImport);
}

/**
 * Generate import for design tokens
 */
export function generateDesignTokensImport(): string {
  return `import { tokens } from '@ui-lab/design-tokens'`;
}

/**
 * Generate import for theme utilities
 */
export function generateThemeUtilsImport(): string {
  return `import { useTheme } from '@/lib/theme-utils'`;
}

/**
 * Generate CSS import for global styles
 */
export function generateCSSImport(cssPath: string): string {
  return `import '${cssPath}'`;
}

/**
 * Format component ID to React component name
 */
export function formatComponentName(componentId: string): string {
  return componentId
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

/**
 * Get all necessary imports for a component generation result
 */
export function getRequiredImports(
  componentIds: string[],
  usesTokens: boolean = false,
  usesCss: boolean = false
): string[] {
  const imports: string[] = [];

  // Component imports
  imports.push(...generateComponentImports(componentIds));

  // Design tokens import if needed
  if (usesTokens) {
    imports.push(generateDesignTokensImport());
  }

  // CSS import if needed
  if (usesCss) {
    imports.push(generateCSSImport('@/styles/tokens.css'));
  }

  // Remove duplicates and sort
  return Array.from(new Set(imports)).sort();
}
