import { generateTypeScaleFromRatio } from "../config";

const MIN_FONT_SIZE_REM = 0.850;

export function getSmallestMinSize(typeSizeRatio: number, fontSizeScale: number): number {
  const typeScale = generateTypeScaleFromRatio(typeSizeRatio, fontSizeScale);
  const minSizes = typeScale.map(item => item.minSize);
  return Math.min(...minSizes);
}

export function isValidTypographyConfig(typeSizeRatio: number, fontSizeScale: number): boolean {
  const smallestMin = getSmallestMinSize(typeSizeRatio, fontSizeScale);
  return smallestMin >= MIN_FONT_SIZE_REM;
}

export function clampTypographyConfig(
  typeSizeRatio: number,
  fontSizeScale: number,
): { typeSizeRatio: number; fontSizeScale: number } {
  const clampedRatio = Math.max(1.067, Math.min(1.2, typeSizeRatio));
  const clampedScale = Math.max(0.85, Math.min(1.1, fontSizeScale));

  if (isValidTypographyConfig(clampedRatio, clampedScale)) {
    return { typeSizeRatio: clampedRatio, fontSizeScale: clampedScale };
  }

  return { typeSizeRatio: clampedRatio, fontSizeScale: clampedScale };
}
