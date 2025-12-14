/**
 * Color space representation using OKLCH (more perceptually uniform than HSL)
 * This is the most reliable way to generate visually balanced color scales
 */
export interface OklchColor {
  /** Lightness: 0 (black) to 1 (white) */
  l: number
  /** Chroma: saturation/colorfulness (0 to ~0.4) */
  c: number
  /** Hue: 0-360 degrees */
  h: number
}

/** Valid shade values for color scales */
export type ColorShade = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950

/** Complete color palette with all shades */
export type ColorPalette = Record<ColorShade, OklchColor>

/** Semantic color roles */
export type SemanticColorRole = 'success' | 'danger' | 'warning' | 'info'
export type ColorRole = 'background' | 'foreground' | 'accent' | SemanticColorRole

/**
 * Configuration for generating a complete theme from base colors
 * All colors should be hex strings or OklchColor objects
 */
export interface ThemeConfig {
  /** Base color for background scales */
  background: string | OklchColor
  /** Base color for foreground/text scales */
  foreground: string | OklchColor
  /** Base color for accent/primary scales */
  accent: string | OklchColor
  /** Base color for success state (semantic) */
  success: string | OklchColor
  /** Base color for danger/error state (semantic) */
  danger: string | OklchColor
  /** Base color for warning state (semantic) */
  warning: string | OklchColor
  /** Base color for info state (semantic) */
  info: string | OklchColor
}

/**
 * A complete set of color palettes (all roles with all shades)
 */
export interface ThemePalettes {
  background: ColorPalette
  foreground: ColorPalette
  accent: ColorPalette
  success: ColorPalette
  danger: ColorPalette
  warning: ColorPalette
  info: ColorPalette
}

/**
 * CSS variable mappings for a theme (--colorName-shade: value)
 */
export type CSSVariables = Record<string, string>

/**
 * Return type of the useTheme hook
 */
export interface UseThemeReturn {
  /** Get the current theme configuration */
  getTheme: () => ThemeConfig
  /** Switch to a new theme and persist to localStorage */
  setTheme: (config: ThemeConfig) => void
  /** Get all CSS variables for the current theme */
  getCSSVariables: () => CSSVariables
}
