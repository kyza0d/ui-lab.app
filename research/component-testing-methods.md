# Comprehensive Testing Methods for React Aria Component Libraries
## Research & Recommendations for ui-lab-components

**Document Status:** Comprehensive Research
**Date:** December 2025
**Scope:** Component-level testing for React components built with React Aria and Tailwind CSS

---

## Section 1: Executive Summary

### Recommended Testing Approach

For ui-lab-components, a **Vitest + React Testing Library + jest-axe stack** provides the optimal balance of simplicity, performance, and comprehensive coverage:

- **Primary Tool:** Vitest with React Testing Library for unit and integration tests
- **Accessibility:** jest-axe for automated accessibility checks
- **Keyboard Testing:** React Aria test-utils (@react-aria/test-utils) for pattern-specific interactions
- **Visual:** Snapshot testing for layout validation (not headless browser testing)
- **Playwright:** Only for critical cross-browser validation (optional, not required)

### Key Decision Factors

1. **Alignment with existing setup:** Your project already uses Vite, making Vitest a natural fit with zero additional configuration overhead
2. **React Aria integration:** The @react-aria/test-utils package (beta, released Jan 2025) provides first-class testing support for accessibility patterns
3. **Avoid unnecessary complexity:** Headless browser testing (Playwright) adds maintenance burden without solving problems that unit/integration tests cannot handle
4. **Accessibility-first design:** Testing Library's role-based queries naturally align with React Aria's accessibility-focused architecture
5. **Developer experience:** Vitest offers superior DX with HMR-driven test execution and instant feedback compared to Jest

### Quick Answer to Key Questions

| Question | Answer |
|----------|--------|
| **Primary testing framework?** | Vitest + React Testing Library |
| **Use Playwright?** | No, unless you need cross-browser visual validation beyond unit testing |
| **Maximize React Aria?** | Use @react-aria/test-utils for pattern testing + RTL for semantic queries |
| **Minimal viable setup?** | Vitest, RTL, jest-axe, and React Aria test-utils—nothing more needed |
| **Effective accessibility testing?** | Combine jest-axe for automated checks with RTL role queries + keyboard simulation |

---

## Section 2: Testing Methods Comparison Table

| Method | Setup Complexity | Best Use Cases | Limitations | Maintenance | Vite Integration |
|--------|------------------|-----------------|-------------|-------------|------------------|
| **Jest + RTL** | Medium | Most React components, unit/integration tests | Requires careful config, slower HMR | Moderate | Fair (extra config) |
| **Vitest + RTL** | Low | Modern React projects, component libraries | Limited to modern browsers in tests | Low | Excellent (zero config) |
| **React Aria Test Utils** | Low-Medium | ARIA pattern validation, keyboard nav, focus management | Only supports specific patterns, beta | Low | Excellent |
| **jest-axe** | Low | Automated accessibility compliance | Only catches 30-50% of issues, needs manual review | Low | Good |
| **Playwright Components** | High | Visual validation, complex interactions, cross-browser | Heavy maintenance, slower CI, overkill for unit testing | High | Good (via Vite) |
| **Snapshot Testing** | Low | Layout validation, CSS regression detection | Can become brittle, requires discipline to avoid | Low | Excellent |
| **Visual Regression (headless)** | High | Pixel-perfect visual testing, design system validation | Expensive, complex setup, slow CI | High | Moderate |

---

## Section 3: Detailed Analysis of Each Method

### 1. Jest + React Testing Library (Traditional Approach)

#### How It Works
Jest is a test runner that executes JavaScript tests in a Node.js environment using jsdom (a simulated DOM). React Testing Library provides utilities to render React components and query them using semantic queries that align with how users interact with the UI (by role, label, text).

#### Pros
- **Mature ecosystem:** Industry standard with extensive documentation and community solutions
- **Widespread adoption:** Familiar to most React developers
- **Comprehensive:** Works with all React patterns, not limited to specific component types
- **Integration testing ready:** Naturally supports testing component interactions

#### Cons
- **Slower feedback loop:** Jest's startup time is slower than modern alternatives
- **More configuration:** Requires more setup, especially with TypeScript and CSS modules
- **Simulated DOM limitations:** jsdom has gaps with focus events and some DOM APIs
- **HMR support:** Better than older tools, but not as smooth as Vitest

#### When to Use
- If you have an existing Jest setup you want to maintain
- If you need to support React Native applications (Jest is mandatory there)
- When you must use a specific Jest plugin not yet ported to Vitest

#### Code Example
```javascript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './Button';

test('button triggers onClick handler on click', async () => {
  const handleClick = vi.fn();
  render(<Button onClick={handleClick}>Click me</Button>);

  const button = screen.getByRole('button', { name: /click me/i });
  await userEvent.click(button);

  expect(handleClick).toHaveBeenCalledOnce();
});
```

#### Accessibility Assertions
```javascript
test('button is accessible', () => {
  render(<Button disabled>Click me</Button>);
  const button = screen.getByRole('button', { name: /click me/i });
  expect(button).toBeDisabled();
});
```

---

### 2. Vitest + React Testing Library (Recommended Primary)

#### How It Works
Vitest is a modern test runner built on Vite that executes tests in Node.js with a simulated DOM (jsdom or happy-dom). It supports all React Testing Library utilities and provides HMR-driven test execution with live reloading.

#### Pros
- **Excellent DX:** HMR-driven test execution means tests re-run instantly on file changes
- **Zero config with Vite:** Inherits your existing Vite configuration, no additional setup needed
- **Speed:** Significantly faster startup and execution than Jest
- **Modern tooling:** Native ESM support, TypeScript out of the box
- **Jest-compatible API:** Drop-in replacement—use same RTL queries and matchers
- **Active development:** Rapidly improving, backed by Vue community but framework-agnostic

#### Cons
- **Younger ecosystem:** Fewer niche plugins than Jest (but all core ones are available)
- **Still using jsdom:** Same DOM simulation limitations as Jest (focus events, etc.)
- **Browser APIs:** Some APIs used in components may need polyfills

#### When to Use
- **Recommended for new projects**—especially those already using Vite
- For component libraries where DX and speed matter
- When you want to avoid Jest's configuration overhead
- If you have no dependency on Jest-specific plugins

