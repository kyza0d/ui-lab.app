"use client";

import { useEffect } from "react";
import { applyDynamicThemeScales, applyDynamicSpacingScale } from "@/shared/lib/config-generator";

/**
 * Grouped configuration objects to reduce dependency array size
 */
export interface TypographyConfig {
  fontSizeScale: number;
  fontWeightScale: number;
  typeSizeRatio: number;
  headerLetterSpacingScale?: number;
  bodyLetterSpacingScale?: number;
}

export interface LayoutConfig {
  radius: number;
  borderWidth: number;
  spacingScale: number;
}

export interface ThemeConfigurationInput {
  typography: TypographyConfig;
  layout: LayoutConfig;
}

/**
 * SIMPLIFIED: This hook now handles ONLY DOM updates for typography and layout scales.
 * It does NOT handle persistence or color application - that's the job of useThemeStorage.
 *
 * This hook is triggered whenever typography or layout settings change to apply
 * the corresponding CSS custom properties and dynamic scales to the DOM.
 *
 * Note: Typography is handled by useThemeStorage which applies it immediately,
 * so this hook focuses on layout scales that don't need early application.
 */
export function useThemeConfiguration(config: ThemeConfigurationInput) {
  const { typography, layout } = config;

  // Apply layout scales to DOM whenever they change
  useEffect(() => {
    // Apply radius and border-width scales
    applyDynamicThemeScales(
      layout.radius,
      layout.borderWidth
    );

    // Apply fluid spacing scales
    applyDynamicSpacingScale(layout.spacingScale);
  }, [layout.radius, layout.borderWidth, layout.spacingScale]);
}
