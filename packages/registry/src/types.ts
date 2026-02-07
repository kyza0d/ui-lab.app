export type ComponentCategory =
  | 'input'
  | 'information'
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
  examples?: ComponentExample[];
}

export interface StyleVariable {
  name: string;
  defaultValue?: string;
}

export interface StyleClass {
  name: string;
  description?: string;
}

export type ComponentStyles = string;

export interface ComponentExample {
  title?: string;
  name?: string;
  description: string;
  code: string;
  preview?: string;
}

export interface Example {
  id: string;
  title: string;
  description: string;
  code: string;
  tags?: string[];
}

export interface ElementFile {
  filename: string;
  language: string;
  code: string;
  description?: string;
  isEntryPoint?: boolean;
}

export interface ElementVariant {
  name: string;
  description: string;
  code?: string;
  demoPath?: string;
  files?: ElementFile[];
}

export interface LayoutConfig {
  layoutClass: string;
  columnSpan: number;
  rowSpan: number;
  previewConfig?: {
    scale?: number;
    maxHeight?: string;
    centeringStrategy?: 'full' | 'horizontal' | 'none';
    adaptiveProps?: Record<string, boolean | string | number>;
  };
}

export interface ElementMetadata {
  id: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  variants: ElementVariant[];
  componentDependencies?: string[];
  layout?: Partial<LayoutConfig>;
}

export interface ElementRegistry {
  [elementId: string]: ElementMetadata;
}

export interface PricingInfo {
  price: number | null;
  features?: string[];
  purchaseUrl?: string;
  gumroadProductId?: string;
}

export interface ElementPackageMetadata {
  id: string;
  name: string;
  description: string;
  tags: string[];
  elements: string[];
  layout?: Partial<LayoutConfig>;
  getPreview?: () => React.ComponentType<object>;
  pricing?: PricingInfo;
  gumroadProductId?: string;
  bundledIn?: string[];
}

export interface ElementPackageRegistry {
  [packageId: string]: ElementPackageMetadata;
}

export interface SectionVariant {
  name: string;
  description: string;
  code?: string;
  demoPath?: string;
  files?: ElementFile[];
}

export interface SectionMetadata {
  id: string;
  name: string;
  description: string;
  category: 'hero' | 'cta' | 'features' | 'testimonials' | 'pricing' | 'faq' | 'contact' | 'other';
  tags: string[];
  variants: SectionVariant[];
  componentDependencies?: string[];
  layout?: Partial<LayoutConfig>;
  fullPageLayout?: boolean;
}

export interface SectionRegistry {
  [sectionId: string]: SectionMetadata;
}

export interface StarterVariant {
  name: string;
  description: string;
  code?: string;
  demoPath?: string;
  files?: ElementFile[];
}

export interface StarterMetadata {
  id: string;
  name: string;
  description: string;
  category: 'landing' | 'dashboard' | 'auth' | 'app' | 'framework' | 'documentation' | 'productivity' | 'crm' | 'other';
  tags: string[];
  files: ElementFile[];
  componentDependencies?: string[];
  layout?: Partial<LayoutConfig>;
  fullPageLayout?: boolean;
  pricing?: PricingInfo;
  bundledElements?: string[];
  gumroadProductId?: string;
}

export interface StarterRegistry {
  [starterId: string]: StarterMetadata;
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
  examples?: ComponentExample[];
  example?: Example;
  experimental?: boolean;
}

export interface ComponentRegistry {
  [componentId: string]: ComponentMetadata;
}

export interface CategoryDefinition {
  id: ComponentCategory;
  name: string;
  label: string;
  description: string;
  iconName: string;
}

export interface StarterPreset {
  templateName: 'next' | 'vite' | 'tauri';
  components: string[];
  description: string;
}

export interface ComponentSourceCode {
  tsx: string;              // Main component TypeScript file
  css: string;              // CSS module content
  cssTypes: string;         // CSS module TypeScript declarations
  exportFile?: string;      // index.ts if it exists
}

export interface ComponentDeps {
  npm: string[];
  internal: string[];
}

export interface PackageMetadata {
  version: string;
}

// UI Configurator Controls
export interface ControlOption {
  label: string;
  value: string | number | boolean;
}

export interface ControlDef {
  name: string;
  label: string;
  type: 'select' | 'toggle' | 'text';
  options?: ControlOption[];
  defaultValue?: string | number | boolean;
}

// Component Detail for Site
export interface ComponentVariant {
  id: string;
  name: string;
  description?: string;
  code: string;
  preview: React.ReactNode;
}

export interface ComponentAccessibilityNote {
  icon: string;
  title: string;
  description: string;
}

export interface SiteComponentExample {
  id: string;
  title: string;
  description?: string;
  code: string;
  preview: React.ReactNode;
  controls?: ControlDef[];
  renderPreview?: (props: Record<string, any>) => React.ReactNode;
  previewHeight?: string;
  previewLayout?: 'center' | 'start';
}

export interface ComponentDetail {
  id: string;
  name: string;
  description: string;
  overview: React.ReactNode;
  examples: SiteComponentExample[];
  variants?: ComponentVariant[];
  accessibility?: ComponentAccessibilityNote[];
  props?: Array<{
    name: string;
    type: string;
    default?: string;
    description: string;
  }>;
  usage?: React.ReactNode;
}
