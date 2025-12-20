import type { OklchColor, ColorPalette, ShadeScale, ColorRole, ThemeMode } from '../types/index.js'

const SHADES: ShadeScale[] = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]
const clamp = (n: number, min = 0, max = 1) => Math.min(max, Math.max(min, n))
const rnd = (n: number, p = 1000) => Math.round(n * p) / p

export const CHROMA_BOUNDARIES: Record<ColorRole, { min: number; max: number }> = {
  background: { min: 0.001, max: 0.18 },
  foreground: { min: 0.01, max: 0.12 },
  accent: { min: 0.01, max: 0.32 },
  success: { min: 0.01, max: 0.28 },
  danger: { min: 0.01, max: 0.28 },
  warning: { min: 0.01, max: 0.26 },
  info: { min: 0.01, max: 0.24 },
}

const SCALES: Record<string, Record<ShadeScale, number>> = {
  dark: { 50: .98, 100: .95, 200: .9, 300: .84, 400: .65, 500: .5, 600: .32, 700: .26, 800: .23, 900: .21, 950: .18 },
  light: { 50: .16, 100: .29, 200: .31, 300: .42, 400: .55, 500: .6, 600: .88, 700: .9, 800: .94, 900: .96, 950: .98 },
  sem: { 50: .95, 100: .88, 200: .8, 300: .72, 400: .65, 500: .55, 600: .46, 700: .38, 800: .29, 900: .2, 950: .12 },
}

const CHROMA_FACTORS = {
  acc: { 50: .75, 100: .8, 200: .9, 300: 1, 400: 1.05, 500: 1.1, 600: 1.05, 700: 1, 800: .95, 900: .85, 950: .75 },
  std: { 50: .4, 100: .5, 200: .65, 300: .8, 400: .9, 500: 1, 600: .95, 700: .9, 800: .75, 900: .65, 950: .55 }
} as const

export function oklchToCss(c: OklchColor): string {
  return `oklch(${(c.l * 100).toFixed(1)}% ${c.c.toFixed(3)} ${c.h.toFixed(1)})`
}

export function cssToOklch(css: string): OklchColor | null {
  const m = css.match(/oklch\(\s*([0-9.]+)%?\s+([0-9.]+)\s+([0-9.]+)\s*\)/)
  return m ? { l: parseFloat(m[1]) / 100, c: parseFloat(m[2]), h: parseFloat(m[3]) } : null
}

export function clampChromaToRole(chroma: number, role: ColorRole): number {
  const bounds = CHROMA_BOUNDARIES[role]
  return Math.max(bounds.min, Math.min(bounds.max, chroma))
}

export function generateColorPalette(
  base: OklchColor,
  baseShade: ShadeScale = 500,
  mode: ThemeMode = 'dark',
  shift = 0,
  limit = 0.01,
  useSem = false,
  isAcc = false
): ColorPalette {
  let lScale = useSem ? SCALES.sem : (mode === 'dark' ? SCALES.dark : SCALES.light)

  if (useSem) {
    const offset = base.l - SCALES.sem[baseShade]
    lScale = SHADES.reduce((a, s) => ({ ...a, [s]: clamp(SCALES.sem[s] + offset, 0.01, 0.99) }), {} as Record<ShadeScale, number>)
  }

  const normC = { ...base, l: clamp(lScale[baseShade], 0.01, 0.99) }
  const cConstraint = Math.min(1.0, limit / Math.max(normC.c, 0.01))

  return SHADES.reduce((palette, shade) => {
    const cFactor = (isAcc ? CHROMA_FACTORS.acc : CHROMA_FACTORS.std)[shade] * cConstraint

    palette[shade] = {
      l: rnd(clamp(lScale[shade] + shift, 0.01, 0.99)),
      c: rnd(normC.c * cFactor),
      h: normC.h
    }
    return palette
  }, {} as ColorPalette)
}

export interface ThemePalettes {
  background: ColorPalette
  foreground: ColorPalette
  accent: ColorPalette
  semantic: {
    success: ColorPalette
    danger: ColorPalette
    warning: ColorPalette
    info: ColorPalette
  }
}

export function generateThemePalettes(
  bg: OklchColor,
  fg: OklchColor,
  acc: OklchColor,
  semantic: { success: OklchColor; danger: OklchColor; warning: OklchColor; info: OklchColor },
  mode: ThemeMode = 'dark',
  shift = 0
): ThemePalettes {
  const bgLimit = CHROMA_BOUNDARIES.background.max
  const fgLimit = CHROMA_BOUNDARIES.foreground.max
  const accLimit = CHROMA_BOUNDARIES.accent.max

  return {
    background: generateColorPalette(bg, 500, mode, shift * 2.5, bgLimit),
    foreground: generateColorPalette(fg, 500, mode, shift, fgLimit),
    accent: generateColorPalette(acc, 500, mode, shift, accLimit, true, false),
    semantic: {
      success: generateColorPalette(semantic.success, 500, mode, shift, CHROMA_BOUNDARIES.success.max, true),
      danger: generateColorPalette(semantic.danger, 500, mode, shift, CHROMA_BOUNDARIES.danger.max, true),
      warning: generateColorPalette(semantic.warning, 500, mode, shift, CHROMA_BOUNDARIES.warning.max, true),
      info: generateColorPalette(semantic.info, 500, mode, shift, CHROMA_BOUNDARIES.info.max, true),
    }
  }
}

export function paletteToCssVars(name: string, palette: ColorPalette): Record<string, string> {
  return SHADES.reduce((acc, s) => ({
    ...acc,
    [`--color-${name}-${s}`]: `var(--${name}-${s}, ${oklchToCss(palette[s])})`
  }), {} as Record<string, string>)
}

export function palettesToCssVars(palettes: ThemePalettes): Record<string, string> {
  return {
    ...paletteToCssVars('background', palettes.background),
    ...paletteToCssVars('foreground', palettes.foreground),
    ...paletteToCssVars('accent', palettes.accent),
    ...paletteToCssVars('success', palettes.semantic.success),
    ...paletteToCssVars('danger', palettes.semantic.danger),
    ...paletteToCssVars('warning', palettes.semantic.warning),
    ...paletteToCssVars('info', palettes.semantic.info),
  }
}
