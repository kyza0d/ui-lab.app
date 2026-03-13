export interface OklchColor {
  l: number
  c: number
  h: number
}

export interface ThemeConfig {
  background: string | OklchColor
  foreground: string | OklchColor
  accent: string | OklchColor
  success?: string | OklchColor
  danger?: string | OklchColor
  warning?: string | OklchColor
  info?: string | OklchColor
}

export type ColorShade = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950
export type ColorPalette = Partial<Record<ColorShade, OklchColor>>
export type ThemePalettes = Record<string, ColorPalette>
export type ThemeCssVariableBatch = Record<string, string>
export type ThemeMode = 'light' | 'dark'

export type ColorRole = 'background' | 'foreground' | 'accent' | 'success' | 'danger' | 'warning' | 'info'
type SemanticColorRole = Extract<ColorRole, 'success' | 'danger' | 'warning' | 'info'>

interface ExtractedThemeVars {
  baseColors: Partial<Record<ColorRole, OklchColor>>
  cssVariables: Record<string, string>
  sourceMode: ThemeMode
}

interface GeneratedThemeBatchesFromCssSource {
  sourceMode: ThemeMode
  cssVariables: Record<string, string>
  generatedThemes: Partial<Record<ThemeMode, ThemeCssVariableBatch>>
}

interface ThemeGenerationHints {
  accentChromaLimit?: number
  globalAdjustments?: GlobalColorAdjustments
  semanticChromaLimits?: Partial<Record<SemanticColorRole, Partial<Record<ThemeMode, number>>>>
}

export interface GlobalColorAdjustments {
  lightnessShift: number
  chromaBoost: number
}

export interface ThemePaletteOptions {
  mode?: ThemeMode
  shift?: number
  accLimit?: number
  accEase?: (t: number) => number
  accScale?: (t: number) => number
  global?: GlobalColorAdjustments
  semanticLimits?: Partial<Record<SemanticColorRole, number>>
}

const DEFAULT_GLOBAL_ADJUSTMENTS: GlobalColorAdjustments = {
  lightnessShift: 0,
  chromaBoost: 1,
}

const SHADES: ColorShade[] = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]

const ROLE_SHADE_PREFERENCES: Record<ColorRole, ColorShade[]> = {
  background: [500, 600, 700, 800, 900, 950, 400, 300, 200, 100, 50],
  foreground: [500, 400, 300, 200, 100, 50, 600, 700, 800, 900, 950],
  accent: [500, 400, 600, 300, 700, 200, 800, 100, 900, 50, 950],
  success: [500, 400, 600, 300, 700, 200, 800, 100, 900, 50, 950],
  danger: [500, 400, 600, 300, 700, 200, 800, 100, 900, 50, 950],
  warning: [500, 400, 600, 300, 700, 200, 800, 100, 900, 50, 950],
  info: [500, 400, 600, 300, 700, 200, 800, 100, 900, 50, 950],
}

const SCALE_RANGES: Record<ColorRole, { min: ColorShade; max: ColorShade }> = {
  foreground: { min: 50, max: 400 },
  background: { min: 500, max: 950 },
  accent: { min: 50, max: 600 },
  success: { min: 50, max: 600 },
  danger: { min: 50, max: 600 },
  warning: { min: 50, max: 600 },
  info: { min: 50, max: 600 },
}

const SCALES: Record<string, Partial<Record<ColorShade, number>>> = {
  dark: { 50: 0.98, 100: 0.95, 200: 0.9, 300: 0.84, 400: 0.65, 500: 0.5, 600: 0.32, 700: 0.26, 800: 0.23, 900: 0.21, 950: 0.18 },
  light: { 50: 0.16, 100: 0.29, 200: 0.31, 300: 0.42, 400: 0.55, 500: 0.6, 600: 0.88, 700: 0.9, 800: 0.94, 900: 0.96, 950: 0.98 },
  sem: { 50: 0.95, 100: 0.88, 200: 0.8, 300: 0.72, 400: 0.65, 500: 0.55, 600: 0.46, 700: 0.38, 800: 0.29, 900: 0.2, 950: 0.12 },
  accNeutralLight: { 50: 0.99, 100: 0.97, 200: 0.91, 300: 0.72, 400: 0.58, 500: 0.32, 600: 0.28 },
  accNeutralDark: { 50: 0.12, 100: 0.2, 200: 0.32, 300: 0.44, 400: 0.58, 500: 0.72, 600: 0.91 },
  accSaturatedLight: { 50: 0.98, 100: 0.91, 200: 0.82, 300: 0.76, 400: 0.7, 500: 0.64, 600: 0.68 },
  accSaturatedDark: { 50: 0.98, 100: 0.91, 200: 0.82, 300: 0.75, 400: 0.71, 500: 0.65, 600: 0.6 },
}

