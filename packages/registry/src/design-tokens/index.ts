export interface ColorFamilyInfo {
  name: string;
  availableShades: number[];
  wcagLevel: 'AA' | 'AAA';
  usageGuidance: string;
}

export interface ColorRecommendation {
  background?: { family: string; shade: number; cssVar: string };
  text?: { family: string; shade: number; cssVar: string };
  border?: { family: string; shade: number; cssVar: string };
  hover?: { family: string; shade: number; cssVar: string };
  active?: { family: string; shade: number; cssVar: string };
  disabled?: { family: string; shade: number; cssVar: string };
  rationale: string;
}

export interface ColorRecommendationRegistry {
  [key: string]: ColorRecommendation;
}

const COLOR_FAMILIES: Record<string, ColorFamilyInfo> = {
  background: {
    name: 'background',
    availableShades: [500, 600, 700, 800, 900, 950],
    wcagLevel: 'AA',
    usageGuidance: 'Dark backgrounds only; shades 500 (medium) through 950 (darkest)',
  },
  foreground: {
    name: 'foreground',
    availableShades: [50, 100, 200, 300, 400],
    wcagLevel: 'AA',
    usageGuidance: 'Text and borders; shades 50 (lightest) through 400 (darker)',
  },
  accent: {
    name: 'accent',
    availableShades: [50, 100, 200, 300, 400, 500, 600],
    wcagLevel: 'AA',
    usageGuidance: 'Primary actions and brand color; 50 (lightest) to 600 (darkest)',
  },
  success: {
    name: 'success',
    availableShades: [50, 100, 200, 300, 400, 500, 600],
    wcagLevel: 'AA',
    usageGuidance: 'Success states, confirmations; 50-300 for backgrounds, 400-600 for text',
  },
  danger: {
    name: 'danger',
    availableShades: [50, 100, 200, 300, 400, 500, 600],
    wcagLevel: 'AA',
    usageGuidance: 'Destructive actions, errors; 50-300 for backgrounds, 400-600 for text',
  },
  warning: {
    name: 'warning',
    availableShades: [50, 100, 200, 300, 400, 500, 600],
    wcagLevel: 'AA',
    usageGuidance: 'Warning states; 50-300 for backgrounds, 400-600 for text',
  },
  info: {
    name: 'info',
    availableShades: [50, 100, 200, 300, 400, 500, 600],
    wcagLevel: 'AA',
    usageGuidance: 'Informational states; 50-300 for backgrounds, 400-600 for text',
  },
};

