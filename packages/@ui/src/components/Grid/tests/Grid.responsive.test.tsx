import * as React from 'react'
import { describe, expect, it } from 'vitest'
import { renderGrid, getGridContainer, getGridRoot } from './Grid.test-utils'
import styles from '../Grid.module.css'

describe('Grid.responsive', () => {
  it('wraps the grid in a container when responsive columns are provided', () => {
    const container = renderGrid({
      columns: { sm: '1', md: '2', lg: '4', xl: 'auto-fill' },
      className: 'outer-grid',
      styles: { root: 'slot-root' },
      style: { marginTop: '24px' },
      id: 'responsive-grid',
    })
    const wrapper = getGridContainer(container)
    const grid = getGridRoot(container)

    expect(wrapper).toBeInTheDocument()
    expect(grid).toBeInTheDocument()
    expect(wrapper).toHaveClass(styles.container)
    expect(wrapper).toHaveClass('outer-grid')
    expect(wrapper).toHaveClass('slot-root')
    expect(wrapper).toHaveAttribute('id', 'responsive-grid')
    expect(wrapper).toHaveStyle({ marginTop: '24px' })

    expect(grid).toHaveClass(styles.grid)
    expect(grid).toHaveClass(styles['responsive-cols'])
    expect(grid).toHaveStyle({
      '--grid-tpl-sm': 'repeat(1, 1fr)',
      '--grid-tpl-md': 'repeat(2, 1fr)',
      '--grid-tpl-lg': 'repeat(4, 1fr)',
      '--grid-tpl-xl': 'repeat(auto-fill, minmax(200px, 1fr))',
    })
  })

  it('wraps the grid when responsive rows or gaps are provided and applies the matching classes', () => {
    const container = renderGrid({
      rows: { sm: '1', md: 'auto', lg: 'masonry' },
      gap: { sm: 'xs', md: 'md', xl: 'xl' },
    })
    const wrapper = getGridContainer(container)
    const grid = getGridRoot(container)

    expect(wrapper).toBeInTheDocument()
    expect(grid).toHaveClass(styles['responsive-rows'])
    expect(grid).toHaveClass(styles['responsive-gap'])
    expect(grid).toHaveStyle({
      '--grid-rows-sm': 'repeat(1, auto)',
      '--grid-rows-md': 'auto',
      '--grid-rows-lg': 'masonry',
      '--grid-gap-sm': 'calc(var(--spacing, 0.25rem) * 1)',
      '--grid-gap-md': 'calc(var(--spacing, 0.25rem) * 4)',
      '--grid-gap-xl': 'calc(var(--spacing, 0.25rem) * 8)',
    })
  })

  it('wraps the grid when containerQueryResponsive is enabled even without responsive props', () => {
    const container = renderGrid({ containerQueryResponsive: true })

    expect(getGridContainer(container)).toBeInTheDocument()
    expect(getGridRoot(container)).toBeInTheDocument()
  })

  it('forwards the ref to the outer wrapper in responsive mode', () => {
    const ref = React.createRef<HTMLDivElement>()

    renderGrid({
      ref,
      columns: { sm: '1', md: '2' },
    })

    expect(ref.current).toBeInstanceOf(HTMLDivElement)
    expect(ref.current).toHaveClass(styles.container)
  })
})
