import { type OklchColor, type ShadeScale, type SemanticColors, type EasingFunction, type ChromaScalingFunction, type GlobalColorAdjustments, PaletteEasing, ChromaScaling, DEFAULT_GLOBAL_ADJUSTMENTS } from '@/lib/color-utils';

export const DEFAULT_THEME_NAME = "Vitesse";
export const DEFAULT_THEME_VARIANT = "light";

export interface SimpleThemeColors {
  background: OklchColor;
  foreground: OklchColor;
  accent: OklchColor;
  backgroundShade?: ShadeScale;
  foregroundShade?: ShadeScale;
  accentShade?: ShadeScale;
  accentChromaLimit?: number;
  accentEasing?: EasingFunction;
  accentChromaScaling?: ChromaScalingFunction;
  semantic?: SemanticColors;
  globalAdjustments?: GlobalColorAdjustments;
}

export { DEFAULT_GLOBAL_ADJUSTMENTS };

export type ThemeColors = SimpleThemeColors

export function isSimpleTheme(colors: ThemeColors): colors is SimpleThemeColors {
  return 'background' in colors;
}

export interface ThemeVariants {
  light: ThemeColors;
  dark: ThemeColors;
}

export const PRESET_THEMES = new Set(["Vitesse"]);

export const themes: Record<string, ThemeVariants> = {
  "Vitesse": {
    light: {
      background: { l: 1, c: 0, h: 0 },
      backgroundShade: 950,
      foreground: { l: 0.6, c: 0, h: 0 },
      foregroundShade: 300,
      accent: { l: 0.55, c: 0.15, h: 250 },
      accentShade: 500,
      accentChromaLimit: 0.35,
      accentEasing: PaletteEasing.aggressiveAccent,
      accentChromaScaling: ChromaScaling.desaturateModerate,
      semantic: {
        success: {
          light: { color: { l: 0.90, c: 0.20, h: 142 }, chromaLimit: 0.25 },
          dark: { color: { l: 0.90, c: 0.20, h: 142 }, chromaLimit: 0.25 },
          hueRange: { min: 120, max: 160, label: "Green" },
        },
        danger: {
          light: { color: { l: 0.90, c: 0.30, h: 25 }, chromaLimit: 0.25 },
          dark: { color: { l: 0.90, c: 0.30, h: 25 }, chromaLimit: 0.25 },
          hueRange: { min: 0, max: 40, label: "Red" },
        },
        warning: {
          light: { color: { l: 0.90, c: 0.20, h: 65 }, chromaLimit: 0.25 },
          dark: { color: { l: 0.90, c: 0.20, h: 65 }, chromaLimit: 0.25 },
          hueRange: { min: 50, max: 80, label: "Yellow" },
        },
        info: {
          light: { color: { l: 0.90, c: 0.20, h: 255 }, chromaLimit: 0.25 },
          dark: { color: { l: 0.90, c: 0.20, h: 255 }, chromaLimit: 0.25 },
          hueRange: { min: 220, max: 280, label: "Blue" },
        },
      },
    },

    dark: {
      background: { l: 0.071, c: 0, h: 0 },
      backgroundShade: 900,
      foreground: { l: 0.4, c: 0, h: 0 },
      foregroundShade: 100,
      accent: { l: 0.55, c: 0.15, h: 250 },
      accentShade: 500,
      accentChromaLimit: 0.35,
      accentEasing: PaletteEasing.aggressiveAccent,
      accentChromaScaling: ChromaScaling.desaturateModerate,
      semantic: {
        success: {
          light: { color: { l: 0.90, c: 0.20, h: 142 }, chromaLimit: 0.25 },
          dark: { color: { l: 0.90, c: 0.20, h: 142 }, chromaLimit: 0.25 },
          hueRange: { min: 120, max: 160, label: "Green" },
        },
        danger: {
          light: { color: { l: 0.90, c: 0.30, h: 25 }, chromaLimit: 0.25 },
          dark: { color: { l: 0.90, c: 0.30, h: 25 }, chromaLimit: 0.25 },
          hueRange: { min: 0, max: 40, label: "Red" },
        },
        warning: {
          light: { color: { l: 0.90, c: 0.20, h: 65 }, chromaLimit: 0.25 },
          dark: { color: { l: 0.90, c: 0.30, h: 65 }, chromaLimit: 0.25 },
          hueRange: { min: 50, max: 80, label: "Yellow" },
        },
        info: {
          light: { color: { l: 0.90, c: 0.20, h: 255 }, chromaLimit: 0.25 },
          dark: { color: { l: 0.90, c: 0.20, h: 255 }, chromaLimit: 0.25 },
          hueRange: { min: 220, max: 280, label: "Blue" },
        },
      },
    },
  },
};

export function isPresetTheme(themeName: string): boolean {
  return PRESET_THEMES.has(themeName);
}

export function isCustomTheme(themeName: string): boolean {
  return !isPresetTheme(themeName);
}
