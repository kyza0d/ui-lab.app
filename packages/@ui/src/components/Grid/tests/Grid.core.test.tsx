import { describe, expect, it } from 'vitest'
import { Grid } from '../'
import { renderGrid, getGridRoot } from './Grid.test-utils'
import styles from '../Grid.module.css'
import { testRefForwarding } from '@/tests/utils'

describe('Grid.core', () => {
  it('renders children with default grid variables on the root element', () => {
    const container = renderGrid()
    const grid = getGridRoot(container)

    expect(grid).toBeInTheDocument()
    expect(grid).toHaveTextContent('Cell 1')
    expect(grid).toHaveTextContent('Cell 2')
    expect(grid).toHaveStyle({
      '--grid-tpl': 'repeat(3, 1fr)',
      '--grid-rows': 'auto',
      '--grid-gap': 'calc(var(--spacing, 0.25rem) * 4)',
      '--grid-ji': 'stretch',
      '--grid-ai': 'stretch',
      '--grid-jc': 'start',
      '--grid-ac': 'start',
      '--grid-flow': 'row',
    })
  })

  it('maps layout props to CSS custom properties', () => {
    const container = renderGrid({
      columns: 'auto-fit',
      rows: '6',
      gap: 'lg',
      rowGap: 'xs',
      columnGap: 'xl',
      justifyItems: 'center',
      alignItems: 'baseline',
      justifyContent: 'space-between',
      alignContent: 'space-evenly',
      autoFlow: 'column-dense',
    })
    const grid = getGridRoot(container)

    expect(grid).toHaveStyle({
      '--grid-tpl': 'repeat(auto-fit, minmax(200px, 1fr))',
      '--grid-rows': 'repeat(6, auto)',
      '--grid-gap': 'calc(var(--spacing, 0.25rem) * 6)',
      '--grid-row-gap': 'calc(var(--spacing, 0.25rem) * 1)',
      '--grid-col-gap': 'calc(var(--spacing, 0.25rem) * 8)',
      '--grid-ji': 'center',
      '--grid-ai': 'baseline',
      '--grid-jc': 'space-between',
      '--grid-ac': 'space-evenly',
      '--grid-flow': 'column dense',
    })
    expect(grid).toHaveClass(styles['has-row-gap'])
    expect(grid).toHaveClass(styles['has-col-gap'])
  })

  it('passes custom grid-template-columns values through unchanged', () => {
    const container = renderGrid({
      columns: '760px 1fr',
    })
    const grid = getGridRoot(container)

    expect(grid).toHaveStyle({
      '--grid-tpl': '760px 1fr',
    })
  })

  it('supports non-numeric row templates like masonry', () => {
    const container = renderGrid({ rows: 'masonry' })
    const grid = getGridRoot(container)

    expect(grid).toHaveStyle({
      '--grid-rows': 'masonry',
    })
  })

  it('applies className, inline style, styles.root, and native HTML attributes to the root grid', () => {
    const container = renderGrid({
      className: 'custom-grid',
      style: { marginTop: '12px' },
      styles: { root: 'slot-root' },
      id: 'grid-id',
      'data-testid': 'grid-root',
      title: 'Grid title',
    })
    const grid = getGridRoot(container)

    expect(grid).toHaveClass(styles.grid)
    expect(grid).toHaveClass('custom-grid')
    expect(grid).toHaveClass('slot-root')
    expect(grid).toHaveAttribute('id', 'grid-id')
    expect(grid).toHaveAttribute('data-testid', 'grid-root')
    expect(grid).toHaveAttribute('title', 'Grid title')
    expect(grid).toHaveStyle({ marginTop: '12px' })
  })

  testRefForwarding({
    component: Grid,
    expectedElement: HTMLDivElement,
  })
})
