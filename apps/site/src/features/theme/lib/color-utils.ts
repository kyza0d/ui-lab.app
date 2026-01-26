export interface OklchColor { l: number; c: number; h: number }
export type ShadeScale = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950;
export type ColorPalette = Partial<Record<ShadeScale, OklchColor>>;
export type ThemeMode = 'light' | 'dark';
export type EasingFunction = (t: number) => number;
export type ChromaScalingFunction = (t: number) => number;
export type ColorRole = 'background' | 'foreground' | 'accent' | 'success' | 'danger' | 'warning' | 'info';

export interface ScaleRange { min: ShadeScale; max: ShadeScale }
export const SCALE_RANGES: Record<ColorRole, ScaleRange> = {
  foreground: { min: 50, max: 600 },
  background: { min: 500, max: 950 },
  accent: { min: 50, max: 600 },
  success: { min: 50, max: 600 },
  danger: { min: 50, max: 600 },
  warning: { min: 50, max: 600 },
  info: { min: 50, max: 600 },
};

export interface ChromaBounds { min: number; max: number }
export const CHROMA_BOUNDARIES: Record<ColorRole, ChromaBounds> = {
  background: { min: 0.008, max: 0.18 },
  foreground: { min: 0.025, max: 0.14 },
  accent: { min: 0.01, max: 0.32 },
  success: { min: 0.01, max: 0.28 },
  danger: { min: 0.01, max: 0.28 },
  warning: { min: 0.01, max: 0.26 },
  info: { min: 0.01, max: 0.24 },
};

export interface GlobalColorAdjustments {
  lightnessShift: number;
  chromaBoost: number;
}

export const DEFAULT_GLOBAL_ADJUSTMENTS: GlobalColorAdjustments = { lightnessShift: 0, chromaBoost: 1.0 };

export function clampChromaToRole(chroma: number, role: ColorRole): number {
  if (chroma === 0) return 0;
  const bounds = CHROMA_BOUNDARIES[role];
  return Math.max(bounds.min, Math.min(bounds.max, chroma));
}

export function applyGlobalAdjustments(color: OklchColor, role: ColorRole, global: GlobalColorAdjustments): OklchColor {
  const adjustedL = clamp(color.l + global.lightnessShift);
  const adjustedC = clampChromaToRole(color.c * global.chromaBoost, role);
  return { l: adjustedL, c: adjustedC, h: color.h };
}

const ALL_SHADES: ShadeScale[] = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
const SHADES = ALL_SHADES;
const clamp = (n: number, min = 0, max = 1) => Math.min(max, Math.max(min, n));
const rnd = (n: number, p = 1000) => Math.round(n * p) / p;

export function getShadesForRole(role: ColorRole): ShadeScale[] {
  const range = SCALE_RANGES[role];
  return ALL_SHADES.filter(s => s >= range.min && s <= range.max);
}

export function hexToOklch(hex: string): OklchColor {
  const n = parseInt(hex.replace('#', ''), 16);
  const toL = (c: number) => (c /= 255) <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  const [r, g, b] = [toL(n >> 16), toL((n >> 8) & 0xFF), toL(n & 0xFF)];

  // Re-expanding correct matrix logic for precision as the condensed map above loses the specific matrix mixing for LMS
  const x = 0.4124564 * r + 0.3575761 * g + 0.1804375 * b;
  const y = 0.2126729 * r + 0.7151522 * g + 0.0721750 * b;
  const z = 0.0193339 * r + 0.1191920 * g + 0.9503041 * b;

  const l__ = Math.cbrt(0.8189330101 * x + 0.3618667424 * y - 0.1288597137 * z);
  const m__ = Math.cbrt(0.0329845436 * x + 0.9293118715 * y + 0.0361456387 * z);
  const s__ = Math.cbrt(0.0482003018 * x + 0.2643662691 * y + 0.6338517070 * z);

  const finalL = 0.2104542553 * l__ + 0.7936177850 * m__ - 0.0040720468 * s__;
  const a = 1.9779984951 * l__ - 2.4285922050 * m__ + 0.4505937099 * s__;
  const b_ = 0.0259040371 * l__ + 0.7827717662 * m__ - 0.8086757660 * s__;

  const c = Math.sqrt(a * a + b_ * b_);
  const h = (Math.atan2(b_, a) * (180 / Math.PI) + 360) % 360;
  return { l: rnd(finalL), c: rnd(c), h: rnd(h, 10) };
}

