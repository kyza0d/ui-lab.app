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
  packageName: 'ui-lab-component';
  exportName: string;
  packagePath: string;
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
