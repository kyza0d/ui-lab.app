# Element Generation Guide

This guide documents the complete structure and generation requirements for UI Lab elements. The Header element serves as both a proof-of-concept and template.

## Directory Structure

Each element must follow this structure:

```
src/elements/[ElementName]/
├── metadata.json           # Element metadata
├── variations.json         # Map of variations with names and descriptions
├── index.ts               # Main export file
└── variations/
    ├── 01-[variant-name]/
    │   ├── page.tsx       # Main showcase component (entry point for demo)
    │   ├── layout/
    │   │   └── [Component].tsx  # Layout component
    │   └── components/    # Additional components (optional)
    │       └── [Component].tsx
    └── 02-[variant-name]/
        ├── page.tsx
        ├── layout/
        │   └── [Component].tsx
        └── components/
            └── [Component].tsx
```

## JSON File Structures

### metadata.json

Defines the element's identity and properties:

```json
{
  "id": "header",
  "name": "Header",
  "description": "Navigation header with branding and navigation elements. Provides a consistent top navigation bar for layouts.",
  "category": "navigation",
  "tags": ["header", "navigation", "layout", "branding"]
}
```

**Fields:**
- `id`: Unique identifier, lowercase, used in URLs and registry queries. **Must match the directory name (lowercase).**
- `name`: Display name for the element
- `description`: Detailed description shown on the element detail page
- `category`: One of: `layout`, `form`, `navigation`, `content`, `card`, `other`
- `tags`: Array of searchable tags for filtering and discovery

### variations.json

Maps each variation to metadata:

```json
{
  "01-basic": {
    "name": "Basic Header",
    "description": "Simple header with logo and navigation links"
  },
  "02-with-actions": {
    "name": "Header with Actions",
    "description": "Header with logo, navigation, and action buttons"
  }
}
```

**Rules:**
- Keys must match the variation folder names (e.g., `01-basic`)
- Each variation must have `name` and `description`
- Variations are displayed in the order they appear in the file
- The `01-`, `02-` prefix indicates display order and should be sequential

## index.ts Structure

The index.ts file synthesizes all element data and exports it:

```typescript
import metadata from './metadata.json';
import variations from './variations.json';
import type { ElementMetadata, ElementVariant } from '../../../types';

const header: ElementMetadata = {
  id: metadata.id,
  name: metadata.name,
  description: metadata.description,
  category: metadata.category as 'layout' | 'form' | 'navigation' | 'content' | 'card' | 'other',
  tags: metadata.tags,
  variants: [
    {
      name: variations['01-basic'].name,
      description: variations['01-basic'].description,
      demoPath: 'header-basic',
      files: [
        {
          filename: 'Header.tsx',
          language: 'typescript',
          code: `...component code...`,
          isEntryPoint: true,
        },
      ],
    },
    {
      name: variations['02-with-actions'].name,
      description: variations['02-with-actions'].description,
      demoPath: 'header-with-actions',
      files: [
        {
          filename: 'Header.tsx',
          language: 'typescript',
          code: `...component code...`,
          isEntryPoint: true,
        },
      ],
    },
  ],
  componentDependencies: ['react-icons'],
};

export { metadata, variations };
export default header;
```

**Key Points:**
- Create an `ElementMetadata` object that merges metadata.json, variations.json, and code
- For each variant, create an `ElementVariant` with:
  - `name` and `description` from variations.json
  - `demoPath`: A unique string key used to load the demo component and source code
  - `files`: Array of source files with code (used for code display)
  - The first file should have `isEntryPoint: true`
- `componentDependencies`: Array of npm packages this element uses (e.g., `['react-icons']`)

## Variation page.tsx Structure

The `page.tsx` file is the main showcase component:

```typescript
import React from 'react';
import { Header } from './layout/Header';

export default function BasicHeaderDemo() {
  return (
    <div className="flex flex-col min-h-screen bg-background-950">
      <Header logoText="UI Lab" />

      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-4 py-12">
          {/* Placeholder content showing context */}
          <div className="space-y-6">
            {/* Content blocks demonstrating element usage */}
          </div>
        </div>
      </main>
    </div>
  );
}
```

**Requirements:**
- Export a default React component that serves as the demo
- Use full `min-h-screen` or similar to show the element in context
- Include the element at the top with supporting content below to demonstrate context
- Use placeholder content blocks (`bg-background-700` rounded divs) to show layout
- Must be a valid, self-contained React component
- Should use components from `ui-lab-components` where appropriate

## Layout and Components Subdirectories

### layout/[Component].tsx

The actual element component being demonstrated:

```typescript
import React from 'react';

interface HeaderProps {
  logoText?: string;
}

export function Header({ logoText = 'Logo' }: HeaderProps) {
  return (
    <header className="bg-background-800 border-b border-background-700">
      {/* Component markup */}
    </header>
  );
}
```

**Rules:**
- Named exports (not default)
- Fully typed with TypeScript
- Uses the design system classes (bg-background-*, text-foreground-*, etc.)
- Self-contained and reusable

### components/[Component].tsx

Additional helper components used by the layout:

