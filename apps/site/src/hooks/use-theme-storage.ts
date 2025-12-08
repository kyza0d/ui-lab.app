"use client";

import { useCallback } from "react";
import { type SimpleThemeColors } from "@/constants/themes";
import {
  saveThemePreferences,
  loadThemePreferences,
  type ThemePreferences,
} from "@/lib/theme-persistence";
import {
  generateThemePalettes,
  paletteToCssVars,
  type OklchColor,
} from "@/lib/color-utils";
import { cachePalette } from "@/lib/palette-cache";

export interface TypographyConfig {
  fontSizeScale: number;
  fontWeightScale: number;
  typeSizeRatio: number;
}

export interface LayoutConfig {
  radius: number;
  borderWidth: number;
  spacingScale: number;
}

export interface ThemeStorageOptions {
  onColorsChange?: (colors: SimpleThemeColors) => void;
  onTypographyChange?: (config: TypographyConfig) => void;
  onLayoutChange?: (config: LayoutConfig) => void;
  onModeChange?: (mode: "light" | "dark") => void;
  currentThemeMode: "light" | "dark";
}

/**
 * Custom hook that handles all theme persistence, localStorage synchronization,
 * and DOM updates in one encapsulated place.
 *
 * This hook is the single source of truth for theme data operations:
 * 1. Save to localStorage immediately when any setting changes
 * 2. Apply changes to DOM immediately
 * 3. Call optional callbacks to update React state (for UI feedback)
 *
 * Data flow:
 * User changes setting → saveAndApplyTheme() → localStorage → DOM → callback
 */
