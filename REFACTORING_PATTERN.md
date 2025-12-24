# Component Examples Refactoring Pattern

**Version**: 1.0
**Date**: December 23, 2025
**Status**: Established (Phase 1: Button & Toast)
**Applicable To**: Registry component examples refactoring

---

## Overview

This document describes the standardized pattern for refactoring registry components to eliminate duplication between hardcoded variants and auto-generated examples.json files.

**Key Principle**: Move from maintaining example code in two places (index.tsx and examples/ files) to a single source of truth (example files + auto-generated examples.json).

---

## Quick Reference

| Before | After |
|--------|-------|
| Hardcoded variants array in index.tsx | Variants as separate .tsx files in examples/ |
| Single basic example file | Multiple example files (basic + variants) |
| examples.json with 1 entry | examples.json with all variants auto-generated |
| Duplicated code across files | Single definition per example |
| ~50-60% larger index.tsx | Significantly smaller index.tsx |

---

## The Pattern: 5 Simple Steps

### Step 1: Create Variant Example Files

For each hardcoded variant in the component's index.tsx, create a new file in `examples/` directory.

**Naming Convention**: `[NUMBER]-[variant-name]-[component-name].tsx`

Examples:
- `02-secondary-button.tsx` (Button variant 2)
- `03-outline-button.tsx` (Button variant 3)
- `02-success-toast.tsx` (Toast variant 2)
- `05-warning-toast.tsx` (Toast variant 5)

**File Template**:

```tsx
import React from 'react';
import { ComponentName } from 'ui-lab-components';
// ... other imports as needed

export const metadata = {
  title: 'Variant Title',
  description: 'Description of what this variant is used for.'
};

export default function Example() {
  // Return JSX that demonstrates this specific variant
  return <ComponentName variant="variant-name">Example Content</ComponentName>;
}
```

**Key Points**:
- Always export metadata object with `title` and `description`
- Default export should be the example component
- Metadata is extracted automatically by the generation script
- Description should explain USE CASE, not just what it looks like

**Extract from Hardcoded Variant**:

Look at the hardcoded variant in index.tsx:
```tsx
{
  id: 'secondary',
  name: 'Secondary',
  description: 'Secondary action button. Use for supplementary actions.',
  code: `<Button variant="secondary">Secondary Button</Button>`,
  preview: <Button variant="secondary">Secondary Button</Button>,
},
```

Convert to example file:
```tsx
export const metadata = {
  title: 'Secondary',  // from "name"
  description: 'Secondary action button. Use for supplementary actions.'  // from "description"
};

export default function Example() {
  // from "preview" JSX
  return <Button variant="secondary">Secondary Button</Button>;
}
```

---

### Step 2: Update examples/index.ts Exports

Add export statements for each new example file.

**Before**:
```ts
export { default as Example1 } from './01-basic-button.js';
export { metadata as metadata1 } from './01-basic-button.js';
```

**After**:
```ts
export { default as Example1 } from './01-basic-button.js';
export { metadata as metadata1 } from './01-basic-button.js';
export { default as Example2 } from './02-secondary-button.js';
export { metadata as metadata2 } from './02-secondary-button.js';
export { default as Example3 } from './03-outline-button.js';
export { metadata as metadata3 } from './03-outline-button.js';
// ... etc for all variants
```

**Pattern**:
- Number each example sequentially (Example1, Example2, Example3...)
- Export both the default component AND the metadata
- Name metadata as `metadata1`, `metadata2`, etc.

---

### Step 3: Update Component index.tsx

Update the main component file to import and use all examples.

#### 3a. Add Imports

After the existing basic example import, add imports for all variant examples:

```tsx
import Example1, { metadata as metadata1 } from './examples/01-basic-button.js';
import Example2, { metadata as metadata2 } from './examples/02-secondary-button.js';
import Example3, { metadata as metadata3 } from './examples/03-outline-button.js';
import Example4, { metadata as metadata4 } from './examples/04-ghost-button.js';
```

#### 3b. Update examplesData Array

Update the `examplesData` constant to include all examples:

