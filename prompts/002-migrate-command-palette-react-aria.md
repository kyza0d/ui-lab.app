<objective>
Migrate the CommandPalette component from cmdk to react-aria hooks while preserving all existing functionality, styling, and user experience. This is a complete, phased implementation that replaces the underlying behavior library while maintaining the component's public API and visual design.

Reference the comprehensive research document at `prompts/001-react-aria-command-palette-research.md` for detailed hook specifications, accessibility features, and implementation patterns.
</objective>

<context>
This is a component library project using React + TypeScript with Tailwind CSS. The CommandPalette component is located in `packages/components/src/components/CommandPalette/` and currently uses the `cmdk` library for menu behavior, keyboard navigation, and filtering.

**Current Implementation:**
- File: `packages/components/src/components/CommandPalette/CommandPalette.tsx`
- Dependencies: `cmdk` for menu/list behavior
- Styling: CSS modules + Tailwind classes
- Features: Global Cmd+K/Ctrl+K shortcut, search filtering, command grouping/categories, keyboard navigation, icons/descriptions/shortcuts display

**What needs to change:**
- Replace Command component tree with react-aria hooks (useModalOverlay, useDialog, useSearchField, useListBox/useListState, useOption)
- Implement state management with @react-stately hooks
- Preserve search ranking algorithm that scores command relevance
- Maintain all existing CSS/Tailwind styling
- Keep public component API unchanged

**Why this matters:**
The current cmdk dependency introduces a licensing concern and doesn't provide fine-grained control over accessibility. React-aria provides better ARIA support, automatic focus management, and is already used elsewhere in your project.
</context>

<requirements>
**Functional Requirements:**
1. Modal opens/closes with Cmd+K / Ctrl+K (global shortcut)
2. Modal closes with Escape key or click outside
3. Search input filters commands and maintains current ranking algorithm
4. Arrow keys (Up/Down, Home/End) navigate commands
5. Enter key executes selected command
6. Type-ahead search jumps to commands by first letter
7. All command categories/groups display and sort correctly
8. Empty state shows appropriate message when no commands match
9. Icons, descriptions, and keyboard shortcut badges display in menu items
10. Disabled commands are skipped during navigation
11. Focus trap prevents tab focus from escaping the modal
12. Focus is restored to trigger element when modal closes

**Implementation Requirements:**
1. Replace cmdk imports with @react-aria and @react-stately hooks
2. Keep existing component file structure and public props
3. Maintain all existing CSS classes and styling (no visual changes)
4. Remove cmdk from package.json dependencies
5. Preserve command execution callbacks and state updates
6. Handle loading states without breaking navigation

**Accessibility Requirements (will be automatic via react-aria):**
1. Modal has proper role="dialog" and aria-modal="true"
2. Search input has role="searchbox" with aria-label
3. Menu container has role="listbox" with keyboard navigation
4. Menu items have proper role="option" with aria-selected states
5. aria-disabled properly applied to disabled items
6. Focus ring visible only for keyboard navigation (useFocusRing)
7. Screen reader announces command count and current selection
8. All ARIA attributes automatically applied by hooks

**Code Quality:**
1. Extract search ranking logic into a reusable utility or custom hook
2. Use TypeScript strict mode
3. Keep component logic readable and maintainable
4. Properly manage refs for modal, search input, and menu
5. Handle edge cases (empty results, single item, all disabled)
</requirements>

<implementation>
**Core Architecture:**

The implementation uses this hook composition pattern (from research doc):
```
useOverlayTriggerState → manages open/close state
  ├→ useModalOverlay → adds modal focus trap, click-outside, Escape handling
  ├→ useDialog → adds dialog semantics and title association
  ├→ useSearchField → manages search input with clear button
  └→ useListState → manages command selection state
      ├→ useListBox → container with keyboard navigation
      └→ useOption → individual command items with focus/selection
```

**Phase 1: Foundation (Modal + Search)**
1. Create `CommandPaletteModal` wrapper component using useModalOverlay + useDialog
2. Implement `PaletteSearchInput` using useSearchField
3. Move existing styling to these new components
4. Keep filtering logic temporary with current cmdk structure
5. Test: Modal opens/closes, search input works, styling unchanged

**Phase 2: Menu Navigation**
1. Replace Command.List with useListBox + useListState
2. Implement individual items with useOption
3. Move command grouping/category logic to work with React Aria collections
4. Test: Arrow key navigation, Enter execution, item selection

**Phase 3: Search Integration**
1. Extract current search ranking algorithm into `useCommandSearch` hook
2. This hook should return filtered and ranked commands
3. Integrate with useListState for controlled filtering
4. Test: Search filtering works with same ranking as before

**Phase 4: Polish & Accessibility**
1. Add useFocusRing for keyboard-only focus indicators
2. Verify all ARIA attributes are correctly applied
3. Test focus trap and focus restoration
4. Remove cmdk dependency from package.json

**Important Implementation Notes:**

