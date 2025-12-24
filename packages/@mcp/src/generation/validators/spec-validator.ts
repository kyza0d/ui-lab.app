/**
 * Specification Validator
 * Validates that a ComponentGenerationSpec has the correct structure and required fields
 *
 * This is the first validation step - if the spec structure is invalid,
 * we can't proceed to the next validation steps.
 */

import type {
  ComponentGenerationSpec,
  SpecValidationIssue,
} from '../../types/index.js';

/**
 * Validate the structure and format of a specification
 */
export function validateSpec(spec: unknown): {
  valid: boolean;
  issues: SpecValidationIssue[];
} {
  const issues: SpecValidationIssue[] = [];

  // Check if spec is an object
  if (typeof spec !== 'object' || spec === null) {
    issues.push({
      level: 'error',
      message: 'Specification must be an object',
      suggestion: 'Pass a JSON object with component and props properties',
    });
    return { valid: false, issues };
  }

  const s = spec as Record<string, unknown>;

  // Check required field: component
  if (!s.component) {
    issues.push({
      level: 'error',
      message: 'Missing required field: component',
      suggestion: 'Add component: { id: "button" } or similar',
    });
  } else if (typeof s.component !== 'object' || s.component === null) {
    issues.push({
      level: 'error',
      message: 'component must be an object',
      suggestion: 'component should be { id: "componentName", variant?: "variantName" }',
    });
  } else {
    const component = s.component as Record<string, unknown>;
    if (!component.id || typeof component.id !== 'string') {
      issues.push({
        level: 'error',
        message: 'component.id must be a non-empty string',
        suggestion: 'Example: component: { id: "button" }',
      });
    }
    if (component.variant !== undefined && typeof component.variant !== 'string') {
      issues.push({
        level: 'error',
        message: 'component.variant must be a string if provided',
        suggestion: 'Example: component: { id: "button", variant: "primary" }',
      });
    }
  }

  // Check optional field: props
  if (s.props !== undefined && (typeof s.props !== 'object' || s.props === null)) {
    issues.push({
      level: 'error',
      message: 'props must be an object if provided',
      suggestion: 'props should be { propName: { value: ..., source: "literal" } }',
    });
  } else if (s.props && typeof s.props === 'object') {
    const props = s.props as Record<string, unknown>;
    for (const [propName, propValue] of Object.entries(props)) {
      if (typeof propValue !== 'object' || propValue === null) {
        issues.push({
          level: 'error',
          message: `prop "${propName}" must be an object with value and source`,
          suggestion: 'Example: { value: "text", source: "literal" }',
        });
      } else {
        const pv = propValue as Record<string, unknown>;
        if (pv.value === undefined) {
          issues.push({
            level: 'error',
            message: `prop "${propName}" missing required field: value`,
          });
        }
        if (!pv.source || typeof pv.source !== 'string') {
          issues.push({
            level: 'error',
            message: `prop "${propName}" missing required field: source`,
            suggestion: 'source should be "literal", "design-token", or "variable"',
          });
        } else if (!['literal', 'design-token', 'variable'].includes(pv.source as string)) {
          issues.push({
            level: 'error',
            message: `prop "${propName}" has invalid source: ${pv.source}`,
            suggestion: 'source must be "literal", "design-token", or "variable"',
          });
        }
      }
    }
  }

  // Check optional field: children
  if (s.children !== undefined && (typeof s.children !== 'object' || s.children === null)) {
    issues.push({
      level: 'error',
      message: 'children must be an object if provided',
      suggestion: 'children should be { type: "text", content: "..." }',
    });
  } else if (s.children && typeof s.children === 'object') {
    const children = s.children as Record<string, unknown>;
    if (!children.type || typeof children.type !== 'string') {
      issues.push({
        level: 'error',
        message: 'children.type is required and must be a string',
        suggestion: 'type should be "text", "component", "slot", or "complex"',
      });
    } else if (!['text', 'component', 'slot', 'complex'].includes(children.type as string)) {
      issues.push({
        level: 'error',
        message: `children.type has invalid value: ${children.type}`,
        suggestion: 'type must be "text", "component", "slot", or "complex"',
      });
    }
  }

  // Check optional field: design
  if (s.design !== undefined && (typeof s.design !== 'object' || s.design === null)) {
    issues.push({
      level: 'error',
      message: 'design must be an object if provided',
      suggestion: 'design should be { colors: { ... }, spacing: { ... } }',
    });
  } else if (s.design && typeof s.design === 'object') {
    const design = s.design as Record<string, unknown>;

    // Validate colors if present
    if (design.colors !== undefined && (typeof design.colors !== 'object' || design.colors === null)) {
      issues.push({
        level: 'error',
        message: 'design.colors must be an object if provided',
      });
    }

    // Validate spacing if present
    if (
      design.spacing !== undefined &&
      (typeof design.spacing !== 'object' || design.spacing === null)
    ) {
      issues.push({
        level: 'error',
        message: 'design.spacing must be an object if provided',
      });
    }
  }

  // Check optional field: metadata
  if (s.metadata !== undefined && (typeof s.metadata !== 'object' || s.metadata === null)) {
    issues.push({
      level: 'error',
      message: 'metadata must be an object if provided',
    });
  }

  return {
    valid: issues.filter((i) => i.level === 'error').length === 0,
    issues,
  };
}

/**
 * Safely parse and validate a spec from any input
 */
export function parseAndValidateSpec(
  input: unknown
): { spec: ComponentGenerationSpec | null; valid: boolean; issues: SpecValidationIssue[] } {
  const validation = validateSpec(input);

  if (!validation.valid) {
    return {
      spec: null,
      valid: false,
      issues: validation.issues,
    };
  }

  return {
    spec: input as ComponentGenerationSpec,
    valid: true,
    issues: [],
  };
}
