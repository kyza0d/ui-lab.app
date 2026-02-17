import { type SimpleThemeColors, DEFAULT_GLOBAL_ADJUSTMENTS } from "../constants/themes";
import { generateThemePalettes, paletteToCssVars } from "../lib/color-utils";
import { type FontKey } from "../constants/font-config";
import { generateTypeScaleFromRatio, generateLetterSpacingCSS } from "../config/typography/generator";
import { generateFontWeightCSS } from "../config/font-weight/generator";

export interface ThemeConfig {
  colors: SimpleThemeColors;
  typography: {
    headerTypeSizeRatio: number;
    headerFontSizeScale: number;
    headerFontWeightScale: number;
    headerLetterSpacingScale: number;
    bodyTypeSizeRatio: number;
    bodyFontSizeScale: number;
    bodyFontWeightScale: number;
    bodyLetterSpacingScale: number;
  };
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

function generateTextSizeVars(prefix: string, typeSizeRatio: number, fontSizeScale: number): Record<string, string> {
  // Use new centralized typography generator to ensure consistency with React application layer
  const typeScale = generateTypeScaleFromRatio(typeSizeRatio, fontSizeScale);
  const vars: Record<string, string> = {};

  typeScale.forEach(({ name, cssValue }) => {
    vars[`--${prefix}-${name}`] = cssValue;
  });

  return vars;
}

function computeTypographyVars(typography: ThemeConfig['typography']): Record<string, string> {
  const {
    headerTypeSizeRatio,
    headerFontSizeScale,
    headerFontWeightScale,
    bodyTypeSizeRatio,
    bodyFontSizeScale,
    bodyFontWeightScale,
    bodyLetterSpacingScale,
    headerLetterSpacingScale,
  } = typography;

  const vars: Record<string, string> = {};
  vars['--header-type-size-ratio'] = String(headerTypeSizeRatio);
  vars['--header-font-size-scale'] = String(headerFontSizeScale);
  vars['--body-type-size-ratio'] = String(bodyTypeSizeRatio);
  vars['--body-font-size-scale'] = String(bodyFontSizeScale);

  // Use centralized typography generators to ensure consistency across all paths
  Object.assign(vars, generateTextSizeVars('text', bodyTypeSizeRatio, bodyFontSizeScale));
  Object.assign(vars, generateTextSizeVars('header-text', headerTypeSizeRatio, headerFontSizeScale));

  // Parse font weight CSS string into individual variables
  const fontWeightCSS = generateFontWeightCSS(headerFontWeightScale, bodyFontWeightScale);
  fontWeightCSS.split('\n').forEach((line) => {
    const match = line.match(/--font-weight-([^:]+):\s*(\d+);/);
    if (match) {
      vars[`--font-weight-${match[1]}`] = match[2];
    }
  });

  // Generate letter spacing variables
  Object.assign(vars, generateLetterSpacingCSS(bodyLetterSpacingScale, headerLetterSpacingScale));

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
