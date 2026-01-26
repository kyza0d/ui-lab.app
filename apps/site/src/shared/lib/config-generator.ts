/**
 * Configuration Generator for Tailwind Theme
 *
 * This utility generates exportable CSS configuration snippets
 * that users can paste into their own projects' globals.css @theme block.
 *
 * It scales radius and border-width values proportionally across
 * the entire Tailwind scale.
 */

// Type Scale Names and Values - More conservative range
const scaleNameMap = {
  1.067: "Minor Second",
  1.1: "Subtle",
  1.125: "Major Second",
  1.15: "Gentle",
  1.2: "Minor Third",
} as const;

export function getScaleName(ratio: number): string {
  const rounded = Math.round(ratio * 1000) / 1000;
  // Find the closest scale name
  const entries = Object.entries(scaleNameMap);
  const closest = entries.reduce((prev, curr) =>
    Math.abs((curr[0] as unknown as number) - ratio) <
      Math.abs((prev[0] as unknown as number) - ratio)
      ? curr
      : prev,
  );
  return closest[1];
}

export interface ThemeConfig {
  radius: number; // 0 - 1.5 rem
  borderWidth: number; // 0 - 4 px
}

export interface GeneratedTypeScale {
  name: string;
  minSize: number;
  fluidVw: number;
  maxSize: number;
}

/**
 * Generates a complete @theme block with scaled radius and border-width values
 * @param radius - Base radius in rem (0 - 1.5)
 * @param borderWidth - Base border width in px (0 - 4)
 * @returns Formatted CSS string ready to copy/paste
 */
export function generateThemeConfig(
  radius: number,
  borderWidth: number,
): string {
  // Define the base Tailwind radius scale (in rem)
  const baseRadiusScale = [
    { name: "xs", value: 0.05 },
    { name: "sm", value: 0.1 },
    { name: "base", value: 0.2 },
    { name: "md", value: 0.3 },
    { name: "lg", value: 0.5 },
    { name: "xl", value: 0.75 },
    { name: "2xl", value: 1 },
  ];

  // Define the base Tailwind border-width scale (in px)
  const baseBorderScale = [
    { name: "none", value: 0 },
    { name: "thin", value: 1 },
    { name: "base", value: 1 },
    { name: "2", value: 2 },
    { name: "4", value: 4 },
    { name: "8", value: 8 },
  ];

  // Scale radius values proportionally
  // Find the closest base value to scale from
  const baseRadiusRef = 0.2; // 'base' in Tailwind
  const radiusScaleFactor = radius / baseRadiusRef;

  // Scale border-width values proportionally
  const baseBorderRef = 1; // 'base'/'thin' in Tailwind
  const borderScaleFactor = borderWidth / baseBorderRef;

  // Generate scaled radius scale
  const radiusLines = baseRadiusScale.map(({ name, value }) => {
    const scaledValue = value * radiusScaleFactor;
    // Handle the 'full' value specially
    if (scaledValue > 100) return `--radius-${name}: 9999px;`;
    return `--radius-${name}: ${scaledValue.toFixed(3)}rem;`;
  });
  radiusLines.push(`--radius-full: 9999px;`);

  // Generate scaled border-width scale
  const borderLines = baseBorderScale.map(({ name, value }) => {
    const scaledValue = value * borderScaleFactor;
    return `--border-width-${name}: ${scaledValue.toFixed(1)}px;`;
  });

  // Format the output
  const css = `@theme {
  /* Border Radius - customize as needed */
${radiusLines.map((line) => `  ${line}`).join("\n")}

  /* Border Width - customize as needed */
${borderLines.map((line) => `  ${line}`).join("\n")}
}`;

  return css;
}

/**
 * Copies text to clipboard
 * @param text - Text to copy
 * @returns Promise that resolves when copy is complete
 */
export async function copyToClipboard(text: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(text);
  } catch (error) {
    console.error("Failed to copy to clipboard:", error);
    // Fallback for older browsers
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
  }
}

/**
 * Applies dynamic theme scales to the DOM for radius and border-width only
 * Updates CSS variables for layout-related properties
 *
 * Note: Typography scales (font sizes and weights) are handled by applyTypographyStyles
 * from typography-utils.ts to ensure consistency with the inline script.
 *
 * @param radius - Base radius in rem (0 - 1.5)
 * @param borderWidth - Base border width in px (0 - 4)
 */
