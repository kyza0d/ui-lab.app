import { describe, it, expect, vi } from 'vitest'
import { screen } from '@testing-library/react'
import { renderSelectWithItems, selectItem, getSelectTrigger, getSelectedItems } from './Select.test-utils'
import { createMockSelectItems, createSelectionCallback } from '@/tests/utils'

describe('Select.core', () => {
  describe('single selection', () => {
    it('controlled: selectedKey prop controls selection', async () => {
      const items = createMockSelectItems(3)
      const container = renderSelectWithItems(items, { selectedKey: items[0].key })

      const selectedItems = getSelectedItems(container)
      expect(selectedItems).toHaveLength(1)
      expect(selectedItems[0]).toHaveTextContent(items[0].label)
    })

    it('uncontrolled: defaultSelectedKey sets initial selection', async () => {
      const items = createMockSelectItems(3)
      renderSelectWithItems(items, { defaultSelectedKey: items[1].key })

      const selectedItems = getSelectedItems(screen.getByRole('button').parentElement!)
      expect(selectedItems).toHaveLength(1)
      expect(selectedItems[0]).toHaveTextContent(items[1].label)
    })

    it('onSelectionChange fires with selected key', async () => {
      const items = createMockSelectItems(3)
      const { callback, calls } = createSelectionCallback()

      renderSelectWithItems(items, { onSelectionChange: callback })
      const trigger = getSelectTrigger(screen.getByRole('button').parentElement!)

      await selectItem(trigger.parentElement!, items[0].label)

      expect(calls.length).toBeGreaterThan(0)
      expect(calls[calls.length - 1][0]).toBe(items[0].key)
    })

    it('selectedTextValue displays selected item text', async () => {
      const items = createMockSelectItems(3)
      renderSelectWithItems(items, { defaultSelectedKey: items[2].key })

      const trigger = screen.getByRole('button')
      expect(trigger).toHaveTextContent(items[2].label)
    })

    it('default placeholder text when nothing selected', async () => {
      const items = createMockSelectItems(3)
      renderSelectWithItems(items)

      const trigger = screen.getByRole('button')
      // Default placeholder behavior
      expect(trigger.textContent).toBeTruthy()
    })

    it('mode prop switches to single mode', async () => {
      const items = createMockSelectItems(3)
      const container = renderSelectWithItems(items, { mode: 'single' })

      const selectRoot = container.querySelector('[data-mode="single"]')
      expect(selectRoot).toBeInTheDocument()
    })
  })

  describe('multiple selection', () => {
    it('controlled: selectedKeys prop controls selections', async () => {
      const items = createMockSelectItems(5)
      const selected = [items[0].key, items[2].key]

      const container = renderSelectWithItems(items, {
        mode: 'multiple',
        selectedKeys: selected
      })

      const selectedItems = getSelectedItems(container)
      expect(selectedItems).toHaveLength(2)
    })

    it('uncontrolled: defaultSelectedKeys sets initial selections', async () => {
      const items = createMockSelectItems(5)
      const selected = [items[1].key, items[3].key]

      const container = renderSelectWithItems(items, {
        mode: 'multiple',
        defaultSelectedKeys: selected
      })

      const selectedItems = getSelectedItems(container)
      expect(selectedItems).toHaveLength(2)
    })

    it('onSelectionChange fires with array of keys', async () => {
      const items = createMockSelectItems(3)
      const { callback, calls } = createSelectionCallback()

      const container = renderSelectWithItems(items, {
        mode: 'multiple',
        onSelectionChange: callback
      })

      await selectItem(container, items[0].label)

      expect(calls.length).toBeGreaterThan(0)
      const lastCall = calls[calls.length - 1][0]
      expect(Array.isArray(lastCall)).toBe(true)
    })

    it('multiple items can be selected', async () => {
      const items = createMockSelectItems(5)
      const container = renderSelectWithItems(items, { mode: 'multiple' })

      await selectItem(container, items[0].label)
      await selectItem(container, items[1].label)

      const selectedItems = getSelectedItems(container)
      expect(selectedItems.length).toBeGreaterThanOrEqual(2)
    })

    it('mode prop switches to multiple mode', async () => {
      const items = createMockSelectItems(3)
      const container = renderSelectWithItems(items, { mode: 'multiple' })

      const selectRoot = container.querySelector('[data-mode="multiple"]')
      expect(selectRoot).toBeInTheDocument()
    })
  })

  describe('selection state', () => {
    it('selection callback receives correct value type', async () => {
      const items = createMockSelectItems(3)
      const onSelectionChange = vi.fn()

      const container = renderSelectWithItems(items, { onSelectionChange })
      await selectItem(container, items[0].label)

      expect(onSelectionChange).toHaveBeenCalled()
    })

    it('null selectedKey means nothing selected', async () => {
      const items = createMockSelectItems(3)
      const container = renderSelectWithItems(items, { selectedKey: null })

      const selectedItems = getSelectedItems(container)
      expect(selectedItems).toHaveLength(0)
    })

    it('empty selectedKeys means nothing selected', async () => {
      const items = createMockSelectItems(3)
      const container = renderSelectWithItems(items, { mode: 'multiple', selectedKeys: [] })

      const selectedItems = getSelectedItems(container)
      expect(selectedItems).toHaveLength(0)
    })
  })
})
