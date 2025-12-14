/**
 * Theme Initialization Script
 *
 * This script runs BEFORE React renders to prevent Flash of Unstyled Content (FOUC).
 * It should be injected into the document <head> before other scripts.
 *
 * Steps:
 * 1. Immediately checks localStorage for saved theme
 * 2. Applies CSS variables to document root synchronously
 * 3. React hydration happens after, with no visible flash
 *
 * Inject this into your Next.js layout.tsx like:
 * <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
 */

(function initializeTheme() {
  try {
    const THEME_STORAGE_KEY = 'ui-lab-theme'

    // Helper functions (minimal to reduce script size)
    const clamp = (n, min = 0, max = 1) => Math.min(max, Math.max(min, n))
    const rnd = (n, p = 1000) => Math.round(n * p) / p

    const CHROMA_BOUNDARIES = {
      background: { min: 0.001, max: 0.18 },
      foreground: { min: 0.01, max: 0.12 },
      accent: { min: 0.01, max: 0.32 },
      success: { min: 0.01, max: 0.28 },
      danger: { min: 0.01, max: 0.28 },
      warning: { min: 0.01, max: 0.26 },
      info: { min: 0.01, max: 0.24 },
    }

    const DARK_MODE_LIGHTNESS = {
      50: 0.98, 100: 0.95, 200: 0.9, 300: 0.84, 400: 0.65,
      500: 0.5, 600: 0.32, 700: 0.26, 800: 0.23, 900: 0.21, 950: 0.18,
    }

    const SEMANTIC_LIGHTNESS = {
      50: 0.95, 100: 0.88, 200: 0.8, 300: 0.72, 400: 0.65,
      500: 0.55, 600: 0.46, 700: 0.38, 800: 0.29, 900: 0.2, 950: 0.12,
    }

    const ACCENT_CHROMA_FACTORS = {
      50: 0.75, 100: 0.8, 200: 0.9, 300: 1, 400: 1.05,
      500: 1.1, 600: 1.05, 700: 1, 800: 0.95, 900: 0.85, 950: 0.75,
    }

    const STANDARD_CHROMA_FACTORS = {
      50: 0.4, 100: 0.5, 200: 0.65, 300: 0.8, 400: 0.9,
      500: 1, 600: 0.95, 700: 0.9, 800: 0.75, 900: 0.65, 950: 0.55,
    }

    const SHADES = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]

    function hexToOklch(hex) {
      const n = parseInt(hex.replace('#', ''), 16)
      const r = ((n >> 16) & 0xff) / 255
      const g = ((n >> 8) & 0xff) / 255
      const b = (n & 0xff) / 255

      const toLinear = (c) => (c /= 255) <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
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

    function oklchToCss(color) {
      return `oklch(${(color.l * 100).toFixed(1)}% ${color.c.toFixed(3)} ${color.h.toFixed(1)})`
    }

    function clampChroma(chroma, role) {
      const bounds = CHROMA_BOUNDARIES[role] || CHROMA_BOUNDARIES.accent
      return Math.max(bounds.min, Math.min(bounds.max, chroma))
    }

    function generateColorPalette(base, role, isAccent) {
      const lightnessScale = role === 'background' ? DARK_MODE_LIGHTNESS : SEMANTIC_LIGHTNESS
      const chromaFactors = isAccent ? ACCENT_CHROMA_FACTORS : STANDARD_CHROMA_FACTORS

      const constrainedBase = { ...base, c: clampChroma(base.c, role) }
      const palette = {}

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

    function generateThemePalettes(config) {
      const getOklch = (color) => typeof color === 'string' ? hexToOklch(color) : color

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

    function applyThemeToDom(palettes) {
      const root = document.documentElement

      Object.entries(palettes).forEach(([role, palette]) => {
        SHADES.forEach((shade) => {
          const key = `--${role}-${shade}`
          const value = oklchToCss(palette[shade])
          root.style.setProperty(key, value)
        })
      })
    }

    // Try to load and apply saved theme
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY)
      if (saved) {
        const config = JSON.parse(saved)
        const palettes = generateThemePalettes(config)
        applyThemeToDom(palettes)
      }
    } catch (err) {
      // Silently fail - localStorage might be unavailable (private mode, etc)
      // The React hook will apply the default theme instead
    }
  } catch (err) {
    // Fail silently - errors here shouldn't break the page
    // The React hook will handle theme application with fallback to defaults
  }
})()
