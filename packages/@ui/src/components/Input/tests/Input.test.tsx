import * as React from 'react'
import { describe, it, expect, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import { Input } from '../Input'
import { Button } from '@/components/Button'

const CopyIcon = () => <svg data-testid="copy-icon" />

describe('Input actions', () => {
  it('renders hint content in a badge on the right side of the input', () => {
    const { container } = render(
      <Input aria-label="Search" hint="Ctrl+K" />
    )

    expect(screen.getByText('Ctrl+K')).toBeInTheDocument()
    expect(container.querySelector('[data-end-adornments] [data-hint]')).toBeInTheDocument()
  })

  it('renders shorthand icon as the prefix icon', () => {
    const { container } = render(
      <Input aria-label="Search" icon={<CopyIcon />} />
    )

    expect(screen.getByTestId('copy-icon')).toBeInTheDocument()
    expect(container.querySelector('[data-start-adornments] [data-testid="copy-icon"]')).toBeInTheDocument()
  })

  it('renders suffix icon when provided via the icon slots object', () => {
    const { container } = render(
      <Input aria-label="Search" icon={{ suffix: <CopyIcon /> }} />
    )

    expect(screen.getByTestId('copy-icon')).toBeInTheDocument()
    expect(container.querySelector('[data-end-adornments] [data-testid="copy-icon"]')).toBeInTheDocument()
  })

  it('renders no actions container when actions is not provided', () => {
    const { container } = render(<Input aria-label="Search" />)

    expect(container.querySelector('[data-actions]')).not.toBeInTheDocument()
  })

  it('renders action defs on the right side of the input', () => {
    const { container } = render(
      <Input
        aria-label="Search"
        actions={[{ icon: <CopyIcon />, title: 'Copy' }]}
      />
    )

    expect(container.querySelector('[data-actions-position="right"]')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Copy' })).toBeInTheDocument()
    expect(screen.getByTestId('copy-icon')).toBeInTheDocument()
  })

  it('renders action defs on the left side of the input', () => {
    const { container } = render(
      <Input
        aria-label="Search"
        actions={{ left: [{ icon: <CopyIcon />, title: 'Copy' }] }}
      />
    )

    expect(container.querySelector('[data-actions-position="left"]')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Copy' })).toBeInTheDocument()
  })

  it('calls onClick for action defs', () => {
    const onClick = vi.fn()

    render(
      <Input
        aria-label="Search"
        actions={[{ icon: <CopyIcon />, title: 'Copy', onClick }]}
      />
    )

    fireEvent.click(screen.getByRole('button', { name: 'Copy' }))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('renders custom action nodes', () => {
    render(
      <Input
        aria-label="Search"
        actions={[
          <Button key="copy" icon={<CopyIcon />}>
            Copy
          </Button>,
        ]}
      />
    )

    expect(screen.getByRole('button', { name: 'Copy' })).toBeInTheDocument()
  })

  it('renders mixed action defs and custom nodes', () => {
    render(
      <Input
        aria-label="Search"
        actions={{
          left: [{ icon: <CopyIcon />, title: 'Copy' }],
          right: [<button key="clear" type="button">Clear</button>],
        }}
      />
    )

    expect(screen.getByRole('button', { name: 'Copy' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Clear' })).toBeInTheDocument()
  })

  it('adds inline end padding when actions are rendered', () => {
    render(
      <Input
        aria-label="Search"
        actions={[{ icon: <CopyIcon />, title: 'Copy' }]}
      />
    )

    expect(screen.getByRole('textbox')).toHaveStyle({ paddingRight: '8px' })
  })

  it('adds inline start padding when left actions are rendered', () => {
    render(
      <Input
        aria-label="Search"
        actions={{ left: [{ icon: <CopyIcon />, title: 'Copy' }] }}
      />
    )

    expect(screen.getByRole('textbox')).toHaveStyle({ paddingLeft: '8px' })
  })

  it('adds inline end padding when hint is rendered', () => {
    render(
      <Input aria-label="Search" hint="Ctrl+K" />
    )

    expect(screen.getByRole('textbox')).toHaveStyle({ paddingRight: '8px' })
  })
})
