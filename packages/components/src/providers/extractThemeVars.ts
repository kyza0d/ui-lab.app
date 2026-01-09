export interface OklchColor {
  l: number
  c: number
  h: number
}

export interface ThemeConfig {
  background: string | OklchColor
  foreground: string | OklchColor
  accent: string | OklchColor
  success: string | OklchColor
  danger: string | OklchColor
  warning: string | OklchColor
  info: string | OklchColor
}

export type ColorShade = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950
export type ColorPalette = Record<ColorShade, OklchColor>
export type ThemePalettes = Record<string, ColorPalette>

interface ExtractedThemeVars {
  baseColors: Partial<ThemeConfig>
  cssVariables: Record<string, string>
}

const SHADES: ColorShade[] = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]

const DARK_MODE_LIGHTNESS: Record<ColorShade, number> = {
  50: 0.98, 100: 0.95, 200: 0.9, 300: 0.84, 400: 0.65,
  500: 0.5, 600: 0.32, 700: 0.26, 800: 0.23, 900: 0.21, 950: 0.18,
}

const LIGHT_MODE_LIGHTNESS: Record<ColorShade, number> = {
  50: 0.15, 100: 0.25, 200: 0.35, 300: 0.45, 400: 0.55,
  500: 0.65, 600: 0.75, 700: 0.82, 800: 0.88, 900: 0.93, 950: 0.97,
}

const SEMANTIC_LIGHTNESS: Record<ColorShade, number> = {
  50: 0.95, 100: 0.88, 200: 0.8, 300: 0.72, 400: 0.65,
  500: 0.55, 600: 0.46, 700: 0.38, 800: 0.29, 900: 0.2, 950: 0.12,
}

const SEMANTIC_LIGHTNESS_LIGHT: Record<ColorShade, number> = {
  50: 0.12, 100: 0.2, 200: 0.29, 300: 0.38, 400: 0.46,
  500: 0.55, 600: 0.65, 700: 0.72, 800: 0.8, 900: 0.88, 950: 0.95,
}

const ACCENT_CHROMA_FACTORS: Record<ColorShade, number> = {
  50: 0.75, 100: 0.8, 200: 0.9, 300: 1, 400: 1.05,
  500: 1.1, 600: 1.05, 700: 1, 800: 0.95, 900: 0.85, 950: 0.75,
}

const STANDARD_CHROMA_FACTORS: Record<ColorShade, number> = {
  50: 0.4, 100: 0.5, 200: 0.65, 300: 0.8, 400: 0.9,
  500: 1, 600: 0.95, 700: 0.9, 800: 0.75, 900: 0.65, 950: 0.55,
}

const CHROMA_BOUNDARIES: Record<string, { min: number; max: number }> = {
  background: { min: 0.001, max: 0.18 },
  foreground: { min: 0.01, max: 0.12 },
  accent: { min: 0.01, max: 0.32 },
  success: { min: 0.01, max: 0.28 },
  danger: { min: 0.01, max: 0.28 },
  warning: { min: 0.01, max: 0.26 },
  info: { min: 0.01, max: 0.24 },
}

const clamp = (n: number, min = 0, max = 1) => Math.min(max, Math.max(min, n))
const rnd = (n: number, precision = 1000) => Math.round(n * precision) / precision

function isValidHex(value: string): boolean {
  return /^#?[0-9a-fA-F]{6}$/.test(String(value || '').trim())
}

export function hexToOklch(hex: string): OklchColor {
  try {
    const cleaned = String(hex || '').replace('#', '').trim()
    if (!cleaned || cleaned.length !== 6) {
      throw new Error(`Invalid hex color format: ${hex}`)
    }

    const n = parseInt(cleaned, 16)
    if (isNaN(n)) {
      throw new Error(`Invalid hex color value: ${hex}`)
    }

    const r = ((n >> 16) & 0xff) / 255
    const g = ((n >> 8) & 0xff) / 255
    const b = (n & 0xff) / 255

    const toLinear = (c: number) => (c /= 255) <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
    const lr = toLinear(r * 255)
    const lg = toLinear(g * 255)
    const lb = toLinear(b * 255)

    const x = 0.4124564 * lr + 0.3575761 * lg + 0.1804375 * lb
    const y = 0.2126729 * lr + 0.7151522 * lg + 0.0721750 * lb
    const z = 0.0193339 * lr + 0.1191920 * lg + 0.9503041 * lb

    const l_ = Math.cbrt(0.8189330101 * x + 0.3618667424 * y - 0.1288597137 * z)
    const m_ = Math.cbrt(0.0329845436 * x + 0.9293118715 * y + 0.0361456387 * z)
    const s_ = Math.cbrt(0.0482003018 * x + 0.2643662691 * y + 0.6338517070 * z)

    const l = 0.2104542553 * l_ + 0.7936177850 * m_ - 0.0040720468 * s_
    const a = 1.9779984951 * l_ - 2.4285922050 * m_ + 0.4505937099 * s_
    const b_ = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.8086757660 * s_

    const c = Math.sqrt(a * a + b_ * b_)
    const h = (Math.atan2(b_, a) * (180 / Math.PI) + 360) % 360

    return { l: rnd(l), c: rnd(c), h: rnd(h, 10) }
  } catch (e) {
    throw new Error(`Failed to convert hex to OKLCH: ${hex}. ${e instanceof Error ? e.message : String(e)}`)
  }
}