```typescript
import React from 'react';
import { FaUser, FaBell, FaCog } from 'react-icons/fa6';

export function ActionButtons() {
  return (
    <div className="flex items-center gap-2">
      {/* Action button markup */}
    </div>
  );
}
```

## Integration Points

### 1. Registry Registration (packages/registry/src/elements/index.ts)

The element must be imported and added to the registry:

```typescript
import headerElement from './Header';

export const elementRegistry: ElementRegistry = {
  [headerElement.id]: headerElement,
};
```

### 2. Demo Component Loading (apps/site/src/lib/get-element-demo.ts)

Import the variation page components and add them to the demo map:

```typescript
import dynamic from 'next/dynamic';

const BasicHeader = dynamic(() =>
  import('ui-lab-registry/elements/Header/variations/01-basic/page')
    .then(mod => ({ default: mod.default }))
);
const HeaderWithActions = dynamic(() =>
  import('ui-lab-registry/elements/Header/variations/02-with-actions/page')
    .then(mod => ({ default: mod.default }))
);

const demoMap: Record<string, DemoComponent> = {
  'header-basic': BasicHeader,
  'header-with-actions': HeaderWithActions,
};
```

### 3. Source Code Display (apps/site/src/lib/get-element-source.ts)

Add source code strings for each demoPath key:

```typescript
const sourceCodeMap: Record<string, string> = {
  'header-basic': `import { ... } from '...';

export function Header() {
  return (
    // component JSX
  );
}`,

  'header-with-actions': `import { ... } from '...';

// Additional components and implementation
...`,
};
```

The source code should match what's stored in the index.ts files array but formatted as a readable string for display.

## Data Flow in the System

1. **User navigates to `/elements/header`**
   - Site calls `getElementById('header')` from the registry

2. **Registry lookup**
   - Returns the `ElementMetadata` object from `Header/index.ts`
   - Includes all variants with names, descriptions, demoPath, and files

3. **Demo component rendering**
   - For each variant, site calls `getDemoComponent(variant.demoPath)`
   - Returns the dynamically imported `page.tsx` component
   - Renders it in the preview area

4. **Source code display**
   - Site calls `getElementSourceCode(variant.demoPath)` for code tabs
   - Returns the source code string from the map
   - Displays it with syntax highlighting

5. **Metadata display**
   - Category badge from `element.category`
   - Tags from `element.tags`
   - Component dependencies from `element.componentDependencies`

## Generation Script Variables

For automation, these are the per-element variables:

```
ELEMENT_ID = "header"              # lowercase, from metadata.id
ELEMENT_NAME = "Header"            # from metadata.name
ELEMENT_DESCRIPTION = "..."        # from metadata.description
ELEMENT_CATEGORY = "navigation"    # from metadata.category
ELEMENT_TAGS = ["header", ...]     # from metadata.tags
DEPS = ["react-icons"]             # external npm dependencies

For each variation (01-basic, 02-with-actions):
  VARIATION_NUM = "01", "02"
  VARIATION_KEY = "01-basic", "02-with-actions"
  VARIATION_NAME = "Basic Header", "Header with Actions"
  VARIATION_DESC = "Simple header..."
  DEMO_PATH = "header-basic", "header-with-actions"
  COMPONENT_NAME = "Header", "HeaderWithActions"
```

## Assumptions for Generation Scripts

1. **Naming conventions:**
   - Element directories are capitalized (e.g., `Header`)
   - Variation folders use `01-`, `02-` prefix with kebab-case names
   - Component exports are PascalCase

2. **File structure:**
   - `page.tsx` is always the demo entry point
   - Layout components go in `layout/[ComponentName].tsx`
   - Helper components go in `components/`
   - Both layout and components are named exports

3. **Component guidelines:**
   - All components must be React functional components
   - Props should be typed with interfaces
   - Use design system tokens (bg-background-*, text-foreground-*, etc.)
   - Support `className` prop for composition (optional)

4. **Registry integration:**
   - Element `id` must match the directory name (case-insensitive)
   - `demoPath` should be lowercase with hyphens, matching the demo key in maps
   - Variants are always ordered by their numeric prefix

5. **Source code in index.ts:**
   - Code strings should match actual component files
   - Should be clean, readable TypeScript/JSX
   - Include necessary imports
   - Can omit unused imports but must be functionally complete

## Testing Generation

After generation, verify:

1. **TypeScript compilation:**
   ```bash
   pnpm type-check
   ```

2. **Build success:**
   ```bash
   pnpm build:site
   ```

3. **Element rendering:**
   - Navigate to `/elements/[element-id]`
   - Both variations should display
   - Code tabs should show source code
   - Metadata badges should appear

4. **Registry queries:**
   ```typescript
   import { getElementById, getElementsByCategory, getElementsByTag } from 'ui-lab-registry';
   const element = getElementById('header');
   const navElements = getElementsByCategory('navigation');
   ```

## Next Steps for Automation

1. Create a generation script template that accepts element configuration
2. For each element, create a config file with:
   - Element metadata (id, name, description, category, tags)
   - List of variations with names and descriptions
   - Component structure (what layout/component files to generate)
3. Generate all files from templates
4. Update registry index.ts and integration files
5. Run verification tests

This structure scales from Header → Card → Sidebar → all remaining elements.
