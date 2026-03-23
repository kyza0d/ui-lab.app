import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from '../Button'
import {
  testRefForwarding,
  testStyling,
  testButtonA11y,
  clickElement,
  pressEnter,
  auditA11y,
} from '@/tests/utils'

describe('Button - Accessibility', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(<Button>Click me</Button>)
    await auditA11y(container)
  })

  it('renders with correct role', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('accepts aria-label', async () => {
    const { container } = render(<Button aria-label="Custom Label" />)
    expect(screen.getByRole('button', { name: /custom label/i })).toBeInTheDocument()
    await auditA11y(container)
  })

  it('is accessible with all variants', async () => {
    const variants = ['primary', 'secondary', 'outline', 'ghost']
    for (const variant of variants) {
      const { container, unmount } = render(
        <Button variant={variant as any}>Button</Button>
      )
      await auditA11y(container)
      unmount()
    }
  })

  it('is accessible with all sizes', async () => {
    const sizes = ['sm', 'md', 'lg']
    for (const size of sizes) {
      const { container, unmount } = render(
        <Button size={size as any}>Button</Button>
      )
      await auditA11y(container)
      unmount()
    }
  })
})

describe('Button - Interactions', () => {
  it('calls onClick when clicked', async () => {
    const onClick = vi.fn()
    const user = userEvent.setup()
    render(<Button onClick={onClick}>Click me</Button>)

    await user.click(screen.getByRole('button'))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('responds to Enter key', async () => {
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Click me</Button>)

    const button = screen.getByRole('button')
    await pressEnter(button)
    expect(onClick).toHaveBeenCalledOnce()
  })

  it('does not call onClick when disabled', async () => {
    const onClick = vi.fn()
    const user = userEvent.setup()
    render(
      <Button isDisabled onClick={onClick}>
        Click me
      </Button>
    )

    const button = screen.getByRole('button')
    await user.click(button)
    expect(onClick).not.toHaveBeenCalled()
  })
})

describe('Button - Ref Forwarding', () => {
  testRefForwarding({
    component: Button,
    defaultProps: { children: 'Button' },
    expectedElement: HTMLButtonElement,
  })
})

describe('Button - Styling', () => {
  testStyling({
    component: Button,
    defaultProps: { children: 'Button' },
    role: 'button',
  })
})

describe('Button - Component Specific', () => {
  it('accepts a React node shorthand for a left icon', () => {
    render(
      <Button icon={<svg data-testid="shorthand-icon" />}>
        Hello
      </Button>
    )

    expect(screen.getByTestId('shorthand-icon')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Hello' })).toBeInTheDocument()
  })

  it('renders an anchor target when href is provided', () => {
    render(
      <Button href="https://example.com" target="_blank">
        Visit
      </Button>
    )

    const link = screen.getByRole('link', { name: 'Visit' })
    expect(link).toHaveAttribute('href', 'https://example.com')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('preserves an explicit rel on the anchor variant', () => {
    render(
      <Button href="https://example.com" target="_blank" rel="external">
        Visit
      </Button>
    )

    expect(screen.getByRole('link', { name: 'Visit' })).toHaveAttribute('rel', 'external')
  })

  it('tracks press state via data-pressed', async () => {
    const user = userEvent.setup()
    render(<Button>Press Me</Button>)
    const button = screen.getByRole('button')

    await user.pointer({ keys: '[MouseLeft>]', target: button })
    expect(button).toHaveAttribute('data-pressed', 'true')

    await user.pointer({ keys: '[MouseLeft]', target: button })
    expect(button).toHaveAttribute('data-pressed', 'false')
  })

  it('tracks hover state via data-hovered', async () => {
    const user = userEvent.setup()
    render(<Button>Hover Me</Button>)
    const button = screen.getByRole('button')

    await user.hover(button)
    expect(button).toHaveAttribute('data-hovered', 'true')

    await user.unhover(button)
    expect(button).toHaveAttribute('data-hovered', 'false')
  })

  it('tracks focus-visible state', async () => {
    const user = userEvent.setup()
    render(<Button>Focus Me</Button>)
    const button = screen.getByRole('button')

    await user.tab()
    expect(button).toHaveAttribute('data-focus-visible', 'true')
  })

  it('respects isDisabled prop', () => {
    render(<Button isDisabled>Disabled</Button>)
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
    expect(button).toHaveAttribute('data-disabled', 'true')
  })

  it('renders a custom variant string as a root class', () => {
    render(<Button variant="my-custom-variant">Custom</Button>)
    expect(screen.getByRole('button', { name: 'Custom' })).toHaveClass('my-custom-variant')
  })

  it('renders a custom size string as a root class', () => {
    render(<Button size="compact">Custom</Button>)
    expect(screen.getByRole('button', { name: 'Custom' })).toHaveClass('compact')
  })
})
