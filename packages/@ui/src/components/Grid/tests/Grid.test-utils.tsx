import * as React from 'react'
import type { RenderResult } from '@testing-library/react'
import { render as utilRender } from '@/tests/utils'
import { Grid } from '../'
import styles from '../Grid.module.css'

function getDOMContainer(result: RenderResult | HTMLElement): HTMLElement {
  if ('container' in result) {
    return result.container
  }
  return result
}

export function renderGrid(
  props: React.ComponentProps<typeof Grid> = {},
  children: React.ReactNode = (
    <>
      <div>Cell 1</div>
      <div>Cell 2</div>
    </>
  )
): any {
  const result = utilRender(React.createElement(Grid, props, children))
  return Object.assign(result.container, result)
}

export function getGridRoot(container?: RenderResult | HTMLElement): HTMLDivElement | null {
  const domContainer = container ? getDOMContainer(container) : document.body
  return domContainer.querySelector(`.${styles.grid}`) as HTMLDivElement | null
}

export function getGridContainer(container?: RenderResult | HTMLElement): HTMLDivElement | null {
  const domContainer = container ? getDOMContainer(container) : document.body
  return domContainer.querySelector(`.${styles.container}`) as HTMLDivElement | null
}

