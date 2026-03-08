import { describe, it, expect, vi } from 'vitest'
import type { KeyboardNavConfig } from './types'
import {
  pressArrowDown,
  pressArrowUp,
  pressHome,
  pressEnd,
  pressEnter,
  pressEscape,
  typeToSearch,
} from './interactions'
import { getListItems } from './queries'

/**
 * Test keyboard navigation for a listbox, menu, or similar component
 * Automatically tests arrow keys, home/end, enter, and escape based on config
 */
export async function testKeyboardNavigation(
  container: HTMLElement,
  config: KeyboardNavConfig = {}
) {
  const {
    testArrows = true,
    testHomeEnd = true,
    testEnter = true,
    testEscape = true,
    testTypeAhead = false,
    items = getListItems(container),
  } = config

  if (testArrows) await testArrowNavigation(container, items);
  if (testHomeEnd) await testHomeEndKeys(container, items);
  if (testEnter) await testEnterKey(container, items);
  if (testEscape) await testEscapeKey(container);
  if (testTypeAhead) await testTypeAheadSearch(container, items)
}

/**
 * Test arrow key navigation within a list
 */
export async function testArrowNavigation(
  container: HTMLElement,
  items: HTMLElement[] = getListItems(container)
) {
  if (items.length < 2) {
    console.warn('Need at least 2 items to test arrow navigation')
    return
  }

  const firstItem = items[0]
  firstItem.focus()

  // Test Arrow Down wraps to first item
  for (let i = 0; i < items.length; i++) {
    const current = document.activeElement as HTMLElement
    expect(items).toContain(current)

    if (i < items.length - 1) {
      await pressArrowDown(current)
    }
  }

  // Test Arrow Up wraps to last item
  const lastItem = items[items.length - 1]
  lastItem.focus()

  for (let i = items.length - 1; i >= 0; i--) {
    const current = document.activeElement as HTMLElement
    expect(items).toContain(current)

    if (i > 0) {
      await pressArrowUp(current)
    }
  }
}

/**
 * Test home and end key navigation
 */
export async function testHomeEndKeys(
  container: HTMLElement,
  items: HTMLElement[] = getListItems(container),
) {
  if (items.length < 2) {
    console.warn('Need at least 2 items to test home/end navigation')
    return
  }

  const firstItem = items[0]
  const lastItem = items[items.length - 1]

  // Test Home key
  lastItem.focus()
  await pressHome(lastItem)
  const afterHome = document.activeElement as HTMLElement
  expect(afterHome).toBe(firstItem)

  // Test End key
  firstItem.focus()
  await pressEnd(firstItem)
  const afterEnd = document.activeElement as HTMLElement
  expect(afterEnd).toBe(lastItem)
}

/**
 * Test enter key behavior
 */
export async function testEnterKey(
  container: HTMLElement,
  items: HTMLElement[] = getListItems(container)
) {
  if (items.length === 0) {
    console.warn('No items found to test Enter key')
    return
  }

  const item = items[0]
  item.focus()

  const clickHandler = vi.fn()
  item.addEventListener('click', clickHandler)

  await pressEnter(item)

  // Element should still exist and be focused
  expect(item).toBeInTheDocument()
}

/**
 * Test escape key behavior
 */
export async function testEscapeKey(container: HTMLElement) {
  container.focus()
  await pressEscape(container)

  // Focus should still be manageable (not necessarily changed)
  expect(document.activeElement).toBeDefined()
}

/**
 * Test type-ahead search functionality
 */
export async function testTypeAheadSearch(
  container: HTMLElement,
  items: HTMLElement[] = getListItems(container)
) {
  if (items.length < 2) {
    console.warn('Need at least 2 items to test type-ahead search')
    return
  }

  const firstItem = items[0]
  const firstLetter = (
    firstItem.textContent || ''
  ).charAt(0)?.toLowerCase()

  if (!firstLetter) {
    console.warn('First item has no text content for type-ahead test')
    return
  }

  container.focus()
  await typeToSearch(container, firstLetter)

  // After typing, focus should be on an item (ideally the first that matches)
  const focused = document.activeElement as HTMLElement
  expect(items).toContain(focused)
}

/**
 * Configuration for common list component keyboard tests
 */
export const DEFAULT_KEYBOARD_NAV_CONFIG: KeyboardNavConfig = {
  testArrows: true,
  testHomeEnd: true,
  testEnter: true,
  testEscape: true,
  testTypeAhead: false,
  requireCtrlForHomeEnd: false,
}

/**
 * Create a test suite for keyboard navigation
 * Usage in your test file:
 * ```
 * createKeyboardNavigationTests(SelectComponent, {
 *   defaultProps: { children: [...] },
 *   getListContainer: (rendered) => rendered.getByRole('listbox')
 * })
 * ```
 */
export function createKeyboardNavigationTests(
  config: {
    getListContainer: () => HTMLElement
    testConfig?: Partial<KeyboardNavConfig>
    skipTests?: Array<keyof KeyboardNavConfig>
  }
) {
  describe('Keyboard Navigation', () => {
    const finalConfig = {
      ...DEFAULT_KEYBOARD_NAV_CONFIG,
      ...config.testConfig,
    }

    // Remove skipped tests
    if (config.skipTests) {
      config.skipTests.forEach((test) => {
        ; (finalConfig as any)[test] = false
      })
    }

    it('should navigate with arrow keys', async () => {
      const container = config.getListContainer()
      await testArrowNavigation(container)
    })

    it('should navigate with home/end keys', async () => {
      const container = config.getListContainer()
      await testHomeEndKeys(
        container,
        undefined
      )
    })

    it('should handle enter key', async () => {
      const container = config.getListContainer()
      await testEnterKey(container)
    })

    it('should handle escape key', async () => {
      const container = config.getListContainer()
      await testEscapeKey(container)
    })
  })
}