const SHADE_NORM: Record<ColorShade, number> = {
  50: 0,
  100: 0.1,
  200: 0.2,
  300: 0.3,
  400: 0.4,
  500: 0.5,
  600: 0.6,
  700: 0.7,
  800: 0.8,
  900: 0.9,
  950: 1,
}

const CHROMA_FACTORS = {
  acc: { 50: 0.18, 100: 0.33, 200: 0.45, 300: 0.54, 400: 0.66, 500: 0.72, 600: 0.69, 700: 0.66, 800: 0.63, 900: 0.6, 950: 0.57 },
  std: { 50: 0.4, 100: 0.5, 200: 0.65, 300: 0.8, 400: 0.9, 500: 1, 600: 0.95, 700: 0.9, 800: 0.75, 900: 0.65, 950: 0.55 },
} as const

const CHROMA_BOUNDARIES: Record<ColorRole, { min: number; max: number }> = {
  background: { min: 0.008, max: 0.18 },
  foreground: { min: 0.025, max: 0.14 },
  accent: { min: 0.01, max: 0.32 },
  success: { min: 0.01, max: 0.28 },
  danger: { min: 0.01, max: 0.28 },
  warning: { min: 0.01, max: 0.26 },
  info: { min: 0.01, max: 0.24 },
}

const clamp = (n: number, min = 0, max = 1) => Math.min(max, Math.max(min, n))
const rnd = (n: number, precision = 1000) => Math.round(n * precision) / precision

export function applyEasingToScale(
  scale: Partial<Record<ColorShade, number>>,
  shades: ColorShade[],
  ease?: (t: number) => number,
): Partial<Record<ColorShade, number>> {
  if (!ease) return scale

  const values = shades.map((shade) => scale[shade]).filter((value): value is number => value !== undefined)
  if (values.length === 0) return scale

  const min = Math.min(...values)
  const max = Math.max(...values)

  return shades.reduce((next, shade) => {
    const norm = (shade - shades[0]) / (shades[shades.length - 1] - shades[0])
    next[shade] = clamp(min + ease(norm) * (max - min), 0.01, 0.99)
    return next
  }, {} as Partial<Record<ColorShade, number>>)
}

export function hexToOklch(hex: string): OklchColor {
  const cleaned = String(hex || '').replace('#', '').trim()
  if (!cleaned || (cleaned.length !== 3 && cleaned.length !== 6)) {
    throw new Error(`Invalid hex color format: ${hex}`)
  }

  let r: number
  let g: number
  let b: number

  if (cleaned.length === 6) {
    const numeric = parseInt(cleaned, 16)
    r = ((numeric >> 16) & 0xff) / 255
    g = ((numeric >> 8) & 0xff) / 255
    b = (numeric & 0xff) / 255
  } else {
    r = parseInt(cleaned[0] + cleaned[0], 16) / 255
    g = parseInt(cleaned[1] + cleaned[1], 16) / 255
    b = parseInt(cleaned[2] + cleaned[2], 16) / 255
  }

  const toLinear = (value: number) => (value <= 0.04045 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4))
  const lr = toLinear(r)
  const lg = toLinear(g)
  const lb = toLinear(b)

  const x = 0.4124564 * lr + 0.3575761 * lg + 0.1804375 * lb
  const y = 0.2126729 * lr + 0.7151522 * lg + 0.072175 * lb
  const z = 0.0193339 * lr + 0.119192 * lg + 0.9503041 * lb

  const l_ = Math.cbrt(0.8189330101 * x + 0.3618667424 * y - 0.1288597137 * z)
  const m_ = Math.cbrt(0.0329845436 * x + 0.9293118715 * y + 0.0361456387 * z)
  const s_ = Math.cbrt(0.0482003018 * x + 0.2643662691 * y + 0.633851707 * z)

  const l = 0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_
  const a = 1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_
  const b_ = 0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_

  return {
    l: rnd(l),
    c: rnd(Math.sqrt(a * a + b_ * b_)),
    h: rnd((Math.atan2(b_, a) * (180 / Math.PI) + 360) % 360, 10),
  }
}

