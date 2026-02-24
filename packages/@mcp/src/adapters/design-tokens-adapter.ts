/**
 * Design Tokens Adapter (Simplified)
 * Provides semantic color recommendations via get_semantic_color
 *
 * This adapter provides:
 * - getSemanticColor(componentId, semanticIntent): Returns ONE recommended color choice
 *   No options, no alternatives - just the right choice with rationale
 */

import { getColorRecommendation } from 'ui-lab-registry';

/**
 * Get the semantic color recommendation for a component:intent combination
 *
 * Returns a SINGLE recommended color choice with complete pairing info
 * instead of offering options for the agent to choose from.
 */
export function getSemanticColor(componentId: string, semanticIntent: string) {
  const recommendation = getColorRecommendation(componentId, semanticIntent);

  if (!recommendation) {
    return {
      success: false,
      error: `No color recommendation found for ${componentId}:${semanticIntent}`,
    };
  }

  return {
    success: true,
    componentId,
    semanticIntent,
    recommended: {
      background: recommendation.background ? {
        family: recommendation.background.family,
        shade: recommendation.background.shade,
        cssVar: recommendation.background.cssVar,
      } : null,
      text: recommendation.text ? {
        family: recommendation.text.family,
        shade: recommendation.text.shade,
        cssVar: recommendation.text.cssVar,
      } : null,
      border: recommendation.border ? {
        family: recommendation.border.family,
        shade: recommendation.border.shade,
        cssVar: recommendation.border.cssVar,
      } : null,
      hover: recommendation.hover ? {
        family: recommendation.hover.family,
        shade: recommendation.hover.shade,
        cssVar: recommendation.hover.cssVar,
      } : null,
      active: recommendation.active ? {
        family: recommendation.active.family,
        shade: recommendation.active.shade,
        cssVar: recommendation.active.cssVar,
      } : null,
      disabled: recommendation.disabled ? {
        family: recommendation.disabled.family,
        shade: recommendation.disabled.shade,
        cssVar: recommendation.disabled.cssVar,
      } : null,
    },
    rationale: recommendation.rationale,
    wcag: {
      level: 'AA',
      message: 'All recommended color combinations meet WCAG AA accessibility standards',
    },
  };
}

/**
 * Design tokens adapter singleton for compatibility
 */
export const designTokensAdapter = {
  getSemanticColor,
};
