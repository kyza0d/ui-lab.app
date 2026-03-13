import { describe, expect, it } from 'vitest'
import { Flex } from '../'
import { renderFlex, getFlexRoot } from './Flex.test-utils'
import styles from '../Flex.module.css'
import { testRefForwarding } from '@/tests/utils'

describe('Flex.core', () => {
  it('renders children with default flex data attributes on the root element', () => {
    const container = renderFlex()
    const flex = getFlexRoot(container)

    expect(flex).toBeInTheDocument()
    expect(flex).toHaveTextContent('Item 1')
    expect(flex).toHaveTextContent('Item 2')
    expect(flex).toHaveAttribute('data-direction', 'row')
    expect(flex).toHaveAttribute('data-wrap', 'nowrap')
    expect(flex).toHaveAttribute('data-gap', 'md')
    expect(flex).toHaveAttribute('data-justify', 'flex-start')
    expect(flex).toHaveAttribute('data-align', 'stretch')
    expect(flex).not.toHaveAttribute('data-container-responsive')
  })

  it('maps layout props to root data attributes and variant classes', () => {
    const container = renderFlex({
      direction: 'column',
      wrap: 'wrap',
      gap: 'xl',
      justify: 'space-between',
      align: 'baseline',
    })
    const flex = getFlexRoot(container)

    expect(flex).toHaveAttribute('data-direction', 'column')
    expect(flex).toHaveAttribute('data-wrap', 'wrap')
    expect(flex).toHaveAttribute('data-gap', 'xl')
    expect(flex).toHaveAttribute('data-justify', 'space-between')
    expect(flex).toHaveAttribute('data-align', 'baseline')
    expect(flex).toHaveClass(styles.column)
    expect(flex).toHaveClass(styles.wrap)
    expect(flex).toHaveClass(styles['gap-xl'])
    expect(flex).toHaveClass(styles['justify-space-between'])
    expect(flex).toHaveClass(styles['align-baseline'])
  })

  it('applies className, inline style, styles.root, and native HTML attributes to the root flex element', () => {
    const container = renderFlex({
      className: 'custom-flex',
      style: { marginTop: '12px' },
      styles: { root: 'slot-root' },
      id: 'flex-id',
      'data-testid': 'flex-root',
      title: 'Flex title',
    })
    const flex = getFlexRoot(container)

    expect(flex).toHaveClass(styles.flex)
    expect(flex).toHaveClass('custom-flex')
    expect(flex).toHaveClass('slot-root')
    expect(flex).toHaveAttribute('id', 'flex-id')
    expect(flex).toHaveAttribute('data-testid', 'flex-root')
    expect(flex).toHaveAttribute('title', 'Flex title')
    expect(flex).toHaveStyle({ marginTop: '12px' })
  })

  it('accepts root styles passed as a cn()-compatible array', () => {
    const container = renderFlex({
      styles: ['slot-root', false, undefined, 'slot-root-2'],
    })
    const flex = getFlexRoot(container)

    expect(flex).toHaveClass('slot-root')
    expect(flex).toHaveClass('slot-root-2')
  })

  testRefForwarding({
    component: Flex,
    expectedElement: HTMLDivElement,
  })
})
