// Registry
export { componentRegistry, componentMetadata } from './registry.js';

// Design tokens
export {
  getColorRecommendation,
  getAllColorRecommendations,
  hasColorFamily,
  getColorFamilyInfo,
  hasColorShade,
  getColorCssVar,
  getAllColorFamilies,
  getColorFamilyShades,
  getColorFamilyWCAGLevel,
} from './design-tokens/index.js';
export type {
  ColorFamilyInfo,
  ColorRecommendation,
  ColorRecommendationRegistry,
} from './design-tokens/index.js';

// Generated data (auto-populated by scripts/generate-registry-data.ts)
export { generatedAPI, generatedStyles, generatedSourceCode, reactAriaUrls, generatedComponentDependencies, generatedCoreNpmDependencies, packageMetadata } from './generated-data.js';

const BASE = "https://github.com/kyza0d/ui-lab.app/tree/master/packages/%40ui/src/components";

export const sourceUrls: Record<string, string> = {
  "anchor":       `${BASE}/Anchor`,
  "badge":        `${BASE}/Badge`,
  "banner":       `${BASE}/Banner`,
  "breadcrumbs":  `${BASE}/Breadcrumbs`,
  "button":       `${BASE}/Button`,
  "card":         `${BASE}/Card`,
  "checkbox":     `${BASE}/Checkbox`,
  "code":         `${BASE}/Code`,
  "command":      `${BASE}/Command`,
  "confirmation": `${BASE}/Confirmation`,
  "divider":      `${BASE}/Divider`,
  "expand":       `${BASE}/Expand`,
  "flex":         `${BASE}/Flex`,
  "frame":        `${BASE}/Frame`,
  "grid":         `${BASE}/Grid`,
  "group":        `${BASE}/Group`,
  "input":        `${BASE}/Input`,
  "label":        `${BASE}/Label`,
  "list":         `${BASE}/List`,
  "menu":         `${BASE}/Menu`,
  "modal":        `${BASE}/Modal`,
  "page":         `${BASE}/Page`,
  "panel":        `${BASE}/Panel`,
  "popover":      `${BASE}/Popover`,
  "progress":     `${BASE}/Progress`,
  "radio":        `${BASE}/Radio`,
  "scroll":       `${BASE}/Scroll`,
  "select":       `${BASE}/Select`,
  "slider":       `${BASE}/Slider`,
  "switch":       `${BASE}/Switch`,
  "tabs":         `${BASE}/Tabs`,
  "textarea":     `${BASE}/Textarea`,
  "toast":        `${BASE}/Toast`,
  "tooltip":      `${BASE}/Tooltip`,
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
  getAllPatternCategories,
  getAllPatternTags,
} from './patterns/index.js';
export type {
  PatternMetadata,
  PatternRegistry,
  PatternCategory,
  PatternVariation,
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

