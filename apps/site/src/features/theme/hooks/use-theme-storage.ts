"use client";

import { useCallback } from "react";
import { type SimpleThemeColors } from "../constants/themes";
import { computeAllCssVariables, type ThemeConfig } from "../lib/css-variable-generator";
import { cacheCompleteTheme, applyThemeCacheToDOM, getSourceConfig, type ThemeSourceConfig } from "../lib/theme-cache";
import { type FontKey, getFontConfig } from "../constants/font-config";

export interface TypographyConfig { fontSizeScale: number; fontWeightScale: number; typeSizeRatio: number; headerLetterSpacingScale?: number; bodyLetterSpacingScale?: number }
export interface LayoutConfig { radius: number; borderWidth: number; spacingScale: number }
export interface FontsConfig { sansFont: FontKey; monoFont: FontKey }

export interface ThemeStorageOptions {
  onColorsChange?: (colors: SimpleThemeColors) => void;
  onTypographyChange?: (config: TypographyConfig) => void;
  onLayoutChange?: (config: LayoutConfig) => void;
  onFontsChange?: (config: FontsConfig) => void;
  onModeChange?: (mode: "light" | "dark") => void;
  currentThemeMode: "light" | "dark";
}

const DEFAULT_COLORS: SimpleThemeColors = {
  background: { h: 0, c: 0, l: 0.15 },
  foreground: { h: 0, c: 0, l: 0.98 },
  accent: { h: 210, c: 0.15, l: 0.5 },
};
const DEFAULT_TYPOGRAPHY: TypographyConfig = { fontSizeScale: 1, fontWeightScale: 1, typeSizeRatio: 1.2, headerLetterSpacingScale: 1, bodyLetterSpacingScale: 1 };
const DEFAULT_LAYOUT: LayoutConfig = { radius: 0.5, borderWidth: 2, spacingScale: 0.9 };
const DEFAULT_FONTS: FontsConfig = { sansFont: "Karla", monoFont: "Ioskeley Mono" };

function buildConfig(source: ThemeSourceConfig | null, mode: "light" | "dark"): ThemeConfig {
  return {
    colors: source?.colors || DEFAULT_COLORS,
    typography: source?.typography || DEFAULT_TYPOGRAPHY,
    layout: source?.layout || DEFAULT_LAYOUT,
    fonts: source?.fonts || DEFAULT_FONTS,
    mode,
  };
}

function computeAndCache(config: ThemeConfig): void {
  const cssVariables = computeAllCssVariables(config);
  cacheCompleteTheme(cssVariables, config);
  applyThemeCacheToDOM({ cssVariables, themeMode: config.mode, sourceConfig: config, timestamp: Date.now(), version: 1 });
}

export function useThemeStorage(options: ThemeStorageOptions) {
  const { onColorsChange, onTypographyChange, onLayoutChange, onFontsChange, onModeChange, currentThemeMode } = options;

  const applyAndPersistColors = useCallback((colors: SimpleThemeColors, mode?: "light" | "dark") => {
    const themeMode = mode ?? currentThemeMode;
    const config = buildConfig(getSourceConfig(), themeMode);
    config.colors = colors;
    computeAndCache(config);
    onColorsChange?.(colors);
  }, [currentThemeMode, onColorsChange]);

  const applyAndPersistTypography = useCallback((typography: TypographyConfig) => {
    const config = buildConfig(getSourceConfig(), currentThemeMode);
    config.typography = typography;
    computeAndCache(config);
    onTypographyChange?.(typography);
  }, [currentThemeMode, onTypographyChange]);

  const applyAndPersistLayout = useCallback((layout: LayoutConfig) => {
    const config = buildConfig(getSourceConfig(), currentThemeMode);
    config.layout = layout;
    computeAndCache(config);
    onLayoutChange?.(layout);
  }, [currentThemeMode, onLayoutChange]);

  const applyAndPersistFonts = useCallback((fonts: FontsConfig) => {
    const config = buildConfig(getSourceConfig(), currentThemeMode);
    config.fonts = fonts;
    const sansFontConfig = getFontConfig(fonts.sansFont, "sans");
    if (sansFontConfig) {
      config.typography.fontSizeScale = sansFontConfig.metrics.fontSizeScale;
      config.typography.fontWeightScale = sansFontConfig.metrics.fontWeightScale;
      config.typography.typeSizeRatio = sansFontConfig.metrics.typeSizeRatio;
    }
    computeAndCache(config);
    onFontsChange?.(fonts);
  }, [currentThemeMode, onFontsChange]);

  const applyAndPersistMode = useCallback((mode: "light" | "dark") => {
    const config = buildConfig(getSourceConfig(), currentThemeMode);
    config.mode = mode;
    computeAndCache(config);
    onModeChange?.(mode);
  }, [currentThemeMode, onModeChange]);

  return { applyAndPersistColors, applyAndPersistTypography, applyAndPersistLayout, applyAndPersistFonts, applyAndPersistMode };
}
