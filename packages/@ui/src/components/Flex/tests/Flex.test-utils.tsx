import * as React from 'react'
import type { RenderResult } from '@testing-library/react'
import { render as utilRender } from '@/tests/utils'
import { Flex } from '../'
import styles from '../Flex.module.css'

function getDOMContainer(result: RenderResult | HTMLElement): HTMLElement {
  if ('container' in result) {
    return result.container
  }
  return result
}

export function renderFlex(
  props: React.ComponentProps<typeof Flex> = {},
  children: React.ReactNode = (
    <>
      <div>Item 1</div>
      <div>Item 2</div>
    </>
  )
): any {
  const result = utilRender(React.createElement(Flex, props, children))
  return Object.assign(result.container, result)
}

export function getFlexRoot(container?: RenderResult | HTMLElement): HTMLDivElement | null {
  const domContainer = container ? getDOMContainer(container) : document.body
  return domContainer.querySelector(`.${styles.flex}`) as HTMLDivElement | null
}

export function getFlexContainer(container?: RenderResult | HTMLElement): HTMLDivElement | null {
  const domContainer = container ? getDOMContainer(container) : document.body
  return domContainer.querySelector(`.${styles['container-query-parent']}`) as HTMLDivElement | null
}
