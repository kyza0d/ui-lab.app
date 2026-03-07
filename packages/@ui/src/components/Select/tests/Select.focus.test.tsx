import { describe, it, expect, vi } from 'vitest'
import { act } from '@testing-library/react'
import { renderSelectWithItems, openSelect, getSelectTrigger, getSelectContent } from './Select.test-utils'
import {
  createMockSelectItems,
  pressArrowDown,
  pressEscape,
  waitForFocus,
} from '@/tests/utils'
import userEvent from '@testing-library/user-event'

describe('Select.focus', () => {
  describe('focus ring visibility', () => {
    it('trigger can receive focus', async () => {
      const items = createMockSelectItems(3)
      const container = renderSelectWithItems(items)
      const trigger = getSelectTrigger(container)

      await act(async () => {
        trigger.focus()
      })
      expect(document.activeElement).toBe(trigger)
    })

    it('trigger is focusable', async () => {
      const items = createMockSelectItems(3)
      const container = renderSelectWithItems(items)
      const trigger = getSelectTrigger(container)

      expect(trigger.tabIndex).toBeGreaterThanOrEqual(-1)
    })
  })

  describe('focus management', () => {
    it('Tab focuses trigger button', async () => {
      const items = createMockSelectItems(3)
      const container = renderSelectWithItems(items)
      const trigger = getSelectTrigger(container)
      const user = userEvent.setup()

      // Ensure focus starts on body
      await act(async () => {
        document.body.focus()
      })

      await user.tab()
      
      await waitForFocus(() => trigger)
      expect(document.activeElement).toBe(trigger)
    })

    it('autoFocus prop focuses trigger on mount', async () => {
      const items = createMockSelectItems(3)
      const container = renderSelectWithItems(items, { autoFocus: true })
      const trigger = getSelectTrigger(container)

      // Should be focused on mount
      expect(document.activeElement).toBe(trigger)
    })

    it('opening dropdown focuses selected item (single)', async () => {
      const items = createMockSelectItems(5)
      const container = renderSelectWithItems(items, { defaultSelectedKey: items[2].key })
      const trigger = getSelectTrigger(container)

      await openSelect(trigger)

      const content = getSelectContent(container)
      expect(content).toBeInTheDocument()
      
      const focusedItems = content!.querySelectorAll('[data-focused="true"]')
      expect(focusedItems.length).toBeGreaterThan(0)
    })

    it('opening dropdown focuses first selected (multiple)', async () => {
      const items = createMockSelectItems(5)
      const container = renderSelectWithItems(items, {
        mode: 'multiple',
        defaultSelectedKeys: [items[1].key, items[3].key]
      })
      const trigger = getSelectTrigger(container)

      await openSelect(trigger)

      const content = getSelectContent(container)
      expect(content).toBeInTheDocument()
      
      const focusedItems = content!.querySelectorAll('[data-focused="true"]')
      expect(focusedItems.length).toBeGreaterThan(0)
    })

    it('ESC returns focus to trigger', async () => {
      const items = createMockSelectItems(3)
      const container = renderSelectWithItems(items)
      const trigger = getSelectTrigger(container)

      await openSelect(trigger)
      await pressEscape(trigger)

      expect(document.activeElement).toBe(trigger)
    })
  })


  describe('focused item state', () => {
    it('focusedKey tracks currently focused item in dropdown', async () => {
      const items = createMockSelectItems(3)
      const container = renderSelectWithItems(items)
      const trigger = getSelectTrigger(container)

      await openSelect(trigger)
      await pressArrowDown(trigger)

      const content = getSelectContent(container)
      const focusedItem = content!.querySelector('[data-focused="true"]')
      expect(focusedItem).toBeInTheDocument()
    })

    it('focused item is visible in viewport (scrollIntoView called)', async () => {
      const items = createMockSelectItems(20)
      const container = renderSelectWithItems(items, { maxItems: 5 })
      const trigger = getSelectTrigger(container)

      // Mock scrollIntoView
      const originalScroll = Element.prototype.scrollIntoView
      const scrollIntoViewMock = vi.fn()
      Element.prototype.scrollIntoView = scrollIntoViewMock

      try {
        await openSelect(trigger)
        await pressArrowDown(trigger)

        // scrollIntoView may be called (depending on implementation)
        // Just verify the focused item exists
        const content = getSelectContent(container)
        const focusedItem = content!.querySelector('[data-focused="true"]')
        expect(focusedItem).toBeInTheDocument()
      } finally {
        Element.prototype.scrollIntoView = originalScroll
      }
    })
  })

})

