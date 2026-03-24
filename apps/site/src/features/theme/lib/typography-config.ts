const ROOT_FONT_SIZE_PX = 16;

export const DEFAULT_GLOBAL_MIN_FONT_SIZE_PX = 13.25;
export const MIN_GLOBAL_MIN_FONT_SIZE_PX = 10;
export const MAX_GLOBAL_MIN_FONT_SIZE_PX = 18;

export const TYPOGRAPHY_TYPE_SIZE_RATIO_MIN = 1.067;
export const TYPOGRAPHY_TYPE_SIZE_RATIO_MAX = 1.333;
export const TYPOGRAPHY_FONT_SIZE_SCALE_MIN = 0.8;
export const TYPOGRAPHY_FONT_SIZE_SCALE_MAX = 1.2;
export const TYPOGRAPHY_LINE_HEIGHT_MIN = 1;
export const TYPOGRAPHY_LINE_HEIGHT_MAX = 2;
export const DEFAULT_HEADER_LINE_HEIGHT = 1.5;
export const DEFAULT_BODY_LINE_HEIGHT = 1.5;

export interface TypographyConfig {
  headerTypeSizeRatio: number;
  headerFontSizeScale: number;
  headerFontWeightScale: number;
  headerLetterSpacingScale: number;
  headerLineHeight: number;
  bodyTypeSizeRatio: number;
  bodyFontSizeScale: number;
  bodyFontWeightScale: number;
  bodyLetterSpacingScale: number;
  bodyLineHeight: number;
  globalMinFontSizePx: number;
}

export const DEFAULT_TYPOGRAPHY_CONFIG: TypographyConfig = {
  headerTypeSizeRatio: 1.125,
  headerFontSizeScale: 1,
  headerFontWeightScale: 1,
  headerLetterSpacingScale: 1,
  headerLineHeight: DEFAULT_HEADER_LINE_HEIGHT,
  bodyTypeSizeRatio: 1.2,
  bodyFontSizeScale: 0.960,
  bodyFontWeightScale: 1,
  bodyLetterSpacingScale: 1,
  bodyLineHeight: DEFAULT_BODY_LINE_HEIGHT,
  globalMinFontSizePx: DEFAULT_GLOBAL_MIN_FONT_SIZE_PX,
};

export function clampGlobalMinFontSizePx(value: number): number {
  return Math.max(
    MIN_GLOBAL_MIN_FONT_SIZE_PX,
    Math.min(MAX_GLOBAL_MIN_FONT_SIZE_PX, value),
  );
}

export function normalizeGlobalMinFontSizePx(value: unknown): number {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return DEFAULT_GLOBAL_MIN_FONT_SIZE_PX;
  }

  return clampGlobalMinFontSizePx(value);
}

function clampTypographyLineHeight(value: number): number {
  return Math.max(
    TYPOGRAPHY_LINE_HEIGHT_MIN,
    Math.min(TYPOGRAPHY_LINE_HEIGHT_MAX, value),
  );
}

export function normalizeTypographyLineHeight(
  value: unknown,
  fallback: number,
): number {
  if (typeof value !== "number" || !Number.isFinite(value)) {
    return fallback;
  }

  return clampTypographyLineHeight(value);
}

export function pxToRem(px: number): number {
  return px / ROOT_FONT_SIZE_PX;
}
