import * as React from 'react'
import type { RenderResult } from '@testing-library/react'
import { render as utilRender, getElementByRole } from '@/tests/utils'
import { Checkbox } from '../'

/**
 * Render a Checkbox component
 */
export function renderCheckbox(
  props: React.ComponentProps<typeof Checkbox> = {}
): any {
  const result = utilRender(React.createElement(Checkbox, props))
  return Object.assign(result.container, result)
}

/**
 * Get the checkbox element
 */
export function getCheckbox(container?: RenderResult | HTMLElement): HTMLElement | null {
  const domContainer = container && 'container' in container ? container.container : container
  if (domContainer) {
    return domContainer.querySelector('[role="checkbox"]')
  }
  return getElementByRole('checkbox')
}
