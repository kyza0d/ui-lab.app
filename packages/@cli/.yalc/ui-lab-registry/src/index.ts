// Registry
export { componentRegistry, componentMetadata } from './registry.js';

// Generated data (auto-populated by scripts/generate-registry-data.ts)
export { generatedAPI, generatedStyles, generatedSourceCode, reactAriaUrls, generatedComponentDependencies, generatedCoreNpmDependencies, packageMetadata } from './generated-data.js';

export const sourceUrls: Record<string, string> = {
  "badge": "https://github.com/kyza0d/ui-lab.app/blob/master/packages/components/src/components/badge",
  "breadcrumbs": "https://github.com/kyza0d/ui-lab.app/blob/master/packages/components/src/components/breadcrumbs",
  "button": "https://github.com/kyza0d/ui-lab.app/blob/master/packages/components/src/components/button",
  "card": "https://github.com/kyza0d/ui-lab.app/blob/master/packages/components/src/components/card",
  "checkbox": "https://github.com/kyza0d/ui-lab.app/blob/master/packages/components/src/components/checkbox",
  "command-palette": "https://github.com/kyza0d/ui-lab.app/blob/master/packages/components/src/components/command-palette",
  "confirmation": "https://github.com/kyza0d/ui-lab.app/blob/master/packages/components/src/components/confirmation",
  "divider": "https://github.com/kyza0d/ui-lab.app/blob/master/packages/components/src/components/divider",
  "flex": "https://github.com/kyza0d/ui-lab.app/blob/master/packages/components/src/components/flex",
  "fold": "https://github.com/kyza0d/ui-lab.app/blob/master/packages/components/src/components/fold",
  "form": "https://github.com/kyza0d/ui-lab.app/blob/master/packages/components/src/components/form",
  "grid": "https://github.com/kyza0d/ui-lab.app/blob/master/packages/components/src/components/grid",
  "group": "https://github.com/kyza0d/ui-lab.app/blob/master/packages/components/src/components/group",
  "input": "https://github.com/kyza0d/ui-lab.app/blob/master/packages/components/src/components/input",
  "label": "https://github.com/kyza0d/ui-lab.app/blob/master/packages/components/src/components/label",
  "menu": "https://github.com/kyza0d/ui-lab.app/blob/master/packages/components/src/components/menu",
  "modal": "https://github.com/kyza0d/ui-lab.app/blob/master/packages/components/src/components/modal",
  "popover": "https://github.com/kyza0d/ui-lab.app/blob/master/packages/components/src/components/popover",
  "progress": "https://github.com/kyza0d/ui-lab.app/blob/master/packages/components/src/components/progress",
  "radio": "https://github.com/kyza0d/ui-lab.app/blob/master/packages/components/src/components/radio",
  "select": "https://github.com/kyza0d/ui-lab.app/blob/master/packages/components/src/components/select",
  "slider": "https://github.com/kyza0d/ui-lab.app/blob/master/packages/components/src/components/slider",
  "switch": "https://github.com/kyza0d/ui-lab.app/blob/master/packages/components/src/components/switch",
  "tabs": "https://github.com/kyza0d/ui-lab.app/blob/master/packages/components/src/components/tabs",
  "textarea": "https://github.com/kyza0d/ui-lab.app/blob/master/packages/components/src/components/textarea",
  "toast": "https://github.com/kyza0d/ui-lab.app/blob/master/packages/components/src/components/toast",
  "tooltip": "https://github.com/kyza0d/ui-lab.app/blob/master/packages/components/src/components/tooltip"
};

// Categories
export { categories, categoryMap, categoryOrder } from './categories.js';

// Types
export type {
  ComponentMetadata,
  ComponentCategory,
  ComponentSource,
  ComponentRegistry,
  CategoryDefinition,
  PropDefinition,
  ComponentAPI,
  StyleVariable,
  StyleClass,
  ComponentStyles,
  ComponentSourceCode,
  PackageMetadata
} from './types.js';

// Helpers
export {
  getComponentById,
  getComponentsByCategory,
  getComponentsGroupedByCategory,
  getRelatedComponents,
  searchComponents,
  getAllComponentIds,
  getComponentCount
} from './helpers.js';