export function applyDynamicThemeScales(
  radius: number,
  borderWidth: number,
): void {
  const root = document.documentElement;

  // Define the base Tailwind radius scale (in rem)
  const baseRadiusScale = [
    { name: "xs", value: 0.05 },
    { name: "sm", value: 0.1 },
    { name: "base", value: 0.2 },
    { name: "md", value: 0.3 },
    { name: "lg", value: 0.5 },
    { name: "xl", value: 0.75 },
    { name: "2xl", value: 1 },
  ];

  // Define the base Tailwind border-width scale (in px)
  const baseBorderScale = [
    { name: "none", value: 0 },
    { name: "thin", value: 1 },
    { name: "base", value: 1 },
    { name: "2", value: 2 },
    { name: "4", value: 4 },
    { name: "8", value: 8 },
  ];

  // Calculate scale factors
  const baseRadiusRef = 0.2; // 'base' in Tailwind
  const radiusScaleFactor = radius / baseRadiusRef;

  const baseBorderRef = 1; // 'base'/'thin' in Tailwind
  const borderScaleFactor = borderWidth / baseBorderRef;

  // Apply scaled radius values
  baseRadiusScale.forEach(({ name, value }) => {
    const scaledValue = value * radiusScaleFactor;
    const remValue =
      scaledValue > 100 ? "9999px" : `${scaledValue.toFixed(3)}rem`;
    root.style.setProperty(`--radius-${name}`, remValue);
  });
  root.style.setProperty("--radius-full", "9999px");

  // Apply scaled border-width values
  baseBorderScale.forEach(({ name, value }) => {
    const scaledValue = value * borderScaleFactor;
    const pxValue = `${scaledValue.toFixed(1)}px`;
    root.style.setProperty(`--border-width-${name}`, pxValue);
  });
}

/**
 * Minimum font size constraints (in rem) for each size level
 * Ensures text never becomes too small to read comfortably
 * Updated to enforce 16px minimum (14px for xs)
 */
const minFontSizeConstraints = {
  xs: 0.875, // 14px minimum (exception to 16px rule)
  sm: 1.0, // 16px minimum
  md: 1.0, // 16px minimum
  base: 1.0, // 16px minimum
  lg: 1.125, // 18px minimum
  xl: 1.25, // 20px minimum
  "2xl": 1.5, // 24px minimum
  "3xl": 1.75, // 28px minimum
  "4xl": 2.0, // 32px minimum
  "5xl": 2.25, // 36px minimum (reduced for tighter scale)
} as const;

/**
 * Static font sizes for small text (xs through base)
 * These sizes don't need fluid scaling
 */
const staticFontSizes = {
  xs: 0.875, // 14px
  sm: 0.9375, // 15px
  md: 1.0, // 16px
  base: 1.0, // 16px
} as const;

/**
 * Sizes that use fluid typography (clamp)
 */
const fluidSizes = new Set(["lg", "xl", "2xl", "3xl", "4xl", "5xl"]);

/**
 * Extended type scale interface with fluid flag
 */
export interface ExtendedTypeScale extends GeneratedTypeScale {
  isFluid: boolean;
  cssValue: string;
}

/**
 * Generates a type scale based on a ratio
 * - Small sizes (xs through base): Static rem values
 * - Large sizes (lg through 5xl): Fluid clamp() values
 *
 * @param ratio - The scale ratio (1.067 - 1.2), only affects fluid sizes
 * @param fontSizeScale - Font size scale factor to apply (0.85 - 1.15)
 * @param baseSize - The base size in rem (default: 1)
 * @returns Array of generated type scale sizes
 */
