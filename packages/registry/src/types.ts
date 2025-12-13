export type ComponentCategory =
  | 'input'
  | 'display'
  | 'feedback'
  | 'navigation'
  | 'container'
  | 'action'
  | 'composition'
  | 'layout'
  | 'data';

export interface ComponentSource {
  packageName: 'ui-lab-components';
  exportName: string;
  packagePath: string;
}

export interface PropDefinition {
  name: string;
  type: string;
  required: boolean;
  defaultValue?: string;
  description?: string;
  enumValues?: string[];
}

export interface ComponentAPI {
  props: PropDefinition[];
  subComponents?: Record<string, PropDefinition[]>;
}

export interface StyleVariable {
  name: string;
  defaultValue?: string;
}

export interface StyleClass {
  name: string;
  description?: string;
}

export interface ComponentStyles {
  cssVariables: StyleVariable[];
  classes: StyleClass[];
  variants?: Record<string, string[]>;
  sizes?: string[];
}

export interface ComponentMetadata {
  id: string;
  name: string;
  description: string;
  category: ComponentCategory;
  source: ComponentSource;
  relatedComponents: string[];
  tags?: string[];
  accessibility?: {
    hasAriaSupport: boolean;
    notes?: string[];
  };
  reactAriaUrl?: string;
  api?: ComponentAPI;
  styles?: ComponentStyles;
}

export interface ComponentRegistry {
  [componentId: string]: ComponentMetadata;
}

export interface CategoryDefinition {
  id: ComponentCategory;
  name: string;
  label: string;
  description: string;
  icon?: string;
}

export interface StarterPreset {
  templateName: 'next' | 'vite' | 'tauri';
  components: string[];
  description: string;
}
