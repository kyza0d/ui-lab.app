import { baseBorderScale } from "../border-width/constants";
import { baseRadiusScale } from "../radius/constants";
import { baseSpacing } from "../spacing/constants";

export interface LayoutScaleConfig {
  radius: number;
  borderWidth: number;
  spacingScale: number;
}

export const SPACING_SCALE_STEPS = baseSpacing;
export const RADIUS_SCALE_STEPS = baseRadiusScale;
export const BORDER_SCALE_STEPS = baseBorderScale;

export function getSpacingCssVariables(
  spacingScale: number,
): Record<string, string> {
  const vars: Record<string, string> = {
    "--spacing-scale": String(spacingScale),
  };

  baseSpacing.forEach(({ name, min, fluid, max }) => {
    const scaledMin = (min * spacingScale).toFixed(3);
    const scaledFluid = (fluid * spacingScale).toFixed(2);
    const scaledMax = (max * spacingScale).toFixed(3);
    vars[`--spacing-${name}`] =
      `clamp(${scaledMin}rem, ${scaledFluid}vw, ${scaledMax}rem)`;
  });

  const scaledMin = (0.2 * spacingScale).toFixed(3);
  const scaledFluid = (2.5 * spacingScale).toFixed(2);
  const scaledMax = (0.25 * spacingScale).toFixed(3);
  vars["--spacing"] = `clamp(${scaledMin}rem, ${scaledFluid}vw, ${scaledMax}rem)`;

  return vars;
}

export function getRadiusCssVariables(radius: number): Record<string, string> {
  const vars: Record<string, string> = {};
  const radiusScaleFactor = radius / 0.2;

  baseRadiusScale.forEach(({ name, value }) => {
    const scaledValue = value * radiusScaleFactor;
    vars[`--radius-${name}`] =
      scaledValue > 100 ? "9999px" : `${scaledValue.toFixed(3)}rem`;
  });

  vars["--radius-full"] = "9999px";
  vars["--radius-ratio"] = String((radius / 0.2) * 0.5);

  return vars;
}

export function getBorderWidthCssVariables(
  borderWidth: number,
): Record<string, string> {
  const vars: Record<string, string> = {};
  const borderScaleFactor = borderWidth / 1;

  baseBorderScale.forEach(({ name, value }) => {
    vars[`--border-width-${name}`] = `${(value * borderScaleFactor).toFixed(1)}px`;
  });

  return vars;
}

function getLayoutCssVariables(
  layout: LayoutScaleConfig,
): Record<string, string> {
  return {
    ...getSpacingCssVariables(layout.spacingScale),
    ...getRadiusCssVariables(layout.radius),
    ...getBorderWidthCssVariables(layout.borderWidth),
  };
}
