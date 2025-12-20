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

export interface ToolInputs {
  search_components: SearchComponentsInput;
  get_component_details: GetComponentDetailsInput;
  get_component_api: GetComponentApiInput;
  resolve_dependencies: ResolveDependenciesInput;
  generate_component_code: GenerateComponentCodeInput;
  get_installation_plan: GetInstallationPlanInput;
  get_component_examples: GetComponentExamplesInput;
  get_design_tokens: GetDesignTokensInput;
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
}
