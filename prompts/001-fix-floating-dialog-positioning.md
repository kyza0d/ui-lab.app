<objective>
Fix the floating settings dialog positioning so it spawns directly below the trigger button and is centered horizontally relative to it, without the top-right flash or overflow issues that currently exist.

The dialog should:
- Appear centered below the trigger button (not top-right)
- Never show off-screen content
- Have no initial flash or repositioning flicker
- Remain properly positioned during scroll and resize events
- Maintain drag-to-move functionality
</objective>

<context>
This is a React/Next.js component using TypeScript in a monorepo using pnpm.

Current implementation location:
@/apps/site/src/features/theme/components/floating-settings-dialog.tsx

The component is triggered from:
@/apps/site/src/features/landing/components/settings-panel.tsx

Current issues:
1. Dialog flashes in top-right corner before repositioning to the correct location
2. Dialog extends off-screen (half the width is hidden)
3. Previous floating-ui implementation wasn't working reliably
4. Position calculation doesn't account for actual rendered dimensions before initial render

The dialog has these CSS dimensions:
- Width: `w-100` (Tailwind class = 25rem = 400px)
- Height: `h-143` (Tailwind class = 35.75rem = 572px)
</context>

<requirements>
1. **Positioning Logic**:
   - Dialog should appear 10px below the trigger button
   - Dialog should be centered horizontally relative to the trigger (trigger's center point = dialog's center point)
   - Use `getBoundingClientRect()` to measure actual trigger and dialog dimensions

2. **Viewport Safety**:
   - If dialog extends below viewport, flip it above the trigger
   - If dialog extends beyond left/right edges, shift it to stay fully in viewport with 8px padding from edges
   - Recalculate position on scroll and resize events

3. **No Flash/Flicker**:
   - Dialog must render with correct position from the first paint
   - Use layout mechanisms to prevent initial render at (0, 0)
   - Consider using `display: none` initially or position calculation before render

4. **Drag Functionality**:
   - Keep existing drag-to-move functionality intact
   - Dragging should apply offsets on top of the calculated position

5. **Remove Dependencies**:
   - Complete removal of floating-ui library usage
   - Keep manual calculation simple and self-contained
</requirements>

<implementation>
1. Remove all floating-ui imports and hooks
2. Create a `calculatePosition()` function that:
   - Gets trigger rect: `triggerRef.current.getBoundingClientRect()`
   - Calculates center alignment: `triggerRect.left + (triggerRect.width / 2) - (dialogWidth / 2)`
   - Calculates below position: `triggerRect.bottom + 10`
   - Applies viewport constraints for flipping (top/bottom) and shifting (left/right)
3. Use a `useEffect` with `isOpen` dependency that:
   - Only runs when dialog is open
   - Calculates position BEFORE the dialog can render (use `setTimeout(..., 0)` or layout effect)
   - Stores position in React state
4. Apply calculated position as inline `style={{ top, left, position: 'fixed' }}`
5. Attach event listeners for scroll and resize that recalculate position
6. Keep the drag offset logic - apply it on top of calculated position

**Why this approach matters**: Using calculated dimensions ensures the dialog's actual size is known before positioning, eliminating the flash. Centering via the center-point formula is more reliable than edge-alignment for user-facing UI.

**What to avoid**: Don't rely on hardcoded dimensions or assume CSS values will resolve the same way across browsers. Don't use `position: absolute` with fixed top/left from CSS classes - use inline styles for dynamic positioning.
</implementation>

<output>
Modify `./apps/site/src/features/theme/components/floating-settings-dialog.tsx` to:

1. Remove all `@floating-ui/react-dom` imports and related code
2. Rewrite positioning logic from scratch using the implementation approach above
3. Keep the component interface unchanged (props should remain the same)
4. Keep all drag, backdrop, and UI structure unchanged
5. Ensure the dialog renders with correct positioning on initial render (no flash)

The modified file should export the same `SettingsDialog` component with identical props and behavior, only with fixed positioning.
</output>

<verification>
Before declaring the fix complete, verify:
1. Open the settings dialog - it should appear below the trigger button, NOT in the top-right
2. Dialog should be centered horizontally aligned with the trigger button
3. No flash or initial repositioning should occur
4. Dialog should stay fully within viewport when trigger is near edges
5. Scroll the page - dialog position should update and stay below trigger
6. Resize the window - dialog position should recalculate and stay in bounds
7. Drag the dialog - it should move relative to its calculated position
8. Close and re-open the dialog - should position correctly each time
</verification>

<success_criteria>
- Dialog appears centered below the trigger on first render (no flash in top-right)
- Dialog never extends off-screen
- Dialog repositions correctly on scroll/resize
- Dialog drag functionality works as before
- No console errors or warnings
- Component maintains same API (props interface unchanged)
</success_criteria>
