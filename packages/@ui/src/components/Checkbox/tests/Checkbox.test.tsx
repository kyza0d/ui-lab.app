import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Checkbox } from '../Checkbox'
import {
  testRefForwarding,
  testStyling,
  auditA11y,
} from '@/tests/utils'
import React from 'react'

describe('Checkbox - Accessibility', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(<Checkbox aria-label="Test" />)
    await auditA11y(container)
  })

  it('renders with correct role', () => {
    render(<Checkbox aria-label="Test" />)
    expect(screen.getByRole('checkbox')).toBeInTheDocument()
  })

  it('is accessible with a label and helper text', async () => {
    const { container } = render(
      <Checkbox label="Test" helper="Additional context" />
    )
    await auditA11y(container)
  })
})

describe('Checkbox - Interactions', () => {
  it('toggles checked state when clicked (uncontrolled)', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Checkbox onChange={onChange} aria-label="Toggle" />)

    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).not.toBeChecked()

    await user.click(checkbox)
    expect(checkbox).toBeChecked()
    expect(onChange).toHaveBeenCalledOnce()

    await user.click(checkbox)
    expect(checkbox).not.toBeChecked()
  })

  it('respects controlled checked state', async () => {
    const onChange = vi.fn()
    const { rerender } = render(
      <Checkbox checked={false} onChange={onChange} aria-label="Controlled" />
    )

    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).not.toBeChecked()

    const user = userEvent.setup()
    await user.click(checkbox)
    expect(onChange).toHaveBeenCalledOnce()
    expect(checkbox).not.toBeChecked()

    rerender(<Checkbox checked={true} onChange={onChange} aria-label="Controlled" />)
    expect(checkbox).toBeChecked()
  })

  it('does not respond to clicks when disabled', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Checkbox disabled onChange={onChange} aria-label="Disabled" />)

    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toBeDisabled()
    expect(checkbox).toHaveAttribute('data-disabled', 'true')

    await user.click(checkbox)
    expect(onChange).not.toHaveBeenCalled()
    expect(checkbox).not.toBeChecked()
  })
})

describe('Checkbox - Focus', () => {
  it('can be focused with keyboard', async () => {
    const user = userEvent.setup()
    const { container } = render(<Checkbox aria-label="Focusable" />)

    const checkbox = screen.getByRole('checkbox')
    await user.tab()
    expect(checkbox).toHaveFocus()
    expect(checkbox).toHaveAttribute('data-focused', 'true')
    expect(checkbox).toHaveAttribute('data-focus-visible', 'true')
    await waitFor(() => {
      expect(container.querySelector('[data-focus-indicator="local"]')).toHaveAttribute('data-visible', 'true')
    })
  })

  it('does not mark pointer focus as focus-visible', async () => {
    const user = userEvent.setup()
    render(<Checkbox aria-label="Pointer focus" />)

    const checkbox = screen.getByRole('checkbox')
    await user.click(checkbox)
    expect(checkbox).toHaveFocus()
    expect(checkbox).toHaveAttribute('data-focused', 'true')
    expect(checkbox).not.toHaveAttribute('data-focus-visible')
  })

  it('supports indeterminate state', () => {
    render(<Checkbox isIndeterminate aria-label="Indeterminate" />)
    const checkbox = screen.getByRole('checkbox') as HTMLInputElement
    expect(checkbox).toHaveAttribute('data-indeterminate', 'true')
    expect(checkbox.indeterminate).toBe(true)
    expect(checkbox).toHaveAttribute('aria-checked', 'mixed')
  })

  it('supports indeterminate alias', () => {
    render(<Checkbox indeterminate aria-label="Indeterminate" />)
    const checkbox = screen.getByRole('checkbox') as HTMLInputElement
    expect(checkbox.indeterminate).toBe(true)
    expect(checkbox).toHaveAttribute('aria-checked', 'mixed')
  })
})

describe('Checkbox - Ref Forwarding', () => {
  testRefForwarding({
    component: Checkbox,
    defaultProps: { 'aria-label': 'Checkbox' },
    expectedElement: HTMLDivElement,
  })
})

describe('Checkbox - Styling', () => {
  testStyling({
    component: Checkbox,
    defaultProps: { 'aria-label': 'Checkbox' },
    role: 'checkbox',
  })
})

