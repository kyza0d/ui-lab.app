/**
 * Component Generation Result
 * Defines what the generation engine returns after processing a spec
 */

import type { ComponentGenerationSpec, ValidationResults } from './generation-spec.js';

/**
 * Metadata about the generated code
 */
export interface GenerationMetadata {
  /** When the code was generated */
  generatedAt: string;
  /** Which generation engine produced this */
  engine: string;
  /** Estimated complexity of the generated component */
  estimatedComplexity: "simple" | "moderate" | "complex";
}

/**
 * The complete result of code generation
 *
 * If success is true, the code is ready to use.
 * If success is false, check validation.overall.issues for what needs to be fixed.
 */
export interface ComponentGenerationResult {
  /** Whether generation succeeded */
  success: boolean;

  /** The generated TypeScript/TSX code (empty if generation failed) */
  code: string;

  /** Import statements needed for this code */
  imports: string[];

  /** The specification that was used to generate this code */
  specification: ComponentGenerationSpec;

  /** Validation results at each stage */
  validation: ValidationResults;

  /** Metadata about the generation */
  metadata: GenerationMetadata;
}

/**
 * The result of transforming an entire UI file
 * Combines analysis, mapping, and code generation
 */
export interface UITransformationResult {
  /** Whether transformation succeeded */
  success: boolean;

  /** Analysis of the original file */
  analysis: {
    patterns: Array<{
      type: string;
      location: string;
      description: string;
    }>;
    statistics: {
      totalPatterns: number;
      recognizedPatterns: number;
      unmappedPatterns: number;
    };
  };

  /** Mapping of detected patterns to components */
  mapping: Array<{
    pattern: string;
    component: string | null; // null means this pattern should be skipped
    reasoning: string;
  }>;

  /** Generated code for the transformed UI */
  code: string;

  /** All imports needed */
  imports: string[];

  /** Validation results */
  validation: {
    valid: boolean;
    issues: Array<{
      level: "error" | "warning" | "info";
      message: string;
    }>;
  };

  /** Human-readable report */
  report: {
    summary: string;
    changesApplied: string[];
    potentialIssues: string[];
  };
}