#### Code Example
```javascript
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './Button';

describe('Button', () => {
  it('handles click events', async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Submit</Button>);

    await userEvent.click(screen.getByRole('button'));

    expect(onClick).toHaveBeenCalled();
  });
});
```

---

### 3. React Aria Test Utils (@react-aria/test-utils)

#### How It Works
A specialized testing toolkit released by Adobe in January 2025 (currently beta) that provides pattern-specific test utilities for ARIA components. It abstracts the complexity of testing accessibility patterns by providing high-level methods for interactions like "select option," "toggle checkbox," etc.

#### Supported Patterns (Beta)
- CheckboxGroup, ComboBox, GridList, ListBox
- Menu, RadioGroup, Select, Table
- Tabs, Tree

#### Pros
- **Accessibility-first design:** Built specifically for ARIA patterns, understands keyboard behavior
- **Reduces boilerplate:** High-level methods for common interactions
- **Semantic testing:** Encourages testing by component role, not implementation
- **Keyboard navigation:** Excellent for testing Tab, arrow keys, Enter, etc.
- **First-class support:** Directly from React Aria creators

#### Cons
- **Beta/limited scope:** Only supports specific ARIA patterns (not all components)
- **Setup requirements:** Needs React 18+, @testing-library/react@16, @testing-library/user-event@14
- **Newer tool:** Less community examples than Jest/RTL
- **Not a replacement:** Complements RTL, not a standalone solution

#### When to Use
- For testing React Aria-based components with keyboard navigation
- When you need to verify focus management and trap focus
- For testing complex ARIA patterns (Select, ComboBox, Menu, etc.)
- **Combine with RTL:** Use test-utils for pattern-specific checks, RTL for general queries

#### Code Example
```javascript
import { render } from '@testing-library/react';
import { User } from '@react-aria/test-utils';
import Select from './Select';

test('Select navigation with keyboard', async () => {
  const user = new User();
  render(<Select label="Choose"><Item>Option 1</Item></Select>);

  const selectTester = await user.getSelectTester();
  await selectTester.openMenu();
  await selectTester.selectItem('Option 1');

  expect(await selectTester.getSelectedItems()).toContain('Option 1');
});
```

---

### 4. jest-axe (Automated Accessibility Testing)

#### How It Works
jest-axe wraps the axe-core accessibility engine with Jest matchers, scanning rendered components for WCAG compliance issues during unit tests.

#### Pros
- **Quick setup:** Single npm install, integrates with existing tests
- **Catches real issues:** Identifies ~30-50% of common accessibility violations
- **WCAG compliance:** Checks against WCAG 2.0, 2.1, 2.2 (A, AA, AAA levels)
- **Fast execution:** Runs as part of your test suite
- **Developer friction:** Low—add to existing render calls

#### Cons
- **Limited coverage:** Misses 50-70% of accessibility issues
- **False positives:** Can report issues that don't impact real users
- **Manual audit required:** Automated testing must be supplemented with manual testing
- **Not a substitute:** Cannot replace keyboard testing or screen reader validation

#### When to Use
- In every test as a quick compliance check
- To catch common issues early (contrast, missing labels, etc.)
- As part of your CI/CD pipeline
- **Not as a replacement** for manual accessibility testing

#### Code Example
```javascript
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import Button from './Button';

expect.extend(toHaveNoViolations);

test('Button has no accessibility violations', async () => {
  const { container } = render(
    <Button>Click me</Button>
  );

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

---

### 5. Playwright Component Testing

#### How It Works
Playwright can mount React components into a real browser (Chrome, Firefox, Safari) during tests. Components run in a real DOM with full browser APIs available, enabling pixel-perfect visual testing and complex interaction validation.

#### Architecture
- Components compile via Vite into a facade HTML page
- Tests in Node.js use Playwright to interact with the component in-browser
- Supports real browser rendering, CSS, layout, animations

#### Pros
- **Real browser environment:** Tests with actual CSS rendering, layout, animations
- **Visual validation:** Can screenshot and visually compare against baselines
- **Complex interactions:** Better for testing animations, scrolling, drag-drop
- **Cross-browser testing:** Can test Safari, Firefox, Chrome rendering differences
- **Animation support:** Can test CSS transitions and keyframes

#### Cons
- **High setup overhead:** Configuration, browser management, artifact handling
- **Slow execution:** Launching browsers and rendering is 10-100x slower than unit tests
- **CI complexity:** Browser management, image snapshots, flakiness with visual diffs
- **Maintenance burden:** Visual diffs require constant updates as design evolves
- **Overkill for most components:** Simple components don't need real browser testing
- **Can't test interactive props:** Components limited to serializable data (no callbacks)

#### When to Use
- For components with complex CSS animations or layout
- If you need pixel-perfect visual regression testing
- Only for critical, high-visibility components
- As an addition to unit tests, not a replacement
- **Not recommended** as a primary testing strategy for component libraries

#### Limitations with React Aria
- Cannot easily test keyboard patterns that require focus events (Playwright's focus handling differs from real browsers)
- Visual diffs become expensive quickly with many components
- No advantage over simpler testing for accessibility patterns

#### Code Example
```javascript
import { test, expect } from '@playwright/experimental-ct-react';
import Button from './Button';

