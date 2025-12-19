<objective>
Fix the 3 remaining failing Button component tests:
1. "removes pressed state on mouse up" - The data-pressed attribute is not being set to 'true' on mouse down
2. "supports keyboard activation with Enter key" - onClick not firing when Enter key is pressed
3. "supports keyboard activation with Space key" - onClick not firing when Space key is pressed

The core issue appears to be that React Aria's useButton hook is not properly updating the pressed state, and keyboard events are not being handled correctly to trigger the onClick handler.
</objective>

<context>
Working in the Button component at `./src/components/Button/Button.tsx` which uses React Aria's useButton, useFocusRing, and useHover hooks to manage button state.

Test files:
- `./src/components/Button/tests/Button.aria.test.tsx` - Tests for React Aria state tracking
- `./src/components/Button/tests/Button.interaction.test.tsx` - Tests for keyboard and click interactions

Current status: 66/69 tests passing. All ref forwarding tests are now fixed. The remaining issues are:
1. Pressed state not tracking during mouse interactions (React Aria issue)
2. Keyboard events (Enter, Space) not triggering onClick handlers

@./src/components/Button/Button.tsx
@./src/components/Button/tests/Button.aria.test.tsx
@./src/components/Button/tests/Button.interaction.test.tsx
</context>

<requirements>
1. Investigate why React Aria's `isPressed` state is not being tracked properly during pointer interactions
2. Ensure keyboard activation (Enter and Space keys) properly triggers the onClick handler
3. Fix the test expectations or implementation to match the expected behavior
4. All 69 tests must pass with no warnings about unwrapped act() calls

Technical constraints:
- The Button component must maintain compatibility with React Aria
- mergeProps from React Aria must be used correctly to ensure event handlers are properly merged
- The component currently uses forwardRef and a custom useMergedRef hook
- Do NOT break existing passing tests (66 tests already passing)
</requirements>

<implementation>
Investigate and fix in this order:

1. **Pressed state tracking issue**:
   - The test expects `data-pressed="true"` after `user.pointer({ keys: '[MouseLeft>]', target: button })`
   - Currently receiving `data-pressed="false"`
   - Review how `isPressed` from useButton is being used in the Button component
   - May need to inspect React Aria's buttonProps to see if they're being properly applied
   - Consider: Is mergeProps properly merging the event handlers? Is there a conflict between custom onClick and React Aria's handlers?

2. **Keyboard activation issue**:
   - Tests use `await user.tab()` to focus the button, then `await user.keyboard('{Enter}')` or `await user.keyboard(' ')`
   - These keyboard events should trigger the native button's keyboard behavior
   - The issue may be that the button element is not properly receiving focus or the keyboard events are not reaching the focused element
   - Consider: Does the button element need special event handlers for keyboard support? Is the test setup correct?

3. **Root cause analysis**:
   - Check the order of props in mergeProps - React Aria's mergeProps should properly compose event handlers
   - The onClick prop might be overriding React Aria's internal button behavior
   - For keyboard: native HTML buttons automatically handle Enter/Space, but may need focus management

Hints to investigate:
- The mergeProps call in the render function may need adjustment for proper event handler composition
- Native buttons have built-in keyboard handling for Enter and Space - ensure nothing is preventing this
- The custom onClick handler should not prevent React Aria or native button behavior

Do NOT:
- Add extra dependencies or change the React Aria version
- Modify test files unless absolutely necessary for proper test setup
- Remove or significantly refactor the Button component structure
</implementation>

<output>
Fix the Button component at `./src/components/Button/Button.tsx` to properly:
- Track pressed state from React Aria's useButton hook
- Allow keyboard events to trigger the onClick handler

After fixing:
- Run tests with: `npm test`
- Verify all 69 tests pass
- Ensure no "update was not wrapped in act(...)" warnings appear
</output>

<verification>
Run the Button component tests:
```bash
npm test -- src/components/Button/tests/Button.interaction.test.tsx src/components/Button/tests/Button.aria.test.tsx
```

Verify:
- Button.interaction.test.tsx: Both keyboard activation tests pass
- Button.aria.test.tsx: "removes pressed state on mouse up" test passes
- No "act(...)" warnings in the test output
- All 69 tests in the Button test suite pass
</verification>

<success_criteria>
1. All 69 Button component tests pass
2. Specific passing tests include:
   - "supports keyboard activation with Enter key"
   - "supports keyboard activation with Space key"
   - "removes pressed state on mouse up"
3. No React warnings about unwrapped state updates
4. No modifications to passing tests (66 tests that already pass remain unchanged)
</success_criteria>
