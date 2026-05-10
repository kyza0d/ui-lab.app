function exponentialCurve(baseUnit: number, growthFactor: number, index: number): number {
  return baseUnit * Math.pow(growthFactor, index);
}

const spacingCurve = {
  baseUnit: 0.5,
  growthFactor: 1.3,
  levels: ["xs", "sm", "base", "md", "lg", "xl", "2xl"] as const,
  fluidMultiplier: 5,
  maxMultiplier: 1.5,
} as const;

function generateSpacingScale() {
  return spacingCurve.levels.map((name, index) => ({
    name,
    min: parseFloat(exponentialCurve(spacingCurve.baseUnit, spacingCurve.growthFactor, index).toFixed(3)),
    fluid: parseFloat((exponentialCurve(spacingCurve.baseUnit, spacingCurve.growthFactor, index) * spacingCurve.fluidMultiplier).toFixed(2)),
    max: parseFloat((exponentialCurve(spacingCurve.baseUnit, spacingCurve.growthFactor, index) * spacingCurve.maxMultiplier).toFixed(3)),
  }));
}

export const baseSpacing = generateSpacingScale();
