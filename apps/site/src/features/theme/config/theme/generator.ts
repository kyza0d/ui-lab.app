import { generateColorPaletteCSS } from "../colors/generator";
import { generateTypographyCSS } from "../typography/generator";
import { generateFontWeightCSS } from "../font-weight/generator";
import { generateRadiusScaleCSS, generateRadiusRootCSS, applyRadiusScalesToDOM } from "../radius/generator";
import { generateBorderWidthScaleCSS, applyBorderWidthScalesToDOM } from "../border-width/generator";
import { generateFluidSpacingCSS } from "../spacing/generator";
import { generateMaxWidthVariablesCSS, generateMaxWidthScaleCSS } from "../max-width/generator";
import { SEMANTIC_HTML_STYLES } from "../shared/constants";

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
  const radiusLines = generateRadiusScaleCSS(radius).split("\n");
  const borderLines = generateBorderWidthScaleCSS(borderWidth).split("\n");

  const css = `@theme {\n  /* Border Radius - customize as needed */\n${radiusLines.map((line) => line).join("\n")}\n\n  /* Border Width - customize as needed */\n${borderLines.map((line) => line).join("\n")}\n}`;

  return css;
}

/**
 * Applies dynamic theme scales to the DOM for radius and border-width only
 * Updates CSS variables for layout-related properties
 * @param radius - Base radius in rem (0 - 1.5)
 * @param borderWidth - Base border width in px (0 - 4)
 */
export function applyDynamicThemeScales(
  radius: number,
  borderWidth: number,
): void {
  applyRadiusScalesToDOM(radius);
  applyBorderWidthScalesToDOM(borderWidth);
}

/**
 * Generates a user-friendly message with instructions
 */
export function generateConfigMessage(
  radius: number,
  borderWidth: number,
): string {
  const config = generateThemeConfig(radius, borderWidth);

  return `${config}\n\n/* Usage Instructions:\n * 1. Copy the above configuration\n * 2. Open your project's src/app/globals.css\n * 3. Paste this @theme block (replacing or adding to your existing one)\n * 4. Use standard Tailwind utilities in your components:\n *    - rounded-md, rounded-md, rounded-full, etc.\n *    - border, border-2, border-4, etc.\n * All utilities will automatically respect your custom values.\n */`;
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
  maxWidthScale?: number,
): string {
  const typographyCSS = generateTypographyCSS(typeSizeRatio, fontSizeScale);
  const colorCSS = generateColorPaletteCSS(colors, mode);
  const headerScale = headerFontWeightScale ?? fontWeightScale ?? 1;
  const bodyScale = bodyFontWeightScale ?? fontWeightScale ?? 1;
  const fontWeightCSS = generateFontWeightCSS(headerScale, bodyScale);
  const radiusCSS = generateRadiusScaleCSS(radius ?? 0.2);
  const radiusRootCSS = generateRadiusRootCSS(radius ?? 0.2);
  const borderWidthCSS = generateBorderWidthScaleCSS(borderWidth ?? 1);
  const spacingCSS = generateFluidSpacingCSS(spacingScale ?? 1);
  const maxWidthVariablesCSS = generateMaxWidthVariablesCSS(maxWidthScale ?? 1);
  const maxWidthUtilitiesCSS = generateMaxWidthScaleCSS(maxWidthScale ?? 1);

  return `${radiusRootCSS}\n\n@import "tailwindcss";\n@import "ui-lab-components/styles.css";\n\n@theme {\n${typographyCSS}\n\n  --line-height-tight: 1.25;\n  --line-height-snug: 1.375;\n  --line-height-normal: 1.5;\n  --line-height-relaxed: 1.65;\n  --line-height-loose: 2;\n\n  --letter-spacing-tight: -0.01em;\n  --letter-spacing-snug: -0.01em;\n  --letter-spacing-normal: 0;\n  --letter-spacing-wide: 0.05em;\n\n${colorCSS}\n\n${fontWeightCSS}\n\n${spacingCSS}\n\n${maxWidthVariablesCSS}\n\n${radiusCSS}\n\n${borderWidthCSS}\n}\n\n${maxWidthUtilitiesCSS}\n\n@layer base {${SEMANTIC_HTML_STYLES}\n}`;
}
