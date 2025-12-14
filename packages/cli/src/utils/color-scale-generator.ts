import type { OklchColor, ColorShade, ColorPalette, ThemeConfig, ThemePalettes, CSSVariables } from '../types/theme.js'

/**
 * OKLCH Color Scale Generator
 *
 * This module generates visually balanced, perceptually uniform color scales
 * using the OKLCH color space. OKLCH was chosen because:
 * - It's perceptually uniform (equal steps feel evenly spaced to humans)
 * - Hue is independent (rotating hue in OKLCH produces colors of same brightness)
 * - Lightness is intuitive (0-100% feels natural to designers)
 * - It's widely supported by modern browsers via CSS oklch() function
 *
 * Algorithm:
 * 1. Parse input hex color to OKLCH
 * 2. Define lightness and chroma scales for each shade (50-950)
 * 3. Generate palette by adjusting base color's lightness and chroma per shade
 * 4. Apply perceptual constraints (chroma bounds per color role)
 * 5. Convert back to hex or CSS oklch() format for use in CSS
 */

// All valid shade steps in a color scale
const SHADES: ColorShade[] = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]

// Utility functions
const clamp = (n: number, min = 0, max = 1) => Math.min(max, Math.max(min, n))
const rnd = (n: number, precision = 1000) => Math.round(n * precision) / precision

/**
 * Chroma (saturation) boundaries for each color role
 * Higher chroma = more saturated/vibrant
 * Tighter bounds prevent colors from becoming too desaturated or oversaturated
 */
const CHROMA_BOUNDARIES: Record<string, { min: number; max: number }> = {
  background: { min: 0.001, max: 0.18 },  // Very low chroma for neutral backgrounds
  foreground: { min: 0.01, max: 0.12 },   // Low chroma for readable text
  accent: { min: 0.01, max: 0.32 },       // Higher chroma for vibrant accents
  success: { min: 0.01, max: 0.28 },      // Semantic colors
  danger: { min: 0.01, max: 0.28 },
  warning: { min: 0.01, max: 0.26 },
  info: { min: 0.01, max: 0.24 },
}

/**
 * Lightness scale for dark mode backgrounds
 * Shade 50 = very light (almost white)
 * Shade 500 = base (medium gray)
 * Shade 950 = very dark (almost black)
 */
const DARK_MODE_LIGHTNESS: Record<ColorShade, number> = {
  50: 0.98,
  100: 0.95,
  200: 0.9,
  300: 0.84,
  400: 0.65,
  500: 0.5,
  600: 0.32,
  700: 0.26,
  800: 0.23,
  900: 0.21,
  950: 0.18,
}

/**
 * Lightness scale for light mode backgrounds
 * Inverted from dark mode - shade 50 is nearly black, 950 is nearly white
 */
const LIGHT_MODE_LIGHTNESS: Record<ColorShade, number> = {
  50: 0.16,
  100: 0.29,
  200: 0.31,
  300: 0.42,
  400: 0.55,
  500: 0.6,
  600: 0.88,
  700: 0.9,
  800: 0.94,
  900: 0.96,
  950: 0.98,
}

/**
 * Semantic color lightness scale (balanced for semantic meaning)
 * Used for success, danger, warning, info colors
 */
const SEMANTIC_LIGHTNESS: Record<ColorShade, number> = {
  50: 0.95,
  100: 0.88,
  200: 0.8,
  300: 0.72,
  400: 0.65,
  500: 0.55,
  600: 0.46,
  700: 0.38,
  800: 0.29,
  900: 0.2,
  950: 0.12,
}

/**
 * Chroma factors for accent/semantic colors
 * Controls how saturated each shade is relative to base
 */
const ACCENT_CHROMA_FACTORS: Record<ColorShade, number> = {
  50: 0.75,
  100: 0.8,
  200: 0.9,
  300: 1,
  400: 1.05,
  500: 1.1,
  600: 1.05,
  700: 1,
  800: 0.95,
  900: 0.85,
  950: 0.75,
}

/**
 * Chroma factors for standard colors (background/foreground)
 * More conservative desaturation
 */
