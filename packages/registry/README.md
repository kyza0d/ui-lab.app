# @ui-lab/registry

A centralized, framework-agnostic component registry for the UI Lab ecosystem.

## Overview

This package serves as the single source of truth for:
- Component metadata (names, descriptions, categories)
- Component source code references
- Component relationships and dependencies
- Category definitions and organization
- Starter template component mappings

## Installation

```bash
npm install @ui-lab/registry
# or
pnpm add @ui-lab/registry
```

## Usage

### Basic Registry Access

```typescript
import {
  componentRegistry,
  getComponentById,
  getComponentsByCategory,
  categories
} from '@ui-lab/registry';

// Get a single component
const button = getComponentById('button');

// Get all components in a category
const inputComponents = getComponentsByCategory('input');

// Get all categories
console.log(categories);
```

### Helper Functions

```typescript
import {
  searchComponents,
  getRelatedComponents,
  getComponentsGroupedByCategory,
  getAllComponentIds,
  getComponentCount
} from '@ui-lab/registry';

// Search components by name, description, or tags
const results = searchComponents('button');

// Get related components
const relatedToButton = getRelatedComponents('button');

// Get components grouped by category
const grouped = getComponentsGroupedByCategory();

// Get all component IDs
const ids = getAllComponentIds();

// Get component count
const count = getComponentCount(); // 23
```

### Starter Presets

```typescript
import { starterPresets, getStarterComponents } from '@ui-lab/registry';

// Get components for a specific starter template
const nextComponents = getStarterComponents('next');

// Access preset metadata
const preset = starterPresets.vite;
console.log(preset.description); // "Lightweight components for Vite-based applications"
```

### Types

```typescript
import type {
  ComponentMetadata,
  ComponentCategory,
  ComponentSource,
  CategoryDefinition,
  StarterPreset
} from '@ui-lab/registry';

function processComponent(comp: ComponentMetadata): void {
  console.log(comp.name, comp.category);
}
```

## Component Categories

The registry organizes components into 8 categories:

- **input** - Form inputs and data entry
- **display** - Information display
- **feedback** - User feedback
- **navigation** - Navigation elements
- **container** - Container components
- **action** - Action components
- **composition** - Composed components
- **layout** - Layout utilities

## All 23 Components

1. **button** - Clickable element that triggers an action
2. **button-group** - Group of related buttons
3. **input** - Text input field
4. **label** - Text label for form elements
5. **select** - Dropdown select component
6. **textarea** - Multi-line text input
7. **checkbox** - Checkbox input
8. **radio** - Radio button
9. **badge** - Badge component for labels
10. **tooltip** - Tooltip component
11. **popover** - Popover component
12. **form-wrapper** - Form wrapper component
13. **toast** - Toast notification component
14. **modal** - Modal dialog component
15. **tabs** - Tabbed interface
16. **context-menu** - Context menu
17. **switch** - Toggle switch
18. **slider** - Range slider
19. **progress** - Progress bar
20. **card** - Card component
21. **command-palette** - Command palette
22. **confirmation** - Confirmation dialog
23. **divider** - Divider component

## TypeScript Support

This package includes full TypeScript support with strict typing. All types are exported from the main entry point.

## License

MIT
