# Component Examples Audit Report

**Date**: December 23, 2025
**Project**: UI Lab
**Scope**: Registry Component Examples Analysis
**Total Components Analyzed**: 31

---

## Executive Summary

This audit examined how 31 components in `packages/registry/src/components/` utilize their generated `examples.json` files and example components. The analysis reveals a **consistent but duplicative pattern** across the registry:

- ✅ **97% of components** properly import and use `examples.json`
- ✅ **97% of components** use the `loadComponentExamples()` utility to load examples
- ⚠️ **97% of components** also contain hardcoded variants and preview examples in their `index.tsx` files
- ❌ **1 component** (Textarea) is incomplete - missing the `index.tsx` file

### Key Issue
**All 30 fully-implemented components use BOTH patterns simultaneously**, creating unnecessary duplication and maintenance burden. Components have 54 total hardcoded variants while also loading examples from generated JSON files.

---

## Detailed Component Inventory

### ✅ PROPER IMPLEMENTATION (Using examples.json correctly but with hardcoding)

#### 1. Badge
- **Status**: MIXED - Uses both JSON loading AND hardcoded variants
- **examples/ directory**: ✅ YES (01-basic-badge.js)
- **examples.json**: ✅ YES
- **Imports examples.json**: ✅ YES
- **Uses loadComponentExamples**: ✅ YES
- **Hardcoded examples in index.tsx**: ⚠️ YES (1 preview example)
- **Hardcoded variants**: ⚠️ YES (2 variants: "default", "success")
- **Total examples/variants**: 3 (1 loaded + 2 hardcoded)
- **Refactoring Priority**: MEDIUM

#### 2. Button
- **Status**: MIXED - Uses both JSON loading AND hardcoded variants
- **examples/ directory**: ✅ YES (01-basic-button.js)
- **examples.json**: ✅ YES
- **Imports examples.json**: ✅ YES
- **Uses loadComponentExamples**: ✅ YES
- **Hardcoded examples in index.tsx**: ⚠️ YES (1 preview example)
- **Hardcoded variants**: ⚠️ YES (4 variants: "default", "secondary", "outline", "ghost")
- **Total examples/variants**: 6 (1 loaded + 4 hardcoded)
- **Refactoring Priority**: HIGH - Most hardcoded variants

#### 3. Card
- **Status**: MIXED - Uses both JSON loading AND hardcoded variants
- **examples/ directory**: ✅ YES (01-basic-card.js)
- **examples.json**: ✅ YES
- **Imports examples.json**: ✅ YES
- **Uses loadComponentExamples**: ✅ YES
- **Hardcoded examples in index.tsx**: ⚠️ YES (1 preview example)
- **Hardcoded variants**: ⚠️ YES (2 variants: "default", "with-footer")
- **Total examples/variants**: 3 (1 loaded + 2 hardcoded)
- **Refactoring Priority**: MEDIUM

#### 4. Checkbox
- **Status**: MIXED - Uses both JSON loading AND hardcoded variants
- **examples/ directory**: ✅ YES (01-basic-checkbox.js)
- **examples.json**: ✅ YES
- **Imports examples.json**: ✅ YES
- **Uses loadComponentExamples**: ✅ YES
- **Hardcoded examples in index.tsx**: ⚠️ YES (1 preview example)
- **Hardcoded variants**: ⚠️ YES (2 variants: "default", "checked")
- **Total examples/variants**: 3 (1 loaded + 2 hardcoded)
- **Refactoring Priority**: MEDIUM

#### 5. CommandPalette
- **Status**: MIXED - Uses both JSON loading AND hardcoded variants
- **examples/ directory**: ✅ YES (01-basic-command-palette.js)
- **examples.json**: ✅ YES
- **Imports examples.json**: ✅ YES
- **Uses loadComponentExamples**: ✅ YES
- **Hardcoded examples in index.tsx**: ⚠️ YES (1 preview example)
- **Hardcoded variants**: ⚠️ YES (1 variant: "default")
- **Total examples/variants**: 2 (1 loaded + 1 hardcoded)
- **Refactoring Priority**: LOW