test('Button renders and responds to clicks', async ({ mount }) => {
  const clicked = new Promise<void>(resolve => {
    const button = await mount(
      <Button onClick={() => resolve()}>Submit</Button>
    );
  });

  await expect(button).toContainText('Submit');
  await button.click();
  await clicked;
});
```

#### Cost-Benefit Assessment
| Factor | Rating | Notes |
|--------|--------|-------|
| Setup complexity | High | Config, browser management |
| Test execution speed | Slow | 50-500ms per test vs 5-20ms for unit tests |
| Maintenance burden | High | Visual diffs require frequent updates |
| Coverage vs complexity | Poor | Covers same scenarios as simpler unit tests |
| **Recommendation** | **Skip** | Use only for critical visual components (2-3 max) |

---

### 6. Snapshot Testing

#### How It Works
Jest/Vitest snapshots serialize rendered component output to text and compare against stored snapshots. Changes to output generate a diff for developer review.

#### Pros
- **Zero setup:** Works out of the box
- **Catches unintended changes:** Any DOM change generates a diff
- **CSS regression detection:** Tailwind changes will be caught
- **Fast execution:** Serialization is extremely fast
- **Integration testing:** Validates component output, not just individual props

#### Cons
- **Hard to review:** Snapshot diffs are hard for humans to parse
- **Can become brittle:** Snapshots need updates on every intentional change
- **False confidence:** Developers may approve bad snapshots without reviewing
- **Not visual:** Text snapshots don't show actual rendered appearance
- **Git noise:** Snapshot files clutter diffs and git history

#### When to Use
- As a supplement to other tests (not primary)
- For catching unexpected DOM structure changes
- When you want a safety net for CSS regressions
- **Pro tip:** Use with small, focused components (single responsibility)

#### Best Practices
- Update snapshots intentionally: `vitest --update-snapshots`
- Review every snapshot change: Don't blindly approve
- Keep snapshot tests simple: Test one component behavior per snapshot
- Combine with other assertions: Use alongside role-based queries

#### Code Example
```javascript
test('renders Button snapshot', () => {
  const { container } = render(
    <Button variant="primary" disabled>
      Submit
    </Button>
  );
  expect(container).toMatchSnapshot();
});
```

---

### 7. Visual Regression Testing (Headless Browsers)

#### How It Works
Tools like Percy, Chromatic, or Argos take screenshots of components in a headless browser, then compare pixel-by-pixel against baseline images to detect unintended visual changes.

#### Pros
- **Catches visual bugs:** Detects CSS/styling issues automatically
- **Design system validation:** Ensures consistency across design system
- **Pixel-perfect:** Can validate subtle color, spacing, or layout changes
- **CI integration:** Provides visual diffs in pull requests

#### Cons
- **Expensive setup:** Requires hosted service or complex infrastructure
- **Slow CI:** Screenshot generation and comparison adds significant time
- **Maintenance overhead:** Requires updating baselines as design evolves
- **Can be noisy:** Color profiles, font rendering cause false diffs
- **Overkill for components:** Most component styling issues caught by unit tests
- **Not for component libraries:** Tailwind changes are usually intentional

#### When to Use (Rare)
- Only for critical, high-visibility components
- When you have a mature design system that rarely changes
- If branding/visual consistency is critical
- Not recommended for active development phases

#### Recommendation for ui-lab
**Skip this approach.** Snapshot testing + manual review provides sufficient visual validation without the CI overhead and maintenance burden.

---

## Section 4: React Aria Testing Deep Dive

### Overview

React Aria is an accessibility-first library providing hooks and components that implement ARIA patterns. Testing React Aria components requires understanding both the hook behavior (state, event handling) and the resulting ARIA semantics (roles, attributes).

### What React Aria Excels At

#### 1. **Keyboard Navigation & Focus Management**

React Aria implements full keyboard support according to W3C ARIA Authoring Practices. Testing this requires simulating keyboard events:

```javascript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useMenu } from '@react-aria/menu';

test('Menu keyboard navigation (Arrow Up/Down)', async () => {
  const user = new User();
  const items = ['Save', 'Edit', 'Delete'];

  render(<Menu items={items} />);
  const menuButton = screen.getByRole('button');

  await user.click(menuButton); // Open menu
  await user.keyboard('{ArrowDown}'); // Navigate to first item

  expect(screen.getByRole('menuitem', { current: true }))
    .toHaveTextContent('Save');
});
```

#### 2. **Accessible Name & Description**

React Aria correctly handles ARIA attributes that define accessible names:

```javascript
test('Button has accessible name from aria-label', () => {
  render(<Button aria-label="Close dialog">✕</Button>);
  expect(screen.getByRole('button', { name: /close dialog/i })).toBeInTheDocument();
});
```

#### 3. **ARIA Attributes & Roles**

React Aria applies correct ARIA roles and attributes. Test these with jest-dom matchers:

```javascript
test('CheckboxGroup has correct ARIA role', () => {
  render(
    <CheckboxGroup>
      <Checkbox value="a">Option A</Checkbox>
    </CheckboxGroup>
  );

  expect(screen.getByRole('group')).toHaveAttribute('role', 'group');
});
```

#### 4. **State Management & Props**

Test how React Aria hooks manage state:

```javascript
test('Checkbox toggles checked state', async () => {
  const onChange = vi.fn();
  const { rerender } = render(
    <Checkbox onChange={onChange} isSelected={false}>
      Accept terms
    </Checkbox>
  );

  const checkbox = screen.getByRole('checkbox');
  await userEvent.click(checkbox);

  expect(onChange).toHaveBeenCalled();

  // Rerender with new state
  rerender(
    <Checkbox onChange={onChange} isSelected={true}>
      Accept terms
    </Checkbox>
  );

  expect(checkbox).toBeChecked();
});
```

### What Requires Additional Tools

#### 1. **Screen Reader Testing**
React Aria generates correct ARIA, but actual screen reader behavior requires real screen readers:
- Manual testing with JAWS, NVDA, or VoiceOver
- Automated testing: Limited tools exist (no good automation)
- Solution: Combine ARIA validation with manual QA

#### 2. **Complex Focus Trapping**
Focus trap testing is best done in real browsers (Playwright), not jsdom:

```javascript
test('Modal traps focus (jsdom limitation)', async () => {
  // jsdom has limited focus event support
  // Use Playwright for real focus trap testing
  // React Aria handles trap logic correctly, but testing is challenging
});
```

**Better approach:** Trust React Aria's implementation + manual keyboard testing

#### 3. **Real Browser CSS Interactions**
jsdom doesn't fully support:
- CSS-based animations
- Scroll behavior
- Layout calculations
- Hover states (use `userEvent.hover()` as best approximation)

### @react-aria/test-utils: Pattern-Specific Testing

The new @react-aria/test-utils (Jan 2025 release) provides pattern-specific testers:

#### Basic Setup
```javascript
import { render } from '@testing-library/react';
import { User } from '@react-aria/test-utils';

