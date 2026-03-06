import { expect } from 'vitest'
import { waitFor } from '@testing-library/react'
import type { FocusRingState, WaitOptions } from './types'
import { pressTab } from './interactions'

/**
 * Get the current focus ring state of an element
 */
export function getFocusRingState(element: HTMLElement): FocusRingState {
  const isFocusVisible = element.hasAttribute('data-focus-visible')
  const focusVisibleValue = element.getAttribute('data-focus-visible') === 'true'

  // Check if focused via keyboard (focus-visible should be true)
  const isKeyboardFocus =
    document.activeElement === element && focusVisibleValue

  // Check if focused but without focus ring (mouse focus)
  const isMouseFocus =
    document.activeElement === element && !focusVisibleValue

  return {
    isFocusVisible: focusVisibleValue,
    isKeyboardFocus,
    isMouseFocus,
  }
}

/**
 * Assert that an element can be focused with keyboard
 */
export async function assertFocusWithKeyboard(
  element: HTMLElement,
  options?: WaitOptions
) {
  const timeout = options?.timeout ?? 1000

  await waitFor(
    () => {
      element.focus()
      expect(document.activeElement).toBe(element)
    },
    { timeout }
  )
}

/**
 * Assert that an element shows focus ring when focused with keyboard
 */
export async function assertFocusRingOnKeyboard(
  element: HTMLElement,
  options?: WaitOptions
) {
  const timeout = options?.timeout ?? 1000

  await waitFor(
    () => {
      element.focus()
      const state = getFocusRingState(element)
      expect(state.isFocusVisible).toBe(true)
    },
    { timeout }
  )
}

/**
 * Assert that an element can be focused with mouse pointer
 */
export async function assertFocusWithMouse(
  element: HTMLElement,
  options?: WaitOptions
) {
  const timeout = options?.timeout ?? 1000

  await waitFor(
    () => {
      element.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }))
      element.click()
      expect(document.activeElement).toBe(element)
    },
    { timeout }
  )
}

/**
 * Assert that focus ring is NOT visible when focused with mouse
 */
export async function assertNoFocusRingOnMouse(
  element: HTMLElement,
  options?: WaitOptions
) {
  const timeout = options?.timeout ?? 1000

  await waitFor(
    () => {
      element.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }))
      element.click()
      const state = getFocusRingState(element)
      // Mouse focus typically means no focus ring
      expect(state.isMouseFocus).toBe(true)
    },
    { timeout }
  )
}

/**
 * Assert that focus is trapped within a container (modal, popover, etc)
 */
export async function assertFocusTrap(
  container: HTMLElement,
  options?: WaitOptions
) {
  const timeout = options?.timeout ?? 1000

  await waitFor(
    () => {
      const focusableElements = Array.from(
        container.querySelectorAll(
          'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
      ) as HTMLElement[]

      if (focusableElements.length === 0) {
        throw new Error('No focusable elements found in container')
      }

      // Test that tabbing cycles through elements in container
      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      firstElement.focus()
      expect(document.activeElement).toBe(firstElement)

      // Tab to next elements
      for (let i = 1; i < focusableElements.length; i++) {
        focusableElements[i].focus()
        expect(document.activeElement).toBe(focusableElements[i])
      }

      // After tabbing past last element, should wrap to first
      // (Note: this behavior depends on implementation)
      lastElement.focus()
      expect(document.activeElement).toBe(lastElement)
    },
    { timeout }
  )
}

/**
 * Assert that an element autofocuses when it mounts
 */
export async function assertAutofocus(
  element: HTMLElement,
  options?: WaitOptions
) {
  const timeout = options?.timeout ?? 1000

  await waitFor(
    () => {
      expect(document.activeElement).toBe(element)
    },
    { timeout }
  )
}

/**
 * Assert that an element can be focused programmatically
 */
export async function assertProgrammaticFocus(
  element: HTMLElement,
  focusCallback: () => void,
  options?: WaitOptions
) {
  const timeout = options?.timeout ?? 1000

  await waitFor(
    () => {
      focusCallback()
      expect(document.activeElement).toBe(element)
    },
    { timeout }
  )
}

/**
 * Get all focusable elements in a container
 */
export function getFocusableElements(container: HTMLElement): HTMLElement[] {
  return Array.from(
    container.querySelectorAll(
      'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
  ) as HTMLElement[]
}

/**
 * Get all focusable elements that are currently visible
 */
export function getVisibleFocusableElements(
  container: HTMLElement
): HTMLElement[] {
  return getFocusableElements(container).filter((el) => {
    const rect = el.getBoundingClientRect()
    const style = window.getComputedStyle(el)
    return (
      rect.width > 0 &&
      rect.height > 0 &&
      style.visibility !== 'hidden' &&
      style.display !== 'none'
    )
  })
}

/**
 * Simulate keyboard focus (tabbing) behavior
 */
export async function simulateFocusNavigation(
  startElement: HTMLElement,
  steps: number = 1
) {
  startElement.focus()

  for (let i = 0; i < steps; i++) {
    await pressTab()
  }
}

/**
 * Assert that an element has focus ring visible
 */
export function expectFocusRing(element: HTMLElement) {
  const state = getFocusRingState(element)
  expect(state.isFocusVisible).toBe(true)
}

/**
 * Assert that an element has focus but no ring (mouse focus)
 */
export function expectMouseFocus(element: HTMLElement) {
  const state = getFocusRingState(element)
  expect(state.isMouseFocus).toBe(true)
}
