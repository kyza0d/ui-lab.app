import type { FontKey } from "@/features/theme/constants/font-config";

export interface FontDevMetrics {
  fontSizeScale: number;
  fontWeightScale: number;
  typeSizeRatio: number;
  headerLetterSpacingScale: number;
  bodyLetterSpacingScale: number;
  headerFontWeightScale: number;
  bodyFontWeightScale: number;
}

export interface FontDevConfig {
  font: FontKey;
  metrics: FontDevMetrics;
}

export type FontDevConfigMap = Record<FontKey, FontDevMetrics>;