function oklchToCss(color: OklchColor): string {
  return `oklch(${(color.l * 100).toFixed(1)}% ${color.c.toFixed(3)} ${color.h.toFixed(1)})`
}

function parseOklchFromCss(value: string): OklchColor | null {
  const input = String(value || '').trim()
  if (!input) return null

  let match = input.match(/oklch\(\s*([\d.]+%?)\s+([\d.]+)\s+(-?[\d.]+)\s*\)/i)
  if (match) {
    const lightness = match[1].includes('%') ? parseFloat(match[1]) / 100 : parseFloat(match[1])
    return { l: lightness, c: parseFloat(match[2]), h: (parseFloat(match[3]) + 360) % 360 }
  }

  match = input.match(/oklab\(\s*([\d.]+%?)\s+([-\d.]+)\s+([-\d.]+)\s*\)/i)
  if (match) {
    const lightness = match[1].includes('%') ? parseFloat(match[1]) / 100 : parseFloat(match[1])
    const a = parseFloat(match[2])
    const b = parseFloat(match[3])
    return { l: lightness, c: Math.sqrt(a * a + b * b), h: (Math.atan2(b, a) * (180 / Math.PI) + 360) % 360 }
  }

  match = input.match(/lab\(\s*([\d.]+%?)\s+([-\d.]+)\s+([-\d.]+)\s*\)/i)
  if (match) {
    const lightness = match[1].includes('%') ? parseFloat(match[1]) / 100 : parseFloat(match[1]) / 100
    const a = parseFloat(match[2])
    const b = parseFloat(match[3])
    return { l: lightness, c: Math.sqrt(a * a + b * b) / 100, h: (Math.atan2(b, a) * (180 / Math.PI) + 360) % 360 }
  }

  return null
}

function clampChroma(chroma: number, role: ColorRole): number {
  if (chroma === 0) return 0
  const bounds = CHROMA_BOUNDARIES[role]
  return Math.max(bounds.min, Math.min(bounds.max, chroma))
}

function getShadesForRole(role: ColorRole): ColorShade[] {
  const range = SCALE_RANGES[role]
  return SHADES.filter((shade) => shade >= range.min && shade <= range.max)
}

export function applyGlobalAdjustments(
  color: OklchColor,
  role: ColorRole,
  global: GlobalColorAdjustments,
): OklchColor {
  return {
    l: clamp(color.l + global.lightnessShift),
    c: clampChroma(color.c * global.chromaBoost, role),
    h: color.h,
  }
}

function generateColorPalette(
  base: OklchColor,
  role: ColorRole,
  mode: ThemeMode,
  shift: number,
  limit: number,
  ease?: (t: number) => number,
  chromaScale?: (t: number) => number,
): ColorPalette {
  const shades = getShadesForRole(role)
  const isAccent = role === 'accent'
  const isSemantic = role === 'success' || role === 'danger' || role === 'warning' || role === 'info'
  const isNeutral = base.c <= 0.005

  let lightnessScale: Partial<Record<ColorShade, number>>

  if (isSemantic) {
    const offset = base.l - (SCALES.sem[500] ?? 0.5)
    lightnessScale = shades.reduce((next, shade) => {
      next[shade] = clamp((SCALES.sem[shade] ?? 0.5) + offset, 0.01, 0.99)
      return next
    }, {} as Partial<Record<ColorShade, number>>)
  } else if (isAccent) {
    lightnessScale = isNeutral
      ? mode === 'light'
        ? SCALES.accNeutralLight
        : SCALES.accNeutralDark
      : mode === 'light'
        ? SCALES.accSaturatedLight
        : SCALES.accSaturatedDark
  } else {
    lightnessScale = mode === 'light' ? SCALES.light : SCALES.dark
  }

  if (ease) {
    lightnessScale = applyEasingToScale(lightnessScale, shades, ease)
  }

  const normalizedBase = { ...base, l: clamp(lightnessScale[500] ?? base.l, 0.01, 0.99) }
  const chromaConstraint = Math.min(1, limit / Math.max(normalizedBase.c, 0.01))

  return shades.reduce((palette, shade) => {
    const factors = isAccent ? CHROMA_FACTORS.acc : CHROMA_FACTORS.std
    let chromaFactor = (factors[shade] ?? 1) * chromaConstraint
    if (chromaScale) {
      chromaFactor *= chromaScale(SHADE_NORM[shade])
    }

    palette[shade] = {
      l: rnd(clamp((lightnessScale[shade] ?? 0.5) + shift, 0.01, 0.99)),
      c: rnd(normalizedBase.c * chromaFactor),
      h: normalizedBase.h,
    }
    return palette
  }, {} as ColorPalette)
}

