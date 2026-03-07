import * as React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { renderListWithItems, getListItems, getListContainer } from './List.test-utils'
import type { ListRef } from '../'
import { act } from 'react'

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
})
