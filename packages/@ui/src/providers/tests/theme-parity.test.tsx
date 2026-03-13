import { describe, expect, it } from 'vitest'
import { 
  generateThemeCssVariablesFromBaseColors, 
  generateThemePalettes as generatePackageThemePalettes, 
  palettesToCssVariables 
} from '../extractThemeVars'
import { generateThemePalettes as generateSiteThemePalettes } from '../../../../../apps/site/src/features/theme/lib/color/palette'
import { paletteToCssVars } from '../../../../../apps/site/src/features/theme/lib/color/palette-css'
import type { OklchColor } from '../extractThemeVars'

describe('Theme generation parity with chroma boost and lightness shift', () => {
  const baseColors: Record<string, OklchColor> = {
    background: { l: 0.15, c: 0.01, h: 240 },
    foreground: { l: 0.98, c: 0.01, h: 240 },
    accent: { l: 0.5, c: 0.15, h: 250 },
    success: { l: 0.5, c: 0.15, h: 142 },
    danger: { l: 0.5, c: 0.15, h: 25 },
    warning: { l: 0.5, c: 0.15, h: 80 },
    info: { l: 0.5, c: 0.15, h: 255 },
  }

  const globalAdjustments = {
    lightnessShift: 0.05,
    chromaBoost: 1.5,
  }

  const hints = {
    globalAdjustments,
    accentChromaLimit: 0.35,
  }

  it('matches site color generation with boosted chroma and shifted lightness', () => {
    const mode = 'dark'
    
    const semanticConfig = {
      success: { light: { color: baseColors.success, chromaLimit: 0.25 }, dark: { color: baseColors.success, chromaLimit: 0.25 } },
      danger: { light: { color: baseColors.danger, chromaLimit: 0.25 }, dark: { color: baseColors.danger, chromaLimit: 0.25 } },
      warning: { light: { color: baseColors.warning, chromaLimit: 0.25 }, dark: { color: baseColors.warning, chromaLimit: 0.25 } },
      info: { light: { color: baseColors.info, chromaLimit: 0.25 }, dark: { color: baseColors.info, chromaLimit: 0.25 } },
    }

    // 1. Generate site palette
    const sitePalettes = generateSiteThemePalettes(
      baseColors.background,
      baseColors.foreground,
      baseColors.accent,
      mode,
      0,
      semanticConfig as any,
      hints.accentChromaLimit,
      undefined,
      undefined,
      globalAdjustments
    )

    const siteVars: Record<string, string> = {
      ...paletteToCssVars('background', sitePalettes.background),
      ...paletteToCssVars('foreground', sitePalettes.foreground),
      ...paletteToCssVars('accent', sitePalettes.accent),
      ...(sitePalettes.semantic
        ? Object.entries(sitePalettes.semantic).reduce<Record<string, string>>(
          (allVars, [role, palette]) => ({ ...allVars, ...paletteToCssVars(role, palette) }),
          {},
        )
        : {}),
    }

    // 2. Generate package palette using the same BASE colors and hints
    // We simulate extracted adjusted base colors
    const adjustedBaseColors = Object.fromEntries(
      Object.entries(baseColors).map(([role, color]) => [
        role,
        {
            l: color.l + globalAdjustments.lightnessShift,
            // Site uses clampChromaToRole during adjusted color creation
            c: Math.max(0.008, Math.min(0.35, color.c * globalAdjustments.chromaBoost)), 
            h: color.h
        }
      ])
    )

    const packageVars = generateThemeCssVariablesFromBaseColors(adjustedBaseColors as any, mode, {
        ...hints,
        semanticChromaLimits: {
            success: { dark: 0.25, light: 0.25 },
            danger: { dark: 0.25, light: 0.25 },
            warning: { dark: 0.25, light: 0.25 },
            info: { dark: 0.25, light: 0.25 },
        }
    })

    // Check specific tokens
    expect(packageVars['--background-500']).toBe(siteVars['--background-500'])
    expect(packageVars['--accent-500']).toBe(siteVars['--accent-500'])
    expect(packageVars['--success-500']).toBe(siteVars['--success-500'])
  })

  it('matches site color generation when desaturated (chromaBoost < 1)', () => {
    const mode = 'light'
    const desaturatedGlobal = {
        lightnessShift: -0.02,
        chromaBoost: 0.5,
    }
    const desaturatedHints = {
        globalAdjustments: desaturatedGlobal,
        accentChromaLimit: 0.30,
    }

    // 1. Generate site palette
    const sitePalettes = generateSiteThemePalettes(
      baseColors.background,
      baseColors.foreground,
      baseColors.accent,
      mode,
      0,
      undefined,
      desaturatedHints.accentChromaLimit,
      undefined,
      undefined,
      desaturatedGlobal
    )

    const siteVars: Record<string, string> = {
      ...paletteToCssVars('background', sitePalettes.background),
      ...paletteToCssVars('foreground', sitePalettes.foreground),
      ...paletteToCssVars('accent', sitePalettes.accent),
    }

    // 2. Generate package palette
    const adjustedBaseColors = Object.fromEntries(
        Object.entries(baseColors).map(([role, color]) => [
          role,
          {
              l: color.l + desaturatedGlobal.lightnessShift,
              // Apply clamp like site's applyGlobalAdjustments
              c: Math.max(0.008, Math.min(0.35, color.c * desaturatedGlobal.chromaBoost)),
              h: color.h
          }
        ])
      )
  
    const packageVars = generateThemeCssVariablesFromBaseColors(adjustedBaseColors as any, mode, desaturatedHints)

    expect(packageVars['--background-500']).toBe(siteVars['--background-500'])
    expect(packageVars['--accent-500']).toBe(siteVars['--accent-500'])
  })

  it('generateThemePalettes matches site color generation with boosted chroma', () => {
    const mode = 'dark'
    
    // 1. Generate site palette
    const sitePalettes = generateSiteThemePalettes(
      baseColors.background,
      baseColors.foreground,
      baseColors.accent,
      mode,
      0,
      undefined,
      hints.accentChromaLimit,
      undefined,
      undefined,
      globalAdjustments
    )

    const siteVars: Record<string, string> = {
      ...paletteToCssVars('background', sitePalettes.background),
      ...paletteToCssVars('foreground', sitePalettes.foreground),
      ...paletteToCssVars('accent', sitePalettes.accent),
    }

    // 2. Generate package palette using generateThemePalettes
    const packagePalettes = generatePackageThemePalettes(
        {
            background: baseColors.background,
            foreground: baseColors.foreground,
            accent: baseColors.accent,
        },
        {
            mode,
            global: globalAdjustments,
            accLimit: hints.accentChromaLimit
        }
    )

    const packageVars = palettesToCssVariables(packagePalettes)

    expect(packageVars['--background-500']).toBe(siteVars['--background-500'])
    expect(packageVars['--accent-500']).toBe(siteVars['--accent-500'])
  })
})