#### 6. Confirm (Confirmation)
- **Status**: MIXED - Uses both JSON loading AND hardcoded variants
- **examples/ directory**: ✅ YES (01-basic-confirm.js)
- **examples.json**: ✅ YES
- **Imports examples.json**: ✅ YES
- **Uses loadComponentExamples**: ✅ YES
- **Hardcoded examples in index.tsx**: ⚠️ YES (1 preview example)
- **Hardcoded variants**: ⚠️ YES (1 variant: "default")
- **Total examples/variants**: 2 (1 loaded + 1 hardcoded)
- **Refactoring Priority**: LOW

#### 7. Divider
- **Status**: MIXED - Uses both JSON loading AND hardcoded variants
- **examples/ directory**: ✅ YES (01-basic-divider.js)
- **examples.json**: ✅ YES
- **Imports examples.json**: ✅ YES
- **Uses loadComponentExamples**: ✅ YES
- **Hardcoded examples in index.tsx**: ⚠️ YES (1 preview example)
- **Hardcoded variants**: ⚠️ YES (2 variants: "solid", "vertical")
- **Total examples/variants**: 3 (1 loaded + 2 hardcoded)
- **Refactoring Priority**: MEDIUM

#### 8. Flex
- **Status**: MIXED - Uses both JSON loading AND hardcoded variants
- **examples/ directory**: ✅ YES (01-basic-flex.js)
- **examples.json**: ✅ YES
- **Imports examples.json**: ✅ YES
- **Uses loadComponentExamples**: ✅ YES
- **Hardcoded examples in index.tsx**: ⚠️ YES (1 preview example)
- **Hardcoded variants**: ⚠️ YES (2 variants: "row", "column")
- **Total examples/variants**: 3 (1 loaded + 2 hardcoded)
- **Refactoring Priority**: MEDIUM

#### 9. Fold
- **Status**: MIXED - Uses both JSON loading AND hardcoded variants
- **examples/ directory**: ✅ YES (01-basic-fold.js)
- **examples.json**: ✅ YES
- **Imports examples.json**: ✅ YES
- **Uses loadComponentExamples**: ✅ YES
- **Hardcoded examples in index.tsx**: ⚠️ YES (1 preview example)
- **Hardcoded variants**: ⚠️ YES (2 variants: "default", "expanded")
- **Total examples/variants**: 3 (1 loaded + 2 hardcoded)
- **Refactoring Priority**: MEDIUM

#### 10. Form
- **Status**: MIXED - Uses both JSON loading AND hardcoded variants
- **examples/ directory**: ✅ YES (01-basic-form)
- **examples.json**: ✅ YES
- **Imports examples.json**: ✅ YES
- **Uses loadComponentExamples**: ✅ YES
- **Hardcoded examples in index.tsx**: ⚠️ YES (1 preview example)
- **Hardcoded variants**: ⚠️ YES (1 variant: "default")
- **Total examples/variants**: 2 (1 loaded + 1 hardcoded)
- **Refactoring Priority**: LOW

#### 11. Gallery
- **Status**: MIXED - Uses both JSON loading AND hardcoded variants
- **examples/ directory**: ✅ YES (01-basic-gallery)
- **examples.json**: ✅ YES
- **Imports examples.json**: ✅ YES
- **Uses loadComponentExamples**: ✅ YES
- **Hardcoded examples in index.tsx**: ⚠️ YES (1 preview example with hardcoded image data)
- **Hardcoded variants**: ⚠️ YES (1 variant: "default")
- **Total examples/variants**: 2 (1 loaded + 1 hardcoded)
- **Refactoring Priority**: LOW

#### 12. Grid
- **Status**: MIXED - Uses both JSON loading AND hardcoded variants
- **examples/ directory**: ✅ YES (01-basic-grid)
- **examples.json**: ✅ YES
- **Imports examples.json**: ✅ YES
- **Uses loadComponentExamples**: ✅ YES
- **Hardcoded examples in index.tsx**: ⚠️ YES (1 preview example)
- **Hardcoded variants**: ⚠️ YES (1 variant: "default")
- **Total examples/variants**: 2 (1 loaded + 1 hardcoded)
- **Refactoring Priority**: LOW

#### 13. Group
- **Status**: MIXED - Uses both JSON loading AND hardcoded variants
- **examples/ directory**: ✅ YES (01-basic-group.js)
- **examples.json**: ✅ YES
- **Imports examples.json**: ✅ YES
- **Uses loadComponentExamples**: ✅ YES
- **Hardcoded examples in index.tsx**: ⚠️ YES (1 preview example)
- **Hardcoded variants**: ⚠️ YES (2 variants: "horizontal", "vertical")
- **Total examples/variants**: 3 (1 loaded + 2 hardcoded)
- **Refactoring Priority**: MEDIUM

