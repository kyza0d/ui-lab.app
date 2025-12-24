/**
 * Theme Generator
 * Generates CSS @theme directives and design token variable declarations
 */

import type {
  DesignTokens,
  ColorPalette,
  TypographyTokens,
  SpacingTokens,
} from '../types.js';

/**
 * Generate a complete @theme CSS directive from design tokens
 * @param tokens Design tokens configuration
 * @param indent Optional indentation string (default: 2 spaces)
 * @returns Formatted @theme { ... } CSS block
 */
export function generateThemeDirective(
  tokens: DesignTokens,
  indent: string = '  '
): string {
  const lines: string[] = ['@theme {'];

  if (tokens.colors) {
    lines.push(generateColorVariables(tokens.colors, indent));
  }

  if (tokens.typography) {
    lines.push(generateTypographyVariables(tokens.typography, indent));
  }

  if (tokens.spacing) {
    lines.push(generateSpacingVariables(tokens.spacing, indent));
  }

  lines.push('}');
  return lines.join('\n');
}

/**
 * Generate color variable declarations for @theme
 * @param colors Record of color palettes
 * @param indent Indentation string
 * @returns Formatted color variable declarations
 */
export function generateColorVariables(
  colors: Record<string, ColorPalette>,
  indent: string = '  '
): string {
  const lines: string[] = [];
  lines.push(`${indent}/* Color Palette */`);

  for (const palette of Object.values(colors)) {
    for (const value of Object.values(palette.shades)) {
      if (value.okch) {
        const oklchStr = `oklch(${value.okch.l}% ${value.okch.c} ${value.okch.h})`;
        lines.push(
          `${indent}${value.cssVar}: var(${value.cssVar}, ${oklchStr});`
        );
      }
    }
  }

  return lines.join('\n');
}

/**
 * Generate typography variable declarations for @theme
 * @param typography Typography token definitions
 * @param indent Indentation string
 * @returns Formatted typography variable declarations
 */
export function generateTypographyVariables(
  typography: TypographyTokens,
  indent: string = '  '
): string {
  const lines: string[] = [];
  lines.push(`${indent}/* Typography */`);

  // Font families
  lines.push(`${indent}--font-sans: ${typography.families.sans};`);
  lines.push(`${indent}--font-mono: ${typography.families.mono};`);

  // Font sizes
  for (const [size, value] of Object.entries(typography.sizes)) {
    lines.push(`${indent}--text-${size}: ${value};`);
  }

  // Line heights
  for (const [height, value] of Object.entries(typography.lineHeights)) {
    lines.push(`${indent}--line-height-${height}: ${value};`);
  }

  // Font weights
  for (const [weight, value] of Object.entries(typography.weights)) {
    lines.push(`${indent}--font-weight-${weight}: ${value};`);
  }

  return lines.join('\n');
}

/**
 * Generate spacing variable declarations for @theme
 * @param spacing Spacing token definitions
 * @param indent Indentation string
 * @returns Formatted spacing variable declarations
 */
export function generateSpacingVariables(
  spacing: SpacingTokens,
  indent: string = '  '
): string {
  const lines: string[] = [];
  lines.push(`${indent}/* Spacing */`);

  for (const [size, value] of Object.entries(spacing.cssVars)) {
    lines.push(`${indent}--spacing-${size}: ${value};`);
  }

  return lines.join('\n');
}

/**
 * Generate partial @theme with only color tokens
 * @param colors Record of color palettes
 * @param indent Optional indentation string
 * @returns Formatted @theme { ... } CSS block with only colors
 */
export function generateColorTheme(
  colors: Record<string, ColorPalette>,
  indent: string = '  '
): string {
  const lines: string[] = ['@theme {'];
  lines.push(generateColorVariables(colors, indent));
  lines.push('}');
  return lines.join('\n');
}

/**
 * Format OKLCH color value for CSS
 * @param l Lightness (0-100%)
 * @param c Chroma (0-0.4)
 * @param h Hue (0-360)
 * @returns Formatted oklch() string
 */
export function formatOklchColor(l: number, c: number, h: number): string {
  return `oklch(${l}% ${c} ${h})`;
}

/**
 * Generate CSS variable name for a color token
 * @param role Color role
 * @param shade Shade variant (50-950)
 * @returns CSS variable name
 */
export function generateColorCssVarName(role: string, shade: string | number): string {
  return `--color-${role}-${shade}`;
}