- **Search Algorithm Preservation:** The current cmdk library has a built-in smart search algorithm. Before removing it, extract the scoring logic. If the current implementation uses cmdk's built-in search, you'll need to re-implement the scoring as a custom utility. Reference: `prompts/001-react-aria-command-palette-research.md` section 2.4 shows the pattern for custom filtering with useFilter utility.

- **Collections Pattern:** React Aria uses a "collection" abstraction. You'll work with `useListState` which accepts items and manages selection. The state provides a `collection` object you iterate over.

- **Ref Management:** Every hook that needs DOM access requires a ref. Use `useRef()` for: modalRef, searchInputRef, listBoxRef, and itemRefs. Pass these to the corresponding hooks.

- **Props Spreading:** React Aria hooks return `DOMAttributes` objects that must be spread onto the DOM elements they manage. This is critical for ARIA attributes to be applied.

- **Controlled vs Uncontrolled:** The implementation should support both controlled (parent manages state) and uncontrolled (component manages state) patterns if your current API requires it.

**What NOT to do:**
- Don't change the component's public API or prop interface
- Don't modify CSS/styling (this is purely behavior migration)
- Don't add new features beyond what cmdk currently provides
- Don't use react-aria-components; use raw hooks only for maximum control
- Don't implement focus management manually; let useModalOverlay handle it

**File Organization:**
Keep the current structure:
- `packages/components/src/components/CommandPalette/CommandPalette.tsx` - main component
- `packages/components/src/components/CommandPalette/index.ts` - exports

You may create internal helper files if the main file becomes too large:
- `hooks/useCommandSearch.ts` - if extracting search logic
- `utils/searchRanking.ts` - if extracting ranking algorithm
</implementation>

<output>
Create/modify files with relative paths:
- `packages/components/src/components/CommandPalette/CommandPalette.tsx` - Replace cmdk usage with react-aria hooks implementation, keeping all styling and public API unchanged
- Update `packages/components/package.json` - Remove cmdk dependency, ensure @react-aria and @react-stately are in dependencies
- Optional: Create helper files if search logic extraction is significant (e.g., `packages/components/src/hooks/useCommandSearch.ts`)
</output>

<verification>
Before declaring the migration complete, verify:

1. **No Breaking Changes to Public API**
   - Component accepts same props as before
   - Exported types are unchanged
   - Callbacks (onSelectCommand, onOpenChange, etc.) work identically

2. **Functional Parity with cmdk**
   - [ ] Cmd+K / Ctrl+K opens modal
   - [ ] Escape closes modal
   - [ ] Click outside closes modal
   - [ ] Search filters commands with same ranking as before
   - [ ] Arrow keys navigate (Up/Down, Home/End work)
   - [ ] Enter executes selected command
   - [ ] Type-ahead search jumps to items
   - [ ] All categories display in same order
   - [ ] Empty state shows correctly
   - [ ] Icons, descriptions, shortcuts render
   - [ ] Disabled items are skipped
   - [ ] Focus trap works (Tab doesn't escape modal)
   - [ ] Focus returns to trigger on close

3. **Accessibility Verified**
   - [ ] DevTools inspection shows correct ARIA roles/attributes
   - [ ] Modal has `role="dialog"` and `aria-modal="true"`
   - [ ] Search has `role="searchbox"`
   - [ ] Menu items have `role="option"` with `aria-selected` states
   - [ ] Disabled items have `aria-disabled="true"`
   - [ ] Focus ring appears only with keyboard (not mouse)

4. **Dependencies Updated**
   - [ ] cmdk removed from package.json
   - [ ] No import statements reference cmdk
   - [ ] Build succeeds with `pnpm build`
   - [ ] Type-checking passes with `pnpm type-check`

5. **Performance**
   - [ ] No lag when typing in search
   - [ ] Smooth scrolling with large command lists
   - [ ] Modal animation smooth
</verification>

<success_criteria>
The migration is complete when:

1. **Zero cmdk references remain** in CommandPalette component and package.json
2. **All functional requirements met** - every item in the verification section passes
3. **Search ranking preserved** - commands are scored/ranked identically to current implementation
4. **Styling unchanged** - zero visual differences in component appearance
5. **Accessibility enhanced** - react-aria automatically provides better ARIA coverage than manual implementation
6. **Build succeeds** - `pnpm build` and `pnpm type-check` pass without errors
7. **Component API unchanged** - existing code using CommandPalette requires zero modifications
8. **No regressions** - all existing usage patterns continue to work

The success criteria are met when you can replace cmdk with react-aria and remove the cmdk import without breaking any existing code that uses the CommandPalette component.
</success_criteria>

<research>
Reference the research document for:
- **Section 1:** Hook specifications and parameters for each react-aria hook
- **Section 2:** State management patterns for modal, search, and list state
- **Section 3:** Keyboard navigation implementation details
- **Section 4:** Accessibility features automatically provided
- **Section 5:** Feature comparison table (cmdk vs react-aria)
- **Section 7:** Complete integration examples for each hook pattern
- **Section 8:** Detailed migration path and phased approach
- **Section 9:** Gap analysis and solutions

Read the research document thoroughly before starting implementation to understand the hook APIs and integration patterns.
</research>
