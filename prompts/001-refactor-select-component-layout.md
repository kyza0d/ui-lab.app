<objective>
Refactor the Select component's internal structure so that SelectValue and SelectTrigger are truly separate flex children, not nested within each other. This will enable proper layout control where the value expands to fill available space on the left, and the trigger maintains a fixed width (2.5rem) on the right.

Currently, the trigger's styling constrains the value instead of rendering side-by-side as independent flex items. The goal is to achieve a clean separation that allows the value to take full width while the trigger anchors to the right edge.
</objective>

<context>
**Project**: ui-lab monorepo using Next.js and TypeScript
**Tech Stack**: React with CSS Modules, Tailwind CSS reference
**Component Location**: @packages/@ui/src/components/Select/

**Current Problem**:
- SelectValue and SelectTrigger are being rendered as siblings in the Select container, but the trigger's styling is constraining the value's rendering
- The value should expand to fill available space (flex: 1), while trigger maintains fixed width (2.5rem) on the right
- Both must maintain full height for border styling (e.g., border-l in Group contexts)

**Relevant Files**:
- @packages/@ui/src/components/Select/Select.tsx (main component)
- @packages/@ui/src/components/Select/Select.Trigger.tsx (trigger subcomponent)
- @packages/@ui/src/components/Select/Select.Items.tsx (SelectValue subcomponent)
- @packages/@ui/src/components/Select/Select.module.css (current styling)
- @apps/site/src/app/test/group-select/page.tsx (example usage in Group.Select)

**Design Constraints**:
- Read CLAUDE.md for code style conventions (self-documenting code, no comments, compact style)
- Do NOT change HTML structure unnecessarily
- The absolute positioning approach for trigger may need adjustment based on how SelectTrigger is exported and used
</context>

<requirements>
1. **Analyze Current Structure**:
   - Examine how SelectValue and SelectTrigger are currently being rendered
   - Identify why the trigger constrains the value's width
   - Determine if SelectTrigger component needs restructuring or if CSS-only changes suffice

2. **Refactor for Clean Separation**:
   - Ensure SelectValue expands to full available width (flex: 1)
   - Ensure SelectTrigger maintains fixed width (2.5rem) without constraining siblings
   - Both should stretch to full height for styling purposes
   - The separation must work when these are direct children of .select container

3. **CSS Refinements**:
   - Review the current absolute positioning approach for SelectTrigger (position: absolute, right: 0.75rem)
   - Verify it works correctly with full height stretching
   - Ensure no text overflow or clipping in SelectValue
   - Test that custom classes like border-l still work properly

4. **Component Structure Review**:
   - Check if SelectTrigger needs any internal changes to support absolute positioning
   - Verify SelectValue doesn't have conflicting flex properties
   - Ensure proper alignment and centering for both components

5. **Testing & Verification**:
   - Verify the layout works in default Select usage (all components together)
   - Verify the layout works in Group.Select patterns where Select is used with Group wrapper
   - Confirm both value and trigger maintain full height
   - Check that border styling (e.g., border-l on trigger) works as expected
   - Ensure no text in value gets cut off or positioned incorrectly
</requirements>

<implementation>
**Approach**:
The trigger uses absolute positioning (position: absolute, right: 0.75rem, top: 0, bottom: 0, width: 2.5rem) to remove it from the flex layout. This allows the value to expand naturally without constraint. However, verify this approach:

1. Does SelectTrigger component render correctly when positioned absolutely?
2. Are there any event handlers or focus states that break with absolute positioning?
3. Does the full height stretching work as intended for border styling?

**What NOT to Do**:
- Don't add padding-right to SelectValue to compensate for trigger width (constrains the value)
- Don't use flex properties on the trigger when it's absolutely positioned
- Don't change the component API unless absolutely necessary

**Expected Outcome**:
After refactoring, the Select container should render:
- SelectValue: Takes full available width, left-aligned, flex: 1
- SelectTrigger: Fixed 2.5rem width, absolutely positioned on the right edge
- Both stretch to full container height (2.25rem)
- No constraint or overlap of content between them
</implementation>

<output>
Modify the following files:

1. `./packages/@ui/src/components/Select/Select.module.css`
   - Review and finalize the absolute positioning approach for .trigger
   - Ensure .value has correct flex properties (flex-grow: 1, flex-shrink: 1, flex-basis: 0)
   - Verify .select container has proper flex-direction and alignment
   - Add/adjust any z-index or overflow properties if needed

2. `./packages/@ui/src/components/Select/Select.Trigger.tsx` (if needed)
   - Only modify if absolute positioning breaks component functionality
   - Check for any pointer-events or click handling issues
   - Verify focus/hover states still work

3. `./packages/@ui/src/components/Select/Select.Items.tsx` (if needed)
   - Review SelectValue component to ensure it doesn't have conflicting styles
   - Verify min-width: 0 is set for text truncation to work correctly

Do NOT create new test files or documentation. The solution should be verified against existing usage in @apps/site/src/app/test/group-select/page.tsx.
</output>

<verification>
Before declaring the refactoring complete:

1. **Visual Layout Check**:
   - Load the test page at /test/group-select
   - Verify SelectValue text is fully visible and not clipped
   - Verify SelectTrigger (chevron icon) is on the far right edge
   - Verify both components stretch to full height

2. **Interactive Tests**:
   - Click the trigger to open the dropdown
   - Verify dropdown positioning still works correctly
   - Test with long value text to ensure it doesn't overflow
   - Test Group.Select patterns with custom className on trigger (border-l)

3. **Edge Cases**:
   - Test with empty/placeholder values
   - Test with very long text that needs truncation
   - Test with custom widths from parent Group constraints
   - Test in both default and Group.Select usage patterns

4. **Code Quality**:
   - No unnecessary comments or verbose code
   - CSS properties are minimal and essential
   - Component structure is clean and maintainable
</verification>

<success_criteria>
- SelectValue renders on the left with full width (no constraint from trigger)
- SelectTrigger renders on the right with fixed 2.5rem width
- Both components maintain full height (2.25rem) for styling
- Border styling (e.g., border-l) on trigger works correctly
- Layout works identically in both default Select and Group.Select patterns
- No text clipping or overflow in SelectValue
- All existing functionality preserved (dropdown opening, keyboard navigation, selection)
</success_criteria>
