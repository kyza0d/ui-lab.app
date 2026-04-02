"use client";

import { useEffect } from "react";
import {
  applyDynamicThemeScales,
  applyDynamicFontSizeScalesWithRatio,
  applyDynamicHeaderFontSizeScales,
  applyDynamicLineHeightScales,
  applyDynamicLetterSpacingScales,
  applyDynamicFontWeightScales,
} from "../config";
import { type TypographyConfig } from "../lib/typography-config";
import { applyDynamicSpacingScale } from "../config/spacing/generator";
import { getFontConfig, type FontKey } from "../constants/font-config";
import { DEFAULT_FONT_CONFIG } from "../lib/default-theme-config";

interface LayoutConfig {
  radius: number;
  borderWidth: number;
  spacingScale: number;
}

interface ThemeConfigurationInput {
  typography: TypographyConfig;
  layout: LayoutConfig;
  fonts: { sansFont: FontKey; monoFont: FontKey };
  isEnabled?: boolean;
}

/**
 * CSS owns the first-paint baseline for typography, layout, and fonts.
 * After app state initializes, React applies the user's customized typography,
 * layout, and font selections on top of that safe baseline.
 */
export function useThemeConfiguration(config: ThemeConfigurationInput) {
  const { typography, layout, fonts, isEnabled = true } = config;

  useEffect(() => {
    if (!isEnabled) return;

    applyDynamicFontSizeScalesWithRatio(
      typography.bodyTypeSizeRatio,
      typography.bodyFontSizeScale,
      typography.globalMinFontSizePx,
    );
    applyDynamicHeaderFontSizeScales(
      typography.headerTypeSizeRatio,
      typography.headerFontSizeScale,
      typography.globalMinFontSizePx,
    );
    applyDynamicLineHeightScales(
      typography.headerLineHeight,
      typography.bodyLineHeight,
    );
    applyDynamicLetterSpacingScales(
      typography.bodyLetterSpacingScale,
      typography.headerLetterSpacingScale,
    );
    applyDynamicFontWeightScales(
      undefined,
      typography.headerFontWeightScale,
      typography.bodyFontWeightScale,
    );
  }, [
    isEnabled,
    typography.bodyTypeSizeRatio,
    typography.bodyFontSizeScale,
    typography.headerTypeSizeRatio,
    typography.headerFontSizeScale,
    typography.headerLineHeight,
    typography.globalMinFontSizePx,
    typography.bodyLineHeight,
    typography.bodyLetterSpacingScale,
    typography.headerLetterSpacingScale,
    typography.headerFontWeightScale,
    typography.bodyFontWeightScale,
  ]);

  useEffect(() => {
    if (!isEnabled) return;

    applyDynamicThemeScales(layout.radius, layout.borderWidth);
    applyDynamicSpacingScale(layout.spacingScale);
  }, [isEnabled, layout.radius, layout.borderWidth, layout.spacingScale]);

  useEffect(() => {
    if (!isEnabled) return;

    const root = document.documentElement;
    const sansFontFamily =
      getFontConfig(fonts.sansFont, "sans")?.family ??
      getFontConfig(DEFAULT_FONT_CONFIG.sansFont, "sans")?.family;
    const monoFontFamily =
      getFontConfig(fonts.monoFont, "mono")?.family ??
      getFontConfig(DEFAULT_FONT_CONFIG.monoFont, "mono")?.family;

    if (sansFontFamily) {
      root.style.setProperty("--font-sans", sansFontFamily);
    }

    if (monoFontFamily) {
      root.style.setProperty("--font-mono", monoFontFamily);
    }
  }, [fonts.monoFont, fonts.sansFont, isEnabled]);
}
