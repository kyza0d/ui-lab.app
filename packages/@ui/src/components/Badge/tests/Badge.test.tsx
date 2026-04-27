import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import { Badge } from '../Badge'
import { auditA11y, testRefForwarding } from '@/tests/utils'
import { render } from '@/tests/utils'

describe('Badge - Accessibility', () => {
  it('has no accessibility violations', async () => {
    const { container } = render(
      <Badge dismissible onDismiss={() => {}}>
        Badge
      </Badge>
    )

    await auditA11y(container)
  })
})

describe('Badge - Ref Forwarding', () => {
  testRefForwarding({
    component: Badge,
    defaultProps: { children: 'Badge' },
    expectedElement: HTMLSpanElement,
  })
})

describe('Badge - Variants', () => {
  it('applies the variant class to the root and named slots', () => {
    const { container } = render(
      <Badge variant="ghost" icon={<span data-testid="badge-icon" />} dismissible onDismiss={() => {}}>
        Badge
      </Badge>
    )

    const root = container.firstElementChild as HTMLElement
    const icon = root.querySelector('.icon') as HTMLElement
    const dismiss = screen.getByRole('button', { name: /dismiss/i })

    expect(root).toHaveClass('ghost')
    expect(icon).toHaveClass('ghost')
    expect(dismiss).toHaveClass('ghost')
  })

  it('accepts custom variant strings as root classes', () => {
    const { container } = render(<Badge variant="my-custom-variant">Badge</Badge>)
    const root = container.firstElementChild as HTMLElement

    expect(root).toHaveClass('my-custom-variant')
  })
})

describe('Badge - Styling', () => {
  it('preserves styles prop behavior across the root and slots', () => {
    const { container } = render(
      <Badge
        variant="ghost"
        icon={<span data-testid="badge-icon" />}
        dismissible
        onDismiss={() => {}}
        styles={{
          root: 'custom-root',
          icon: 'custom-icon',
          dismiss: 'custom-dismiss',
        }}
      >
        Badge
      </Badge>
    )

    const root = container.firstElementChild as HTMLElement
    const icon = root.querySelector('.icon') as HTMLElement
    const dismiss = screen.getByRole('button', { name: /dismiss/i })

    expect(root).toHaveClass('ghost')
    expect(root).toHaveClass('custom-root')
    expect(icon).toHaveClass('ghost')
    expect(icon).toHaveClass('custom-icon')
    expect(dismiss).toHaveClass('ghost')
    expect(dismiss).toHaveClass('custom-dismiss')
  })
})
