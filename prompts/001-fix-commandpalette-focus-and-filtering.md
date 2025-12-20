<objective>
Fix two critical issues in the CommandPalette component:
1. Input field does not auto-focus when the palette opens
2. Filtering logic doesn't update the command list when user types in the search input

These are blocking issues that prevent the CommandPalette from being functional for end users.
</objective>

<context>
**Project**: UI Lab component library built with React 19 and react-aria hooks
**File**: `./packages/components/src/components/CommandPalette/CommandPalette.tsx`
**Tech Stack**: React 19, react-aria, react-stately, Tailwind CSS

**Current State**:
- CommandPalette component was recently refactored from cmdk to react-aria hooks
- Commands now render correctly in the list (previously showed "No commands found")
- Keyboard navigation (arrow keys, enter) works properly
- BUT: Search input doesn't auto-focus when palette opens, and filtering isn't working

**Problem Details**:
1. When Cmd+K/Ctrl+K opens the palette, focus stays on the window/body instead of the search input
2. When typing in the search input, the list doesn't filter - all commands remain visible despite search query changes
3. The `searchQuery` state is updating (proof: component re-renders) but `filteredCommands` isn't being recalculated correctly

**Architecture Notes**:
- PaletteSearchInput component manages search input with useSearchField hook
- CommandList component renders `filteredCommands` directly (no longer using useListState)
- Filtering is computed via useMemo that depends on [commands, searchQuery]
- Manual keyboard navigation handles arrow up/down/enter via selectedIndex state
</context>

<requirements>
1. **Auto-focus the search input when palette opens**:
   - When `overlayState.isOpen` becomes true, focus should move to `inputRef`
   - Must happen after the DOM is rendered (use useEffect with proper dependency)
   - Focus should be retained on the input as user types

2. **Fix filtering to work correctly**:
   - When user types in search input, `filteredCommands` must update
   - Use the existing `scoreCommandRelevance` function to rank commands
   - Show only commands with score > 0 (exact matches should appear first)
   - When search is empty, show all commands
   - Verify `searchQuery` state is updating correctly by checking the dependency array

3. **Reset keyboard selection when filtering**:
   - When search query changes, reset `selectedIndex` to 0 (first command)
   - This ensures the keyboard selection stays in sync with filtered results

4. **Maintain accessibility**:
   - Input must remain focused during typing
   - Screen readers should announce when results filter
   - ARIA labels and roles should remain intact
</requirements>

<constraints>
**Why these matter**:
- Auto-focus is essential for keyboard-driven UX - users expect immediate typing capability
- Filtering is core functionality - without it, the command palette defeats its purpose
- These issues likely stem from timing problems (rendering before focus) or dependency array issues (filtering not triggering updates)
- Avoid adding new libraries - use only existing react-aria and react hooks

**What to avoid**:
- Don't use setTimeout to force focus - use proper effect dependencies instead
- Don't add multiple focus attempts - single, well-placed effect is cleaner
- Don't modify the Command or CommandPaletteProps interfaces - only fix implementation
- Don't remove or change the scoreCommandRelevance function - it's working correctly
</constraints>

<debugging_approach>
1. **For auto-focus issue**:
   - Check if inputRef is being set correctly in PaletteSearchInput
   - Verify useEffect that should focus the input has correct dependencies
   - Confirm the input element exists in DOM before focus is attempted
   - Test in browser: open palette, check if input has focus (cursor visible, typing works immediately)

2. **For filtering issue**:
   - Add temporary console.log to see:
     - `searchQuery` value when user types
     - `filteredCommands` length and content
     - What `scoreCommandRelevance` returns for typed queries
   - Verify the filteredCommands useMemo depends on both [commands, searchQuery]
   - Check if PaletteSearchInput is actually calling onSearchChange when user types
   - Trace the data: searchInput → onSearchChange → setSearchQuery → useMemo triggered

3. **Test the fix**:
   - Open palette (Cmd+K or Ctrl+K)
   - Verify: input is focused (cursor visible, can type immediately)
   - Type "search" - list should filter to show only matching commands
   - Type "xyz" - list should show "No commands found"
   - Clear search - list should show all commands again
   - Arrow keys should navigate the filtered results
</debugging_approach>

<implementation_strategy>
**Step 1: Fix auto-focus**
- Add a useEffect in CommandPalette that runs when overlayState.isOpen changes from false to true
- Inside the effect, call `inputRef.current?.focus()`
- Dependency array: [overlayState.isOpen]

**Step 2: Verify filtering is connected**
- Check that PaletteSearchInput's onSearchChange prop is being called
- Verify setSearchQuery is being called with the input value
- Confirm the useMemo in CommandPalette has [commands, searchQuery] as dependencies
- Test with console.logs if needed, then remove before finalizing

**Step 3: Reset selection on filter**
- When searchQuery changes, reset selectedIndex to 0
- Add useEffect with dependency [searchQuery]

**Step 4: Test and verify**
- Open browser DevTools
- Test all scenarios: open, type, clear, navigate
- Verify no console errors
- Remove any debug console.logs
</implementation_strategy>

<output>
Modify: `./packages/components/src/components/CommandPalette/CommandPalette.tsx`

Changes needed:
1. Add useEffect to auto-focus inputRef when palette opens
2. Verify/fix the filteredCommands useMemo dependency array
3. Ensure searchQuery state is properly connected to PaletteSearchInput
4. Add useEffect to reset selectedIndex when searchQuery changes
5. Remove any debug console.logs from the implementation
</output>

<verification>
Before declaring the fix complete:

1. **Open CommandPalette** - Press Cmd+K (Mac) or Ctrl+K (Windows/Linux)
   - ✓ Input field is focused (cursor visible)
   - ✓ Can type immediately without clicking input

2. **Test filtering** - With palette open, type each test case:
   - Type "search" → List shows only commands containing "search"
   - Type "xyz" → List shows "No commands found"
   - Type "creat" → List filters to creation-related commands
   - Delete all text → List shows all commands again

3. **Test keyboard navigation** - With filtered results:
   - Arrow Down/Up navigates through filtered commands only
   - Enter executes the selected command
   - No errors in console

4. **Check no debug logs remain**:
   - Run `grep -n "console\." src/components/CommandPalette/CommandPalette.tsx`
   - Should only show legitimate error handling, no debug logs

5. **Type-check passes**:
   - Run `pnpm type-check`
   - No TypeScript errors related to CommandPalette
</verification>

<success_criteria>
- Search input auto-focuses when palette opens (no delay, immediate focus)
- Typing in search input updates the command list in real-time
- Filtering works with the existing scoreCommandRelevance function
- Keyboard selection (selectedIndex) resets to 0 when search query changes
- All demo examples show filtered results correctly
- No console errors or warnings
- Type-check passes without errors
- No debug console.logs remain in the code
</success_criteria>
