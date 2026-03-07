import { describe, it, expect } from 'vitest'
import { renderSelectWithItems, openSelect, closeSelect, getSelectTrigger, getSelectContent } from './Select.test-utils'
import { createMockSelectItems, clickElement, pressEscape, hoverElement, unhoverElement, waitForOpen, waitForClose, waitForCondition } from '@/tests/utils'

describe('Select.openClose', () => {
  describe('click trigger mode', () => {
    it('opens on trigger click', async () => {
      const items = createMockSelectItems(3)
      const container = renderSelectWithItems(items, { trigger: 'click' })
      const trigger = getSelectTrigger(container)

      await clickElement(trigger)
      await waitForCondition(() => trigger.getAttribute('aria-expanded') === 'true')

      expect(trigger.getAttribute('aria-expanded')).toBe('true')
    })

    it('closes on second trigger click', async () => {
      const items = createMockSelectItems(3)
      const container = renderSelectWithItems(items, { trigger: 'click' })
      const trigger = getSelectTrigger(container)

      await openSelect(trigger)
      expect(trigger.getAttribute('aria-expanded')).toBe('true')

      await clickElement(trigger)
      expect(trigger.getAttribute('aria-expanded')).toBe('false')
    })

    it('closes on ESC key', async () => {
      const items = createMockSelectItems(3)
      const container = renderSelectWithItems(items, { trigger: 'click' })
      const trigger = getSelectTrigger(container)

      await openSelect(trigger)
      await pressEscape(trigger)

      expect(trigger.getAttribute('aria-expanded')).toBe('false')
    })

    it('closes when clicking outside dropdown', async () => {
      const items = createMockSelectItems(3)
      const container = renderSelectWithItems(items, { trigger: 'click' })
      const trigger = getSelectTrigger(container)

      await openSelect(trigger)
      expect(trigger.getAttribute('aria-expanded')).toBe('true')

      const outsideElement = container.querySelector('html') || document.body
      await clickElement(outsideElement as HTMLElement)

      // Wait for close with a timeout
      await waitForClose(() => getSelectContent(container))
      expect(trigger.getAttribute('aria-expanded')).toBe('false')
    })
  })

  describe('hover trigger mode', () => {
    it('opens on hover', async () => {
      const items = createMockSelectItems(3)
      const container = renderSelectWithItems(items, { trigger: 'hover' })
      const trigger = getSelectTrigger(container)

      await hoverElement(trigger)
      await waitForCondition(() => trigger.getAttribute('aria-expanded') === 'true', { timeout: 200 })

      expect(trigger.getAttribute('aria-expanded')).toBe('true')
    })

    it('closes after leaving with 100ms delay', async () => {
      const items = createMockSelectItems(3)
      const container = renderSelectWithItems(items, { trigger: 'hover' })
      const trigger = getSelectTrigger(container)

      await hoverElement(trigger)
      await waitForOpen(() => getSelectContent(container)!)

      await unhoverElement(trigger)

      // Should still be open immediately
      expect(trigger.getAttribute('aria-expanded')).toBe('true')

      // Should close after ~100ms
      await waitForCondition(() => trigger.getAttribute('aria-expanded') === 'false', { timeout: 200 })
    })

    it('hover intent detection works', async () => {
      const items = createMockSelectItems(3)
      const container = renderSelectWithItems(items, { trigger: 'hover' })
      const trigger = getSelectTrigger(container)

      // Hover on trigger
      await hoverElement(trigger)
      await waitForOpen(() => getSelectContent(container)!)

      // Move to content area (should keep open)
      const content = getSelectContent(container)
      if (content) {
        await hoverElement(content)
        // Still open
        expect(trigger.getAttribute('aria-expanded')).toBe('true')
      }
    })
  })

  describe('disabled state', () => {
    it('disabled trigger does not open on click', async () => {
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

      // Should not open
      expect(trigger.getAttribute('aria-expanded')).toBe('false')
    })

    it('disabled trigger has aria-disabled attribute', async () => {
      const items = createMockSelectItems(3)
      const container = renderSelectWithItems(items, { isDisabled: true })
      const trigger = getSelectTrigger(container)

      expect(trigger).toHaveAttribute('aria-disabled')
    })
  })

  describe('aria state', () => {
    it('aria-expanded reflects isOpen state', async () => {
      const items = createMockSelectItems(3)
      const container = renderSelectWithItems(items)
      const trigger = getSelectTrigger(container)

      expect(trigger.getAttribute('aria-expanded')).toBe('false')

      await openSelect(trigger)
      expect(trigger.getAttribute('aria-expanded')).toBe('true')

      await closeSelect(trigger)
      expect(trigger.getAttribute('aria-expanded')).toBe('false')
    })

    it('aria-haspopup is listbox', async () => {
      const items = createMockSelectItems(3)
      const container = renderSelectWithItems(items)
      const trigger = getSelectTrigger(container)

      expect(trigger.getAttribute('aria-haspopup')).toBe('listbox')
    })
  })

})