const user = new User();
render(<MyComponent />);

const selectTester = await user.getSelectTester(screen.getByRole('button'));
```

#### Example: Testing a Select Component
```javascript
test('Select allows keyboard navigation and selection', async () => {
  const user = new User();
  const onSelectionChange = vi.fn();

  render(
    <Select label="Category" onSelectionChange={onSelectionChange}>
      <Item key="cat-1">Cats</Item>
      <Item key="cat-2">Dogs</Item>
      <Item key="cat-3">Birds</Item>
    </Select>
  );

  const selectTester = await user.getSelectTester(
    screen.getByRole('button')
  );

  // Open with Enter
  await selectTester.openMenu();
  expect(screen.getByRole('listbox')).toBeVisible();

  // Navigate with arrow keys
  await selectTester.moveDown(); // Focus "Cats"
  await selectTester.moveDown(); // Focus "Dogs"

  // Select with Enter
  await selectTester.selectItem();

  expect(onSelectionChange).toHaveBeenCalledWith('cat-2');
});
```

#### Current Limitations
- Only supports specific patterns (ComboBox, Select, Menu, etc.)
- Beta release—API may change
- Requires latest testing library versions

### Testing React Aria Hooks

React Aria provides hooks for building custom components:

```javascript
import { useButton } from '@react-aria/button';
import { useRef } from 'react';

// Test hook behavior via component that uses it
function CustomButton(props) {
  const ref = useRef(null);
  const { buttonProps } = useButton(props, ref);
  return <button {...buttonProps}>Custom</button>;
}

test('useButton hook provides correct ARIA', () => {
  const onPress = vi.fn();
  render(<CustomButton onPress={onPress} />);

  const button = screen.getByRole('button');
  expect(button).toHaveAttribute('type', 'button');

  userEvent.click(button);
  expect(onPress).toHaveBeenCalled();
});
```

### Integration with Tailwind CSS

React Aria doesn't style components—it provides hooks and ARIA semantics. Tailwind CSS handles styling:

```javascript
test('Styled Button applies Tailwind classes', () => {
  render(
    <button className="px-4 py-2 bg-blue-500 text-white rounded">
      Styled
    </button>
  );

  const button = screen.getByRole('button');
  expect(button).toHaveClass('bg-blue-500');
  expect(button).toHaveClass('text-white');
});
```

**CSS Validation:** Use snapshot testing or visual regression for layout/styling validation.

### Summary Table: What to Test with React Aria

| What | Tool | Example |
|------|------|---------|
| **Keyboard navigation** | userEvent + ARIA test-utils | Arrow keys, Tab, Enter |
| **Accessible names** | RTL getByRole queries | screen.getByRole('button', { name: /label/i }) |
| **ARIA attributes** | jest-dom matchers | .toHaveAttribute('aria-expanded') |
| **Component state** | React Testing Library | rerender with new props |
| **Hook behavior** | Test via wrapper component | useButton, useCheckbox, etc. |
| **Focus management** | React Aria test-utils | Tab trapping, focus movement |
| **Screen reader output** | Manual testing | JAWS, NVDA, VoiceOver |
| **Complex focus traps** | Playwright (if needed) | Real browser focus events |
| **CSS/styling** | Snapshots + manual | Layout, colors, spacing |

---

## Section 5: Playwright Evaluation for Component Testing

### What Problems Does Playwright Solve?

Playwright component testing runs React components in real browsers, solving specific problems that simulated DOM testing cannot:

1. **Real CSS rendering:** Validates layout, positioning, sizing
2. **CSS animations:** Tests transitions and keyframe animations
3. **Hover/focus styles:** Some CSS `:hover`, `:focus` behavior
4. **Cross-browser compatibility:** Detects browser-specific bugs
5. **Complex interactions:** Drag-drop, scroll, resize events

### When Headless Browser Testing IS Needed

| Scenario | Example | Use Playwright? |
|----------|---------|-----------------|
| Button click handler | Standard interaction | ❌ No—unit test sufficient |
| Keyboard navigation | Arrow keys in select | ❌ No—ARIA test-utils better |
| CSS animations | Transition on hover | ⚠️ Maybe—snapshot test often enough |
| Drag-drop interaction | Reorder list items | ⚠️ Maybe—Playwright can help |
| Visual layout | Grid alignment in dark mode | ⚠️ Maybe—snapshot sufficient |
| Cross-browser CSS bugs | Safari-specific styling | ✅ Yes—real browser needed |
| Scroll-into-view | Long list scrolling | ✅ Yes—jsdom doesn't support |
| Complex animations | Multi-step animations | ✅ Yes—real rendering needed |

### Specific Scenarios NOT Worth Playwright

**Don't use Playwright for:**
- Simple prop testing (unit tests sufficient)
- Accessibility testing (ARIA test-utils better)
- Snapshot validation (snapshots sufficient)
- Event handler testing (mock functions work)
- API integration testing (MSW + unit tests better)

### Cost-Benefit Analysis

#### Setup Cost
- Configuration: 30-60 minutes
- Dependencies: @playwright/experimental-ct-react
- Build integration: Via Vite (reasonable)

#### Runtime Cost
- Execution speed: 50-500ms per test (vs 5-20ms for unit tests)
- CI time: 2-5x slower builds
- Maintenance: Browser version updates, artifact management

#### Coverage Benefit
- **Low ROI:** Most component issues caught by unit/integration tests
- **Edge cases:** Only real browser rendering issues benefit
- **For component library:** Rarely worth the cost unless you have critical design system

### Recommendation: **DON'T USE PLAYWRIGHT**

For ui-lab-components:

1. ✅ Use unit tests (Vitest + RTL) for 95% of coverage
2. ✅ Use snapshots for layout/CSS validation
3. ✅ Use manual testing for critical visual components
4. ❌ Skip Playwright—overhead exceeds benefit

### If You Really Need It Later

If cross-browser visual validation becomes critical:

1. **Start with Chromatic or Percy** (cloud-based visual regression)
   - No infrastructure management
   - Better diff visualization
   - Suitable for design systems

2. **Or use Playwright for 2-3 critical components only:**
   - High-visibility components
   - Complex animations
   - Known cross-browser issues

3. **Not as primary testing strategy**—use as supplement

### Alternative: Visual Regression in CI (Recommended)

If you need visual regression testing:

```yaml
# Simple GitHub Actions workflow
name: Visual Testing
on: [pull_request]
jobs:
  visual:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm ci
      - run: npm run build
      - run: npm run test:visual
      # Artifact upload to S3 for visual diffs
