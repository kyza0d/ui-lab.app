import { describe, it, expect, vi } from 'vitest'
import { renderMenuWithItems, openMenu, getMenuTrigger, waitForHighlighted } from './Menu.test-utils'
import {
  createMockMenuItems,
  pressArrowDown,
  pressArrowUp,
  pressHome,
  pressEnd,
  pressEnter,
  pressEscape,
} from '@/tests/utils'
import { act } from '@testing-library/react'

describe('Menu.navigation', () => {
  describe('Arrow keys', () => {
    it('Arrow Down navigates to next item', async () => {
      const items = createMockMenuItems(3)
      const container = renderMenuWithItems(items)
      const trigger = getMenuTrigger(container)
      
      await openMenu(trigger)
      
      const menu = document.querySelector('[role="menu"]') as HTMLElement
      
      // Initially first item should be highlighted
      const highlighted = await waitForHighlighted()
      expect(highlighted).toHaveTextContent(items[0].label)
      
      await pressArrowDown(menu)
      
      const nextHighlighted = await waitForHighlighted(items[1].label)
      expect(nextHighlighted).toHaveTextContent(items[1].label)
    })

    it('Arrow Up navigates to previous item', async () => {
      const items = createMockMenuItems(3)
      const container = renderMenuWithItems(items)
      const trigger = getMenuTrigger(container)
      
      await openMenu(trigger)
      
      const menu = document.querySelector('[role="menu"]') as HTMLElement
      await waitForHighlighted(items[0].label)
      
      await pressArrowDown(menu)
      await waitForHighlighted(items[1].label)
      
      await pressArrowUp(menu)
      
      const highlighted = await waitForHighlighted(items[0].label)
      expect(highlighted).toHaveTextContent(items[0].label)
    })

    it('wraps around from last to first', async () => {
      const items = createMockMenuItems(2)
      const container = renderMenuWithItems(items)
      const trigger = getMenuTrigger(container)
      
      await openMenu(trigger)
      
      const menu = document.querySelector('[role="menu"]') as HTMLElement
      await waitForHighlighted(items[0].label)
      
      await act(async () => {
        await pressArrowDown(menu) // To 2nd
      })
      await waitForHighlighted(items[1].label)
      
      await act(async () => {
        await pressArrowDown(menu) // Should wrap to 1st
      })
      
      const highlighted = await waitForHighlighted(items[0].label)
      expect(highlighted).toHaveTextContent(items[0].label)
    })
  })

  describe('Home/End keys', () => {
    it('Home navigates to first item', async () => {
      const items = createMockMenuItems(5)
      const container = renderMenuWithItems(items)
      const trigger = getMenuTrigger(container)
      
      await openMenu(trigger)
      
      const menu = document.querySelector('[role="menu"]') as HTMLElement
      await waitForHighlighted(items[0].label)
      
      await pressArrowDown(menu)
      await waitForHighlighted(items[1].label)
      
      await pressHome(menu)
      
      const highlighted = await waitForHighlighted(items[0].label)
      expect(highlighted).toHaveTextContent(items[0].label)
    })

    it('End navigates to last item', async () => {
      const items = createMockMenuItems(5)
      const container = renderMenuWithItems(items)
      const trigger = getMenuTrigger(container)
      
      await openMenu(trigger)
      
      const menu = document.querySelector('[role="menu"]') as HTMLElement
      await waitForHighlighted(items[0].label)
      
      await pressEnd(menu)
      
      const highlighted = await waitForHighlighted(items[4].label)
      expect(highlighted).toHaveTextContent(items[4].label)
    })
  })

  describe('Selection with keyboard', () => {
    it('Enter selects the highlighted item', async () => {
      const onSelect = vi.fn()
      const items = [{ key: '1', label: 'Item 1', onSelect }]
      const container = renderMenuWithItems(items as any)
      const trigger = getMenuTrigger(container)
      
      await openMenu(trigger)
      await waitForHighlighted('Item 1')
      
      const menu = document.querySelector('[role="menu"]') as HTMLElement
      await pressEnter(menu)
      
      expect(onSelect).toHaveBeenCalled()
    })
  })

  describe('Escape key', () => {
    it('closes the menu on ESC', async () => {
      const items = createMockMenuItems(1)
      const container = renderMenuWithItems(items)
      const trigger = getMenuTrigger(container)
      
      await openMenu(trigger)
      
      const menu = document.querySelector('[role="menu"]') as HTMLElement
      await pressEscape(menu)
      
      expect(document.querySelector('[role="menu"]')).not.toBeInTheDocument()
    })
  })
})
