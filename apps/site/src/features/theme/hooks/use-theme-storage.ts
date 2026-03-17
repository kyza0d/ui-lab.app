"use client";

import { useCallback } from "react";
import { type SimpleThemeColors } from "../constants/themes";
import { computeAllCssVariables, type ThemeConfig } from "../lib/css-variable-generator";
import { cacheCompleteTheme, applyThemeCacheToDOM, getSourceConfig, type ThemeSourceConfig } from "../lib/theme-cache";
import { type FontKey, getFontConfig } from "../constants/font-config";
import { type TypographyConfig } from "../lib/typography-config";
import { getDefaultThemeSourceConfig } from "../lib/default-theme-config";
interface LayoutConfig { radius: number; borderWidth: number; spacingScale: number }
interface FontsConfig { sansFont: FontKey; monoFont: FontKey }

interface ThemeStorageOptions {
  onColorsChange?: (colors: SimpleThemeColors) => void;
  onTypographyChange?: (config: TypographyConfig) => void;
  onLayoutChange?: (config: LayoutConfig) => void;
  onFontsChange?: (config: FontsConfig) => void;
  onModeChange?: (mode: "light" | "dark") => void;
  currentThemeMode: "light" | "dark";
}

function buildConfig(source: ThemeSourceConfig | null, mode: "light" | "dark"): ThemeConfig {
  const defaults = getDefaultThemeSourceConfig(mode);
  return {
    colors: source?.colors || defaults.colors,
    typography: { ...defaults.typography, ...(source?.typography || {}) },
    layout: { ...defaults.layout, ...(source?.layout || {}) },
    fonts: { ...defaults.fonts, ...(source?.fonts || {}) },
    mode,
  };
}

function computeAndCache(config: ThemeConfig): void {
  const cssVariables = computeAllCssVariables(config);
  cacheCompleteTheme(cssVariables, config);
  const nonTypographyVars = Object.fromEntries(
    Object.entries(cssVariables).filter(([key]) =>
      !key.startsWith('--text-') &&
      !key.startsWith('--header-text-') &&
      !key.startsWith('--leading-') &&
      !key.startsWith('--letter-spacing-') &&
      !key.startsWith('--font-weight-')
    )
  );

  applyThemeCacheToDOM({ cssVariables: nonTypographyVars, themeMode: config.mode, sourceConfig: config, timestamp: Date.now(), version: 1 });
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
      config.typography.bodyFontSizeScale = sansFontConfig.metrics.fontSizeScale ?? 1;
      config.typography.bodyFontWeightScale = sansFontConfig.metrics.fontWeightScale ?? 1;
      config.typography.bodyTypeSizeRatio = sansFontConfig.metrics.typeSizeRatio ?? 1.2;
      if (typeof sansFontConfig.metrics.headerLineHeight === "number") {
        config.typography.headerLineHeight = sansFontConfig.metrics.headerLineHeight;
      }
      if (typeof sansFontConfig.metrics.bodyLineHeight === "number") {
        config.typography.bodyLineHeight = sansFontConfig.metrics.bodyLineHeight;
      }
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

  const applyAndPersistModeAndColors = useCallback((mode: "light" | "dark", colors: SimpleThemeColors) => {
    const config = buildConfig(getSourceConfig(), mode);
    config.mode = mode;
    config.colors = colors;
    computeAndCache(config);
    onModeChange?.(mode);
    onColorsChange?.(colors);
  }, [onModeChange, onColorsChange]);

  return {
    applyAndPersistColors,
    applyAndPersistTypography,
    applyAndPersistLayout,
    applyAndPersistFonts,
    applyAndPersistMode,
    applyAndPersistModeAndColors,
  };
}