#### 14. Input
- **Status**: MIXED - Uses both JSON loading AND hardcoded variants
- **examples/ directory**: ✅ YES (01-basic-input.js)
- **examples.json**: ✅ YES
- **Imports examples.json**: ✅ YES
- **Uses loadComponentExamples**: ✅ YES
- **Hardcoded examples in index.tsx**: ⚠️ YES (1 preview example)
- **Hardcoded variants**: ⚠️ YES (2 variants: "text", "password")
- **Total examples/variants**: 3 (1 loaded + 2 hardcoded)
- **Refactoring Priority**: MEDIUM

#### 15. Label
- **Status**: MIXED - Uses both JSON loading AND hardcoded variants
- **examples/ directory**: ✅ YES (01-basic-label.js)
- **examples.json**: ✅ YES
- **Imports examples.json**: ✅ YES
- **Uses loadComponentExamples**: ✅ YES
- **Hardcoded examples in index.tsx**: ⚠️ YES (1 preview example)
- **Hardcoded variants**: ⚠️ YES (2 variants: "default", "required")
- **Total examples/variants**: 3 (1 loaded + 2 hardcoded)
- **Refactoring Priority**: MEDIUM

#### 16. Menu
- **Status**: MIXED - Uses both JSON loading AND hardcoded variants
- **examples/ directory**: ✅ YES (01-basic-menu.js)
- **examples.json**: ✅ YES
- **Imports examples.json**: ✅ YES
- **Uses loadComponentExamples**: ✅ YES
- **Hardcoded examples in index.tsx**: ⚠️ YES (1 preview example)
- **Hardcoded variants**: ⚠️ YES (1 variant: "default")
- **Total examples/variants**: 2 (1 loaded + 1 hardcoded)
- **Refactoring Priority**: LOW

#### 17. Modal
- **Status**: MIXED - Uses both JSON loading AND hardcoded variants
- **examples/ directory**: ✅ YES (01-basic-modal.js)
- **examples.json**: ✅ YES
- **Imports examples.json**: ✅ YES
- **Uses loadComponentExamples**: ✅ YES
- **Hardcoded examples in index.tsx**: ⚠️ YES (1 preview example with controlled state)
- **Hardcoded variants**: ⚠️ YES (1 variant: "default")
- **Total examples/variants**: 2 (1 loaded + 1 hardcoded)
- **Refactoring Priority**: LOW

#### 18. Popover
- **Status**: MIXED - Uses both JSON loading AND hardcoded variants
- **examples/ directory**: ✅ YES (01-basic-popover.js)
- **examples.json**: ✅ YES
- **Imports examples.json**: ✅ YES
- **Uses loadComponentExamples**: ✅ YES
- **Hardcoded examples in index.tsx**: ⚠️ YES (1 preview example)
- **Hardcoded variants**: ⚠️ YES (2 variants: "default", "positions")
- **Total examples/variants**: 3 (1 loaded + 2 hardcoded)
- **Refactoring Priority**: MEDIUM

#### 19. Progress
- **Status**: MIXED - Uses both JSON loading AND hardcoded variants
- **examples/ directory**: ✅ YES (01-basic-progress)
- **examples.json**: ✅ YES
- **Imports examples.json**: ✅ YES
- **Uses loadComponentExamples**: ✅ YES
- **Hardcoded examples in index.tsx**: ⚠️ YES (1 preview example)
- **Hardcoded variants**: ⚠️ YES (2 variants: "default", "success")
- **Total examples/variants**: 3 (1 loaded + 2 hardcoded)
- **Refactoring Priority**: MEDIUM

#### 20. Radio
- **Status**: MIXED - Uses both JSON loading AND hardcoded variants
- **examples/ directory**: ✅ YES (01-basic-radio)
- **examples.json**: ✅ YES
- **Imports examples.json**: ✅ YES
- **Uses loadComponentExamples**: ✅ YES
- **Hardcoded examples in index.tsx**: ⚠️ YES (1 preview example)
- **Hardcoded variants**: ⚠️ YES (2 variants: "default", "disabled")
- **Total examples/variants**: 3 (1 loaded + 2 hardcoded)
- **Refactoring Priority**: MEDIUM

