'use client'

import { useEffect, useCallback, useState } from 'react'

/**
 * OKLCH Color Space
 * More perceptually uniform than HSL for generating visually balanced color scales
 */
interface OklchColor {
  l: number // Lightness: 0-1
  c: number // Chroma: 0-0.4 (saturation)
  h: number // Hue: 0-360 degrees
}

/**
 * Color role definitions for all semantic colors in the theme
 */
interface ThemeConfig {
  background: string | OklchColor
  foreground: string | OklchColor
  accent: string | OklchColor
  success: string | OklchColor
  danger: string | OklchColor
  warning: string | OklchColor
  info: string | OklchColor
}

type ColorShade = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950
type ColorPalette = Record<ColorShade, OklchColor>
type ThemePalettes = Record<string, ColorPalette>

const SHADES: ColorShade[] = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]
const clamp = (n: number, min = 0, max = 1) => Math.min(max, Math.max(min, n))
const rnd = (n: number, p = 1000) => Math.round(n * p) / p

const CHROMA_BOUNDARIES: Record<string, { min: number; max: number }> = {
  background: { min: 0.001, max: 0.18 },
  foreground: { min: 0.01, max: 0.12 },
  accent: { min: 0.01, max: 0.32 },
  success: { min: 0.01, max: 0.28 },
  danger: { min: 0.01, max: 0.28 },
  warning: { min: 0.01, max: 0.26 },
  info: { min: 0.01, max: 0.24 },
}

const DARK_MODE_LIGHTNESS: Record<ColorShade, number> = {
  50: 0.98, 100: 0.95, 200: 0.9, 300: 0.84, 400: 0.65,
  500: 0.5, 600: 0.32, 700: 0.26, 800: 0.23, 900: 0.21, 950: 0.18,
}

const SEMANTIC_LIGHTNESS: Record<ColorShade, number> = {
  50: 0.95, 100: 0.88, 200: 0.8, 300: 0.72, 400: 0.65,
  500: 0.55, 600: 0.46, 700: 0.38, 800: 0.29, 900: 0.2, 950: 0.12,
}

const ACCENT_CHROMA_FACTORS: Record<ColorShade, number> = {
  50: 0.75, 100: 0.8, 200: 0.9, 300: 1, 400: 1.05,
  500: 1.1, 600: 1.05, 700: 1, 800: 0.95, 900: 0.85, 950: 0.75,
}

const STANDARD_CHROMA_FACTORS: Record<ColorShade, number> = {
  50: 0.4, 100: 0.5, 200: 0.65, 300: 0.8, 400: 0.9,
  500: 1, 600: 0.95, 700: 0.9, 800: 0.75, 900: 0.65, 950: 0.55,
}

/**
 * Convert hex to OKLCH color space
 */
function hexToOklch(hex: string): OklchColor {
  const n = parseInt(hex.replace('#', ''), 16)
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
}

/**
 * Convert OKLCH to CSS oklch() function
 */
function oklchToCss(color: OklchColor): string {
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
 */
function generateColorPalette(base: OklchColor, role: string, isAccent = false): ColorPalette {
  const lightnessScale = role === 'background' ? DARK_MODE_LIGHTNESS : SEMANTIC_LIGHTNESS
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

/**
 * Generate complete theme palettes from base colors
 */
function generateThemePalettes(config: ThemeConfig): ThemePalettes {
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
 */
function palettesToCssVariables(palettes: ThemePalettes): Record<string, string> {
  const vars: Record<string, string> = {}

  Object.entries(palettes).forEach(([role, palette]) => {
    SHADES.forEach((shade) => {
      const key = `--${role}-${shade}`
      vars[key] = oklchToCss(palette[shade])
    })
  })

  return vars
}

/**
 * Apply CSS variables to document root
 */
function applyThemeToDom(palettes: ThemePalettes): void {
  if (typeof document === 'undefined') return

  const vars = palettesToCssVariables(palettes)
  const root = document.documentElement

  Object.entries(vars).forEach(([key, value]) => {
    root.style.setProperty(key, value)
  })
}

const THEME_STORAGE_KEY = 'ui-lab-theme'

/**
 * useTheme Hook
 *
 * Generates and manages CSS custom properties for color scales.
 * Prevents Flash of Unstyled Content (FOUC) by applying theme on client mount.
 * Persists theme to localStorage for consistent experience across page reloads.
 *
 * @param defaultConfig - Default theme configuration with base colors
 * @returns Theme management methods
 *
 * @example
 * ```tsx
 * const { setTheme, getTheme } = useTheme({
 *   background: '#ffffff',
 *   foreground: '#000000',
 *   accent: '#3b82f6',
 *   success: '#10b981',
 *   danger: '#ef4444',
 *   warning: '#f59e0b',
 *   info: '#06b6d4',
 * })
 *
 * // Switch theme at runtime
 * setTheme({ ...getTheme(), accent: '#8b5cf6' })
 * ```
 */
export function useTheme(defaultConfig: ThemeConfig) {
  const [currentConfig, setCurrentConfig] = useState<ThemeConfig>(defaultConfig)

  // Initialize theme on mount (client-side only)
  useEffect(() => {
    if (typeof window === 'undefined') return

    try {
      // Check for saved theme in localStorage
      const saved = localStorage.getItem(THEME_STORAGE_KEY)
      if (saved) {
        const config = JSON.parse(saved) as ThemeConfig
        setCurrentConfig(config)
        const palettes = generateThemePalettes(config)
        applyThemeToDom(palettes)
        return
      }
    } catch (err) {
      // Silently fail on localStorage errors or invalid JSON
      console.warn('Failed to load saved theme:', err)
    }

    // Apply default theme if no saved theme
    const palettes = generateThemePalettes(defaultConfig)
    applyThemeToDom(palettes)
  }, [defaultConfig])

  /**
   * Get the current theme configuration
   */
  const getTheme = useCallback(() => currentConfig, [currentConfig])

  /**
   * Set theme and persist to localStorage
   */
  const setTheme = useCallback((config: ThemeConfig) => {
    try {
      // Update state
      setCurrentConfig(config)

      // Generate and apply new theme
      const palettes = generateThemePalettes(config)
      applyThemeToDom(palettes)

      // Persist to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(config))
      }
    } catch (err) {
      console.error('Failed to set theme:', err)
    }
  }, [])

  /**
   * Get all CSS variables for current theme
   */
  const getCSSVariables = useCallback(() => {
    const palettes = generateThemePalettes(currentConfig)
    return palettesToCssVariables(palettes)
  }, [currentConfig])

  return {
    getTheme,
    setTheme,
    getCSSVariables,
  }
}

export type { ThemeConfig, OklchColor }
