import { type SimpleThemeColors, DEFAULT_GLOBAL_ADJUSTMENTS } from "../constants/themes";
import { generateThemePalettes, paletteToCssVars } from "../lib/color-utils";
import { type FontKey } from "../constants/font-config";
import { getBorderWidthCssVariables, getRadiusCssVariables, getSpacingCssVariables } from "../config/shared/layout-variables";
import {
  generateTypeScaleFromRatio,
  generateLetterSpacingCSS,
  generateLineHeightCSS,
} from "../config/typography/generator";
import { generateFontWeightCSS } from "../config/font-weight/generator";
import { type TypographyConfig } from "./typography-config";

export interface ThemeConfig {
  colors: SimpleThemeColors;
  typography: TypographyConfig;
  layout: { radius: number; borderWidth: number; spacingScale: number };
  fonts?: { sansFont: FontKey; monoFont: FontKey };
  mode: "light" | "dark";
}

const TEXT_NAMES = ['xs', 'sm', 'md', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl'] as const;
const TEXT_BASE_INDEX = 3;

function generateTextSizeVars(
  prefix: string,
  typeSizeRatio: number,
  fontSizeScale: number,
  globalMinFontSizePx: number,
): Record<string, string> {
  // Use new centralized typography generator to ensure consistency with React application layer
  const typeScale = generateTypeScaleFromRatio(typeSizeRatio, fontSizeScale, 1, {
    globalMinFontSizePx,
  });
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
    headerLineHeight,
    bodyTypeSizeRatio,
    bodyFontSizeScale,
    bodyFontWeightScale,
    bodyLetterSpacingScale,
    bodyLineHeight,
    headerLetterSpacingScale,
    globalMinFontSizePx,
  } = typography;

  const vars: Record<string, string> = {};
  vars['--header-type-size-ratio'] = String(headerTypeSizeRatio);
  vars['--header-font-size-scale'] = String(headerFontSizeScale);
  vars['--body-type-size-ratio'] = String(bodyTypeSizeRatio);
  vars['--body-font-size-scale'] = String(bodyFontSizeScale);
  Object.assign(vars, generateLineHeightCSS(headerLineHeight, bodyLineHeight));

  // Use centralized typography generators to ensure consistency across all paths
  Object.assign(
    vars,
    generateTextSizeVars(
      'text',
      bodyTypeSizeRatio,
      bodyFontSizeScale,
      globalMinFontSizePx,
    ),
  );
  Object.assign(
    vars,
    generateTextSizeVars(
      'header-text',
      headerTypeSizeRatio,
      headerFontSizeScale,
      globalMinFontSizePx,
    ),
  );

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
  return getSpacingCssVariables(layout.spacingScale);
}

function computeRadiusVars(layout: ThemeConfig['layout']): Record<string, string> {
  return getRadiusCssVariables(layout.radius);
}

function computeBorderVars(layout: ThemeConfig['layout']): Record<string, string> {
  return getBorderWidthCssVariables(layout.borderWidth);
}

function computeColorMetadataVars(colors: SimpleThemeColors): Record<string, string> {
  const globalAdjustments = colors.globalAdjustments ?? DEFAULT_GLOBAL_ADJUSTMENTS;
  const vars: Record<string, string> = {
    '--ui-lab-meta-accent-chroma-limit': String(colors.accentChromaLimit ?? 0.30),
    '--ui-lab-meta-global-lightness-shift': String(globalAdjustments.lightnessShift),
    '--ui-lab-meta-global-chroma-boost': String(globalAdjustments.chromaBoost),
  };

  ; (['success', 'danger', 'warning', 'info'] as const).forEach((role) => {
    const semanticConfig = colors.semantic?.[role];
    if (!semanticConfig) return;

    vars[`--ui-lab-meta-${role}-light-chroma-limit`] = String(semanticConfig.light.chromaLimit ?? 0.25);
    vars[`--ui-lab-meta-${role}-dark-chroma-limit`] = String(semanticConfig.dark.chromaLimit ?? 0.25);
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
    ...computeColorMetadataVars(colors),
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