function getOklchColor(color: string | OklchColor): OklchColor {
  return typeof color === 'string' ? hexToOklch(color) : color
}

export function generateThemePalettes(config: ThemeConfig, options: ThemePaletteOptions = {}): ThemePalettes {
  const mode = options.mode ?? 'dark'
  const shift = options.shift ?? 0
  const global = options.global ?? DEFAULT_GLOBAL_ADJUSTMENTS
  const lightnessShift = global.lightnessShift + shift
  const backgroundShift = lightnessShift * 2.5

  const background = applyGlobalAdjustments(getOklchColor(config.background), 'background', global)
  const foreground = applyGlobalAdjustments(getOklchColor(config.foreground), 'foreground', global)
  const accent = applyGlobalAdjustments(getOklchColor(config.accent), 'accent', global)

  const palettes: ThemePalettes = {
    background: generateColorPalette(
      background,
      'background',
      mode,
      backgroundShift,
      clampChroma(CHROMA_BOUNDARIES.background.max * global.chromaBoost, 'background'),
    ),
    foreground: generateColorPalette(
      foreground,
      'foreground',
      mode,
      lightnessShift,
      clampChroma(CHROMA_BOUNDARIES.foreground.max * global.chromaBoost, 'foreground'),
    ),
    accent: generateColorPalette(
      accent,
      'accent',
      mode,
      lightnessShift,
      clampChroma((options.accLimit ?? 0.3) * global.chromaBoost, 'accent'),
      options.accEase,
      options.accScale,
    ),
  }

  ;(['success', 'danger', 'warning', 'info'] as const).forEach((role) => {
    const value = config[role]
    if (!value) return

    const semanticColor = applyGlobalAdjustments(getOklchColor(value), role, global)
    const semanticLimit = options.semanticLimits?.[role] ?? 0.25
    palettes[role] = generateColorPalette(
      semanticColor,
      role,
      mode,
      lightnessShift,
      clampChroma(semanticLimit * global.chromaBoost, role),
    )
  })

  return palettes
}

export function palettesToCssVariables(palettes: ThemePalettes): Record<string, string> {
  return Object.entries(palettes).reduce((vars, [role, palette]) => {
    Object.entries(palette).forEach(([shade, color]) => {
      if (color) {
        vars[`--${role}-${shade}`] = oklchToCss(color)
      }
    })
    return vars
  }, {} as Record<string, string>)
}

function extractPaletteFromComputed(computed: CSSStyleDeclaration): Record<string, string> {
  return (['background', 'foreground', 'accent', 'success', 'danger', 'warning', 'info'] as const).reduce(
    (vars, role) => {
      SHADES.forEach((shade) => {
        const cleanName = `--${role}-${shade}`
        const colorName = `--color-${role}-${shade}`
        const value = (computed.getPropertyValue(cleanName) || computed.getPropertyValue(colorName)).trim()
        if (value) {
          vars[cleanName] = value
        }
      })

      return vars
    },
    {} as Record<string, string>,
  )
}

