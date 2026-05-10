import { generateTypeScaleFromRatio } from "../config";
import {
  DEFAULT_GLOBAL_MIN_FONT_SIZE_PX,
  TYPOGRAPHY_FONT_SIZE_SCALE_MAX,
  TYPOGRAPHY_FONT_SIZE_SCALE_MIN,
  TYPOGRAPHY_TYPE_SIZE_RATIO_MAX,
  TYPOGRAPHY_TYPE_SIZE_RATIO_MIN,
  clampGlobalMinFontSizePx,
} from "./typography-config";

interface TypographyConstraintInput {
  typeSizeRatio: number;
  fontSizeScale: number;
}

interface TypographyConstraintResult extends TypographyConstraintInput {
  globalMinFontSizePx: number;
}

const FONT_SCALE_SEARCH_STEP = 0.001;

function getSmallestMinSize(
  typeSizeRatio: number,
  fontSizeScale: number,
  globalMinFontSizePx: number = DEFAULT_GLOBAL_MIN_FONT_SIZE_PX,
): number {
  const typeScale = generateTypeScaleFromRatio(typeSizeRatio, fontSizeScale, 1, {
    globalMinFontSizePx,
  });
  const minSizes = typeScale.map((item) => item.minSize);
  return Math.min(...minSizes);
}

export function isValidTypographyConfig(
  typeSizeRatio: number,
  fontSizeScale: number,
  globalMinFontSizePx: number = DEFAULT_GLOBAL_MIN_FONT_SIZE_PX,
): boolean {
  const smallestMin = getSmallestMinSize(
    typeSizeRatio,
    fontSizeScale,
    globalMinFontSizePx,
  );
  return smallestMin >= globalMinFontSizePx / 16;
}

export function findClosestValidFontSizeScale(
  typeSizeRatio: number,
  targetFontSizeScale: number,
  globalMinFontSizePx: number = DEFAULT_GLOBAL_MIN_FONT_SIZE_PX,
): number {
  const normalizedGlobalMinFontSizePx = clampGlobalMinFontSizePx(globalMinFontSizePx);
  const clampedTargetScale = Math.max(
    TYPOGRAPHY_FONT_SIZE_SCALE_MIN,
    Math.min(TYPOGRAPHY_FONT_SIZE_SCALE_MAX, targetFontSizeScale),
  );

  if (
    isValidTypographyConfig(
      typeSizeRatio,
      clampedTargetScale,
      normalizedGlobalMinFontSizePx,
    )
  ) {
    return clampedTargetScale;
  }

  let closestScale = clampedTargetScale;
  let closestDistance = Number.POSITIVE_INFINITY;

  for (
    let scale = TYPOGRAPHY_FONT_SIZE_SCALE_MIN;
    scale <= TYPOGRAPHY_FONT_SIZE_SCALE_MAX + FONT_SCALE_SEARCH_STEP;
    scale += FONT_SCALE_SEARCH_STEP
  ) {
    const roundedScale = Number(scale.toFixed(3));

    if (
      !isValidTypographyConfig(
        typeSizeRatio,
        roundedScale,
        normalizedGlobalMinFontSizePx,
      )
    ) {
      continue;
    }

    const distance = Math.abs(roundedScale - clampedTargetScale);
    if (distance < closestDistance) {
      closestDistance = distance;
      closestScale = roundedScale;
    }
  }

  return closestScale;
}

export function clampTypographyConfig(
  typeSizeRatio: number,
  fontSizeScale: number,
  globalMinFontSizePx: number = DEFAULT_GLOBAL_MIN_FONT_SIZE_PX,
): TypographyConstraintResult {
  const clampedRatio = Math.max(
    TYPOGRAPHY_TYPE_SIZE_RATIO_MIN,
    Math.min(TYPOGRAPHY_TYPE_SIZE_RATIO_MAX, typeSizeRatio),
  );
  const normalizedGlobalMinFontSizePx = clampGlobalMinFontSizePx(globalMinFontSizePx);
  const clampedScale = findClosestValidFontSizeScale(
    clampedRatio,
    fontSizeScale,
    normalizedGlobalMinFontSizePx,
  );

  return {
    typeSizeRatio: clampedRatio,
    fontSizeScale: clampedScale,
    globalMinFontSizePx: normalizedGlobalMinFontSizePx,
  };
}

function clampTypographySettings(
  input: TypographyConstraintInput,
  globalMinFontSizePx: number = DEFAULT_GLOBAL_MIN_FONT_SIZE_PX,
): TypographyConstraintResult {
  return clampTypographyConfig(
    input.typeSizeRatio,
    input.fontSizeScale,
    globalMinFontSizePx,
  );
}
