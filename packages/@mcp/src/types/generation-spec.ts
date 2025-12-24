/**
 * Component Generation Specification
 * Defines the contract for component code generation
 *
 * This type represents a complete specification for generating isolated, modular
 * component code. Instead of passing loose parameters, agents provide a structured
 * spec that describes exactly what needs to be generated.
 */

/**
 * Design token assignment for a component
 * Specifies which design token should be used for a particular color role
 */
export interface DesignTokenAssignment {
  /** Color family (e.g., "accent", "success", "danger") */
  family: string;
  /** Shade number (50, 100, 200, ... 950) */
  shade: number;
  /** CSS variable name (e.g., "--accent-600") */
  cssVar: string;
  /** Whether this assignment has been validated */
  validated: boolean;
}

/**
 * Design configuration for a component
 * Specifies colors, spacing, and other design tokens to apply
 */
export interface ComponentDesign {
  /** Color assignments by role (e.g., "background", "text", "border") */
  colors?: Record<string, DesignTokenAssignment>;
  /** Spacing values by property */
  spacing?: Record<string, string>;
  /** Variant-specific design tokens */
  variants?: Record<string, string>;
}

/**
 * Specification for component children
 * Describes what content should be rendered inside the component
 */
export interface ChildrenSpecification {
  /** Type of children: text, component, slot, or complex */
  type: "text" | "component" | "slot" | "complex";

  /** For text children: the text content */
  content?: string | ComponentGenerationSpec | ChildrenSpecification[];

  /** For slot-based children: slot configuration */
  slotName?: string;

  /** Human-readable description of what children are acceptable */
  specification?: string;
}

/**
 * Prop value with validation metadata
 */
export interface PropValue {
  /** The actual prop value */
  value: unknown;

  /** Source of the value: literal, design-token, or variable reference */
  source: "literal" | "design-token" | "variable";

  /** Optional validation results */
  validation?: {
    valid: boolean;
    issues?: string[];
  };
}

/**
 * Component reference (for when a prop value is another component)
 */
export interface ComponentRef {
  /** Component ID */
  id: string;
  /** Optional variant */
  variant?: string;
  /** Optional props to pass to this component */
  props?: Record<string, PropValue>;
}

/**
 * The complete specification for generating a component
 *
 * Example:
 * ```typescript
 * const spec: ComponentGenerationSpec = {
 *   component: { id: "button", variant: "primary" },
 *   props: {
 *     disabled: { value: false, source: "literal" },
 *     children: { value: "Click Me", source: "literal" }
 *   },
 *   design: {
 *     colors: {
 *       background: { family: "accent", shade: 600, cssVar: "--accent-600", validated: true },
 *       text: { family: "foreground", shade: 50, cssVar: "--foreground-50", validated: true }
 *     }
 *   }
 * };
 * ```
 */
export interface ComponentGenerationSpec {
  /** What component to generate */
  component: {
    /** Component ID (e.g., "button", "input", "card") */
    id: string;
    /** Optional variant (e.g., "primary", "secondary") */
    variant?: string;
  };

  /** Props to pass to the component */
  props?: Record<string, PropValue>;

  /** How to handle children */
  children?: ChildrenSpecification;

  /** Design tokens to apply */
  design?: ComponentDesign;

  /** Metadata about the generation request */
  metadata?: {
    /** What this component is for */
    description?: string;
    /** Semantic intent (primary, danger, success, etc) */
    semanticIntent?: string;
    /** Accessibility notes */
    accessibilityNotes?: string[];
  };
}

/**
 * Validation failure in specification
 */
export interface SpecValidationIssue {
  /** Severity: error blocks generation, warning/info are advisory */
  level: "error" | "warning" | "info";
  /** What failed */
  message: string;
  /** How to fix it */
  suggestion?: string;
}

/**
 * Results from validating a spec at each stage
 */
export interface ValidationStageResult {
  valid: boolean;
  issues: SpecValidationIssue[];
}

export interface ValidationResults {
  /** Spec structure validation */
  spec: ValidationStageResult;
  /** Component existence and API validation */
  component: ValidationStageResult;
  /** Props validation */
  props: ValidationStageResult;
  /** Design token validation */
  tokens: ValidationStageResult;
  /** Children specification validation */
  children: ValidationStageResult;
  /** Combined validation status */
  overall: ValidationStageResult;
}
