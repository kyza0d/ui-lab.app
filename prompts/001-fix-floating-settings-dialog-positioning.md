<objective>
Fix the floating settings dialog positioning in the theme settings component so it displays directly below the trigger button, centered horizontally, without any initial flash, off-screen content, or repositioning flicker.

The dialog should spawn at the correct position on first render with no visual artifacts, remain properly positioned during scroll and resize events, and maintain all existing drag-to-move functionality.
</objective>

<context>
This is a React/Next.js component using TypeScript in a monorepo using pnpm.

Current implementation location:
- @/apps/site/src/features/theme/components/floating-settings-dialog.tsx

The component is triggered from:
- @/apps/site/src/features/landing/components/settings-panel.tsx

Current issues:
1. Dialog flashes in top-right corner before repositioning to correct location
2. Dialog extends off-screen (half the width is hidden)
3. Position calculation doesn't account for actual rendered dimensions before initial render
4. Horizontal centering logic is incorrect (aligns right edge instead of center)

Dialog CSS dimensions:
- Width: `w-100` (Tailwind = 25rem = 400px)
- Height: `h-143` (Tailwind = 35.75rem = 572px)
</context>

<requirements>
1. **Positioning Logic**:
   - Dialog should appear 10px below the trigger button
   - Dialog should be centered horizontally relative to trigger (trigger center = dialog center)
   - Use `getBoundingClientRect()` to measure trigger and dialog dimensions
   - Formula for horizontal centering: `left = triggerRect.left + (triggerRect.width / 2) - (dialogWidth / 2)`

2. **Viewport Safety**:
   - If dialog extends below viewport bottom, flip it to appear above the trigger
   - If dialog extends beyond left edge, shift it 8px from left edge
   - If dialog extends beyond right edge, shift it 8px from right edge
   - Recalculate position on scroll and resize events

3. **No Flash/Flicker**:
   - Dialog must render with correct position from first paint (no initial (0,0) position)
   - No repositioning should be visible after initial render
   - Consider that `dialogRef.current.getBoundingClientRect()` returns (0,0) before first render

4. **Drag Functionality**:
   - Keep existing drag-to-move functionality intact
   - Dragging applies offsets on top of calculated position via `cumulativeOffset`
   - Drag handle is marked with `data-drag-handle` attribute

5. **Keep Existing Behavior**:
   - Component interface must remain unchanged (same props)
   - Backdrop click to close functionality
   - All existing event listeners and state management
   - No removal of floating-ui library (library is already removed in current code)

Constraints and WHY:
- Must not add external dependencies or use floating-ui (the current manual calculation approach is correct, just needs fixing)
- Position must be calculated before dialog renders to initial position (this prevents the flash)
- Must use standard browser APIs only (`getBoundingClientRect()`, viewport dimensions, etc.)
</requirements>

<implementation>
The core issue is in the `calculatePosition()` function. Here's what needs to change:

**Current broken logic (line 41)**:
```typescript
let left = triggerRect.right - dialogRect.width;
```
This aligns the right edge of the dialog with the right edge of the trigger, causing it to appear far to the right.

**Correct centering logic**:
```typescript
let left = triggerRect.left + (triggerRect.width / 2) - (dialogRect.width / 2);
```
This calculates the trigger's center point and subtracts half the dialog width to center it.

**How the positioning flow works**:
1. When `isOpen` becomes true, the dialog renders (return statement happens)
2. After render, `useEffect` runs (because of `isOpen` dependency)
3. `calculatePosition()` is called with `setTimeout(..., 0)` to ensure dialog is measured first
4. `dialogRef.current.getBoundingClientRect()` gets the actual rendered dimensions
5. Position is set in state and applied to the dialog via inline styles

**The key to avoiding flash**:
- The `position.top` and `position.left` start at `{ top: 0, left: 0 }` (line 25)
- After `calculatePosition()` updates state, the dialog gets the correct position
- The setTimeout ensures the DOM has rendered before measuring

**What to verify**:
- The horizontal centering formula is now correct
- Viewport boundary checks still work (above/below and left/right shifting)
- Scroll/resize event listeners still trigger recalculation
- Drag offset still applies correctly on top of calculated position
</implementation>

<output>
Modify: `./apps/site/src/features/theme/components/floating-settings-dialog.tsx`

The fix is a single line change:
- Line 41: Change `let left = triggerRect.right - dialogRect.width;` to `let left = triggerRect.left + (triggerRect.width / 2) - (dialogRect.width / 2);`

The component should:
1. Export the same `SettingsDialog` component with identical props and behavior
2. Keep all drag, backdrop, and UI structure unchanged
3. Keep component interface unchanged (same props)
4. Require no new imports or dependencies
</output>

<verification>
After making the fix, verify the following behaviors:

1. **Initial render**: Open the settings dialog - it should appear directly below the trigger button, NOT in the top-right corner
2. **Horizontal alignment**: Dialog should be centered horizontally aligned with the trigger button (centers match)
3. **No flash/flicker**: Dialog should appear at correct position on first render with no repositioning visible
4. **Viewport safety**:
   - Trigger near bottom of screen → dialog appears above trigger instead
   - Trigger near left edge → dialog shifts right to stay in viewport
   - Trigger near right edge → dialog shifts left to stay in viewport
5. **Scroll behavior**: Scroll the page - dialog position updates and stays below/above trigger
6. **Resize behavior**: Resize the window - dialog recalculates position and stays in viewport
7. **Drag functionality**: Drag the dialog - it moves relative to calculated position
8. **Open/close cycle**: Close and re-open dialog - positions correctly each time without errors

Success means: Dialog appears centered below trigger on first render, never flashes or moves unexpectedly, respects viewport boundaries, and all existing features work as before.
</verification>

<success_criteria>
- Dialog appears centered below the trigger button on first render (no flash in top-right)
- Dialog never extends off-screen or shows hidden content
- Dialog repositions correctly on scroll and resize events
- Dialog drag-to-move functionality works as before
- No console errors or TypeScript type errors
- Component maintains identical API (props interface unchanged)
- All visual and functional tests pass
</success_criteria>
