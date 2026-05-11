import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Popover } from '../Popover'
import styles from '../Popover.module.css'

describe('Popover', () => {
  it('applies trigger, root, and content slot styles through the styles prop', () => {
    render(
      <Popover
        content={<div>Popover content</div>}
        isOpen
        className="custom-trigger"
        styles={{ root: 'slot-root', trigger: 'slot-trigger', content: 'slot-content', frame: 'slot-frame' }}
      >
        <button type="button">Open popover</button>
      </Popover>
    )

    const trigger = screen.getByRole('button', { name: 'Open popover' })
    const frame = screen.getByText('Popover content').closest('.frame')
    const content = frame?.closest('.content')
    const root = content?.parentElement

    expect(trigger).toHaveClass(styles.trigger)
    expect(trigger).toHaveClass('custom-trigger')
    expect(trigger).toHaveClass('slot-trigger')
    expect(root).toHaveClass(styles.root)
    expect(root).toHaveClass('slot-root')
    expect(content).toHaveClass('slot-content')
    expect(frame).toHaveClass('slot-frame')
  })
})