export function generateTypeScaleFromRatio(
  ratio: number,
  fontSizeScale: number = 1,
  baseSize: number = 1,
): ExtendedTypeScale[] {
  const scale: ExtendedTypeScale[] = [];
  const names = [
    "xs",
    "sm",
    "md",
    "base",
    "lg",
    "xl",
    "2xl",
    "3xl",
    "4xl",
    "5xl",
  ] as const;
  const baseIndex = 3; // 'base' is at index 3

  names.forEach((name, i) => {
    const isFluid = fluidSizes.has(name);
    const minConstraint = minFontSizeConstraints[name];

    if (!isFluid) {
      // Static sizes: use fixed rem values
      const staticSize = staticFontSizes[name as keyof typeof staticFontSizes];
      const scaledSize = Math.max(staticSize * fontSizeScale, minConstraint);

      scale.push({
        name,
        minSize: scaledSize,
        fluidVw: 0,
        maxSize: scaledSize,
        isFluid: false,
        cssValue: `${scaledSize.toFixed(3)}rem`,
      });
    } else {
      // Fluid sizes: calculate using ratio from base
      const stepsFromBase = i - baseIndex;
      const size = baseSize * Math.pow(ratio, stepsFromBase);
      const scaledSize = size * fontSizeScale;

      // Calculate min (85% of scaled size, but not below minimum constraint)
      const minSize = Math.max(scaledSize * 0.85, minConstraint);
      // Calculate max (115% of scaled size for tighter range)
      const maxSize = scaledSize * 1.15;
      // Calculate fluid vw value (reduced multiplier for subtler scaling)
      const fluidVw = scaledSize * 1.8;

      scale.push({
        name,
        minSize,
        fluidVw,
        maxSize,
        isFluid: true,
        cssValue: `clamp(${minSize.toFixed(3)}rem, ${fluidVw.toFixed(2)}vw, ${maxSize.toFixed(3)}rem)`,
      });
    }
  });

  return scale;
}

/**
 * Applies dynamic font size scales to the DOM based on type scale ratio
 * Updates all --text-* CSS variables based on the ratio and fontSizeScale
 * - Small sizes (xs through base): Static rem values
 * - Large sizes (lg through 5xl): Fluid clamp() values
 *
 * @param typeSizeRatio - Base type scale ratio (1.067 - 1.2)
 * @param fontSizeScale - Font size scale factor (0.85 - 1.15)
 */
export function applyDynamicFontSizeScalesWithRatio(
  typeSizeRatio: number,
  fontSizeScale: number,
): void {
  const root = document.documentElement;
  const typeScale = generateTypeScaleFromRatio(typeSizeRatio, fontSizeScale);

  typeScale.forEach(({ name, cssValue }) => {
    root.style.setProperty(`--text-${name}`, cssValue);
  });
}

/**
 * Applies dynamic font size scales to the DOM (base scales only, without type scale ratio)
 * Updates all --text-* CSS variables based on the scale factor
 * - Small sizes (xs through base): Static rem values
 * - Large sizes (lg through 5xl): Fluid clamp() values
 *
 * @param fontSizeScale - Font size scale factor (0.85 - 1.15)
 */
export function applyDynamicFontSizeScales(fontSizeScale: number): void {
  // Use the ratio-based function with default ratio of 1.125 (Major Second)
  applyDynamicFontSizeScalesWithRatio(1.125, fontSizeScale);
}

/**
 * Applies dynamic font weight scales to the DOM
 * Updates all --font-weight-header-* and --font-weight-body-* CSS variables
 * @param fontWeightScale - Font weight scale factor (for backward compatibility, unused if headerScale provided)
 * @param headerFontWeightScale - Header font weight scale factor (0.80 - 1.20)
 * @param bodyFontWeightScale - Body font weight scale factor (0.80 - 1.20)
 */
export function applyDynamicFontWeightScales(
  fontWeightScale?: number,
  headerFontWeightScale?: number,
  bodyFontWeightScale?: number,
): void {
  const root = document.documentElement;

  const baseFontWeightScale = [
    { name: "thin", value: 100 },
    { name: "extralight", value: 200 },
    { name: "light", value: 300 },
    { name: "normal", value: 400 },
    { name: "medium", value: 500 },
    { name: "semibold", value: 600 },
    { name: "bold", value: 700 },
    { name: "extrabold", value: 800 },
    { name: "black", value: 900 },
  ];

  const headerScale = headerFontWeightScale ?? fontWeightScale ?? 1;
  const bodyScale = bodyFontWeightScale ?? fontWeightScale ?? 1;

  baseFontWeightScale.forEach(({ name, value }) => {
    const headerScaled = value * headerScale;
    const bodyScaled = value * bodyScale;
    const headerClamped = Math.max(100, Math.min(900, Math.round(headerScaled)));
    const bodyClamped = Math.max(100, Math.min(900, Math.round(bodyScaled)));
    root.style.setProperty(`--font-weight-header-${name}`, headerClamped.toString());
    root.style.setProperty(`--font-weight-body-${name}`, bodyClamped.toString());
  });
}

/**
 * Generates a user-friendly message with instructions
 */
