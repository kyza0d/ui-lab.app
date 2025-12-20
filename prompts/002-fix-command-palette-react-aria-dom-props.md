<objective>
Fix React warnings related to unrecognized DOM props in the CommandPalette component after migrating from cmdk to react-aria hooks. The component builds successfully but throws client-side warnings about non-standard HTML attributes that are being passed through from react-aria hooks to DOM elements.

This is a critical issue because:
1. The warnings indicate that react-aria props are being spread directly onto DOM elements without filtering
2. These props (excludeFromTabOrder, preventFocusOnPress, isDisabled, onPress, onPressStart) are react-aria-specific and shouldn't reach the DOM
3. The warnings clutter the browser console and indicate improper prop handling
4. This needs to be fixed before the component can be considered production-ready
</objective>

<context>
**Recent Work:**
The CommandPalette component was recently refactored from using the `cmdk` library to react-aria hooks (useModalOverlay, useDialog, useSearchField, useListBox, useOption, useFocusRing).

**Current File:**
@packages/components/src/components/CommandPalette/CommandPalette.tsx

**Tech Stack:**
- React 19
- React Aria hooks (@react-aria/*)
- React Stately hooks (@react-stately/*)
- TypeScript
- Tailwind CSS

**Error Messages Being Reported:**
```
React does not recognize the `excludeFromTabOrder` prop on a DOM element
React does not recognize the `preventFocusOnPress` prop on a DOM element
React does not recognize the `isDisabled` prop on a DOM element
Unknown event handler property `onPress`
Unknown event handler property `onPressStart`
```

**Root Cause:**
React-aria hooks return DOMAttributes objects that contain both:
1. Valid HTML props (className, id, role, aria-*, etc.)
2. React-aria-specific internal props (excludeFromTabOrder, preventFocusOnPress, etc.)

These hooks also add custom event handlers (onPress, onPressStart) that aren't standard DOM events.

The problem occurs when these complete DOMAttributes objects are spread directly onto DOM elements without filtering out the non-standard props.
</context>

<requirements>
**Primary Requirement:**
Eliminate all React warnings about unrecognized DOM props by properly filtering react-aria-specific attributes before spreading them onto DOM elements.

**Specific Actions Needed:**
1. Identify all locations in CommandPalette.tsx where react-aria hook return values are spread onto DOM elements (using {...props} pattern)
2. For each location, separate standard HTML/ARIA props from react-aria-specific props
3. Only spread the standard props onto the actual DOM elements
4. Keep the react-aria-specific props for react-aria's internal use via the hooks' built-in mechanisms

**Props Causing Issues:**
- `excludeFromTabOrder` - react-aria internal, controls tab order behavior
- `preventFocusOnPress` - react-aria internal, controls focus behavior on press
- `isDisabled` - react-aria-specific (use `aria-disabled` on DOM instead)
- `onPress` - react-aria custom event (not a valid DOM event handler)
- `onPressStart` - react-aria custom event (not a valid DOM event handler)

**What Should Remain:**
- All standard HTML attributes (className, id, ref, style, etc.)
- All ARIA attributes (role, aria-label, aria-selected, aria-disabled, aria-modal, etc.)
- All standard event handlers (onClick, onFocus, onBlur, etc.)

**Implementation Pattern:**
React-aria provides utilities to help with this:
- The hooks return DOMAttributes which are safe to spread
- Use `mergeProps` utility from @react-aria/utils to safely combine props
- When spreading props onto elements, verify only standard props are being applied
- Consider using TypeScript's strict prop typing to catch issues at compile time

**Note on mergeProps:**
The component already uses `mergeProps` in some places (e.g., mergeProps(optionProps, focusProps)). This is the correct pattern, but we need to verify:
1. All places that spread props are using this pattern correctly
2. No unnecessary spreading of raw hook return values directly to DOM
3. Each component correctly filters/merges props before DOM application
</requirements>

<investigation_steps>
Before implementing fixes, you must:

1. **Identify affected elements** - Search the component for all uses of spread operators with react-aria hook returns
2. **Trace the source** - For each warning, identify which hook is providing the problematic prop
3. **Review hook documentation** - Understand what each hook's return value contains
4. **Check prop filtering** - Look for any existing filtering logic and why it might not be working

**Key areas to examine:**
- PaletteSearchInput component - check inputProps spreading
- CommandListItem component - check optionProps spreading
- CommandList component - check listBoxProps spreading
- Card component wrapper - check how modalProps/dialogProps are applied
</investigation_steps>

<implementation>
**Solution Strategy:**

The core issue is that we need to ensure props are properly filtered before reaching DOM elements. React-aria hooks are designed to work with this pattern, but we need to verify implementation.

**Approach 1: Filter Props Explicitly** (Most explicit)
Create a helper function that removes react-aria-specific props:

```typescript
function filterDOMProps(props: any): Record<string, any> {
  const filtered: Record<string, any> = {};
  const reactAriaProps = new Set([
    'excludeFromTabOrder',
    'preventFocusOnPress',
    'isDisabled',
    'onPress',
    'onPressStart',
  ]);

  for (const [key, value] of Object.entries(props)) {
    if (!reactAriaProps.has(key)) {
      filtered[key] = value;
    }
  }

  return filtered;
}
```

Then apply it before spreading:
```typescript
<div {...filterDOMProps(optionProps)} ref={itemRef}>
```

**Approach 2: Use mergeProps Correctly** (Recommended by React Aria)
Ensure all props are merged using mergeProps before spreading:
```typescript
<div {...mergeProps(optionProps, focusProps)} ref={itemRef}>
```

**Approach 3: Check Hook Documentation** (Verify assumptions)
Some react-aria hooks may already return only valid DOM props. Verify this in the react-aria source/types for each hook:
- useSearchField.inputProps - should be safe
- useListBox.listBoxProps - should be safe
- useOption.optionProps - should be safe
- useModalOverlay.modalProps - might contain internal props
- useDialog.dialogProps - might contain internal props

**Implementation Priority:**
1. First, verify which hooks are returning problematic props (use React DevTools or console.log)
2. Apply the simplest fix (usually mergeProps pattern)
3. Test each component separately
4. Verify no warnings appear in browser console
5. Run type-check to ensure TypeScript catches any prop issues

**Do NOT:**
- Use type assertions like `as any` to hide the problem
- Create new components that re-export without filtering
- Ignore the warnings - they indicate real architectural issues
</implementation>

<output>
Modify the file with the appropriate fixes:
- `./packages/components/src/components/CommandPalette/CommandPalette.tsx` - Apply prop filtering fixes to eliminate all React warnings about unrecognized DOM props. Ensure:
  1. All spread operators using react-aria hook returns properly filter or merge props
  2. No react-aria-specific props reach DOM elements
  3. All ARIA attributes remain intact
  4. Component functionality is preserved
  5. TypeScript compilation passes
</output>

<verification>
Before declaring the fix complete, verify:

1. **Zero console warnings** - Open the component in the browser (when command palette opens) and verify browser console shows NO warnings about:
   - excludeFromTabOrder
   - preventFocusOnPress
   - isDisabled
   - onPress
   - onPressStart

2. **Component functionality preserved** - Test that all features still work:
   - Modal opens with Cmd+K / Ctrl+K
   - Modal closes with Escape
   - Search filtering works
   - Arrow key navigation works
   - Enter executes commands
   - Focus ring appears for keyboard navigation

3. **TypeScript passes** - Run `pnpm type-check` and confirm no errors

4. **Build succeeds** - Run `pnpm build` and confirm successful build with no errors

5. **React DevTools inspection** - Open React DevTools and inspect the rendered elements to confirm:
   - No unrecognized attributes in the DOM
   - ARIA attributes are correctly applied (role, aria-label, aria-selected, etc.)
   - Proper class names from Tailwind are applied
</verification>

<success_criteria>
The migration is complete when:

1. **Zero warnings in browser console** - The component can open without triggering any React prop warnings
2. **Full functionality preserved** - All keyboard navigation, search, command execution, and accessibility features work identically to before
3. **Type-safe** - TypeScript compilation passes with no errors or warnings
4. **Clean build** - `pnpm build` completes successfully
5. **Production-ready** - The component is ready for production use without console noise

The fix validates that the react-aria migration was done correctly and follows best practices for prop handling with react-aria hooks.
</success_criteria>
