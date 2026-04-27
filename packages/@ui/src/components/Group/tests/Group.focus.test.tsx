import * as React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Group } from '../Group'
import { Divider } from '../../Divider'
import { Select } from '../../Select'
import css from '../Group.module.css'
import expandCss from '../../Expand/Expand.module.css'

const SearchIcon = () => <svg data-testid="search-icon" />

describe('Group.Input focus ring target', () => {
  it('applies a custom variant class to the root, item wrappers, and grouped slots', () => {
    const { container } = render(
      <Group variant="my-custom-variant">
        <Group.Button>Action</Group.Button>
        <Group.Input aria-label="Search" />
        <Group.Expand title="Filters" />
      </Group>
    )

    const groupRoot = container.querySelector('[role="group"]')!
    const itemWrappers = container.querySelectorAll(`.${css.item}`)
    const actionButton = screen.getByRole('button', { name: 'Action' })
    const input = screen.getByRole('textbox', { name: 'Search' })
    const inputSurface = input.closest(`.${css.input}`)
    const expandTrigger = screen.getByRole('button', { name: 'Filters' })
    const expandSurface = expandTrigger.closest(`.${css.expand}`)

    expect(groupRoot).toHaveClass('my-custom-variant')
    expect(itemWrappers).toHaveLength(3)
    itemWrappers.forEach((item) => {
      expect(item).toHaveClass('my-custom-variant')
    })
    expect(actionButton).toHaveClass('my-custom-variant')
    expect(inputSurface).toHaveClass('my-custom-variant')
    expect(expandSurface).toHaveClass('my-custom-variant')
  })

  it('preserves root and slot styles while adding the variant class', () => {
    const { container } = render(
      <Group
        variant="secondary"
        styles={{
          root: 'root-style',
          item: 'item-style',
          button: 'button-style',
          input: 'input-style',
          expand: 'expand-style',
        }}
      >
        <Group.Button>Action</Group.Button>
        <Group.Input aria-label="Search" />
        <Group.Expand title="Filters" />
      </Group>
    )

    const groupRoot = container.querySelector('[role="group"]')!
    const itemWrappers = container.querySelectorAll(`.${css.item}`)
    const actionButton = screen.getByRole('button', { name: 'Action' })
    const inputSurface = screen.getByRole('textbox', { name: 'Search' }).closest(`.${css.input}`)
    const expandSurface = screen.getByRole('button', { name: 'Filters' }).closest(`.${css.expand}`)

    expect(groupRoot).toHaveClass('secondary', 'root-style')
    itemWrappers.forEach((item) => {
      expect(item).toHaveClass('secondary', 'item-style')
    })
    expect(actionButton).toHaveClass('secondary', 'button-style')
    expect(inputSurface).toHaveClass('secondary', 'input-style')
    expect(expandSurface).toHaveClass('secondary', 'expand-style')
  })

  it('applies divider wrapper variant class and divider item slot styles', () => {
    const { container } = render(
      <Group
        variant="outline"
        styles={{
          item: {
            divider: 'divider-item-style',
          },
          button: 'button-style',
          input: 'input-style',
        }}
      >
        <Group.Input aria-label="Search" />
        <Divider />
        <Group.Button>Go</Group.Button>
      </Group>
    )

    const divider = container.querySelector('[role="separator"]')!
    const dividerItem = divider.closest(`.${css.item}`)!
    const inputSurface = screen.getByRole('textbox', { name: 'Search' }).closest(`.${css.input}`)
    const button = screen.getByRole('button', { name: 'Go' })

    expect(dividerItem).toHaveClass('outline', css.divider, 'divider-item-style')
    expect(inputSurface).toHaveClass('outline', 'input-style')
    expect(button).toHaveClass('outline', 'button-style')
  })

  it('sets data-focused on the Input container that wraps both the prefix icon and the input element', async () => {
    const user = userEvent.setup()
    const { container } = render(
      <Group>
        <Group.Input aria-label="Search" icon={<SearchIcon />} />
      </Group>
    )

    const input = screen.getByRole('textbox')
    await user.tab()
    expect(input).toHaveFocus()

    // The Input container wraps both the prefix icon and the input element.
    // It should receive data-focused so CSS can target it for the focus ring.
    // Walk up to the container div (parent of start-adornments + input)
    const inputContainer = input.parentElement!
    const groupedSurface = inputContainer.parentElement!
    expect(inputContainer.tagName).toBe('DIV')
    expect(inputContainer).toHaveAttribute('data-focused', 'true')
    expect(inputContainer).toHaveAttribute('data-input-focus-surface', 'true')
    expect(groupedSurface).toHaveAttribute('data-focus-surface', 'true')
    expect(groupedSurface.className).toContain(css.input)
    await waitFor(() => {
      expect(container.querySelector('[data-ring="true"][aria-hidden="true"]')).toHaveAttribute('data-visible', 'true')
    })

    // The container must contain both the prefix icon and the input
    expect(inputContainer.querySelector('[data-testid="search-icon"]')).toBeInTheDocument()
    expect(inputContainer.contains(input)).toBe(true)
  })

  it('removes data-focused from the Input container on blur', async () => {
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
    expect(inputContainer).toHaveAttribute('data-focused', 'true')

    await user.tab()
    expect(inputContainer).not.toHaveAttribute('data-focused')
  })

  it('marks Group.Button and Group.Select roots as grouped focus surfaces', () => {
    const { container } = render(
      <Group>
        <Group.Button>Action</Group.Button>
        <Group.Select>
          <Select.Trigger>
            <Select.Value placeholder="Sort" />
          </Select.Trigger>
          <Select.Content>
            <Select.List>
              <Select.Item value="recent" textValue="Recent">
                Recent
              </Select.Item>
            </Select.List>
          </Select.Content>
        </Group.Select>
      </Group>
    )

    const actionButton = screen.getByRole('button', { name: 'Action' })
    const selectTrigger = container.querySelector(`button.${css.trigger}`)!

    expect(actionButton).toHaveAttribute('data-focus-surface', 'true')
    expect(selectTrigger).toBeInstanceOf(HTMLButtonElement)
    expect(selectTrigger.closest(`.${css.select}`)).toHaveAttribute('data-focus-surface', 'true')
  })

  it('marks Group.Expand root as a grouped focus surface and shows the group focus ring', async () => {
    const user = userEvent.setup()
    const { container } = render(
      <Group>
        <Group.Expand title="Filters" />
      </Group>
    )

    const expandTrigger = screen.getByRole('button', { name: 'Filters' })
    const expandSurface = expandTrigger.closest(`.${css.expand}`)

    expect(expandSurface).toHaveAttribute('data-focus-surface', 'true')

    await user.tab()
    expect(expandTrigger).toHaveFocus()

    await waitFor(() => {
      expect(container.querySelector('[data-ring="true"][aria-hidden="true"]')).toHaveAttribute('data-visible', 'true')
    })
  })

  it('applies string styles on Group.Expand to the grouped surface wrapper', () => {
    render(
      <Group>
        <Group.Expand title="Filters" styles="outer-surface-style" />
      </Group>
    )

    const expandTrigger = screen.getByRole('button', { name: 'Filters' })
    const groupedSurface = expandTrigger.closest(`.${css.expand}`)
    const nestedExpand = expandTrigger.closest(`.${expandCss.expand}`)

    expect(groupedSurface).toHaveClass('outer-surface-style')
    expect(nestedExpand).not.toHaveClass('outer-surface-style')
  })

  it('keeps object styles on Group.Expand targeting nested Expand slots', () => {
    render(
      <Group>
        <Group.Expand
          title="Filters"
          styles={{ root: 'inner-expand-root', trigger: 'inner-expand-trigger' }}
        />
      </Group>
    )

    const expandTrigger = screen.getByRole('button', { name: 'Filters' })
    const groupedSurface = expandTrigger.closest(`.${css.expand}`)
    const nestedExpand = expandTrigger.closest(`.${expandCss.expand}`)

    expect(groupedSurface).not.toHaveClass('inner-expand-root')
    expect(nestedExpand).toHaveClass('inner-expand-root')
    expect(expandTrigger).toHaveClass('inner-expand-trigger')
  })
})

