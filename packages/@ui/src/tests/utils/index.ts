/**
 * @ui Test Utilities Library
 * Comprehensive, reusable testing utilities for component testing
 *
 * Usage:
 * import { render, testKeyboardNavigation, expectAriaRole } from '@/tests/utils'
 */

// Core rendering utilities
export { render, getRootElement, rerenderComponent } from './render'

// Query utilities
export {
  getFocusedElement,
  getDisabledElements,
  getElementByRole,
  getAllElementsByRole,
  getElementByTestId,
  getElementByLabelText,
  getElementByPlaceholderText,
  getElementByText,
  getSelectedItems,
  getTrigger,
  getContent,
  getListItems,
  createScopedQueries,
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
  pressTab,
  selectFromDropdown,
  toggleCheckbox,
  fillForm,
  navigateWithArrows,
  typeToSearch,
  focusWithPointer,
  focusWithKeyboard,
} from './interactions'
export type { InteractionOptions } from './types'

// Keyboard navigation testing
export {
  testKeyboardNavigation,
  testArrowNavigation,
  testHomeEndKeys,
  testEnterKey,
  testEscapeKey,
  testTypeAheadSearch,
  DEFAULT_KEYBOARD_NAV_CONFIG,
  createKeyboardNavigationTests,
} from './keyboard'
export type { KeyboardNavConfig } from './types'

// Focus management utilities
export {
  getFocusRingState,
  assertFocusWithKeyboard,
  assertFocusRingOnKeyboard,
  assertFocusWithMouse,
  assertNoFocusRingOnMouse,
  assertFocusTrap,
  assertAutofocus,
  assertProgrammaticFocus,
  getFocusableElements,
  getVisibleFocusableElements,
  simulateFocusNavigation,
  expectFocusRing,
  expectMouseFocus,
} from './focus'
export type { FocusRingState } from './types'

// Accessibility utilities and assertions
export {
  expectAriaAttributes,
  testButtonA11y,
  testMenuA11y,
  testListboxA11y,
  testComboboxA11y,
  testSwitchA11y,
  testCheckboxA11y,
  testRadioA11y,
  testDialogA11y,
  auditA11y,
  checkA11yBasics,
} from './accessibility'

// Custom matchers
export { setupCustomMatchers } from './matchers'

// Component-level testing utilities
export {
  testRefForwarding,
  testStyling,
} from './component'

// Context utilities
export {
  createMockContextValue,
  renderWithContext,
  renderWithContexts,
  testContextDependency,
  waitForContextChange,
} from './context'

// Mock data factories
export {
  createMockSelectItem,
  createMockSelectItems,
  createMockMenuItem,
  createMockMenuItems,
  createSelectionCallback,
  createStateTracker,
  mockScrollIntoView,
  mockResizeObserver,
  createMockCallbacks,
  createMockData,
} from './factories'
export type { MockCallbackSpy, StateTracker, SelectionState } from './types'

// Wait/async utilities
export {
  runWithTimeout,
  waitForOpen,
  waitForClose,
  waitForFocus,
  waitForSelection,
  waitForText,
  waitForRole,
  waitForAttribute,
  waitForClass,
  waitForElementCount,
  waitForCondition,
  waitForAnimationFrame,
  waitForAnimationFrames,
  waitForDebouncedChange,
  waitForTimeout,
  waitForMicrotask,
  waitForMultiple,
} from './waiters'
export type { WaitOptions } from './types'

