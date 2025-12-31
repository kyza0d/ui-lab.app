// Registry
export { componentRegistry, componentMetadata } from './registry.js';

// Generated data (auto-populated by scripts/generate-registry-data.ts)
export { generatedAPI, generatedStyles, generatedSourceCode, reactAriaUrls, generatedComponentDependencies, generatedCoreNpmDependencies, packageMetadata } from './generated-data.js';

export const sourceUrls: Record<string, string> = {
  "badge": "https://github.com/kyza0d/ui-lab.app/blob/master/packages/components/src/components/Badge",
  "breadcrumbs": "https://github.com/kyza0d/ui-lab.app/blob/master/packages/components/src/components/Breadcrumbs",
  "button": "https://github.com/kyza0d/ui-lab.app/blob/master/packages/components/src/components/Button",
  "card": "https://github.com/kyza0d/ui-lab.app/blob/master/packages/components/src/components/Card",
  "checkbox": "https://github.com/kyza0d/ui-lab.app/blob/master/packages/components/src/components/Checkbox",
  "command-palette": "https://github.com/kyza0d/ui-lab.app/blob/master/packages/components/src/components/Command-Palette",
  "confirmation": "https://github.com/kyza0d/ui-lab.app/blob/master/packages/components/src/components/Confirmation",
  "divider": "https://github.com/kyza0d/ui-lab.app/blob/master/packages/components/src/components/Divider",
  "flex": "https://github.com/kyza0d/ui-lab.app/blob/master/packages/components/src/components/Flex",
  "fold": "https://github.com/kyza0d/ui-lab.app/blob/master/packages/components/src/components/Fold",
  "form": "https://github.com/kyza0d/ui-lab.app/blob/master/packages/components/src/components/Form",
  "grid": "https://github.com/kyza0d/ui-lab.app/blob/master/packages/components/src/components/Grid",
  "group": "https://github.com/kyza0d/ui-lab.app/blob/master/packages/components/src/components/Group",
  "input": "https://github.com/kyza0d/ui-lab.app/blob/master/packages/components/src/components/Input",
  "label": "https://github.com/kyza0d/ui-lab.app/blob/master/packages/components/src/components/Label",
  "menu": "https://github.com/kyza0d/ui-lab.app/blob/master/packages/components/src/components/Menu",
  "modal": "https://github.com/kyza0d/ui-lab.app/blob/master/packages/components/src/components/Modal",
  "popover": "https://github.com/kyza0d/ui-lab.app/blob/master/packages/components/src/components/Popover",
  "progress": "https://github.com/kyza0d/ui-lab.app/blob/master/packages/components/src/components/Progress",
  "radio": "https://github.com/kyza0d/ui-lab.app/blob/master/packages/components/src/components/Radio",
  "select": "https://github.com/kyza0d/ui-lab.app/blob/master/packages/components/src/components/Select",
  "slider": "https://github.com/kyza0d/ui-lab.app/blob/master/packages/components/src/components/Slider",
  "switch": "https://github.com/kyza0d/ui-lab.app/blob/master/packages/components/src/components/Switch",
  "tabs": "https://github.com/kyza0d/ui-lab.app/blob/master/packages/components/src/components/Tabs",
  "textarea": "https://github.com/kyza0d/ui-lab.app/blob/master/packages/components/src/components/TextArea",
  "toast": "https://github.com/kyza0d/ui-lab.app/blob/master/packages/components/src/components/Toast",
  "tooltip": "https://github.com/kyza0d/ui-lab.app/blob/master/packages/components/src/components/Tooltip",
  "scrollarea": "https://github.com/kyza0d/ui-lab.app/blob/master/packages/components/src/components/ScrollArea"
};

// Categories
export { categories, categoryMap } from './categories.js';

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
  PackageMetadata,
  Example,
  ComponentExample,
  ElementMetadata,
  ElementVariant,
  ElementFile,
  ElementRegistry,
  LayoutConfig,
  ControlOption,
  ControlDef,
  ComponentVariant,
  ComponentAccessibilityNote,
  SiteComponentExample,
  ComponentDetail
} from './types.js';

// Helpers
export {
  getComponentById,
  getComponentsByCategory,
  getComponentsGroupedByCategory,
  getComponentsGroupedByCategoryInOrder,
  getComponentsInCategoryOrder,
  getCategoriesInOrder,
  getCategoriesWithMetadata,
  getRelatedComponents,
  searchComponents,
  getAllComponentIds,
  getComponentCount
} from './helpers.js';

// Elements
export {
  elementRegistry,
  elementsList,
  getElementById,
  getElementsByCategory,
  getElementsByTag,
  searchElements,
  getAllCategories,
  getAllTags
} from './elements/index.js';

// Element components
export { BasicHeader, HeaderWithActions, demoComponents as headerDemoComponents } from './elements/Header';
export { default as headerElement } from './elements/Header';