**Before**:
```tsx
const examplesData = [
  { id: '01-basic-button', Component: Example1, metadata: metadata1 },
];
```

**After**:
```tsx
const examplesData = [
  { id: '01-basic-button', Component: Example1, metadata: metadata1 },
  { id: '02-secondary-button', Component: Example2, metadata: metadata2 },
  { id: '03-outline-button', Component: Example3, metadata: metadata3 },
  { id: '04-ghost-button', Component: Example4, metadata: metadata4 },
];
```

**Rule**: The `id` must match the filename (without .tsx extension).

#### 3c. DELETE the Hardcoded variants Array

Find and **completely remove** the `variants` array from the `ComponentDetail` object.

**Remove this entire block**:
```tsx
variants: [
  {
    id: 'default',
    name: 'Default',
    description: '...',
    code: `...`,
    preview: <Component />,
  },
  // ... other variants
],
```

The variants will now be loaded from examples.json via loadComponentExamples().

#### 3d. PRESERVE the preview Example

Do **NOT** remove the preview example if it has interactive controls. The preview example serves a special purpose:

```tsx
examples: [
  {
    id: 'preview',
    title: 'Preview',
    description: 'Adjust props to customize the component',
    code: buttonBasicCode,
    preview: <Button>Click me</Button>,
    controls: buttonControls,  // ← This is why we keep it!
    renderPreview: (props: any) => (
      <Button variant={props.variant as any} ...>
        Click me
      </Button>
    ),
  },
  ...loadComponentExamples(examplesData, examplesJson),  // ← Loaded examples follow preview
],
```

The preview example:
- ✅ Provides interactive controls for exploring props
- ✅ Uses `renderPreview()` to dynamically render based on prop changes
- ✅ Should be kept in index.tsx (not moved to example files)
- ❌ Never put this in an example file

---

### Step 4: Regenerate examples.json

Run the generation script to automatically create/update examples.json:

```bash
cd /path/to/ui-lab/app
pnpm --filter @ui-lab/registry run generate-examples-json
```

**What it does**:
- Scans `examples/` directory for all `.tsx` files
- Extracts metadata from `export const metadata = {...}`
- Extracts component code (strips metadata)
- Creates/updates `examples.json` with all examples

**What gets generated**:
```json
{
  "01-basic-button": {
    "title": "Basic Button",
    "description": "A simple primary button...",
    "code": "import React from 'react';\n..."
  },
  "02-secondary-button": {
    "title": "Secondary Button",
    "description": "Secondary action button...",
    "code": "..."
  },
  "03-outline-button": {
    "title": "Outline Button",
    "description": "Outlined button...",
    "code": "..."
  }
}
```

**No manual editing needed** - the script handles everything.

---

### Step 5: Verify Type Safety

Run type checking to ensure no breaking changes:

```bash
cd /path/to/ui-lab/app
pnpm type-check
```

**Expected result**:
- No TypeScript errors
- All imports resolve correctly
- All types match

If errors occur:
- Check that all examples are imported correctly
- Verify metadata naming (metadata1, metadata2, etc.)
- Ensure examplesData array entries have correct ids

---

## Validation Checklist

After completing all steps, verify:

- [ ] All variant files created in `examples/` directory
- [ ] Each file has `export const metadata = {...}`
- [ ] examples/index.ts exports all examples
- [ ] Component index.tsx imports all examples
- [ ] examplesData array updated with all examples
- [ ] Hardcoded variants array removed
- [ ] Preview example preserved (if applicable)
- [ ] examples.json regenerated with all entries
- [ ] pnpm type-check passes without errors
- [ ] Component renders correctly in documentation site
- [ ] All variants visible in variant showcase
- [ ] Interactive controls still work (if applicable)

---

## Common Patterns

### Simple Component (No Interactive Controls)

Examples: Badge, Label, Divider

**Pattern**: Create example files for each variant, remove hardcoded variants array.

```tsx
// In index.tsx
examples: [
  ...loadComponentExamples(examplesData, examplesJson),  // ← That's it!
],
```

---

### Complex Component (With Interactive Controls)

Examples: Button, Toast, Select, Input

**Pattern**: Keep preview example with controls, add variant examples.

