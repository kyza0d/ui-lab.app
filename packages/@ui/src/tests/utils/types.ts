import { RenderOptions as BaseRenderOptions } from '@testing-library/react'

/**
 * Extended render options with provider support
 */
export interface RenderOptions extends Omit<BaseRenderOptions, 'wrapper'> {
  /**
   * Additional wrapper components to apply beyond default providers
   */
  wrappers?: React.ComponentType<{ children: React.ReactNode }>[]
  /**
   * Disable automatic provider wrapping
   */
  skipProviders?: boolean
}

/**
 * Interaction options for user events
 */
export interface InteractionOptions {
  delay?: number
  skipPointerEventsCheck?: boolean
}

/**
 * Keyboard navigation configuration
 */
interface KeyboardNavConfig {
  /**
   * Whether to test arrow key navigation
   */
  testArrows?: boolean
  /**
   * Whether to test home/end keys
   */
  testHomeEnd?: boolean
  /**
   * Whether to test enter key
   */
  testEnter?: boolean
  /**
   * Whether to test escape key
   */
  testEscape?: boolean
  /**
   * Whether to test type-ahead search
   */
  testTypeAhead?: boolean
  /**
   * Whether Ctrl is required for Home/End keys
   */
  requireCtrlForHomeEnd?: boolean
  /**
   * Items to navigate through
   */
  items?: HTMLElement[]
}

/**
 * Focus ring state information
 */
interface FocusRingState {
  isFocusVisible: boolean
  isKeyboardFocus: boolean
  isMouseFocus: boolean
}

/**
 * Selection state for list items
 */
interface SelectionState {
  key: string | number
  isSelected: boolean
}

/**
 * Common matcher options
 */
interface MatcherOptions {
  timeout?: number
}

/**
 * Context test options
 */
interface ContextTestOptions {
  waitForAsync?: boolean
  timeout?: number
}

/**
 * Wait helper options
 */
export interface WaitOptions {
  timeout?: number
  interval?: number
}

/**
 * Mock callback spy return type
 */
export interface MockCallbackSpy {
  (...args: any[]): void
  expectCalled: () => void
  expectNotCalled: () => void
  expectCalledWith: (...args: any[]) => void
  expectCalledTimes: (times: number) => void
  getLastCall: () => any[] | null
  getAllCalls: () => any[][]
  clear: () => void
}

/**
 * State tracker for monitoring changes
 */
export interface StateTracker<T> {
  current: T
  previous: T | null
  history: T[]
  get changed(): boolean
  hasChanged(predicate: (value: T) => boolean): boolean
  clear: () => void
}
