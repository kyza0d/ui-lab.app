import { expect } from 'vitest'

/**
 * Custom expect matchers for component testing
 */

/**
 * Setup function to register all custom matchers with Vitest
 * Call this in your test setup file: setupCustomMatchers()
 */
export function setupCustomMatchers() {
  expect.extend({
    toHaveFocusRing(received: HTMLElement) {
      const hasFocusVisible = received.hasAttribute('data-focus-visible')
      const isVisible =
        getComputedStyle(received).outlineWidth !== '0px' ||
        getComputedStyle(received).boxShadow !== 'none'

      const pass = hasFocusVisible && isVisible

      return {
        pass,
        message: () =>
          pass
            ? `expected element not to have a visible focus ring`
            : `expected element to have a visible focus ring, but it has data-focus-visible="${received.getAttribute(
                'data-focus-visible'
              )}"`,
      }
    },

    toHaveAriaRole(received: HTMLElement, expected: string) {
      const role = received.getAttribute('role') || received.tagName.toLowerCase()
      const pass = role === expected

      return {
        pass,
        message: () =>
          pass
            ? `expected element not to have role "${expected}"`
            : `expected element to have role "${expected}", but it has "${role}"`,
      }
    },

    toHaveAriaLabel(received: HTMLElement, expected: string) {
      const label =
        received.getAttribute('aria-label') ||
        received.getAttribute('aria-labelledby')

      const pass = label === expected

      return {
        pass,
        message: () =>
          pass
            ? `expected element not to have aria-label "${expected}"`
            : `expected element to have aria-label "${expected}", but it has "${label}"`,
      }
    },

    toHaveAriaExpanded(received: HTMLElement, expected: boolean) {
      const expanded = received.getAttribute('aria-expanded')
      const pass = expanded === String(expected)

      return {
        pass,
        message: () =>
          pass
            ? `expected element not to have aria-expanded="${expected}"`
            : `expected element to have aria-expanded="${expected}", but it has "${expanded}"`,
      }
    },

    toHaveAriaSelected(received: HTMLElement, expected: boolean) {
      const selected = received.getAttribute('aria-selected')
      const pass = selected === String(expected)

      return {
        pass,
        message: () =>
          pass
            ? `expected element not to have aria-selected="${expected}"`
            : `expected element to have aria-selected="${expected}", but it has "${selected}"`,
      }
    },

    toHaveAriaDisabled(received: HTMLElement, expected: boolean) {
      const disabled = received.getAttribute('aria-disabled')
      const pass = disabled === String(expected)

      return {
        pass,
        message: () =>
          pass
            ? `expected element not to have aria-disabled="${expected}"`
            : `expected element to have aria-disabled="${expected}", but it has "${disabled}"`,
      }
    },

    toHaveDataAttribute(
      received: HTMLElement,
      attribute: string,
      expected?: string
    ) {
      const value = received.getAttribute(`data-${attribute}`)
      const pass = expected ? value === expected : value !== null

      return {
        pass,
        message: () =>
          pass
            ? `expected element not to have data-${attribute}${expected ? `="${expected}"` : ''}`
            : `expected element to have data-${attribute}${expected ? `="${expected}"` : ''}, but it has "${value}"`,
      }
    },

    toBeDisabledElement(received: HTMLElement) {
      const isDisabled =
        received.hasAttribute('disabled') ||
        received.getAttribute('aria-disabled') === 'true'

      return {
        pass: isDisabled,
        message: () =>
          isDisabled
            ? `expected element not to be disabled`
            : `expected element to be disabled`,
      }
    },

    toHaveFocusVisible(received: HTMLElement) {
      const hasFocusVisible = received.hasAttribute('data-focus-visible')
      const focusVisibleValue = received.getAttribute('data-focus-visible') === 'true'

      return {
        pass: hasFocusVisible && focusVisibleValue,
        message: () =>
          `expected element to have focus-visible state, but got data-focus-visible="${received.getAttribute(
            'data-focus-visible'
          )}"`,
      }
    },
  })
}

/**
 * Declare custom matchers for TypeScript support
 */
declare global {
  namespace Vi {
    interface Matchers<R> {
      toHaveFocusRing(): R
      toHaveAriaRole(role: string): R
      toHaveAriaLabel(label: string): R
      toHaveAriaExpanded(expanded: boolean): R
      toHaveAriaSelected(selected: boolean): R
      toHaveAriaDisabled(disabled: boolean): R
      toHaveDataAttribute(attribute: string, value?: string): R
      toBeDisabledElement(): R
      toHaveFocusVisible(): R
    }
  }
}
