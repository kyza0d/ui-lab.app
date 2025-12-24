<objective>
Generate simple, single-example files for all 29 remaining components (excluding Button, which is already complete). Each component needs one basic usage example that demonstrates the core functionality.

This is a parallel, high-volume generation task: you will coordinate sub-agents to create examples for Badge, Breadcrumbs, Card, Checkbox, CommandPalette, Confirm, Divider, Flex, Fold, Form, Gallery, Grid, Group, Input, Label, Menu, Modal, Popover, Progress, Radio, ScrollArea, Select, Slider, Switch, Table, Tabs, TextArea, Toast, and Tooltip.

End goal: Every component has a functioning example file with proper TypeScript structure that integrates with the site's component detail pages.
</objective>

<context>
**Project**: ui-lab - A React component library with interactive showcase website
**Tech Stack**: React, TypeScript, Next.js, TailwindCSS, pnpm monorepo
**Validated Pattern**: Button component examples (reference: packages/registry/src/components/Button/examples/)

**Current State**:
- Button component: ✅ 5 examples + examples.json + index.ts (reference pattern)
- 29 remaining components: Need 1 basic example each
- All 29 components have refactored index.tsx files that import from `./examples/` (checked and ready)
- All components have placeholder index.tsx with `loadComponentExamples` utility ready to use

**Key Files to Reference**:
- @packages/registry/src/components/Button/examples/ - Reference implementation
- @packages/registry/src/utils/load-component-examples.ts - Utility function
- @packages/registry/tsconfig.json - TypeScript configuration (strict: false)

**Component List** (29 total):
Badge, Breadcrumbs, Card, Checkbox, CommandPalette, Confirm, Divider, Flex, Fold, Form, Gallery, Grid, Group, Input, Label, Menu, Modal, Popover, Progress, Radio, ScrollArea, Select, Slider, Switch, Table, Tabs, TextArea, Toast, Tooltip

**Target Structure** (same as Button pattern):
```
packages/registry/src/components/[Component]/examples/
├── 01-basic-[component-name].tsx     (single example file)
├── index.ts                           (re-exports the example)
└── examples.json                      (code snippet for display)
```
</context>

<requirements>
**For Each Component - Single Example File**:

1. **File Creation** (`01-basic-[component-name].tsx`):
   - Location: `packages/registry/src/components/[Component]/examples/`
   - Top-level imports: React, component from 'ui-lab-components'
   - Named export: `metadata` object with `{ title: string, description: string }`
   - Default export: Function named `Example` that returns JSX
   - **CRITICAL**: NO imports/exports inside functions - all at module top level

2. **Example Content**:
   - Demonstrate core/basic functionality only (no advanced props)
   - Use simple, clear JSX that shows primary use case
   - Keep code concise (5-15 lines of JSX)
   - No complex state management, handlers, or conditional logic
   - Should be self-contained and render immediately

3. **Metadata Object**:
   - `title`: Short name like "Basic [Component Name]" or "[Component Name] Example"
   - `description`: 1-2 sentence explanation of what's shown (existing pattern available)
   - Match the style of Button examples

4. **examples/index.ts File**:
   - Single re-export: `export { default as Example1 } from './01-basic-[component-name].js';`
   - Metadata export: `export { metadata as metadata1 } from './01-basic-[component-name].js';`
   - Minimal file - just 2 exports

5. **examples.json File**:
   - Create JSON with single entry: `"01-basic-[component-name]": { title, description, code }`
   - `code` field: Stringified version of the .tsx file content (with escaped quotes and newlines)
   - Must be valid JSON (test with `JSON.parse()` mentally)

6. **Component's index.tsx Update**:
   - Update imports to reference the examples file
   - Define `examplesData` array with single entry: `{ id: '01-basic-[component-name]', Component: Example1, metadata: metadata1 }`
   - Use `loadComponentExamples(examplesData, examplesJson)` in the examples array
   - See Button's index.tsx (line 3-18) for exact pattern

**Quality Standards**:
- TypeScript syntax: valid and compilable (no syntax errors)
- Component usage: correct prop names and types
- JSX: properly formatted and valid React code
- No commented code or console.logs
- No placeholder text like "[Content]" or "TODO"
</requirements>

<constraints>
**DO**:
- ✅ Create exactly ONE example per component
- ✅ Follow Button's pattern precisely
- ✅ Use lowercase filenames with hyphens: `01-basic-badge.tsx`
- ✅ Import component correctly from 'ui-lab-components'
- ✅ Export `default` function and `metadata` const at module level
- ✅ Keep examples simple and focused on core functionality
- ✅ Ensure examples.json is valid JSON
- ✅ Test TypeScript compilation (`pnpm --filter ui-lab-registry type-check`)

**DON'T**:
- ❌ DO NOT create multiple examples per component (only 1 per component)
- ❌ DO NOT modify Button component or its examples
- ❌ DO NOT nest imports/exports inside function bodies
- ❌ DO NOT add advanced props, state, or complex logic
- ❌ DO NOT skip creating examples.json file
- ❌ DO NOT modify component's main index.tsx file structure beyond examples imports
- ❌ DO NOT create any other files beyond: [component]-example.tsx, index.ts, examples.json

