import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
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

  it('is accessible with all size variants', async () => {
    const sizes = ['sm', 'md', 'lg']
    for (const size of sizes) {
      const { container, unmount } = render(
        <Checkbox size={size as any} aria-label="Test" />
      )
      await auditA11y(container)
      unmount()
    }
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
    render(<Checkbox aria-label="Focusable" />)

    const checkbox = screen.getByRole('checkbox')
    await user.tab()
    expect(checkbox).toHaveFocus()
    expect(checkbox).toHaveAttribute('data-focused', 'true')
  })

  it('supports indeterminate state', () => {
    render(<Checkbox isIndeterminate aria-label="Indeterminate" />)
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).toHaveAttribute('data-indeterminate', 'true')
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

  it('renders helper text', () => {
    render(<Checkbox label="Label" helperText="Helper text" />)
    expect(screen.getByText('Helper text')).toBeInTheDocument()
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
    expect(helper).toBeInTheDocument()
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
})
