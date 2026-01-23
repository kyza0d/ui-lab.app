import { type SimpleThemeColors, DEFAULT_GLOBAL_ADJUSTMENTS } from "../constants/themes";
import { generateThemePalettes, paletteToCssVars } from "../lib/color-utils";
import { isValidTypographyConfig } from "../lib/typography-constraints";

export interface ThemeConfig {
  colors: SimpleThemeColors;
  typography: { fontSizeScale: number; fontWeightScale: number; typeSizeRatio: number };
  layout: { radius: number; borderWidth: number; spacingScale: number };
  mode: "light" | "dark";
}

const TEXT_NAMES = ['xs', 'sm', 'md', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl'] as const;
const TEXT_BASE_INDEX = 3;
const TEXT_MIN_CONSTRAINTS: Record<string, number> = { xs: 0.800, sm: 0.850, md: 1.00, base: 1.0, lg: 1.125, xl: 1.25, '2xl': 1.5, '3xl': 1.75, '4xl': 2.0, '5xl': 2.25 };

const WEIGHT_DEFS = [
  { name: 'thin', value: 100 }, { name: 'extralight', value: 200 }, { name: 'light', value: 300 },
  { name: 'normal', value: 400 }, { name: 'medium', value: 500 }, { name: 'semibold', value: 600 },
  { name: 'bold', value: 700 }, { name: 'extrabold', value: 800 }, { name: 'black', value: 900 },
];

const SPACING_DEFS = [
  { name: 'xs', min: 0.125, fluid: 0.5, max: 0.2 },
  { name: 'sm', min: 0.2, fluid: 1, max: 0.35 },
  { name: 'base', min: 0.35, fluid: 1.5, max: 0.5 },
  { name: 'md', min: 0.5, fluid: 2, max: 0.75 },
  { name: 'lg', min: 0.75, fluid: 2.5, max: 1.0 },
  { name: 'xl', min: 1.0, fluid: 3, max: 1.5 },
  { name: '2xl', min: 1.5, fluid: 4, max: 2.0 },
];

const RADIUS_DEFS = [
  { name: 'xs', value: 0.05 }, { name: 'sm', value: 0.1 }, { name: 'base', value: 0.2 },
  { name: 'md', value: 0.3 }, { name: 'lg', value: 0.5 }, { name: 'xl', value: 0.75 }, { name: '2xl', value: 1 },
];

const BORDER_DEFS = [
  { name: 'none', value: 0 }, { name: 'thin', value: 1 }, { name: 'base', value: 1 },
  { name: '2', value: 2 }, { name: '4', value: 4 }, { name: '8', value: 8 },
];

function computeTypographyVars(typography: ThemeConfig['typography']): Record<string, string> {
  const { fontSizeScale, typeSizeRatio } = typography;

  const vars: Record<string, string> = {};
  vars['--font-size-scale'] = String(fontSizeScale);
  vars['--font-weight-scale'] = String(typography.fontWeightScale);

  TEXT_NAMES.forEach((name, i) => {
    let size = 1;
    if (i > TEXT_BASE_INDEX) size = Math.pow(typography.typeSizeRatio, i - TEXT_BASE_INDEX);
    else if (i < TEXT_BASE_INDEX) size = 1 / Math.pow(typography.typeSizeRatio, TEXT_BASE_INDEX - i);
    const minConstraint = TEXT_MIN_CONSTRAINTS[name] || 1;
    const scaledSize = size * typography.fontSizeScale;
    const minSize = Math.max(scaledSize * 0.8, minConstraint);
    const maxSize = scaledSize * 1.25;
    const fluidVw = scaledSize * 2.2;
    vars[`--text-${name}`] = `clamp(${minSize.toFixed(3)}rem, ${fluidVw.toFixed(2)}vw, ${maxSize.toFixed(3)}rem)`;
  });

  const baseWeightRef = 400;
  WEIGHT_DEFS.forEach(({ name, value }) => {
    const offset = value - baseWeightRef;
    const scaled = baseWeightRef + offset * typography.fontWeightScale;
    const clamped = Math.max(100, Math.min(900, Math.round(scaled)));
    vars[`--font-weight-${name}`] = clamped.toString();
  });

  return vars;
}

function computeSpacingVars(layout: ThemeConfig['layout']): Record<string, string> {
  const vars: Record<string, string> = {};
  vars['--spacing-scale'] = String(layout.spacingScale);

  SPACING_DEFS.forEach(s => {
    const scaledMin = (s.min * layout.spacingScale).toFixed(3);
    const scaledFluid = (s.fluid * layout.spacingScale).toFixed(2);
    const scaledMax = (s.max * layout.spacingScale).toFixed(3);
    vars[`--spacing-${s.name}`] = `clamp(${scaledMin}rem, ${scaledFluid}vw, ${scaledMax}rem)`;
  });

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
