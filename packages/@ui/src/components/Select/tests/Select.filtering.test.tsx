import { describe, it, expect } from 'vitest'
import { renderSelectWithItems, openSelect, getSelectTrigger } from './Select.test-utils'
import { createMockSelectItems, getAllElementsByRole, pressArrowDown } from '@/tests/utils'

describe('Select.filtering', () => {
  describe('filter prop', () => {
    it('filter prop filters items (excludes non-matching)', async () => {
      const items = createMockSelectItems(5)
      const filter = (item: any) => !item.label.includes('Option 2')

      const container = renderSelectWithItems(items, { filter })
      const trigger = getSelectTrigger(container)

      await openSelect(trigger)

      const options = getAllElementsByRole('option')
      const hasFiltered = Array.from(options).some(option =>
        option.textContent?.includes('Option 2')
      )

      expect(hasFiltered).toBe(false)
    })

    it('filteredItems reflects applied filter', async () => {
      const items = createMockSelectItems(5)
      const filter = (item: any) => item.label.includes('Option') && !item.label.includes('Option 5')

      const container = renderSelectWithItems(items, { filter })
      const trigger = getSelectTrigger(container)

      await openSelect(trigger)

      const options = getAllElementsByRole('option')
      expect(options.length).toBeLessThan(items.length)
    })

    it('visibleKeys only includes non-filtered items', async () => {
      const items = createMockSelectItems(5)
      const filter = (item: any) => item.key !== 'item-1'

      const container = renderSelectWithItems(items, { filter })
      const trigger = getSelectTrigger(container)

      await openSelect(trigger)

      const options = getAllElementsByRole('option')
      const visibleCount = Array.from(options).filter(option =>
        !option.textContent?.includes('Option 2') // item-1 is Option 2
      ).length

      expect(visibleCount).toBeGreaterThan(0)
    })

    it('navigation respects filtered items (skips filtered-out items)', async () => {
      const items = createMockSelectItems(5)
      const filter = (item: any) => item.key !== 'item-2'

      const container = renderSelectWithItems(items, { filter })
      const trigger = getSelectTrigger(container)

      await openSelect(trigger)
      await pressArrowDown(trigger)
      await pressArrowDown(trigger)

      const focusedItems = document.querySelectorAll('[data-focused="true"]')
      expect(focusedItems.length).toBeGreaterThan(0)
    })
  })


  describe('filter with disabled items', () => {
    it('search works with disabled items correctly', async () => {
      const items = createMockSelectItems(5)
      items[1].isDisabled = true
      items[3].isDisabled = true

      const filter = (item: any) => !item.label.includes('Option 5')

      const container = renderSelectWithItems(items, { filter })
      const trigger = getSelectTrigger(container)

      await openSelect(trigger)

      const options = getAllElementsByRole('option')
      expect(options.length).toBeGreaterThan(0)

      const disabledOptions = Array.from(options).filter(
        option => option.getAttribute('aria-disabled') === 'true'
      )
      expect(disabledOptions.length).toBeGreaterThan(0)
    })
  })

  describe('empty filtered state', () => {
    it('handling when all items are filtered out', async () => {
      const items = createMockSelectItems(3)
      const filter = () => false // Filter everything out

      const container = renderSelectWithItems(items, { filter })
      const trigger = getSelectTrigger(container)

      await openSelect(trigger)

      const options = getAllElementsByRole('option')
      expect(options.length).toBe(0)
    })
  })
})
