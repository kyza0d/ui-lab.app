import { type SimpleThemeColors, DEFAULT_GLOBAL_ADJUSTMENTS } from "../constants/themes";
import { generateThemePalettes, paletteToCssVars } from "../lib/color-utils";
import { type FontKey } from "../constants/font-config";

export interface ThemeConfig {
  colors: SimpleThemeColors;
  typography: { fontSizeScale: number; fontWeightScale?: number; headerFontWeightScale?: number; bodyFontWeightScale?: number; typeSizeRatio: number; headerLetterSpacingScale?: number; bodyLetterSpacingScale?: number };
  layout: { radius: number; borderWidth: number; spacingScale: number };
  fonts?: { sansFont: FontKey; monoFont: FontKey };
  mode: "light" | "dark";
}

const TEXT_NAMES = ['xs', 'sm', 'md', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl'] as const;
const TEXT_BASE_INDEX = 3;

const WEIGHT_DEFS = [
  { name: 'thin', value: 100 }, { name: 'extralight', value: 200 }, { name: 'light', value: 300 },
  { name: 'normal', value: 400 }, { name: 'medium', value: 500 }, { name: 'semibold', value: 600 },
  { name: 'bold', value: 700 }, { name: 'extrabold', value: 800 }, { name: 'black', value: 900 },
];

const RADIUS_DEFS = [
  { name: 'xs', value: 0.05 }, { name: 'sm', value: 0.1 }, { name: 'base', value: 0.2 },
  { name: 'md', value: 0.3 }, { name: 'lg', value: 0.5 }, { name: 'xl', value: 0.75 }, { name: '2xl', value: 1 },
];

const BORDER_DEFS = [
  { name: 'none', value: 0 }, { name: 'thin', value: 1 }, { name: 'base', value: 1 },
  { name: '2', value: 2 }, { name: '4', value: 4 }, { name: '8', value: 8 },
];

const TEXT_MIN_CONSTRAINTS: Record<string, number> = {
  xs: 0.800,    // was 0.800
  sm: 0.925,    // was 0.900
  md: 1.000,    // was 0.550
  lg: 1.400,    // was 1.100
  xl: 1.600,    // was 1.200
  '2xl': 1.80,     // was 1.5
  '3xl': 1.90,     // was 1.75
  '4xl': 2.00,     // was 2.0
  '5xl': 2.40,     // was 2.25
};


function computeTypographyVars(typography: ThemeConfig['typography']): Record<string, string> {
  const { fontSizeScale } = typography;
  const headerFontWeightScale = typography.headerFontWeightScale ?? typography.fontWeightScale ?? 1;
  const bodyFontWeightScale = typography.bodyFontWeightScale ?? typography.fontWeightScale ?? 1;

  const vars: Record<string, string> = {};
  vars['--font-size-scale'] = String(fontSizeScale);
  vars['--font-weight-scale'] = String(typography.fontWeightScale ?? 1);

  TEXT_NAMES.forEach((name, i) => {
    let size = 1;
    if (i > TEXT_BASE_INDEX) size = Math.pow(typography.typeSizeRatio, i - TEXT_BASE_INDEX);
    else if (i < TEXT_BASE_INDEX) size = 1 / Math.pow(typography.typeSizeRatio, TEXT_BASE_INDEX - i);
    const scaledSize = size * typography.fontSizeScale;
    const scaledMinConstraint = (TEXT_MIN_CONSTRAINTS[name] || 1) * typography.fontSizeScale;
    const minSize = Math.max(scaledSize * 0.8, scaledMinConstraint);
    const maxSize = scaledSize * 1.150;
    const fluidVw = scaledSize * 2.000;
    vars[`--text-${name}`] = `clamp(${minSize.toFixed(3)}rem, ${fluidVw.toFixed(2)}vw, ${maxSize.toFixed(3)}rem)`;
  });

  WEIGHT_DEFS.forEach(({ name, value }) => {
    const headerScaled = value * headerFontWeightScale;
    const bodyScaled = value * bodyFontWeightScale;
    const headerClamped = Math.max(100, Math.min(900, Math.round(headerScaled)));
    const bodyClamped = Math.max(100, Math.min(900, Math.round(bodyScaled)));
    vars[`--font-weight-header-${name}`] = headerClamped.toString();
    vars[`--font-weight-body-${name}`] = bodyClamped.toString();
  });

  return vars;
}

function computeSpacingVars(layout: ThemeConfig['layout']): Record<string, string> {
  const vars: Record<string, string> = {};
  vars['--spacing-scale'] = String(layout.spacingScale);

  const scaledMin = (0.2 * layout.spacingScale).toFixed(3);
  const scaledFluid = (2.5 * layout.spacingScale).toFixed(2);
  const scaledMax = (0.25 * layout.spacingScale).toFixed(3);
  vars['--spacing'] = `clamp(${scaledMin}rem, ${scaledFluid}vw, ${scaledMax}rem)`;

  return vars;
}

function computeRadiusVars(layout: ThemeConfig['layout']): Record<string, string> {
  const vars: Record<string, string> = {};
  const radiusScaleFactor = layout.radius / 0.2;

  RADIUS_DEFS.forEach(({ name, value }) => {
    const scaledValue = value * radiusScaleFactor;
    vars[`--radius-${name}`] = scaledValue > 100 ? '9999px' : `${scaledValue.toFixed(3)}rem`;
  });
  vars['--radius-full'] = '9999px';

  return vars;
}

function computeBorderVars(layout: ThemeConfig['layout']): Record<string, string> {
  const vars: Record<string, string> = {};
  const baseBorderRef = 1;
  const borderScaleFactor = layout.borderWidth / baseBorderRef;

  BORDER_DEFS.forEach(({ name, value }) => {
    const scaledValue = value * borderScaleFactor;
    vars[`--border-width-${name}`] = `${scaledValue.toFixed(1)}px`;
  });

  return vars;
}

function computeLetterSpacingVars(typography: ThemeConfig['typography']): Record<string, string> {
  const vars: Record<string, string> = {};
  const baseLetterSpacingFactor = 0.005;
  const headerLetterSpacingScale = typography.headerLetterSpacingScale ?? 1;
  const bodyLetterSpacingScale = typography.bodyLetterSpacingScale ?? 1;

  TEXT_NAMES.forEach((name, i) => {
    const stepsFromBase = i - TEXT_BASE_INDEX;
    const baseLetterSpacing = stepsFromBase * baseLetterSpacingFactor;
    const isHeader = i >= 4;
    const scale = isHeader ? headerLetterSpacingScale : bodyLetterSpacingScale;
    const scaledLetterSpacing = stepsFromBase < 0
      ? baseLetterSpacing / scale
      : baseLetterSpacing * scale;
    vars[`--letter-spacing-${name}`] = `${scaledLetterSpacing.toFixed(4)}em`;
  });

  return vars;
}

function computeColorVars(colors: SimpleThemeColors, mode: "light" | "dark"): Record<string, string> {
  const globalAdjustments = colors.globalAdjustments ?? DEFAULT_GLOBAL_ADJUSTMENTS;
  const palettes = generateThemePalettes(
    colors.background, colors.foreground, colors.accent, mode, 0,
    colors.semantic, colors.accentChromaLimit ?? 0.30, colors.accentEasing, colors.accentChromaScaling,
    globalAdjustments
  );

  let allVars = {
    ...paletteToCssVars('background', palettes.background),
    ...paletteToCssVars('foreground', palettes.foreground),
    ...paletteToCssVars('accent', palettes.accent),
  };

  if (palettes.semantic) {
    allVars = {
      ...allVars,
      ...paletteToCssVars('success', palettes.semantic.success),
      ...paletteToCssVars('danger', palettes.semantic.danger),
      ...paletteToCssVars('warning', palettes.semantic.warning),
      ...paletteToCssVars('info', palettes.semantic.info),
    };
  }

  return allVars as Record<string, string>;
}

export function computeAllCssVariables(config: ThemeConfig): Record<string, string> {
  return {
    ...computeTypographyVars(config.typography),
    ...computeLetterSpacingVars(config.typography),
    ...computeSpacingVars(config.layout),
    ...computeRadiusVars(config.layout),
    ...computeBorderVars(config.layout),
    ...computeColorVars(config.colors, config.mode),
  };
}

export interface LetterSpacingValue {
  name: string;
  value: string;
}

export function getLetterSpacingValues(typeSizeRatio: number, letterSpacingScale: number = 1): LetterSpacingValue[] {
  const baseLetterSpacingFactor = 0.005;
  const inverseScale = 1 / letterSpacingScale;
  return TEXT_NAMES.map((name, i) => {
    const stepsFromBase = i - TEXT_BASE_INDEX;
    const baseLetterSpacing = stepsFromBase * baseLetterSpacingFactor;
    const scaledLetterSpacing = baseLetterSpacing * inverseScale;
    return {
      name,
      value: `${scaledLetterSpacing.toFixed(4)}em`,
    };
  });
}