export function generateConfigMessage(
  radius: number,
  borderWidth: number,
): string {
  const config = generateThemeConfig(radius, borderWidth);

  return `${config}

/* Usage Instructions:
 * 1. Copy the above configuration
 * 2. Open your project's src/app/globals.css
 * 3. Paste this @theme block (replacing or adding to your existing one)
 * 4. Use standard Tailwind utilities in your components:
 *    - rounded-md, rounded-md, rounded-full, etc.
 *    - border, border-2, border-4, etc.
 * All utilities will automatically respect your custom values.
 */`;
}

/**
 * Semantic HTML element styles template for global.css
 * Uses a more compact header scale for better visual hierarchy
 */
const SEMANTIC_HTML_STYLES = `
  h1 {
    font-size: var(--text-3xl);
    line-height: var(--line-height-tight);
    font-weight: var(--font-weight-bold);
    letter-spacing: var(--letter-spacing-tight);
  }

  h2 {
    font-size: var(--text-2xl);
    line-height: var(--line-height-tight);
    font-weight: var(--font-weight-semibold);
    letter-spacing: var(--letter-spacing-tight);
  }

  h3 {
    font-size: var(--text-xl);
    line-height: var(--line-height-snug);
    font-weight: var(--font-weight-semibold);
    letter-spacing: var(--letter-spacing-snug);
  }

  h4 {
    font-size: var(--text-lg);
    line-height: var(--line-height-snug);
    font-weight: var(--font-weight-medium);
  }

  h5 {
    font-size: var(--text-md);
    line-height: var(--line-height-normal);
    font-weight: var(--font-weight-medium);
  }

  h6 {
    font-size: var(--text-md);
    line-height: var(--line-height-normal);
    font-weight: var(--font-weight-medium);
  }

  p {
    font-size: var(--text-md);
    line-height: var(--line-height-relaxed);
    font-weight: var(--font-weight-normal);
    letter-spacing: var(--letter-spacing-normal);
  }

  small {
    font-size: var(--text-sm);
    line-height: var(--line-height-normal);
    font-weight: var(--font-weight-normal);
  }

  strong,
  b {
    font-weight: var(--font-weight-bold);
  }

  em,
  i {
    font-style: italic;
  }

  a {
    color: var(--color-foreground-300);
    text-decoration: none;
    transition: color 0.2s ease;
  }

  a:hover {
    color: var(--color-accent-400);
  }

  code {
    font-family: var(--font-mono);
    font-size: var(--text-sm);
    background-color: var(--color-background-800);
    padding: 0.125rem 0.375rem;
    border-radius: var(--radius-xs);
  }

  pre {
    font-family: var(--font-mono);
    font-size: var(--text-sm);
    background-color: var(--color-background-800);
    padding: 1rem;
    border-radius: var(--radius-sm);
    overflow-x: auto;
    line-height: var(--line-height-normal);
  }

  pre code {
    background-color: transparent;
    padding: 0;
    font-size: inherit;
  }

  ul,
  ol {
    margin-left: 1.5rem;
    margin-bottom: 1rem;
  }

  li {
    margin-bottom: 0.5rem;
    line-height: var(--line-height-normal);
  }`;

/**
 * Generates typography CSS based on type scale ratio
 * - Small sizes (xs through base): Static rem values
 * - Large sizes (lg through 5xl): Fluid clamp() values
 */
function generateTypographyCSS(
  typeSizeRatio: number,
  fontSizeScale: number,
): string {
  const typeScale = generateTypeScaleFromRatio(typeSizeRatio, fontSizeScale);
  const lines: string[] = [];

  typeScale.forEach(({ name, cssValue }) => {
    lines.push(`  --text-${name}: ${cssValue};`);
  });

  return lines.join("\n");
}

/**
 * Generates color palette CSS from theme colors
 */
function generateColorPaletteCSS(colors: any, mode: "light" | "dark"): string {
  const {
    generateThemePalettes,
  } = require("../../features/theme/lib/color-utils");

  const palettes = generateThemePalettes(
    colors.background,
    colors.foreground,
    colors.accent,
    mode,
    0,
    colors.semantic,
    colors.accentChromaLimit ?? 0.3,
    colors.accentEasing,
    colors.accentChromaScaling,
  );

  const lines: string[] = [];
  const paletteNames = ["background", "foreground", "accent"] as const;
  const semanticNames = ["success", "danger", "warning", "info"] as const;
  const shades = [
    50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950,
  ] as const;

  paletteNames.forEach((paletteName) => {
    const palette = palettes[paletteName];

    shades.forEach((shade) => {
      const color = palette[shade];
      if (color) {
        const oklchString = `oklch(${(color.l * 100).toFixed(1)}% ${color.c.toFixed(3)} ${color.h.toFixed(1)})`;
        lines.push(
          `  --color-${paletteName}-${shade}: ${oklchString};`,
        );
      }
    });
  });

  if (palettes.semantic) {
    semanticNames.forEach((semanticName) => {
      const palette = palettes.semantic[semanticName];
      if (palette) {
        shades.forEach((shade) => {
          const color = palette[shade];
          if (color) {
            const oklchString = `oklch(${(color.l * 100).toFixed(1)}% ${color.c.toFixed(3)} ${color.h.toFixed(1)})`;
            lines.push(
              `  --color-${semanticName}-${shade}: ${oklchString};`,
            );
          }
        });
      }
    });
  }

  return lines.join("\n");
}

