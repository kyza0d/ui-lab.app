<objective>
Fix the Checkbox component's broken accessibility implementation that prevents the tactile scale animation from working correctly. The component should properly apply React Aria's `data-pressed` attribute during click interactions to maintain the 0.96 scale transform throughout the entire press duration, providing consistent tactile feedback like other interactive components in the library.

This is critical because the current implementation loses the scale animation when the checkbox is clicked and held, breaking the expected tactile micro-interaction pattern established across all other components.
</objective>

<context>
The UI Lab component library uses React Aria for accessible form controls. Recent updates added subtle tactile scale transforms (0.96 scale) to interactive components for a more responsive, satisfying user experience. However, the Checkbox component's CSS animation relies on the `data-pressed="true"` attribute from React Aria, which is not being properly applied during interactions.

**Current Problem:**
- CSS rule: `.base[data-pressed="true"] { transform: scale(0.96); }`
- The animation works for other components (Badge, Button, etc.) that properly receive the data-pressed attribute
- Checkbox animation breaks because the React Aria hook/component integration isn't correctly exposing or applying the pressed state
- When users click and hold a checkbox, the scale animation disappears instead of persisting

**Why This Matters:**
- The accessibility layer (React Aria) is responsible for managing the `data-pressed` state
- Breaking this connection means the component is not receiving proper interaction state feedback
- This indicates a deeper accessibility issue with how the Checkbox wraps or uses React Aria
- Users with keyboard navigation or assistive technologies may experience missing state indicators

**Files to Examine:**
@packages/components/src/components/Checkbox/Checkbox.tsx
@packages/components/src/components/Checkbox/Checkbox.module.css
Review how other components (Button, Badge, Radio) successfully receive and display the data-pressed attribute
</context>

<requirements>
1. **Identify Root Cause**: Determine why the React Aria `data-pressed` attribute is not being applied to the Checkbox input element during interactions
2. **Fix State Management**: Ensure the component properly receives and passes through React Aria's press state to the DOM
3. **Maintain Animation**: The 0.96 scale transform must apply consistently while the checkbox is pressed and held
4. **Preserve Accessibility**: Do not remove or replace React Aria hooks - only fix how they're integrated with the component
5. **Test Consistency**: Verify the interaction pattern matches other components (Radio, Badge, Switch) that already work correctly
6. **No Breaking Changes**: Maintain backward compatibility with the public component API
</requirements>

<implementation>
1. **Examine the Checkbox Component**: Open the Checkbox.tsx file and understand how it's using React Aria hooks (likely useCheckbox or similar)
2. **Compare with Working Components**: Look at how Radio.tsx or Badge.tsx correctly integrate React Aria's pressed state
3. **Check Data Attribute Flow**: Verify that React Aria's press-related attributes are being spread onto the DOM element
4. **Fix the Hook Integration**: The most likely issue is that `data-pressed` is not being spread from the hook's returned object to the input element's attributes
5. **Validate the Fix**: Ensure the CSS rule `.base[data-pressed="true"]` now correctly triggers the scale(0.96) transform
6. **Test Interaction**: Click and hold the checkbox to confirm the scale animation persists throughout the interaction, then releases smoothly

**Key Principle**: The problem is almost certainly in the component's render logic where React Aria's props/attributes are (or aren't) being applied to the DOM. Don't modify CSS - fix the component's use of React Aria.
</implementation>

<output>
Fix the Checkbox component implementation:
- `./packages/components/src/components/Checkbox/Checkbox.tsx` - Update the component to properly apply React Aria's data-pressed attribute from the hook to the input element
- Verify no CSS changes are needed (the CSS rule already exists correctly in Checkbox.module.css)
- Include brief comments explaining the fix for future maintainers
</output>

<verification>
Before declaring the fix complete, perform these tests:

1. **Click and Hold Test**: Click and hold a checkbox in a test environment
   - The element should scale to 0.96 and remain scaled while pressing
   - The scale should smoothly return to 1.0 when released
   - This matches the behavior of Button, Badge, and Radio components

2. **Keyboard Navigation Test**: Tab to a checkbox and press Space/Enter
   - The same scale animation should occur
   - This confirms React Aria is properly managing the pressed state

3. **Visual Regression Test**: Verify other checkbox states (checked, disabled, indeterminate) still work
   - The animation should only apply during press, not affect selection state
   - Disabled checkboxes should not scale

4. **Accessibility Audit**: Check that the fix doesn't remove or obscure any accessibility attributes
   - ARIA attributes should be intact
   - Keyboard navigation should work smoothly
   - Screen reader announcements should remain unchanged

5. **Component Comparison**: Side-by-side test with Radio component
   - Both should have identical tactile feedback behavior during interactions
   - Timing and scale values should match

</verification>

<success_criteria>
- Checkbox properly receives and displays the `data-pressed="true"` attribute during click interactions
- Scale animation (0.96) persists while the checkbox is pressed and held, then smoothly releases
- Animation timing matches other components (150ms with --ease-snappy-pop)
- Keyboard and mouse interactions both trigger the animation correctly
- All existing checkbox functionality remains intact (selection, disabled state, indeterminate state)
- No accessibility regressions introduced
- Code follows the same pattern as working components in the library (Radio, Badge, etc.)
</success_criteria>

<notes>
This is likely a simple fix - the CSS is already correct, so the issue is purely in how the Checkbox component integrates with React Aria. Look for where the input's attributes are set and ensure React Aria's pressed-related attributes are being spread correctly. Reference the Radio component as a working example to compare.
</notes>
