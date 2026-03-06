import { screen, within } from '@testing-library/react'
import type { QueryBuilderOptions } from './types'

/**
 * Get the currently focused element
 */
export function getFocusedElement(): HTMLElement | null {
  return document.activeElement as HTMLElement | null
}

/**
 * Get all disabled elements in a container
 */
export function getDisabledElements(
  container?: HTMLElement
): HTMLElement[] {
  const root = container || document.documentElement
  return Array.from(
    root.querySelectorAll('[disabled], [aria-disabled="true"]')
  )
}

/**
 * Get all elements with a specific role
 */
export function getElementByRole(
  role: string,
  options?: { name?: string; hidden?: boolean }
) {
  try {
    return screen.getByRole(role, options)
  } catch {
    return null
  }
}

/**
 * Get all elements with a specific role
 */
export function getAllElementsByRole(
  role: string,
  options?: { hidden?: boolean }
) {
  try {
    return screen.getAllByRole(role, options)
  } catch {
    return []
  }
}

/**
 * Get element by test id
 */
export function getElementByTestId(testId: string) {
  try {
    return screen.getByTestId(testId)
  } catch {
    return null
  }
}

/**
 * Get element by label text
 */
export function getElementByLabelText(labelText: string | RegExp) {
  try {
    return screen.getByLabelText(labelText)
  } catch {
    return null
  }
}

/**
 * Get element by placeholder text
 */
export function getElementByPlaceholderText(placeholder: string | RegExp) {
  try {
    return screen.getByPlaceholderText(placeholder)
  } catch {
    return null
  }
}

/**
 * Get element by text content
 */
export function getElementByText(text: string | RegExp) {
  try {
    return screen.getByText(text)
  } catch {
    return null
  }
}

/**
 * Get all selected items in a listbox or similar
 */
export function getSelectedItems(container: HTMLElement): HTMLElement[] {
  return Array.from(
    container.querySelectorAll('[aria-selected="true"]')
  )
}

/**
 * Get the trigger/button that opens a dropdown
 */
export function getTrigger(container: HTMLElement): HTMLElement | null {
  return container.querySelector('[aria-expanded], [aria-haspopup]') as HTMLElement | null
}

/**
 * Get the content/list that is toggled by a trigger
 */
export function getContent(container: HTMLElement): HTMLElement | null {
  const trigger = getTrigger(container)
  if (!trigger) return null

  const contentId = trigger.getAttribute('aria-controls')
  if (contentId) {
    return document.getElementById(contentId)
  }

  // Try to find next sibling that is a list or menu
  let next = trigger.nextElementSibling
  while (next) {
    if (
      next.getAttribute('role') === 'menu' ||
      next.getAttribute('role') === 'listbox' ||
      next.getAttribute('role') === 'dialog'
    ) {
      return next as HTMLElement
    }
    next = next.nextElementSibling
  }

  return null
}

/**
 * Get all items in a list/menu
 */
export function getListItems(container: HTMLElement): HTMLElement[] {
  const role = container.getAttribute('role')
  if (!role) return []

  const itemRole =
    role === 'menu'
      ? 'menuitem'
      : role === 'listbox'
        ? 'option'
        : 'option'

  return Array.from(container.querySelectorAll(`[role="${itemRole}"]`))
}

/**
 * Create a scoped query function that works within a container
 */
export function createScopedQueries(container: HTMLElement) {
  const scopedWithin = within(container)

  return {
    getByRole: scopedWithin.getByRole,
    getAllByRole: scopedWithin.getAllByRole,
    getByLabelText: scopedWithin.getByLabelText,
    getByPlaceholderText: scopedWithin.getByPlaceholderText,
    getByText: scopedWithin.getByText,
    getByTestId: scopedWithin.getByTestId,
    queryByRole: scopedWithin.queryByRole,
    queryAllByRole: scopedWithin.queryAllByRole,
    queryByLabelText: scopedWithin.queryByLabelText,
    queryByPlaceholderText: scopedWithin.queryByPlaceholderText,
    queryByText: scopedWithin.queryByText,
    queryByTestId: scopedWithin.queryByTestId,
  }
}

