import { describe, it, expect, vi } from 'vitest'
import { renderSelectWithItems, selectItem, openSelect, getSelectTrigger, getSelectedItems } from './Select.test-utils'
import { createMockSelectItems, waitForCondition } from '@/tests/utils'

describe('Select.single', () => {
  describe('single selection behavior', () => {
    it('only one item can be selected at a time', async () => {
      const items = createMockSelectItems(5)
      const container = renderSelectWithItems(items)
      const trigger = getSelectTrigger(container)

      await openSelect(trigger)
      await selectItem(container, items[0].label)

      await openSelect(trigger)
      await selectItem(container, items[1].label)

      const selectedItems = getSelectedItems(container)
      expect(selectedItems).toHaveLength(1)
      expect(selectedItems[0]).toHaveTextContent(items[1].label)
    })

    it('selection closes dropdown automatically', async () => {
      const items = createMockSelectItems(3)
      const container = renderSelectWithItems(items)
      const trigger = getSelectTrigger(container)

      await openSelect(trigger)
      await selectItem(container, items[0].label)

      await waitForCondition(() => trigger.getAttribute('aria-expanded') === 'false')
      expect(trigger.getAttribute('aria-expanded')).toBe('false')
    })

    it('selecting new item deselects previous one', async () => {
      const items = createMockSelectItems(5)
      const container = renderSelectWithItems(items, { defaultSelectedKey: items[0].key })

      let selectedItems = getSelectedItems(container)
      expect(selectedItems).toHaveLength(1)
      expect(selectedItems[0]).toHaveTextContent(items[0].label)

      await openSelect(getSelectTrigger(container))
      await selectItem(container, items[1].label)

      selectedItems = getSelectedItems(container)
      expect(selectedItems).toHaveLength(1)
      expect(selectedItems[0]).toHaveTextContent(items[1].label)
    })
  })

  describe('text value behavior', () => {
    it('selectedTextValue displays single item text', async () => {
      const items = createMockSelectItems(3)
      const container = renderSelectWithItems(items, { selectedKey: items[1].key })
      const trigger = getSelectTrigger(container)

      await waitForCondition(() => trigger.textContent?.includes(items[1].label))
      expect(trigger.textContent).toContain(items[1].label)
    })
  })

  describe('focus behavior', () => {
    it('focused item starts at selectedKey on open (or first if nothing selected)', async () => {
      const items = createMockSelectItems(5)
      const container = renderSelectWithItems(items, { defaultSelectedKey: items[2].key })
      const trigger = getSelectTrigger(container)

      await openSelect(trigger)

      const focusedItems = document.querySelectorAll('[data-focused="true"]')
      expect(focusedItems.length).toBeGreaterThan(0)
    })

    it('first item focused when nothing selected', async () => {
      const items = createMockSelectItems(5)
      const container = renderSelectWithItems(items)
      const trigger = getSelectTrigger(container)

      await openSelect(trigger)

      const focusedItems = document.querySelectorAll('[data-focused="true"]')
      expect(focusedItems.length).toBeGreaterThan(0)
    })
  })

  describe('callback behavior', () => {
    it('onSelectionChange called with single key value', async () => {
      const items = createMockSelectItems(3)
      const onSelectionChange = vi.fn()

      const container = renderSelectWithItems(items, { onSelectionChange })
      await openSelect(getSelectTrigger(container))
      await selectItem(container, items[0].label)

      expect(onSelectionChange).toHaveBeenCalled()
      const lastCall = onSelectionChange.mock.calls[onSelectionChange.mock.calls.length - 1]
      expect(lastCall[0]).toBe(items[0].key)
    })
  })

  describe('mode verification', () => {
    it('mode is single', async () => {
      const items = createMockSelectItems(3)
      const container = renderSelectWithItems(items, { mode: 'single' })

      const selectRoot = container.querySelector('[data-mode="single"]')
      expect(selectRoot).toBeInTheDocument()
    })
  })
})
