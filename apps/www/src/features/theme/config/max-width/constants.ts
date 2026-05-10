function exponentialCurve(baseUnit: number, growthFactor: number, index: number): number {
  return baseUnit * Math.pow(growthFactor, index);
}

const maxWidthCurve = {
  baseUnit: 22,
  growthFactor: 1.4,
  levels: ["xs", "sm", "md", "lg", "xl", "2xl", "3xl", "4xl", "5xl"] as const,
} as const;

function generateMaxWidthScale() {
  return maxWidthCurve.levels.map((name, index) => ({
    name,
    value: parseFloat(exponentialCurve(maxWidthCurve.baseUnit, maxWidthCurve.growthFactor, index).toFixed(2)),
  }));
}

export const baseMaxWidth = generateMaxWidthScale();