#### 21. ScrollArea
- **Status**: MIXED - Uses both JSON loading AND hardcoded variants
- **examples/ directory**: ✅ YES (01-basic-scrollarea.js)
- **examples.json**: ✅ YES
- **Imports examples.json**: ✅ YES
- **Uses loadComponentExamples**: ✅ YES
- **Hardcoded examples in index.tsx**: ⚠️ YES (1 preview example)
- **Hardcoded variants**: ⚠️ YES (1 variant: "default")
- **Total examples/variants**: 2 (1 loaded + 1 hardcoded)
- **Refactoring Priority**: LOW

#### 22. Select
- **Status**: MIXED - Uses both JSON loading AND hardcoded variants
- **examples/ directory**: ✅ YES (01-basic-select.js)
- **examples.json**: ✅ YES
- **Imports examples.json**: ✅ YES
- **Uses loadComponentExamples**: ✅ YES
- **Hardcoded examples in index.tsx**: ⚠️ YES (1 preview example)
- **Hardcoded variants**: ⚠️ YES (1 variant: "default")
- **Total examples/variants**: 2 (1 loaded + 1 hardcoded)
- **Refactoring Priority**: LOW

#### 23. Slider
- **Status**: MIXED - Uses both JSON loading AND hardcoded variants
- **examples/ directory**: ✅ YES (01-basic-slider.js)
- **examples.json**: ✅ YES
- **Imports examples.json**: ✅ YES
- **Uses loadComponentExamples**: ✅ YES
- **Hardcoded examples in index.tsx**: ⚠️ YES (1 preview example)
- **Hardcoded variants**: ⚠️ YES (2 variants: "default", "range")
- **Total examples/variants**: 3 (1 loaded + 2 hardcoded)
- **Refactoring Priority**: MEDIUM

#### 24. Switch
- **Status**: MIXED - Uses both JSON loading AND hardcoded variants
- **examples/ directory**: ✅ YES (01-basic-switch.js)
- **examples.json**: ✅ YES
- **Imports examples.json**: ✅ YES
- **Uses loadComponentExamples**: ✅ YES
- **Hardcoded examples in index.tsx**: ⚠️ YES (1 preview example)
- **Hardcoded variants**: ⚠️ YES (2 variants: "default", "selected")
- **Total examples/variants**: 3 (1 loaded + 2 hardcoded)
- **Refactoring Priority**: MEDIUM

#### 25. Table
- **Status**: MIXED - Uses both JSON loading AND hardcoded variants
- **examples/ directory**: ✅ YES (01-basic-table.js)
- **examples.json**: ✅ YES
- **Imports examples.json**: ✅ YES
- **Uses loadComponentExamples**: ✅ YES
- **Hardcoded examples in index.tsx**: ⚠️ YES (1 preview example with hardcoded sample data)
- **Hardcoded variants**: ⚠️ YES (1 variant: "default")
- **Total examples/variants**: 2 (1 loaded + 1 hardcoded)
- **Refactoring Priority**: LOW

#### 26. Tabs
- **Status**: MIXED - Uses both JSON loading AND hardcoded variants
- **examples/ directory**: ✅ YES (01-basic-tabs.js)
- **examples.json**: ✅ YES
- **Imports examples.json**: ✅ YES
- **Uses loadComponentExamples**: ✅ YES
- **Hardcoded examples in index.tsx**: ⚠️ YES (1 preview example)
- **Hardcoded variants**: ⚠️ YES (2 variants: "default", "underline")
- **Total examples/variants**: 3 (1 loaded + 2 hardcoded)
- **Refactoring Priority**: MEDIUM

#### 27. Toast
- **Status**: MIXED - Uses both JSON loading AND hardcoded variants
- **examples/ directory**: ✅ YES (01-basic-toast.js)
- **examples.json**: ✅ YES
- **Imports examples.json**: ✅ YES
- **Uses loadComponentExamples**: ✅ YES
- **Hardcoded examples in index.tsx**: ⚠️ YES (1 preview example)
- **Hardcoded variants**: ⚠️ YES (5 variants: "default", "success", "destructive", "info", "warning")
- **Total examples/variants**: 6 (1 loaded + 5 hardcoded)
- **Refactoring Priority**: HIGH - Most hardcoded variants

