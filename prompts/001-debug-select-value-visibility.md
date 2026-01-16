<objective>
Debug and fix the Select component so that SelectValue is properly visible and renders with the correct flex layout. The SelectValue element is currently not displaying even though it's being passed as a child to the Select component.

The refactoring introduced a structural change to separate SelectValue and SelectTrigger as proper flex siblings instead of nesting them, but this broke the visibility of the SelectValue content.
</objective>

<context>
**Project**: ui-lab monorepo using Next.js, TypeScript, React with CSS Modules and Tailwind CSS
**Component Location**: @packages/@ui/src/components/Select/
**Test Page**: @apps/site/src/app/test/group-select/page.tsx

**What happened**:
The Select component was refactored to achieve a clean flex layout where:
- SelectValue expands to fill available width on the left
- SelectTrigger maintains fixed 2.5rem width on the right
- Both are direct flex children at the same level

**The breaking change**:
In Select.tsx, logic was added to detect and reorder child components:
1. Extract SelectTrigger, SelectContent, and everything else
2. Wrap non-SelectTrigger/SelectContent children in a `<span>`
3. Render as: `<span>{wrapped content}</span>` → `{trigger}` → `{content}`

This reordering is supposed to wrap SelectValue (and other children) in a flex span, but SelectValue is not appearing in the rendered output.

**Files modified**:
- @packages/@ui/src/components/Select/Select.tsx - Added component detection and reordering logic
- @packages/@ui/src/components/Select/Select.module.css - Updated flex layout for .select and .trigger
- @packages/@ui/src/components/Select/Select.Trigger.tsx - Removed <span> wrapper around children, now only renders icon

**Current DOM issue**:
The Select container renders, but the SelectValue content is missing. The span wrapper may or may not be visible, but the SelectValue itself is definitely not displaying.
</context>

<requirements>
1. **Understand the detection logic**:
   - Examine the current component detection in Select.tsx (lines 262-279)
   - Determine why SelectValue isn't being detected or wrapped
   - Check if displayName is being set correctly on SelectValue component

2. **Debug component identification**:
   - Verify that SelectValue has `displayName = "SelectValue"` set
   - Confirm that the detection logic in Select.tsx is correctly matching it
   - Add console logging if needed to verify what children are being detected

3. **Identify the rendering issue**:
   - The span wrapper may not be rendering the wrapped content correctly
   - The SelectValue component itself may not be properly passing through children
   - CSS may be hiding the content (check `.value` and `.select > span` styles)

4. **Fix the implementation**:
   - Ensure SelectValue is properly detected and wrapped in the span
   - Verify the flex layout is correct with the new structure
   - Ensure SelectValue displays its content (placeholder or selected text)
   - Test that the layout works in both standalone Select and Group.Select usage

5. **Verify the layout**:
   - SelectValue should display on the left with full width
   - SelectTrigger chevron icon should be on the right at 2.5rem width
   - Both should align vertically and maintain proper height
   - No text should be cut off or hidden
</requirements>

<constraints>
- Do NOT change the HTML structure more than necessary to fix visibility
- The goal is to keep SelectValue and SelectTrigger as flex siblings wrapped correctly
- Maintain backward compatibility - the component API should not change
- Keep the solution simple and focused on fixing the visibility issue
- Do NOT add comments - write self-documenting code with clear logic
</constraints>

<investigation_steps>
1. Check Select.Items.tsx to verify SelectValue has proper displayName and component export
2. Review the current detection logic in Select.tsx and understand what it's trying to do
3. Trace through a real render to see what children are being passed
4. Verify the CSS for `.select > span` and `.value` are correctly configured
5. Check if there's an issue with how the wrapped content array is being rendered
6. Test with console.log if needed to verify the detection is working
</investigation_steps>

<output>
After debugging and fixing, modify:

1. **@packages/@ui/src/components/Select/Select.tsx**
   - Fix the component detection logic if needed
   - Ensure SelectValue is properly identified and wrapped
   - Verify the render output structure is correct

2. **@packages/@ui/src/components/Select/Select.Items.tsx** (if needed)
   - Verify SelectValue component setup and displayName

3. **@packages/@ui/src/components/Select/Select.module.css** (if needed)
   - Verify `.select > span` and `.value` styles are correct
   - Ensure no CSS is hiding the content

Report what was broken and how it was fixed in a brief text explanation.
</output>

<verification>
Before declaring the issue fixed, verify:

1. **Visual rendering**:
   - Load @apps/site/src/app/test/group-select/page.tsx in browser
   - SelectValue text should be visible on the left side
   - SelectTrigger chevron should be visible on the right side
   - Both should be properly aligned and visible

2. **HTML structure check**:
   - In browser DevTools, inspect the Select element
   - Should see: `<div class="select">` → `<span>` → `<div class="value">` with text → `<button class="trigger">` with icon

3. **Layout verification**:
   - SelectValue should expand to fill available width
   - SelectTrigger should maintain fixed 2.5rem width on the right
   - Both should maintain full height (2.25rem)
   - Works in both standalone Select and Group.Select contexts

4. **Functionality test**:
   - Click trigger to open dropdown
   - Select an item
   - Verify the new value displays in SelectValue
   - Verify layout remains correct after selection
</verification>

<success_criteria>
- SelectValue content is visible and displays the selected value or placeholder text
- SelectValue renders on the left side of the Select container with full width
- SelectTrigger renders on the right side with fixed 2.5rem width
- Both components are properly aligned vertically
- The span wrapper is in the HTML and contains SelectValue
- Component detection logic correctly identifies and wraps SelectValue
- Layout works identically in both standalone Select and Group.Select usage
- No text is cut off or hidden
- All existing functionality preserved (dropdown opening, selection, keyboard navigation)
</success_criteria>
