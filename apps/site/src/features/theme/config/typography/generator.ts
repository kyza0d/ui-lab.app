import { ExtendedTypeScale } from "../shared/types";
import { minFontSizeConstraints, staticFontSizes, fluidSizes } from "./constants";

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
  const baseIndex = 3;

  names.forEach((name, i) => {
    const isFluid = fluidSizes.has(name);
    const minConstraint = minFontSizeConstraints[name];

    if (!isFluid) {
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
      const stepsFromBase = i - baseIndex;
      const size = baseSize * Math.pow(ratio, stepsFromBase);
      const scaledSize = size * fontSizeScale;

      // Min constraint must scale with fontSizeScale to respect user's size adjustments
      const minSize = Math.max(scaledSize * 0.85, minConstraint * fontSizeScale);
      const maxSize = scaledSize * 1.15;
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

export function generateTypographyCSS(
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
  applyDynamicFontSizeScalesWithRatio(1.125, fontSizeScale);
}

/**
 * Applies dynamic header font size scales to the DOM
 * Updates all --header-text-* CSS variables based on header ratio and font size scale
 * @param headerTypeSizeRatio - Header type scale ratio (1.067 - 1.2)
 * @param headerFontSizeScale - Header font size scale factor (0.85 - 1.15)
 */
export function applyDynamicHeaderFontSizeScales(
  headerTypeSizeRatio: number,
  headerFontSizeScale: number,
): void {
  const root = document.documentElement;
  const typeScale = generateTypeScaleFromRatio(headerTypeSizeRatio, headerFontSizeScale);

  typeScale.forEach(({ name, cssValue }) => {
    root.style.setProperty(`--header-text-${name}`, cssValue);
  });
}

/**
 * Generates letter spacing CSS variables as key-value pairs
 * Used for caching and consistency across cache/inline/React paths
 * @param bodyLetterSpacingScale - Body letter spacing scale factor (0.8 - 1.2)
 * @param headerLetterSpacingScale - Header letter spacing scale factor (0.8 - 1.2)
 * @returns Object mapping CSS variable names to values
 */
export function generateLetterSpacingCSS(
  bodyLetterSpacingScale: number = 1,
  headerLetterSpacingScale: number = 1,
): Record<string, string> {
  const vars: Record<string, string> = {};
  const baseLetterSpacingFactor = 0.005;
  const textNames = ["xs", "sm", "md", "base", "lg", "xl", "2xl", "3xl", "4xl", "5xl"] as const;
  const baseIndex = 3;

  textNames.forEach((name, i) => {
    const stepsFromBase = i - baseIndex;
    const baseLetterSpacing = stepsFromBase * baseLetterSpacingFactor;
    const scaledLetterSpacing =
      stepsFromBase < 0
        ? baseLetterSpacing / bodyLetterSpacingScale
        : baseLetterSpacing * bodyLetterSpacingScale;
    vars[`--letter-spacing-${name}`] = `${scaledLetterSpacing.toFixed(4)}em`;
  });

  const headerSizeNames = ["sm", "md", "lg", "xl"];
  headerSizeNames.forEach((name) => {
    const spacingValue = headerLetterSpacingScale * 0.002;
    vars[`--letter-spacing-header-${name}`] = `${spacingValue.toFixed(4)}em`;
  });

  return vars;
}

/**
 * Applies dynamic letter spacing scales to the DOM
 * Updates all --letter-spacing-* CSS variables based on body letter spacing scale
 * @param bodyLetterSpacingScale - Body letter spacing scale factor (0.8 - 1.2)
 * @param headerLetterSpacingScale - Header letter spacing scale factor (0.8 - 1.2)
 */
export function applyDynamicLetterSpacingScales(
  bodyLetterSpacingScale: number = 1,
  headerLetterSpacingScale: number = 1,
): void {
  const root = document.documentElement;
  const vars = generateLetterSpacingCSS(bodyLetterSpacingScale, headerLetterSpacingScale);
  Object.entries(vars).forEach(([name, value]) => {
    root.style.setProperty(name, value);
  });
}