```

This is cheaper and easier than managing Playwright browsers in CI.

---

## Section 6: Recommended Testing Stack

### The Stack

```json
{
  "testRunner": "vitest",
  "testingLibrary": "@testing-library/react@16+",
  "userInteractions": "@testing-library/user-event@14+",
  "accessibility": {
    "semanticQueries": "@testing-library/react (built-in)",
    "a11yValidation": "jest-axe",
    "ariaPatterns": "@react-aria/test-utils@beta"
  },
  "assertions": {
    "dom": "@testing-library/jest-dom",
    "snapshots": "vitest (built-in)"
  },
  "reactAria": "@react-aria/hooks + @react-aria/test-utils",
  "styling": "tailwind + snapshot testing",
  "optional": {
    "visualRegression": "chromatic (if critical design system)",
    "e2e": "skip - not needed for components"
  }
}
```

### Setup Instructions

#### 1. Install Dependencies

```bash
npm install --save-dev \
  vitest@^1.0.0 \
  @testing-library/react@^16.0.0 \
  @testing-library/jest-dom@^6.0.0 \
  @testing-library/user-event@^14.0.0 \
  jest-axe@^8.0.0 \
  @react-aria/test-utils@^1.0.0-beta.1 \
  jsdom
```

#### 2. Vitest Configuration (vitest.config.ts)

```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/tests/setup.ts',
    css: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/tests/',
      ]
    }
  }
});
```

#### 3. Test Setup File (src/tests/setup.ts)

```typescript
import '@testing-library/jest-dom';
import { expect, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock window.matchMedia for responsive components
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
```

#### 4. Package.json Scripts

```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:watch": "vitest --watch",
    "test:coverage": "vitest --coverage",
    "test:ci": "vitest --run --coverage"
  }
}
```

### Testing by Component Type

| Component Type | Testing Approach | Key Tools |
|---|---|---|
| **Buttons, Links** | Unit test + RTL + jest-axe | getByRole, click, ARIA validation |
| **Form Inputs** | Unit test + RTL + jest-axe | getByRole, userEvent.type, labels |
| **Selects, Dropdowns** | Unit test + ARIA test-utils | selectTester, keyboard nav |
| **Modals, Dialogs** | Unit test + RTL + snapshot | focus management, escape key |
| **Tables, Grids** | Unit test + RTL + ARIA test-utils | table roles, keyboard nav |
| **Complex interactions** | Unit test + RTL + snapshots | userEvent chains, state changes |
| **CSS-dependent** | Snapshot + manual review | Layout validation, responsive |
| **Animations** | Manual test + visual regression | Only if critical |

### Implementation Roadmap

#### Phase 1: Core Setup (Day 1)
1. Install Vitest + Testing Library
2. Configure vitest.config.ts
3. Create test setup file
4. Add 5 example component tests

#### Phase 2: Accessibility (Days 2-3)
1. Integrate jest-axe
2. Add a11y checks to all tests
3. Test with @react-aria/test-utils
4. Review and fix accessibility issues

#### Phase 3: Coverage & Quality (Days 4-5)
1. Set coverage targets (aim for 80%+)
2. Add snapshot tests for layout validation
3. Document testing patterns
4. Train team on testing best practices

#### Phase 4: CI Integration (Day 6)
1. Add GitHub Actions workflow
2. Require passing tests on PR
3. Set up coverage reports
4. Monitor test performance

---

## Section 7: Example Test Cases

### Example 1: Button Component

#### Test Structure Comparison

**Using Jest + React Testing Library (Traditional):**

```javascript
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import Button from './Button';

expect.extend(toHaveNoViolations);

