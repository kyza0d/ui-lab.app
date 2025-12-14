import type { ThemePreset, OklchColor } from '../types/index.js'

export const themePresets: ThemePreset[] = [
  {
    name: 'vitesse-dark',
    displayName: 'Vitesse Dark',
    mode: 'dark',
    colors: {
      background: { l: 0.18, c: 0.000, h: 0.0 },
      foreground: { l: 0.60, c: 0.000, h: 0.0 },
      accent: { l: 0.60, c: 0.000, h: 0.0 },
    },
    semanticColors: {
      success: { l: 0.55, c: 0.112, h: 142.0 },
      danger: { l: 0.55, c: 0.150, h: 25.0 },
      warning: { l: 0.55, c: 0.150, h: 65.0 },
      info: { l: 0.55, c: 0.150, h: 255.0 },
    }
  },
  {
    name: 'vitesse-light',
    displayName: 'Vitesse Light',
    mode: 'light',
    colors: {
      background: { l: 0.98, c: 0.000, h: 0.0 },
      foreground: { l: 0.40, c: 0.000, h: 0.0 },
      accent: { l: 0.40, c: 0.000, h: 0.0 },
    },
    semanticColors: {
      success: { l: 0.55, c: 0.112, h: 142.0 },
      danger: { l: 0.55, c: 0.150, h: 25.0 },
      warning: { l: 0.55, c: 0.150, h: 65.0 },
      info: { l: 0.55, c: 0.150, h: 255.0 },
    }
  }
]

export function getPreset(name: string): ThemePreset | undefined {
  return themePresets.find(p => p.name === name)
}

export function getPresetNames(): string[] {
  return themePresets.map(p => p.name)
}

export function getPresetDisplayNames(): Array<{ name: string; displayName: string }> {
  return themePresets.map(p => ({ name: p.name, displayName: p.displayName }))
}

export function createCustomPreset(
  name: string,
  mode: 'light' | 'dark',
  background: OklchColor,
  foreground: OklchColor,
  accent: OklchColor
): ThemePreset {
  const base = mode === 'dark' ? themePresets[0] : themePresets[1]
  return {
    name,
    displayName: `Custom (${mode})`,
    mode,
    colors: { background, foreground, accent },
    semanticColors: base.semanticColors
  }
}
