import userEvent from '@testing-library/user-event'
import type { InteractionOptions } from './types'
import { getListItems } from './queries'

/**
 * Click an element with optional delay
 */
export async function clickElement(
  element: HTMLElement,
  options?: InteractionOptions
) {
  const user = userEvent.setup()
  if (options?.delay) await new Promise((r) => setTimeout(r, options.delay))
  await user.click(element)
}

/**
 * Type text into an element
 */
export async function typeText(
  element: HTMLElement,
  text: string,
  options?: InteractionOptions
) {
  const user = userEvent.setup()
  await user.click(element)
  if (options?.delay) await new Promise((r) => setTimeout(r, options.delay))
  await user.keyboard(text)
}

/**
 * Press a single key on an element
 */
export async function pressKey(
  element: HTMLElement,
  key: string,
  options?: InteractionOptions
) {
  const user = userEvent.setup()
  element.focus()
  if (options?.delay) await new Promise((r) => setTimeout(r, options.delay))
  await user.keyboard(key)
}

/**
 * Hover over an element and optionally wait
 */
export async function hoverElement(element: HTMLElement) {
  const user = userEvent.setup()
  await user.hover(element)
}

/**
 * Unhover from an element
 */
export async function unhoverElement(element: HTMLElement) {
  const user = userEvent.setup()
  await user.unhover(element)
}

/**
 * Press arrow down to navigate to next item
 */
export async function pressArrowDown(element: HTMLElement) {
  const user = userEvent.setup()
  element.focus()
  await user.keyboard('{ArrowDown}')
}

/**
 * Press arrow up to navigate to previous item
 */
export async function pressArrowUp(element: HTMLElement) {
  const user = userEvent.setup()
  element.focus()
  await user.keyboard('{ArrowUp}')
}

/**
 * Press Home key
 */
export async function pressHome(element: HTMLElement) {
  const user = userEvent.setup()
  element.focus()
  await user.keyboard('{Home}')
}

/**
 * Press End key
 */
export async function pressEnd(element: HTMLElement) {
  const user = userEvent.setup()
  element.focus()
  await user.keyboard('{End}')
}

/**
 * Press Enter key
 */
export async function pressEnter(element: HTMLElement) {
  const user = userEvent.setup()
  element.focus()
  await user.keyboard('{Enter}')
}

/**
 * Press Escape key
 */
export async function pressEscape(element: HTMLElement) {
  const user = userEvent.setup()
  element.focus()
  await user.keyboard('{Escape}')
}

/**
 * Press Space key
 */
export async function pressSpace(element: HTMLElement) {
  const user = userEvent.setup()
  element.focus()
  await user.keyboard(' ')
}

/**
 * Press Tab key to move focus to next element
 */
async function pressTab(
  options?: InteractionOptions & { shiftKey?: boolean }
) {
  const user = userEvent.setup()
  const key = options?.shiftKey ? '{Shift>}{Tab}{/Shift}' : '{Tab}'
  await user.keyboard(key)
}

/**
 * Select an item from a dropdown by text
 */
async function selectFromDropdown(
  triggerElement: HTMLElement,
  itemText: string
) {
  const user = userEvent.setup()
  await user.click(triggerElement)

  const content = triggerElement.getAttribute('aria-controls')
  const contentElement = content ? document.getElementById(content) : null

  if (!contentElement) {
    throw new Error(
      'Could not find dropdown content element'
    )
  }

  const items = getListItems(contentElement)
  const item = items.find((el) => el.textContent?.includes(itemText))

  if (!item) {
    throw new Error(`Could not find item with text: ${itemText}`)
  }

  await user.click(item)
}

/**
 * Toggle a checkbox or switch
 */
async function toggleCheckbox(element: HTMLElement) {
  const user = userEvent.setup()
  await user.click(element)
}

/**
 * Fill a form with provided data
 */
async function fillForm(
  formElement: HTMLElement,
  data: Record<string, string>
) {
  const user = userEvent.setup()

  for (const [fieldName, fieldValue] of Object.entries(data)) {
    const input = formElement.querySelector(
      `input[name="${fieldName}"], textarea[name="${fieldName}"], select[name="${fieldName}"]`
    ) as HTMLElement

    if (!input) {
      console.warn(`Could not find form field: ${fieldName}`)
      continue
    }

    await user.click(input)
    await user.keyboard(fieldValue)
  }
}

/**
 * Navigate through list items with arrow keys
 */
async function navigateWithArrows(
  direction: 'down' | 'up',
  steps: number = 1
) {
  const user = userEvent.setup()
  const key = direction === 'down' ? '{ArrowDown}' : '{ArrowUp}'

  for (let i = 0; i < steps; i++) {
    await user.keyboard(key)
  }
}

/**
 * Type to search in a searchable list
 */
async function typeToSearch(
  container: HTMLElement,
  searchText: string
) {
  const user = userEvent.setup()
  container.focus()
  await user.keyboard(searchText)
}

/**
 * Focus element with pointer
 */
async function focusWithPointer(element: HTMLElement) {
  const user = userEvent.setup()
  await user.pointer({ keys: '[MouseLeft>]', target: element })
  await user.pointer({ keys: '[MouseLeft]', target: element })
}

/**
 * Focus element with keyboard
 */
export async function focusWithKeyboard(element: HTMLElement) {
  element.focus()
  // Some libraries track keyboard modality via keydown events
  element.dispatchEvent(new KeyboardEvent('keydown', { key: 'Tab', bubbles: true }))
}
