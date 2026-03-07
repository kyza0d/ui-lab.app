import { describe, it, expect } from 'vitest'
import { renderList, renderListWithItems, getListItems, getListItemByText } from './List.test-utils'
import { List } from '../'
import { hoverElement } from '@/tests/utils'
import styles from '../List.module.css'
import { act } from 'react'

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
          <List.Checkbox checked />
          <List.ActionGroup>
            <button>Action</button>
          </List.ActionGroup>
        </List.Item>
        <List.Divider />
        <List.Footer align="flex-start">Footer Text</List.Footer>
      </>
    )

    const header = container.querySelector('header')
    expect(header).toHaveTextContent('Header Text')
    
    expect(container.querySelector(`[role="listitem"]`)).toBeInTheDocument()
    expect(container.querySelector(`.${styles.media}`)).toHaveTextContent('Icon')
    expect(container.querySelector(`.${styles.desc}`)).toHaveTextContent('Description Text')
    expect(container.querySelector(`.${styles.checkbox}`)).toBeInTheDocument()
    
    // Use data attribute instead of class if class is flaky
    expect(container.querySelector('[data-justify="flex-start"]')).toBeInTheDocument()
    
    const footer = container.querySelector('footer')
    expect(footer).toHaveTextContent('Footer Text')
    expect(footer).toHaveAttribute('data-align', 'flex-start')
  })

  it('applies variant and spacing props to container', () => {
    const container = renderListWithItems([], { variant: 'feed', spacing: 'sm' })
    const list = container.querySelector('[role="list"]')

    expect(list).toHaveAttribute('data-variant', 'feed')
    expect(list).toHaveAttribute('data-spacing', 'sm')
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
      expect(item2).toHaveAttribute('data-highlighted', 'true')
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

  it('reflects checked state on List.Checkbox', () => {
    const container = renderList(
      <List.Item value="1">
        <List.Checkbox checked />
      </List.Item>
    )
    const checkbox = container.querySelector(`.${styles.checkbox}`)
    expect(checkbox).toHaveAttribute('data-checked', 'true')
    
    const container2 = renderList(
      <List.Item value="1">
        <List.Checkbox checked={false} />
      </List.Item>
    )
    expect(container2.querySelector(`.${styles.checkbox}`)).toHaveAttribute('data-checked', 'false')
  })
})
