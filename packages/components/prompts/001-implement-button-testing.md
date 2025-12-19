<objective>
Implement comprehensive testing for the Button component (@packages/components/src/components/Button/Button.tsx) following the Vitest + React Testing Library + jest-axe + @react-aria/test-utils stack recommended in the research document (@research/component-testing-methods.md).

This establishes the testing foundation that will be applied to all other components in the library. The Button component is an ideal starting point because it's foundational, uses React Aria hooks (useButton, useFocusRing, useHover), and covers multiple testing scenarios: rendering, interaction, accessibility, and keyboard navigation.
</objective>

<context>
**Project**: ui-lab-components - A modern, accessible React component library built with React Aria and Tailwind CSS

**Tech Stack**:
- Build tool: Vite
- Testing: Vitest (not yet configured)
- Component library: React Aria (v3.44.0)
- Styling: Tailwind CSS with CSS Modules

**Current State**:
- Button component exists at @packages/components/src/components/Button/Button.tsx
- Component uses React Aria hooks: useButton, useFocusRing, useHover
- Component supports variants (primary, secondary, outline, ghost) and sizes (sm, md, lg)
- Component accepts both onClick (HTML) and onPress (React Aria) handlers
- No test infrastructure exists yet (no vitest.config.ts, no test setup file)

**Who This Is For**:
This testing implementation will serve as the pattern for testing all 25+ components in the library. The Button test will become the reference implementation that other components follow.

**Reference Files**:
- @research/component-testing-methods.md (Section 7: Example Test Cases - Button example)
- @packages/components/src/components/Button/Button.tsx (component under test)
- @packages/components/package.json (dependencies)
</context>

<requirements>
**Testing Stack Setup**:
1. Install required testing dependencies:
   - vitest@^1.0.0
   - @testing-library/react@^16.0.0
   - @testing-library/jest-dom@^6.0.0
   - @testing-library/user-event@^14.0.0
   - jest-axe@^8.0.0
   - jsdom (for test environment)
   - Note: @react-aria/test-utils is beta but reference it in case it's needed for future ARIA pattern testing

2. Create vitest configuration:
   - File: @packages/components/vitest.config.ts
   - Use jsdom environment
   - Enable CSS module support
   - Configure globals (describe, it, expect, vi available without imports)
   - Add coverage reporting configuration

3. Create test setup file:
   - File: @packages/components/src/tests/setup.ts
   - Import @testing-library/jest-dom matchers
   - Configure cleanup after each test
   - Mock window.matchMedia for responsive component testing
   - Setup any global test utilities

4. Create Button test file:
   - File: @packages/components/src/components/Button/Button.test.tsx
   - Location: Same directory as Button component (not in separate tests folder - this is the established pattern for component libraries)
   - Comprehensive test suite covering all component behaviors

**Button Test Requirements** (Reference Section 7 from research document):

The test file must include tests for:

1. **Rendering Tests** (3-4 tests):
   - Renders with text content
   - Renders with different variants (primary, secondary, outline, ghost)
   - Renders with different sizes (sm, md, lg)
   - Renders with disabled state

2. **Interaction Tests** (2-3 tests):
   - Calls onClick handler when clicked
   - Calls onPress handler when clicked (React Aria specific)
   - Works correctly when disabled

3. **Accessibility Tests** (2-3 tests):
   - Has correct button role
   - Accepts aria-label for accessible name
   - Has no violations per jest-axe automated scan
   - Respects disabled state in accessibility tree

4. **React Aria Integration Tests** (1-2 tests):
   - Validates that React Aria focus ring styles are applied (data-focus-visible attribute)
   - Validates hover state tracking (data-hovered attribute)
   - Validates pressed state tracking (data-pressed attribute)

5. **Styling Tests** (1-2 tests):
   - Applies variant styling classes correctly
   - Applies size styling classes correctly
   - Uses CSS Modules correctly

6. **Snapshot Test** (1 test):
   - Snapshot of rendered button with various props
   - Use sparingly - only for layout validation, not as sole validation

7. **Ref Forwarding** (1 test):
   - Ref is properly forwarded to button element

**Code Quality**:
- Use vitest API (describe, it, expect, vi)
- Use semantic queries from React Testing Library (getByRole, getByLabelText, etc.)
- Use userEvent for interactions (not fireEvent)
- Follow the test patterns shown in Section 7 of the research document
- Add descriptive test names that explain what's being tested
- Use type-safe approach - no `any` types

