import { describe, it, expect, vi } from 'vitest'
import { renderMenuWithItems, renderMenuWithChildren, openMenu, selectMenuItem, getMenuTrigger } from './Menu.test-utils'
import { createMockMenuItems } from '@/tests/utils'
import { Menu } from '../'
import * as React from 'react'

describe('Menu.core', () => {
  describe('Trigger types', () => {
    it('opens context-menu on right click', async () => {
      const items = createMockMenuItems(3)
      const container = renderMenuWithItems(items, { type: 'context-menu' })
      const trigger = getMenuTrigger(container)
      
      await openMenu(trigger, 'context-menu')
      
      const content = document.querySelector('[role="menu"]')
      expect(content).toBeInTheDocument()
      expect(trigger).toHaveAttribute('data-type', 'context-menu')
    })

    it('opens pop-over on left click', async () => {
      const items = createMockMenuItems(3)
      const container = renderMenuWithItems(items, { type: 'pop-over' })
      const trigger = getMenuTrigger(container)
      
      await openMenu(trigger, 'pop-over')
      
      const content = document.querySelector('[role="menu"]')
      expect(content).toBeInTheDocument()
      expect(trigger).toHaveAttribute('data-type', 'pop-over')
    })
  })

  describe('Item selection', () => {
    it('calls onSelect when an item is clicked', async () => {
      const onSelect = vi.fn()
      const container = renderMenuWithChildren(
        <>
          <Menu.Trigger>Trigger</Menu.Trigger>
          <Menu.Content>
            <Menu.Item onSelect={onSelect}>Item 1</Menu.Item>
          </Menu.Content>
        </>
      )
      const trigger = getMenuTrigger(container)
      
      await openMenu(trigger)
      await selectMenuItem('Item 1')
      
      expect(onSelect).toHaveBeenCalled()
    })

    it('closes the menu after selection by default', async () => {
      const items = createMockMenuItems(1)
      const container = renderMenuWithItems(items)
      const trigger = getMenuTrigger(container)
      
      await openMenu(trigger)
      await selectMenuItem(items[0].label)
      
      const content = document.querySelector('[role="menu"]')
      expect(content).not.toBeInTheDocument()
    })
  })

  describe('Checkbox Items', () => {
    it('toggles checkbox state when clicked', async () => {
      const onCheckedChange = vi.fn()
      const TestComponent = () => {
        const [checked, setChecked] = React.useState(false)
        return (
          <Menu>
            <Menu.Trigger>Trigger</Menu.Trigger>
            <Menu.Content>
              <Menu.CheckboxItem 
                checked={checked} 
                onCheckedChange={(val) => {
                  setChecked(val)
                  onCheckedChange(val)
                }}
              >
                Checkbox 1
              </Menu.CheckboxItem>
            </Menu.Content>
          </Menu>
        )
      }
      
      const { container } = renderMenuWithChildren(<TestComponent />)
      const trigger = getMenuTrigger(container)
      
      await openMenu(trigger)
      await selectMenuItem('Checkbox 1')
      
      expect(onCheckedChange).toHaveBeenCalledWith(true)
    })
  })

  describe('Radio Items', () => {
    it('manages radio group selection', async () => {
      const onValueChange = vi.fn()
      const TestComponent = () => {
        return (
          <Menu>
            <Menu.Trigger>Trigger</Menu.Trigger>
            <Menu.Content>
              <Menu.RadioGroup value="2" onValueChange={onValueChange}>
                <Menu.RadioItem value="1">Option 1</Menu.RadioItem>
                <Menu.RadioItem value="2">Option 2</Menu.RadioItem>
              </Menu.RadioGroup>
            </Menu.Content>
          </Menu>
        )
      }
      
      const { container } = renderMenuWithChildren(<TestComponent />)
      const trigger = getMenuTrigger(container)
      
      await openMenu(trigger)
      await selectMenuItem('Option 1')
      
      expect(onValueChange).toHaveBeenCalledWith('1')
    })
  })
})
