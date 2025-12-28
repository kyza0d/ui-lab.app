# Element Pattern Guidelines

This document outlines the established pattern for creating elements in the UI Lab registry. All new elements must follow this structure to ensure consistency across the codebase.

## Directory Structure

Each element follows a consistent folder structure:

```
ElementName/
├── metadata.json              # Element metadata and description
├── variations.json            # Generated variations data
├── ElementName.preview.tsx    # Main preview component and exports
├── index.ts                   # Entry point for element exports
└── variations/
    ├── 01-basic/              # First variation (numbered for ordering)
    │   ├── index.tsx          # Entry point for this variation
    │   ├── layout/
    │   │   └── ElementName.tsx # Core component
    │   └── components/        # Optional: shared components
    │       └── SomeComponent.tsx
    └── 02-with-actions/       # Additional variations
        ├── index.tsx          # Entry point for this variation
        ├── layout/
        │   └── ElementName.tsx # Core component for this variation
        └── components/        # Optional: shared components
            └── ActionButtons.tsx
```

## File Requirements

### 1. metadata.json

Contains element metadata displayed in the registry.

**Required Fields:**
- `id`: Unique kebab-case identifier (e.g., `"header"`)
- `name`: Human-readable element name (e.g., `"Header"`)
- `description`: Clear description of the element's purpose
- `category`: One of: `"layout"`, `"form"`, `"navigation"`, `"content"`, `"card"`, `"other"`
- `tags`: Array of searchable tags (e.g., `["header", "navigation", "layout", "branding"]`)

**Example:**
```json
{
  "id": "header",
  "name": "Header",
  "description": "Navigation header with branding and navigation elements. Provides a consistent top navigation bar for layouts.",
  "category": "navigation",
  "tags": ["header", "navigation", "layout", "branding"]
}
```

### 2. variations.json

Auto-generated file containing all variation files and their metadata. Generated during build or development.

**Structure per variation:**
```json
{
  "01-basic": {
    "name": "Basic Header",
    "description": "Simple header with logo and navigation links",
    "demoPath": "header-basic",
    "files": [
      {
        "filename": "index.tsx",
        "language": "typescript",
        "code": "...",
        "isEntryPoint": true
      }
    ]
  }
}
```

### 3. ElementName.preview.tsx

Main preview component and central export file for the element. This file serves two purposes:
1. Define a compact preview component used as a thumbnail in element listings
2. Export metadata and demo components for use throughout the system

**Responsibilities:**
- Import metadata from `metadata.json`
- Import generated variations from `variations.json`
- Import variation components from their respective folders
- Define and export a compact preview component (thumbnail-sized)
- Create ElementMetadata object with proper typing
- Create demoComponents object mapping component paths to actual components
- Export metadata, variations, and preview component

**Preview Component Guidelines:**
The preview component is a **compact, thumbnail-sized representation** of the element, not a full page layout. It should:
- Show a simplified, visually representative version of the element
- Be approximately 60-100px tall (depends on element type)
- Use skeleton/placeholder elements to show structure and layout
- Use design system colors and spacing
- NOT include full page layouts or realistic content
- Remain self-contained and focused on showcasing the element's appearance

**Example Structure:**
```typescript
import React from 'react';
import { FaBell, FaGear, FaUser } from 'react-icons/fa6';
import metadata from './metadata.json';
import variationsGenerated from './variations.json';
import type { ElementMetadata } from '../../types';
import { BasicHeader } from './variations/01-basic';
import { HeaderWithActions } from './variations/02-with-actions';

// Compact thumbnail preview component
function HeaderPreview() {
  return (
    <header className="bg-background-800 border-b border-background-700 w-full">
      <div className="px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1">
          <div className="w-6 h-6 bg-accent-500 rounded-md flex-shrink-0" />
          <div className="w-16 h-4 bg-background-700 rounded flex-shrink-0" />
        </div>
        <div className="flex items-center gap-2">
          <div className="w-8 h-3 bg-background-700 rounded flex-shrink-0" />
          <div className="w-8 h-3 bg-background-700 rounded flex-shrink-0" />
          <div className="w-px h-5 bg-background-700" />
          <button className="p-2 text-foreground-400 hover:text-foreground-300 hover:bg-background-700 rounded transition-colors flex-shrink-0">
            <FaBell className="w-4 h-4" />
          </button>
          <button className="p-2 text-foreground-400 hover:text-foreground-300 hover:bg-background-700 rounded transition-colors flex-shrink-0">
            <FaGear className="w-4 h-4" />
          </button>
          <button className="p-2 text-foreground-400 hover:text-foreground-300 hover:bg-background-700 rounded transition-colors flex-shrink-0">
            <FaUser className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}

const header: ElementMetadata = {
  id: metadata.id,
  name: metadata.name,
  description: metadata.description,
  category: metadata.category as 'layout' | 'form' | 'navigation' | 'content' | 'card' | 'other',
  tags: metadata.tags,
  variants: [
    {
      name: variationsGenerated['01-basic'].name,
      description: variationsGenerated['01-basic'].description,
      demoPath: variationsGenerated['01-basic'].demoPath,
      files: variationsGenerated['01-basic'].files,
    },
    {
      name: variationsGenerated['02-with-actions'].name,
      description: variationsGenerated['02-with-actions'].description,
      demoPath: variationsGenerated['02-with-actions'].demoPath,
      files: variationsGenerated['02-with-actions'].files,
    },
  ],
  componentDependencies: ['react-icons'], // List external dependencies
};

export const demoComponents = {
  'header-preview': HeaderPreview,
  'header-basic': BasicHeader,
  'header-actions': HeaderWithActions,
};

export { metadata, BasicHeader, HeaderWithActions, HeaderPreview };
export default header;
```

