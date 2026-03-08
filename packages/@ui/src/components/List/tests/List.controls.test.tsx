import { describe, it, expect, vi } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { renderList } from './List.test-utils'
import { List } from '../'
import { Select } from '../../Select'
import styles from '../List.module.css'

describe('List.controls', () => {
  // ─── List.Switch ────────────────────────────────────────────────────────────

  it('renders a Switch inside the list item', () => {
    renderList(
      <List.Item value="1">
        <List.Switch aria-label="Toggle" />
      </List.Item>
    )
    expect(screen.getByRole('switch')).toBeInTheDocument()
  })

  it('passes isSelected to the Switch', () => {
    renderList(
      <List.Item value="1">
        <List.Switch aria-label="Toggle" isSelected />
      </List.Item>
    )
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true')
  })

  it('passes isDisabled to the Switch', () => {
    renderList(
      <List.Item value="1">
        <List.Switch aria-label="Toggle" isDisabled />
      </List.Item>
    )
    expect(screen.getByRole('switch')).toBeDisabled()
  })

  it('List.Switch wrapper has the control class', () => {
    const { container } = renderList(
      <List.Item value="1">
        <List.Switch aria-label="Toggle" />
      </List.Item>
    )
    expect(container.querySelector(`.${styles.control}`)).toBeInTheDocument()
  })

  it('forwards className to the List.Switch wrapper', () => {
    const { container } = renderList(
      <List.Item value="1">
        <List.Switch aria-label="Toggle" className="my-switch-wrapper" />
      </List.Item>
    )
    expect(container.querySelector('.my-switch-wrapper')).toBeInTheDocument()
  })

  // ─── List.Input ─────────────────────────────────────────────────────────────

  it('renders an input element inside the list item', () => {
    renderList(
      <List.Item value="1">
        <List.Input />
      </List.Item>
    )
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })

  it('passes value and type through to the input', () => {
    renderList(
      <List.Item value="1">
        <List.Input type="email" value="test@example.com" readOnly />
      </List.Item>
    )
    const input = screen.getByRole('textbox')
    expect(input).toHaveAttribute('type', 'email')
    expect(input).toHaveValue('test@example.com')
  })

  it('passes disabled through to the input', () => {
    renderList(
      <List.Item value="1">
        <List.Input disabled />
      </List.Item>
    )
    expect(screen.getByRole('textbox')).toBeDisabled()
  })

  it('List.Input wrapper has the control class', () => {
    const { container } = renderList(
      <List.Item value="1">
        <List.Input />
      </List.Item>
    )
    expect(container.querySelector(`.${styles.control}`)).toBeInTheDocument()
  })

  it('List.Input wrapper has a constrained width class', () => {
    const { container } = renderList(
      <List.Item value="1">
        <List.Input />
      </List.Item>
    )
    const wrapper = container.querySelector(`.${styles.control}`)
    expect(wrapper).toHaveClass('w-32')
  })

  // ─── List.Select ────────────────────────────────────────────────────────────

  it('renders a Select wrapper inside the list item', () => {
    const { container } = renderList(
      <List.Item value="1">
        <List.Select>
          <Select.Trigger>Pick one</Select.Trigger>
          <Select.Content>
            <Select.Item key="a">Option A</Select.Item>
          </Select.Content>
        </List.Select>
      </List.Item>
    )
    expect(container.querySelector('[data-mode]')).toBeInTheDocument()
  })

  it('passes isDisabled through to Select', () => {
    const { container } = renderList(
      <List.Item value="1">
        <List.Select isDisabled>
          <Select.Trigger>Pick one</Select.Trigger>
          <Select.Content>
            <Select.Item key="a">Option A</Select.Item>
          </Select.Content>
        </List.Select>
      </List.Item>
    )
    const trigger = container.querySelector('button[aria-disabled]')
    expect(trigger).toBeInTheDocument()
  })

  it('List.Select wrapper has the control class', () => {
    const { container } = renderList(
      <List.Item value="1">
        <List.Select>
          <Select.Trigger>Pick one</Select.Trigger>
          <Select.Content>
            <Select.Item key="a">Option A</Select.Item>
          </Select.Content>
        </List.Select>
      </List.Item>
    )
    expect(container.querySelector(`.${styles.control}`)).toBeInTheDocument()
  })

  // ─── List.Checkbox (interactive) ────────────────────────────────────────────

  it('renders a checkbox input', () => {
    renderList(
      <List.Item value="1">
        <List.Checkbox checked={false} onChange={() => {}} />
      </List.Item>
    )
    expect(screen.getByRole('checkbox')).toBeInTheDocument()
  })

  it('the interactive checkbox is not readOnly and does not have tabIndex -1', () => {
    renderList(
      <List.Item value="1">
        <List.Checkbox checked={false} onChange={() => {}} />
      </List.Item>
    )
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).not.toHaveAttribute('readOnly')
    expect(checkbox).not.toHaveAttribute('tabindex', '-1')
  })

  it('passes checked state through to the checkbox', () => {
    renderList(
      <List.Item value="1">
        <List.Checkbox checked onChange={() => {}} />
      </List.Item>
    )
    expect(screen.getByRole('checkbox')).toBeChecked()
  })

  it('fires onChange when the interactive checkbox is clicked', async () => {
    const onChange = vi.fn()
    renderList(
      <List.Item value="1">
        <List.Checkbox checked={false} onChange={onChange} />
      </List.Item>
    )
    await userEvent.click(screen.getByRole('checkbox'))
    expect(onChange).toHaveBeenCalled()
  })

  it('List.Checkbox (interactive) wrapper has the control class', () => {
    const { container } = renderList(
      <List.Item value="1">
        <List.Checkbox checked={false} onChange={() => {}} />
      </List.Item>
    )
    expect(container.querySelector(`.${styles.control}`)).toBeInTheDocument()
  })

  // ─── List.CheckboxIndicator (renamed from old List.Checkbox) ────────────────

  it('List.CheckboxIndicator renders with data-checked attribute', () => {
    const { container } = renderList(
      <List.Item value="1">
        <List.CheckboxIndicator checked />
      </List.Item>
    )
    expect(container.querySelector(`.${styles.checkbox}`)).toHaveAttribute('data-checked', 'true')
  })

  it('List.CheckboxIndicator unchecked renders data-checked false', () => {
    const { container } = renderList(
      <List.Item value="1">
        <List.CheckboxIndicator checked={false} />
      </List.Item>
    )
    expect(container.querySelector(`.${styles.checkbox}`)).toHaveAttribute('data-checked', 'false')
  })

  it('List.CheckboxIndicator inner input has tabIndex -1 (non-interactive)', () => {
    const { container } = renderList(
      <List.Item value="1">
        <List.CheckboxIndicator checked />
      </List.Item>
    )
    const input = container.querySelector('input[type="checkbox"]')
    expect(input).toHaveAttribute('tabindex', '-1')
  })
})
