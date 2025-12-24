# Button and Toast Refactoring Analysis

**Date**: December 23, 2025
**Scope**: HIGH Priority Component Analysis
**Components**: Button, Toast
**Objective**: Document current structure and create refactoring plan for moving hardcoded variants to example files

---

## Executive Summary

This document analyzes the current implementation of Button and Toast components to understand the duplication pattern and define the refactoring approach that will serve as a template for remaining 28 components.

**Current State**:
- **Button**: 4 hardcoded variants (primary, secondary, outline, ghost) + 1 basic example
- **Toast**: 5 hardcoded variants (default, success, destructive, info, warning) + 1 basic example
- Both use `loadComponentExamples()` utility but duplicate definitions
- Both have hardcoded `variants` arrays that should be migrated to example files

**Goal**: Eliminate duplication by moving variants to dedicated example files and letting examples.json serve as single source of truth.

---

## Current Component Structure

### Button Component

**File**: `packages/registry/src/components/Button/index.tsx`

**Current Structure**:
```
Button/
├── examples/
│   ├── 01-basic-button.tsx       [EXISTING]
│   └── index.ts                   [EXISTING]
├── examples.json                  [1 entry only]
└── index.tsx                       [LARGE: contains hardcoded variants & preview]
```

**Hardcoded Variants (Lines 91-120)**:
1. `default` - Primary action button
   - Title: "Default"
   - Description: "Primary action button with accent background..."
   - Code: `<Button variant="primary">Default Button</Button>`

2. `secondary` - Secondary action button
   - Title: "Secondary"
   - Description: "Secondary action button. Use for supplementary actions."
   - Code: `<Button variant="secondary">Secondary Button</Button>`

3. `outline` - Outlined button
   - Title: "Outline"
   - Description: "Outlined button with border. Use for tertiary actions."
   - Code: `<Button variant="outline">Outline Button</Button>`

4. `ghost` - Minimal ghost button
   - Title: "Ghost"
   - Description: "Minimal ghost button. Use for low-priority actions."
   - Code: `<Button variant="ghost">Ghost Button</Button>`

**Preview Example** (Lines 71-88):
- Includes interactive controls for: variant, size, disabled, easing
- Uses `renderPreview()` to dynamically render based on prop changes
- This should be PRESERVED as it enables interactive exploration

**Current examples.json**:
```json
{
  "01-basic-button": {
    "title": "Basic Button",
    "description": "A simple primary button...",
    "code": "..."
  }
}
```

Only contains 1 basic example; should have 5 total (basic + 4 variants).

---

### Toast Component

**File**: `packages/registry/src/components/Toast/index.tsx`

**Current Structure**:
```
Toast/
├── examples/
│   ├── 01-basic-toast.tsx        [EXISTING]
│   └── index.ts                   [EXISTING]
├── examples.json                  [1 entry only]
└── index.tsx                       [LARGE: contains hardcoded variants & preview]
```

**Hardcoded Variants (Lines 118-228)**:
1. `default` - Standard toast notification
   - Title: "Default"
   - Description: "Standard toast notification with neutral styling."
   - Code: `toastBasicCode` (uses toast with default options)

2. `success` - Success variant
   - Title: "Success"
   - Description: "Toast notification for successful operations."
   - Code: `toast({ ..., variant: 'success' })`

3. `destructive` - Error variant
   - Title: "Destructive"
   - Description: "Toast notification for errors or destructive operations."
   - Code: `toast({ ..., variant: 'destructive' })`

4. `info` - Informational variant
   - Title: "Info"
   - Description: "Toast notification for informational messages."
   - Code: `toast({ ..., variant: 'info' })`

5. `warning` - Warning variant
   - Title: "Warning"
   - Description: "Toast notification for warnings."
   - Code: `toast({ ..., variant: 'warning' })`

**Preview Example** (Lines 78-115):
- Includes interactive controls for: variant, position, duration
- Uses `renderPreview()` to dynamically render toast with different settings
- This should be PRESERVED for interactive exploration

**Current examples.json**:
```json
{
  "01-basic-toast": {
    "title": "Basic Toast",
    "description": "A simple toast notification...",
    "code": "..."
  }
}
```

Only contains 1 basic example; should have 6 total (basic + 5 variants).

---

## Refactoring Plan

### Phase 1A: Button Refactoring

**Step 1: Create Example Files for Variants**

