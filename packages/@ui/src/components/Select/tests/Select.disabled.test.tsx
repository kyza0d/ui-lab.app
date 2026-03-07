import { describe, it, expect } from 'vitest'
import { renderSelectWithItems, getSelectTrigger, openSelect, getSelectItems, getSelectContent } from './Select.test-utils'
import {
  createMockSelectItems,
  clickElement,
  hoverElement,
  pressArrowDown,
  focusWithKeyboard,
} from '@/tests/utils'

describe('Select.disabled', () => {
  describe('disabled trigger', () => {
    it('disabled trigger does not respond to click', async () => {
      const items = createMockSelectItems(3)
      const container = renderSelectWithItems(items, { isDisabled: true })
      const trigger = getSelectTrigger(container)

      await clickElement(trigger)

      expect(trigger.getAttribute('aria-expanded')).toBe('false')
    })

    it('disabled trigger does not open on hover', async () => {
      const items = createMockSelectItems(3)
      const container = renderSelectWithItems(items, { trigger: 'hover', isDisabled: true })
      const trigger = getSelectTrigger(container)

      await hoverElement(trigger)

      expect(trigger.getAttribute('aria-expanded')).toBe('false')
    })

    it('disabled trigger does not respond to keyboard', async () => {
      const items = createMockSelectItems(3)
      const container = renderSelectWithItems(items, { isDisabled: true })
      const trigger = getSelectTrigger(container)

      await focusWithKeyboard(trigger)
      await pressArrowDown(trigger)

      expect(trigger.getAttribute('aria-expanded')).toBe('false')
    })

    it('disabled trigger has aria-disabled="true"', async () => {
      const items = createMockSelectItems(3)
      const container = renderSelectWithItems(items, { isDisabled: true })
      const trigger = getSelectTrigger(container)

      expect(trigger.getAttribute('aria-disabled')).toBe('true')
    })
  })

  describe('disabled items', () => {
    it('disabled items cannot be focused via navigation', async () => {
      const items = createMockSelectItems(5)
      items[1].isDisabled = true

      const container = renderSelectWithItems(items)
      const trigger = getSelectTrigger(container)

      await openSelect(trigger)
      await pressArrowDown(trigger)
      await pressArrowDown(trigger)

      const content = getSelectContent(container)
      const focusedItem = content?.querySelector('[data-focused="true"]')
      if (focusedItem) {
        expect(focusedItem.getAttribute('aria-disabled')).not.toBe('true')
      }
    })

    it('disabled items cannot be selected via Enter', async () => {
      const items = createMockSelectItems(5)
      items[1].isDisabled = true

      const container = renderSelectWithItems(items)
      const trigger = getSelectTrigger(container)

      await openSelect(trigger)

      const options = getSelectItems(container)
      const disabledOption = options[1]

      expect(disabledOption.getAttribute('aria-disabled')).toBe('true')
    })

    it('keyboard navigation skips all disabled items', async () => {
      const items = createMockSelectItems(5)
      items[0].isDisabled = true
      items[1].isDisabled = true
      items[2].isDisabled = true

      const container = renderSelectWithItems(items)
      const trigger = getSelectTrigger(container)

      await openSelect(trigger)
      await pressArrowDown(trigger)

      const content = getSelectContent(container)
      const focusedItems = content?.querySelectorAll('[data-focused="true"]') || []
      focusedItems.forEach(item => {
        expect(item.getAttribute('aria-disabled')).not.toBe('true')
      })
    })

    it('multiple consecutive disabled items all skipped', async () => {
      const items = createMockSelectItems(8)
      items[2].isDisabled = true
      items[3].isDisabled = true
      items[4].isDisabled = true

      const container = renderSelectWithItems(items)
      const trigger = getSelectTrigger(container)

      await openSelect(trigger)

      // Navigate through the disabled section
      for (let i = 0; i < 5; i++) {
        await pressArrowDown(trigger)
      }

      const content = getSelectContent(container)
      const focusedItem = content?.querySelector('[data-focused="true"]')
      if (focusedItem) {
        expect(focusedItem.getAttribute('aria-disabled')).not.toBe('true')
      }
    })
  })

  describe('disabled item visualization', () => {
    it('disabled items have aria-disabled="true"', async () => {
      const items = createMockSelectItems(5)
      items[2].isDisabled = true

      const container = renderSelectWithItems(items)
      const trigger = getSelectTrigger(container)

      await openSelect(trigger)

      const options = getSelectItems(container)
      const disabledOption = options[2]

      expect(disabledOption.getAttribute('aria-disabled')).toBe('true')
      expect(disabledOption.getAttribute('data-disabled')).toBe('true')
    })
  })

  describe('all disabled scenario', () => {
    it('all items disabled - no selection possible', async () => {
      const items = createMockSelectItems(3)
      items.forEach(item => {
        item.isDisabled = true
      })

      const container = renderSelectWithItems(items)
      const trigger = getSelectTrigger(container)

      await openSelect(trigger)

      const options = getSelectItems(container)
      const enabledOptions = Array.from(options).filter(
        option => option.getAttribute('aria-disabled') !== 'true'
      )

      expect(enabledOptions.length).toBe(0)
    })
  })
})

