import { axe, toHaveNoViolations } from 'jest-axe'
import { expect } from 'vitest'
import { getListItems, getElementByRole } from './queries'

/**
 * Set up jest-axe matchers
 */
export function setupAccessibilityMatchers() {
  expect.extend(toHaveNoViolations)
}


/**
 * Expect an element to have a specific ARIA role
 */
function expectAriaRole(element: HTMLElement, role: string) {
  expect(element).toHaveAttribute('role', role)
}

/**
 * Expect an element to be ARIA-disabled
 */
function expectAriaDisabled(
  element: HTMLElement,
  isDisabled: boolean = true
) {
  expect(element).toHaveAttribute('aria-disabled', String(isDisabled))
}


/**
 * Expect an element to have specific ARIA attributes
 */
function expectAriaAttributes(
  element: HTMLElement,
  attributes: Record<string, string | boolean>
) {
  Object.entries(attributes).forEach(([key, value]) => {
    const attrName = key.startsWith('aria-') ? key : `aria-${key}`
    expect(element).toHaveAttribute(attrName, String(value))
  })
}

/**
 * Test button accessibility (ARIA attributes, semantic HTML)
 */
export async function testButtonA11y(
  button: HTMLElement,
  options?: {
    hasLabel?: boolean
    isDisabled?: boolean
  }
) {
  const { hasLabel = true, isDisabled = false } = options || {}

  // Should be a button element or have button role
  const role = button.getAttribute('role') || button.tagName.toLowerCase()
  expect(['button', 'button']).toContain(role)

  // Should have accessible label
  if (hasLabel) {
    const hasText = !!button.textContent?.trim()
    const hasAriaLabel = !!button.getAttribute('aria-label')
    expect(hasText || hasAriaLabel).toBe(true)
  }

  // If disabled
  if (isDisabled) {
    expectAriaDisabled(button, true)
  }

  // Run axe
  const results = await axe(button)
  expect(results).toHaveNoViolations()
}

/**
 * Test menu accessibility
 */
async function testMenuA11y(menu: HTMLElement) {
  // Menu should have role="menu"
  expectAriaRole(menu, 'menu')

  // All items should have role="menuitem"
  const items = getListItems(menu)
  items.forEach((item) => {
    const role = item.getAttribute('role')
    expect(['menuitem', 'menuitemcheckbox', 'menuitemradio']).toContain(role)
  })

  // Run axe
  const results = await axe(menu)
  expect(results).toHaveNoViolations()
}

/**
 * Test listbox accessibility
 */
async function testListboxA11y(listbox: HTMLElement) {
  // Should have role="listbox"
  expectAriaRole(listbox, 'listbox')

  // Should be able to navigate with arrow keys (no specific ARIA requirement)
  // All options should have role="option"
  const options = getListItems(listbox)
  options.forEach((option) => {
    expect(option).toHaveAttribute('role', 'option')
  })

  // Run axe
  const results = await axe(listbox)
  expect(results).toHaveNoViolations()
}

/**
 * Test combobox accessibility
 */
async function testComboboxA11y(
  combobox: HTMLElement,
  listbox: HTMLElement
) {
  // Should have proper structure
  expect(combobox).toHaveAttribute('role', 'combobox')
  expect(listbox).toHaveAttribute('role', 'listbox')

  // Combobox should have aria-expanded
  expect(combobox).toHaveAttribute('aria-expanded')

  // Run axe
  const results = await axe(combobox)
  expect(results).toHaveNoViolations()
}

/**
 * Test switch/toggle accessibility
 */
async function testSwitchA11y(switchElement: HTMLElement) {
  // Should have role="switch"
  expectAriaRole(switchElement, 'switch')

  // Should have aria-checked
  expect(switchElement).toHaveAttribute('aria-checked')

  // Run axe
  const results = await axe(switchElement)
  expect(results).toHaveNoViolations()
}

/**
 * Test checkbox accessibility
 */
async function testCheckboxA11y(checkbox: HTMLElement) {
  // Should have checkbox role
  const role = checkbox.getAttribute('role') || checkbox.tagName.toLowerCase()
  expect(['checkbox', 'checkbox']).toContain(role)

  // Should have aria-checked
  expect(checkbox).toHaveAttribute('aria-checked')

  // Run axe
  const results = await axe(checkbox)
  expect(results).toHaveNoViolations()
}

/**
 * Test radio button accessibility
 */
async function testRadioA11y(radio: HTMLElement) {
  // Should have role="radio"
  expectAriaRole(radio, 'radio')

  // Should have aria-checked
  expect(radio).toHaveAttribute('aria-checked')

  // Run axe
  const results = await axe(radio)
  expect(results).toHaveNoViolations()
}

/**
 * Test dialog/modal accessibility
 */
async function testDialogA11y(dialog: HTMLElement) {
  // Should have role="dialog" or "alertdialog"
  const role = dialog.getAttribute('role')
  expect(['dialog', 'alertdialog']).toContain(role)

  // Should have aria-modal
  expect(dialog).toHaveAttribute('aria-modal', 'true')

  // Should have accessible label
  const hasLabel =
    dialog.getAttribute('aria-label') ||
    dialog.getAttribute('aria-labelledby')
  expect(hasLabel).toBeTruthy()

  // Run axe
  const results = await axe(dialog)
  expect(results).toHaveNoViolations()
}

/**
 * Generic axe accessibility audit of an element
 */
export async function auditA11y(
  element: HTMLElement,
  options?: {
    rules?: string[]
    runOnly?: string[]
  }
): Promise<any> {
  const results = await axe(element, options)
  expect(results).toHaveNoViolations()
  return results
}

/**
 * Check for common accessibility issues
 */
function checkA11yBasics(element: HTMLElement) {
  const issues: string[] = []

  // Check for images without alt
  const images = element.querySelectorAll('img')
  images.forEach((img) => {
    if (!img.hasAttribute('alt')) {
      issues.push(`Image missing alt text: ${img.src}`)
    }
  })

  // Check for buttons without labels
  const buttons = element.querySelectorAll('button')
  buttons.forEach((btn) => {
    const hasLabel =
      btn.textContent?.trim() ||
      btn.getAttribute('aria-label') ||
      btn.getAttribute('aria-labelledby')
    if (!hasLabel) {
      issues.push('Button without accessible label')
    }
  })

  // Check for form inputs without labels
  const inputs = element.querySelectorAll('input, textarea, select')
  inputs.forEach((input) => {
    const hasLabel =
      input.getAttribute('aria-label') ||
      input.getAttribute('aria-labelledby') ||
      document.querySelector(`label[for="${input.id}"]`)
    if (!hasLabel) {
      issues.push(`Form input without label: ${input.id || 'no id'}`)
    }
  })

  return {
    hasIssues: issues.length > 0,
    issues,
  }
}