**Coordination**:
- All 29 components can be generated IN PARALLEL (no inter-dependencies)
- Each sub-agent handles 3-4 components independently
- No shared file conflicts (each component has its own examples folder)
</constraints>

<implementation>
**Step-by-Step for Each Component**:

1. **Create Single Example File**:
   - Filename: `packages/registry/src/components/[Component]/examples/01-basic-[component-name].tsx`
   - Import React and component
   - Write simple JSX demonstrating basic usage
   - Export metadata and Example function

2. **Create examples/index.ts**:
   - Export Example1 and metadata1 from the .tsx file
   - Keep it minimal (2 lines)

3. **Create examples.json**:
   - Single JSON object with entry for the example
   - Stringify the code from the .tsx file
   - Ensure JSON is valid

4. **Verify Structure**:
   - Check that component's index.tsx has proper imports
   - Ensure all three files exist in examples/ folder
   - Verify no syntax errors

**Example Pattern** (from Button):
```typescript
// File: packages/registry/src/components/Button/examples/01-basic-button.tsx
import React from 'react';
import { Button } from 'ui-lab-components';

export const metadata = {
  title: 'Basic Button',
  description: 'A simple primary button with default styling. Use this as the standard action button in your interface.'
};

export default function Example() {
  return <Button>Click me</Button>;
}
```

**Data Source**:
- For reference implementations, review existing component files in packages/components/src/components/
- For descriptions, draw from component README or purpose
- For usage examples, use primary/simplest props only
</implementation>

<parallelization>
**Sub-Agent Coordination Strategy**:

This task will be split into multiple concurrent agents, each handling a subset of components:

- **Batch 1** (Parallel Agent): Badge, Breadcrumbs, Card
- **Batch 2** (Parallel Agent): Checkbox, CommandPalette, Confirm
- **Batch 3** (Parallel Agent): Divider, Flex, Fold
- **Batch 4** (Parallel Agent): Form, Gallery, Grid
- **Batch 5** (Parallel Agent): Group, Input, Label
- **Batch 6** (Parallel Agent): Menu, Modal, Popover
- **Batch 7** (Parallel Agent): Progress, Radio, ScrollArea
- **Batch 8** (Parallel Agent): Select, Slider, Switch
- **Batch 9** (Parallel Agent): Table, Tabs, TextArea
- **Batch 10** (Parallel Agent): Toast, Tooltip

**Each sub-agent will**:
1. Create example files for their 2-3 assigned components
2. Create examples/index.ts for each
3. Create examples.json for each
4. Verify TypeScript compilation for their components
5. Report success/issues for their batch

**Coordination**: All batches run in parallel. No wait-time between batches.
</parallelization>

<output>
**Deliverables**:

For each of the 29 components, create these three files:

1. `packages/registry/src/components/[Component]/examples/01-basic-[component-name].tsx`
   - Valid TypeScript with React component export and metadata

2. `packages/registry/src/components/[Component]/examples/index.ts`
   - Re-exports Example1 and metadata1

3. `packages/registry/src/components/[Component]/examples.json`
   - Valid JSON with single example entry

**File List to Create** (29 total):
- packages/registry/src/components/Badge/examples/{01-basic-badge.tsx, index.ts, examples.json}
- packages/registry/src/components/Breadcrumbs/examples/{01-basic-breadcrumbs.tsx, index.ts, examples.json}
- packages/registry/src/components/Card/examples/{01-basic-card.tsx, index.ts, examples.json}
- ... (continue for all 29 components)

**After Completion**:
- Run: `pnpm --filter ui-lab-registry type-check`
- Verify: All 29 components compile without errors
- Expected result: Examples integrate with site without issues
</output>

<verification>
**Before declaring success, verify**:

1. **File Existence**: All 87 files created (3 files × 29 components)
   - Each component has: 01-basic-[name].tsx, index.ts, examples.json

2. **TypeScript Compilation**: Run `pnpm --filter ui-lab-registry type-check`
   - Expected: No errors related to the 29 components' examples
   - Button component should still have zero errors

3. **File Content Validation**:
   - .tsx files: Proper imports, exports, valid JSX syntax
   - index.ts files: Export Example1 and metadata1
   - examples.json files: Valid JSON parseable without errors

4. **Import Resolution**:
   - No "Cannot find module" errors
   - Component imports resolve correctly
   - examples.json imports work

5. **Pattern Consistency**:
   - All components follow Button's pattern
   - Metadata objects have same shape
   - Default export function named consistently

**Success Criteria**:
- ✅ 29 components each have 3 files created
- ✅ TypeScript type-check passes with zero new errors
- ✅ All examples.json files are valid JSON
- ✅ Examples are simple and focused (5-15 lines of JSX)
- ✅ Pattern matches Button reference implementation
- ✅ Site can consume all examples without integration issues
</verification>

<success_criteria>
**Task Complete When**:
1. All 29 components have example files created
2. TypeScript compilation passes for all components
3. No syntax errors in any .tsx or .json files
4. examples.json files are valid JSON
5. All files follow the Button reference pattern
6. No import resolution errors in type-check output
</success_criteria>
