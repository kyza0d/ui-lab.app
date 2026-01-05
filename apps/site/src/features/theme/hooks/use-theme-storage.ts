"use client";

import { useCallback } from "react";
import { type SimpleThemeColors } from "../constants/themes";
import { computeAllCssVariables, type ThemeConfig } from "../lib/css-variable-generator";
import { cacheCompleteTheme, applyThemeCacheToDOM, getSourceConfig, type ThemeSourceConfig } from "../lib/theme-cache";

export interface TypographyConfig { fontSizeScale: number; fontWeightScale: number; typeSizeRatio: number }
export interface LayoutConfig { radius: number; borderWidth: number; spacingScale: number }

export interface ThemeStorageOptions {
  onColorsChange?: (colors: SimpleThemeColors) => void;
  onTypographyChange?: (config: TypographyConfig) => void;
  onLayoutChange?: (config: LayoutConfig) => void;
  onModeChange?: (mode: "light" | "dark") => void;
  currentThemeMode: "light" | "dark";
}

const DEFAULT_COLORS: SimpleThemeColors = {
  background: { h: 0, c: 0, l: 0.15 },
  foreground: { h: 0, c: 0, l: 0.98 },
  accent: { h: 210, c: 0.15, l: 0.5 },
};
const DEFAULT_TYPOGRAPHY: TypographyConfig = { fontSizeScale: 1, fontWeightScale: 1, typeSizeRatio: 1.2 };
const DEFAULT_LAYOUT: LayoutConfig = { radius: 0.5, borderWidth: 2, spacingScale: 0.9 };

function buildConfig(source: ThemeSourceConfig | null, mode: "light" | "dark"): ThemeConfig {
  return {
    colors: source?.colors || DEFAULT_COLORS,
    typography: source?.typography || DEFAULT_TYPOGRAPHY,
    layout: source?.layout || DEFAULT_LAYOUT,
    mode: source?.mode || mode,
  };
}

function computeAndCache(config: ThemeConfig): void {
  const cssVariables = computeAllCssVariables(config);
  cacheCompleteTheme(cssVariables, config);
  applyThemeCacheToDOM({ cssVariables, themeMode: config.mode, sourceConfig: config, timestamp: Date.now(), version: 1 });
}

export function useThemeStorage(options: ThemeStorageOptions) {
  const { onColorsChange, onTypographyChange, onLayoutChange, onModeChange, currentThemeMode } = options;

  const applyAndPersistColors = useCallback((colors: SimpleThemeColors) => {
    const config = buildConfig(getSourceConfig(), currentThemeMode);
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

  const applyAndPersistMode = useCallback((mode: "light" | "dark") => {
    const config = buildConfig(getSourceConfig(), currentThemeMode);
    config.mode = mode;
    computeAndCache(config);
    onModeChange?.(mode);
  }, [currentThemeMode, onModeChange]);

  return { applyAndPersistColors, applyAndPersistTypography, applyAndPersistLayout, applyAndPersistMode };
}
