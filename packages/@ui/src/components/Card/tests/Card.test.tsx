import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Card } from '../Card'
import styles from '../Card.module.css'

describe('Card', () => {
  it('applies variant and slot classNames while preserving styles prop behavior', () => {
    const { container } = render(
      <Card
        variant="ghost"
        className="custom-root"
        styles={{
          root: {
            className: 'slot-root',
            style: {
              ['--background' as string]: 'transparent',
            },
          },
          header: {
            className: 'slot-header',
          },
          body: {
            className: 'slot-body',
            style: {
              paddingTop: '24px',
            },
          },
          footer: {
            className: 'slot-footer',
          },
        }}
      >
        <Card.Header>Header content</Card.Header>
        <Card.Body>Body content</Card.Body>
        <Card.Footer>Footer content</Card.Footer>
      </Card>
    )

    const root = container.firstElementChild as HTMLElement
    const header = container.querySelector(`.${styles.header}`) as HTMLElement
    const body = container.querySelector(`.${styles.body}`) as HTMLElement
    const footer = container.querySelector(`.${styles.footer}`) as HTMLElement

    expect(root).toHaveClass(styles.card)
    expect(root).toHaveClass('ghost')
    expect(root).toHaveClass('custom-root')
    expect(root).toHaveClass('slot-root')
    expect(root).toHaveStyle({ '--background': 'transparent' })
    expect(header).toHaveClass(styles.header)
    expect(header).toHaveClass('ghost')
    expect(header).toHaveClass('slot-header')
    expect(body).toHaveClass(styles.body)
    expect(body).toHaveClass('ghost')
    expect(body).toHaveClass('slot-body')
    expect(body).toHaveStyle({ paddingTop: '24px' })
    expect(footer).toHaveClass(styles.footer)
    expect(footer).toHaveClass('ghost')
    expect(footer).toHaveClass('slot-footer')
  })
})