function extractBaseThemeColorsFromVariables(
  cssVariables: Record<string, string>,
): Partial<Record<ColorRole, OklchColor>> {
  return (Object.keys(ROLE_SHADE_PREFERENCES) as ColorRole[]).reduce((baseColors, role) => {
    const preferences = ROLE_SHADE_PREFERENCES[role]
    const match = preferences
      .map((shade) => parseOklchFromCss(cssVariables[`--${role}-${shade}`] ?? ''))
      .find((color): color is OklchColor => color !== null)

    if (match) {
      baseColors[role] = {
        l: rnd(match.l),
        c: rnd(match.c),
        h: rnd(match.h, 10),
      }
    }

    return baseColors
  }, {} as Partial<Record<ColorRole, OklchColor>>)
}

function detectSourceModeFromComputed(computed: CSSStyleDeclaration, fallbackSourceMode: ThemeMode): ThemeMode {
  const datasetMode = document.documentElement.dataset.theme
  if (datasetMode === 'light' || datasetMode === 'dark') {
    return datasetMode
  }

  const colorScheme = computed.colorScheme.trim().toLowerCase()
  if (colorScheme.includes('dark')) return 'dark'
  if (colorScheme.includes('light')) return 'light'

  return fallbackSourceMode
}

export function extractBaseThemeColorsFromCss(): Partial<Record<ColorRole, OklchColor>> {
  if (typeof document === 'undefined') return {}
  return extractBaseThemeColorsFromVariables(extractPaletteFromComputed(getComputedStyle(document.documentElement)))
}

export function generateThemeCssVariablesFromBaseColors(
  baseColors: Partial<Record<ColorRole, OklchColor>>,
  mode: ThemeMode,
  hints: ThemeGenerationHints = {},
): ThemeCssVariableBatch {
  const vars: ThemeCssVariableBatch = {}
  const global = hints.globalAdjustments ?? DEFAULT_GLOBAL_ADJUSTMENTS
  const lightnessShift = global.lightnessShift
  const backgroundShift = lightnessShift * 2.5

  ;(['background', 'foreground', 'accent', 'success', 'danger', 'warning', 'info'] as const).forEach((role) => {
    const baseColor = baseColors[role]
    if (!baseColor) return

    const isAccent = role === 'accent'
    const baseLimit = isAccent
      ? hints.accentChromaLimit ?? 0.3
      : role === 'success' || role === 'danger' || role === 'warning' || role === 'info'
        ? hints.semanticChromaLimits?.[role]?.[mode] ?? 0.25
        : CHROMA_BOUNDARIES[role].max

    const palette = generateColorPalette(
      baseColor,
      role,
      mode,
      role === 'background' ? backgroundShift : lightnessShift,
      clampChroma(baseLimit * global.chromaBoost, role),
    )

    Object.assign(vars, palettesToCssVariables({ [role]: palette }))
  })

  return vars
}

export function generateThemeBatchesFromCssSource(
  fallbackSourceMode: ThemeMode = 'dark',
): GeneratedThemeBatchesFromCssSource {
  if (typeof document === 'undefined') {
    return { sourceMode: fallbackSourceMode, cssVariables: {}, generatedThemes: {} }
  }

  const cssVariables = extractPaletteFromComputed(getComputedStyle(document.documentElement))
  const sourceMode = detectSourceModeFromComputed(getComputedStyle(document.documentElement), fallbackSourceMode)

  return {
    sourceMode,
    cssVariables,
    generatedThemes: Object.keys(cssVariables).length > 0 ? { [sourceMode]: cssVariables } : {},
  }
}

export function generateThemeBatchesFromCss(): Partial<Record<ThemeMode, ThemeCssVariableBatch>> {
  return generateThemeBatchesFromCssSource().generatedThemes
}

export function extractThemeVariables(fallbackSourceMode: ThemeMode = 'dark'): ExtractedThemeVars {
  if (typeof document === 'undefined') {
    return { sourceMode: fallbackSourceMode, baseColors: {}, cssVariables: {} }
  }

  const computed = getComputedStyle(document.documentElement)
  const cssVariables = extractPaletteFromComputed(computed)

  return {
    sourceMode: detectSourceModeFromComputed(computed, fallbackSourceMode),
    baseColors: extractBaseThemeColorsFromVariables(cssVariables),
    cssVariables,
  }
}

export function applyThemeCSSVariables(cssVariables: Record<string, string>): void {
  if (typeof document === 'undefined') return

  Object.entries(cssVariables).forEach(([key, value]) => {
    document.documentElement.style.setProperty(key, value)
  })
}
