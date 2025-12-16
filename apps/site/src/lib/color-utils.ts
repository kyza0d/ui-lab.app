export interface OklchColor { l: number; c: number; h: number }
export type ShadeScale = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950;
export type ColorPalette = Record<ShadeScale, OklchColor>;
export type ThemeMode = 'light' | 'dark';
export type EasingFunction = (t: number) => number;
export type ChromaScalingFunction = (t: number) => number;
export type ColorRole = 'background' | 'foreground' | 'accent' | 'success' | 'danger' | 'warning' | 'info';

export interface ChromaBounds { min: number; max: number }
export const CHROMA_BOUNDARIES: Record<ColorRole, ChromaBounds> = {
  background: { min: 0.008, max: 0.18 },
  foreground: { min: 0.01, max: 0.12 },
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
  const bounds = CHROMA_BOUNDARIES[role];
  return Math.max(bounds.min, Math.min(bounds.max, chroma));
}

export function applyGlobalAdjustments(color: OklchColor, role: ColorRole, global: GlobalColorAdjustments): OklchColor {
  const adjustedL = clamp(color.l + global.lightnessShift);
  const adjustedC = clampChromaToRole(color.c * global.chromaBoost, role);
  return { l: adjustedL, c: adjustedC, h: color.h };
}

const SHADES: ShadeScale[] = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
const clamp = (n: number, min = 0, max = 1) => Math.min(max, Math.max(min, n));
const rnd = (n: number, p = 1000) => Math.round(n * p) / p;

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

const SCALES: Record<string, Record<ShadeScale, number>> = {
  dark: { 50: .98, 100: .95, 200: .9, 300: .84, 400: .65, 500: .5, 600: .32, 700: .26, 800: .23, 900: .21, 950: .18 },
  light: { 50: .16, 100: .29, 200: .31, 300: .42, 400: .55, 500: .6, 600: .88, 700: .9, 800: .94, 900: .96, 950: .98 },
  sem: { 50: .95, 100: .88, 200: .8, 300: .72, 400: .65, 500: .55, 600: .46, 700: .38, 800: .29, 900: .2, 950: .12 },
  accDark: { 50: .995, 100: .97, 200: .92, 300: .84, 400: .65, 500: .5, 600: .32, 700: .26, 800: .23, 900: .21, 950: .18 },
  accLight: { 50: .85, 100: .78, 200: .70, 300: .58, 400: .45, 500: .32, 600: .26, 700: .21, 800: .16, 900: .12, 950: .08 }
};

export const PaletteEasing = {
  linear: (t: number) => t,
  easeInQuad: (t: number) => t * t,
  easeOutQuad: (t: number) => 1 - (1 - t) ** 2,
  easeInOutQuad: (t: number) => t < .5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2,
  exponentialBrightness: (t: number) => t < .3 ? 1 - (1 - t) ** 3 * .3 : .7 + (t - .3) / .7 * .3,
  aggressiveAccent: (t: number) => t < .2 ? Math.max(.88, 1 - (1 - t / .2) ** 2.5 * .12) : t < .4 ? .88 - (t - .2) / .2 * .38 : .5 + (t - .4) / .6 * .5,
  gentleBrightness: (t: number) => t < .25 ? 1 - (1 - t / .25) ** 2 * .1 : .9 + (t - .25) / .75 * .1,
};

export const ChromaScaling = {
  linear: () => 1.0,
  desaturateBright: (t: number) => t < .2 ? .2 + (t / .2) * .3 : t < .5 ? .5 + ((t - .2) / .3) * .35 : .85 + ((t - .5) / .5) * .15,
  desaturateGentle: (t: number) => t < .25 ? .5 + (t / .25) * .2 : .7 + ((t - .25) / .75) * .3,
  desaturateModerate: (t: number) => t < .2 ? .35 + (t / .2) * .25 : t < .5 ? .6 + ((t - .2) / .3) * .28 : .88 + ((t - .5) / .5) * .12,
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
  acc: { 50: .75, 100: .8, 200: .9, 300: 1, 400: 1.05, 500: 1.1, 600: 1.05, 700: 1, 800: .95, 900: .85, 950: .75 },
  std: { 50: .4, 100: .5, 200: .65, 300: .8, 400: .9, 500: 1, 600: .95, 700: .9, 800: .75, 900: .65, 950: .55 }
} as const;

export function applyEasingToScale(scale: Record<ShadeScale, number>, ease?: EasingFunction): Record<ShadeScale, number> {
  if (!ease) return scale;
  const vals = Object.values(scale);
  const [min, max] = [Math.min(...vals), Math.max(...vals)];
  return SHADES.reduce((acc, s) => ({ ...acc, [s]: clamp(min + ease(SHADE_NORM[s]) * (max - min), 0.01, 0.99) }), {} as any);
}

export const getLightnessScale = (m: ThemeMode) => m === 'light' ? SCALES.light : SCALES.dark;
export const getSemanticLightnessScale = () => SCALES.sem;

