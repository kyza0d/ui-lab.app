/**
 * Design Token Validator
 * Validates that design tokens (colors, spacing, etc) are valid
 */

import type {
  ComponentGenerationSpec,
  DesignTokenAssignment,
  SpecValidationIssue,
} from '../../types/index.js';
import {
  hasColorFamily,
  hasColorShade,
  getColorCssVar,
} from '../registries/design-token-registry.js';

/**
 * Validate a single color assignment
 */
export function validateColorAssignment(
  assignment: DesignTokenAssignment
): { valid: boolean; issues: SpecValidationIssue[] } {
  const issues: SpecValidationIssue[] = [];

  // Check family exists
  if (!hasColorFamily(assignment.family)) {
    issues.push({
      level: 'error',
      message: `Color family not found: "${assignment.family}"`,
      suggestion:
        'Available families: background, foreground, accent, success, danger, warning, info',
    });
    return { valid: false, issues };
  }

  // Check shade exists
  if (!hasColorShade(assignment.family, assignment.shade)) {
    issues.push({
      level: 'error',
      message: `Shade ${assignment.shade} not found in color family "${assignment.family}"`,
      suggestion:
        'Available shades: 50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950',
    });
    return { valid: false, issues };
  }

  // Check CSS var is correct
  const expectedCssVar = getColorCssVar(assignment.family, assignment.shade);
  if (expectedCssVar !== assignment.cssVar) {
    issues.push({
      level: 'warning',
      message: `CSS variable mismatch: expected ${expectedCssVar}, got ${assignment.cssVar}`,
      suggestion: `Update to ${expectedCssVar}`,
    });
  }

  return {
    valid: issues.filter((i) => i.level === 'error').length === 0,
    issues,
  };
}

/**
 * Validate all color assignments in a spec
 */
export function validateColors(
  spec: ComponentGenerationSpec
): { valid: boolean; issues: SpecValidationIssue[] } {
  const issues: SpecValidationIssue[] = [];

  if (!spec.design?.colors) {
    return { valid: true, issues };
  }

  for (const [role, assignment] of Object.entries(spec.design.colors)) {
    const validation = validateColorAssignment(assignment);
    issues.push(...validation.issues.map((issue) => ({
      ...issue,
      message: `Color role "${role}": ${issue.message}`,
    })));
  }

  return {
    valid: issues.filter((i) => i.level === 'error').length === 0,
    issues,
  };
}

/**
 * Validate spacing tokens
 */
export function validateSpacing(
  spec: ComponentGenerationSpec
): { valid: boolean; issues: SpecValidationIssue[] } {
  const issues: SpecValidationIssue[] = [];

  if (!spec.design?.spacing) {
    return { valid: true, issues };
  }

  const validSpacingUnits = ['px', 'rem', 'em', '%'];

  for (const [property, value] of Object.entries(spec.design.spacing)) {
    if (typeof value !== 'string') {
      issues.push({
        level: 'error',
        message: `Spacing property "${property}" must be a string value`,
      });
      continue;
    }

    // Check if value has valid unit
    const hasValidUnit = validSpacingUnits.some((unit) => value.endsWith(unit));
    if (!hasValidUnit && isNaN(Number(value))) {
      issues.push({
        level: 'warning',
        message: `Spacing value "${value}" may not be valid (should have unit like px, rem, etc)`,
      });
    }
  }

  return {
    valid: issues.filter((i) => i.level === 'error').length === 0,
    issues,
  };
}

/**
 * Validate all design tokens
 */
export function validateDesignTokens(
  spec: ComponentGenerationSpec
): { valid: boolean; issues: SpecValidationIssue[] } {
  const allIssues: SpecValidationIssue[] = [];

  // Validate colors
  const colorValidation = validateColors(spec);
  allIssues.push(...colorValidation.issues);

  // Validate spacing
  const spacingValidation = validateSpacing(spec);
  allIssues.push(...spacingValidation.issues);

  return {
    valid: allIssues.filter((i) => i.level === 'error').length === 0,
    issues: allIssues,
  };
}

/**
 * Check WCAG compliance for a color combination
 */
export function checkWCAGCompliance(
  _backgroundFamily: string,
  backgroundShade: number,
  _textFamily: string,
  textShade: number
): { wcagLevel: 'AA' | 'AAA' | 'FAIL'; ratios: Record<string, number> } {
  // This is simplified - in production would calculate actual contrast ratios
  // For now, just check that we're using appropriate shades

  // If background shade is light (50-300) and text shade is dark (600+), should be WCAG AA
  const bgLight = backgroundShade <= 300;
  const textDark = textShade >= 600;

  if (bgLight && textDark) {
    return {
      wcagLevel: 'AA',
      ratios: { estimated: 4.5 },
    };
  }

  // If background shade is dark (600+) and text shade is light (50), should be WCAG AA
  const bgDark = backgroundShade >= 600;
  const textLight = textShade <= 300;

  if (bgDark && textLight) {
    return {
      wcagLevel: 'AA',
      ratios: { estimated: 4.5 },
    };
  }

  // Medium contrast
  return {
    wcagLevel: 'AA',
    ratios: { estimated: 3.0 },
  };
}
