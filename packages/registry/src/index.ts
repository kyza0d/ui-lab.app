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
  "list": "https://github.com/kyza0d/ui-lab.app/blob/master/packages/components/src/components/List",
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
  getCategoriesWithElements
} from './elements/index.js';
export type { ElementCategoryId, ElementCategoryDefinition } from './elements/index.js';

// Element Order
export { elementOrder, getElementsInOrder, getAllElementsInOrder } from './element-order.js';

// Element components
export { BasicHeader, DEMO_MAP as headerDemoMap } from './elements/Header';
export { default as headerElement } from './elements/Header';
export { BasicSidebar, DEMO_MAP as sidebarDemoMap } from './elements/Sidebar';
export { default as sidebarElement } from './elements/Sidebar';
export { BasicPage, DEMO_MAP as pageDemoMap } from './elements/Page';
export { default as pageElement } from './elements/Page';

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