/**
 * Generate @theme directive string for export to globals.css
 * @param tokens Design tokens
 * @returns Complete @theme block ready for CSS file injection
 */
export function generateThemeCssBlock(tokens: DesignTokens): string {
  return generateThemeDirective(tokens);
}

/**
 * Generate initial @theme CSS block with all color variables
 * Used for scaffolding new projects with complete color token definitions
 * @param indent Optional indentation string (default: 2 spaces)
 * @returns CSS code ready to inject into @theme { ... } block
 */
export function generateInitialThemeCss(indent: string = '  '): string {
  const lines: string[] = [];

  // Background colors
  lines.push(`${indent}/* Background Colors (50-950) */`);
  const backgroundShades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;
  const backgroundValues = [
    { l: 16.0, c: 0.0, h: 0.0 },
    { l: 29.0, c: 0.0, h: 0.0 },
    { l: 31.0, c: 0.0, h: 0.0 },
    { l: 42.0, c: 0.0, h: 0.0 },
    { l: 55.0, c: 0.0, h: 0.0 },
    { l: 60.0, c: 0.0, h: 0.0 },
    { l: 80.0, c: 0.0, h: 0.0 },
    { l: 83.0, c: 0.0, h: 0.0 },
    { l: 91.0, c: 0.0, h: 0.0 },
    { l: 93.0, c: 0.0, h: 0.0 },
    { l: 94.0, c: 0.0, h: 0.0 },
  ] as const;

  backgroundShades.forEach((shade, idx) => {
    const val = backgroundValues[idx];
    const oklch = `oklch(${val.l}% ${val.c.toFixed(3)} ${val.h.toFixed(1)})`;
    lines.push(`${indent}--color-background-${shade}: var(--background-${shade}, ${oklch});`);
  });

  // Foreground colors
  lines.push(`${indent}/* Foreground Colors (50-950) */`);
  const foregroundShades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;
  const foregroundValues = [
    { l: 16.0, c: 0.0, h: 0.0 },
    { l: 29.0, c: 0.0, h: 0.0 },
    { l: 31.0, c: 0.0, h: 0.0 },
    { l: 42.0, c: 0.0, h: 0.0 },
    { l: 55.0, c: 0.0, h: 0.0 },
    { l: 60.0, c: 0.0, h: 0.0 },
    { l: 80.0, c: 0.0, h: 0.0 },
    { l: 83.0, c: 0.0, h: 0.0 },
    { l: 91.0, c: 0.0, h: 0.0 },
    { l: 93.0, c: 0.0, h: 0.0 },
    { l: 94.0, c: 0.0, h: 0.0 },
  ] as const;

  foregroundShades.forEach((shade, idx) => {
    const val = foregroundValues[idx];
    const oklch = `oklch(${val.l}% ${val.c.toFixed(3)} ${val.h.toFixed(1)})`;
    lines.push(`${indent}--color-foreground-${shade}: var(--foreground-${shade}, ${oklch});`);
  });

  // Accent colors
  lines.push(`${indent}/* Accent Colors (50-950) */`);
  const accentShades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;
  const accentValues = [
    { l: 16.0, c: 0.0, h: 0.0 },
    { l: 29.0, c: 0.0, h: 0.0 },
    { l: 31.0, c: 0.0, h: 0.0 },
    { l: 42.0, c: 0.0, h: 0.0 },
    { l: 55.0, c: 0.0, h: 0.0 },
    { l: 60.0, c: 0.0, h: 0.0 },
    { l: 80.0, c: 0.0, h: 0.0 },
    { l: 83.0, c: 0.0, h: 0.0 },
    { l: 91.0, c: 0.0, h: 0.0 },
    { l: 93.0, c: 0.0, h: 0.0 },
    { l: 94.0, c: 0.0, h: 0.0 },
  ] as const;

  accentShades.forEach((shade, idx) => {
    const val = accentValues[idx];
    const oklch = `oklch(${val.l}% ${val.c.toFixed(3)} ${val.h.toFixed(1)})`;
    lines.push(`${indent}--color-accent-${shade}: var(--accent-${shade}, ${oklch});`);
  });

  // Success colors
  lines.push(`${indent}/* Semantic Colors - Success (50-950) */`);
  const successShades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;
  const successValues = [
    { l: 16.0, c: 0.0, h: 142.0 },
    { l: 29.0, c: 0.016, h: 142.0 },
    { l: 31.0, c: 0.032, h: 142.0 },
    { l: 42.0, c: 0.056, h: 142.0 },
    { l: 55.0, c: 0.08, h: 142.0 },
    { l: 60.0, c: 0.112, h: 142.0 },
    { l: 80.0, c: 0.144, h: 142.0 },
    { l: 83.0, c: 0.152, h: 142.0 },
    { l: 91.0, c: 0.157, h: 142.0 },
    { l: 93.0, c: 0.16, h: 142.0 },
    { l: 94.0, c: 0.16, h: 142.0 },
  ] as const;

  successShades.forEach((shade, idx) => {
    const val = successValues[idx];
    const oklch = `oklch(${val.l}% ${val.c.toFixed(3)} ${val.h.toFixed(1)})`;
    lines.push(`${indent}--color-success-${shade}: var(--success-${shade}, ${oklch});`);
  });

  // Danger colors
  lines.push(`${indent}/* Semantic Colors - Danger (50-950) */`);
  const dangerShades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;
  const dangerValues = [
    { l: 16.0, c: 0.0, h: 25.0 },
    { l: 29.0, c: 0.015, h: 25.0 },
    { l: 31.0, c: 0.03, h: 25.0 },
    { l: 42.0, c: 0.053, h: 25.0 },
    { l: 55.0, c: 0.075, h: 25.0 },
    { l: 60.0, c: 0.105, h: 25.0 },
    { l: 80.0, c: 0.135, h: 25.0 },
    { l: 83.0, c: 0.143, h: 25.0 },
    { l: 91.0, c: 0.147, h: 25.0 },
    { l: 93.0, c: 0.15, h: 25.0 },
    { l: 94.0, c: 0.15, h: 25.0 },
  ] as const;

  dangerShades.forEach((shade, idx) => {
    const val = dangerValues[idx];
    const oklch = `oklch(${val.l}% ${val.c.toFixed(3)} ${val.h.toFixed(1)})`;
    lines.push(`${indent}--color-danger-${shade}: var(--danger-${shade}, ${oklch});`);
  });

  // Warning colors
  lines.push(`${indent}/* Semantic Colors - Warning (50-950) */`);
  const warningShades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;
  const warningValues = [
    { l: 16.0, c: 0.0, h: 65.0 },
    { l: 29.0, c: 0.015, h: 65.0 },
    { l: 31.0, c: 0.03, h: 65.0 },
    { l: 42.0, c: 0.053, h: 65.0 },
    { l: 55.0, c: 0.075, h: 65.0 },
    { l: 60.0, c: 0.105, h: 65.0 },
    { l: 80.0, c: 0.135, h: 65.0 },
    { l: 83.0, c: 0.143, h: 65.0 },
    { l: 91.0, c: 0.147, h: 65.0 },
    { l: 93.0, c: 0.15, h: 65.0 },
    { l: 94.0, c: 0.15, h: 65.0 },
  ] as const;

  warningShades.forEach((shade, idx) => {
    const val = warningValues[idx];
    const oklch = `oklch(${val.l}% ${val.c.toFixed(3)} ${val.h.toFixed(1)})`;
    lines.push(`${indent}--color-warning-${shade}: var(--warning-${shade}, ${oklch});`);
  });

  // Info colors
  lines.push(`${indent}/* Semantic Colors - Info (50-950) */`);
  const infoShades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;
  const infoValues = [
    { l: 16.0, c: 0.0, h: 255.0 },
    { l: 29.0, c: 0.015, h: 255.0 },
    { l: 31.0, c: 0.03, h: 255.0 },
    { l: 42.0, c: 0.053, h: 255.0 },
    { l: 55.0, c: 0.075, h: 255.0 },
    { l: 60.0, c: 0.105, h: 255.0 },
    { l: 80.0, c: 0.135, h: 255.0 },
    { l: 83.0, c: 0.143, h: 255.0 },
    { l: 91.0, c: 0.147, h: 255.0 },
    { l: 93.0, c: 0.15, h: 255.0 },
    { l: 94.0, c: 0.15, h: 255.0 },
  ] as const;

  infoShades.forEach((shade, idx) => {
    const val = infoValues[idx];
    const oklch = `oklch(${val.l}% ${val.c.toFixed(3)} ${val.h.toFixed(1)})`;
    lines.push(`${indent}--color-info-${shade}: var(--info-${shade}, ${oklch});`);
  });

  return lines.join('\n');
}
