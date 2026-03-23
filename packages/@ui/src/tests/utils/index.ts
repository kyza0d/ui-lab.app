/**
 * @ui Test Utilities Library
 * Comprehensive, reusable testing utilities for component testing
 *
 * Usage:
 * import { render, testKeyboardNavigation, expectAriaRole } from '@/tests/utils'
 */

// Core rendering utilities
export { render } from './render'

// Query utilities
export {
  getAllElementsByRole,
  getTrigger,
  getContent,
} from './queries'

// User interaction utilities
export {
  clickElement,
  typeText,
  pressKey,
  hoverElement,
  unhoverElement,
  pressArrowDown,
  pressArrowUp,
  pressHome,
  pressEnd,
  pressEnter,
  pressEscape,
  pressSpace,
  focusWithKeyboard,
} from './interactions'

// Keyboard navigation testing

// Focus management utilities

// Accessibility utilities and assertions
export {
  testButtonA11y,
  auditA11y,
} from './accessibility'

// Custom matchers

// Component-level testing utilities
export {
  testRefForwarding,
  testStyling,
} from './component'

// Context utilities

// Mock data factories
export {
  createMockSelectItems,
  createMockMenuItems,
  createSelectionCallback,
} from './factories'

// Wait/async utilities
export {
  waitForOpen,
  waitForClose,
  waitForFocus,
  waitForCondition,
} from './waiters'