describe('Group arrow key navigation', () => {
  it('navigates between buttons with arrow keys in horizontal group', async () => {
    const user = userEvent.setup()

    render(
      <div>
        <button>Before</button>
        <Group>
          <Group.Button>Button 1</Group.Button>
          <Group.Button>Button 2</Group.Button>
          <Group.Button>Button 3</Group.Button>
        </Group>
        <button>After</button>
      </div>
    )

    const button1 = screen.getByRole('button', { name: 'Button 1' })
    const button2 = screen.getByRole('button', { name: 'Button 2' })
    const button3 = screen.getByRole('button', { name: 'Button 3' })

    // Tab into the group
    await user.tab()
    await user.tab()
    expect(button1).toHaveFocus()

    // Navigate right
    await user.keyboard('{ArrowRight}')
    expect(button2).toHaveFocus()

    // Navigate right again
    await user.keyboard('{ArrowRight}')
    expect(button3).toHaveFocus()

    // Wrap around
    await user.keyboard('{ArrowRight}')
    expect(button1).toHaveFocus()

    // Navigate left
    await user.keyboard('{ArrowLeft}')
    expect(button3).toHaveFocus()
  })

  it('navigates between buttons with arrow keys in vertical group', async () => {
    const user = userEvent.setup()

    render(
      <div>
        <button>Before</button>
        <Group orientation="vertical">
          <Group.Button>Button 1</Group.Button>
          <Group.Button>Button 2</Group.Button>
          <Group.Button>Button 3</Group.Button>
        </Group>
        <button>After</button>
      </div>
    )

    const button1 = screen.getByRole('button', { name: 'Button 1' })
    const button2 = screen.getByRole('button', { name: 'Button 2' })
    const button3 = screen.getByRole('button', { name: 'Button 3' })

    // Tab into the group
    await user.tab()
    await user.tab()
    expect(button1).toHaveFocus()

    // Navigate down
    await user.keyboard('{ArrowDown}')
    expect(button2).toHaveFocus()

    // Navigate down again
    await user.keyboard('{ArrowDown}')
    expect(button3).toHaveFocus()

    // Wrap around
    await user.keyboard('{ArrowDown}')
    expect(button1).toHaveFocus()

    // Navigate up
    await user.keyboard('{ArrowUp}')
    expect(button3).toHaveFocus()
  })

  it('navigates between mixed components with arrow keys', async () => {
    const user = userEvent.setup()

    render(
      <div>
        <button>Before</button>
        <Group>
          <Group.Button>Action</Group.Button>
          <Group.Input aria-label="Search" />
          <Group.Button>Submit</Group.Button>
        </Group>
        <button>After</button>
      </div>
    )

    const actionButton = screen.getByRole('button', { name: 'Action' })
    const input = screen.getByRole('textbox', { name: 'Search' })
    const submitButton = screen.getByRole('button', { name: 'Submit' })

    // Tab into the group
    await user.tab()
    await user.tab()
    expect(actionButton).toHaveFocus()

    // Navigate right to input
    await user.keyboard('{ArrowRight}')
    expect(input).toHaveFocus()

    // Navigate right to submit button
    await user.keyboard('{ArrowRight}')
    expect(submitButton).toHaveFocus()

    // Navigate left back to input
    await user.keyboard('{ArrowLeft}')
    expect(input).toHaveFocus()
  })

  it('navigates through Group.Expand like other primitives', async () => {
    const user = userEvent.setup()

    render(
      <div>
        <button>Before</button>
        <Group>
          <Group.Button>Action</Group.Button>
          <Group.Expand title="Filters" />
          <Group.Button>Submit</Group.Button>
        </Group>
        <button>After</button>
      </div>
    )

    const actionButton = screen.getByRole('button', { name: 'Action' })
    const expandTrigger = screen.getByRole('button', { name: 'Filters' })
    const submitButton = screen.getByRole('button', { name: 'Submit' })

    await user.tab()
    await user.tab()
    expect(actionButton).toHaveFocus()

    await user.keyboard('{ArrowRight}')
    expect(expandTrigger).toHaveFocus()

    await user.keyboard('{ArrowRight}')
    expect(submitButton).toHaveFocus()
  })

  it('does not navigate with arrow keys when focus is outside the group', async () => {
    const user = userEvent.setup()

    render(
      <div>
        <button>Before</button>
        <Group>
          <Group.Button>Button 1</Group.Button>
          <Group.Button>Button 2</Group.Button>
        </Group>
        <button>After</button>
      </div>
    )

    const beforeButton = screen.getByRole('button', { name: 'Before' })

    // Focus the before button
    await user.click(beforeButton)
    expect(beforeButton).toHaveFocus()

    // Arrow key should not trigger group navigation
    await user.keyboard('{ArrowRight}')
    expect(beforeButton).toHaveFocus()
  })
})

