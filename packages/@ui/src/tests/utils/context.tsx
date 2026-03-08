import React, { ReactElement } from 'react'
import { RenderResult } from '@testing-library/react'
import { render } from './render'
import type { RenderOptions, ContextTestOptions } from './types'

/**
 * Create a mock context value with optional overrides
 */
export function createMockContextValue<T>(
  defaultValue: T,
  overrides?: Partial<T>
): T {
  return {
    ...defaultValue,
    ...(overrides || {}),
  }
}

/**
 * Render a component with a specific context value
 */
export function renderWithContext<T>(
  Context: React.Context<T>,
  ui: ReactElement,
  contextValue: T,
  options?: RenderOptions
): RenderResult {
  const Provider = ({ children }: { children: React.ReactNode }) => (
    <Context.Provider value={contextValue}>{children}</Context.Provider>
  )

  return render(ui, {
    ...options,
    wrappers: [Provider],
  })
}

/**
 * Render a component with multiple context providers
 */
export function renderWithContexts<_T extends Record<string, any>>(
  ui: ReactElement,
  contexts: Array<{
    Context: React.Context<any>
    value: any
  }>,
  options?: RenderOptions
): RenderResult {
  const Provider: React.ComponentType<{ children: React.ReactNode }> = ({ children }) => {
    let result: React.ReactNode = children

    // Apply providers in reverse order for proper nesting
    for (let i = contexts.length - 1; i >= 0; i--) {
      const { Context, value } = contexts[i]
      result = (
        <Context.Provider value={value} key={`context-${i}`}>
          {result}
        </Context.Provider>
      )
    }

    return <>{result}</>
  }

  return render(ui, {
    ...options,
    wrappers: [Provider],
  })
}

/**
 * Test component behavior with different context values
 */
export async function testContextDependency<T>(
  Component: React.ComponentType<any>,
  Context: React.Context<T>,
  testCases: Array<{
    name: string
    contextValue: T
    assertion: (element: HTMLElement) => void
  }>,
  defaultProps?: any,
  _options?: ContextTestOptions
) {
  const results = []

  for (const testCase of testCases) {
    const { container } = renderWithContext(
      Context,
      <Component {...defaultProps} />,
      testCase.contextValue,
      { container: document.createElement('div') }
    )

    try {
      testCase.assertion(container as HTMLElement)
      results.push({
        name: testCase.name,
        passed: true,
      })
    } catch (error) {
      results.push({
        name: testCase.name,
        passed: false,
        error,
      })
    }
  }

  return results
}

/**
 * Helper to wait for context value to change
 */
export async function waitForContextChange<T>(
  getContextValue: () => T,
  predicate: (value: T) => boolean,
  options?: ContextTestOptions
) {
  const timeout = options?.timeout ?? 1000
  const startTime = Date.now()

  return new Promise((resolve, reject) => {
    const checkValue = () => {
      try {
        const value = getContextValue()
        if (predicate(value)) {
          resolve(value)
          return
        }
      } catch (e) {
        // Context not yet available
      }

      if (Date.now() - startTime > timeout) {
        reject(new Error(`Timeout waiting for context value after ${timeout}ms`))
        return
      }

      requestAnimationFrame(checkValue)
    }

    checkValue()
  })
}
