import * as React from 'react'
import { describe, expect, it } from 'vitest'
import { renderFlex, getFlexContainer, getFlexRoot } from './Flex.test-utils'
import styles from '../Flex.module.css'

describe('Flex.responsive', () => {
  it('wraps the flex root in a container-query parent when containerQueryResponsive is enabled', () => {
    const container = renderFlex({
      containerQueryResponsive: true,
      className: 'outer-flex',
      styles: { root: 'slot-root' },
      style: { marginTop: '24px' },
      id: 'responsive-flex',
      title: 'Responsive flex',
    })
    const wrapper = getFlexContainer(container)
    const flex = getFlexRoot(container)

    expect(wrapper).toBeInTheDocument()
    expect(flex).toBeInTheDocument()

    expect(wrapper).toHaveClass(styles['container-query-parent'])
    expect(wrapper).toHaveClass('outer-flex')
    expect(wrapper).toHaveClass('slot-root')
    expect(wrapper).toHaveAttribute('data-container-responsive', 'true')
    expect(wrapper).toHaveAttribute('id', 'responsive-flex')
    expect(wrapper).toHaveAttribute('title', 'Responsive flex')
    expect(wrapper).toHaveStyle({ marginTop: '24px' })

    expect(flex).toHaveClass(styles.flex)
    expect(flex).toHaveClass(styles['container-responsive'])
    expect(flex).toHaveAttribute('data-direction', 'row')
    expect(flex).toHaveAttribute('data-wrap', 'nowrap')
    expect(flex).toHaveAttribute('data-gap', 'md')
    expect(flex).toHaveAttribute('data-justify', 'flex-start')
    expect(flex).toHaveAttribute('data-align', 'stretch')
  })

  it('keeps layout data attributes and variant classes on the inner flex element in responsive mode', () => {
    const container = renderFlex({
      containerQueryResponsive: true,
      direction: 'column',
      wrap: 'wrap',
      gap: 'lg',
      justify: 'space-around',
      align: 'center',
    })
    const wrapper = getFlexContainer(container)
    const flex = getFlexRoot(container)

    expect(wrapper).not.toHaveAttribute('data-direction')
    expect(flex).toHaveAttribute('data-direction', 'column')
    expect(flex).toHaveAttribute('data-wrap', 'wrap')
    expect(flex).toHaveAttribute('data-gap', 'lg')
    expect(flex).toHaveAttribute('data-justify', 'space-around')
    expect(flex).toHaveAttribute('data-align', 'center')
    expect(flex).toHaveClass(styles.column)
    expect(flex).toHaveClass(styles.wrap)
    expect(flex).toHaveClass(styles['gap-lg'])
    expect(flex).toHaveClass(styles['justify-space-around'])
    expect(flex).toHaveClass(styles['align-center'])
  })

  it('forwards the ref to the outer wrapper in responsive mode', () => {
    const ref = React.createRef<HTMLDivElement>()

    renderFlex({
      ref,
      containerQueryResponsive: true,
    })

    expect(ref.current).toBeInstanceOf(HTMLDivElement)
    expect(ref.current).toHaveClass(styles['container-query-parent'])
  })
})
