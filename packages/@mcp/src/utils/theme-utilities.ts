/**
 * Theme Utilities Generator
 * Provides boilerplate code for theme management in UI Lab projects
 */
/**
 * Get the complete theme utilities module code
 * This code should be scaffolded into lib/theme-utils.ts in new projects
 * Required for color scale generation and theme management in ui-lab-components
 * @returns Complete theme utilities module as a string
 */
export function getThemeUtils(): string {
  return `'use client'

import { useEffect, useCallback, useState } from 'react'

/**
 * ============================================================================
 * THEME UTILITIES (OKLCH NATIVE)
 * ============================================================================
 */

export interface OklchColor {
  l: number // Lightness (0-1)
  c: number // Chroma (0-0.4)
  h: number // Hue (0-360)
}

export interface ThemeConfig {
  background: OklchColor
  foreground: OklchColor
  accent: OklchColor
  success: OklchColor
  danger: OklchColor
  warning: OklchColor
  info: OklchColor
}

export type ColorShade = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950
export type ColorPalette = Record<ColorShade, OklchColor>
export type ThemePalettes = Record<keyof ThemeConfig, ColorPalette>

export interface UseThemeReturn {
  getTheme: () => ThemeConfig
  setTheme: (config: ThemeConfig) => void
  getCSSVariables: () => Record<string, string>
}

// ============================================================================
// CONSTANTS & PERCEPTUAL SCALING
// ============================================================================

const SHADES: ColorShade[] = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]
const THEME_STORAGE_KEY = 'ui-lab-theme-oklch'

/**
 * Strict boundaries per role to maintain UI professionalism.
 * Background and Foreground are kept very neutral.
 */
const CHROMA_BOUNDARIES: Record<string, { min: number; max: number }> = {
  background: { min: 0.001, max: 0.015 },
  foreground: { min: 0.001, max: 0.04 },
  accent: { min: 0.01, max: 0.28 },
  success: { min: 0.01, max: 0.20 },
  danger: { min: 0.01, max: 0.22 },
  warning: { min: 0.01, max: 0.18 },
  info: { min: 0.01, max: 0.20 },
}

/**
 * Perceptual Lightness Ramp (Easing Curve)
 * Designed to eliminate the "cliff" between 900 and 950.
 */
const LIGHTNESS_MAP: Record<ColorShade, number> = {
  50: 0.975,
  100: 0.940,
  200: 0.880,
  300: 0.780,
  400: 0.630,
  500: 0.500, // Base Anchor
  600: 0.360,
  700: 0.230,
  800: 0.200,
  900: 0.160,
  950: 0.140, // Harmonized with 900
}

/**
 * Chroma Multipliers per shade.
 * Tapers off at the extremes to keep colors "rich" without clipping.
 */
const CHROMA_MODIFIER: Record<ColorShade, number> = {
  50: 0.40,
  100: 0.55,
  200: 0.80,
  300: 0.90,
  400: 0.98,
  500: 1.00,
  600: 1.00,
  700: 0.95,
  800: 0.85,
  900: 0.75,
  950: 0.65,
}

// ============================================================================
// CORE LOGIC
// ============================================================================

const clamp = (n: number, min = 0, max = 1) => Math.min(max, Math.max(min, n))
const rnd = (n: number, precision = 1000) => Math.round(n * precision) / precision

function oklchToCss(color: OklchColor): string {
  return \`oklch(\${(color.l * 100).toFixed(2)}% \${color.c.toFixed(4)} \${color.h.toFixed(2)})\`
}

/**
 * Calculates a safe chroma value that respects role boundaries
 * and prevents out-of-gamut "neon" clipping at high lightness.
 */
function getConstrainedChroma(baseChroma: number, role: string, shade: ColorShade): number {
  const bounds = CHROMA_BOUNDARIES[role] || CHROMA_BOUNDARIES.accent
  // Apply shade-specific taper to the base chroma
  let targetChroma = baseChroma * CHROMA_MODIFIER[shade]
  // Apply hard role-based boundaries
  targetChroma = clamp(targetChroma, bounds.min, bounds.max)
  // Gamut Safety: High lightness colors (50, 100) cannot support high chroma
  // without clipping. We aggressively compress chroma as Lightness (L) -> 1.0.
  const L = LIGHTNESS_MAP[shade]
  if (L > 0.90) {
    const overflowFactor = (L - 0.90) * 0.6
    targetChroma = Math.min(targetChroma, 0.05 - overflowFactor)
  }
  return targetChroma
}

function generateColorPalette(base: OklchColor, role: string): ColorPalette {
  const palette: ColorPalette = {} as ColorPalette
  SHADES.forEach((shade) => {
    palette[shade] = {
      l: rnd(LIGHTNESS_MAP[shade]),
      c: rnd(getConstrainedChroma(base.c, role, shade)),
      h: rnd(base.h, 10),
    }
  })
  return palette
}

function generateThemePalettes(config: ThemeConfig): ThemePalettes {
  return {
    background: generateColorPalette(config.background, 'background'),
    foreground: generateColorPalette(config.foreground, 'foreground'),
    accent: generateColorPalette(config.accent, 'accent'),
    success: generateColorPalette(config.success, 'success'),
    danger: generateColorPalette(config.danger, 'danger'),
    warning: generateColorPalette(config.warning, 'warning'),
    info: generateColorPalette(config.info, 'info'),
  }
}

function palettesToCssVariables(palettes: ThemePalettes): Record<string, string> {
  const vars: Record<string, string> = {}
  Object.entries(palettes).forEach(([role, palette]) => {
    SHADES.forEach((shade) => {
      vars[\`--\${role}-\${shade}\`] = oklchToCss(palette[shade])
    })
  })
  return vars
}

function applyThemeToDom(palettes: ThemePalettes): void {
  if (typeof document === 'undefined') return
  const vars = palettesToCssVariables(palettes)
  const root = document.documentElement
  Object.entries(vars).forEach(([key, value]) => {
    root.style.setProperty(key, value)
  })
}

// ============================================================================
// HOOK
// ============================================================================

export function useTheme(defaultConfig: ThemeConfig): UseThemeReturn {
  const [currentConfig, setCurrentConfig] = useState<ThemeConfig>(defaultConfig)

  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY)
      if (saved) {
        const config = JSON.parse(saved) as ThemeConfig
        setCurrentConfig(config)
        applyThemeToDom(generateThemePalettes(config))
        return
      }
    } catch (err) {
      console.warn('Failed to load saved theme:', err)
    }
    applyThemeToDom(generateThemePalettes(defaultConfig))
  }, [defaultConfig])

  const setTheme = useCallback((config: ThemeConfig) => {
    try {
      setCurrentConfig(config)
      applyThemeToDom(generateThemePalettes(config))
      if (typeof window !== 'undefined') {
        localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(config))
      }
    } catch (err) {
      console.error('Failed to set theme:', err)
    }
  }, [])

  const getTheme = useCallback(() => currentConfig, [currentConfig])

  const getCSSVariables = useCallback(() => {
    return palettesToCssVariables(generateThemePalettes(currentConfig))
  }, [currentConfig])

  return { getTheme, setTheme, getCSSVariables }
}
`;
}