/**
 * Generates font weight CSS with scaled values for both headers and body
 */
function generateFontWeightCSS(headerFontWeightScale: number, bodyFontWeightScale: number): string {
  const weights = [
    { name: "thin", value: 100 },
    { name: "extralight", value: 200 },
    { name: "light", value: 300 },
    { name: "normal", value: 400 },
    { name: "medium", value: 500 },
    { name: "semibold", value: 600 },
    { name: "bold", value: 700 },
    { name: "extrabold", value: 800 },
    { name: "black", value: 900 },
  ];

  const lines: string[] = [];
  weights.forEach(({ name, value }) => {
    const headerScaled = value * headerFontWeightScale;
    const bodyScaled = value * bodyFontWeightScale;
    const headerClamped = Math.max(100, Math.min(900, Math.round(headerScaled)));
    const bodyClamped = Math.max(100, Math.min(900, Math.round(bodyScaled)));
    lines.push(`  --font-weight-header-${name}: ${headerClamped};`);
    lines.push(`  --font-weight-body-${name}: ${bodyClamped};`);
  });

  return lines.join("\n");
}

/**
 * Generates radius scale CSS with proportional scaling
 */
function generateRadiusScaleCSS(radius: number): string {
  const baseRadiusScale = [
    { name: "xs", value: 0.05 },
    { name: "sm", value: 0.1 },
    { name: "base", value: 0.2 },
    { name: "md", value: 0.3 },
    { name: "lg", value: 0.5 },
    { name: "xl", value: 0.75 },
    { name: "2xl", value: 1 },
  ];

  const baseRadiusRef = 0.2;
  const radiusScaleFactor = radius / baseRadiusRef;
  const lines: string[] = [];

  baseRadiusScale.forEach(({ name, value }) => {
    const scaledValue = value * radiusScaleFactor;
    const remValue =
      scaledValue > 100 ? "9999px" : `${scaledValue.toFixed(3)}rem`;
    lines.push(`  --radius-${name}: ${remValue};`);
  });

  lines.push(`  --radius-full: 9999px;`);

  return lines.join("\n");
}

/**
 * Generates border-width scale CSS with proportional scaling
 */
function generateBorderWidthScaleCSS(borderWidth: number): string {
  const baseBorderScale = [
    { name: "none", value: 0 },
    { name: "thin", value: 1 },
    { name: "base", value: 1 },
    { name: "2", value: 2 },
    { name: "4", value: 4 },
    { name: "8", value: 8 },
  ];

  const baseBorderRef = 1;
  const borderScaleFactor = borderWidth / baseBorderRef;
  const lines: string[] = [];

  baseBorderScale.forEach(({ name, value }) => {
    const scaledValue = value * borderScaleFactor;
    lines.push(`  --border-width-${name}: ${scaledValue.toFixed(1)}px;`);
  });

  return lines.join("\n");
}

/**
 * Generates fluid spacing CSS with clamp-based scaling
 * @param spacingScale - Spacing scale factor (0.75 - 1.25)
 * @returns CSS variables for fluid spacing
 */