describe('Group auto-focus behavior', () => {
  it('focuses the input when a Group.Button is clicked', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()

    render(
      <Group>
        <Group.Button onClick={() => handleChange('decrement')}>-</Group.Button>
        <Group.Input aria-label="Value" defaultValue="5" />
        <Group.Button onClick={() => handleChange('increment')}>+</Group.Button>
      </Group>
    )

    const input = screen.getByRole('textbox', { name: 'Value' })
    const incrementButton = screen.getByRole('button', { name: '+' })

    // Click the increment button
    await user.click(incrementButton)

    // Input should receive focus automatically
    expect(input).toHaveFocus()
  })

  it('focuses the input when a Group.Button with value is clicked (toggle group)', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()

    render(
      <Group value="option1" onChange={handleChange}>
        <Group.Button value="option1">Option 1</Group.Button>
        <Group.Input aria-label="Custom value" />
        <Group.Button value="option2">Option 2</Group.Button>
      </Group>
    )

    const input = screen.getByRole('textbox', { name: 'Custom value' })
    const option2Button = screen.getByRole('button', { name: 'Option 2' })

    // Click option 2
    await user.click(option2Button)

    // Input should receive focus automatically
    expect(input).toHaveFocus()
    expect(handleChange).toHaveBeenCalledWith('option2')
  })

  it('does not focus input when Group.Button is disabled', async () => {
    const user = userEvent.setup()

    render(
      <Group>
        <Group.Button isDisabled>-</Group.Button>
        <Group.Input aria-label="Value" defaultValue="5" />
        <Group.Button>+</Group.Button>
      </Group>
    )

    const input = screen.getByRole('textbox', { name: 'Value' })
    const decrementButton = screen.getByRole('button', { name: '-' })

    // Try to click the disabled button
    await user.click(decrementButton)

    // Input should not receive focus
    expect(input).not.toHaveFocus()
  })

  it('focuses the first input when multiple inputs exist in the group', async () => {
    const user = userEvent.setup()

    render(
      <Group>
        <Group.Button>Action</Group.Button>
        <Group.Input aria-label="First input" />
        <Group.Input aria-label="Second input" />
      </Group>
    )

    const firstInput = screen.getByRole('textbox', { name: 'First input' })
    const actionButton = screen.getByRole('button', { name: 'Action' })

    // Click the action button
    await user.click(actionButton)

    // First input should receive focus
    expect(firstInput).toHaveFocus()
  })

  it('shows focus ring on input after button click', async () => {
    const user = userEvent.setup()
    const { container } = render(
      <Group>
        <Group.Button>-</Group.Button>
        <Group.Input aria-label="Value" defaultValue="5" />
        <Group.Button>+</Group.Button>
      </Group>
    )

    const input = screen.getByRole('textbox', { name: 'Value' })
    const incrementButton = screen.getByRole('button', { name: '+' })

    // Click the increment button
    await user.click(incrementButton)

    // Input should have focus
    expect(input).toHaveFocus()

    // The input container should have focus-visible set
    const inputContainer = input.closest('[data-input-focus-surface="true"]')
    expect(inputContainer).toHaveAttribute('data-focus-visible', 'true')

    // The focus ring indicator should be visible
    await waitFor(() => {
      const focusRing = container.querySelector('[data-ring="true"][aria-hidden="true"]')
      expect(focusRing).toHaveAttribute('data-visible', 'true')
    })
  })
})
