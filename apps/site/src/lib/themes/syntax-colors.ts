import { OklchColor, ColorPalette, ThemeMode, EasingFunction, ChromaScalingFunction, generateColorPalette, applyGlobalAdjustments } from '../color-utils'

export interface SyntaxPalettes {
  syntax_base: ColorPalette
  syntax_accent: ColorPalette
}

export function generateSyntaxPalettes(
  base: OklchColor,
  accent: OklchColor,
  mode: ThemeMode = 'dark',
  variation: number = 0,
  baseLimit: number = 0.01,
  accentLimit: number = 0.1,
  baseEase?: EasingFunction,
  baseScale?: ChromaScalingFunction,
  accentEase?: EasingFunction,
  accentScale?: ChromaScalingFunction
): SyntaxPalettes {
  const applyVariation = (color: OklchColor, variationAmount: number): OklchColor => {
    if (variationAmount === 0) return color

    const hueShift = variationAmount * 15
    const lightnessShift = variationAmount * 0.05

    return {
      l: Math.max(0.01, Math.min(0.99, color.l + lightnessShift)),
      c: Math.max(0, color.c),
      h: (color.h + hueShift + 360) % 360
    }
  }

  const variedBase = applyVariation(base, variation)
  const variedAccent = applyVariation(accent, variation)

  const adjustedAccent = mode === 'light' ? applyGlobalAdjustments(variedAccent, 'accent', { lightnessShift: -0.3, chromaBoost: 0.75 }) : variedAccent

  return {
    syntax_base: generateColorPalette(
      variedBase,
      500,
      mode,
      0,
      baseLimit,
      false,
      false,
      baseEase,
      baseScale
    ),
    syntax_accent: generateColorPalette(
      adjustedAccent,
      500,
      mode,
      0,
      accentLimit,
      true,
      false,
      accentEase,
      accentScale
    )
  }
}
