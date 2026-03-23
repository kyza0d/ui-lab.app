import * as React from 'react'
import type { RenderResult } from '@testing-library/react'
import {
  render as utilRender,
  createMockSelectItems,
  clickElement,
  waitForOpen,
  getTrigger,
  getContent,
  typeText,
  getAllElementsByRole,
} from '@/tests/utils'
import { Select } from '../'

const defaultItems = createMockSelectItems(5)

// Helper to extract DOM container from RenderResult
function getDOMContainer(result: RenderResult | HTMLElement): HTMLElement {
  if ('container' in result) {
    return result.container
  }
  return result
}

/**
 * Render a Select component with items
 */
export function renderSelectWithItems(
  items = defaultItems,
  props: React.ComponentProps<typeof Select> = {}
): any {
  const element = React.createElement(
    Select,
    { mode: 'single', ...props },
    React.createElement(Select.Trigger, null, React.createElement(Select.Value)),
    React.createElement(
      Select.Content,
      null,
      items.map(item =>
        React.createElement(Select.Item, { key: item.key, value: item.key, isDisabled: item.isDisabled }, item.label)
      )
    )
  )
  const result = utilRender(element)
  return Object.assign(result.container, result)
}

/**
 * Render a multi-select with items
 */
export function renderMultiSelectWithItems(
  items = defaultItems,
  props: React.ComponentProps<typeof Select> = {}
): any {
  const element = React.createElement(
    Select,
    { mode: 'multiple', ...props },
    React.createElement(Select.Trigger),
    React.createElement(
      Select.Content,
      null,
      items.map(item =>
        React.createElement(Select.Item, { key: item.key, value: item.key, isDisabled: item.isDisabled }, item.label)
      )
    )
  )
  const result = utilRender(element)
  return Object.assign(result.container, result)
}

/**
 * Render a Select with custom children
 */
export function renderSelectWithChildren(
  children: React.ReactNode,
  props: React.ComponentProps<typeof Select> = {}
): any {
  const element = React.createElement(Select, props, children)
  const result = utilRender(element)
  return Object.assign(result.container, result)
}

/**
 * Select an item by its text
 */
export async function selectItem(containerOrText: HTMLElement | string, itemText?: string): Promise<HTMLElement> {
  const text = typeof containerOrText === 'string' ? containerOrText : itemText!
  // Use screen (via getAllElementsByRole with role as first arg) instead of container because of Portals
  // Include hidden items because they might be rendered but visibility: hidden when closed
  const items = getAllElementsByRole('option', { hidden: true })
  const item = items.find(el => el.textContent?.includes(text))
  if (!item) throw new Error(`Item "${text}" not found`)
  await clickElement(item)
  return item
}

/**
 * Toggle an item in multi-select mode
 */
export async function toggleItem(containerOrText: HTMLElement | string, itemText?: string): Promise<HTMLElement> {
  const text = typeof containerOrText === 'string' ? containerOrText : itemText!
  // Use screen instead of container because of Portals
  const items = getAllElementsByRole('option', { hidden: true })
  const item = items.find(el => el.textContent?.includes(text))
  if (!item) throw new Error(`Item "${text}" not found`)
  await clickElement(item)
  return item
}

/**
 * Open the select dropdown
 */
export async function openSelect(trigger: HTMLElement): Promise<void> {
  await clickElement(trigger)
  // Wait for content to be in DOM and visible
  await waitForOpen(() => {
    const content = document.querySelector('[role="listbox"]') || document.querySelector('[role="list"]')
    if (!content) throw new Error('Dropdown content not found in DOM')
    return content as HTMLElement
  })
}

/**
 * Close the select dropdown
 */
export async function closeSelect(trigger: HTMLElement): Promise<void> {
  await clickElement(trigger)
}

/**
 * Type in search field (for searchable variant)
 */
async function typeInSearch(text: string): Promise<void> {
  const input = document.querySelector('input[type="text"]')
  if (!input) throw new Error('Search input not found')
  await typeText(input as HTMLElement, text)
}

/**
 * Get all selected items
 */
export function getSelectedItems(): HTMLElement[] {
  // Use screen instead of container because of Portals
  const items = getAllElementsByRole('option', { hidden: true })
  return items.filter(item => item.getAttribute('aria-selected') === 'true')
}

/**
 * Get the trigger button
 */
export function getSelectTrigger(container: RenderResult | HTMLElement): HTMLElement {
  const domContainer = getDOMContainer(container)
  const trigger = getTrigger(domContainer)
  if (!trigger) throw new Error('Trigger not found')
  return trigger
}

/**
 * Get the dropdown content
 */
export function getSelectContent(container: RenderResult | HTMLElement): HTMLElement | null {
  // Portal content won't be in domContainer
  return document.querySelector('[role="listbox"]') || document.querySelector('[role="list"]') || getContent(getDOMContainer(container))
}

/**
 * Get all list items
 */
export function getSelectItems(): HTMLElement[] {
  // Use screen instead of container because of Portals
  return getAllElementsByRole('option', { hidden: true })
}
