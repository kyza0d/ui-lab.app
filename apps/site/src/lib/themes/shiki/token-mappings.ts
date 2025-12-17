import { ShikiPalettes } from './types'
import { oklchToHex, ThemeMode, ShadeScale } from '../../color-utils'

export interface TokenMapping {
  scope: string | string[]
  getColor: (palettes: ShikiPalettes, mode: ThemeMode) => string
  fontStyle?: string
}

const getShade = (darkShade: ShadeScale, mode: ThemeMode): ShadeScale => {
  if (mode === 'dark') return darkShade

  // Contrast-aware shade mapping for light mode
  // The OKLCH lightness scales are pre-inverted, so using the same shade number
  // provides appropriate contrast in both modes:
  // - Dark mode: bright shades (high lightness) on dark backgrounds
  // - Light mode: dark shades (low lightness) on light backgrounds
  //
  // For shades 50-500 (most syntax tokens), use the same shade:
  // - Shade 100: dark mode 0.95 (bright) → light mode 0.29 (dark) ✓
  // - Shade 200: dark mode 0.9 (bright) → light mode 0.31 (dark) ✓
  // - Shade 300: dark mode 0.84 (fairly bright) → light mode 0.42 (medium-dark) ✓
  // - Shade 400: dark mode 0.65 (medium) → light mode 0.55 (medium) ✓
  // - Shade 500: dark mode 0.5 (medium) → light mode 0.6 (medium-light) ✓
  //
  // For shades 600+ (rarely used for foreground), adjust to avoid too-light colors
  const shadeMapping: Record<ShadeScale, ShadeScale> = {
    50: 50,    // Edge case: 0.98 → 0.16 (maintains role)
    100: 100,  // Components, functions: 0.95 → 0.29
    200: 200,  // Keywords, strings: 0.9 → 0.31
    300: 300,  // Operators, headings: 0.84 → 0.42
    400: 400,  // Variables: 0.65 → 0.55
    500: 500,  // Comments: 0.5 → 0.6
    600: 500,  // Shift darker: 0.32 → 0.6 (instead of 0.88)
    700: 600,  // Shift darker: 0.26 → 0.88
    800: 700,  // Shift darker: 0.23 → 0.9
    900: 800,  // Shift darker: 0.21 → 0.94 (avoid invisibility)
    950: 900   // Shift lighter: 0.18 → 0.96
  }
  return shadeMapping[darkShade]
}

export const TOKEN_MAPPINGS: TokenMapping[] = [
  {
    scope: ['comment', 'punctuation.definition.comment'],
    getColor: (p, mode) => oklchToHex(p.syntax_base[getShade(500, mode)]),
    fontStyle: 'italic'
  },
  {
    scope: ['string', 'meta.string', 'punctuation.definition.string'],
    getColor: (p, mode) => oklchToHex(p.syntax_accent[getShade(200, mode)])
  },
  {
    scope: ['constant.numeric', 'constant.numeric.decimal'],
    getColor: (p, mode) => oklchToHex(p.syntax_accent[getShade(300, mode)])
  },
  {
    scope: ['constant.language', 'constant.other', 'keyword.constant'],
    getColor: (p, mode) => oklchToHex(p.syntax_accent[getShade(100, mode)])
  },
  {
    scope: ['keyword', 'storage.type', 'storage.modifier'],
    getColor: (p, mode) => oklchToHex(p.syntax_accent[getShade(300, mode)])
  },
  {
    scope: ['keyword.control', 'keyword.control.import', 'keyword.control.from'],
    getColor: (p, mode) => oklchToHex(p.syntax_accent[getShade(200, mode)])
  },
  {
    scope: 'entity.name.function',
    getColor: (p, mode) => oklchToHex(p.syntax_accent[getShade(100, mode)])
  },
  {
    scope: ['support.function', 'support.function.builtin'],
    getColor: (p, mode) => oklchToHex(p.syntax_base[getShade(100, mode)])
  },
  {
    scope: ['entity.name.class', 'entity.name.type'],
    getColor: (p, mode) => oklchToHex(p.syntax_accent[getShade(100, mode)])
  },
  {
    scope: ['support.type', 'support.class'],
    getColor: (p, mode) => oklchToHex(p.syntax_base[getShade(100, mode)])
  },
  {
    scope: 'entity.name.tag',
    getColor: (p, mode) => oklchToHex(p.syntax_accent[getShade(100, mode)])
  },
  {
    scope: ['variable', 'variable.other'],
    getColor: (p, mode) => oklchToHex(p.syntax_base[getShade(400, mode)])
  },
  {
    scope: 'variable.other.property',
    getColor: (p, mode) => oklchToHex(p.syntax_base[getShade(100, mode)])
  },
  {
    scope: 'variable.other.object.property',
    getColor: (p, mode) => oklchToHex(p.syntax_accent[getShade(100, mode)])
  },
  {
    scope: 'variable.builtin',
    getColor: (p, mode) => oklchToHex(p.syntax_base[getShade(300, mode)])
  },
  {
    scope: 'punctuation.separator',
    getColor: (p, mode) => oklchToHex(p.syntax_base[getShade(500, mode)])
  },
  {
    scope: 'punctuation.terminator',
    getColor: (p, mode) => oklchToHex(p.syntax_base[getShade(500, mode)])
  },
  {
    scope: 'punctuation.delimiter',
    getColor: (p, mode) => oklchToHex(p.syntax_base[getShade(500, mode)])
  },
  {
    scope: 'punctuation.bracket',
    getColor: (p, mode) => oklchToHex(p.syntax_base[getShade(500, mode)])
  },
  {
    scope: 'operator',
    getColor: (p, mode) => oklchToHex(p.syntax_base[getShade(300, mode)])
  },
  {
    scope: 'keyword.operator',
    getColor: (p, mode) => oklchToHex(p.syntax_accent[getShade(200, mode)])
  },
  {
    scope: ['markup.bold'],
    getColor: (p, mode) => oklchToHex(p.syntax_accent[getShade(100, mode)]),
    fontStyle: 'bold'
  },
  {
    scope: ['markup.italic'],
    getColor: (p, mode) => oklchToHex(p.syntax_base[getShade(200, mode)]),
    fontStyle: 'italic'
  },
  {
    scope: ['markup.underline'],
    getColor: (p, mode) => oklchToHex(p.syntax_base[getShade(200, mode)]),
    fontStyle: 'underline'
  },
  {
    scope: ['markup.heading'],
    getColor: (p, mode) => oklchToHex(p.syntax_accent[getShade(200, mode)]),
    fontStyle: 'bold'
  },
  {
    scope: 'invalid',
    getColor: (p, mode) => mode === 'dark' ? '#FF6B6B' : '#C92A2A'
  }
]

export function buildTokenColors(palettes: ShikiPalettes, mode: 'light' | 'dark'): {
  scope: string | string[]
  settings: {
    foreground?: string
    fontStyle?: string
  }
}[] {
  return TOKEN_MAPPINGS.map((mapping) => ({
    scope: mapping.scope,
    settings: {
      foreground: mapping.getColor(palettes, mode),
      fontStyle: mapping.fontStyle
    }
  }))
}
