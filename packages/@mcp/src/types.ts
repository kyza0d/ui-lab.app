import type {
  ComponentMetadata,
  ComponentCategory,
  ComponentAPI,
} from 'ui-lab-registry';

/**
 * MCP Resource Types
 */

export interface SearchComponentsParams {
  query: string;
  category?: ComponentCategory;
  limit?: number;
}

export interface ResolvedDependencies {
  npmPackages: Array<{
    name: string;
    version: string;
    components: string[];
  }>;
  internalComponents: string[];
  hasConflicts: boolean;
  conflicts?: string[];
}

export interface ComponentExample {
  basicUsage: string;
  variants?: Record<string, string>;
  accessibility?: string;
  description?: string;
}

export interface InstallationStep {
  type: 'npm-install' | 'copy-files' | 'update-imports' | 'config-update';
  command?: string;
  packages?: string[];
  source?: string;
  destination?: string;
  imports?: string[];
  description?: string;
}

export interface InstallationPlan {
  steps: InstallationStep[];
  estimatedSize: string;
  compatibilityNotes: string[];
  npmInstallCommand: string;
  imports: string[];
}

export interface ComponentCodeGenInput {
  componentId: string;
  variant?: string;
  props?: Record<string, unknown>;
  children?: string;
}

export interface ColorValue {
  hex: string;
  okch?: {
    l: number;
    c: number;
    h: number;
  };
  cssVar: string;
}

export interface ColorPalette {
  role: string;
  shades: Record<string, ColorValue>;
  cssVarNames: Record<string, string>;
}

export interface TypographyTokens {
  sizes: Record<string, string>;
  lineHeights: Record<string, number>;
  families: Record<string, string>;
  weights: Record<string, number>;
}

export interface SpacingTokens {
  scale: number[];
  cssVars: Record<string, string>;
  presets: Record<string, number>;
}

export interface DesignTokens {
  colors?: Record<string, ColorPalette>;
  typography?: TypographyTokens;
  spacing?: SpacingTokens;
  sizing?: SpacingTokens;
}

/**
 * MCP Tool Input/Output Types
 */

export interface SearchComponentsInput {
  query: string;
  category?: string;
  limit?: number;
}

export interface SearchComponentsOutput {
  components: ComponentMetadata[];
  count: number;
}

export interface GetComponentDetailsInput {
  component_id: string;
}

export interface GetComponentDetailsOutput extends ComponentMetadata {}

export interface GetComponentApiInput {
  component_id: string;
}

export interface GetComponentApiOutput extends ComponentAPI {}

export interface ResolveDependenciesInput {
  component_ids: string[];
}

export interface ResolveDependenciesOutput extends ResolvedDependencies {}

export interface GenerateComponentCodeInput {
  component_id: string;
  variant?: string;
  props?: Record<string, unknown>;
  children?: string;
}

export interface GenerateComponentCodeOutput {
  code: string;
  imports: string[];
  description: string;
}

export interface GetInstallationPlanInput {
  component_ids: string[];
  project_context?: {
    framework?: string;
    packageManager?: string;
  };
}

export interface GetInstallationPlanOutput extends InstallationPlan {}

export interface GetComponentExamplesInput {
  component_id: string;
  pattern?: string;
}

export interface GetComponentExamplesOutput extends ComponentExample {}

export interface GetDesignTokensInput {
  token_type: 'colors' | 'typography' | 'spacing' | 'sizing';
  options?: {
    role?: string;
    [key: string]: unknown;
  };
}

export interface GetDesignTokensOutput extends DesignTokens {}

/**
 * Design System Types
 */

export interface ColorGuidanceRule {
  recommendedShades: number[];
  pairing?: {
    family: string;
    shades: number[];
  };
  rationale: string;
}

export interface GetColorGuidanceInput {
  context: 'button' | 'alert' | 'badge' | 'input' | 'link' | 'text' | 'border' | 'background';
  semantic_intent: 'primary' | 'success' | 'danger' | 'warning' | 'info' | 'neutral';
  include_examples?: boolean;
}

export interface ColorGuidanceExample {
  title: string;
  code: string;
  cssVars: Record<string, string>;
}