```tsx
// In index.tsx
examples: [
  {
    id: 'preview',
    title: 'Preview',
    description: 'Adjust props to customize',
    code: componentBasicCode,
    preview: <Component />,
    controls: componentControls,
    renderPreview: (props) => <Component {...props} />,
  },
  ...loadComponentExamples(examplesData, examplesJson),  // ← Add variant examples
],
```

---

### Components with Controlled State

Examples: Modal, Fold, Confirmation

**Pattern**: Preview example shows interactive state behavior, variant examples show different configurations.

```tsx
// In index.tsx - Preview example shows state management
{
  id: 'preview',
  title: 'Preview',
  code: componentCode,
  preview: <StateManagingComponent />,  // ← Has internal state
  controls: [...],
},

// Variant examples show different prop combinations
...loadComponentExamples(examplesData, examplesJson),
```

---

## Before & After Examples

### Button Component

**Before** (~123 lines, with hardcoded variants):
```tsx
export const buttonDetail: ComponentDetail = {
  // ...
  examples: [
    { id: 'preview', /* ... */ },
    ...loadComponentExamples(examplesData, examplesJson),
  ],
  variants: [  // ← These 4 objects should be files instead
    { id: 'default', /* ... */ },
    { id: 'secondary', /* ... */ },
    { id: 'outline', /* ... */ },
    { id: 'ghost', /* ... */ },
  ],
};
```

**After** (~90 lines, clean):
```tsx
// Import all examples
import Example1, { metadata as metadata1 } from './examples/01-basic-button.js';
import Example2, { metadata as metadata2 } from './examples/02-secondary-button.js';
import Example3, { metadata as metadata3 } from './examples/03-outline-button.js';
import Example4, { metadata as metadata4 } from './examples/04-ghost-button.js';

const examplesData = [
  { id: '01-basic-button', Component: Example1, metadata: metadata1 },
  { id: '02-secondary-button', Component: Example2, metadata: metadata2 },
  { id: '03-outline-button', Component: Example3, metadata: metadata3 },
  { id: '04-ghost-button', Component: Example4, metadata: metadata4 },
];

export const buttonDetail: ComponentDetail = {
  // ...
  examples: [
    { id: 'preview', /* ... */ },
    ...loadComponentExamples(examplesData, examplesJson),
  ],
  // ← No variants array!
};
```

---

### Toast Component

**Before** (~232 lines with 5 variants):
```tsx
export const toastDetail: ComponentDetail = {
  examples: [
    { id: 'preview', /* ... */ },
    ...loadComponentExamples(examplesData, examplesJson),
  ],
  variants: [  // ← 5 hardcoded variant objects
    { id: 'default', /* ... */ },
    { id: 'success', /* ... */ },
    { id: 'destructive', /* ... */ },
    { id: 'info', /* ... */ },
    { id: 'warning', /* ... */ },
  ],
};
```

**After** (~116 lines):
```tsx
// 5 example files created: 02-success.tsx, 03-destructive.tsx, 04-info.tsx, 05-warning.tsx

const examplesData = [
  { id: '01-basic-toast', Component: Example1, metadata: metadata1 },
  { id: '02-success-toast', Component: Example2, metadata: metadata2 },
  { id: '03-destructive-toast', Component: Example3, metadata: metadata3 },
  { id: '04-info-toast', Component: Example4, metadata: metadata4 },
  { id: '05-warning-toast', Component: Example5, metadata: metadata5 },
];

export const toastDetail: ComponentDetail = {
  examples: [
    { id: 'preview', /* ... */ },
    ...loadComponentExamples(examplesData, examplesJson),
  ],
  // ← No variants array!
};
```

---

## Common Pitfalls & Solutions

### ❌ Pitfall: Wrong filename pattern

```tsx
// WRONG - inconsistent naming
02-Button-secondary.tsx
secondary-variant.tsx
secondaryButton.tsx

// CORRECT - follow pattern
02-secondary-button.tsx
```

**Solution**: Use `[NUMBER]-[variant-name]-[component-name].tsx` consistently.

---

### ❌ Pitfall: Missing metadata export

