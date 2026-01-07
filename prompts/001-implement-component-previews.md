<objective>
Add primitive visual previews for all components in the UI Lab registry. Each component should have a preview export that either renders a minimal visual representation using div elements or displays a semantically appropriate icon for components that aren't directly visible (modals, tooltips, menus, scrollarea, etc.). These previews will then be imported and used in the component documentation site to replace the current hardcoded preview definitions in `component-registry.tsx`.

The goal is to move preview definitions from the site package into the registry package, making previews centralized, maintainable, and closer to their component definitions.
</objective>

<context>
**Project**: UI Lab monorepo (pnpm workspaces)
**Relevant files to examine**:
- @apps/site/src/features/component-docs/lib/component-registry.tsx - Current preview definitions (lines 99-392)
- @packages/registry/src/components/ - Component export locations

**Current state**: The site has a `previews` object with hardcoded preview JSX for each component. We're moving this responsibility to the registry package.

**Pattern to follow**: Each component in @packages/registry will export a `getPreview()` function or similar that returns React.ReactNode, which will be imported and mapped in the site's component-registry.tsx.

**Icon library**: react-icons/fa6 is already available. Reference the existing icons used in component-registry.tsx for consistency (FaBell, FaWindowRestore, FaKeyboard, FaShieldHalved, FaCircleQuestion, etc.)

**Components requiring icons** (not directly visible):
- tooltip, modal, toast, menu, confirm, scrollarea, form, "command-palette"

**Components with visual previews** (div-based or actual component):
- button, group, flex, grid, table, input, label, textarea, select, switch, checkbox, radio, badge, anchor, breadcrumbs, popover, slider, progress, card, divider, fold, gallery, frame, list
</context>

<requirements>
1. **For each component** in @packages/registry/src/components/:
   - Create or update an `index.ts` (if not exists) to export a `getPreview()` function
   - This function returns `React.ReactNode`
   - For visual components: return JSX using div elements (keep it minimal - roughly 80-120px height)
   - For non-visual components: return an appropriate icon from react-icons/fa6

2. **Visual representation rules**:
   - Use div elements with background colors and minimal styling
   - Match the style/aesthetic of existing previews in component-registry.tsx (use existing Tailwind classes like bg-background-800, text-foreground-300)
   - Keep previews compact and self-contained (fit within ~200px width, ~120px height)
   - Show the component in a representative default state

3. **Icon selection** (for non-visual components):
   - Tooltip → FaCircleQuestion (already used)
   - Modal → FaWindowRestore (already used)
   - Toast → FaBell (already used)
   - Menu → Keep existing approach or use FaEllipsisVertical
   - Confirm → FaShieldHalved (already used)
   - ScrollArea → FaComputerMouse (already used)
   - Form → FaPencil (already used)
   - CommandPalette → FaKeyboard (already used)

4. **After exporting previews from registry**:
   - Update @apps/site/src/features/component-docs/lib/component-registry.tsx
   - Replace the `previews` object (lines 99-392) with imports from @packages/registry
   - Create a new previews object that maps component IDs to their registry-exported previews
   - Ensure all imports at the top pull from the registry package

5. **Code style**:
   - No comments. Write self-documenting code with clear variable names.
   - Use compact, efficient code without unnecessary spacing.
   - Follow kebab-case for filenames (if creating new files).
   - Follow the existing patterns in the codebase.
</requirements>

<implementation>
**Step-by-step approach**:

1. **Analyze the current state**:
   - Review @apps/site/src/features/component-docs/lib/component-registry.tsx to understand each component's existing preview
   - Identify which components need icons vs. visual divs

2. **Create/Update registry exports**:
   - For each component in @packages/registry/src/components/:
     - Check if component has an index.ts
     - Add or create export: `export function getPreview(): React.ReactNode { ... }`
     - Import React and necessary icon library (if needed)
     - Return appropriate JSX (visual div representation or icon)

3. **Update component-registry.tsx**:
   - Remove the entire `previews` object definition
   - Instead, import getPreview functions from @packages/registry
   - Create a new previews object that maps component IDs to: `registryComponentName.getPreview()`
   - Ensure imports are concise and organized

4. **Testing**:
   - Run the site dev server to verify previews render correctly
   - Check that all components display their previews without errors
   - Verify that the registry imports resolve properly

**What to avoid**:
- Don't duplicate icon logic - reuse react-icons/fa6 that's already available
- Don't over-engineer the preview components - they should be minimal representations, not full implementations
- Don't break existing functionality - the previews must render identically to before (or better)
- Don't add unnecessary dependencies to the registry package
</implementation>

<output>
**Modified/Created files**:
- `packages/registry/src/components/[ComponentName]/index.ts` - Add/update getPreview exports for ALL components
- `apps/site/src/features/component-docs/lib/component-registry.tsx` - Replace the previews object and update imports to use registry-exported previews

**File structure** (for new/updated registry files):
Each component index.ts should follow this pattern:
```typescript
import React from 'react';
// ... other imports
export function getPreview(): React.ReactNode {
  // Return JSX
}
```

For icon-based previews, import from react-icons/fa6 at the top.
</output>

<verification>
Before declaring this task complete:

1. **All component previews exported**: Verify that every component in the registry has a getPreview() function
2. **Site imports work**: Check that @apps/site/src/features/component-docs/lib/component-registry.tsx imports all previews without errors
3. **Visual verification**: Run `pnpm dev:site` and navigate to component pages - all previews should render correctly
4. **No broken references**: Ensure no console errors related to missing preview imports
5. **Type safety**: Verify TypeScript compilation passes (run `pnpm type-check`)
</verification>

<success_criteria>
- [x] All components in @packages/registry have getPreview() exports
- [x] getPreview() returns appropriate visual divs for visual components or icons for non-visual components
- [x] component-registry.tsx successfully imports and uses all registry-exported previews
- [x] The site renders without errors when displaying component previews
- [x] TypeScript type-checking passes
- [x] Visual appearance of previews matches or improves upon the original implementation
</success_criteria>
