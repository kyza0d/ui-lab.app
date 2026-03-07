import '@testing-library/jest-dom'
import { afterEach, beforeEach, vi } from 'vitest'
import { cleanup } from '@testing-library/react'
import { setupCustomMatchers } from './utils/matchers'
import { setupAccessibilityMatchers as setupJestAxeMatchers } from './utils/accessibility'

/**
 * Setup custom matchers (includes custom matchers and jest-axe matchers)
 */
setupCustomMatchers()
setupJestAxeMatchers()

/**
 * Mock window.matchMedia for responsive components
 */
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

/**
 * Mock scrollIntoView since jsdom doesn't implement it
 */
if (!Element.prototype.scrollIntoView) {
  Element.prototype.scrollIntoView = vi.fn()
}

/**
 * Mock ResizeObserver
 */
if (!window.ResizeObserver) {
  class MockResizeObserver {
    observe() { }
    unobserve() { }
    disconnect() { }
  }

  window.ResizeObserver = MockResizeObserver as any
}

/**
 * Mock IntersectionObserver
 */
if (!window.IntersectionObserver) {
  class MockIntersectionObserver {
    constructor(public callback: IntersectionObserverCallback) { }
    observe() { }
    unobserve() { }
    disconnect() { }
    takeRecords() {
      return []
    }
  }

  window.IntersectionObserver = MockIntersectionObserver as any
}

/**
 * Suppress console errors during tests (optional)
 */
const originalError = console.error
beforeEach(() => {
  console.error = (...args: any[]) => {
    if (
      typeof args[0] === 'string' &&
      (args[0].includes('Warning: ReactDOM.render') ||
        args[0].includes('Not implemented: HTMLFormElement.prototype.submit'))
    ) {
      return
    }
    originalError.call(console, ...args)
  }
})

/**
 * Cleanup after each test
 */
afterEach(() => {
  cleanup()
  vi.clearAllMocks()
})
