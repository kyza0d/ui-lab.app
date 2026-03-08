import { waitFor, screen } from '@testing-library/react'
import type { WaitOptions } from './types'

/**
 * Helper to run async function with timeout using waitFor
 */
export async function runWithTimeout(
  fn: () => void | Promise<void>,
  options?: WaitOptions
) {
  const timeout = options?.timeout ?? 1000
  return waitFor(fn, { timeout })
}

/**
 * Wait for an element to open (become visible)
 */
export async function waitForOpen(
  getElement: () => HTMLElement,
  options?: WaitOptions
) {
  const timeout = options?.timeout ?? 1000

  return waitFor(
    () => {
      const element = getElement()
      // In JSDOM offsetParent is always null. We check presence and basic attributes.
      const isHidden = element.style.visibility === 'hidden' ||
        element.getAttribute('data-state') === 'closed' ||
        element.getAttribute('aria-hidden') === 'true'

      if (isHidden) throw new Error('Element is not visible')
      return element
    },
    { timeout }
  )
}

/**
 * Wait for an element to close (become hidden)
 */
export async function waitForClose(
  getElement: () => HTMLElement | null,
  options?: WaitOptions
) {
  const timeout = options?.timeout ?? 1000

  return waitFor(
    () => {
      const element = getElement()
      if (element === null) return

      const isHidden = element.style.visibility === 'hidden' ||
        element.getAttribute('data-state') === 'closed' ||
        element.parentElement === null

      if (!isHidden) throw new Error('Element is still visible')
    },
    { timeout }
  )
}

/**
 * Wait for an element to receive focus
 */
export async function waitForFocus(
  getElement: () => HTMLElement,
  options?: WaitOptions
) {
  const timeout = options?.timeout ?? 1000

  return waitFor(
    () => {
      const element = getElement()
      if (document.activeElement !== element) {
        throw new Error('Element is not focused')
      }
      return element
    },
    { timeout }
  )
}

/**
 * Wait for an element to be selected (aria-selected="true")
 */
export async function waitForSelection(
  getElement: () => HTMLElement,
  options?: WaitOptions
) {
  const timeout = options?.timeout ?? 1000

  return waitFor(
    () => {
      const element = getElement()
      const isSelected = element.getAttribute('aria-selected') === 'true'
      if (!isSelected) throw new Error('Element is not selected')
      return element
    },
    { timeout }
  )
}

/**
 * Wait for text to appear on the page
 */
export async function waitForText(
  text: string | RegExp,
  options?: WaitOptions
) {
  const timeout = options?.timeout ?? 1000

  return waitFor(
    () => {
      return screen.getByText(text)
    },
    { timeout }
  )
}

/**
 * Wait for an element by role
 */
export async function waitForRole(
  role: string,
  options?: WaitOptions & { name?: string }
) {
  const timeout = options?.timeout ?? 1000

  return waitFor(
    () => {
      return screen.getByRole(role, { name: options?.name })
    },
    { timeout }
  )
}

/**
 * Wait for attribute change
 */
export async function waitForAttribute(
  element: HTMLElement,
  attributeName: string,
  expectedValue?: string,
  options?: WaitOptions
) {
  const timeout = options?.timeout ?? 1000

  return waitFor(
    () => {
      const value = element.getAttribute(attributeName)
      if (expectedValue && value !== expectedValue) {
        throw new Error(
          `Attribute ${attributeName} is "${value}", expected "${expectedValue}"`
        )
      }
      return value
    },
    { timeout }
  )
}

/**
 * Wait for class name to be added or removed
 */
export async function waitForClass(
  element: HTMLElement,
  className: string,
  shouldExist: boolean = true,
  options?: WaitOptions
) {
  const timeout = options?.timeout ?? 1000

  return waitFor(
    () => {
      const hasClass = element.classList.contains(className)
      if (hasClass !== shouldExist) {
        throw new Error(
          `Class ${className} ${shouldExist ? 'not added' : 'not removed'}`
        )
      }
    },
    { timeout }
  )
}

/**
 * Wait for element count to match
 */
export async function waitForElementCount(
  getElements: () => HTMLElement[],
  expectedCount: number,
  options?: WaitOptions
) {
  const timeout = options?.timeout ?? 1000

  return waitFor(
    () => {
      const elements = getElements()
      if (elements.length !== expectedCount) {
        throw new Error(
          `Expected ${expectedCount} elements, found ${elements.length}`
        )
      }
      return elements
    },
    { timeout }
  )
}

/**
 * Wait for condition to be true
 */
export async function waitForCondition(
  condition: () => boolean,
  options?: WaitOptions
) {
  const timeout = options?.timeout ?? 1000

  return waitFor(
    () => {
      if (!condition()) throw new Error('Condition not met')
    },
    { timeout }
  )
}

/**
 * Wait for animation frame
 */
export async function waitForAnimationFrame() {
  return new Promise((resolve) => {
    requestAnimationFrame(resolve)
  })
}

/**
 * Wait for multiple animation frames
 */
export async function waitForAnimationFrames(count: number = 1) {
  for (let i = 0; i < count; i++) {
    await waitForAnimationFrame()
  }
}

/**
 * Wait for debounced/throttled function to be called
 */
export async function waitForDebouncedChange(
  callback: () => boolean,
  options?: WaitOptions
) {
  const timeout = options?.timeout ?? 2000

  return waitFor(callback, { timeout })
}

/**
 * Wait for timeout
 */
export async function waitForTimeout(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Wait for microtask queue to flush (Promise.then)
 */
export async function waitForMicrotask() {
  return new Promise((resolve) => {
    Promise.resolve().then(resolve)
  })
}

/**
 * Wait for multiple condition checks
 */
export async function waitForMultiple(
  conditions: Array<() => boolean>,
  options?: WaitOptions
) {
  const timeout = options?.timeout ?? 1000

  return waitFor(
    () => {
      const allMet = conditions.every((cond) => cond())
      if (!allMet) throw new Error('Not all conditions met')
    },
    { timeout }
  )
}
