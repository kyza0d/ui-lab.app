import React, { ReactElement } from 'react'
import { render as rtlRender, RenderOptions as RTLRenderOptions, RenderResult } from '@testing-library/react'
import type { RenderOptions } from './types'

/**
 * Default provider wrapper for tests
 * Wraps components with necessary context and theme providers
 */
function DefaultWrapper({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

/**
 * Custom render function that includes providers
 * Usage: render(<MyComponent />, { skipProviders: false })
 */
export function render(
  ui: ReactElement,
  options?: RenderOptions
): RenderResult {
  const { skipProviders = false, wrappers, ...rtlOptions } = options || {}

  let Wrapper: React.ComponentType<{ children: React.ReactNode }> = DefaultWrapper

  if (!skipProviders && wrappers && wrappers.length > 0) {
    // Compose multiple wrappers
    Wrapper = ({ children }: { children: React.ReactNode }) => {
      let result: React.ReactNode = children

      // Apply wrappers in reverse order so first wrapper is outermost
      for (let i = wrappers.length - 1; i >= 0; i--) {
        const WrapperComponent = wrappers[i]
        result = <WrapperComponent>{result}</WrapperComponent>
      }

      return <DefaultWrapper>{result}</DefaultWrapper>
    }
  }

  return rtlRender(ui, {
    ...(rtlOptions as RTLRenderOptions),
    wrapper: Wrapper,
  })
}

/**
 * Get the rendered component's root element
 */
function getRootElement(renderResult: ReturnType<typeof render>) {
  return renderResult.container.firstChild as HTMLElement | null
}

/**
 * Rerender a component with new props
 */
async function rerenderComponent(
  renderResult: ReturnType<typeof render>,
  ui: ReactElement
) {
  renderResult.rerender(ui)
}
