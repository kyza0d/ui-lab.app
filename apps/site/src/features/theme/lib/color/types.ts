export interface OklchColor { l: number; c: number; h: number }
export type ShadeScale = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950;
export type ColorPalette = Partial<Record<ShadeScale, OklchColor>>;
export type ThemeMode = 'light' | 'dark';
export type EasingFunction = (t: number) => number;
export type ChromaScalingFunction = (t: number) => number;
export type ColorRole = 'background' | 'foreground' | 'accent' | 'success' | 'danger' | 'warning' | 'info';

export interface ScaleRange { min: ShadeScale; max: ShadeScale }
export interface ChromaBounds { min: number; max: number }
export interface GlobalColorAdjustments {
  lightnessShift: number;
  chromaBoost: number;
}

export type SemanticColorType = 'success' | 'danger' | 'warning' | 'info';
export interface HueRange { min: number; max: number; label: string }
export interface SemanticColorConfig { light: { color: OklchColor; chromaLimit?: number }; dark: { color: OklchColor; chromaLimit?: number }; hueRange?: HueRange }
export type SemanticColors = Record<SemanticColorType, SemanticColorConfig>;
export type SemanticPalettes = Record<SemanticColorType, ColorPalette>;

export interface ThemePaletteOptions {
  mode?: ThemeMode;
  shift?: number;
  semantic?: SemanticColors;
  accLimit?: number;
  accEase?: EasingFunction;
  accScale?: ChromaScalingFunction;
  global?: GlobalColorAdjustments;
}