export function generateColorPalette(
  base: OklchColor, baseShade: ShadeScale = 500, mode: ThemeMode = 'dark', shift = 0, limit = 0.01,
  useSem = false, isAcc = false, ease?: EasingFunction, cScale?: ChromaScalingFunction
): ColorPalette {
  let lScale = useSem ? SCALES.sem : (isAcc ? (mode === 'dark' ? SCALES.accDark : SCALES.accLight) : getLightnessScale(mode));

  if (useSem) {
    const offset = base.l - SCALES.sem[baseShade];
    lScale = SHADES.reduce((a, s) => ({ ...a, [s]: clamp(SCALES.sem[s] + offset, 0.01, 0.99) }), {} as any);
  }
  if (ease) lScale = applyEasingToScale(lScale, ease);

  const normC = { ...base, l: clamp(lScale[baseShade], 0.01, 0.99) };
  const cConstraint = Math.min(1.0, limit / Math.max(normC.c, 0.01));

  return SHADES.reduce((palette, shade) => {
    let cFactor = (isAcc ? CHROMA_FACTORS.acc : CHROMA_FACTORS.std)[shade] * cConstraint;
    if (cScale) cFactor *= cScale(SHADE_NORM[shade]);

    palette[shade] = {
      l: rnd(clamp(lScale[shade] + shift, 0.01, 0.99)),
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

  const result: any = {
    background: generateColorPalette(adjustedBg, 500, mode, bgLightnessShift, effectiveBgLimit),
    foreground: generateColorPalette(adjustedFg, 500, mode, lightnessShift, effectiveFgLimit),
    accent: generateColorPalette(adjustedAcc, 500, mode, lightnessShift, effectiveAccLimit, true, false, accEase, accScale),
  };

  if (sem) {
    result.semantic = (['success', 'danger', 'warning', 'info'] as const).reduce((a, k) => {
      const semColor = sem[k][mode].color;
      const semLimit = sem[k][mode].chromaLimit ?? 0.025;
      const adjustedSemColor = applyGlobalAdjustments(semColor, k, global);
      const effectiveSemLimit = clampChromaToRole(semLimit * global.chromaBoost, k);
      return { ...a, [k]: generateColorPalette(adjustedSemColor, 500, mode, lightnessShift, effectiveSemLimit, true) };
    }, {});
  }
  return result as { background: ColorPalette; foreground: ColorPalette; accent: ColorPalette; semantic?: SemanticPalettes };
}

export const paletteToCssVars = (name: string, p: ColorPalette) => SHADES.reduce((a, s) => ({ ...a, [`--${name}-${s}`]: oklchToCss(p[s]) }), {});

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
    out += `\n/* ${name.charAt(0).toUpperCase() + name.slice(1)} Palette */\n` + SHADES.map(s => `--color-${name}-${s}: ${oklchToCss(pal[s])};`).join('\n') + '\n';
  };
  add('background', p.background); add('foreground', p.foreground); add('accent', p.accent);
  if (p.semantic) Object.entries(p.semantic).forEach(([k, v]) => add(k, v));
  console.log(out);
}

export interface ShikiTheme { name: string; type: 'light' | 'dark'; colors: Record<string, string>; tokenColors: { scope: string | string[]; settings: { foreground?: string; fontStyle?: string; background?: string } }[] }

export function generateShikiTheme(p: { background: ColorPalette; foreground: ColorPalette; accent: ColorPalette }, mode: ThemeMode, name = `theme-${mode}`): ShikiTheme {
  const hex = (pal: ColorPalette, s: ShadeScale) => oklchToHex(pal[s]);
  const isDark = mode === 'dark';
  const c = { bg: hex(p.background, 900), bgL: hex(p.background, isDark ? 900 : 100), fg: hex(p.foreground, 200), fgD: hex(p.foreground, isDark ? 600 : 300), acc: hex(p.accent, 500) };

  const tokens = [
    [['comment', 'punctuation.definition.comment'], 50, 'italic', 'fg'],
    [['string', 'meta.string', 'punctuation.definition.string'], 50, '', 'fg'],
    [['constant.numeric'], 50, '', 'fg'],
    [['constant.language', 'constant.other', 'keyword.constant'], 50, '', 'fg'],
    [['keyword', 'storage.type', 'storage.modifier'], 50, '', 'fg'],
    [['entity.name.function', 'entity.name.class', 'entity.name.tag'], 50, '', 'fg'],
    [['variable.other.property', 'variable.object.property'], 50, '', 'fg'],
    [['punctuation.separator', 'punctuation.terminator'], 50, '', 'fg'],
    [['punctuation.definition.parameters'], null, '', 'std-fg'],
    [['markup.bold'], 50, 'bold', 'fg'],
    [['markup.italic'], null, 'italic', ''],
    [['markup.underline'], null, 'underline', ''],
    [['variable', 'variable.other'], null, '', 'std-fg'],
    [['support.function'], 50, '', 'fg'],
    [['support.type', 'support.class'], 50, '', 'fg'],
  ] as const;

  return {
    name, type: mode,
    colors: { 'editor.background': c.bg, 'editor.foreground': c.fg, 'editor.lineHighlightBackground': c.bgL + '40', 'editorLineNumber.foreground': c.fgD, 'editorCursor.foreground': c.acc, 'editorWhitespace.foreground': c.fgD + '60' },
    tokenColors: tokens.map(([scope, shade, fontStyle, type]) => ({
      scope: scope as any,
      settings: {
        fontStyle: fontStyle || undefined,
        foreground: type === 'std-fg' ? c.fg : (type === 'fg' && shade ? hex(p.foreground, shade) : undefined)
      }
    }))
  };
}
