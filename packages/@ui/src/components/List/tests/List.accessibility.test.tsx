import { describe, it, expect } from 'vitest'
import { renderListWithItems, getListItems, getListContainer } from './List.test-utils'

describe('List.accessibility', () => {
  it('has role="list" on container', () => {
    const container = renderListWithItems([])
    const listRoot = getListContainer(container)
    expect(listRoot).toHaveAttribute('role', 'list')
  })

  it('has role="listitem" on items', () => {
    const container = renderListWithItems([{ key: '1', label: 'Item 1', value: '1' }])
    const listItems = getListItems(container)
    expect(listItems[0]).toHaveAttribute('role', 'listitem')
  })

  it('reflects selected state via data-selected', () => {
    const container = renderListWithItems([
      { key: '1', label: 'Item 1', value: '1', selected: true },
      { key: '2', label: 'Item 2', value: '2', selected: false },
    ])
    const listItems = getListItems(container)
    expect(listItems[0]).toHaveAttribute('data-selected', 'true')
    expect(listItems[1]).not.toHaveAttribute('data-selected')
  })

  it('reflects interactive state via data-interactive', () => {
    const container = renderListWithItems([
      { key: '1', label: 'Item 1', value: '1', interactive: true },
      { key: '2', label: 'Item 2', value: '2', interactive: false },
    ])
    const listItems = getListItems(container)
    expect(listItems[0]).toHaveAttribute('data-interactive', 'true')
    expect(listItems[1]).not.toHaveAttribute('data-interactive')
  })

  it('reflects highlighted state via data-highlighted', () => {
    // This is tested in navigation but good to have here too
    const container = renderListWithItems([{ key: '1', label: 'Item 1', value: '1' }])
    const listItems = getListItems(container)
    // Initially false or not set (Wait, implementation says 'false' if not highlighted)
    expect(listItems[0]).toHaveAttribute('data-highlighted', 'false')
  })
})
