import { type FontKey, getDefaultMonoFont, getDefaultSansFont } from "../constants/font-config";
import {
  DEFAULT_GLOBAL_ADJUSTMENTS,
  DEFAULT_THEME_NAME,
  themes,
  type SimpleThemeColors,
} from "../constants/themes";
import { type LayoutScaleConfig } from "../config/shared/layout-variables";
import { ensureSemanticColorIntegrity } from "./color/semantic";
import { DEFAULT_TYPOGRAPHY_CONFIG } from "./typography-config";

const DEFAULT_THEME_MODE = "dark" as const;

export const DEFAULT_LAYOUT_CONFIG: LayoutScaleConfig = {
  radius: 0.9,
  borderWidth: 2,
  spacingScale: 0.9,
};

export const DEFAULT_FONT_CONFIG = {
  sansFont: getDefaultSansFont().name as FontKey,
  monoFont: getDefaultMonoFont().name as FontKey,
};

function getDefaultThemeColors(
  mode: "light" | "dark" = DEFAULT_THEME_MODE,
): SimpleThemeColors {
  const preset = themes[DEFAULT_THEME_NAME][mode];

  return {
    ...preset,
    semantic: preset.semantic
      ? ensureSemanticColorIntegrity(preset.semantic)
      : undefined,
    globalAdjustments: preset.globalAdjustments ?? DEFAULT_GLOBAL_ADJUSTMENTS,
  };
}

export function getDefaultThemeSourceConfig(
  mode: "light" | "dark" = DEFAULT_THEME_MODE,
) {
  return {
    colors: getDefaultThemeColors(mode),
    typography: { ...DEFAULT_TYPOGRAPHY_CONFIG },
    layout: { ...DEFAULT_LAYOUT_CONFIG },
    fonts: { ...DEFAULT_FONT_CONFIG },
    mode,
  };
}

export function getDefaultAppPreferences() {
  const defaults = getDefaultThemeSourceConfig();

  return {
    colors: defaults.colors,
    mode: defaults.mode,
    radius: defaults.layout.radius,
    borderWidth: defaults.layout.borderWidth,
    spacingScale: defaults.layout.spacingScale,
    globalAdjustments:
      defaults.colors.globalAdjustments ?? DEFAULT_GLOBAL_ADJUSTMENTS,
    selectedSansFont: defaults.fonts.sansFont,
    selectedMonoFont: defaults.fonts.monoFont,
    ...defaults.typography,
  };
}