const COLOR_RECOMMENDATIONS: ColorRecommendationRegistry = {
  'button:default': {
    background: { family: 'background', shade: 800, cssVar: '--background-800' },
    text: { family: 'foreground', shade: 300, cssVar: '--foreground-300' },
    border: { family: 'background', shade: 700, cssVar: '--background-700' },
    hover: { family: 'background', shade: 700, cssVar: '--background-700' },
    disabled: { family: 'foreground', shade: 200, cssVar: '--foreground-200' },
    rationale: 'Default button uses background surface colors with standard foreground text',
  },
  'button:outline': {
    text: { family: 'foreground', shade: 300, cssVar: '--foreground-300' },
    border: { family: 'background', shade: 700, cssVar: '--background-700' },
    hover: { family: 'background', shade: 800, cssVar: '--background-800' },
    disabled: { family: 'foreground', shade: 200, cssVar: '--foreground-200' },
    rationale: 'Transparent background with visible border; fills on hover',
  },
  'button:ghost': {
    text: { family: 'foreground', shade: 300, cssVar: '--foreground-300' },
    hover: { family: 'background', shade: 900, cssVar: '--background-900' },
    disabled: { family: 'foreground', shade: 200, cssVar: '--foreground-200' },
    rationale: 'No background or border at rest; subtle fill on hover for low-emphasis actions',
  },
  'button:danger': {
    background: { family: 'danger', shade: 600, cssVar: '--danger-600' },
    text: { family: 'background', shade: 900, cssVar: '--background-900' },
    border: { family: 'danger', shade: 600, cssVar: '--danger-600' },
    hover: { family: 'danger', shade: 400, cssVar: '--danger-400' },
    active: { family: 'danger', shade: 600, cssVar: '--danger-600' },
    disabled: { family: 'foreground', shade: 300, cssVar: '--foreground-300' },
    rationale: 'Danger color signals destructive action with clear visual hierarchy',
  },
  'alert:success': {
    background: { family: 'success', shade: 100, cssVar: '--success-100' },
    text: { family: 'success', shade: 600, cssVar: '--success-600' },
    border: { family: 'success', shade: 300, cssVar: '--success-300' },
    rationale: 'Success family with light background and dark text for positive feedback',
  },
  'alert:danger': {
    background: { family: 'danger', shade: 100, cssVar: '--danger-100' },
    text: { family: 'danger', shade: 600, cssVar: '--danger-600' },
    border: { family: 'danger', shade: 300, cssVar: '--danger-300' },
    rationale: 'Danger family for error states with proper contrast',
  },
  'alert:warning': {
    background: { family: 'warning', shade: 100, cssVar: '--warning-100' },
    text: { family: 'warning', shade: 600, cssVar: '--warning-600' },
    border: { family: 'warning', shade: 300, cssVar: '--warning-300' },
    rationale: 'Warning family for cautionary messages',
  },
  'alert:info': {
    background: { family: 'info', shade: 100, cssVar: '--info-100' },
    text: { family: 'info', shade: 600, cssVar: '--info-600' },
    border: { family: 'info', shade: 300, cssVar: '--info-300' },
    rationale: 'Info family for neutral informational messages',
  },
  'input:default': {
    background: { family: 'foreground', shade: 50, cssVar: '--foreground-50' },
    text: { family: 'foreground', shade: 400, cssVar: '--foreground-400' },
    border: { family: 'foreground', shade: 300, cssVar: '--foreground-300' },
    disabled: { family: 'foreground', shade: 200, cssVar: '--foreground-200' },
    rationale: 'Light input with dark text for readability',
  },
  'input:error': {
    background: { family: 'foreground', shade: 50, cssVar: '--foreground-50' },
    text: { family: 'foreground', shade: 400, cssVar: '--foreground-400' },
    border: { family: 'danger', shade: 600, cssVar: '--danger-600' },
    rationale: 'Error state with danger border to indicate validation failure',
  },
  'badge:default': {
    background: { family: 'foreground', shade: 200, cssVar: '--foreground-200' },
    text: { family: 'foreground', shade: 400, cssVar: '--foreground-400' },
    rationale: 'Neutral badge for general labeling',
  },
  'badge:success': {
    background: { family: 'success', shade: 200, cssVar: '--success-200' },
    text: { family: 'success', shade: 600, cssVar: '--success-600' },
    rationale: 'Success badge for positive labels',
  },
  'badge:danger': {
    background: { family: 'danger', shade: 200, cssVar: '--danger-200' },
    text: { family: 'danger', shade: 600, cssVar: '--danger-600' },
    rationale: 'Danger badge for negative or destructive labels',
  },
  'card:default': {
    background: { family: 'foreground', shade: 50, cssVar: '--foreground-50' },
    text: { family: 'foreground', shade: 400, cssVar: '--foreground-400' },
    border: { family: 'foreground', shade: 200, cssVar: '--foreground-200' },
    rationale: 'Light card background with subtle border',
  },
};

export function hasColorFamily(family: string): boolean {
  return family in COLOR_FAMILIES;
}

export function getColorFamilyInfo(family: string): ColorFamilyInfo | null {
  return COLOR_FAMILIES[family] || null;
}

export function hasColorShade(family: string, shade: number): boolean {
  const info = getColorFamilyInfo(family);
  return info ? info.availableShades.includes(shade) : false;
}

export function getColorCssVar(family: string, shade: number): string | null {
  if (!hasColorShade(family, shade)) return null;
  return `--${family}-${shade}`;
}

export function getAllColorFamilies(): string[] {
  return Object.keys(COLOR_FAMILIES);
}

export function getColorFamilyShades(family: string): number[] | null {
  const info = getColorFamilyInfo(family);
  return info ? info.availableShades : null;
}

export function getColorRecommendation(componentId: string, semanticIntent: string): ColorRecommendation | null {
  return COLOR_RECOMMENDATIONS[`${componentId}:${semanticIntent}`] || null;
}

export function getAllColorRecommendations(): ColorRecommendationRegistry {
  return COLOR_RECOMMENDATIONS;
}

export function getColorFamilyWCAGLevel(family: string): 'AA' | 'AAA' | null {
  const info = getColorFamilyInfo(family);
  return info ? info.wcagLevel : null;
}
