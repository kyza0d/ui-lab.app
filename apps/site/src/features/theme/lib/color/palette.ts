import type { OklchColor, ShadeScale, ThemeMode, ColorPalette, EasingFunction, ChromaScalingFunction, SemanticColors, SemanticPalettes, GlobalColorAdjustments } from './types';
import { SCALES, SHADES, SHADE_NORM, CHROMA_FACTORS, CHROMA_BOUNDARIES, DEFAULT_GLOBAL_ADJUSTMENTS, getShadesForRole, clampChromaToRole, applyGlobalAdjustments } from './scales';

const clamp = (n: number, min = 0, max = 1) => Math.min(max, Math.max(min, n));
const rnd = (n: number, p = 1000) => Math.round(n * p) / p;

export const SimplifiedChromaScaling = {
  linear: () => 1.0,
  desaturateBright: (t: number) => t < .2 ? .3 + t * 1.5 : t < .5 ? .6 + (t - .2) * 1.0 : .9 + (t - .5) * .2,
};

export const SimplifiedPaletteEasing = {
  linear: (t: number) => t,
  accent: (t: number) => t < .2 ? .9 - t * .5 : t < .5 ? .8 - (t - .2) * 1.0 : .5 + (t - .5) * 1.0,
};

export function applyEasingToScale(scale: Partial<Record<ShadeScale, number>>, shades?: ShadeScale[], ease?: EasingFunction): Partial<Record<ShadeScale, number>> {
  if (!ease) return scale;
  const shadesToUse = shades || SHADES;
  const vals = shadesToUse.map(s => scale[s]).filter((v): v is number => v !== undefined);
  const [min, max] = [Math.min(...vals), Math.max(...vals)];

  return shadesToUse.reduce((acc, s) => {
    const normValue = (s - shadesToUse[0]) / (shadesToUse[shadesToUse.length - 1] - shadesToUse[0]);
    return { ...acc, [s]: clamp(min + ease(normValue) * (max - min), 0.01, 0.99) };
  }, {} as any);
}

export const getLightnessScale = (m: ThemeMode) => m === 'light' ? SCALES.light : SCALES.dark;
export const getSemanticLightnessScale = () => SCALES.sem;

export function generateColorPalette(
  base: OklchColor, baseShade: ShadeScale = 500, mode: ThemeMode = 'dark', shift = 0, limit = 0.01,
  useSem = false, isAcc = false, ease?: EasingFunction, cScale?: ChromaScalingFunction, shades?: ShadeScale[], role?: string
): ColorPalette {
  const shadesToUse = shades || (isAcc ? [50, 100, 200, 300, 400, 500, 600] as ShadeScale[] : SHADES);

  const isNeutral = base.c <= 0.005;
  let scaleName = 'unknown';
  let lScale: Partial<Record<ShadeScale, number>>;

  if (useSem) {
    scaleName = 'sem';
    lScale = SCALES.sem;
  } else if (isAcc) {
    if (isNeutral) {
      scaleName = mode === 'light' ? 'accNeutralLight' : 'accNeutralDark';
      lScale = mode === 'light' ? SCALES.accNeutralLight : SCALES.accNeutralDark;
    } else {
      scaleName = mode === 'light' ? 'accSaturatedLight' : 'accSaturatedDark';
      lScale = mode === 'light' ? SCALES.accSaturatedLight : SCALES.accSaturatedDark;
    }
  } else {
    scaleName = mode === 'light' ? 'light' : 'dark';
    lScale = getLightnessScale(mode);
  }

  if (useSem) {
    const offset = base.l - (SCALES.sem[baseShade] ?? 0.5);
    lScale = shadesToUse.reduce((a, s) => ({ ...a, [s]: clamp((SCALES.sem[s] ?? 0.5) + offset, 0.01, 0.99) }), {} as any);
  }
  if (ease) lScale = applyEasingToScale(lScale, shadesToUse, ease);

  const normC = { ...base, l: clamp(lScale[baseShade] ?? 0.5, 0.01, 0.99) };
  const cConstraint = Math.min(1.0, limit / Math.max(normC.c, 0.01));

  return shadesToUse.reduce((palette, shade) => {
    const chromaFactors = isAcc ? CHROMA_FACTORS.acc : CHROMA_FACTORS.std;
    let cFactor = (chromaFactors[shade] ?? 1.0) * cConstraint;
    if (cScale) cFactor *= cScale(SHADE_NORM[shade]);

    const finalLightness = rnd(clamp((lScale[shade] ?? 0.5) + shift, 0.01, 0.99));

    palette[shade] = {
      l: finalLightness,
      c: rnd(normC.c * cFactor),
      h: normC.h
    };
    return palette;
  }, {} as ColorPalette);
}

export function generateThemePalettes(
  bg: OklchColor, fg: OklchColor, acc: OklchColor, mode: ThemeMode = 'dark', shift = 0,
  sem?: SemanticColors, accLimit = 0.1, accEase?: EasingFunction, accScale?: ChromaScalingFunction,
  global: GlobalColorAdjustments = DEFAULT_GLOBAL_ADJUSTMENTS
) {
  const lightnessShift = global.lightnessShift + shift;
  const bgLightnessShift = lightnessShift * 2.5;
  const adjustedBg = applyGlobalAdjustments(bg, 'background', global);
  const adjustedFg = applyGlobalAdjustments(fg, 'foreground', global);
  const adjustedAcc = applyGlobalAdjustments(acc, 'accent', global);

  const effectiveBgLimit = clampChromaToRole(CHROMA_BOUNDARIES.background.max * global.chromaBoost, 'background');
  const effectiveFgLimit = clampChromaToRole(CHROMA_BOUNDARIES.foreground.max * global.chromaBoost, 'foreground');
  const effectiveAccLimit = clampChromaToRole(accLimit * global.chromaBoost, 'accent');

  const fgShades = getShadesForRole('foreground');
  const bgShades = getShadesForRole('background');
  const accShades = [50, 100, 200, 300, 400, 500, 600] as ShadeScale[];

  const result: any = {
    background: generateColorPalette(adjustedBg, 500, mode, bgLightnessShift, effectiveBgLimit, false, false, undefined, undefined, bgShades),
    foreground: generateColorPalette(adjustedFg, 500, mode, lightnessShift, effectiveFgLimit, false, false, undefined, undefined, fgShades),
    accent: generateColorPalette(adjustedAcc, 500, mode, lightnessShift, effectiveAccLimit, false, true, accEase, accScale, accShades, 'accent'),
  };

  if (sem) {
    result.semantic = (['success', 'danger', 'warning', 'info'] as const).reduce((a, k) => {
      const semColor = sem[k][mode].color;
      const semLimit = sem[k][mode].chromaLimit ?? 0.025;
      const adjustedSemColor = applyGlobalAdjustments(semColor, k, global);
      const effectiveSemLimit = clampChromaToRole(semLimit * global.chromaBoost, k);
      const semShades = getShadesForRole(k);
      return { ...a, [k]: generateColorPalette(adjustedSemColor, 500, mode, lightnessShift, effectiveSemLimit, true, false, undefined, undefined, semShades) };
    }, {});
  }
  return result as { background: ColorPalette; foreground: ColorPalette; accent: ColorPalette; semantic?: SemanticPalettes };
}