```tsx
// WRONG - no metadata
export default function Example() {
  return <Button>Click</Button>;
}

// CORRECT
export const metadata = {
  title: 'Secondary',
  description: 'Use for supplementary actions.'
};

export default function Example() {
  return <Button variant="secondary">Secondary</Button>;
}
```

**Solution**: Always export metadata object.

---

### ❌ Pitfall: ID mismatch

```tsx
// WRONG - filename doesn't match id
// File: 02-secondary-button.tsx
const examplesData = [
  { id: '02-secondary-btn', /* ... */ },  // ← Different!
];

// CORRECT
{ id: '02-secondary-button', /* ... */ },  // ← Matches filename
```

**Solution**: IDs must exactly match filenames (without .tsx).

---

### ❌ Pitfall: Removing preview example

```tsx
// WRONG - removed preview with controls
examples: [
  ...loadComponentExamples(examplesData, examplesJson),
],

// CORRECT - keep preview for interactive controls
examples: [
  { id: 'preview', title: 'Preview', /* controls */ },
  ...loadComponentExamples(examplesData, examplesJson),
],
```

**Solution**: Keep preview example if component has interactive controls.

---

### ❌ Pitfall: Incorrect import path

```tsx
// WRONG paths
import Example2 from './02-secondary-button';  // Missing .js
import Example2 from './examples/02-secondary-button.tsx';  // Should be .js

// CORRECT
import Example2 from './examples/02-secondary-button.js';
```

**Solution**: Always use `.js` extension in imports (TypeScript will compile .tsx to .js).

---

## Implementation Workflow

```
1. Read current index.tsx → Identify all hardcoded variants
2. Create example files → One file per variant
3. Add metadata → title + description from variant definition
4. Update examples/index.ts → Export all examples
5. Update component index.tsx → Import examples, populate examplesData
6. Remove variants array → Delete hardcoded variants completely
7. Run script → pnpm --filter @ui-lab/registry run generate-examples-json
8. Type check → pnpm type-check
9. Verify → Check files exist, examples.json updated, type-check passes
```

---

## Questions & Answers

**Q: Where do I put the example files?**
A: In the `examples/` subdirectory of your component folder. E.g., `Button/examples/02-secondary-button.tsx`

**Q: What if my variant has complex code?**
A: Put all the code in the example file. The script extracts everything after the metadata export.

**Q: Can I have example files without variants?**
A: Yes! If your component has no variants, just have the basic example. The pattern still works.

**Q: Will this break the documentation site?**
A: No. The examples will load exactly the same way—through `loadComponentExamples()`. The output is identical.

**Q: Do I need to update CSS or component code?**
A: No. This refactoring is purely organizational. No component implementations change.

**Q: Can I keep hardcoded examples along with example files?**
A: No. The pattern eliminates hardcoding. Moving to example files is the whole point.

**Q: What if type-check fails?**
A: Check that all imports and IDs are correct. Ensure metadata naming matches (metadata1, metadata2, etc.).

---

## Scaling Guidelines

This pattern has been tested and validated on:
- ✅ Button (4 variants) - Phase 1
- ✅ Toast (5 variants) - Phase 1
- 🔄 14 Medium-priority components - Phase 2 (pending)
- 🔄 13 Low-priority components - Phase 3 (pending)

**Expected results per component**:
- 30-50% reduction in index.tsx file size
- Zero functional changes
- Single source of truth for examples
- Easier maintenance and updates

---

## References

- `packages/registry/src/utils/load-component-examples.ts` - The utility that loads examples
- `packages/registry/scripts/generate-examples-json.ts` - The script that generates examples.json
- `COMPONENT_EXAMPLES_AUDIT_REPORT.md` - Analysis of all components
- Phase 1 Examples: Button, Toast components (see git history)

---

## Next Steps

1. ✅ Phase 1 Complete: Button, Toast refactored
2. 📋 Phase 2: Migrate 14 medium-priority components (using this pattern)
3. 📋 Phase 3: Migrate 13 low-priority components
4. 📋 Phase 4: Cleanup and optimization

To refactor a new component, follow this document exactly.
