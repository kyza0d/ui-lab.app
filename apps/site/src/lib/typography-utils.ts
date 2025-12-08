/**
 * Shared typography calculation utilities
 *
 * This module provides functions used by both:
 * 1. The inline script in layout.tsx (pre-hydration)
 * 2. The React code (post-hydration)
 *
 * Ensuring identical calculations between server and client eliminates FOUC.
 */

/**
 * Minimum font size constraints (in rem) for each size level
 * These ensure text never becomes too small to read comfortably
 */
const MIN_FONT_SIZE_CONSTRAINTS = {
  xs: 0.625,   // 10px minimum
  sm: 0.75,    // 12px minimum
  md: 0.875,   // 14px minimum
  base: 1.0,   // 16px minimum
  lg: 1.125,   // 18px minimum
  xl: 1.25,    // 20px minimum
  '2xl': 1.5,  // 24px minimum
  '3xl': 1.75, // 28px minimum
  '4xl': 2.0,  // 32px minimum
  '5xl': 2.5,  // 40px minimum
} as const;

const TEXT_SIZE_NAMES = ['xs', 'sm', 'md', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl'] as const;
const BASE_INDEX = 3; // 'base' is at index 3

export interface CalculatedFontSize {
  name: typeof TEXT_SIZE_NAMES[number];
  minSize: number;
  fluidVw: number;
  maxSize: number;
  clampValue: string;
}

export interface CalculatedFontWeight {
  name: string;
  value: number;
}

/**
 * Calculate font sizes using type scale ratio
 * Matches the calculation in config-generator.ts:generateTypeScaleFromRatio()
 *
 * @param typeSizeRatio - The scale ratio (1.067 - 1.2)
 * @param fontSizeScale - Font size scale factor (0.85 - 1.15)
 * @returns Array of calculated font sizes with clamp values
 */
export function calculateFontSizesWithRatio(
  typeSizeRatio: number,
  fontSizeScale: number
): CalculatedFontSize[] {
  const results: CalculatedFontSize[] = [];
  const baseSize = 1; // rem

  TEXT_SIZE_NAMES.forEach((name, i) => {
    // Calculate size using ratio: base is 1rem at index 3
    let size = baseSize;
    if (i > BASE_INDEX) {
      size = baseSize * Math.pow(typeSizeRatio, i - BASE_INDEX);
    } else if (i < BASE_INDEX) {
      size = baseSize / Math.pow(typeSizeRatio, BASE_INDEX - i);
    }

    // Apply font size scale
    const scaledSize = size * fontSizeScale;

    // Get minimum constraint for this size level
    const minConstraint = MIN_FONT_SIZE_CONSTRAINTS[name];

    // Calculate min (80% of scaled size, but not below minimum constraint)
    const minSize = Math.max(scaledSize * 0.8, minConstraint);

    // Calculate max (125% of scaled size)
    const maxSize = scaledSize * 1.25;

    // Calculate fluid vw value
    const fluidVw = scaledSize * 2.2;

    // Build clamp value
    const clampValue = `clamp(${minSize.toFixed(3)}rem, ${fluidVw.toFixed(2)}vw, ${maxSize.toFixed(3)}rem)`;

    results.push({
      name,
      minSize,
      fluidVw,
      maxSize,
      clampValue,
    });
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
export function calculateFontWeights(fontWeightScale: number): CalculatedFontWeight[] {
  const baseWeights = [
    { name: 'thin', value: 100 },
    { name: 'extralight', value: 200 },
    { name: 'light', value: 300 },
    { name: 'normal', value: 400 },
    { name: 'medium', value: 500 },
    { name: 'semibold', value: 600 },
    { name: 'bold', value: 700 },
    { name: 'extrabold', value: 800 },
    { name: 'black', value: 900 },
  ];

  const baseWeightRef = 400; // normal
  return baseWeights.map(({ name, value }) => {
    // Calculate offset from base (400)
    const offset = value - baseWeightRef;

    // Apply scale factor to offset
    const scaledValue = baseWeightRef + offset * fontWeightScale;

    // Clamp to 100-900 range
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
  root: HTMLElement = document.documentElement
): void {
  // Apply font size scale and font weight scale as CSS custom properties
  root.style.setProperty('--font-size-scale', `${fontSizeScale}`);
  root.style.setProperty('--font-weight-scale', `${fontWeightScale}`);

  // Calculate and apply all text size clamp values
  const fontSizes = calculateFontSizesWithRatio(typeSizeRatio, fontSizeScale);
  fontSizes.forEach(({ name, clampValue }) => {
    root.style.setProperty(`--text-${name}`, clampValue);
  });

  // Calculate and apply all font weight values
  const fontWeights = calculateFontWeights(fontWeightScale);
  fontWeights.forEach(({ name, value }) => {
    root.style.setProperty(`--font-weight-${name}`, value.toString());
  });
}