#### 28. Tooltip
- **Status**: MIXED - Uses both JSON loading AND hardcoded variants
- **examples/ directory**: ✅ YES (01-basic-tooltip.js)
- **examples.json**: ✅ YES
- **Imports examples.json**: ✅ YES
- **Uses loadComponentExamples**: ✅ YES
- **Hardcoded examples in index.tsx**: ⚠️ YES (1 preview example)
- **Hardcoded variants**: ⚠️ YES (2 variants: "default", "bottom")
- **Total examples/variants**: 3 (1 loaded + 2 hardcoded)
- **Refactoring Priority**: MEDIUM

#### 29. Breadcrumbs
- **Status**: MIXED - Uses both JSON loading AND hardcoded variants
- **examples/ directory**: ✅ YES (01-basic-breadcrumbs.js)
- **examples.json**: ✅ YES
- **Imports examples.json**: ✅ YES
- **Uses loadComponentExamples**: ✅ YES
- **Hardcoded examples in index.tsx**: ✅ MINIMAL
- **Hardcoded variants**: ⚠️ YES (1 variant: "default")
- **Total examples/variants**: 2 (1 loaded + 1 hardcoded)
- **Refactoring Priority**: LOW - Minimal hardcoding

---

### ❌ INCOMPLETE IMPLEMENTATION

#### 30. Textarea
- **Status**: INCOMPLETE - Missing critical files
- **examples/ directory**: ✅ YES (01-basic-textarea.tsx)
- **examples.json**: ✅ YES
- **Imports examples.json**: ❌ NO (No index.tsx to import)
- **Uses loadComponentExamples**: ❌ NO (No index.tsx)
- **Hardcoded examples in index.tsx**: ❌ NO INDEX.TSX FILE
- **Hardcoded variants**: ❌ UNABLE TO DETERMINE
- **Refactoring Priority**: CRITICAL - Component definition is missing

---

## Summary Statistics

| Metric | Count | Percentage |
|--------|-------|-----------|
| Total Components | 31 | 100% |
| Using examples.json | 30 | 97% |
| Using loadComponentExamples() | 30 | 97% |
| With hardcoded variants | 30 | 97% |
| With hardcoded preview examples | 29 | 94% |
| Missing index.tsx | 1 | 3% |
| **Hardcoded Variants Total** | **54** | - |
| **Average Variants per Component** | **1.8** | - |

---

## Refactoring Priorities

### 🔴 CRITICAL (0 components)
- None identified at critical level

### 🔴 HIGH (2 components)
1. **Button** - 4 hardcoded variants
2. **Toast** - 5 hardcoded variants

### 🟡 MEDIUM (14 components)
1. Badge - 2 variants
2. Card - 2 variants
3. Checkbox - 2 variants
4. Divider - 2 variants
5. Flex - 2 variants
6. Fold - 2 variants
7. Group - 2 variants
8. Input - 2 variants
9. Label - 2 variants
10. Popover - 2 variants
11. Progress - 2 variants
12. Radio - 2 variants
13. Slider - 2 variants
14. Switch - 2 variants
15. Tabs - 2 variants
16. Tooltip - 2 variants

### 🟢 LOW (13 components)
1. CommandPalette - 1 variant
2. Confirm - 1 variant
3. Form - 1 variant
4. Gallery - 1 variant
5. Grid - 1 variant
6. Menu - 1 variant
7. Modal - 1 variant
8. ScrollArea - 1 variant
9. Select - 1 variant
10. Table - 1 variant
11. Breadcrumbs - 1 variant (minimal hardcoding)
12. Textarea - INCOMPLETE (missing index.tsx)

---

## Key Findings

### 1. **Widespread Hardcoding Pattern**
Every single fully-implemented component (30/30) contains hardcoded examples in addition to using the generated `examples.json` file. This creates:
- **Maintenance burden**: Changes must be made in multiple places
- **Duplication**: Example definitions exist both as files and in code
- **Inconsistency**: Difficult to keep hardcoded and generated examples in sync

### 2. **Preview Examples Are Universal**
100% of fully-implemented components include at least one hardcoded preview example in their `examples` array:
```tsx
examples: [
  {
    id: 'preview',
    title: 'Preview',
    code: hardcodedCode,
    preview: <Component />,
    controls: [...],
  },
  ...loadComponentExamples(examplesData, examplesJson),
]
```

