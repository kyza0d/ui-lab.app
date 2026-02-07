import type { FontKey } from "@/features/theme/constants/font-config";

export interface FontDevMetrics {
  headerTypeSizeRatio: number;
  headerFontSizeScale: number;
  headerFontWeightScale: number;
  headerLetterSpacingScale: number;
  bodyTypeSizeRatio: number;
  bodyFontSizeScale: number;
  bodyFontWeightScale: number;
  bodyLetterSpacingScale: number;
}

export interface FontDevConfig {
  font: FontKey;
  metrics: FontDevMetrics;
}

export type FontDevConfigMap = Record<FontKey, FontDevMetrics>;
