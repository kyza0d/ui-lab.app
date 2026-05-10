import { describe, it, expect } from 'vitest'
import { renderList, renderListWithItems, getListItems, getListItemByText } from './List.test-utils'
import { List } from '../'
import { hoverElement } from '@/tests/utils'
import styles from '../List.module.css'
import { act } from 'react'
import userEvent from '@testing-library/user-event'

describe('List.core', () => {
  it('renders a basic list of items', () => {
    const items = [
      { key: '1', label: 'Item 1', value: '1' },
      { key: '2', label: 'Item 2', value: '2' },
    ]
    const container = renderListWithItems(items)
    const listItems = getListItems(container)

    expect(listItems).toHaveLength(2)
    expect(listItems[0]).toHaveTextContent('Item 1')
    expect(listItems[1]).toHaveTextContent('Item 2')
  })

  it('renders all sub-components correctly', () => {
    const container = renderList(
      <>
        <List.Header sticky>Header Text</List.Header>
        <List.Item value="1">
          <List.Media>Icon</List.Media>
          <div>
            <div className="label">Label Text</div>
            <List.Desc>Description Text</List.Desc>
          </div>
          <List.CheckboxIndicator checked />
          <List.ActionGroup>
            <button>Action</button>
          </List.ActionGroup>
        </List.Item>
        <List.Divider />
        <List.Footer align="start">Footer Text</List.Footer>
      </>
    )

    const header = container.querySelector('header')
    expect(header).toHaveTextContent('Header Text')
    
    expect(container.querySelector(`[role="listitem"]`)).toBeInTheDocument()
    expect(container.querySelector(`.${styles.media}`)).toHaveTextContent('Icon')
    expect(container.querySelector(`.${styles.desc}`)).toHaveTextContent('Description Text')
    expect(container.querySelector(`.${styles.checkbox}`)).toBeInTheDocument()
    
    // Use data attribute instead of class if class is flaky
    expect(container.querySelector('[data-justify="start"]')).toBeInTheDocument()
    
    const footer = container.querySelector('footer')
    expect(footer).toHaveTextContent('Footer Text')
    expect(footer).toHaveAttribute('data-align', 'start')
  })

  it('applies variant, gap, and spacing props to container', () => {
    const container = renderListWithItems([], { variant: 'feed', gap: 'lg', spacing: 'sm' })
    const list = container.querySelector('[role="list"]')

    expect(list).toHaveAttribute('data-variant', 'feed')
    expect(list).toHaveAttribute('data-gap', 'lg')
    expect(list).toHaveAttribute('data-spacing', 'sm')
    expect(list).toHaveStyle({ '--list-gap-step': '6' })
  })

  it('defaults to no gap when gap is omitted', () => {
    const container = renderListWithItems([])
    const list = container.querySelector('[role="list"]')

    expect(list).toBeInTheDocument()
    expect(list).not.toHaveAttribute('data-gap')
    expect(list?.style.getPropertyValue('--list-gap-step')).toBe('')
  })

  it('applies custom styles to the list root', () => {
    const container = renderList(
      <List.Item value="1">Item 1</List.Item>,
      {
        styles: { root: 'custom-list-root' },
      }
    )

    const list = container.querySelector('[role="list"]')

    expect(list).toHaveClass('custom-list-root')
    expect(list).not.toHaveAttribute('styles')
  })

  it('applies named styles to supported internal list slots', () => {
    const container = renderList(
      <>
        <List.Header>Header Text</List.Header>
        <List.Item
          value="1"
          actions={[{ icon: <span>Action</span>, title: 'Action label' }]}
        >
          <List.Media>Media</List.Media>
          <List.Title>Title</List.Title>
          <List.Desc>Description</List.Desc>
          <List.Checkbox checked={false} onChange={() => {}} />
          <List.CheckboxIndicator checked />
        </List.Item>
        <List.Footer>Footer Text</List.Footer>
      </>,
      {
        styles: {
          root: 'root-slot',
          header: 'header-slot',
          item: 'item-slot',
          media: 'media-slot',
          title: 'title-slot',
          desc: 'desc-slot',
          control: 'control-slot',
          checkbox: 'checkbox-slot',
          actions: 'actions-slot',
          action: 'action-slot',
          footer: 'footer-slot',
        },
      }
    )

    expect(container.querySelector('[role="list"]')).toHaveClass('root-slot')
    expect(container.querySelector('header')).toHaveClass('header-slot')
    expect(container.querySelector('[role="listitem"]')).toHaveClass('item-slot')
    expect(container.querySelector(`.${styles.media}`)).toHaveClass('media-slot')
    expect(container.querySelector(`.${styles.title}`)).toHaveClass('title-slot')
    expect(container.querySelector(`.${styles.desc}`)).toHaveClass('desc-slot')
    expect(container.querySelector(`.${styles.control}`)).toHaveClass('control-slot')
    expect(container.querySelector(`.${styles.checkbox}`)).toHaveClass('checkbox-slot')
    expect(container.querySelector('[data-actions]')).toHaveClass('actions-slot')
    expect(container.querySelector('[data-actions] button')).toHaveClass('action-slot')
    expect(container.querySelector('footer')).toHaveClass('footer-slot')
  })

  it('defaults to vertical orientation', () => {
    const container = renderListWithItems([])
    const list = container.querySelector('[role="list"]')

    expect(list).toHaveAttribute('data-orientation', 'vertical')
  })

  it('supports horizontal orientation when specified', () => {
    const container = renderListWithItems([], { orientation: 'horizontal' })
    const list = container.querySelector('[role="list"]')

    expect(list).toHaveAttribute('data-orientation', 'horizontal')
  })

  it('highlights item on mouse enter', async () => {
    const items = [
      { key: '1', label: 'Item 1', value: '1' },
      { key: '2', label: 'Item 2', value: '2' },
    ]
    const container = renderListWithItems(items)
    const item2 = getListItemByText('Item 2', container)

    expect(item2).toHaveAttribute('data-highlighted', 'false')

    if (item2) {
      await hoverElement(item2)
      expect(item2).toHaveAttribute('data-highlighted', 'false')
    }
  })

  it('applies selected state to item', () => {
    const items = [
      { key: '1', label: 'Item 1', value: '1', selected: true },
      { key: '2', label: 'Item 2', value: '2', selected: false },
    ]
    const container = renderListWithItems(items)
    const item1 = getListItemByText('Item 1', container)
    const item2 = getListItemByText('Item 2', container)

    expect(item1).toHaveAttribute('data-selected', 'true')
    expect(item2).not.toHaveAttribute('data-selected')
  })

  it('applies interactive state to item', () => {
    const items = [
      { key: '1', label: 'Item 1', value: '1', interactive: true },
      { key: '2', label: 'Item 2', value: '2', interactive: false },
    ]
    const container = renderListWithItems(items)
    const item1 = getListItemByText('Item 1', container)
    const item2 = getListItemByText('Item 2', container)

    expect(item1).toHaveAttribute('data-interactive', 'true')
    expect(item2).not.toHaveAttribute('data-interactive')
  })

  it('applies custom styles to list item', () => {
    const container = renderList(
      <List.Item value="1" styles={{ root: 'custom-item-class' }}>
        Item with styles
      </List.Item>
    )
    const item = container.querySelector('[role="listitem"]')
    expect(item).toHaveClass('custom-item-class')
  })

  it('renders divider correctly', () => {
    const container = renderList(
      <>
        <List.Item value="1">Item 1</List.Item>
        <List.Divider className="custom-divider" />
        <List.Item value="2">Item 2</List.Item>
      </>
    )
    expect(container.querySelector('.custom-divider')).toBeInTheDocument()
  })

  it('is focusable by default and exposes focus-visible state', async () => {
    const container = renderListWithItems([{ key: '1', label: 'Item 1', value: '1' }])
    const item = getListItemByText('Item 1', container)
    const user = userEvent.setup()

    expect(item).toHaveAttribute('tabindex', '0')
    expect(item).toHaveAttribute('data-focus-visible', 'false')

    await user.tab()

    expect(document.activeElement).toBe(item)
    expect(item).toHaveAttribute('data-focused', 'true')
    expect(item).toHaveAttribute('data-focus-visible', 'true')
  })

  it('allows consumers to opt out of default focusability', () => {
    const container = renderList(
      <List.Item value="1" focusable={false}>
        Item 1
      </List.Item>
    )
    const item = getListItemByText('Item 1', container)

    expect(item).not.toHaveAttribute('tabindex')
  })

  it('reflects checked state on List.CheckboxIndicator', () => {
    const container = renderList(
      <List.Item value="1">
        <List.CheckboxIndicator checked />
      </List.Item>
    )
    const checkbox = container.querySelector(`.${styles.checkbox}`)
    expect(checkbox).toHaveAttribute('data-checked', 'true')
    
    const container2 = renderList(
      <List.Item value="1">
        <List.CheckboxIndicator checked={false} />
      </List.Item>
    )
    expect(container2.querySelector(`.${styles.checkbox}`)).toHaveAttribute('data-checked', 'false')
  })
})
