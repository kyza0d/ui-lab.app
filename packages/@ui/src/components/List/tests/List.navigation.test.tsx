import * as React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { renderListWithItems, getListItems, getListContainer } from './List.test-utils'
import type { ListRef } from '../'
import { act } from 'react'
import userEvent from '@testing-library/user-event'
import { renderList } from './List.test-utils'
import { List } from '../'
import { Select } from '../../Select'
import * as ListNavigation from '@/utils/list-navigation'
import { render as utilRender } from '@/tests/utils'
import { screen } from '@testing-library/react'
import { waitForCondition } from '@/tests/utils'

describe('List.navigation', () => {
  it('navigates through items using ref methods', async () => {
    const listRef = React.createRef<ListRef>()
    const items = [
      { key: '1', label: 'Item 1', value: '1' },
      { key: '2', label: 'Item 2', value: '2' },
      { key: '3', label: 'Item 3', value: '3' },
    ]
    const container = renderListWithItems(items, { ref: listRef })
    const listItems = getListItems(container)
    const listRoot = getListContainer(container)

    // Initial state: nothing highlighted
    expect(listRef.current?.getHighlightedIndex()).toBeNull()
    expect(listRoot).not.toHaveAttribute('data-keyboard-mode')

    // focusNext
    await act(async () => {
      listRef.current?.focusNext()
    })
    expect(listRef.current?.getHighlightedIndex()).toBe(0)
    expect(listItems[0]).toHaveAttribute('data-highlighted', 'true')
    expect(listRoot).toHaveAttribute('data-keyboard-mode', 'true')

    await act(async () => {
      listRef.current?.focusNext()
    })
    expect(listRef.current?.getHighlightedIndex()).toBe(1)
    expect(listItems[1]).toHaveAttribute('data-highlighted', 'true')

    // focusPrev
    await act(async () => {
      listRef.current?.focusPrev()
    })
    expect(listRef.current?.getHighlightedIndex()).toBe(0)

    // focusLast
    await act(async () => {
      listRef.current?.focusLast()
    })
    expect(listRef.current?.getHighlightedIndex()).toBe(2)

    // focusFirst
    await act(async () => {
      listRef.current?.focusFirst()
    })
    expect(listRef.current?.getHighlightedIndex()).toBe(0)

    // clearHighlight
    await act(async () => {
      listRef.current?.clearHighlight()
    })
    expect(listRef.current?.getHighlightedIndex()).toBeNull()
  })

  it('calls onNavigate callbacks', async () => {
    const listRef = React.createRef<ListRef>()
    const onNavigate = {
      up: vi.fn(),
      down: vi.fn(),
      enter: vi.fn(),
    }
    const items = [{ key: '1', label: 'Item 1', value: '1' }]
    renderListWithItems(items, { ref: listRef, onNavigate })

    await act(async () => {
      listRef.current?.focusNext()
    })
    expect(onNavigate.down).toHaveBeenCalled()

    await act(async () => {
      listRef.current?.focusPrev()
    })
    expect(onNavigate.up).toHaveBeenCalled()

    await act(async () => {
      listRef.current?.selectHighlighted()
    })
    expect(onNavigate.enter).toHaveBeenCalled()
  })

  it('caps navigation at item bounds', async () => {
    const listRef = React.createRef<ListRef>()
    const items = [
      { key: '1', label: 'Item 1', value: '1' },
      { key: '2', label: 'Item 2', value: '2' },
    ]
    renderListWithItems(items, { ref: listRef })

    await act(async () => {
      listRef.current?.focusNext()
    })
    await act(async () => {
      listRef.current?.focusNext()
    })
    await act(async () => {
      listRef.current?.focusNext() // Should stay at index 1
    })
    expect(listRef.current?.getHighlightedIndex()).toBe(1)

    await act(async () => {
      listRef.current?.focusFirst()
    })
    await act(async () => {
      listRef.current?.focusPrev() // Should stay at index 0
    })
    expect(listRef.current?.getHighlightedIndex()).toBe(0)
  })

  it('clicking a row establishes row focus mode on that row', async () => {
    const container = renderListWithItems([
      { key: '1', label: 'Item 1', value: '1' },
      { key: '2', label: 'Item 2', value: '2' },
    ])
    const user = userEvent.setup()
    const listItems = getListItems(container)
    const listRoot = getListContainer(container)

    await user.click(listItems[1]!)

    expect(document.activeElement).toBe(listItems[1])
    expect(listItems[1]).toHaveAttribute('data-highlighted', 'true')
    expect(listRoot).toHaveAttribute('data-focus-mode', 'row')
  })

  it('Arrow keys move DOM focus between sibling rows after focus mode begins', async () => {
    const container = renderListWithItems([
      { key: '1', label: 'Item 1', value: '1' },
      { key: '2', label: 'Item 2', value: '2' },
      { key: '3', label: 'Item 3', value: '3' },
    ])
    const user = userEvent.setup()
    const listItems = getListItems(container)

    await user.click(listItems[0]!)
    await user.keyboard('{ArrowDown}')
    expect(document.activeElement).toBe(listItems[1])

    await user.keyboard('{ArrowDown}')
    expect(document.activeElement).toBe(listItems[2])

    await user.keyboard('{ArrowUp}')
    expect(document.activeElement).toBe(listItems[1])
  })

  it('Tab moves row focus through siblings instead of dropping into embedded controls', async () => {
    const user = userEvent.setup()
    const { container } = utilRender(
      <>
        <button type="button">Before</button>
        <List>
          <List.Item value="1">
            <span>Row 1</span>
            <List.Input aria-label="Input 1" />
          </List.Item>
          <List.Item value="2">
            <span>Row 2</span>
            <List.Input aria-label="Input 2" />
          </List.Item>
        </List>
        <button type="button">After</button>
      </>
    )
    const listItems = getListItems(container)

    await user.click(listItems[0]!)
    await user.keyboard('{Tab}')
    expect(document.activeElement).toBe(listItems[1])

    await user.click(listItems[1]!)
    await user.keyboard('{Shift>}{Tab}{/Shift}')
    expect(document.activeElement).toBe(listItems[0])
  })

  it('pointer hover does not scroll the list or enter row focus mode', async () => {
    const scrollSpy = vi.spyOn(ListNavigation, 'scrollItemIntoView')
    const user = userEvent.setup()
    const container = renderList(
      <div style={{ maxHeight: '80px', overflow: 'auto' }}>
        {Array.from({ length: 12 }, (_, index) => (
          <List.Item key={index} value={`row-${index}`}>
            Row {index + 1}
          </List.Item>
        ))}
      </div>
    )
    const listItems = getListItems(container)
    const listRoot = getListContainer(container)

    try {
      await user.hover(listItems[listItems.length - 1]!)

      expect(scrollSpy).not.toHaveBeenCalled()
      expect(listRoot).not.toHaveAttribute('data-focus-mode')
      expect(listItems[listItems.length - 1]).toHaveAttribute('data-highlighted', 'false')
    } finally {
      scrollSpy.mockRestore()
    }
  })

  it('row arrow and tab navigation continue after selecting an inline select option', async () => {
    const user = userEvent.setup()
    const container = renderList(
      <>
        <List.Item value="1">
          <span>Timezone</span>
          <List.Select>
            <Select.Trigger>
              <Select.Value placeholder="Pick one" />
            </Select.Trigger>
            <Select.Content>
              <Select.List>
                <Select.Item value="utc">UTC</Select.Item>
                <Select.Item value="est">EST</Select.Item>
              </Select.List>
            </Select.Content>
          </List.Select>
        </List.Item>
        <List.Item value="2">
          Row 2
        </List.Item>
        <List.Item value="3">
          Row 3
        </List.Item>
      </>
    )
    const [firstRow, secondRow, thirdRow] = getListItems(container)
    const trigger = screen.getByRole('button')

    await user.click(trigger)
    await user.click(screen.getByRole('option', { name: 'EST' }))

    await waitForCondition(() => trigger.getAttribute('aria-expanded') === 'false')
    expect(document.activeElement).toBe(firstRow)
    expect(firstRow).toHaveAttribute('data-highlighted', 'true')

    await user.keyboard('{ArrowDown}')
    expect(document.activeElement).toBe(secondRow)

    await user.keyboard('{Tab}')
    expect(document.activeElement).toBe(thirdRow)
  })
})
