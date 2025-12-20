<objective>
Debug and fix the empty command list in CommandPalette. The palette opens and the search box works, but all command lists show "No commands found" even though commands are being passed to the component. This affects both demo components and the app integration, indicating the issue is in the component's command rendering logic.
</objective>

<context>
**Current State:**
- CommandPalette component was recently migrated from cmdk to react-aria hooks
- React warnings about unrecognized DOM props have been fixed with filterDOMProps
- The palette opens correctly with Cmd+K / Ctrl+K
- Search input is functional
- BUT: Commands never display, always shows "No commands found"

**Files Involved:**
- @packages/components/src/components/CommandPalette/CommandPalette.tsx - Main component (lines 340-372 have filteredCommands logic)
- @apps/site/src/lib/component-demos/command-palette.tsx - Demo components that are also broken
- @apps/site/src/components/layout/Header.tsx - App integration passing commands correctly (line 567)

**Tech Stack:**
- React 19 with react-aria hooks (useListBox, useOption, useListState, etc.)
- The component uses useListState to manage list selection

**Problem Indicators:**
1. Demos pass commands explicitly but get "No commands found"
2. Command list item components exist but never render
3. Search box works (can type, filter runs) but filters empty array
4. Footer hint doesn't appear (line 429 checks commands.length > 0)
</context>

<requirements>
Thoroughly analyze the command data flow to identify why commands aren't displaying:

1. **Trace the data flow:**
   - Verify commands prop is reaching the component
   - Check if filteredCommands is receiving the commands correctly
   - Verify items variable in listState is being populated
   - Check if the collection in CommandList component has any items

2. **Add diagnostic logging:**
   - Log the commands prop value when component renders
   - Log filteredCommands to verify it's not empty
   - Log listState.collection to see if items reach the list
   - Log the mounted and overlayState.isOpen flags (line 383)

3. **Identify the root cause:**
   - Check if there's a dependency array issue preventing updates
   - Verify useListState is being initialized with items correctly
   - Check if there's a mismatch between items array and collection expectation
   - Look for any filtering or validation that might be stripping commands

4. **Fix the issue:**
   - Correct the data flow to ensure commands reach CommandList
   - Ensure CommandListItem components actually render
   - Verify footer hint appears when commands exist

5. **Verify the fix works:**
   - Test with demo components - should show all commands initially
   - Test filtering - should filter by label/description
   - Test with Header.tsx integration - should show navigation commands
</requirements>

<debugging_approach>
Start by adding console.log statements at these key points in CommandPalette.tsx:

1. In the main component, log the commands prop immediately (line 262)
2. After filteredCommands is computed (line 356), log its value
3. In the listState initialization (line 362), log the items being passed
4. In CommandList component, log the commands prop being received (line 212)
5. In CommandList return, log collection.length (line 228)

Then test a demo component (like BasicPreview) to see where the data is getting lost.

**Do not make permanent console.log statements** - only use them for debugging, then remove them before finalizing.
</debugging_approach>

<output>
Modify CommandPalette.tsx with:
1. Diagnostic console.logs at key data flow points
2. Any necessary fixes to restore command display
3. Remove all diagnostic logging before final version
4. Ensure CommandList and CommandListItem components display properly

Do NOT modify demo or app integration code - the issue is in the component itself.
</output>

<verification>
Before declaring the fix complete:

1. **Console inspection:** Open browser DevTools when opening the palette and confirm no console errors appear related to commands
2. **Demo testing:** Go to the component documentation page and test the BasicPreview example - should show 3 commands (search, create, settings) when palette opens
3. **Filtering:** Type "search" in the palette - should filter to show only the search command
4. **App integration:** Press Cmd+K / Ctrl+K and verify the Header.tsx integration shows all navigation commands
5. **Visual verification:** No "No commands found" message should appear when commands are provided

The fix is complete when:
- All demo examples show commands correctly
- Filtering works as expected
- App integration shows navigation commands
- No console errors appear
</verification>

<success_criteria>
- Demo components display their commands (not "No commands found")
- Filtering/search works correctly
- App integration shows all commands from Header.tsx
- No console warnings or errors
- No diagnostic logging remains in the code
- Type-check passes without errors
- All CommandPalette functionality works as intended
</success_criteria>