export interface GetColorGuidanceOutput {
  context: string;
  semanticIntent: string;
  recommendedColorFamily: string;
  shadeGuidance: {
    lightShades: { shades: number[]; use: string };
    mediumShades: { shades: number[]; use: string };
    darkShades: { shades: number[]; use: string };
  };
  commonUsages: Array<{
    component: string;
    role: string;
    recommendedShades: number[];
    pairing?: { family: string; shades: number[] };
  }>;
  accessibility: {
    wcagLevel: string;
    minContrastRatio: number;
    requiredPairings: string[];
  };
  examples?: ColorGuidanceExample[];
  doNotUse: string[];
}

export interface ValidateColorUsageInput {
  color_family: string;
  shade: number;
  usage_context: 'button-background' | 'text' | 'border' | 'background' | 'hover' | 'active' | 'error-indicator';
  paired_colors?: string[];
}

export interface ColorValidationIssue {
  level: 'error' | 'warning' | 'info';
  message: string;
  recommendation?: string;
}

export interface ValidateColorUsageOutput {
  valid: boolean;
  colorFamily: string;
  shade: number;
  cssVar: string;
  issues: ColorValidationIssue[];
  accessibility: {
    wcagCompliant: boolean;
    contrastRatios?: Record<string, number>;
    requiredText?: string;
  };
  semanticMatch: {
    appropriate: boolean;
    reason: string;
    alternatives?: string[];
  };
}

export interface ComponentDesignGuidance {
  colorUsage?: {
    primary?: {
      family: string;
      role: 'background' | 'text' | 'border';
      recommendedShades: number[];
      rationale: string;
    };
    secondary?: {
      family: string;
      role: 'background' | 'text' | 'border';
      recommendedShades: number[];
      rationale: string;
    };
    states?: {
      hover?: { family: string; shade: number };
      active?: { family: string; shade: number };
      disabled?: { family: string; shade: number };
      error?: { family: string; shade: number };
    };
  };
  examples?: Array<{
    title: string;
    description: string;
    code: string;
    semanticColors: { property: string; cssVar: string }[];
  }>;
  accessibility?: {
    wcagLevel: 'AA' | 'AAA';
    requiredPairings: string[];
    notes: string[];
  };
}

export interface ToolInputs {
  search_components: SearchComponentsInput;
  get_component_details: GetComponentDetailsInput;
  get_component_api: GetComponentApiInput;
  resolve_dependencies: ResolveDependenciesInput;
  generate_component_code: GenerateComponentCodeInput;
  get_installation_plan: GetInstallationPlanInput;
  get_component_examples: GetComponentExamplesInput;
  get_design_tokens: GetDesignTokensInput;
  get_color_guidance: GetColorGuidanceInput;
  validate_color_usage: ValidateColorUsageInput;
  iterate_ui_to_lab_components: IterateUIRequest;
}

export interface ToolOutputs {
  search_components: SearchComponentsOutput;
  get_component_details: GetComponentDetailsOutput;
  get_component_api: GetComponentApiOutput;
  resolve_dependencies: ResolveDependenciesOutput;
  generate_component_code: GenerateComponentCodeOutput;
  get_installation_plan: GetInstallationPlanOutput;
  get_component_examples: GetComponentExamplesOutput;
  get_design_tokens: GetDesignTokensOutput;
  get_color_guidance: GetColorGuidanceOutput;
  validate_color_usage: ValidateColorUsageOutput;
  iterate_ui_to_lab_components: IterateUIResult;
}

/**
 * UI Iteration Orchestration Types
 */

export interface IterateUIRequest {
  file_path: string;
  context?: string;
  options?: {
    analyzeOnly?: boolean;
    preserveExisting?: boolean;
    [key: string]: unknown;
  };
}

export interface ComponentChoice {
  component: string;
  reasoning: string;
  relevantProps: Record<string, unknown>;
}

export interface DesignPlan {
  currentAnalysis: string;
  proposedImprovements: string;
  componentChoices: Record<string, ComponentChoice>;
  designTokens: {
    backgrounds: string[];
    foregrounds: string[];
    borders: string[];
  };
}

export interface UIImplementation {
  code: string;
  imports: string[];
  dependencies: string[];
  cssVariables: string[];
}

export interface ComponentValidationResult {
  [key: string]: boolean;
}

export interface TokenValidationResult {
  [key: string]: boolean;
}

export interface WCAGValidation {
  level: string;
  issues: string[];
}

export interface DesignValidation {
  componentValidation: ComponentValidationResult;
  tokenValidation: TokenValidationResult;
  wcagCompliance: WCAGValidation;
}

export interface IterateUIResult {
  designPlan: DesignPlan;
  implementation: UIImplementation;
  validation: DesignValidation;
}
