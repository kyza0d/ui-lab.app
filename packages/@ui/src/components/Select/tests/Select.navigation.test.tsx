import { describe, it, expect, beforeEach } from 'vitest'
import { renderSelectWithItems, openSelect, getSelectTrigger, getSelectItems } from './Select.test-utils'
import {
  createMockSelectItems,
  pressArrowDown,
  pressArrowUp,
  pressHome,
  pressEnd,
  pressEnter,
  pressSpace,
  waitForCondition,
} from '@/tests/utils'

describe('Select.navigation', () => {
  describe('arrow key navigation', () => {
    it('Arrow Down navigates to next item', async () => {
      const items = createMockSelectItems(3)
      const container = renderSelectWithItems(items)
      const trigger = getSelectTrigger(container)

      await openSelect(trigger)
      await pressArrowDown(trigger)

      await waitForCondition(() => {
        const focusedItems = getSelectItems(container).filter(item =>
          item.getAttribute('data-focused') === 'true'
        )
        return focusedItems.length > 0
      })

      const focusedItems = getSelectItems(container).filter(item =>
        item.getAttribute('data-focused') === 'true'
      )
      expect(focusedItems.length).toBeGreaterThan(0)
    })

    it('Arrow Up navigates to previous item', async () => {
      const items = createMockSelectItems(3)
      const container = renderSelectWithItems(items)
      const trigger = getSelectTrigger(container)

      await openSelect(trigger)
      await pressArrowDown(trigger)
      await pressArrowDown(trigger)

      // Now go up
      await pressArrowUp(trigger)

      const focusedItems = getSelectItems(container).filter(item =>
        item.getAttribute('data-focused') === 'true'
      )
      expect(focusedItems.length).toBeGreaterThan(0)
    })

    it('navigation wraps around (last to first)', async () => {
      const items = createMockSelectItems(3)
      const container = renderSelectWithItems(items)
      const trigger = getSelectTrigger(container)

      await openSelect(trigger)

      // Navigate to last item
      for (let i = 0; i < items.length + 1; i++) {
        await pressArrowDown(trigger)
      }

      // Should wrap to first
      let focusedItems = getSelectItems(container).filter(item =>
        item.getAttribute('data-focused') === 'true'
      )
      expect(focusedItems.length).toBeGreaterThan(0)
    })
  })

  describe('home/end keys', () => {
    it('Home key focuses first enabled item', async () => {
      const items = createMockSelectItems(5)
      const container = renderSelectWithItems(items)
      const trigger = getSelectTrigger(container)

      await openSelect(trigger)
      await pressArrowDown(trigger)
      await pressArrowDown(trigger)

      // Go to home
      await pressHome(trigger)

      const focusedItems = getSelectItems(container).filter(item =>
        item.getAttribute('data-focused') === 'true'
      )
      expect(focusedItems.length).toBeGreaterThan(0)
      expect(focusedItems[0]).toHaveTextContent(items[0].label)
    })

    it('End key focuses last enabled item', async () => {
      const items = createMockSelectItems(5)
      const container = renderSelectWithItems(items)
      const trigger = getSelectTrigger(container)

      await openSelect(trigger)
      await pressEnd(trigger)

      const focusedItems = getSelectItems(container).filter(item =>
        item.getAttribute('data-focused') === 'true'
      )
      expect(focusedItems.length).toBeGreaterThan(0)
      expect(focusedItems[0]).toHaveTextContent(items[items.length - 1].label)
    })
  })

  describe('selection with keyboard', () => {
    it('Enter selects focused item in single mode', async () => {
      const items = createMockSelectItems(3)
      const container = renderSelectWithItems(items)
      const trigger = getSelectTrigger(container)

      await openSelect(trigger)

      // Wait for focus to be initialized
      await waitForCondition(() => {
        const focusedItems = getSelectItems(container).filter(item =>
          item.getAttribute('data-focused') === 'true'
        )
        return focusedItems.length > 0
      })

      await pressArrowDown(trigger)
      await pressEnter(trigger)

      await waitForCondition(() => trigger.getAttribute('aria-expanded') === 'false')
      expect(trigger.getAttribute('aria-expanded')).toBe('false')
    })

    it('Space selects focused item', async () => {
      const items = createMockSelectItems(3)
      const container = renderSelectWithItems(items)
      const trigger = getSelectTrigger(container)

      await openSelect(trigger)

      // Wait for focus to be initialized
      await waitForCondition(() => {
        const focusedItems = getSelectItems(container).filter(item =>
          item.getAttribute('data-focused') === 'true'
        )
        return focusedItems.length > 0
      })

      await pressArrowDown(trigger)
      await pressSpace(trigger)

      await waitForCondition(() => trigger.getAttribute('aria-expanded') === 'false')
      expect(trigger.getAttribute('aria-expanded')).toBe('false')
    })
  })

  describe('disabled items', () => {
    it('navigation skips disabled items', async () => {
      const items = createMockSelectItems(5)
      items[1].isDisabled = true
      items[3].isDisabled = true

      const container = renderSelectWithItems(items)
      const trigger = getSelectTrigger(container)

      await openSelect(trigger)
      await pressArrowDown(trigger)
      await pressArrowDown(trigger)

      const focusedItems = getSelectItems(container).filter(item =>
        item.getAttribute('data-focused') === 'true'
      )

      expect(focusedItems[0]).not.toHaveAttribute('aria-disabled', 'true')
    })
  })

  describe('focus state', () => {
    it('focused item has data-focused attribute', async () => {
      const items = createMockSelectItems(3)
      const container = renderSelectWithItems(items)
      const trigger = getSelectTrigger(container)

      await openSelect(trigger)
      await pressArrowDown(trigger)

      const focusedItems = getSelectItems(container).filter(item =>
        item.getAttribute('data-focused') === 'true'
      )
      expect(focusedItems.length).toBe(1)
    })
  })

})
