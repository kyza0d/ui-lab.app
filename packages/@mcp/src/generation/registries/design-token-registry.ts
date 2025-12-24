/**
 * Design Token Registry
 * Provides metadata about available design tokens (colors, spacing, etc)
 *
 * Validators use this to check:
 * - Does a color family exist?
 * - Does a shade exist?
 * - What is the CSS variable for this token?
 */

import type { ColorRecommendationRegistry } from '../../types/index.js';

/**
 * Metadata about a color family
 */
export interface ColorFamilyInfo {
  /** Color family name */
  name: string;
  /** Available shades for this family */
  availableShades: number[];
  /** WCAG compliance level */
  wcagLevel: 'AA' | 'AAA';
  /** Recommended usage guidance */
  usageGuidance: string;
}

/**
 * Available color families
 */
const COLOR_FAMILIES: Record<string, ColorFamilyInfo> = {
  background: {
    name: 'background',
    availableShades: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
    wcagLevel: 'AA',
    usageGuidance: 'Light to medium backgrounds, avoid shades 800+ for backgrounds',
  },
  foreground: {
    name: 'foreground',
    availableShades: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
    wcagLevel: 'AA',
    usageGuidance: 'Text and borders; use 600+ for text, 50-300 for light backgrounds',
  },
  accent: {
    name: 'accent',
    availableShades: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
    wcagLevel: 'AA',
    usageGuidance: 'Primary actions and brand color; 600+ for backgrounds, 50-300 for text backgrounds',
  },
  success: {
    name: 'success',
    availableShades: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
    wcagLevel: 'AA',
    usageGuidance: 'Success states, confirmations; 50-300 for backgrounds, 600+ for text',
  },
  danger: {
    name: 'danger',
    availableShades: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
    wcagLevel: 'AA',
    usageGuidance: 'Destructive actions, errors; 50-300 for backgrounds, 600+ for text',
  },
  warning: {
    name: 'warning',
    availableShades: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
    wcagLevel: 'AA',
    usageGuidance: 'Warning states; 50-300 for backgrounds, 600+ for text',
  },
  info: {
    name: 'info',
    availableShades: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
    wcagLevel: 'AA',
    usageGuidance: 'Informational states; 50-300 for backgrounds, 600+ for text',
  },
};

/**
 * Pre-computed color recommendations for common component patterns
 * Maps "component:semantic_intent" to recommended colors
 */