const STANDARD_CHROMA_FACTORS: Record<ColorShade, number> = {
  50: 0.4,
  100: 0.5,
  200: 0.65,
  300: 0.8,
  400: 0.9,
  500: 1,
  600: 0.95,
  700: 0.9,
  800: 0.75,
  900: 0.65,
  950: 0.55,
}

/**
 * Convert hex color to OKLCH
 * Based on CSS Color Module Level 4 spec
 */
export function hexToOklch(hex: string): OklchColor {
  // Parse hex to RGB
  const n = parseInt(hex.replace('#', ''), 16)
  const r = ((n >> 16) & 0xff) / 255
  const g = ((n >> 8) & 0xff) / 255
  const b = (n & 0xff) / 255

  // Linear RGB
  const toLinear = (c: number) => (c /= 255) <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  const lr = toLinear(r * 255)
  const lg = toLinear(g * 255)
  const lb = toLinear(b * 255)

  // Linear RGB to XYZ
  const x = 0.4124564 * lr + 0.3575761 * lg + 0.1804375 * lb
  const y = 0.2126729 * lr + 0.7151522 * lg + 0.0721750 * lb
  const z = 0.0193339 * lr + 0.1191920 * lg + 0.9503041 * lb

  // XYZ to LMS
  const l_ = Math.cbrt(0.8189330101 * x + 0.3618667424 * y - 0.1288597137 * z)
  const m_ = Math.cbrt(0.0329845436 * x + 0.9293118715 * y + 0.0361456387 * z)
  const s_ = Math.cbrt(0.0482003018 * x + 0.2643662691 * y + 0.6338517070 * z)

  // LMS to OKLab
  const l = 0.2104542553 * l_ + 0.7936177850 * m_ - 0.0040720468 * s_
  const a = 1.9779984951 * l_ - 2.4285922050 * m_ + 0.4505937099 * s_
  const b_ = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.8086757660 * s_

  // OKLab to OKLCH
  const c = Math.sqrt(a * a + b_ * b_)
  const h = (Math.atan2(b_, a) * (180 / Math.PI) + 360) % 360

  return { l: rnd(l), c: rnd(c), h: rnd(h, 10) }
}

/**
 * Convert OKLCH to hex color
 */
export function oklchToHex(color: OklchColor): string {
  const { l, c, h } = color
  const hr = h * Math.PI / 180
  const a = c * Math.cos(hr)
  const b_ = c * Math.sin(hr)

  // OKLCH to OKLab
  const l_ = l + 0.3963377774 * a + 0.2158037573 * b_
  const m_ = l - 0.1055613458 * a - 0.0638541728 * b_
  const s_ = l - 0.0894841775 * a - 1.2914855480 * b_

  // OKLab to LMS
  const l3 = l_ ** 3
  const m3 = m_ ** 3
  const s3 = s_ ** 3

  // LMS to XYZ
  const x = 1.2270138511 * l3 - 0.5577999807 * m3 + 0.2812561490 * s3
  const y = -0.0405801784 * l3 + 1.1122568696 * m3 - 0.0716766787 * s3
  const z = -0.0763812845 * l3 - 0.4214819784 * m3 + 1.5861632204 * s3

  // XYZ to linear RGB
  const r = 3.2404542 * x - 1.5371385 * y - 0.4985314 * z
  const g = -0.9692660 * x + 1.8760108 * y + 0.0415560 * z
  const b = 0.0556434 * x - 0.2040259 * y + 1.0572252 * z

  // Linear RGB to sRGB
  const toGamma = (v: number) => {
    v = clamp(v)
    return Math.round(255 * (v <= 0.0031308 ? v * 12.92 : 1.055 * Math.pow(v, 1 / 2.4) - 0.055))
  }

  const rr = toGamma(r)
  const gg = toGamma(g)
  const bb = toGamma(b)

  return `#${rr.toString(16).padStart(2, '0')}${gg.toString(16).padStart(2, '0')}${bb.toString(16).padStart(2, '0')}`.toUpperCase()
}

/**
 * Convert OKLCH to CSS oklch() function string
 * Preferred for modern browsers as it avoids rounding errors from hex conversion
 */
