// Registry
export { componentRegistry, componentMetadata } from './registry';

// Categories
export { categories, categoryMap, categoryOrder } from './categories';

// Types
export type {
  ComponentMetadata,
  ComponentCategory,
  ComponentSource,
  ComponentRegistry,
  CategoryDefinition,
  StarterPreset
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

// Starters
export { starterPresets, getStarterComponents } from './starters/presets';
