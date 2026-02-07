import type { FontKey } from "@/features/theme/constants/font-config";
import { SANS_FONTS } from "@/features/theme/constants/font-config";
import type { FontDevMetrics, FontDevConfigMap } from "./types";

export function getAllFontConfigs(): FontDevConfigMap {
  const configs: FontDevConfigMap = {} as FontDevConfigMap;
  SANS_FONTS.forEach((font) => {
    configs[font.name] = getDefaultMetrics(font.name);
  });
  return configs;
}

export function getDefaultMetrics(fontName: FontKey): FontDevMetrics {
  const font = SANS_FONTS.find((f) => f.name === fontName);
  if (!font) {
    return getKarlaDefaults();
  }
  return {
    headerTypeSizeRatio: font.metrics.typeSizeRatio ?? 1.2,
    headerFontSizeScale: font.metrics.fontSizeScale ?? 1,
    headerFontWeightScale: font.metrics.headerFontWeightScale ?? 1,
    headerLetterSpacingScale: font.metrics.headerLetterSpacingScale ?? 1,
    bodyTypeSizeRatio: font.metrics.typeSizeRatio ?? 1.2,
    bodyFontSizeScale: font.metrics.fontSizeScale ?? 1,
    bodyFontWeightScale: font.metrics.bodyFontWeightScale ?? 1,
    bodyLetterSpacingScale: font.metrics.bodyLetterSpacingScale ?? 1,
  };
}

function getKarlaDefaults(): FontDevMetrics {
  return {
    headerTypeSizeRatio: 1.2,
    headerFontSizeScale: 1,
    headerFontWeightScale: 1,
    headerLetterSpacingScale: 1,
    bodyTypeSizeRatio: 1.2,
    bodyFontSizeScale: 1,
    bodyFontWeightScale: 1,
    bodyLetterSpacingScale: 1,
  };
}
