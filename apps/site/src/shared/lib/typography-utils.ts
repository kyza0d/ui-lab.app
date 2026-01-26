/**
 * Shared typography calculation utilities
 *
 * This module provides functions used by both:
 * 1. The inline script in layout.tsx (pre-hydration)
 * 2. The React code (post-hydration)
 *
 * Ensuring identical calculations between server and client eliminates FOUC.
 *
 * Typography Philosophy:
 * - Small text (xs through base): Static sizes for consistency and readability
 * - Large text (lg through 5xl): Fluid typography with clamp() for responsive scaling
 * - Minimum 16px for general text, 14px for text-xs
 */

/**
 * Minimum font size constraints (in rem) for each size level
 * These ensure text never becomes too small to read comfortably
 * Updated to enforce 16px minimum (14px for xs)
 */
const MIN_FONT_SIZE_CONSTRAINTS = {
  xs: 0.875, // 14px minimum (exception to 16px rule)
  sm: 1.0, // 16px minimum
  md: 1.0, // 16px minimum
  base: 1.0, // 16px minimum
  lg: 1.125, // 18px minimum
  xl: 1.25, // 20px minimum
  "2xl": 1.5, // 24px minimum
  "3xl": 1.75, // 28px minimum
  "4xl": 2.0, // 32px minimum
  "5xl": 2.25, // 36px minimum (reduced from 40px for tighter scale)
} as const;

/**
 * Sizes that use fluid typography (clamp)
 * Only larger sizes benefit from viewport-responsive scaling
 */
const FLUID_SIZES = new Set(["lg", "xl", "2xl", "3xl", "4xl", "5xl"]);

const TEXT_SIZE_NAMES = [
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
const BASE_INDEX = 3; // 'base' is at index 3

export interface CalculatedFontSize {
  name: (typeof TEXT_SIZE_NAMES)[number];
  minSize: number;
  fluidVw: number;
  maxSize: number;
  /** The final CSS value - either a static rem value or a clamp() expression */
  cssValue: string;
  /** Whether this size uses fluid typography */
  isFluid: boolean;
}

export interface CalculatedFontWeight {
  name: string;
  value: number;
}

/**
 * Static font sizes for small text (xs through base)
 * These sizes don't need fluid scaling and maintain consistent readability
 */
const STATIC_FONT_SIZES = {
  xs: 0.875, // 14px
  sm: 0.9375, // 15px
  md: 1.0, // 16px
  base: 1.0, // 16px
} as const;

/**
 * Calculate font sizes using type scale ratio
 * - Small sizes (xs through base): Static rem values for consistency
 * - Large sizes (lg through 5xl): Fluid clamp() values for responsive scaling
 *
 * @param typeSizeRatio - The scale ratio (1.067 - 1.2), only affects fluid sizes
 * @param fontSizeScale - Font size scale factor (0.85 - 1.15)
 * @returns Array of calculated font sizes with appropriate CSS values
 */
export function calculateFontSizesWithRatio(
  typeSizeRatio: number,
  fontSizeScale: number,
): CalculatedFontSize[] {
  const results: CalculatedFontSize[] = [];
  const baseSize = 1; // rem

  TEXT_SIZE_NAMES.forEach((name, i) => {
    const isFluid = FLUID_SIZES.has(name);
    const minConstraint = MIN_FONT_SIZE_CONSTRAINTS[name];

    if (!isFluid) {
      // Static sizes: use fixed rem values
      const staticSize =
        STATIC_FONT_SIZES[name as keyof typeof STATIC_FONT_SIZES];
      const scaledSize = Math.max(staticSize * fontSizeScale, minConstraint);

      results.push({
        name,
        minSize: scaledSize,
        fluidVw: 0,
        maxSize: scaledSize,
        cssValue: `${scaledSize.toFixed(3)}rem`,
        isFluid: false,
      });
    } else {
      // Fluid sizes: calculate using ratio from base (lg is 1 step above base)
      // lg=1, xl=2, 2xl=3, 3xl=4, 4xl=5, 5xl=6 steps above base
      const stepsFromBase = i - BASE_INDEX;
      const size = baseSize * Math.pow(typeSizeRatio, stepsFromBase);

      // Apply font size scale
      const scaledSize = size * fontSizeScale;

      // Calculate min (85% of scaled size, but not below minimum constraint)
      const minSize = Math.max(scaledSize * 0.85, minConstraint);

      // Calculate max (115% of scaled size for tighter range)
      const maxSize = scaledSize * 1.15;

      // Calculate fluid vw value (reduced multiplier for subtler scaling)
      const fluidVw = scaledSize * 1.8;

      // Build clamp value
      const cssValue = `clamp(${minSize.toFixed(3)}rem, ${fluidVw.toFixed(2)}vw, ${maxSize.toFixed(3)}rem)`;

      results.push({
        name,
        minSize,
        fluidVw,
        maxSize,
        cssValue,
        isFluid: true,
      });
    }
  });

  return results;
}

/**
 * Calculate font weight values with scale factor
 * Matches the calculation in config-generator.ts:applyDynamicFontWeightScales()
 *
 * @param fontWeightScale - Font weight scale factor (0.75 - 1.25)
 * @returns Array of calculated font weight values
 */
export function calculateFontWeights(
  fontWeightScale: number,
): CalculatedFontWeight[] {
  const baseWeights = [
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

  return baseWeights.map(({ name, value }) => {
    const scaledValue = value * fontWeightScale;
    const clampedValue = Math.max(100, Math.min(900, Math.round(scaledValue)));
    return { name, value: clampedValue };
  });
}

/**
 * Apply all typography CSS variables to DOM
 * Used by both inline script and React code
 *
 * @param typeSizeRatio - Type scale ratio
 * @param fontSizeScale - Font size scale factor
 * @param fontWeightScale - Font weight scale factor
 * @param root - DOM element to apply properties to (defaults to document.documentElement)
 */
export function applyTypographyStyles(
  typeSizeRatio: number,
  fontSizeScale: number,
  fontWeightScale: number,
  root: HTMLElement = document.documentElement,
): void {
  // Apply font size scale and font weight scale as CSS custom properties
  root.style.setProperty("--font-size-scale", `${fontSizeScale}`);
  root.style.setProperty("--font-weight-scale", `${fontWeightScale}`);

  // Calculate and apply all text size values (static for small, fluid for large)
  const fontSizes = calculateFontSizesWithRatio(typeSizeRatio, fontSizeScale);
  fontSizes.forEach(({ name, cssValue }) => {
    root.style.setProperty(`--text-${name}`, cssValue);
  });

  // Calculate and apply all font weight values
  const fontWeights = calculateFontWeights(fontWeightScale);
  fontWeights.forEach(({ name, value }) => {
    root.style.setProperty(`--font-weight-${name}`, value.toString());
  });
}
