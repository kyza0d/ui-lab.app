/**
 * Type System for UI Lab MCP
 * Central export for all type definitions
 */

// Generation specification
export type {
  DesignTokenAssignment,
  ComponentDesign,
  ChildrenSpecification,
  PropValue,
  ComponentRef,
  ComponentGenerationSpec,
  SpecValidationIssue,
  ValidationResults,
  ValidationStageResult,
} from './generation-spec.js';

// Generation results
export type {
  GenerationMetadata,
  ComponentGenerationResult,
  UITransformationResult,
} from './generation-result.js';

// Component metadata
export type {
  PropMetadata,
  ChildrenMetadata,
  ComponentAPIRegistry,
  ColorRecommendation,
  ColorRecommendationRegistry,
  AccessibilityInfo,
} from './component-metadata.js';
