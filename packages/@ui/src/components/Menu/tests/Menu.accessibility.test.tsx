import { describe, it, expect } from 'vitest'
import { renderMenuWithItems, renderMenuWithChildren, openMenu, getMenuTrigger } from './Menu.test-utils'
import { createMockMenuItems, getAllElementsByRole } from '@/tests/utils'
import { Menu } from '../'
import * as React from 'react'

describe('Menu.accessibility', () => {
  describe('ARIA roles', () => {
    it('content has role="menu"', async () => {
      const items = createMockMenuItems(3)
      const container = renderMenuWithItems(items)
      const trigger = getMenuTrigger(container)
      
      await openMenu(trigger)
      
      const menu = document.querySelector('[role="menu"]')
      expect(menu).toBeInTheDocument()
    })

    it('items have proper roles', async () => {
      const container = renderMenuWithChildren(
        <>
          <Menu.Trigger>Trigger</Menu.Trigger>
          <Menu.Content>
            <Menu.Item>Item</Menu.Item>
            <Menu.CheckboxItem checked={false}>Checkbox</Menu.CheckboxItem>
            <Menu.RadioGroup value="1">
              <Menu.RadioItem value="1">Radio</Menu.RadioItem>
            </Menu.RadioGroup>
          </Menu.Content>
        </>
      )
      const trigger = getMenuTrigger(container)
      
      await openMenu(trigger)
      
      // We use document search because of Portal
      expect(getAllElementsByRole('menuitem', { hidden: true }).length).toBeGreaterThan(0)
      expect(getAllElementsByRole('menuitemcheckbox', { hidden: true }).length).toBeGreaterThan(0)
      expect(getAllElementsByRole('menuitemradio', { hidden: true }).length).toBeGreaterThan(0)
    })
  })

  describe('ARIA attributes', () => {
    it('checkbox items have aria-checked', async () => {
      const container = renderMenuWithChildren(
        <Menu>
          <Menu.Trigger>Trigger</Menu.Trigger>
          <Menu.Content>
            <Menu.CheckboxItem checked={true}>Checkbox</Menu.CheckboxItem>
          </Menu.Content>
        </Menu>
      )
      await openMenu(getMenuTrigger(container))
      
      const checkbox = document.querySelector('[role="menuitemcheckbox"]')
      expect(checkbox).toHaveAttribute('aria-checked', 'true')
    })

    it('radio items have aria-checked', async () => {
      const container = renderMenuWithChildren(
        <Menu>
          <Menu.Trigger>Trigger</Menu.Trigger>
          <Menu.Content>
            <Menu.RadioGroup value="1">
              <Menu.RadioItem value="1">Option 1</Menu.RadioItem>
            </Menu.RadioGroup>
          </Menu.Content>
        </Menu>
      )
      await openMenu(getMenuTrigger(container))
      
      const radio = document.querySelector('[role="menuitemradio"]')
      expect(radio).toHaveAttribute('aria-checked', 'true')
    })
  })

  describe('Disabled state', () => {
    it('disabled items have aria-disabled="true"', async () => {
      const container = renderMenuWithChildren(
        <Menu>
          <Menu.Trigger>Trigger</Menu.Trigger>
          <Menu.Content>
            <Menu.Item disabled>Disabled Item</Menu.Item>
          </Menu.Content>
        </Menu>
      )
      await openMenu(getMenuTrigger(container))
      
      const item = document.querySelector('[role="menuitem"]')
      expect(item).toHaveAttribute('aria-disabled', 'true')
    })

    it('disabled items have data-disabled attribute', async () => {
      const container = renderMenuWithChildren(
        <Menu>
          <Menu.Trigger>Trigger</Menu.Trigger>
          <Menu.Content>
            <Menu.Item disabled>Disabled Item</Menu.Item>
          </Menu.Content>
        </Menu>
      )
      await openMenu(getMenuTrigger(container))
      
      const item = document.querySelector('[role="menuitem"]')
      expect(item).toHaveAttribute('data-disabled', 'true')
    })
  })

  describe('Decorative elements', () => {
    it('separators have role="separator"', async () => {
      const container = renderMenuWithChildren(
        <Menu>
          <Menu.Trigger>Trigger</Menu.Trigger>
          <Menu.Content>
            <Menu.Item>Item 1</Menu.Item>
            <Menu.Separator />
            <Menu.Item>Item 2</Menu.Item>
          </Menu.Content>
        </Menu>
      )
      await openMenu(getMenuTrigger(container))
      
      const separator = document.querySelector('[role="separator"]')
      expect(separator).toBeInTheDocument()
    })

    it('groups have role="group"', async () => {
      const container = renderMenuWithChildren(
        <Menu>
          <Menu.Trigger>Trigger</Menu.Trigger>
          <Menu.Content>
            <Menu.Group>
              <Menu.Label>Group Label</Menu.Label>
              <Menu.Item>Group Item</Menu.Item>
            </Menu.Group>
          </Menu.Content>
        </Menu>
      )
      await openMenu(getMenuTrigger(container))
      
      const group = document.querySelector('[role="group"]')
      expect(group).toBeInTheDocument()
    })
  })
})
