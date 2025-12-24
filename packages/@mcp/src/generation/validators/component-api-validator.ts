/**
 * Component API Validator
 * Validates that:
 * - The component exists
 * - Props are valid for the component
 * - Children specification matches what the component allows
 */

import type {
  ComponentGenerationSpec,
  SpecValidationIssue,
} from '../../types/index.js';
import {
  getComponentRegistry,
  hasComponent,
  isPropValid,
} from '../registries/component-props-registry.js';
import {
  isValidChildrenSpec,
  describeAllowedChildren,
  componentAllowsChildren,
} from '../registries/component-children-rules.js';

/**
 * Validate that the component exists
 */
export function validateComponentExists(
  spec: ComponentGenerationSpec
): { valid: boolean; issues: SpecValidationIssue[] } {
  const issues: SpecValidationIssue[] = [];
  const componentId = spec.component.id;

  if (!hasComponent(componentId)) {
    issues.push({
      level: 'error',
      message: `Component not found: "${componentId}"`,
      suggestion: `Available components: button, input, card, badge, alert, label, tabs, dialog, menu, select, popover, tooltip, divider, flex, grid`,
    });
  }

  return {
    valid: issues.length === 0,
    issues,
  };
}

/**
 * Validate props against component API
 */
export function validateProps(
  spec: ComponentGenerationSpec
): { valid: boolean; issues: SpecValidationIssue[] } {
  const issues: SpecValidationIssue[] = [];
  const componentId = spec.component.id;
  const registry = getComponentRegistry(componentId);

  if (!registry) {
    // Component not found in registry - can't validate props
    issues.push({
      level: 'error',
      message: `Component not found in registry: "${componentId}"`,
    });
    return { valid: false, issues };
  }

  // Check that all provided props are valid for this component
  if (spec.props) {
    for (const [propName] of Object.entries(spec.props)) {
      if (!isPropValid(componentId, propName)) {
        const accepted = registry.acceptedProps.join(', ');
        issues.push({
          level: 'error',
          message: `Invalid prop "${propName}" for component "${componentId}"`,
          suggestion: `Accepted props: ${accepted}`,
        });
      }
    }
  }

  // Check that all required props are provided
  for (const requiredProp of registry.requiredProps) {
    if (!spec.props || !(requiredProp in spec.props)) {
      issues.push({
        level: 'error',
        message: `Required prop missing: "${requiredProp}"`,
        suggestion: `Add "${requiredProp}" to props`,
      });
    }
  }

  return {
    valid: issues.filter((i) => i.level === 'error').length === 0,
    issues,
  };
}

/**
 * Validate children specification
 */
export function validateChildren(
  spec: ComponentGenerationSpec
): { valid: boolean; issues: SpecValidationIssue[] } {
  const issues: SpecValidationIssue[] = [];
  const componentId = spec.component.id;

  // If no children specified, check if component allows them
  if (!spec.children) {
    if (!componentAllowsChildren(componentId)) {
      // Component doesn't allow children and none specified - OK
      return { valid: true, issues };
    }
    // Component allows children but none specified - OK (optional)
    return { valid: true, issues };
  }

  // Component has children specified
  const childrenType = spec.children.type;

  // Check if this type of children is valid
  if (!isValidChildrenSpec(componentId, childrenType)) {
    issues.push({
      level: 'error',
      message: `Invalid children type "${childrenType}" for component "${componentId}"`,
      suggestion: describeAllowedChildren(componentId),
    });
  }

  // Validate children content based on type
  if (childrenType === 'text') {
    if (!spec.children.content || typeof spec.children.content !== 'string') {
      issues.push({
        level: 'error',
        message: 'Text children must have a content string',
        suggestion: 'Add content: "your text here"',
      });
    }
  } else if (childrenType === 'component') {
    if (!spec.children.content || typeof spec.children.content !== 'object') {
      issues.push({
        level: 'error',
        message: 'Component children must have a ComponentGenerationSpec in content',
      });
    }
  } else if (childrenType === 'slot') {
    if (!spec.children.slotName) {
      issues.push({
        level: 'error',
        message: 'Slot children must specify slotName',
        suggestion: 'Add slotName: "slotName"',
      });
    }
  } else if (childrenType === 'complex') {
    if (!spec.children.content || !Array.isArray(spec.children.content)) {
      issues.push({
        level: 'error',
        message: 'Complex children must have an array of child specifications in content',
      });
    }
  }

  return {
    valid: issues.filter((i) => i.level === 'error').length === 0,
    issues,
  };
}

/**
 * Validate entire component API (exists, props, children)
 */
export function validateComponentAPI(
  spec: ComponentGenerationSpec
): { valid: boolean; issues: SpecValidationIssue[] } {
  const allIssues: SpecValidationIssue[] = [];

  // First check component exists
  const componentValidation = validateComponentExists(spec);
  allIssues.push(...componentValidation.issues);

  if (!componentValidation.valid) {
    return { valid: false, issues: allIssues };
  }

  // Then validate props and children
  const propsValidation = validateProps(spec);
  const childrenValidation = validateChildren(spec);

  allIssues.push(...propsValidation.issues);
  allIssues.push(...childrenValidation.issues);

  return {
    valid: allIssues.filter((i) => i.level === 'error').length === 0,
    issues: allIssues,
  };
}