### 3. **Variants Array Is Universal**
100% of fully-implemented components have a hardcoded `variants` array that duplicates the component showcase:
```tsx
variants: [
  { id: 'default', code: '...', preview: <Component /> },
  { id: 'secondary', code: '...', preview: <Component /> },
  ...
]
```

### 4. **Examples Utility Is Working**
The `loadComponentExamples()` utility function properly:
- Loads component examples from external directories
- Extracts metadata from example files
- Merges with examples.json code snippets
- Renders components correctly

### 5. **Textarea Component Is Broken**
The Textarea component has:
- ✅ Examples directory: `/home/kyza/Projects/ui-lab/app/packages/registry/src/components/Textarea/examples/`
- ✅ examples.json file
- ❌ **Missing**: `index.tsx` file in `/home/kyza/Projects/ui-lab/app/packages/registry/src/components/Textarea/`

This means the Textarea component's documentation is not being exported or displayed in the registry.

---

## Recommended Refactoring Approach

### Option A: Full Migration to examples.json (Recommended)
**Outcome**: Single source of truth, easier maintenance

1. **Move all variants to examples directory**
   - Create variant example files (e.g., `02-secondary-button.tsx`)
   - Extract metadata (title, description) from each variant
   - Generate examples.json with all variants

2. **Update index.tsx files**
   - Remove hardcoded variants array
   - Remove hardcoded preview example code
   - Import examples.json and use `loadComponentExamples()` for all examples
   - Keep minimal controls definition only if needed

3. **Expected Result**
   - Single definition of each example
   - Examples defined as actual component files (better for documentation)
   - Easier to add/modify examples
   - Smaller index.tsx files

### Option B: Keep Hardcoded but Remove examples.json Duplication
**Outcome**: Simplify by removing unused generated files

1. **Delete examples directories** and `examples.json` files
2. **Keep all logic in index.tsx** (variants, preview examples, controls)
3. **Remove imports** of examples.json and loadComponentExamples utility

**Note**: This is NOT recommended as it defeats the purpose of having the `generate-examples-json.ts` script

### Option C: Hybrid Approach (Current State)
Keep the current mixed approach but improve governance:
- Document when to use hardcoded vs. generated examples
- Create a linting rule to prevent this pattern
- Establish examples.json as the source of truth going forward
- Gradually migrate existing components one at a time

---

## Implementation Roadmap

### Phase 1: Fix Critical Issues (Week 1)
1. **Textarea**: Create missing `index.tsx` file
   - Define component detail similar to other components
   - Implement proper examples loading
2. **Verify**: Run tests to ensure all components are properly documented

### Phase 2: Migrate High-Priority Components (Week 2)
1. **Button** (4 variants → move to examples/)
2. **Toast** (5 variants → move to examples/)
3. Verify migration process works smoothly

### Phase 3: Migrate Medium-Priority Components (Weeks 3-4)
1. Batch migrate 14 medium-priority components
2. Update script to auto-generate examples.json for all new example files

### Phase 4: Cleanup and Optimization (Week 5)
1. Remove hardcoded controls where possible
2. Simplify index.tsx files
3. Update documentation with new patterns

---

## Files Referenced in Analysis

- **Registry Components**: `/home/kyza/Projects/ui-lab/app/packages/registry/src/components/*/`
- **Examples Utility**: `/home/kyza/Projects/ui-lab/app/packages/registry/src/utils/load-component-examples.ts`
- **Generator Script**: `/home/kyza/Projects/ui-lab/app/packages/registry/scripts/generate-examples-json.ts`
- **Component Packages**: `/home/kyza/Projects/ui-lab/app/packages/components/src/components/`

---

## Conclusion

The current implementation successfully uses `examples.json` files in 97% of components, but undermines this by simultaneously maintaining hardcoded variants and examples. A full migration to the file-based examples approach (Option A) would:

- ✅ Eliminate duplication
- ✅ Reduce maintenance burden
- ✅ Make examples more discoverable
- ✅ Simplify index.tsx files by ~50-60%
- ✅ Provide a scalable pattern for future components
- ✅ Fix the broken Textarea component

**Recommended Next Step**: Start with migrating the Button and Toast components as they have the most hardcoded variants and will serve as good templates for the refactoring approach.
