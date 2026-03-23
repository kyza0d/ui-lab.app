import * as React from 'react'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Group } from '../Group'

const SearchIcon = () => <svg data-testid="search-icon" />

describe('Group.Input focus ring target', () => {
  it('sets data-active on the Input container that wraps both the prefix icon and the input element', async () => {
    const user = userEvent.setup()
    render(
      <Group>
        <Group.Input aria-label="Search" icon={<SearchIcon />} />
      </Group>
    )

    const input = screen.getByRole('textbox')
    await user.tab()
    expect(input).toHaveFocus()

    // The Input container wraps both the prefix icon and the input element.
    // It should receive data-active so CSS can target it for the focus ring.
    // Walk up to the container div (parent of start-adornments + input)
    const inputContainer = input.parentElement!
    expect(inputContainer.tagName).toBe('DIV')
    expect(inputContainer).toHaveAttribute('data-active', 'true')

    // The container must contain both the prefix icon and the input
    expect(inputContainer.querySelector('[data-testid="search-icon"]')).toBeInTheDocument()
    expect(inputContainer.contains(input)).toBe(true)
  })

  it('removes data-active from the Input container on blur', async () => {
    const user = userEvent.setup()
    render(
      <Group>
        <Group.Input aria-label="Search" icon={<SearchIcon />} />
      </Group>
    )

    const input = screen.getByRole('textbox')
    await user.tab()
    expect(input).toHaveFocus()

    const inputContainer = input.parentElement!
    expect(inputContainer).toHaveAttribute('data-active', 'true')

    await user.tab()
    expect(inputContainer).not.toHaveAttribute('data-active')
  })
})
