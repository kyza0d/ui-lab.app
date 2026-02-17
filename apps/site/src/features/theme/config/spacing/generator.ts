import { baseSpacing } from "./constants";

/**
 * Generates fluid spacing CSS using an exponential curve.
 * Curve is defined in constants.ts (exponentialCurve + spacingCurve config).
 * Each spacing value uses clamp(min, fluid vw, max) for viewport responsiveness.
 */
export function generateFluidSpacingCSS(spacingScale: number): string {
  const lines: string[] = [];
  baseSpacing.forEach(({ name, min, fluid, max }) => {
    const scaledMin = (min * spacingScale).toFixed(3);
    const scaledFluid = (fluid * spacingScale).toFixed(2);
    const scaledMax = (max * spacingScale).toFixed(3);
    lines.push(
      `  --spacing-${name}: clamp(${scaledMin}rem, ${scaledFluid}vw, ${scaledMax}rem);`,
    );
  });

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
