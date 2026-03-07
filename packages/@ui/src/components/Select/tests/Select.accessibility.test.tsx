import { describe, it, expect } from 'vitest'
import { renderSelectWithItems, openSelect, getSelectTrigger } from './Select.test-utils'
import {
  createMockSelectItems,
  getAllElementsByRole,
  pressArrowDown,
} from '@/tests/utils'

describe('Select.accessibility', () => {
  describe('ARIA attributes', () => {
    it('trigger has role="button" and aria-haspopup="listbox"', async () => {
      const items = createMockSelectItems(3)
      const container = renderSelectWithItems(items)
      const trigger = getSelectTrigger(container)

      expect(trigger).toHaveAttribute('role', 'button')
      expect(trigger).toHaveAttribute('aria-haspopup', 'listbox')
    })

    it('trigger has aria-expanded reflecting isOpen state', async () => {
      const items = createMockSelectItems(3)
      const container = renderSelectWithItems(items)
      const trigger = getSelectTrigger(container)

      expect(trigger.getAttribute('aria-expanded')).toBe('false')

      await openSelect(trigger)
      expect(trigger.getAttribute('aria-expanded')).toBe('true')
    })

    it('content has role="listbox"', async () => {
      const items = createMockSelectItems(3)
      const container = renderSelectWithItems(items)
      const trigger = getSelectTrigger(container)

      await openSelect(trigger)

      // Search globally because of Portal
      const listbox = getAllElementsByRole('listbox')
      expect(listbox.length).toBeGreaterThan(0)
    })

    it('items have role="option"', async () => {
      const items = createMockSelectItems(3)
      const container = renderSelectWithItems(items)
      const trigger = getSelectTrigger(container)

      await openSelect(trigger)

      // Search globally because of Portal
      const options = getAllElementsByRole('option')
      expect(options.length).toBe(items.length)
    })
  })

  describe('selection state ARIA', () => {
    it('selected items have aria-selected="true"', async () => {
      const items = createMockSelectItems(5)
      const container = renderSelectWithItems(items, { defaultSelectedKey: items[0].key })
      const trigger = getSelectTrigger(container)

      await openSelect(trigger)

      const selectedOptions = getAllElementsByRole('option').filter(
        option => option.getAttribute('aria-selected') === 'true'
      )

      expect(selectedOptions.length).toBeGreaterThan(0)
      expect(selectedOptions[0]).toHaveTextContent(items[0].label)
    })

    it('unselected items have aria-selected="false"', async () => {
      const items = createMockSelectItems(5)
      const container = renderSelectWithItems(items, { defaultSelectedKey: items[0].key })
      const trigger = getSelectTrigger(container)

      await openSelect(trigger)

      const unselectedOptions = getAllElementsByRole('option').filter(
        option => option.getAttribute('aria-selected') === 'false'
      )

      expect(unselectedOptions.length).toBeGreaterThan(0)
    })
  })

  describe('disabled state ARIA', () => {
    it('disabled items have aria-disabled="true"', async () => {
      const items = createMockSelectItems(5)
      items[1].isDisabled = true

      const container = renderSelectWithItems(items)
      const trigger = getSelectTrigger(container)

      await openSelect(trigger)

      const allOptions = getAllElementsByRole('option')
      const disabledOption = allOptions[1]

      expect(disabledOption).toBeDefined()
      expect(disabledOption.getAttribute('aria-disabled')).toBe('true')
    })

    it('disabled items have data-disabled matching disabled state', async () => {
      const items = createMockSelectItems(5)
      items[2].isDisabled = true

      const container = renderSelectWithItems(items)
      const trigger = getSelectTrigger(container)

      await openSelect(trigger)

      const allOptions = getAllElementsByRole('option')
      const disabledOption = allOptions[2]

      expect(disabledOption).toBeDefined()
      expect(disabledOption.getAttribute('data-disabled')).toBe('true')
    })

    it('disabled trigger has aria-disabled attribute', async () => {
      const items = createMockSelectItems(3)
      const container = renderSelectWithItems(items, { isDisabled: true })
      const trigger = getSelectTrigger(container)

      expect(trigger).toHaveAttribute('aria-disabled')
    })
  })

  describe('keyboard accessibility', () => {
    it('keyboard navigation works without mouse', async () => {
      const items = createMockSelectItems(3)
      const container = renderSelectWithItems(items)
      const trigger = getSelectTrigger(container)

      await openSelect(trigger)
      await pressArrowDown(trigger)

      // Use document search for portal content
      const focusedItems = document.querySelectorAll('[data-focused="true"]')
      expect(focusedItems.length).toBeGreaterThan(0)
    })
  })


  describe('semantic HTML structure', () => {
    it('no invalid ARIA combinations', async () => {
      const items = createMockSelectItems(3)
      const container = renderSelectWithItems(items)
      const trigger = getSelectTrigger(container)

      // Verify basic valid ARIA structure
      expect(trigger.getAttribute('aria-haspopup')).toBe('listbox')
      expect(trigger.getAttribute('aria-expanded')).toMatch(/^(true|false)$/)
    })

    it('all items are properly associated', async () => {
      const items = createMockSelectItems(3)
      const container = renderSelectWithItems(items)
      const trigger = getSelectTrigger(container)

      await openSelect(trigger)

      const options = getAllElementsByRole('option')
      expect(options).toHaveLength(items.length)

      options.forEach(option => {
        expect(option.getAttribute('aria-selected')).toMatch(/^(true|false)$/)
      })
    })
  })

})