describe('Checkbox - Component Specific', () => {
  it('renders with label associated correctly', () => {
    render(<Checkbox id="test-check" label="Accept Terms" />)
    const checkbox = screen.getByRole('checkbox', { name: /accept terms/i })
    expect(checkbox).toBeInTheDocument()
  })

  it('toggles when label is clicked', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Checkbox label="Accept Terms" onChange={onChange} />)

    const checkbox = screen.getByRole('checkbox', { name: /accept terms/i })
    await user.click(screen.getByText('Accept Terms'))

    expect(checkbox).toBeChecked()
    expect(onChange).toHaveBeenCalledOnce()
  })

  it('renders helper text through helperText compatibility alias', () => {
    render(<Checkbox label="Label" helperText="Helper text" />)
    const checkbox = screen.getByRole('checkbox', { name: /label/i })
    const helper = screen.getByText('Helper text')

    expect(helper).toBeInTheDocument()
    expect(checkbox).toHaveAccessibleDescription('Helper text')
  })

  it('renders helper text through helper', () => {
    render(<Checkbox label="Label" helper="Helper text" />)
    const checkbox = screen.getByRole('checkbox', { name: /label/i })

    expect(screen.getByText('Helper text')).toBeInTheDocument()
    expect(checkbox).toHaveAccessibleDescription('Helper text')
  })

  it('renders error helper text', () => {
    render(
      <Checkbox
        label="Label"
        helperText="Error text"
        helperTextError
      />
    )
    const helper = screen.getByText('Error text')
    const checkbox = screen.getByRole('checkbox', { name: /label/i })
    expect(helper).toBeInTheDocument()
    expect(helper).toHaveAttribute('data-error', 'true')
    expect(checkbox).toHaveAttribute('aria-invalid', 'true')
    expect(checkbox).toHaveAttribute('data-invalid', 'true')
    expect(checkbox.parentElement?.parentElement).toHaveAttribute('data-invalid', 'true')
  })

  it('marks invalid through error and isInvalid props', () => {
    const { rerender } = render(<Checkbox label="Error" error />)
    const checkbox = screen.getByRole('checkbox', { name: /error/i })

    expect(checkbox).toHaveAttribute('aria-invalid', 'true')
    expect(checkbox).toHaveAttribute('data-invalid', 'true')

    rerender(<Checkbox label="Error" isInvalid />)
    expect(checkbox).toHaveAttribute('aria-invalid', 'true')
    expect(checkbox).toHaveAttribute('data-invalid', 'true')
  })

  it('preserves native form behavior for indeterminate checkboxes', () => {
    const { rerender } = render(
      <form data-testid="form">
        <Checkbox key="unchecked" name="feature" value="on" indeterminate aria-label="Feature" />
      </form>
    )

    const uncheckedFormData = new FormData(screen.getByTestId('form') as HTMLFormElement)
    expect(uncheckedFormData.has('feature')).toBe(false)

    rerender(
      <form data-testid="form">
        <Checkbox key="checked" name="feature" value="on" checked indeterminate onChange={() => {}} aria-label="Feature" />
      </form>
    )

    const checkedFormData = new FormData(screen.getByTestId('form') as HTMLFormElement)
    expect(checkedFormData.get('feature')).toBe('on')
  })

  it('provides inputRef while keeping forwarded ref on the wrapper', () => {
    const rootRef = React.createRef<HTMLDivElement>()
    const inputRef = React.createRef<HTMLInputElement>()

    render(<Checkbox ref={rootRef} inputRef={inputRef} aria-label="Refs" />)

    expect(rootRef.current).toBeInstanceOf(HTMLDivElement)
    expect(inputRef.current).toBeInstanceOf(HTMLInputElement)
    expect(rootRef.current?.querySelector('input')).toBe(inputRef.current)
  })

  it('applies data attributes for styling', async () => {
    const user = userEvent.setup()
    render(<Checkbox aria-label="Styled" />)
    const checkbox = screen.getByRole('checkbox')

    await user.tab()
    expect(checkbox).toHaveFocus()
    expect(checkbox).toHaveAttribute('data-focused', 'true')
  })

  it('updates data-selected when checked', async () => {
    const user = userEvent.setup()
    render(<Checkbox aria-label="Selection" />)
    const checkbox = screen.getByRole('checkbox')

    expect(checkbox).not.toHaveAttribute('data-selected')

    await user.click(checkbox)
    expect(checkbox).toHaveAttribute('data-selected', 'true')
  })

  it('forwards ref to wrapper', () => {
    const ref = React.createRef<HTMLDivElement>()
    render(<Checkbox ref={ref} aria-label="Ref Test" />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
    expect(ref.current?.querySelector('input[type="checkbox"]')).toBeInTheDocument()
  })

  it('applies style slots to the correct elements', () => {
    render(
      <Checkbox
        label="Styled slots"
        helper="Slot helper"
        defaultChecked
        styles={{
          root: 'custom-root',
          checkbox: 'custom-checkbox',
          'icon-checkmark': 'custom-checkmark',
          'icon-indeterminate': 'custom-indeterminate',
          label: 'custom-label',
          'helper-text': 'custom-helper',
        }}
      />
    )

    const checkbox = screen.getByRole('checkbox', { name: /styled slots/i })
    expect(checkbox.parentElement?.parentElement).toHaveClass('custom-root')
    expect(checkbox).toHaveClass('custom-checkbox')
    expect(document.querySelector('.custom-checkmark')).toBeInTheDocument()
    expect(screen.getByText('Styled slots')).toHaveClass('custom-label')
    expect(screen.getByText('Slot helper')).toHaveClass('custom-helper')
  })

  it('applies indeterminate icon slot', () => {
    render(
      <Checkbox
        aria-label="Styled indeterminate"
        indeterminate
        styles={{ 'icon-indeterminate': 'custom-indeterminate' }}
      />
    )

    expect(document.querySelector('.custom-indeterminate')).toBeInTheDocument()
  })
})
