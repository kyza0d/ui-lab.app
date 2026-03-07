import { it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import type { ElementType, ComponentProps } from 'react'
import React from 'react'
import { getElementByRole } from './queries'

/**
 * Test that a component forwards refs correctly
 */
export function testRefForwarding<T extends ElementType, E extends HTMLElement>(options: {
  component: T
  defaultProps?: ComponentProps<T>
  requiredProps?: ComponentProps<T>
  expectedElement: new () => E
  role?: string
}) {
  const { component: Component, defaultProps = {}, requiredProps = {}, expectedElement, role } = options

  it('forwards ref via callback', () => {
    const ref = vi.fn()
    render(React.createElement(Component as any, { ...(requiredProps as any), ...(defaultProps as any), ref }))
    expect(ref).toHaveBeenCalled()
    expect(ref.mock.calls[0][0]).toBeInstanceOf(expectedElement)
  })

  it('forwards ref via createRef', () => {
    const ref = React.createRef<E>()
    render(React.createElement(Component as any, { ...(requiredProps as any), ...(defaultProps as any), ref }))
    expect(ref.current).toBeInstanceOf(expectedElement)
  })
}

/**
 * Test that a component accepts and applies styling
 */
export function testStyling<T extends ElementType>(options: {
  component: T
  defaultProps?: ComponentProps<T>
  requiredProps?: ComponentProps<T>
  role?: string
  baseClassName?: string
  testId?: string
}) {
  const { component: Component, defaultProps = {}, requiredProps = {}, role, baseClassName, testId } = options

  it('accepts custom className', () => {
    render(React.createElement(Component as any, { ...(requiredProps as any), ...(defaultProps as any), className: 'custom-class' }))

    let element: HTMLElement | null = null
    if (role) {
      element = getElementByRole(role)
    } else if (testId) {
      element = screen.getByTestId(testId)
    } else if ((defaultProps as any)['data-testid']) {
      element = screen.getByTestId((defaultProps as any)['data-testid'])
    }

    if (element) {
      expect(element).toHaveClass('custom-class')
      if (baseClassName) {
        expect(element).toHaveClass(baseClassName)
      }
    }
  })

  it('accepts inline styles', () => {
    render(React.createElement(Component as any, { ...(requiredProps as any), ...(defaultProps as any), style: { marginTop: '10px' } }))

    let element: HTMLElement | null = null
    if (role) {
      element = getElementByRole(role)
    } else if (testId) {
      element = screen.getByTestId(testId)
    } else if ((defaultProps as any)['data-testid']) {
      element = screen.getByTestId((defaultProps as any)['data-testid'])
    }

    if (element) {
      expect(element).toHaveStyle({ marginTop: '10px' })
    }
  })
}