export function oklchToHex({ l, c, h }: OklchColor): string {
  const hr = h * Math.PI / 180;
  const [a, b_] = [c * Math.cos(hr), c * Math.sin(hr)];

  const [l_, m_, s_] = [
    l + 0.3963377774 * a + 0.2158037573 * b_,
    l - 0.1055613458 * a - 0.0638541728 * b_,
    l - 0.0894841775 * a - 1.2914855480 * b_
  ].map(v => v ** 3);

  const x = 1.2270138511 * l_ - 0.5577999807 * m_ + 0.2812561490 * s_;
  const y = -0.0405801784 * l_ + 1.1122568696 * m_ - 0.0716766787 * s_;
  const z = -0.0763812845 * l_ - 0.4214819784 * m_ + 1.5861632204 * s_;

  const toS = (v: number) => {
    v = clamp(v);
    return Math.round(255 * (v <= 0.0031308 ? v * 12.92 : 1.055 * Math.pow(v, 1 / 2.4) - 0.055));
  };

  const rgb = [
    3.2404542 * x - 1.5371385 * y - 0.4985314 * z,
    -0.9692660 * x + 1.8760108 * y + 0.0415560 * z,
    0.0556434 * x - 0.2040259 * y + 1.0572252 * z
  ].map(toS);

  return `#${rgb.map(v => v.toString(16).padStart(2, '0')).join('')}`.toUpperCase();
}

export const oklchToCss = (c: OklchColor) => `oklch(${(c.l * 100).toFixed(1)}% ${c.c.toFixed(3)} ${c.h.toFixed(1)})`;

export function cssToOklch(css: string): OklchColor | null {
  const m = css.match(/oklch\(\s*([0-9.]+)%?\s+([0-9.]+)\s+([0-9.]+)\s*\)/);
  return m ? { l: parseFloat(m[1]) / 100, c: parseFloat(m[2]), h: parseFloat(m[3]) } : null;
}

export const adjustLightness = (k: OklchColor, amt: number): OklchColor => ({ ...k, l: clamp(k.l + amt) });
export const adjustChroma = (k: OklchColor, amt: number): OklchColor => ({ ...k, c: Math.max(0, k.c + amt) });
export const rotateHue = (k: OklchColor, deg: number): OklchColor => ({ ...k, h: (k.h + deg + 360) % 360 });

// Lightness scales for palette generation across different color roles and themes.
// Neutral accent scales (accNeutralLight/accNeutralDark) use opposite progressions for visual inversion:
// - accNeutralLight: Bright at shade 50 (0.99) → Dark at shade 600 (0.12) for contrast on light backgrounds
// - accNeutralDark: Dark at shade 50 (0.12) → Bright at shade 600 (0.91) for contrast on dark backgrounds
// This ensures shade 400 (0.58 lightness) provides good visual contrast in both light and dark theme contexts.
// Saturated accents (chroma > 0.005) use accSaturatedLight/accSaturatedDark scales with higher lightness values
// to compensate for the perceptual darkening effect of high chroma.
const SCALES: Record<string, Partial<Record<ShadeScale, number>>> = {
  dark: { 50: .98, 100: .95, 200: .9, 300: .84, 400: .65, 500: .5, 600: .32, 700: .26, 800: .23, 900: .21, 950: .18 },
  light: { 50: .16, 100: .29, 200: .31, 300: .42, 400: .55, 500: .6, 600: .88, 700: .9, 800: .94, 900: .96, 950: .98 },
  sem: { 50: .95, 100: .88, 200: .8, 300: .72, 400: .65, 500: .55, 600: .46, 700: .38, 800: .29, 900: .2, 950: .12 },
  accLight: { 50: .92, 100: .82, 200: .70, 300: .55, 400: .40, 500: .28, 600: .12 },
  accDark: { 50: .82, 100: .75, 200: .68, 300: .58, 400: .50, 500: .46, 600: .36 },
  acc: { 50: .92, 100: .86, 200: .76, 300: .62, 400: .52, 500: .45, 600: .32 },
  accNeutralLight: { 50: .99, 100: .97, 200: .91, 300: .72, 400: .58, 500: .32, 600: .28 },
  accNeutralDark: { 50: .12, 100: .20, 200: .32, 300: .44, 400: .58, 500: .72, 600: .91 },
  accSaturatedLight: { 50: .94, 100: .88, 200: .82, 300: .76, 400: .70, 500: .64, 600: .68 },
  accSaturatedDark: { 50: .95, 100: .88, 200: .82, 300: .75, 400: .71, 500: .65, 600: .60 }
};

