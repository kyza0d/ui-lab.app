import * as React from 'react'
import type { RenderResult } from '@testing-library/react'
import { render as utilRender, getElementByRole } from '@/tests/utils'
import { Button } from '../'

/**
 * Render a Button component
 */
export function renderButton(
  props: React.ComponentProps<typeof Button> = {},
  children: React.ReactNode = 'Button'
): any {
  const result = utilRender(React.createElement(Button, props, children))
  return Object.assign(result.container, result)
}

/**
 * Get the button element
 */
export function getButton(container?: RenderResult | HTMLElement): HTMLElement | null {
  const domContainer = container && 'container' in container ? container.container : container
  if (domContainer) {
    return domContainer.querySelector('button')
  }
  return getElementByRole('button')
}