New files to create:
1. `02-secondary-button.tsx` - Secondary variant
2. `03-outline-button.tsx` - Outline variant
3. `04-ghost-button.tsx` - Ghost variant

**Template for each file** (following existing pattern):
```tsx
import React from 'react';
import { Button } from 'ui-lab-components';

export const metadata = {
  title: 'Secondary Button',
  description: 'Secondary action button. Use for supplementary actions.'
};

export default function Example() {
  return <Button variant="secondary">Secondary Button</Button>;
}
```

**Step 2: Update examples/index.ts**

Current:
```ts
export { default as Example1 } from './01-basic-button.js';
export { metadata as metadata1 } from './01-basic-button.js';
```

Updated:
```ts
export { default as Example1 } from './01-basic-button.js';
export { metadata as metadata1 } from './01-basic-button.js';
export { default as Example2 } from './02-secondary-button.js';
export { metadata as metadata2 } from './02-secondary-button.js';
export { default as Example3 } from './03-outline-button.js';
export { metadata as metadata3 } from './03-outline-button.js';
export { default as Example4 } from './04-ghost-button.js';
export { metadata as metadata4 } from './04-ghost-button.js';
```

**Step 3: Update Button/index.tsx**

Changes needed:
1. Add imports for Example2, Example3, Example4
2. Update examplesData array to include all 4 variants:
```tsx
const examplesData = [
  { id: '01-basic-button', Component: Example1, metadata: metadata1 },
  { id: '02-secondary-button', Component: Example2, metadata: metadata2 },
  { id: '03-outline-button', Component: Example3, metadata: metadata3 },
  { id: '04-ghost-button', Component: Example4, metadata: metadata4 },
];
```
3. **REMOVE** the entire `variants` array (lines 91-120)
4. **KEEP** the preview example (lines 71-88) as it provides interactive controls

**Step 4: Run Script to Regenerate examples.json**

Execute: `pnpm --filter @ui-lab/registry run generate-examples-json`

This will automatically update `examples.json` with all 4 variant files.

Expected result:
```json
{
  "01-basic-button": {...},
  "02-secondary-button": {
    "title": "Secondary Button",
    "description": "Secondary action button...",
    "code": "<Button variant=\"secondary\">Secondary Button</Button>"
  },
  "03-outline-button": {...},
  "04-ghost-button": {...}
}
```

**Step 5: Verify Type Safety**

Run: `pnpm type-check`

Ensure no TypeScript errors in the refactored component.

---

### Phase 1B: Toast Refactoring

**Step 1: Create Example Files for Variants**

New files to create:
1. `02-success-toast.tsx` - Success variant
2. `03-destructive-toast.tsx` - Destructive/Error variant
3. `04-info-toast.tsx` - Info variant
4. `05-warning-toast.tsx` - Warning variant

**Template for each file**:
```tsx
import React from 'react';
import { toast, Toaster } from 'ui-lab-components';

export const metadata = {
  title: 'Success Toast',
  description: 'Toast notification for successful operations.'
};

export default function Example() {
  return (
    <>
      <button
        onClick={() =>
          toast({
            title: 'Success',
            description: 'Operation completed successfully',
            variant: 'success',
          })
        }
        className="px-4 py-2 bg-accent-500 text-white rounded"
      >
        Show Success
      </button>
      <Toaster />
    </>
  );
}
```

**Step 2: Update examples/index.ts**

Current:
```ts
export { default as Example1 } from './01-basic-toast.js';
export { metadata as metadata1 } from './01-basic-toast.js';
```

Updated:
```ts
export { default as Example1 } from './01-basic-toast.js';
export { metadata as metadata1 } from './01-basic-toast.js';
export { default as Example2 } from './02-success-toast.js';
export { metadata as metadata2 } from './02-success-toast.js';
export { default as Example3 } from './03-destructive-toast.js';
export { metadata as metadata3 } from './03-destructive-toast.js';
export { default as Example4 } from './04-info-toast.js';
export { metadata as metadata4 } from './04-info-toast.js';
export { default as Example5 } from './05-warning-toast.js';
export { metadata as metadata5 } from './05-warning-toast.js';
```

**Step 3: Update Toast/index.tsx**

