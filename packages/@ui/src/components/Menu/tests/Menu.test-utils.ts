import * as React from 'react'
import type { RenderResult } from '@testing-library/react'
import { act } from '@testing-library/react'
import {
  render as utilRender,
  createMockMenuItems,
  clickElement,
  waitForOpen,
  getAllElementsByRole,
  waitForCondition,
} from '@/tests/utils'
import { Menu } from '../'

const defaultItems = createMockMenuItems(5)

// Helper to extract DOM container from RenderResult
function getDOMContainer(result: RenderResult | HTMLElement): HTMLElement {
  if ('container' in result) {
    return result.container
  }
  return result
}

/**
 * Render a Menu component with items
 */
export function renderMenuWithItems(
  items = defaultItems,
  props: React.ComponentProps<typeof Menu> = {}
): any {
  const element = React.createElement(
    Menu,
    props,
    React.createElement(Menu.Trigger, null, "Open Menu"),
    React.createElement(
      Menu.Content,
      null,
      items.map(item =>
        React.createElement(Menu.Item, { 
          key: item.key, 
          textValue: item.label, 
          disabled: item.isDisabled,
          onSelect: (item as any).onSelect 
        }, item.label)
      )
    )
  )
  const result = utilRender(element)
  return Object.assign(result.container, result)
}

/**
 * Render a Menu with custom children
 */
export function renderMenuWithChildren(
  children: React.ReactNode,
  props: React.ComponentProps<typeof Menu> = {}
): any {
  const element = React.createElement(Menu, props, children)
  const result = utilRender(element)
  return Object.assign(result.container, result)
}

/**
 * Open the menu
 * For context-menu (default), it uses right-click.
 * For pop-over, it uses left-click.
 */
export async function openMenu(trigger: HTMLElement, type: 'context-menu' | 'pop-over' = 'context-menu'): Promise<void> {
  if (type === 'context-menu') {
    await act(async () => {
      const event = new MouseEvent('contextmenu', {
        bubbles: true,
        cancelable: true,
        clientX: 10,
        clientY: 10,
      })
      trigger.dispatchEvent(event)
    })
  } else {
    await clickElement(trigger)
  }
  
  await waitForOpen(() => {
    const content = document.querySelector('[role="menu"]')
    if (!content) throw new Error('Menu content not found in DOM')
    return content as HTMLElement
  })
}

/**
 * Select an item by its text
 */
export async function selectMenuItem(itemText: string): Promise<HTMLElement> {
  const items = getAllElementsByRole('menuitem', { hidden: true })
  const checkboxItems = getAllElementsByRole('menuitemcheckbox', { hidden: true })
  const radioItems = getAllElementsByRole('menuitemradio', { hidden: true })
  
  const allItems = [...items, ...checkboxItems, ...radioItems]
  const item = allItems.find(el => el.textContent?.includes(itemText))
  
  if (!item) throw new Error(`Menu item "${itemText}" not found`)
  await clickElement(item)
  return item
}

/**
 * Wait for an item to be highlighted
 */
export async function waitForHighlighted(text?: string): Promise<HTMLElement> {
  let highlighted: HTMLElement | null = null
  await waitForCondition(() => {
    highlighted = document.querySelector('[data-highlighted="true"]') as HTMLElement
    if (!highlighted) return false
    if (text && !highlighted.textContent?.includes(text)) return false
    return true
  })
  return highlighted!
}

/**
 * Get the trigger element
 */
export function getMenuTrigger(container: RenderResult | HTMLElement): HTMLElement {
  const domContainer = getDOMContainer(container)
  const trigger = domContainer.querySelector('[data-type]') as HTMLElement
  if (!trigger) throw new Error('Menu trigger not found')
  return trigger
}

/**
 * Get the menu content
 */
function getMenuContent(): HTMLElement | null {
  return document.querySelector('[role="menu"]')
}

/**
 * Get all menu items
 */
function getMenuItems(): HTMLElement[] {
  const items = getAllElementsByRole('menuitem', { hidden: true })
  const checkboxItems = getAllElementsByRole('menuitemcheckbox', { hidden: true })
  const radioItems = getAllElementsByRole('menuitemradio', { hidden: true })
  return [...items, ...checkboxItems, ...radioItems]
}
