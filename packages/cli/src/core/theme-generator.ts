import type { ThemePreset } from '../types/index.js'
import { generateThemePalettes, palettesToCssVars, type ThemePalettes } from '../utils/color-utils.js'
import { getPreset } from '../data/presets.js'

export class ThemeGenerator {
  generateGlobalsCss(preset: ThemePreset): string {
    const palettes = generateThemePalettes(
      preset.colors.background,
      preset.colors.foreground,
      preset.colors.accent,
      preset.semanticColors,
      preset.mode
    )

    const cssVars = palettesToCssVars(palettes)
    const cssVarLines = Object.entries(cssVars)
      .map(([key, value]) => `  ${key}: ${value};`)
      .join('\n')

    return `@import "tailwindcss";

@theme {
  /* Font Families */
  --font-sans: "Karla", system-ui, sans-serif;
  --font-mono: "JetBrains Mono Variable", monospace;

  /* Font Sizes */
  --font-size-xs: clamp(0.581rem, 0.5vw + 0.5rem, 0.635rem);
  --font-size-sm: clamp(0.681rem, 0.5vw + 0.5rem, 0.762rem);
  --font-size-md: clamp(0.815rem, 0.5vw + 0.6rem, 0.914rem);
  --font-size-base: clamp(1.000rem, 0.4vw + 0.8rem, 1.100rem);
  --font-size-lg: clamp(1.200rem, 0.4vw + 0.9rem, 1.320rem);
  --font-size-xl: clamp(1.440rem, 0.5vw + 1.1rem, 1.650rem);
  --font-size-2xl: clamp(1.728rem, 0.6vw + 1.3rem, 2.112rem);
  --font-size-3xl: clamp(2.074rem, 0.7vw + 1.5rem, 2.534rem);
  --font-size-4xl: clamp(2.488rem, 0.8vw + 1.8rem, 3.041rem);
  --font-size-5xl: clamp(2.986rem, 1vw + 2rem, 3.713rem);

  /* Line Heights */
  --line-height-tight: 1.25;
  --line-height-snug: 1.375;
  --line-height-normal: 1.5;
  --line-height-relaxed: 1.65;
  --line-height-loose: 2;

  /* Letter Spacing */
  --letter-spacing-tight: -0.01em;
  --letter-spacing-snug: -0.005em;
  --letter-spacing-normal: 0;
  --letter-spacing-wide: 0.05em;

  /* Font Weights */
  --font-weight-thin: 100;
  --font-weight-extralight: 200;
  --font-weight-light: 300;
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  --font-weight-extrabold: 800;
  --font-weight-black: 900;

  /* Spacing */
  --spacing: clamp(0.200rem, 2.5vw, 0.250rem);

  /* Border Radius */
  --radius-xs: 0.05rem;
  --radius-sm: 0.1rem;
  --radius-base: 0.2rem;
  --radius-md: 0.3rem;
  --radius-lg: 0.5rem;
  --radius-xl: 0.75rem;
  --radius-2xl: 1rem;
  --radius-full: 9999px;

  /* Border Width */
  --border-none: 0;
  --border-thin: 1px;
  --border-base: 1px;
  --border-2: 2px;
  --border-4: 4px;
  --border-8: 8px;

  /* Color Palettes */
${cssVarLines}
}

/* Base styles */
body {
  background-color: var(--color-background-950);
  color: var(--color-foreground-300);
  font-weight: var(--font-weight-medium);
}

/* Selection */
::selection {
  background-color: color-mix(in oklch, var(--color-accent-500) 10%, transparent);
}
`
  }

  generateFromPresetName(presetName: string): string | null {
    const preset = getPreset(presetName)
    if (!preset) return null
    return this.generateGlobalsCss(preset)
  }

  getPalettes(preset: ThemePreset): ThemePalettes {
    return generateThemePalettes(
      preset.colors.background,
      preset.colors.foreground,
      preset.colors.accent,
      preset.semanticColors,
      preset.mode
    )
  }
}

export function createThemeGenerator(): ThemeGenerator {
  return new ThemeGenerator()
}
