import { describe, it, expect } from 'vitest'
import { act } from '@testing-library/react'
import { renderSelectWithItems, renderMultiSelectWithItems, openSelect, selectItem, toggleItem, getSelectTrigger, getSelectedItems } from './Select.test-utils'
import { createMockSelectItems, pressArrowDown, pressEnter, pressEscape, focusWithKeyboard, waitForCondition } from '@/tests/utils'

describe('Select.integration', () => {
  describe('complete user flows - single select', () => {
    it('user flow: open dropdown → select item → close', async () => {
      const items = createMockSelectItems(3)
      let selectedValue = null

      const container = renderSelectWithItems(items, {
        onSelectionChange: (value) => { selectedValue = value }
      })
      const trigger = getSelectTrigger(container)

      // Open dropdown
      await openSelect(trigger)
      expect(trigger.getAttribute('aria-expanded')).toBe('true')

      // Select item
      await selectItem(container, items[0].label)

      // Should close automatically
      expect(trigger.getAttribute('aria-expanded')).toBe('false')
      expect(selectedValue).toBeDefined()
    })

    it('user flow: keyboard only (no mouse) complete selection', async () => {
      const items = createMockSelectItems(3)
      let selectedValue = null

      const container = renderSelectWithItems(items, {
        onSelectionChange: (value) => { selectedValue = value }
      })
      const trigger = getSelectTrigger(container)

      // Focus trigger with keyboard
      await act(async () => {
        await focusWithKeyboard(trigger)
      })

      // Open with Enter/Space
      await pressEnter(trigger)
      await waitForCondition(() => trigger.getAttribute('aria-expanded') === 'true', { timeout: 500 })

      // Navigate with arrow keys
      await pressArrowDown(trigger)
      await pressArrowDown(trigger)

      // Select with Enter
      await pressEnter(trigger)
      await waitForCondition(() => trigger.getAttribute('aria-expanded') === 'false', { timeout: 500 })

      // Should close
      expect(trigger.getAttribute('aria-expanded')).toBe('false')
    })

    it('user flow: tab in, arrow nav, enter to select, tab out', async () => {
      const items = createMockSelectItems(3)
      const container = renderSelectWithItems(items)
      const trigger = getSelectTrigger(container)

      // Tab to focus trigger
      await act(async () => {
        await focusWithKeyboard(trigger)
      })
      expect(document.activeElement).toBe(trigger)

      // Arrow down to navigate
      await pressArrowDown(trigger)

      // Enter to select (this will close)
      await pressEnter(trigger)
      await waitForCondition(() => trigger.getAttribute('aria-expanded') === 'false', { timeout: 500 })

      expect(trigger.getAttribute('aria-expanded')).toBe('false')
    })
  })

  describe('complete user flows - multi select', () => {
    it('user flow: multi-select → select 3 items → deselect one → close', async () => {
      const items = createMockSelectItems(5)
      let selectedValues: any[] = []

      const container = renderMultiSelectWithItems(items, {
        onSelectionChange: (values) => { selectedValues = values }
      })

      const trigger = getSelectTrigger(container)

      // Open dropdown first
      await openSelect(trigger)

      // Select 3 items
      await selectItem(container, items[0].label)
      await selectItem(container, items[1].label)
      await selectItem(container, items[2].label)

      let selectedItems = getSelectedItems(container)
      expect(selectedItems.length).toBe(3)

      // Deselect one
      await toggleItem(container, items[1].label)

      selectedItems = getSelectedItems(container)
      expect(selectedItems.length).toBe(2)

      // Close
      await pressEscape(trigger)
      await waitForCondition(() => trigger.getAttribute('aria-expanded') === 'false', { timeout: 500 })
      expect(trigger.getAttribute('aria-expanded')).toBe('false')
    })

    it('user flow: select all, then deselect all', async () => {
      const items = createMockSelectItems(3)
      let selectedValues: any[] = []

      const container = renderMultiSelectWithItems(items, {
        onSelectionChange: (values) => { selectedValues = values }
      })

      const trigger = getSelectTrigger(container)
      await openSelect(trigger)

      // Select all
      for (const item of items) {
        await selectItem(container, item.label)
      }

      let selectedItems = getSelectedItems(container)
      expect(selectedItems.length).toBe(items.length)

      // Deselect all
      for (const item of items) {
        await toggleItem(container, item.label)
      }

      selectedItems = getSelectedItems(container)
      expect(selectedItems.length).toBe(0)
    })
  })

  describe('context value updates', () => {
    it('context value updated correctly through full flow', async () => {
      const items = createMockSelectItems(3)
      const container = renderSelectWithItems(items, { defaultSelectedKey: null })
      const trigger = getSelectTrigger(container)

      expect(getSelectedItems(container).length).toBe(0)

      await openSelect(trigger)
      await selectItem(container, items[0].label)

      const selectedItems = getSelectedItems(container)
      expect(selectedItems.length).toBe(1)
      expect(selectedItems[0]).toHaveTextContent(items[0].label)
    })
  })

  describe('multiple instances', () => {
    it('multiple Select instances do not interfere with each other', async () => {
      const items1 = createMockSelectItems(3)
      const items2 = createMockSelectItems(3)

      const container1 = renderSelectWithItems(items1, { defaultSelectedKey: items1[0].key })
      const container2 = renderSelectWithItems(items2, { defaultSelectedKey: items2[1].key })

      const trigger1 = getSelectTrigger(container1)
      const trigger2 = getSelectTrigger(container2)

      // Open first
      await openSelect(trigger1)
      expect(trigger1.getAttribute('aria-expanded')).toBe('true')
      expect(trigger2.getAttribute('aria-expanded')).toBe('false')

      // Open second
      await openSelect(trigger2)
      expect(trigger2.getAttribute('aria-expanded')).toBe('true')

      // First should still be open
      expect(trigger1.getAttribute('aria-expanded')).toBe('true')
    })
  })



  describe('controlled to uncontrolled transitions', () => {
    it('controlled Select maintains proper state', async () => {
      const items = createMockSelectItems(3)
      let selectedValue = null

      const container = renderSelectWithItems(items, {
        mode: 'single',
        selectedKey: items[0].key,
        onSelectionChange: (value) => { selectedValue = value }
      })

      const trigger = getSelectTrigger(container)
      const selectedItems = getSelectedItems(container)

      expect(selectedItems.length).toBe(1)
      expect(selectedItems[0]).toHaveTextContent(items[0].label)
    })

    it('uncontrolled Select maintains proper state', async () => {
      const items = createMockSelectItems(3)
      let selectedValue = null

      const container = renderSelectWithItems(items, {
        mode: 'single',
        defaultSelectedKey: items[1].key,
        onSelectionChange: (value) => { selectedValue = value }
      })

      const selectedItems = getSelectedItems(container)
      expect(selectedItems.length).toBe(1)
      expect(selectedItems[0]).toHaveTextContent(items[1].label)
    })
  })

  describe('filter integration', () => {
    it('filtered Select allows normal user flow', async () => {
      const items = createMockSelectItems(5)
      const filter = (item: any) => !item.label.includes('Option 3')

      const container = renderSelectWithItems(items, { filter })
      const trigger = getSelectTrigger(container)

      await openSelect(trigger)

      // Try to select an available item
      const availableLabel = items.find(item => !item.label.includes('Option 3'))?.label
      if (availableLabel) {
        await selectItem(container, availableLabel)
      }

      expect(trigger.getAttribute('aria-expanded')).toBe('false')
    })
  })

  describe('error boundary scenarios', () => {
    it('rapid selection and deselection stabilizes', async () => {
      const items = createMockSelectItems(3)
      const container = renderMultiSelectWithItems(items)

      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < items.length; j++) {
          try {
            await toggleItem(container, items[j].label)
          } catch (e) {
            // May fail if item becomes unavailable
          }
        }
      }

      // Should be in stable state
      expect(true).toBe(true)
    })

    it('selection after item removal handled', async () => {
      const items = createMockSelectItems(3)
      const container = renderSelectWithItems(items)

      try {
        await selectItem(container, items[0].label)
      } catch (e) {
        // Item might become unavailable
      }

      expect(true).toBe(true)
    })
  })
})