describe('Button', () => {
  it('renders with text content', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('calls onClick handler when clicked', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();

    render(<Button onClick={onClick}>Click me</Button>);
    await user.click(screen.getByRole('button'));

    expect(onClick).toHaveBeenCalledOnce();
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('accepts aria-label for accessible name', () => {
    render(<Button aria-label="Close dialog">✕</Button>);
    expect(screen.getByRole('button', { name: /close dialog/i })).toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<Button>Accessible Button</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('applies variant styling classes', () => {
    const { container } = render(<Button variant="primary">Submit</Button>);
    expect(container.firstChild).toHaveClass('bg-blue-500');
  });

  it('matches snapshot', () => {
    const { container } = render(
      <Button variant="primary" size="lg">
        Large Primary Button
      </Button>
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
```

**Why This Approach:**
- ✅ Comprehensive: Covers rendering, interaction, accessibility, and styling
- ✅ Maintainable: Multiple assertions per test, clear intent
- ✅ Realistic: Tests behavior as users experience it (via roles, not DOM structure)
- ✅ A11y-first: Built-in accessibility validation
- ✅ Safety net: Snapshot catches unintended changes

---

### Example 2: Select Component (Complex ARIA Pattern)

#### Using React Aria Test Utils

```javascript
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { User } from '@react-aria/test-utils';
import Select from './Select';

describe('Select Component', () => {
  it('renders with label and placeholder', () => {
    render(
      <Select label="Choose Category">
        <Item key="1">Option 1</Item>
      </Select>
    );
    expect(screen.getByText('Choose Category')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent('Choose Category');
  });

  it('opens menu on click', async () => {
    const user = new User();
    render(
      <Select label="Choose">
        <Item key="1">Option 1</Item>
      </Select>
    );

    const selectTester = await user.getSelectTester(
      screen.getByRole('button')
    );
    await selectTester.openMenu();

    expect(screen.getByRole('listbox')).toBeVisible();
  });

  it('navigates options with arrow keys', async () => {
    const user = new User();
    const onSelectionChange = vi.fn();

    render(
      <Select label="Choose" onSelectionChange={onSelectionChange}>
        <Item key="1">First</Item>
        <Item key="2">Second</Item>
        <Item key="3">Third</Item>
      </Select>
    );

    const selectTester = await user.getSelectTester(
      screen.getByRole('button')
    );

    await selectTester.openMenu();
    await selectTester.moveDown(); // Focus First
    await selectTester.moveDown(); // Focus Second

    expect(screen.getByRole('option', { name: /second/i, current: true }))
      .toHaveAttribute('aria-selected', 'true');
  });

  it('selects option with Enter key', async () => {
    const user = new User();
    const onSelectionChange = vi.fn();

    render(
      <Select label="Choose" onSelectionChange={onSelectionChange}>
        <Item key="cat">Category</Item>
        <Item key="tag">Tag</Item>
      </Select>
    );

    const selectTester = await user.getSelectTester(
      screen.getByRole('button')
    );

    await selectTester.openMenu();
    await selectTester.moveDown();
    await selectTester.selectItem();

    expect(onSelectionChange).toHaveBeenCalledWith('cat');
    expect(screen.getByRole('listbox')).not.toBeVisible();
  });

  it('closes menu on Escape', async () => {
    const user = new User();
    render(
      <Select label="Choose">
        <Item key="1">Option 1</Item>
      </Select>
    );

    const selectTester = await user.getSelectTester(
      screen.getByRole('button')
    );

    await selectTester.openMenu();
    expect(screen.getByRole('listbox')).toBeVisible();

    await user.keyboard('{Escape}');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('has correct ARIA attributes', () => {
    render(
      <Select label="Choose" isRequired>
        <Item key="1">Option 1</Item>
      </Select>
    );

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-haspopup', 'listbox');
    expect(button).toHaveAttribute('aria-expanded', 'false');
  });

  it('supports disabled state', () => {
    render(
      <Select label="Choose" isDisabled>
        <Item key="1">Option 1</Item>
      </Select>
    );

    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(
      <Select label="Choose">
        <Item key="1">Option 1</Item>
      </Select>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('matches snapshot with options', () => {
    const { container } = render(
      <Select label="Choose">
        <Item key="1">First Option</Item>
        <Item key="2">Second Option</Item>
      </Select>
    );
    expect(container).toMatchSnapshot();
  });
});
```

**Key Differences from Button Test:**
- Uses `@react-aria/test-utils` for pattern-specific testing
- Tests complex keyboard navigation (Arrow Down, Arrow Up, Escape)
- Validates menu open/close state
- Tests dynamic prop changes via rerender
- More comprehensive ARIA validation

---

### Example 3: Checkbox Component

```javascript
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';
import Checkbox from './Checkbox';

expect.extend(toHaveNoViolations);

describe('Checkbox', () => {
  it('renders with label', () => {
    render(<Checkbox>Accept terms</Checkbox>);
    expect(screen.getByRole('checkbox', { name: /accept terms/i }))
      .toBeInTheDocument();
  });

  it('toggles checked state on click', async () => {
    const user = userEvent.setup();
    const { rerender } = render(
      <Checkbox isSelected={false} onChange={() => {}}>
        I agree
      </Checkbox>
    );

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();

    await user.click(checkbox);
    // In real app, state would update via onChange callback
  });

  it('calls onChange handler with new checked state', async () => {
    const onChange = vi.fn();
    const user = userEvent.setup();

    render(
      <Checkbox onChange={onChange}>
        Subscribe to updates
      </Checkbox>
    );

    await user.click(screen.getByRole('checkbox'));
    expect(onChange).toHaveBeenCalled();
  });

  it('supports indeterminate state', () => {
    render(
      <Checkbox isIndeterminate>
        Some options selected
      </Checkbox>
    );

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toHaveAttribute('aria-checked', 'mixed');
  });

  it('is disabled when disabled prop is true', () => {
    render(
      <Checkbox isDisabled>
        Disabled option
      </Checkbox>
    );

    expect(screen.getByRole('checkbox')).toBeDisabled();
  });

  it('is required when required prop is true', () => {
    render(
      <Checkbox isRequired>
        Required field
      </Checkbox>
    );

    expect(screen.getByRole('checkbox', { hidden: true }))
      .toHaveAttribute('required');
  });

  it('matches snapshot with label', () => {
    const { container } = render(
      <Checkbox>Accept our terms of service</Checkbox>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(
      <Checkbox>Accessible checkbox</Checkbox>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

---

### Example 4: Comparison - Same Component, Three Testing Approaches

#### Component Under Test: Toggle Button

```typescript
interface ToggleButtonProps {
  isSelected?: boolean;
  onChange?: (selected: boolean) => void;
  disabled?: boolean;
  children: React.ReactNode;
}

export function ToggleButton({
  isSelected = false,
  onChange,
  disabled = false,
  children,
}: ToggleButtonProps) {
  const handleClick = () => {
    onChange?.(!isSelected);
  };

  return (
    <button
      onClick={handleClick}
      aria-pressed={isSelected}
      disabled={disabled}
      className={`px-4 py-2 rounded ${
        isSelected ? 'bg-blue-500 text-white' : 'bg-gray-200'
      }`}
    >
      {children}
    </button>
  );
}
```

#### Approach 1: Basic Unit Test (RTL)

```javascript
test('ToggleButton toggles state on click', async () => {
  const onChange = vi.fn();
  const user = userEvent.setup();

  const { rerender } = render(
    <ToggleButton onChange={onChange} isSelected={false}>
      Toggle Me
    </ToggleButton>
  );

  const button = screen.getByRole('button');
  await user.click(button);

  expect(onChange).toHaveBeenCalledWith(true);

  rerender(
    <ToggleButton onChange={onChange} isSelected={true}>
      Toggle Me
    </ToggleButton>
  );

  expect(button).toHaveAttribute('aria-pressed', 'true');
});
```

**What it tests:** Interaction and state change
**Advantages:** Simple, fast, tests behavior
**Disadvantages:** Doesn't validate styling or full accessibility

#### Approach 2: Accessibility-Focused Test

```javascript
test('ToggleButton is accessible', async () => {
  const { container } = render(
    <ToggleButton isSelected={false}>
      Active Filter
    </ToggleButton>
  );

  const button = screen.getByRole('button', { name: /active filter/i });

  // ARIA validation
  expect(button).toHaveAttribute('aria-pressed', 'false');

  // CSS validation
  expect(button).toHaveClass('bg-gray-200');

  // Accessibility audit
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});

test('ToggleButton with aria-pressed=true has correct styling', () => {
  const { container } = render(
    <ToggleButton isSelected={true}>
      Active
    </ToggleButton>
  );

  const button = screen.getByRole('button');
  expect(button).toHaveAttribute('aria-pressed', 'true');
  expect(button).toHaveClass('bg-blue-500');
  expect(button).toHaveClass('text-white');
});
```

**What it tests:** Accessibility, styling, ARIA semantics
**Advantages:** Catches styling bugs, validates ARIA
**Disadvantages:** More setup, multiple assertions

#### Approach 3: Snapshot + Behavioral Test

```javascript
test('ToggleButton renders correctly in both states', () => {
  const { rerender, container } = render(
    <ToggleButton isSelected={false}>
      Deselected State
    </ToggleButton>
  );
  expect(container.firstChild).toMatchSnapshot();

  rerender(
    <ToggleButton isSelected={true}>
      Selected State
    </ToggleButton>
  );
  expect(container.firstChild).toMatchSnapshot();
});

test('ToggleButton behavior with onChange', async () => {
  const onChange = vi.fn();
  const user = userEvent.setup();

  render(
    <ToggleButton onChange={onChange} isSelected={false}>
      Click me
    </ToggleButton>
  );

  await user.click(screen.getByRole('button'));
  expect(onChange).toHaveBeenCalledWith(true);

  await user.click(screen.getByRole('button'));
  expect(onChange).toHaveBeenCalledWith(false);
});
```

**What it tests:** Layout changes and interaction flow
**Advantages:** Catches unintended changes, validates styling
**Disadvantages:** Snapshot diffs require review

---

### Example 5: Avoid These Common Testing Mistakes

#### ❌ DON'T: Test Implementation Details

```javascript
// BAD: Tests DOM structure, not behavior
test('button has nested span', () => {
  const { container } = render(<Button>Click</Button>);
  expect(container.querySelector('button span')).toBeInTheDocument();
});

// GOOD: Tests accessibility and text
test('button displays text', () => {
  render(<Button>Click</Button>);
  expect(screen.getByRole('button', { name: /click/i })).toBeInTheDocument();
});
```

#### ❌ DON'T: Use Generic Selectors

```javascript
// BAD: Brittle, ties test to implementation
test('button works', () => {
  const { container } = render(<Button>Click</Button>);
  const button = container.querySelector('button.btn-primary');
  fireEvent.click(button);
});

// GOOD: Uses semantic queries
test('primary button works', async () => {
  const user = userEvent.setup();
  render(<Button variant="primary">Click</Button>);
  await user.click(screen.getByRole('button', { name: /click/i }));
});
```

#### ❌ DON'T: Over-Test State

```javascript
// BAD: Tests internal state
test('button state changes', () => {
  const { result } = renderHook(() => useState(false));
  // ... testing hook implementation
});

// GOOD: Test via component behavior
test('checkbox reflects state change', async () => {
  const { rerender } = render(<Checkbox isChecked={false} />);
  expect(screen.getByRole('checkbox')).not.toBeChecked();

  rerender(<Checkbox isChecked={true} />);
  expect(screen.getByRole('checkbox')).toBeChecked();
});
```

#### ❌ DON'T: Skip Accessibility Testing

```javascript
// BAD: No accessibility check
test('input works', () => {
  render(<Input />);
  expect(screen.getByRole('textbox')).toBeInTheDocument();
});

// GOOD: Includes accessibility validation
test('input is accessible', async () => {
  const { container } = render(
    <Input label="Email" type="email" required />
  );

  expect(screen.getByRole('textbox', { name: /email/i })).toBeRequired();

  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
```

#### ❌ DON'T: Use Snapshots as Only Test

```javascript
// BAD: Only snapshots, no behavioral testing
test('button matches snapshot', () => {
  const { container } = render(<Button>Click</Button>);
  expect(container).toMatchSnapshot(); // What does it test?
});

// GOOD: Combine snapshots with behavioral tests
test('button behavior', async () => {
  const onClick = vi.fn();
  const user = userEvent.setup();

  render(<Button onClick={onClick}>Click</Button>);
  await user.click(screen.getByRole('button'));

  expect(onClick).toHaveBeenCalled();
});

test('button styling', () => {
  const { container } = render(
    <Button variant="primary">Submit</Button>
  );
  expect(container.firstChild).toMatchSnapshot();
});
```

---

## Section 8: Testing Best Practices & Patterns

### Testing Pyramid for Component Libraries

```
          ┌─────────────────┐
          │   E2E Tests     │  (Skip for components)
          │   (Rare: 1-2%)  │
          └─────────────────┘
               ▲       ▲
              /         \
             /           \
            /             \
      ┌─────────────────────────────┐
      │  Integration Tests          │ (20-30%)
      │  (Component combinations)    │
      └─────────────────────────────┘
               ▲             ▲
              /               \
             /                 \
      ┌─────────────────────────────┐
      │   Unit Tests                │ (70-80%)
      │   (Individual components)    │
      └─────────────────────────────┘
```

**For Component Libraries:**
- **Unit tests (70-80%):** Individual components with various props
- **Integration tests (20-30%):** Components working together
- **E2E tests (skip):** Not needed for component-level testing

### Coverage Targets

- **Target:** 80%+ statement coverage
- **Focus:** Critical paths, not edge cases
- **Avoid:** 100% coverage obsession (diminishing returns)

### Test File Organization

```
src/
├── components/
│   ├── Button/
│   │   ├── Button.tsx
│   │   └── Button.test.tsx          ← Test in same directory
│   ├── Select/
│   │   ├── Select.tsx
│   │   └── Select.test.tsx
│   └── ...
└── tests/
    ├── setup.ts                      ← Shared test configuration
    └── helpers.ts                    ← Common test utilities
```

### Shared Test Utilities

```typescript
// tests/helpers.ts
import { render, RenderOptions } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

// Custom render with common providers
export function renderWithContext(
  ui: React.ReactElement,
  options?: RenderOptions
) {
  return render(ui, { ...options });
}

// User setup helper
export async function setupUser() {
  return userEvent.setup();
}

// Accessibility checking helper
export async function checkA11y(container: HTMLElement) {
  const { axe, toHaveNoViolations } = await import('jest-axe');
  expect.extend(toHaveNoViolations);

  const results = await axe(container);
  return results;
}
```

### Test Naming Conventions

```javascript
describe('Button', () => {
  // ✅ Clear, describes user behavior
  it('calls onClick handler when clicked', () => {});
  it('disables interactions when disabled prop is true', () => {});
  it('renders accessible name from children', () => {});
  it('has no accessibility violations', () => {});

  // ❌ Too specific to implementation
  // it('sets className to btn-primary', () => {});
  // it('has onClick event listener', () => {});
  // it('updates internal state on click', () => {});
});
```

### Async Testing Patterns

```javascript
// Always use async/await with userEvent
it('handles async interactions', async () => {
  const user = userEvent.setup();
  render(<MyComponent />);

  // Wrap user interactions with await
  await user.click(screen.getByRole('button'));
  await user.type(screen.getByRole('textbox'), 'text');

  // Use await for assertions on async results
  await waitFor(() => {
    expect(screen.getByText('Loaded')).toBeInTheDocument();
  });
});
```

---

## Section 9: Migration Path from Jest

If you're currently using Jest, here's how to migrate to Vitest:

### Step 1: Install Vitest

```bash
npm install --save-dev vitest
```

### Step 2: Create vitest.config.ts

Copy your Jest config pattern into vitest.config.ts—Vitest is 95% Jest-compatible.

### Step 3: Update package.json

```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage"
  }
}
```

### Step 4: Run Tests

```bash
npm test
```

Most tests should run with zero changes. If there are issues:

1. Check for Jest-specific plugins (usually not needed)
2. Verify Node.js globals are enabled (`globals: true` in config)
3. Ensure test setup files are imported

---

## Section 10: Recommended Resources

### Official Documentation
- [Vitest](https://vitest.dev/) - Modern test runner
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) - Testing utilities
- [React Aria](https://react-aria.adobe.com/) - Accessible component library
- [jest-axe](https://github.com/NickColley/jest-axe) - Accessibility testing
- [React Aria Test Utils](https://react-aria.adobe.com/testing) - Pattern testing

### Articles & Guides
- [Testing Library Best Practices](https://testing-library.com/docs/queries/about)
- [React Aria Accessibility Guide](https://react-aria.adobe.com/accessibility)
- [The Testing Pyramid](https://martinfowler.com/articles/practical-test-pyramid.html)
- [userEvent Documentation](https://testing-library.com/docs/user-event/intro/)
- [Web Dev Testing Strategies](https://web.dev/articles/ta-strategies)

---

## Summary & Action Items

### Immediate Actions (Week 1)

1. ✅ **Set up Vitest** - Install and configure vitest.config.ts
2. ✅ **Install testing dependencies** - RTL, jest-axe, @react-aria/test-utils
3. ✅ **Create test setup file** - Configure jsdom, cleanup, mocks
4. ✅ **Write 5 example tests** - Button, Input, Select, Checkbox, etc.
5. ✅ **Document testing patterns** - Create TESTING.md guide for team

### Medium Term (Weeks 2-4)

1. ✅ **Achieve 80%+ coverage** - Systematically add tests to existing components
2. ✅ **Integrate jest-axe** - Add accessibility checks to all tests
3. ✅ **Use React Aria test-utils** - For complex ARIA patterns
4. ✅ **Set up CI pipeline** - GitHub Actions with coverage reports
5. ✅ **Train team** - Pair programming and testing workshops

### Long Term (Ongoing)

1. ✅ **Maintain coverage** - Enforce test requirements on PRs
2. ✅ **Monitor test health** - Reduce flakiness, improve performance
3. ✅ **Regular audits** - Review test quality quarterly
4. ✅ **Skip Playwright** - Use snapshots + manual testing instead
5. ✅ **Evolve with tools** - Track React Aria test-utils improvements

---

## Conclusion

The **Vitest + React Testing Library + jest-axe + @react-aria/test-utils** stack provides a lean, powerful testing solution for ui-lab-components. It maximizes accessibility testing, avoids unnecessary complexity, and aligns with your existing Vite setup.

**Key advantages:**
- Zero additional configuration (uses your existing Vite setup)
- Superior developer experience (HMR test execution)
- React Aria integration (first-class ARIA pattern testing)
- Comprehensive accessibility validation
- Fast, maintainable tests

**Avoid:**
- Playwright—overhead exceeds benefit for component testing
- Visual regression services—snapshots sufficient
- Over-engineering—start simple, add complexity as needed

This recommendation balances pragmatism with quality, providing real coverage without maintenance burden.

---

### Document Metadata

- **Research Date:** December 2025
- **Tools Evaluated:** Jest, Vitest, Playwright, React Testing Library, jest-axe, @react-aria/test-utils
- **Scope:** React component library (ui-lab-components)
- **Version:** 1.0 (Complete)
- **Review Recommended:** Q2 2026 (to reflect tool improvements)

---

## Appendix: Quick Reference

### Test Template

```typescript
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />);
    expect(screen.getByRole('...')).toBeInTheDocument();
  });

  it('handles user interaction', async () => {
    const user = userEvent.setup();
    render(<MyComponent />);

    await user.click(screen.getByRole('button'));
    expect(screen.getByText('...')).toBeInTheDocument();
  });

  it('has no accessibility violations', async () => {
    const { container } = render(<MyComponent />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

### Vitest Setup Checklist

- [ ] Install Vitest
- [ ] Create vitest.config.ts
- [ ] Create tests/setup.ts
- [ ] Install testing dependencies
- [ ] Write first tests
- [ ] Configure coverage
- [ ] Add GitHub Actions workflow
- [ ] Document testing patterns
- [ ] Train team

---

**End of Research Document**
