import { describe, it, expect } from 'vitest'
import { renderMenuWithChildren, openMenu, getMenuTrigger, waitForHighlighted } from './Menu.test-utils'
import {
  hoverElement,
  waitForOpen,
  waitForCondition,
  pressKey,
} from '@/tests/utils'
import { Menu } from '../'
import * as React from 'react'
import { act } from '@testing-library/react'

describe('Menu.submenu', () => {
  it('opens submenu on hover', async () => {
    const container = renderMenuWithChildren(
      <Menu>
        <Menu.Trigger>Trigger</Menu.Trigger>
        <Menu.Content>
          <Menu.Sub>
            <Menu.SubTrigger>Submenu</Menu.SubTrigger>
            <Menu.SubContent>
              <Menu.Item>Sub Item 1</Menu.Item>
            </Menu.SubContent>
          </Menu.Sub>
        </Menu.Content>
      </Menu>
    )
    await openMenu(getMenuTrigger(container))
    
    const subTrigger = document.querySelector('[role="menuitem"][aria-haspopup="menu"]') as HTMLElement
    await hoverElement(subTrigger)
    
    await waitForOpen(() => {
      const contents = document.querySelectorAll('[role="menu"]')
      // The second menu role should be the submenu
      return (contents.length > 1 ? contents[1] : null) as HTMLElement
    })
    
    expect(document.querySelectorAll('[role="menu"]').length).toBe(2)
    expect(document.querySelectorAll('[role="menu"]')[1]).toHaveTextContent('Sub Item 1')
  })

  it('opens submenu on ArrowRight', async () => {
    const container = renderMenuWithChildren(
      <Menu>
        <Menu.Trigger>Trigger</Menu.Trigger>
        <Menu.Content>
          <Menu.Sub>
            <Menu.SubTrigger>Submenu</Menu.SubTrigger>
            <Menu.SubContent>
              <Menu.Item>Sub Item 1</Menu.Item>
            </Menu.SubContent>
          </Menu.Sub>
        </Menu.Content>
      </Menu>
    )
    await openMenu(getMenuTrigger(container))
    await waitForHighlighted('Submenu')
    
    const menu = document.querySelector('[role="menu"]') as HTMLElement
    
    await pressKey(menu, '{ArrowRight}')
    
    await waitForCondition(() => document.querySelectorAll('[role="menu"]').length === 2)
    expect(document.querySelectorAll('[role="menu"]').length).toBe(2)
  })

  it('closes submenu on ArrowLeft', async () => {
    const container = renderMenuWithChildren(
      <Menu>
        <Menu.Trigger>Trigger</Menu.Trigger>
        <Menu.Content>
          <Menu.Sub>
            <Menu.SubTrigger>Submenu</Menu.SubTrigger>
            <Menu.SubContent>
              <Menu.Item>Sub Item 1</Menu.Item>
            </Menu.SubContent>
          </Menu.Sub>
        </Menu.Content>
      </Menu>
    )
    await openMenu(getMenuTrigger(container))
    await waitForHighlighted('Submenu')
    
    const menu = document.querySelector('[role="menu"]') as HTMLElement
    await pressKey(menu, '{ArrowRight}')
    
    await waitForCondition(() => document.querySelectorAll('[role="menu"]').length === 2)
    
    const subMenu = document.querySelectorAll('[role="menu"]')[1] as HTMLElement
    await pressKey(subMenu, '{ArrowLeft}')
    
    await waitForCondition(() => document.querySelectorAll('[role="menu"]').length === 1)
    expect(document.querySelectorAll('[role="menu"]').length).toBe(1)
  })
})