function generateFluidSpacingCSS(spacingScale: number): string {
  // Base spacing values with fluid vw components
  const baseSpacing = [
    { name: "xs", min: 0.125, fluid: 0.5, max: 0.2 },
    { name: "sm", min: 0.2, fluid: 1, max: 0.35 },
    { name: "base", min: 0.35, fluid: 1.5, max: 0.5 },
    { name: "md", min: 0.5, fluid: 2, max: 0.75 },
    { name: "lg", min: 0.75, fluid: 2.5, max: 1.0 },
    { name: "xl", min: 1.0, fluid: 3, max: 1.5 },
    { name: "2xl", min: 1.5, fluid: 4, max: 2.0 },
  ];

  const lines: string[] = [];
  baseSpacing.forEach(({ name, min, fluid, max }) => {
    const scaledMin = (min * spacingScale).toFixed(3);
    const scaledFluid = (fluid * spacingScale).toFixed(2);
    const scaledMax = (max * spacingScale).toFixed(3);
    lines.push(
      `  --spacing-${name}: clamp(${scaledMin}rem, ${scaledFluid}vw, ${scaledMax}rem);`,
    );
  });

  // Primary spacing variable for general use
  const scaledMin = (0.2 * spacingScale).toFixed(3);
  const scaledFluid = (2.5 * spacingScale).toFixed(2);
  const scaledMax = (0.25 * spacingScale).toFixed(3);
  lines.push(
    `  --spacing: clamp(${scaledMin}rem, ${scaledFluid}vw, ${scaledMax}rem);`,
  );

  return lines.join("\n");
}

/**
 * Applies dynamic fluid spacing scales to the DOM
 * @param spacingScale - Spacing scale factor (0.75 - 1.25)
 */
export function applyDynamicSpacingScale(spacingScale: number): void {
  const root = document.documentElement;

  const baseSpacing = [
    { name: "xs", min: 0.125, fluid: 0.5, max: 0.2 },
    { name: "sm", min: 0.2, fluid: 1, max: 0.35 },
    { name: "base", min: 0.35, fluid: 1.5, max: 0.5 },
    { name: "md", min: 0.5, fluid: 2, max: 0.75 },
    { name: "lg", min: 0.75, fluid: 2.5, max: 1.0 },
    { name: "xl", min: 1.0, fluid: 3, max: 1.5 },
    { name: "2xl", min: 1.5, fluid: 4, max: 2.0 },
  ];

  baseSpacing.forEach(({ name, min, fluid, max }) => {
    const scaledMin = (min * spacingScale).toFixed(3);
    const scaledFluid = (fluid * spacingScale).toFixed(2);
    const scaledMax = (max * spacingScale).toFixed(3);
    const clampValue = `clamp(${scaledMin}rem, ${scaledFluid}vw, ${scaledMax}rem)`;
    root.style.setProperty(`--spacing-${name}`, clampValue);
  });

  const scaledMin = (0.2 * spacingScale).toFixed(3);
  const scaledFluid = (2.5 * spacingScale).toFixed(2);
  const scaledMax = (0.25 * spacingScale).toFixed(3);
  const clampValue = `clamp(${scaledMin}rem, ${scaledFluid}vw, ${scaledMax}rem)`;
  root.style.setProperty("--spacing", clampValue);
}

/**
 * Generates a complete @theme block with all design system values
 * This is the main export function for the configuration page
 */
export function generateFullThemeConfig(
  colors: any,
  mode: "light" | "dark",
  typeSizeRatio: number,
  fontSizeScale: number,
  fontWeightScale: number,
  headerFontWeightScale?: number,
  bodyFontWeightScale?: number,
  radius?: number,
  borderWidth?: number,
  spacingScale?: number,
): string {
  const typographyCSS = generateTypographyCSS(typeSizeRatio, fontSizeScale);
  const colorCSS = generateColorPaletteCSS(colors, mode);
  const headerScale = headerFontWeightScale ?? fontWeightScale ?? 1;
  const bodyScale = bodyFontWeightScale ?? fontWeightScale ?? 1;
  const fontWeightCSS = generateFontWeightCSS(headerScale, bodyScale);
  const radiusCSS = generateRadiusScaleCSS(radius ?? 0.2);
  const borderWidthCSS = generateBorderWidthScaleCSS(borderWidth ?? 1);
  const spacingCSS = generateFluidSpacingCSS(spacingScale ?? 1);

  return `@import "tailwindcss";
@import "ui-lab-components/styles.css";

@theme {
${typographyCSS}

  --line-height-tight: 1.25;
  --line-height-snug: 1.375;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.65;
  --line-height-loose: 2;

  --letter-spacing-tight: -0.01em;
  --letter-spacing-snug: -0.01em;
  --letter-spacing-normal: 0;
  --letter-spacing-wide: 0.05em;

${colorCSS}

${fontWeightCSS}

${spacingCSS}

${radiusCSS}

${borderWidthCSS}
}

@layer base {${SEMANTIC_HTML_STYLES}
}`;
}
