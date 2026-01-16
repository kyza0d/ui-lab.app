<objective>
Fix the Select component's trigger positioning so it renders on the far right of the component, separate from the value. The trigger should maintain full height for styling purposes (e.g., border-l in Group contexts) while the value remains aligned to the start (left). This must work seamlessly in both default Select usage and when rendered as separate components in Group.Select patterns.
</objective>

<context>
The Select component is located in `@packages/@ui/src/components/Select/`.

Current structure:
- `.select` container: parent flex container
- `.value`: displays selected text/placeholder (has `flex: 1`)
- `.trigger`: button with chevron icon (currently renders inline with value)

Usage patterns:
1. **Default**: All components together in one Select
2. **Group pattern** (in @apps/site/src/app/test/group-select/page.tsx):
   ```jsx
   <Group.Select>
     <Select.Value placeholder="All Items" />
     <Select.Trigger className='border-l border-background-700' />
     <Select.Content>...</Select.Content>
   </Group.Select>
   ```

The issue: The trigger renders immediately after the value instead of at the far right end, making custom borders appear inline with content rather than extending full height at the end.

Reference files to examine:
- @packages/@ui/src/components/Select/Select.module.css
- @packages/@ui/src/components/Select/Select.Trigger.tsx
- @packages/@ui/src/components/Select/Select.Items.tsx (SelectValue)
</context>

<requirements>
1. Analyze the current CSS layout structure to understand why flex-shrink and flex properties aren't pushing the trigger right
2. Identify the root cause: Is it the flex container configuration, the trigger button properties, or how children are being laid out?
3. Create a CSS-only solution that makes the trigger appear on the far right while keeping the value on the left
4. Ensure the solution maintains:
   - Full height stretching for all children (important for border-l styling)
   - Value taking up remaining space after trigger
   - Compact trigger button size (no expansion)
   - Works in both standalone and Group.Select contexts
5. Do not change the HTML structure of SelectTrigger or SelectValue components
6. Test the solution mentally against both usage patterns to ensure it works universally
</requirements>

<analysis_steps>
1. **Current State Analysis**: Examine Select.module.css line by line. What is `.select`'s flex configuration? What are the flex properties on `.value` and `.trigger`?
2. **Layout Problem Identification**: Determine why the trigger is rendering inline instead of at the end. Is it:
   - Missing flex properties on `.trigger`?
   - Incorrect justify-content on `.select`?
   - Missing gap or margin handling?
   - Conflicting flex-basis values?
3. **Conceptual Testing**: Walk through how flex layout works:
   - When `.value` has `flex: 1`, it should expand to fill available space
   - The `.trigger` should come after it naturally due to DOM order
   - What's preventing the right alignment?
4. **Solution Design**: Propose the minimal CSS changes needed. Consider alternatives like:
   - Using `margin-left: auto` on trigger
   - Adjusting flex container's `justify-content`
   - Using `flex-basis` values
   - Negative margins or absolute positioning (only if flex doesn't work)
5. **Verification**: Trace through the layout logic to confirm the solution works for:
   - Standalone Select with default sizing
   - Group.Select where parent provides width constraints
   - Both with and without custom `className='border-l'` on trigger
</analysis_steps>

<output>
Modify: `./packages/@ui/src/components/Select/Select.module.css`

Provide your changes with a brief explanation of:
1. What CSS properties you changed and why
2. How the flex layout now works to position elements correctly
3. Why this solution works for both use cases without special handling

Do NOT change any HTML or component files.
</output>

<success_criteria>
The solution successfully:
- Positions the trigger at the far right end of the Select container
- Keeps the value aligned to the left and taking up remaining space
- Maintains full height stretching for children (so `border-l` extends full height)
- Works identically in both default Select and Group.Select patterns
- Uses CSS-only changes without modifying component structure
- Requires no className workarounds or special conditional logic
</success_criteria>

<verification>
Before completing:
1. Explain the flex layout behavior: Why does your solution push the trigger to the right?
2. Trace through a Group.Select example: How does this work when the parent Group provides constraints?
3. Confirm no HTML changes were made to SelectTrigger or SelectValue
4. Verify the CSS is minimal and doesn't introduce unnecessary properties
</verification>