### 4. index.ts (Element Entry Point)

Simple re-export file that exposes the element for use in the registry.

**Pattern:**
```typescript
export { default, metadata, BasicHeader, HeaderWithActions, HeaderPreview, demoComponents } from './HeaderPreview';
```

### 5. Variation Structure (variations/NN-variant-name/)

Each variation represents a different use case or configuration of the element.

**Naming Convention:** `NN-variant-name` (zero-padded number, lowercase with hyphens)
- `01-basic/` - First variation, typically the simplest
- `02-with-actions/` - Subsequent variations
- `03-advanced/` - Additional variations as needed

**Files in each variation:**

#### index.tsx (Variation Entry Point)
- Must export a named component (e.g., `export function BasicHeader()`)
- Component should demonstrate the element within a complete page layout
- Include realistic surrounding content to show context
- Use proper spacing and structure

**Example:**
```typescript
import React from 'react';
import { Header } from './layout/Header';

export function BasicHeader() {
  return (
    <div className="flex flex-col min-h-screen bg-background-950">
      <Header logoText="UI Lab" />
      <main className="flex-1">
        {/* Content using the element */}
      </main>
    </div>
  );
}
```

#### layout/ElementName.tsx (Core Component)
- The actual reusable element component
- Should accept props for customization
- Must be properly typed with TypeScript interfaces
- Should use Tailwind CSS classes from the design system
- Self-contained and composable

**Example:**
```typescript
import React from 'react';

interface HeaderProps {
  logoText?: string;
}

export function Header({ logoText = 'Logo' }: HeaderProps) {
  return (
    <header className="bg-background-800 border-b border-background-700">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Header content */}
      </div>
    </header>
  );
}
```

#### components/ (Optional)
- Use for sub-components that are only needed in this variation
- Example: `ActionButtons.tsx`
- Keep these lightweight and focused

## Styling Standards

- Use Tailwind CSS utility classes exclusively
- Use design system color tokens: `bg-background-*`, `text-foreground-*`, `bg-accent-*`
- Ensure hover/focus states with appropriate transitions
- Use consistent spacing with Tailwind's spacing scale
- Maintain responsive design principles

## Type Definitions

Ensure proper TypeScript typing throughout:
- All components should have typed props interfaces
- Use `ElementMetadata` type from `../../types`
- Type category and other constrained fields appropriately

## Adding a New Element to the Registry

1. Create element folder: `packages/registry/src/elements/ElementName/`
2. Create `metadata.json` with element information
3. Create folder structure for variations: `variations/01-basic/`
4. Implement variation components with proper layout structure
5. Create `ElementName.preview.tsx` with:
   - Preview component
   - ElementMetadata object
   - demoComponents mapping
   - Proper exports
6. Create `index.ts` that re-exports from preview file
7. Update `packages/registry/src/elements/index.ts`:
   ```typescript
   import elementElement from './ElementName';

   export const elementRegistry: ElementRegistry = {
     [headerElement.id]: headerElement,
     [elementElement.id]: elementElement, // Add new element
   };
   ```

## Variation Generator

The `variations.json` file is generated automatically during build to include:
- File contents
- Language specification
- Entry point identification
- All necessary metadata for demo rendering

The generation process extracts files from variation directories and populates variations.json with their content.

## Component Naming

- Use PascalCase for component names
- Use kebab-case for element IDs and demo paths
- Use descriptive names that indicate the element's purpose
- Variation names should describe the variation clearly (e.g., "Basic", "With Actions")

## Dependencies

- List all external dependencies in the `componentDependencies` array of ElementMetadata
- Keep dependencies minimal and well-justified
- Prefer using available design system tokens over custom styling

## Preview Component Standards

The preview component is a **compact thumbnail** shown in element listings and should:
- Show a simplified, visually representative version of the element
- Be appropriately sized for thumbnail display (typically 60-100px height)
- Use skeleton/placeholder boxes to represent content and structure
- NOT be a full page layout - it's a visual preview only
- Use design system colors and spacing consistently
- Include interactive elements (buttons, icons) where they're key to the element's identity
- Be self-contained and focused on showcasing the element's appearance
- Keep complexity minimal - the goal is visual recognition, not full functionality

**Key Difference from Variations:**
- **Preview:** Compact thumbnail for element listing pages
- **Variations:** Full-page demo showing the element in realistic context with complete page layouts
