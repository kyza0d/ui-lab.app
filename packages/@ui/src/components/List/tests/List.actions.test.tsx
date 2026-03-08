import { describe, it, expect, vi } from 'vitest'
import * as React from 'react'
import { fireEvent } from '@testing-library/react'
import { renderList, getListItems } from './List.test-utils'
import { List } from '../'

const TrashIcon = () => React.createElement('svg', { 'data-testid': 'trash-icon' })
const EditIcon = () => React.createElement('svg', { 'data-testid': 'edit-icon' })

describe('List.Item actions', () => {
  it('renders no actions container when actions is not provided', () => {
    const container = renderList(
      React.createElement(List.Item, { value: '1' }, 'Item 1')
    )
    expect(container.querySelector('[data-actions]')).not.toBeInTheDocument()
  })

  it('renders no actions container when actions is an empty array', () => {
    const container = renderList(
      React.createElement(List.Item, { value: '1', actions: [] }, 'Item 1')
    )
    expect(container.querySelector('[data-actions]')).not.toBeInTheDocument()
  })

  it('renders an actions container when actions are provided', () => {
    const container = renderList(
      React.createElement(List.Item, {
        value: '1',
        actions: [{ icon: React.createElement(TrashIcon), title: 'Delete' }],
      }, 'Item 1')
    )
    expect(container.querySelector('[data-actions]')).toBeInTheDocument()
  })

  it('renders the correct number of action buttons', () => {
    const container = renderList(
      React.createElement(List.Item, {
        value: '1',
        actions: [
          { icon: React.createElement(TrashIcon), title: 'Delete' },
          { icon: React.createElement(EditIcon), title: 'Edit' },
        ],
      }, 'Item 1')
    )
    const buttons = container.querySelectorAll('[data-actions] button')
    expect(buttons).toHaveLength(2)
  })

  it('sets aria-label on each action button from its title', () => {
    const container = renderList(
      React.createElement(List.Item, {
        value: '1',
        actions: [
          { icon: React.createElement(TrashIcon), title: 'Delete' },
          { icon: React.createElement(EditIcon), title: 'Edit' },
        ],
      }, 'Item 1')
    )
    const buttons = container.querySelectorAll('[data-actions] button')
    expect(buttons[0]).toHaveAttribute('aria-label', 'Delete')
    expect(buttons[1]).toHaveAttribute('aria-label', 'Edit')
  })

  it('renders the icon inside each action button', () => {
    const container = renderList(
      React.createElement(List.Item, {
        value: '1',
        actions: [{ icon: React.createElement(TrashIcon), title: 'Delete' }],
      }, 'Item 1')
    )
    expect(container.querySelector('[data-testid="trash-icon"]')).toBeInTheDocument()
  })

  it('calls onClick when an action button is clicked', () => {
    const handleDelete = vi.fn()
    const container = renderList(
      React.createElement(List.Item, {
        value: '1',
        actions: [{ icon: React.createElement(TrashIcon), title: 'Delete', onClick: handleDelete }],
      }, 'Item 1')
    )
    const button = container.querySelector('[data-actions] button') as HTMLButtonElement
    fireEvent.click(button)
    expect(handleDelete).toHaveBeenCalledTimes(1)
  })

  it('renders without error when onClick is not provided', () => {
    expect(() =>
      renderList(
        React.createElement(List.Item, {
          value: '1',
          actions: [{ icon: React.createElement(TrashIcon), title: 'Delete' }],
        }, 'Item 1')
      )
    ).not.toThrow()
  })

  it('renders a custom React node in the actions array', () => {
    const CustomAction = () => React.createElement('div', { 'data-testid': 'custom-action' })
    const container = renderList(
      React.createElement(List.Item, {
        value: '1',
        actions: [React.createElement(CustomAction, { key: 'custom' })],
      }, 'Item 1')
    )
    expect(container.querySelector('[data-testid="custom-action"]')).toBeInTheDocument()
  })

  it('renders a mixed array of action defs and custom nodes', () => {
    const CustomAction = () => React.createElement('div', { 'data-testid': 'custom-action' })
    const container = renderList(
      React.createElement(List.Item, {
        value: '1',
        actions: [
          { icon: React.createElement(TrashIcon), title: 'Delete' },
          React.createElement(CustomAction, { key: 'custom' }),
        ],
      }, 'Item 1')
    )
    expect(container.querySelector('[data-actions] button')).toBeInTheDocument()
    expect(container.querySelector('[data-testid="custom-action"]')).toBeInTheDocument()
  })

  it('action buttons are type="button" to prevent form submission', () => {
    const container = renderList(
      React.createElement(List.Item, {
        value: '1',
        actions: [{ icon: React.createElement(TrashIcon), title: 'Delete' }],
      }, 'Item 1')
    )
    const button = container.querySelector('[data-actions] button')
    expect(button).toHaveAttribute('type', 'button')
  })
})