**Package.json Scripts**:
Add these test scripts to @packages/components/package.json:
- "test": "vitest" (watch mode)
- "test:ui": "vitest --ui" (UI dashboard)
- "test:run": "vitest --run" (single run, for CI)
- "test:coverage": "vitest --coverage" (coverage report)

</requirements>

<implementation>
**Approach**:
1. First, install all testing dependencies into @packages/components
2. Create vitest.config.ts with zero-config approach (leverage existing Vite setup)
3. Create test setup file with necessary mocks and utilities
4. Implement Button.test.tsx following the research document patterns
5. Verify all tests pass
6. Update package.json with test scripts

**Why This Order**:
- Dependencies first ensures import statements will resolve
- Config must exist before tests can run
- Test file is last because it depends on setup being correct

**Important Details**:
- The Button component uses CSS Modules (Button.module.css), so vitest must support CSS Module imports
- The component uses React Aria's useButton hook, which provides buttonProps that must be merged into the button element
- The component implements focus ring, hover, and pressed state tracking - these MUST be tested
- Keep tests focused on behavior, not implementation details (test by role, not by className)
- Use data-* attributes (which the Button component exposes) to validate state when necessary, but prefer semantic queries first
- Do NOT create a separate tests/ folder in the Button component directory - place the test file alongside the component

**What to Avoid**:
- Don't test CSS properties directly (use snapshot for layout validation)
- Don't use fireEvent instead of userEvent
- Don't test implementation details like ref handling unless critical
- Don't assume window.matchMedia exists (mock it in setup.ts)
- Don't use any Playwright or E2E testing for this component-level test
- Don't skip jest-axe accessibility checks - they catch real issues

**Tailwind Integration Note**:
The component uses Tailwind classes for styling. In jsdom, CSS won't actually be evaluated, so tests validating styling via className assertions are acceptable. For real visual validation, snapshots serve as the safety net.
</implementation>

<output>
Create or modify these files:

1. **@packages/components/vitest.config.ts** - Vitest configuration
   - Must support JSX/TSX
   - Must support CSS Modules
   - Must use jsdom environment
   - Must have globals: true for test API
   - Should include coverage configuration

2. **@packages/components/src/tests/setup.ts** - Test setup and utilities
   - Import and extend jest-dom matchers
   - Configure afterEach cleanup
   - Mock window.matchMedia
   - Any shared test utilities

3. **@packages/components/src/components/Button/Button.test.tsx** - Button component tests
   - At least 13-15 test cases
   - Cover all requirements listed above
   - Use describe() block for organization
   - Follow patterns from research document Section 7

4. **@packages/components/package.json** - Updated with test scripts
   - Add test, test:ui, test:run, test:coverage scripts

Do NOT create:
- Separate tests/ folder inside Button directory
- test-utils or helpers files for just Button (these can be added later when shared patterns emerge)
</output>

<verification>
Before declaring this task complete, verify:

1. **Dependencies installed**: Run `pnpm --filter @ui-lab/components install` and confirm vitest, @testing-library/react, jest-axe appear in node_modules

2. **Configuration valid**: Run `pnpm --filter @ui-lab/components run test:run` - should complete without config errors

3. **Tests execute**: All tests in Button.test.tsx should pass
   - Run: `pnpm --filter @ui-lab/components run test:run`
   - Expected: ✓ 13-15 passing tests
   - No console errors or warnings

4. **Test coverage**: Run `pnpm --filter @ui-lab/components run test:coverage` and verify:
   - Button.tsx has 80%+ coverage
   - All critical paths covered (rendering, interaction, accessibility)

5. **Accessibility validation**: In Button.test.tsx, at least one test uses jest-axe's `toHaveNoViolations()` and passes

6. **Type safety**: No TypeScript errors in test file
   - Run: `pnpm --filter @ui-lab/components run type-check`
   - All test files should pass type checking

7. **React Aria integration validated**: At least one test verifies React Aria-specific behavior (focus ring, hover state, or pressed state)
</verification>

<success_criteria>
✓ Vitest configuration created and valid
✓ Test setup file created with necessary mocks
✓ Button.test.tsx created with 13-15 comprehensive tests
✓ All tests pass (100% green)
✓ Jest-axe accessibility tests included and passing
✓ At least 80% code coverage for Button.tsx
✓ Package.json updated with test scripts
✓ No TypeScript errors
✓ Test file can serve as a reference pattern for future component tests
</success_criteria>