export function useThemeStorage(options: ThemeStorageOptions) {
  const {
    onColorsChange,
    onTypographyChange,
    onLayoutChange,
    onModeChange,
    currentThemeMode,
  } = options;

  /**
   * Apply colors to DOM and persist to storage.
   * Called immediately when user changes a color.
   */
  const applyAndPersistColors = useCallback(
    (colors: SimpleThemeColors) => {
      console.debug("[useThemeStorage] Applying and persisting colors:", {
        background: colors.background,
        foreground: colors.foreground,
        accent: colors.accent,
      });

      // Generate and apply color palettes to DOM
      const palettes = generateThemePalettes(
        colors.background,
        colors.foreground,
        colors.accent,
        currentThemeMode,
        0,
        colors.semantic,
        colors.accentChromaLimit ?? 0.30,
        colors.accentEasing,
        colors.accentChromaScaling
      );

      const bgVars = paletteToCssVars("background", palettes.background);
      const fgVars = paletteToCssVars("foreground", palettes.foreground);
      const accentVars = paletteToCssVars("accent", palettes.accent);

      let allColorVars = { ...bgVars, ...fgVars, ...accentVars };

      // Add semantic colors if available
      if (palettes.semantic) {
        const successVars = paletteToCssVars("success", palettes.semantic.success);
        const dangerVars = paletteToCssVars("danger", palettes.semantic.danger);
        const warningVars = paletteToCssVars("warning", palettes.semantic.warning);
        const infoVars = paletteToCssVars("info", palettes.semantic.info);

        allColorVars = { ...allColorVars, ...successVars, ...dangerVars, ...warningVars, ...infoVars };
      }

      // Apply to DOM synchronously
      Object.entries(allColorVars).forEach(([varName, value]) => {
        document.documentElement.style.setProperty(varName, value);
      });

      // Cache the palette for next page load
      cachePalette(colors, allColorVars, currentThemeMode);

      // Persist the complete theme preferences
      const currentPrefs = loadThemePreferences();
      const updatedPrefs: ThemePreferences = {
        colors,
        typography: currentPrefs?.typography || {
          fontSizeScale: 1,
          fontWeightScale: 1,
          typeSizeRatio: 1.2,
        },
        layout: currentPrefs?.layout || {
          radius: 0.2,
          borderWidth: 1,
          spacingScale: 1,
        },
        mode: currentPrefs?.mode || currentThemeMode,
      };
      saveThemePreferences(updatedPrefs);

      // Notify React state of the change
      onColorsChange?.(colors);
    },
    [currentThemeMode, onColorsChange]
  );

  /**
   * Apply typography settings and persist to storage.
   */
  const applyAndPersistTypography = useCallback(
    (typography: TypographyConfig) => {
      console.debug("[useThemeStorage] Applying and persisting typography:", typography);

      // Apply typography styles immediately (synchronous)
      const root = document.documentElement;

      // Set scale properties
      root.style.setProperty("--font-size-scale", `${typography.fontSizeScale}`);
      root.style.setProperty("--font-weight-scale", `${typography.fontWeightScale}`);

      // Calculate and apply font size clamps
      // Enforce minimum of 14px (0.875rem) across all sizes
      const minConstraints = {
        xs: 0.875, sm: 0.875, md: 0.875, base: 1.0, lg: 1.125,
        xl: 1.25, '2xl': 1.5, '3xl': 1.75, '4xl': 2.0, '5xl': 2.5
      } as const;
      const names = ['xs', 'sm', 'md', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl'] as const;
      const baseIndex = 3;

      names.forEach((name, i) => {
        let size = 1;
        if (i > baseIndex) {
          size = Math.pow(typography.typeSizeRatio, i - baseIndex);
        } else if (i < baseIndex) {
          size = 1 / Math.pow(typography.typeSizeRatio, baseIndex - i);
        }
        const minConstraint = minConstraints[name];
        const scaledSize = size * typography.fontSizeScale;
        const minSize = Math.max(scaledSize * 0.8, minConstraint);
        const maxSize = scaledSize * 1.25;
        const fluidVw = scaledSize * 2.2;
        const clamp = `clamp(${minSize.toFixed(3)}rem, ${fluidVw.toFixed(2)}vw, ${maxSize.toFixed(3)}rem)`;
        root.style.setProperty(`--text-${name}`, clamp);
      });

      // Calculate and apply font weights
      const baseWeights = [
        { name: 'thin', value: 100 },
        { name: 'extralight', value: 200 },
        { name: 'light', value: 300 },
        { name: 'normal', value: 400 },
        { name: 'medium', value: 500 },
        { name: 'semibold', value: 600 },
        { name: 'bold', value: 700 },
        { name: 'extrabold', value: 800 },
        { name: 'black', value: 900 },
      ];
      const baseWeightRef = 400;
      baseWeights.forEach(({ name, value }) => {
        const offset = value - baseWeightRef;
        const scaled = baseWeightRef + offset * typography.fontWeightScale;
        const clamped = Math.max(100, Math.min(900, Math.round(scaled)));
        root.style.setProperty(`--font-weight-${name}`, clamped.toString());
      });

      // Persist to storage
      const currentPrefs = loadThemePreferences();
      const updatedPrefs: ThemePreferences = {
        colors: currentPrefs?.colors || {
          background: { h: 0, c: 0, l: 0.15 },
          foreground: { h: 0, c: 0, l: 0.98 },
          accent: { h: 210, c: 0.15, l: 0.5 },
        },
        typography,
        layout: currentPrefs?.layout || {
          radius: 0.2,
          borderWidth: 1,
          spacingScale: 1,
        },
        mode: currentPrefs?.mode || currentThemeMode,
      };
      saveThemePreferences(updatedPrefs);

      // Notify React state
      onTypographyChange?.(typography);
    },
    [currentThemeMode, onTypographyChange]
  );

  /**
   * Apply layout settings and persist to storage.
   */
  const applyAndPersistLayout = useCallback(
    (layout: LayoutConfig) => {
      console.debug("[useThemeStorage] Applying and persisting layout:", layout);

      // Apply layout scales to DOM
      const root = document.documentElement;

      // Radius scales
      const baseRadiusScale = [
        { name: "xs", value: 0.05 },
        { name: "sm", value: 0.1 },
        { name: "base", value: 0.2 },
        { name: "md", value: 0.3 },
        { name: "lg", value: 0.5 },
        { name: "xl", value: 0.75 },
        { name: "2xl", value: 1 },
      ];

      const baseRadiusRef = 0.2;
      const radiusScaleFactor = layout.radius / baseRadiusRef;

      baseRadiusScale.forEach(({ name, value }) => {
        const scaledValue = value * radiusScaleFactor;
        const remValue = scaledValue > 100 ? "9999px" : scaledValue.toFixed(3) + "rem";
        root.style.setProperty("--radius-" + name, remValue);
      });
      root.style.setProperty("--radius-full", "9999px");

      // Border width scales
      const baseBorderScale = [
        { name: "none", value: 0 },
        { name: "thin", value: 1 },
        { name: "base", value: 1 },
        { name: "2", value: 2 },
        { name: "4", value: 4 },
        { name: "8", value: 8 },
      ];

      const baseBorderRef = 1;
      const borderScaleFactor = layout.borderWidth / baseBorderRef;

      baseBorderScale.forEach(({ name, value }) => {
        const scaledValue = value * borderScaleFactor;
        const pxValue = scaledValue.toFixed(1) + "px";
        root.style.setProperty("--border-width-" + name, pxValue);
      });

      // Spacing scale
      root.style.setProperty("--spacing-scale", `${layout.spacingScale}`);

      // Persist to storage
      const currentPrefs = loadThemePreferences();
      const updatedPrefs: ThemePreferences = {
        colors: currentPrefs?.colors || {
          background: { h: 0, c: 0, l: 0.15 },
          foreground: { h: 0, c: 0, l: 0.98 },
          accent: { h: 210, c: 0.15, l: 0.5 },
        },
        typography: currentPrefs?.typography || {
          fontSizeScale: 1,
          fontWeightScale: 1,
          typeSizeRatio: 1.2,
        },
        layout,
        mode: currentPrefs?.mode || currentThemeMode,
      };
      saveThemePreferences(updatedPrefs);

      // Notify React state
      onLayoutChange?.(layout);
    },
    [currentThemeMode, onLayoutChange]
  );

  /**
   * Change theme mode (light/dark) and persist to storage.
   */
  const applyAndPersistMode = useCallback(
    (mode: "light" | "dark") => {
      console.debug("[useThemeStorage] Applying and persisting mode:", mode);

      // Set data attribute for CSS to use
      document.documentElement.setAttribute("data-theme", mode);

      // Persist to storage
      const currentPrefs = loadThemePreferences();
      const updatedPrefs: ThemePreferences = {
        colors: currentPrefs?.colors || {
          background: { h: 0, c: 0, l: 0.15 },
          foreground: { h: 0, c: 0, l: 0.98 },
          accent: { h: 210, c: 0.15, l: 0.5 },
        },
        typography: currentPrefs?.typography || {
          fontSizeScale: 1,
          fontWeightScale: 1,
          typeSizeRatio: 1.2,
        },
        layout: currentPrefs?.layout || {
          radius: 0.2,
          borderWidth: 1,
          spacingScale: 1,
        },
        mode,
      };
      saveThemePreferences(updatedPrefs);

      // Notify React state
      onModeChange?.(mode);
    },
    [onModeChange]
  );

  return {
    applyAndPersistColors,
    applyAndPersistTypography,
    applyAndPersistLayout,
    applyAndPersistMode,
  };
}
