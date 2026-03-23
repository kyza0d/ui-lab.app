import { vi, expect } from 'vitest'
import type { MockCallbackSpy, StateTracker } from './types'

/**
 * Create a mock select item object
 */
function createMockSelectItem(overrides?: Partial<{
  key: string | number
  label: string
  value: string
  isDisabled: boolean
  icon?: React.ReactNode
}>) {
  const defaultKey = Math.random().toString(36).slice(2)
  return {
    key: overrides?.key ?? defaultKey,
    label: overrides?.label ?? `Item ${defaultKey}`,
    value: overrides?.value ?? defaultKey,
    isDisabled: overrides?.isDisabled ?? false,
    ...overrides,
  }
}

/**
 * Create an array of mock select items
 */
export function createMockSelectItems(
  count: number = 3,
  overrides?: Partial<ReturnType<typeof createMockSelectItem>>
) {
  return Array.from({ length: count }, (_, i) =>
    createMockSelectItem({
      key: `item-${i}`,
      label: `Option ${i + 1}`,
      value: `option-${i}`,
      ...overrides,
    })
  )
}

/**
 * Create a mock menu item object
 */
function createMockMenuItem(overrides?: Partial<{
  key: string | number
  label: string
  icon?: React.ReactNode
  isDisabled: boolean
  submenu?: any[]
}>) {
  const defaultKey = Math.random().toString(36).slice(2)
  return {
    key: overrides?.key ?? defaultKey,
    label: overrides?.label ?? `Menu Item ${defaultKey}`,
    isDisabled: overrides?.isDisabled ?? false,
    ...overrides,
  }
}

/**
 * Create an array of mock menu items
 */
export function createMockMenuItems(
  count: number = 3,
  overrides?: Partial<ReturnType<typeof createMockMenuItem>>
) {
  return Array.from({ length: count }, (_, i) =>
    createMockMenuItem({
      key: `menu-item-${i}`,
      label: `Menu Item ${i + 1}`,
      ...overrides,
    })
  )
}

/**
 * Create a spy callback function that tracks calls
 */
export function createSelectionCallback(): {
  callback: MockCallbackSpy
  calls: any[][]
} {
  const calls: any[][] = []

  const callback = vi.fn((...args) => {
    calls.push(args)
  }) as any

  callback.expectCalled = () => {
    expect(callback).toHaveBeenCalled()
  }

  callback.expectNotCalled = () => {
    expect(callback).not.toHaveBeenCalled()
  }

  callback.expectCalledWith = (...expectedArgs: any[]) => {
    expect(callback).toHaveBeenCalledWith(...expectedArgs)
  }

  callback.expectCalledTimes = (times: number) => {
    expect(callback).toHaveBeenCalledTimes(times)
  }

  callback.getLastCall = () => {
    return calls.length > 0 ? calls[calls.length - 1] : null
  }

  callback.getAllCalls = () => calls

  callback.clear = () => {
    callback.mockClear()
    calls.length = 0
  }

  return { callback, calls }
}

/**
 * Create a state tracker to monitor state changes over time
 */
function createStateTracker<T>(initialValue: T): StateTracker<T> {
  let current = initialValue
  let previous: T | null = null
  const history: T[] = [initialValue]

  return {
    get current() {
      return current
    },
    set current(value: T) {
      previous = current
      current = value
      history.push(value)
    },
    get previous() {
      return previous
    },
    get history() {
      return [...history]
    },
    get changed() {
      return previous !== null && previous !== current
    },
    hasChanged(predicate: (value: T) => boolean) {
      return history.some(predicate)
    },
    clear() {
      history.length = 0
      previous = null
      current = initialValue
    },
  }
}

/**
 * Mock scrollIntoView for testing scroll behavior
 */
function mockScrollIntoView() {
  const originalScrollIntoView = Element.prototype.scrollIntoView
  const scrollIntoViewCalls: Element[] = []

  Element.prototype.scrollIntoView = function () {
    scrollIntoViewCalls.push(this)
  }

  return {
    restore: () => {
      Element.prototype.scrollIntoView = originalScrollIntoView
    },
    getCalls: () => scrollIntoViewCalls,
    wasCalledWith: (element: Element) => {
      return scrollIntoViewCalls.includes(element)
    },
    clear: () => {
      scrollIntoViewCalls.length = 0
    },
  }
}

/**
 * Mock ResizeObserver for testing responsive behavior
 */
function mockResizeObserver() {
  const observedElements: Element[] = []
  let callback: ResizeObserverCallback | null = null

  class MockResizeObserver {
    constructor(cb: ResizeObserverCallback) {
      callback = cb
    }

    observe(element: Element) {
      observedElements.push(element)
    }

    unobserve(element: Element) {
      const index = observedElements.indexOf(element)
      if (index > -1) {
        observedElements.splice(index, 1)
      }
    }

    disconnect() {
      observedElements.length = 0
    }
  }

  const originalResizeObserver = window.ResizeObserver
  ;(window as any).ResizeObserver = MockResizeObserver

  return {
    restore: () => {
      window.ResizeObserver = originalResizeObserver
    },
    triggerResize: (entries: any[]) => {
      if (callback) {
        callback(entries as any, {} as any)
      }
    },
    getObservedElements: () => observedElements,
    clear: () => {
      observedElements.length = 0
    },
  }
}

/**
 * Create mock callback functions for tracking interactions
 */
function createMockCallbacks(names: string[]) {
  const callbacks: Record<string, any> = {}

  names.forEach((name) => {
    callbacks[name] = vi.fn()
  })

  return callbacks as Record<string, any>
}

/**
 * Create a mock data structure for testing
 */
function createMockData<T>(
  factory: (index: number) => T,
  count: number = 5
): T[] {
  return Array.from({ length: count }, (_, i) => factory(i))
}