function oklchToCss(color: OklchColor): string {
  return `oklch(${(color.l * 100).toFixed(1)}% ${color.c.toFixed(3)} ${color.h.toFixed(1)})`
}

function clampChroma(chroma: number, role: string): number {
  const bounds = CHROMA_BOUNDARIES[role] || CHROMA_BOUNDARIES.accent
  return Math.max(bounds.min, Math.min(bounds.max, chroma))
}

function generateColorPalette(base: OklchColor, role: string, isAccent = false, mode: 'light' | 'dark' = 'dark'): ColorPalette {
  let lightnessScale: Record<ColorShade, number>

  if (role === 'background') {
    lightnessScale = mode === 'dark' ? DARK_MODE_LIGHTNESS : LIGHT_MODE_LIGHTNESS
  } else {
    lightnessScale = mode === 'dark' ? SEMANTIC_LIGHTNESS : SEMANTIC_LIGHTNESS_LIGHT
  }

  const chromaFactors = isAccent ? ACCENT_CHROMA_FACTORS : STANDARD_CHROMA_FACTORS

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

export function generateThemePalettes(config: ThemeConfig, mode: 'light' | 'dark' = 'dark'): ThemePalettes {
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
    background: generateColorPalette(bgOklch, 'background', false, mode),
    foreground: generateColorPalette(fgOklch, 'foreground', false, mode),
    accent: generateColorPalette(acOklch, 'accent', true, mode),
    success: generateColorPalette(sucOklch, 'success', true, mode),
    danger: generateColorPalette(danOklch, 'danger', true, mode),
    warning: generateColorPalette(warOklch, 'warning', true, mode),
    info: generateColorPalette(infOklch, 'info', true, mode),
  }
}

export function palettesToCssVariables(palettes: ThemePalettes): Record<string, string> {
  const vars: Record<string, string> = {}

  Object.entries(palettes).forEach(([role, palette]) => {
    SHADES.forEach((shade) => {
      const key = `--${role}-${shade}`
      vars[key] = oklchToCss(palette[shade])
    })
  })

  return vars
}

function parseOklchFromCss(value: string): OklchColor | null {
  const match = value.match(/oklch\(\s*([\d.]+)%\s+([\d.]+)\s+([\d.]+)\s*\)/)
  if (!match) return null
  return {
    l: parseFloat(match[1]) / 100,
    c: parseFloat(match[2]),
    h: parseFloat(match[3]),
  }
}

function extractPaletteFromCss(mode: 'light' | 'dark'): Record<string, string> {
  if (typeof document === 'undefined') return {}

  const root = document.documentElement
  const computed = getComputedStyle(root)
  const cssVariables: Record<string, string> = {}

  const colorRoles = ['background', 'foreground', 'accent', 'success', 'danger', 'warning', 'info'] as const
  const SHADES: ColorShade[] = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]

  for (const role of colorRoles) {
    for (const shade of SHADES) {
      const varName = `--${role}-${shade}`
      const value = computed.getPropertyValue(varName).trim()

      if (value) {
        cssVariables[varName] = value
      }
    }
  }

  return cssVariables
}

export function extractThemeVariables(mode: 'light' | 'dark' = 'dark'): ExtractedThemeVars {
  if (typeof document === 'undefined') {
    return { baseColors: {}, cssVariables: {} }
  }

  try {
    const existingPalette = extractPaletteFromCss(mode)
    if (Object.keys(existingPalette).length > 0) {
      console.debug('[ThemeProvider] Using existing CSS palette variables')
      return { baseColors: {}, cssVariables: existingPalette }
    }
  } catch (e) {
    console.warn('[ThemeProvider] Failed to extract palette from CSS:', e)
  }

  return { baseColors: {}, cssVariables: {} }
}

export function applyThemeCSSVariables(cssVariables: Record<string, string>): void {
  if (typeof document === 'undefined') return

  const root = document.documentElement
  Object.entries(cssVariables).forEach(([key, value]) => {
    root.style.setProperty(key, value)
  })
}