export const SimplifiedChromaScaling = {
  linear: () => 1.0,
  desaturateBright: (t: number) => t < .2 ? .3 + t * 1.5 : t < .5 ? .6 + (t - .2) * 1.0 : .9 + (t - .5) * .2,
};

export const SimplifiedPaletteEasing = {
  linear: (t: number) => t,
  accent: (t: number) => t < .2 ? .9 - t * .5 : t < .5 ? .8 - (t - .2) * 1.0 : .5 + (t - .5) * 1.0,
};

const SHADE_NORM: Record<ShadeScale, number> = { 50: 0, 100: .1, 200: .2, 300: .3, 400: .4, 500: .5, 600: .6, 700: .7, 800: .8, 900: .9, 950: 1 };
const CHROMA_FACTORS = {
  acc: { 50: .55, 100: .65, 200: .80, 300: .95, 400: 1.15, 500: 1.25, 600: 1.20, 700: 1.15, 800: 1.10, 900: 1.05, 950: 1.00 },
  std: { 50: .4, 100: .5, 200: .65, 300: .8, 400: .9, 500: 1, 600: .95, 700: .9, 800: .75, 900: .65, 950: .55 }
} as const;

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

export type SemanticColorType = 'success' | 'danger' | 'warning' | 'info';
export interface HueRange { min: number; max: number; label: string }
export interface SemanticColorConfig { light: { color: OklchColor; chromaLimit?: number }; dark: { color: OklchColor; chromaLimit?: number }; hueRange?: HueRange }
export type SemanticColors = Record<SemanticColorType, SemanticColorConfig>;
export type SemanticPalettes = Record<SemanticColorType, ColorPalette>;

export interface ThemePaletteOptions {
  mode?: ThemeMode;
  shift?: number;
  semantic?: SemanticColors;
  accLimit?: number;
  accEase?: EasingFunction;
  accScale?: ChromaScalingFunction;
  global?: GlobalColorAdjustments;
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

export const paletteToCssVars = (name: string, p: ColorPalette): Record<string, string> => {
  const vars: Record<string, string> = {};
  Object.entries(p).forEach(([shade, color]) => {
    if (color) vars[`--${name}-${shade}`] = oklchToCss(color);
  });
  return vars;
};

export function applyPalettesToDocument(p: { background: ColorPalette; foreground: ColorPalette; accent: ColorPalette; semantic?: SemanticPalettes }) {
  const allVars = {
    ...paletteToCssVars('background', p.background),
    ...paletteToCssVars('foreground', p.foreground),
    ...paletteToCssVars('accent', p.accent),
    ...(p.semantic ? Object.entries(p.semantic).reduce((a, [k, v]) => ({ ...a, ...paletteToCssVars(k, v) }), {}) : {})
  };
  Object.entries(allVars).forEach(([k, v]) => document.documentElement.style.setProperty(k, v as string));
}

export function logColorVariablesForExport(p: { background: ColorPalette; foreground: ColorPalette; accent: ColorPalette; semantic?: SemanticPalettes }) {
  let out = '';
  const add = (name: string, pal: ColorPalette) => {
    const shades = (Object.keys(pal) as unknown as ShadeScale[]).filter((s) => pal[s]).sort((a, b) => Number(a) - Number(b));
    out += `\n/* ${name.charAt(0).toUpperCase() + name.slice(1)} Palette */\n` + shades.map(s => `--color-${name}-${s}: ${oklchToCss(pal[s]!)};`).join('\n') + '\n';
  };
  add('background', p.background); add('foreground', p.foreground); add('accent', p.accent);
  if (p.semantic) Object.entries(p.semantic).forEach(([k, v]) => add(k, v));
  console.log(out);
}

