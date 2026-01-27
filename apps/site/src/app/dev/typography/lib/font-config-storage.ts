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
    fontSizeScale: font.metrics.fontSizeScale,
    fontWeightScale: font.metrics.fontWeightScale,
    typeSizeRatio: font.metrics.typeSizeRatio,
    headerLetterSpacingScale: font.metrics.headerLetterSpacingScale ?? 1,
    bodyLetterSpacingScale: font.metrics.bodyLetterSpacingScale ?? 1,
    headerFontWeightScale: font.metrics.headerFontWeightScale ?? 1,
    bodyFontWeightScale: font.metrics.bodyFontWeightScale ?? 1,
  };
}

function getKarlaDefaults(): FontDevMetrics {
  return {
    fontSizeScale: 1,
    fontWeightScale: 1,
    typeSizeRatio: 1.2,
    headerLetterSpacingScale: 1,
    bodyLetterSpacingScale: 1,
    headerFontWeightScale: 1,
    bodyFontWeightScale: 1,
  };
}

export function clearAllFontConfigs(): void {
  if (typeof window === "undefined") return;
  const keysToDelete: string[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key?.startsWith(STORAGE_PREFIX)) {
      keysToDelete.push(key);
    }
  }
  keysToDelete.forEach((key) => localStorage.removeItem(key));
}
