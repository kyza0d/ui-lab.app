import type { ColorRole, OklchColor, ScaleRange, ShadeScale, ChromaBounds, GlobalColorAdjustments } from './types';

const clamp = (n: number, min = 0, max = 1) => Math.min(max, Math.max(min, n));

export const SCALE_RANGES: Record<ColorRole, ScaleRange> = {
  foreground: { min: 50, max: 600 },
  background: { min: 500, max: 950 },
  accent: { min: 50, max: 600 },
  success: { min: 50, max: 600 },
  danger: { min: 50, max: 600 },
  warning: { min: 50, max: 600 },
  info: { min: 50, max: 600 },
};

export const CHROMA_BOUNDARIES: Record<ColorRole, ChromaBounds> = {
  background: { min: 0.008, max: 0.18 },
  foreground: { min: 0.025, max: 0.14 },
  accent: { min: 0.01, max: 0.32 },
  success: { min: 0.01, max: 0.28 },
  danger: { min: 0.01, max: 0.28 },
  warning: { min: 0.01, max: 0.26 },
  info: { min: 0.01, max: 0.24 },
};

export const DEFAULT_GLOBAL_ADJUSTMENTS: GlobalColorAdjustments = { lightnessShift: 0, chromaBoost: 1.0 };

export const ALL_SHADES: ShadeScale[] = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
export const SHADES = ALL_SHADES;

export const SCALES: Record<string, Partial<Record<ShadeScale, number>>> = {
  dark: { 50: .98, 100: .95, 200: .9, 300: .84, 400: .65, 500: .5, 600: .32, 700: .26, 800: .23, 900: .21, 950: .18 },
  light: { 50: .16, 100: .29, 200: .31, 300: .42, 400: .55, 500: .6, 600: .88, 700: .9, 800: .94, 900: .96, 950: .98 },
  sem: { 50: .95, 100: .88, 200: .8, 300: .72, 400: .65, 500: .55, 600: .46, 700: .38, 800: .29, 900: .2, 950: .12 },
  accLight: { 50: .92, 100: .82, 200: .70, 300: .55, 400: .40, 500: .28, 600: .12 },
  accDark: { 50: .82, 100: .75, 200: .68, 300: .58, 400: .50, 500: .46, 600: .36 },
  acc: { 50: .92, 100: .86, 200: .76, 300: .62, 400: .52, 500: .45, 600: .32 },
  accNeutralLight: { 50: .99, 100: .97, 200: .91, 300: .72, 400: .58, 500: .32, 600: .28 },
  accNeutralDark: { 50: .12, 100: .20, 200: .32, 300: .44, 400: .58, 500: .72, 600: .91 },
  accSaturatedLight: { 50: .98, 100: .91, 200: .82, 300: .76, 400: .70, 500: .64, 600: .68 },
  accSaturatedDark: { 50: .98, 100: .91, 200: .82, 300: .75, 400: .71, 500: .65, 600: .60 }
};

export const SHADE_NORM: Record<ShadeScale, number> = { 50: 0, 100: .1, 200: .2, 300: .3, 400: .4, 500: .5, 600: .6, 700: .7, 800: .8, 900: .9, 950: 1 };
export const CHROMA_FACTORS = {
  acc: { 50: .18, 100: .33, 200: .45, 300: .54, 400: .66, 500: .72, 600: .69, 700: .66, 800: .63, 900: .60, 950: .57 },
  std: { 50: .4, 100: .5, 200: .65, 300: .8, 400: .9, 500: 1, 600: .95, 700: .9, 800: .75, 900: .65, 950: .55 }
} as const;

export function getShadesForRole(role: ColorRole): ShadeScale[] {
  const range = SCALE_RANGES[role];
  return ALL_SHADES.filter(s => s >= range.min && s <= range.max);
}

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
