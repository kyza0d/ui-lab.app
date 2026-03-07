import * as React from 'react'
import type { RenderResult } from '@testing-library/react'
import { render as utilRender, getAllElementsByRole } from '@/tests/utils'
import { List } from '../'

export interface MockListItem {
  key: string
  label: string
  value: string
  interactive?: boolean
  selected?: boolean
}

/**
 * Create an array of mock list items
 */
export function createMockListItems(count: number = 3): MockListItem[] {
  return Array.from({ length: count }, (_, i) => ({
    key: `item-${i}`,
    label: `Item ${i + 1}`,
    value: `value-${i}`,
    interactive: true,
  }))
}

/**
 * Render a List component with custom children
 */
export function renderList(
  children: React.ReactNode,
  props: React.ComponentProps<typeof List> & { ref?: React.Ref<any> } = {}
): any {
  const result = utilRender(
    React.createElement(List, props, children)
  )
  return Object.assign(result.container, result)
}

/**
 * Render a List component with a set of mock items
 */
export function renderListWithItems(
  items = createMockListItems(3),
  props: Partial<React.ComponentProps<typeof List>> & { ref?: React.Ref<any> } = {}
): any {
  const children = items.map((item) =>
    React.createElement(
      List.Item,
      {
        key: item.key,
        value: item.value,
        interactive: item.interactive,
        selected: item.selected,
      },
      item.label
    )
  )
  return renderList(children, { items, ...props } as any)
}

/**
 * Get all list items from the container
 */
export function getListItems(container?: HTMLElement): HTMLElement[] {
  if (container) {
    return Array.from(container.querySelectorAll('[role="listitem"]'))
  }
  return getAllElementsByRole('listitem')
}

/**
 * Get a specific list item by its text content
 */
export function getListItemByText(text: string, container?: HTMLElement): HTMLElement | undefined {
  const items = getListItems(container)
  return items.find((item) => item.textContent?.includes(text))
}

/**
 * Get the list container
 */
export function getListContainer(container?: HTMLElement): HTMLElement | null {
  if (container) {
    return container.querySelector('[role="list"]')
  }
  return document.querySelector('[role="list"]')
}
