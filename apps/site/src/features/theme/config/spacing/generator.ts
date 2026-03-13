import { getSpacingCssVariables } from "../shared/layout-variables";

/**
 * Generates fluid spacing CSS using an exponential curve.
 * Curve is defined in constants.ts (exponentialCurve + spacingCurve config).
 * Each spacing value uses clamp(min, fluid vw, max) for viewport responsiveness.
 */
export function generateFluidSpacingCSS(spacingScale: number): string {
  return Object.entries(getSpacingCssVariables(spacingScale))
    .map(([name, value]) => `  ${name}: ${value};`)
    .join("\n");
}

/**
 * Applies dynamic fluid spacing scales to the DOM
 * @param spacingScale - Spacing scale factor (0.75 - 1.25)
 */
export function applyDynamicSpacingScale(spacingScale: number): void {
  const root = document.documentElement;
  const vars = getSpacingCssVariables(spacingScale);

  Object.entries(vars).forEach(([varName, value]) => {
    root.style.setProperty(varName, value);
  });
}