Changes needed:
1. Add imports for Example2-5 and their metadata
2. Update examplesData array to include all 5 variants:
```tsx
const examplesData = [
  { id: '01-basic-toast', Component: Example1, metadata: metadata1 },
  { id: '02-success-toast', Component: Example2, metadata: metadata2 },
  { id: '03-destructive-toast', Component: Example3, metadata: metadata3 },
  { id: '04-info-toast', Component: Example4, metadata: metadata4 },
  { id: '05-warning-toast', Component: Example5, metadata: metadata5 },
];
```
3. **REMOVE** the entire `variants` array (lines 118-228)
4. **KEEP** the preview example (lines 78-115) as it provides interactive controls

**Step 4: Run Script to Regenerate examples.json**

Execute: `pnpm --filter @ui-lab/registry run generate-examples-json`

**Step 5: Verify Type Safety**

Run: `pnpm type-check`

---

## Key Implementation Details

### The loadComponentExamples() Utility

From `packages/registry/src/utils/load-component-examples.ts`:

```typescript
export function loadComponentExamples(
  examplesData: ExampleData[],
  examplesJson: Record<string, ExamplesJsonEntry>
): SiteComponentExample[] {
  return examplesData.map((example, index) => {
    const jsonEntry = examplesJson[example.id];
    return {
      id: `example-${index + 1}`,
      title: example.metadata.title,
      description: example.metadata.description,
      code: jsonEntry?.code || '',
      preview: React.createElement(example.Component),
    };
  });
}
```

This utility:
- Takes examplesData array with Components and metadata
- Looks up code snippets from examplesJson by id
- Returns array of SiteComponentExample objects ready to render
- Assigns sequential IDs (example-1, example-2, etc.)

### The generate-examples-json.ts Script

From `packages/registry/scripts/generate-examples-json.ts`:

- Scans each component's `examples/` directory for `.tsx` files
- Extracts metadata from each file's `export const metadata = {...}`
- Strips metadata from code, keeping only the component definition
- Generates `examples.json` with all examples

This is the key automation that makes the pattern work.

---

## Expected Outcomes

### Button Component After Refactoring

**File Size Reduction**:
- Before: ~123 lines (with hardcoded variants)
- After: ~90 lines (variants removed)
- **Reduction: ~27% smaller**

**Functionality**:
- ✅ All 4 variant examples load via loadComponentExamples()
- ✅ Preview example with interactive controls still works
- ✅ examples.json has 5 entries (1 basic + 4 variants)
- ✅ Single source of truth: example files + generated examples.json

### Toast Component After Refactoring

**File Size Reduction**:
- Before: ~232 lines (with hardcoded variants)
- After: ~116 lines (variants removed)
- **Reduction: ~50% smaller**

**Functionality**:
- ✅ All 5 variant examples load via loadComponentExamples()
- ✅ Preview example with interactive controls still works
- ✅ examples.json has 6 entries (1 basic + 5 variants)
- ✅ Single source of truth: example files + generated examples.json

---

## Validation Checklist

For each component after refactoring:

- [ ] All example files created and contain correct metadata
- [ ] examples/index.ts exports all examples correctly
- [ ] index.tsx imports all examples and populates examplesData
- [ ] hardcoded variants array removed from index.tsx
- [ ] Preview example with controls preserved
- [ ] examples.json regenerated with all variants (run script)
- [ ] pnpm type-check passes with no errors
- [ ] Component renders correctly in documentation site
- [ ] All variants display in variant showcase
- [ ] Interactive preview controls work properly

---

## Refactoring Pattern Template

This analysis serves as the template for refactoring the remaining 28 components:

1. **Identify hardcoded variants** in component's index.tsx
2. **Create example files** for each variant (following naming pattern: 02-, 03-, etc.)
3. **Extract metadata** from variant definitions
4. **Update examples/index.ts** to export all examples
5. **Update component index.tsx** to:
   - Import all examples
   - Populate examplesData with all examples
   - Remove hardcoded variants array
   - Keep preview example if interactive controls needed
6. **Regenerate examples.json** using script
7. **Run type-check** to verify no breaking changes

---

## Notes for Implementation

- Button and Toast are good test cases: Button is moderate (4 variants), Toast is complex (5 variants + interactive controls)
- The preview examples are intentionally preserved because they provide interactive control panels
- The examples.json file will be regenerated automatically by the script
- No changes needed to component CSS or implementation files
- The refactoring is purely organizational - no functional changes to the components themselves
- This pattern will be immediately applicable to all 28 remaining components
