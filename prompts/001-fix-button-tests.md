<objective>
Fix critical issues in the Button component test suite and add high-priority missing test coverage. The current tests have broken assertions, redundant coverage, and missing edge case scenarios. Your goal is to produce a reliable test suite that accurately validates the Button component's behavior across all interaction patterns.
</objective>

<context>
@packages/components/src/components/Button/Button.tsx - The Button component implementation
@packages/components/src/components/Button/tests/ - The test directory containing 7 test files

The Button component uses React Aria for state management (focus, hover, press) and applies data attributes for styling hooks. The current test suite has several issues that prevent reliable validation:

**Critical Issues Identified:**
1. Button.aria.test.tsx - Attribute value mismatches (expects string `'false'` but component outputs boolean `false`)
2. Button.styling.test.tsx line 117-133 - Impossible assertion expecting all data attributes present simultaneously
3. Button.snapshot.test.tsx - Redundant snapshot tests (12 snapshots for variant×size combinations) that duplicate rendering tests
4. Cross-file redundancy between rendering and styling test files
5. Missing edge case coverage (event propagation, focus management edge cases)

Read the Button.tsx implementation to understand the actual data attribute behavior before fixing tests.
</context>

<requirements>
**Fix existing broken tests:**
1. Update Button.aria.test.tsx to use correct attribute value types (boolean, not string)
2. Update line 17 to verify button actually received focus after tab
3. Fix Button.styling.test.tsx lines 117-133 to only assert attributes that should be present for disabled state
4. Use `.toHaveBeenCalledOnce()` consistently instead of `.toHaveBeenCalled()` where counting matters

**Remove/consolidate redundant tests:**
1. Delete Button.snapshot.test.tsx entirely - snapshots are redundant with rendering tests
2. Consolidate Button.rendering.test.tsx and Button.styling.test.tsx since they test overlapping concerns (variant/size/className)
   - Keep Button.styling.test.tsx as the primary file for prop-to-class mapping
   - Remove duplicate variant/size tests from Button.rendering.test.tsx
   - Keep only content rendering tests in Button.rendering.test.tsx

**Add high-priority missing tests:**
1. Add tests for event propagation (onClick shouldn't bubble if onPress prevents default)
2. Add tests for focus management edge cases (focus state transitions, focus after programmatic click)
3. Add tests for both `disabled` and `isDisabled` prop coexistence - verify they work together correctly
4. Add tests for rapid/multiple clicks to ensure handlers fire correctly

**Organization:**
Keep the 7-file structure but with focused responsibility:
- Button.accessibility.test.tsx - ARIA attributes and axe audits (no changes needed)
- Button.aria.test.tsx - React Aria state management (fix attribute assertions)
- Button.interaction.test.tsx - User interactions and events (add event propagation tests)
- Button.ref.test.tsx - Ref forwarding (no changes needed)
- Button.rendering.test.tsx - Content/children rendering only (remove variant/size duplicates)
- Button.styling.test.tsx - Variant/size/className/data-attributes (consolidate, fix line 117-133)
- DELETE Button.snapshot.test.tsx
</requirements>

<implementation>
**Process:**
1. Review Button.tsx to understand exact data attribute behavior and boolean vs string values
2. Fix Button.aria.test.tsx - correct attribute value types based on component code
3. Fix Button.styling.test.tsx - line 117-133 assertion to match actual behavior
4. Remove redundant tests from Button.rendering.test.tsx (keep only content tests)
5. Add event propagation tests to Button.interaction.test.tsx
6. Add focus edge case tests to Button.aria.test.tsx or Button.interaction.test.tsx (choose best fit)
7. Add `disabled` + `isDisabled` coexistence tests to Button.interaction.test.tsx
8. Delete Button.snapshot.test.tsx

**Why these changes matter:**
- Incorrect assertions prevent the test suite from catching real bugs
- Snapshot tests are brittle and don't test behavior, only structure
- Consolidating related tests reduces maintenance burden and prevents drift
- Missing edge cases means undiscovered bugs in production
- Proper event propagation testing ensures components work correctly in parent-child scenarios

**What to avoid:**
- Don't create overly complex edge case tests - focus on realistic user scenarios
- Don't add tests for React internals we can't control (React's own event bubbling)
- Don't test implementation details (like useRef internals), test behavior only
- Don't add unnecessary mocks - use real user interactions via userEvent
</implementation>

<output>
Update these files:
- `./packages/components/src/components/Button/tests/Button.aria.test.tsx` - Fix attribute assertions, improve focus verification
- `./packages/components/src/components/Button/tests/Button.rendering.test.tsx` - Remove variant/size tests (consolidate to styling), keep content tests only
- `./packages/components/src/components/Button/tests/Button.styling.test.tsx` - Fix line 117-133, consolidate variant/size tests from rendering file, add complex scenario tests
- `./packages/components/src/components/Button/tests/Button.interaction.test.tsx` - Add event propagation tests, add focus edge case tests, add rapid-click tests
- `./packages/components/src/components/Button/tests/Button.ref.test.tsx` - No changes needed

Delete:
- `./packages/components/src/components/Button/tests/Button.snapshot.test.tsx`

All test files should pass with vitest and not produce any false positives or negatives.
</output>

<verification>
After making changes, verify:
1. Run `pnpm test packages/components` and confirm all Button tests pass
2. Confirm no snapshot test files remain in the directory
3. Verify Button.rendering.test.tsx has no variant/size tests (only content/attribute rendering)
4. Verify Button.styling.test.tsx has all variant/size combination tests
5. Verify Button.aria.test.tsx attribute assertions use correct types (boolean values match component)
6. Verify Button.interaction.test.tsx includes tests for event propagation and focus management
7. Run type-check to ensure no TypeScript errors were introduced

Test file should be runnable without errors and provide clear feedback on Button behavior.
</verification>

<success_criteria>
- All Button test files pass without false positives or failures
- No snapshot tests remain (Button.snapshot.test.tsx deleted)
- Button.rendering.test.tsx contains only content/children rendering tests
- Button.styling.test.tsx contains all variant/size/className tests (consolidated)
- Button.aria.test.tsx attribute assertions match component behavior (boolean types, accurate values)
- Button.interaction.test.tsx includes event propagation and focus edge case tests
- Test suite accurately validates component behavior across all interaction patterns
- No redundant test coverage between files
</success_criteria>