export function oklchToCss(color: OklchColor): string {
  return `oklch(${(color.l * 100).toFixed(1)}% ${color.c.toFixed(3)} ${color.h.toFixed(1)})`
}

/**
 * Clamp chroma to valid range for a color role
 */
function clampChroma(chroma: number, role: string): number {
  const bounds = CHROMA_BOUNDARIES[role] || CHROMA_BOUNDARIES.accent
  return Math.max(bounds.min, Math.min(bounds.max, chroma))
}

/**
 * Generate a color palette from a base color
 * @param base - Base color in OKLCH space
 * @param role - Color role (accent, background, etc) for applying proper constraints
 * @param isAccent - Whether this is an accent/semantic color (uses different chroma scaling)
 * @returns Complete palette with 10 shades
 */
export function generateColorPalette(base: OklchColor, role: string, isAccent = false): ColorPalette {
  // Choose appropriate lightness scale and chroma factors
  const lightnessScale = role === 'background' ? DARK_MODE_LIGHTNESS :
                        (isAccent ? SEMANTIC_LIGHTNESS : SEMANTIC_LIGHTNESS)
  const chromaFactors = isAccent ? ACCENT_CHROMA_FACTORS : STANDARD_CHROMA_FACTORS

  // Ensure base color respects chroma boundaries
  const constrainedBase = { ...base, c: clampChroma(base.c, role) }

  const palette: ColorPalette = {} as ColorPalette

  SHADES.forEach((shade) => {
    const targetLightness = lightnessScale[shade]
    const chromaFactor = chromaFactors[shade]

    palette[shade] = {
      l: rnd(clamp(targetLightness, 0.01, 0.99)),
      c: rnd(clampChroma(constrainedBase.c * chromaFactor, role)),
      h: rnd(constrainedBase.h, 10),
    }
  })

  return palette
}

/**
 * Generate complete theme palettes from base colors
 * @param config - Theme configuration with base colors for each role
 * @returns All color palettes (background, foreground, accent, semantic)
 */
export function generateThemePalettes(config: ThemeConfig): ThemePalettes {
  // Convert all config colors to OKLCH if needed
  const getOklch = (color: string | OklchColor): OklchColor =>
    typeof color === 'string' ? hexToOklch(color) : color

  const bgOklch = getOklch(config.background)
  const fgOklch = getOklch(config.foreground)
  const acOklch = getOklch(config.accent)
  const sucOklch = getOklch(config.success)
  const danOklch = getOklch(config.danger)
  const warOklch = getOklch(config.warning)
  const infOklch = getOklch(config.info)

  return {
    background: generateColorPalette(bgOklch, 'background', false),
    foreground: generateColorPalette(fgOklch, 'foreground', false),
    accent: generateColorPalette(acOklch, 'accent', true),
    success: generateColorPalette(sucOklch, 'success', true),
    danger: generateColorPalette(danOklch, 'danger', true),
    warning: generateColorPalette(warOklch, 'warning', true),
    info: generateColorPalette(infOklch, 'info', true),
  }
}

/**
 * Convert theme palettes to CSS custom properties
 * Generates variables like: --background-500: oklch(...)
 */
export function palettesToCssVariables(palettes: ThemePalettes): CSSVariables {
  const vars: CSSVariables = {}

  const addPaletteVariables = (role: keyof ThemePalettes) => {
    const palette = palettes[role]
    SHADES.forEach((shade) => {
      const key = `--${role}-${shade}`
      vars[key] = oklchToCss(palette[shade])
    })
  }

  addPaletteVariables('background')
  addPaletteVariables('foreground')
  addPaletteVariables('accent')
  addPaletteVariables('success')
  addPaletteVariables('danger')
  addPaletteVariables('warning')
  addPaletteVariables('info')

  return vars
}

/**
 * Apply CSS variables to the document root
 * This makes all color variables available globally via var(--color-name-shade)
 */
export function applyThemeToDom(palettes: ThemePalettes): void {
  if (typeof document === 'undefined') return // SSR safety

  const vars = palettesToCssVariables(palettes)
  const root = document.documentElement

  Object.entries(vars).forEach(([key, value]) => {
    root.style.setProperty(key, value)
  })
}