const COLOR_RECOMMENDATIONS: ColorRecommendationRegistry = {
  // Button colors
  'button:primary': {
    background: { family: 'accent', shade: 600, cssVar: '--accent-600' },
    text: { family: 'foreground', shade: 50, cssVar: '--foreground-50' },
    border: { family: 'accent', shade: 700, cssVar: '--accent-700' },
    hover: { family: 'accent', shade: 700, cssVar: '--accent-700' },
    active: { family: 'accent', shade: 800, cssVar: '--accent-800' },
    disabled: { family: 'foreground', shade: 300, cssVar: '--foreground-300' },
    rationale:
      'Accent background with light text ensures strong contrast and brand recognition',
  },
  'button:secondary': {
    background: { family: 'foreground', shade: 200, cssVar: '--foreground-200' },
    text: { family: 'foreground', shade: 950, cssVar: '--foreground-950' },
    border: { family: 'foreground', shade: 300, cssVar: '--foreground-300' },
    hover: { family: 'foreground', shade: 300, cssVar: '--foreground-300' },
    active: { family: 'foreground', shade: 400, cssVar: '--foreground-400' },
    disabled: { family: 'foreground', shade: 200, cssVar: '--foreground-200' },
    rationale: 'Light background with dark text for secondary actions',
  },
  'button:danger': {
    background: { family: 'danger', shade: 600, cssVar: '--danger-600' },
    text: { family: 'foreground', shade: 50, cssVar: '--foreground-50' },
    border: { family: 'danger', shade: 700, cssVar: '--danger-700' },
    hover: { family: 'danger', shade: 700, cssVar: '--danger-700' },
    active: { family: 'danger', shade: 800, cssVar: '--danger-800' },
    disabled: { family: 'foreground', shade: 300, cssVar: '--foreground-300' },
    rationale: 'Danger color signals destructive action with clear visual hierarchy',
  },

  // Alert colors
  'alert:success': {
    background: { family: 'success', shade: 100, cssVar: '--success-100' },
    text: { family: 'success', shade: 900, cssVar: '--success-900' },
    border: { family: 'success', shade: 300, cssVar: '--success-300' },
    rationale: 'Success family with light background and dark text for positive feedback',
  },
  'alert:danger': {
    background: { family: 'danger', shade: 100, cssVar: '--danger-100' },
    text: { family: 'danger', shade: 900, cssVar: '--danger-900' },
    border: { family: 'danger', shade: 300, cssVar: '--danger-300' },
    rationale: 'Danger family for error states with proper contrast',
  },
  'alert:warning': {
    background: { family: 'warning', shade: 100, cssVar: '--warning-100' },
    text: { family: 'warning', shade: 900, cssVar: '--warning-900' },
    border: { family: 'warning', shade: 300, cssVar: '--warning-300' },
    rationale: 'Warning family for cautionary messages',
  },
  'alert:info': {
    background: { family: 'info', shade: 100, cssVar: '--info-100' },
    text: { family: 'info', shade: 900, cssVar: '--info-900' },
    border: { family: 'info', shade: 300, cssVar: '--info-300' },
    rationale: 'Info family for neutral informational messages',
  },

  // Input colors
  'input:default': {
    background: { family: 'foreground', shade: 50, cssVar: '--foreground-50' },
    text: { family: 'foreground', shade: 950, cssVar: '--foreground-950' },
    border: { family: 'foreground', shade: 300, cssVar: '--foreground-300' },
    disabled: { family: 'foreground', shade: 200, cssVar: '--foreground-200' },
    rationale: 'Light input with dark text for readability',
  },
  'input:error': {
    background: { family: 'foreground', shade: 50, cssVar: '--foreground-50' },
    text: { family: 'foreground', shade: 950, cssVar: '--foreground-950' },
    border: { family: 'danger', shade: 600, cssVar: '--danger-600' },
    rationale: 'Error state with danger border to indicate validation failure',
  },

  // Badge colors
  'badge:default': {
    background: { family: 'foreground', shade: 200, cssVar: '--foreground-200' },
    text: { family: 'foreground', shade: 900, cssVar: '--foreground-900' },
    rationale: 'Neutral badge for general labeling',
  },
  'badge:success': {
    background: { family: 'success', shade: 200, cssVar: '--success-200' },
    text: { family: 'success', shade: 900, cssVar: '--success-900' },
    rationale: 'Success badge for positive labels',
  },
  'badge:danger': {
    background: { family: 'danger', shade: 200, cssVar: '--danger-200' },
    text: { family: 'danger', shade: 900, cssVar: '--danger-900' },
    rationale: 'Danger badge for negative or destructive labels',
  },

  // Card colors
  'card:default': {
    background: { family: 'foreground', shade: 50, cssVar: '--foreground-50' },
    text: { family: 'foreground', shade: 950, cssVar: '--foreground-950' },
    border: { family: 'foreground', shade: 200, cssVar: '--foreground-200' },
    rationale: 'Light card background with subtle border',
  },
};

/**
 * Check if a color family exists
 */
export function hasColorFamily(family: string): boolean {
  return family in COLOR_FAMILIES;
}

/**
 * Get color family information
 */
export function getColorFamilyInfo(family: string): ColorFamilyInfo | null {
  return COLOR_FAMILIES[family] || null;
}

/**
 * Check if a shade exists in a color family
 */
export function hasColorShade(family: string, shade: number): boolean {
  const info = getColorFamilyInfo(family);
  return info ? info.availableShades.includes(shade) : false;
}

/**
 * Get CSS variable name for a color
 */
export function getColorCssVar(family: string, shade: number): string | null {
  if (!hasColorShade(family, shade)) {
    return null;
  }
  return `--${family}-${shade}`;
}

/**
 * Get all available color families
 */
export function getAllColorFamilies(): string[] {
  return Object.keys(COLOR_FAMILIES);
}

/**
 * Get all available shades for a color family
 */
export function getColorFamilyShades(family: string): number[] | null {
  const info = getColorFamilyInfo(family);
  return info ? info.availableShades : null;
}

/**
 * Get color recommendation for a component:intent combination
 */
export function getColorRecommendation(componentId: string, semanticIntent: string) {
  const key = `${componentId}:${semanticIntent}`;
  return COLOR_RECOMMENDATIONS[key] || null;
}

/**
 * Get all available color recommendations
 */
export function getAllColorRecommendations(): ColorRecommendationRegistry {
  return COLOR_RECOMMENDATIONS;
}

/**
 * Get WCAG compliance level for a color family
 */
export function getColorFamilyWCAGLevel(family: string): 'AA' | 'AAA' | null {
  const info = getColorFamilyInfo(family);
  return info ? info.wcagLevel : null;
}
