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
  "command": "https://github.com/kyza0d/ui-lab.app/blob/master/packages/components/src/components/CommandPalette",
  "confirmation": "https://github.com/kyza0d/ui-lab.app/blob/master/packages/components/src/components/Confirmation",
  "divider": "https://github.com/kyza0d/ui-lab.app/blob/master/packages/components/src/components/Divider",
  "flex": "https://github.com/kyza0d/ui-lab.app/blob/master/packages/components/src/components/Flex",
  "fold": "https://github.com/kyza0d/ui-lab.app/blob/master/packages/components/src/components/Fold",
  "frame": "https://github.com/kyza0d/ui-lab.app/blob/master/packages/components/src/components/Frame",
  "grid": "https://github.com/kyza0d/ui-lab.app/blob/master/packages/components/src/components/Grid",
  "group": "https://github.com/kyza0d/ui-lab.app/blob/master/packages/components/src/components/Group",
  "input": "https://github.com/kyza0d/ui-lab.app/blob/master/packages/components/src/components/Input",
  "label": "https://github.com/kyza0d/ui-lab.app/blob/master/packages/components/src/components/Label",
  "panel": "https://github.com/kyza0d/ui-lab.app/blob/master/packages/components/src/components/Panel",
  "list": "https://github.com/kyza0d/ui-lab.app/blob/master/packages/components/src/components/List",
  "menu": "https://github.com/kyza0d/ui-lab.app/blob/master/packages/components/src/components/Menu",
  "modal": "https://github.com/kyza0d/ui-lab.app/blob/master/packages/components/src/components/Modal",
  "page": "https://github.com/kyza0d/ui-lab.app/blob/master/packages/components/src/components/Page",
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
  "scroll": "https://github.com/kyza0d/ui-lab.app/blob/master/packages/components/src/components/Scroll"
};

// Categories
export { categories, categoryMap } from './categories.js';

// Component Order
export { componentOrder, getComponentsInOrder } from './component-order.js';

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
  SectionMetadata,
  SectionVariant,
  SectionRegistry,
  StarterMetadata,
  StarterVariant,
  StarterRegistry,
  LayoutConfig,
  ControlOption,
  ControlDef,
  ComponentVariant,
  ComponentAccessibilityNote,
  SiteComponentExample,
  ComponentDetail,
  PricingInfo,
  PatternComplexity
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

// Category utilities
export { getCategoryIcon } from './utils/get-category-icon.js';

// Elements
export {
  elementRegistry,
  elementsList,
  getElementById,
  getElementsByCategory,
  getElementsByTag,
  searchElements,
  getAllCategories,
  getAllTags,
  elementCategories,
  elementCategoryMapping,
  getCategoryForElement,
  getCategoryDefinition,
  groupElementsByCategory,
  getElementsInCategory,
  getCategoriesWithElements,
  elementPackages,
  getPackageById,
  getAllPackages,
  getElementsInPackage,
  getPackageForElement,
} from './elements/index.js';
export type { ElementCategoryId, ElementCategoryDefinition, ElementPackageMetadata } from './elements/index.js';

// Element Order
export { elementOrder, getElementsInOrder, getAllElementsInOrder } from './element-order.js';

// Element components
// Note: Foundation elements (Header, Sidebar, Page) are loaded through the elements registry, not directly exported
// to avoid JSON import issues in ES modules

// Sections
export {
  sectionRegistry,
  getAllSections,
  getSectionById,
  getSectionsByCategory,
  getSectionsInCategory,
  getSectionsByTag,
  searchSections,
  getAllSectionCategories,
  getAllSectionTags,
  sectionCategories,
  getCategoryForSection,
  groupSectionsByCategory,
} from './sections/index.js';
export type { SectionCategoryId, SectionCategoryDefinition } from './sections/index.js';

// Starters
export {
  starterRegistry,
  getAllStarters,
  getStarterById,
  getStartersByCategory,
  getStartersInCategory,
  getStartersByTag,
  searchStarters,
  getAllStarterCategories,
  getAllStarterTags,
} from './starters/index.js';

// Patterns
export {
  patternRegistry,
  getPatternById,
  getAllPatterns,
  getPatternsByCategory,
  getPatternsByTag,
  searchPatterns,
  getPatternsByComplexity,
  getPatternsByComponent,
  getAllPatternCategories,
  getAllPatternTags,
  getRelatedPatterns,
} from './patterns/index.js';
export type {
  PatternMetadata,
  PatternRegistry,
  PatternCategory,
} from './patterns/index.js';

// Providers
export {
  providerRegistry,
  providerCategories,
  getProviderById,
  getAllProviders,
  getAllProviderIds,
  getProvidersByCategory,
  searchProviders,
  getProviderCategoriesInOrder,
  getProviderCategoryDefinition,
} from './providers/index.js';
export type {
  ProviderMetadata,
  ProviderCategory,
  ProviderCategoryDefinition,
  ProviderHook,
  ProviderExample,
  ProviderFeature,
  ProviderRegistry,
} from './providers/index.js';

