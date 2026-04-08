import * as React from 'react'
import { act } from 'react'
import { describe, it, expect, vi } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderList, getListItems } from './List.test-utils'
import { List } from '../'
import { Select } from '../../Select'
import { waitForCondition } from '@/tests/utils'

describe('List.activation', () => {
  it('focused clickable row activates on Enter and Space', async () => {
    const onClick = vi.fn()
    const user = userEvent.setup()
    const container = renderList(
      <List.Item value="1" onClick={onClick}>
        Row 1
      </List.Item>
    )
    const [item] = getListItems(container)

    await act(async () => {
      item!.focus()
    })
    await user.keyboard('{Enter}')
    await act(async () => {
      item!.focus()
    })
    await user.keyboard(' ')

    expect(onClick).toHaveBeenCalledTimes(2)
  })

  it('focused checkbox-style row toggles on Enter and Space via row click', async () => {
    const user = userEvent.setup()

    function CheckboxStyleRow() {
      const [checked, setChecked] = React.useState(false)

      return (
        <List.Item value="task" onClick={() => setChecked((value) => !value)}>
          <List.CheckboxIndicator checked={checked} />
          <span>{checked ? 'Done' : 'Todo'}</span>
        </List.Item>
      )
    }

    renderList(<CheckboxStyleRow />)
    const row = screen.getByRole('listitem')

    await act(async () => {
      row.focus()
    })
    await user.keyboard('{Enter}')
    expect(screen.getByText('Done')).toBeInTheDocument()

    await act(async () => {
      row.focus()
    })
    await user.keyboard(' ')
    expect(screen.getByText('Todo')).toBeInTheDocument()
  })

  it('focused row toggles an interactive checkbox on Enter and Space', async () => {
    const user = userEvent.setup()

    function CheckboxRow() {
      const [checked, setChecked] = React.useState(false)

      return (
        <List.Item value="1">
          <List.Checkbox
            aria-label="Toggle task"
            checked={checked}
            onChange={(event) => setChecked(event.target.checked)}
          />
        </List.Item>
      )
    }

    renderList(<CheckboxRow />)
    const row = screen.getByRole('listitem')
    const checkbox = screen.getByRole('checkbox')

    await act(async () => {
      row.focus()
    })
    await user.keyboard('{Enter}')
    expect(checkbox).toBeChecked()

    await act(async () => {
      row.focus()
    })
    await user.keyboard(' ')
    expect(checkbox).not.toBeChecked()
  })

  it('focused switch row toggles on Enter and Space', async () => {
    const user = userEvent.setup()

    function SwitchRow() {
      const [isSelected, setIsSelected] = React.useState(false)

      return (
        <List.Item value="1">
          <List.Switch aria-label="Dark mode" isSelected={isSelected} onChange={setIsSelected} />
        </List.Item>
      )
    }

    renderList(<SwitchRow />)
    const row = screen.getByRole('listitem')
    const control = screen.getByRole('switch')

    await act(async () => {
      row.focus()
    })
    await user.keyboard('{Enter}')
    expect(control).toHaveAttribute('aria-checked', 'true')

    await act(async () => {
      row.focus()
    })
    await user.keyboard(' ')
    expect(control).toHaveAttribute('aria-checked', 'false')
  })

  it.each([
    ['Enter', '{Enter}'],
    ['Space', ' '],
  ])('focused row opens an inline select on %s', async (_label, keyPress) => {
    const user = userEvent.setup()
    renderList(
      <List.Item value="1">
        <span>Timezone</span>
        <List.Select>
          <Select.Trigger>
            <Select.Value placeholder="Pick one" />
          </Select.Trigger>
          <Select.Content>
            <Select.List>
              <Select.Item value="utc">UTC</Select.Item>
            </Select.List>
          </Select.Content>
        </List.Select>
      </List.Item>
    )

    const row = screen.getByRole('listitem')
    const trigger = screen.getByRole('button')

    await act(async () => {
      row.focus()
    })
    await user.keyboard(keyPress)
    await waitForCondition(() => trigger.getAttribute('aria-expanded') === 'true')

    expect(trigger).toHaveAttribute('aria-expanded', 'true')
  })

  it('keeps the row highlighted when focus moves into an inline select trigger', async () => {
    const user = userEvent.setup()
    renderList(
      <List.Item value="1">
        <span>Timezone</span>
        <List.Select>
          <Select.Trigger>
            <Select.Value placeholder="Pick one" />
          </Select.Trigger>
          <Select.Content>
            <Select.List>
              <Select.Item value="utc">UTC</Select.Item>
            </Select.List>
          </Select.Content>
        </List.Select>
      </List.Item>
    )

    const row = screen.getByRole('listitem')
    const trigger = screen.getByRole('button')

    await user.click(trigger)

    expect(trigger).toHaveFocus()
    expect(row).toHaveAttribute('data-highlighted', 'true')
  })

  it('restores row highlight after selecting an inline select option', async () => {
    const user = userEvent.setup()
    renderList(
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
    )

    const row = screen.getByRole('listitem')
    const trigger = screen.getByRole('button')

    await user.click(trigger)
    await user.click(screen.getByRole('option', { name: 'EST' }))

    await waitForCondition(() => trigger.getAttribute('aria-expanded') === 'false')
    expect(row).toHaveAttribute('data-highlighted', 'true')
    expect(document.activeElement).toBe(row)
  })

  it('does not double-trigger when focus is already inside a child control', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    const onRowClick = vi.fn()
    renderList(
      <List.Item value="1" onClick={onRowClick}>
        <List.Checkbox aria-label="Toggle task" checked={false} onChange={onChange} />
      </List.Item>
    )

    const checkbox = screen.getByRole('checkbox')

    await user.click(checkbox)
    expect(checkbox).toHaveFocus()
    onChange.mockClear()
    onRowClick.mockClear()

    await user.keyboard(' ')

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onRowClick).not.toHaveBeenCalled()
  })

  it('does not interfere with text input editing when the input is focused', async () => {
    const user = userEvent.setup()
    renderList(
      <List.Item value="1" onClick={vi.fn()}>
        <span>Name</span>
        <List.Input aria-label="Display name" defaultValue="" />
      </List.Item>
    )

    const input = screen.getByRole('textbox')

    await user.click(input)
    await user.keyboard('abc')

    expect(input).toHaveValue('abc')
  })

  it('does not invent a primary action for rows that only contain an input', async () => {
    const user = userEvent.setup()
    renderList(
      <List.Item value="1">
        <span>Name</span>
        <List.Input aria-label="Display name" defaultValue="Olivia" />
      </List.Item>
    )

    const row = screen.getByRole('listitem')

    await act(async () => {
      row.focus()
    })
    await user.keyboard('{Enter}')
    await act(async () => {
      row.focus()
    })
    await user.keyboard(' ')

    expect(screen.getByRole('textbox')).toHaveValue('Olivia')
  })
})
