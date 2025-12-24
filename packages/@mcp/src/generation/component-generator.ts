/**
 * Component Code Generator
 * The main entry point for component code generation
 *
 * This generator orchestrates the validators and engines to produce
 * reliable, modular component code from a specification.
 *
 * Flow:
 * 1. Parse and validate spec structure
 * 2. Validate component exists and API is correct
 * 3. Validate design tokens
 * 4. Generate code
 * 5. Return result with validation details
 */

import type {
  ComponentGenerationSpec,
  ComponentGenerationResult,
  ValidationResults,
  SpecValidationIssue,
  ValidationStageResult,
} from '../types/index.js';
import { parseAndValidateSpec } from './validators/spec-validator.js';
import { validateComponentAPI } from './validators/component-api-validator.js';
import { validateDesignTokens } from './validators/design-token-validator.js';
import { generateBaseComponentJSX, formatComponentName } from './engines/base-component-engine.js';
import { buildPropsString } from './engines/props-engine.js';
import { buildElementWithChildren } from './engines/children-engine.js';
import { generateCompleteStyles, generateTokenImports } from './engines/styling-engine.js';

/**
 * Generate component code from a specification
 */
export async function generateComponentCode(
  specInput: unknown
): Promise<ComponentGenerationResult> {
  const now = new Date().toISOString();
  const emptyStageResult: ValidationStageResult = { valid: true, issues: [] as SpecValidationIssue[] };
  const allValidationIssues: ValidationResults = {
    spec: { ...emptyStageResult },
    component: { ...emptyStageResult },
    props: { ...emptyStageResult },
    tokens: { ...emptyStageResult },
    children: { ...emptyStageResult },
    overall: { ...emptyStageResult },
  };

  // Step 1: Parse and validate spec structure
  const specValidation = parseAndValidateSpec(specInput);
  allValidationIssues.spec.issues = specValidation.issues;
  allValidationIssues.spec.valid = specValidation.valid;

  if (!specValidation.valid) {
    return {
      success: false,
      code: '',
      imports: [],
      specification: (specInput as any) || { component: { id: 'unknown' } },
      validation: allValidationIssues as ValidationResults,
      metadata: {
        generatedAt: now,
        engine: 'component-generator',
        estimatedComplexity: 'simple',
      },
    };
  }

  const spec = specValidation.spec!;

  // Step 2: Validate component API
  const apiValidation = validateComponentAPI(spec);
  allValidationIssues.component.issues = apiValidation.issues;
  allValidationIssues.component.valid = apiValidation.valid;

  if (!apiValidation.valid) {
    return {
      success: false,
      code: '',
      imports: [],
      specification: spec,
      validation: allValidationIssues as ValidationResults,
      metadata: {
        generatedAt: now,
        engine: 'component-generator',
        estimatedComplexity: 'simple',
      },
    };
  }

  // Step 3: Validate design tokens
  const tokenValidation = validateDesignTokens(spec);
  allValidationIssues.tokens.issues = tokenValidation.issues;
  allValidationIssues.tokens.valid = tokenValidation.valid;

  if (!tokenValidation.valid) {
    return {
      success: false,
      code: '',
      imports: [],
      specification: spec,
      validation: allValidationIssues as ValidationResults,
      metadata: {
        generatedAt: now,
        engine: 'component-generator',
        estimatedComplexity: 'simple',
      },
    };
  }

  // Step 4: Generate code
  try {
    const componentName = formatComponentName(spec.component.id);
    generateBaseComponentJSX(spec); // Validate but don't use result yet
    const propsString = buildPropsString(spec);
    const styles = generateCompleteStyles(spec);
    const tokenImports = generateTokenImports(styles.cssVars);

    // Combine props and styles
    let openingTag = `<${componentName}`;
    if (spec.component.variant) {
      openingTag += `\n  variant="${spec.component.variant}"`;
    }
    openingTag += propsString;
    openingTag += ' >';

    // Build element with children
    const code = buildElementWithChildren(
      openingTag,
      spec.children,
      `</${componentName}>`
    );

    // Collect all imports
    const imports = [
      `import { ${componentName} } from '@ui-lab/components'`,
      ...tokenImports,
    ].filter((imp) => imp.length > 0);

    allValidationIssues.overall.valid = true;
    allValidationIssues.overall.issues = [];

    return {
      success: true,
      code,
      imports,
      specification: spec,
      validation: allValidationIssues as ValidationResults,
      metadata: {
        generatedAt: now,
        engine: 'component-generator',
        estimatedComplexity: estimateComplexity(spec),
      },
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error during code generation';
    allValidationIssues.overall.valid = false;
    allValidationIssues.overall.issues = [
      {
        level: 'error',
        message: `Code generation failed: ${errorMessage}`,
      },
    ];

    return {
      success: false,
      code: '',
      imports: [],
      specification: spec,
      validation: allValidationIssues as ValidationResults,
      metadata: {
        generatedAt: now,
        engine: 'component-generator',
        estimatedComplexity: 'simple',
      },
    };
  }
}

/**
 * Estimate the complexity of the generated component
 */
function estimateComplexity(spec: ComponentGenerationSpec): 'simple' | 'moderate' | 'complex' {
  let complexity = 0;

  // Props complexity
  if (spec.props) {
    complexity += Object.keys(spec.props).length;
  }

  // Children complexity
  if (spec.children) {
    complexity += 1;
    if (spec.children.type === 'complex') {
      complexity += 2;
    }
  }

  // Design complexity
  if (spec.design) {
    if (spec.design.colors) {
      complexity += Object.keys(spec.design.colors).length;
    }
    if (spec.design.spacing) {
      complexity += Object.keys(spec.design.spacing).length;
    }
  }

  if (complexity >= 8) {
    return 'complex';
  }
  if (complexity >= 4) {
    return 'moderate';
  }
  return 'simple';
}
