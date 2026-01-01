import { ColorPalette } from '../../color-utils'

export interface ShikiTheme {
  name: string
  type: 'light' | 'dark'
  colors: Record<string, string>
  tokenColors: {
    scope: string | string[]
    settings: {
      foreground?: string
      fontStyle?: string
      background?: string
    }
  }[]
}

export interface ShikiPalettes {
  background: ColorPalette
  foreground: ColorPalette
  accent: ColorPalette
  syntax_base: ColorPalette
  syntax_accent: ColorPalette
}

export interface TokenMapping {
  scope: string | string[]
  shade: number
  paletteKey: keyof Pick<ShikiPalettes, 'syntax_base' | 'syntax_accent'>
  fontStyle?: string
}
