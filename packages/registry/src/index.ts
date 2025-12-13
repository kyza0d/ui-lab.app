// Registry
export { componentRegistry, componentMetadata } from './registry';

// Generated data (auto-populated by scripts/generate-registry-data.ts)
export { generatedAPI, generatedStyles, reactAriaUrls } from './generated-data';

// Categories
export { categories, categoryMap, categoryOrder } from './categories';

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
  ComponentStyles
} from './types';

// Helpers
export {
  getComponentById,
  getComponentsByCategory,
  getComponentsGroupedByCategory,
  getRelatedComponents,
  searchComponents,
  getAllComponentIds,
  getComponentCount
} from './helpers';
