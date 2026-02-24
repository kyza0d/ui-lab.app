import { ShikiTheme, ShikiPalettes } from './types'
import { ThemeMode, oklchToHex } from '../../color-utils'
import { buildTokenColors } from './token-mappings'

export type { ShikiTheme } from './types'

export function generateShikiTheme(
  palettes: ShikiPalettes,
  mode: ThemeMode = 'dark',
  name = `theme-${mode}`
): ShikiTheme {
  const isDark = mode === 'dark'

  const editorColors = {
    'editor.background': oklchToHex(palettes.background[900]!),
    'editor.foreground': oklchToHex(palettes.foreground[300]!),
    'editor.lineHighlightBackground': oklchToHex(palettes.background[800]!),
    'editorLineNumber.foreground': oklchToHex(palettes.foreground[400]!),
    'editorCursor.foreground': oklchToHex(palettes.accent[500]!),
    'editorWhitespace.foreground': oklchToHex(palettes.foreground[400]!),
    'editor.selectionBackground': oklchToHex(palettes.background[700]!),
    'editor.inactiveSelectionBackground': oklchToHex(palettes.background[800]!)
  }

  const tokenColors = buildTokenColors(palettes, mode)

  return {
    name,
    type: mode,
    colors: editorColors,
    tokenColors
  }
}
