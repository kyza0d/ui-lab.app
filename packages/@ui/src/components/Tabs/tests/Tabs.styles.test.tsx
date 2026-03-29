import { render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi, afterEach } from 'vitest'
import { Tabs } from '../Tabs'

function createRect(left: number, top: number, width: number, height: number): DOMRect {
  return {
    x: left,
    y: top,
    left,
    top,
    width,
    height,
    right: left + width,
    bottom: top + height,
    toJSON: () => ({}),
  } as DOMRect
}

function renderTestTabs() {
  return (
    <Tabs default="portfolio">
      <Tabs.List
        styles={{
          root: 'px-2 space-x-4',
          indicator: 'bg-red-500 border-4 border-background-700 rounded-sm',
        }}
        aria-label="Portfolio sections"
      >
        <Tabs.Trigger value="portfolio">Portfolio</Tabs.Trigger>
        <Tabs.Trigger value="activity">Activity</Tabs.Trigger>
        <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="portfolio">Portfolio content</Tabs.Content>
      <Tabs.Content value="activity">Activity content</Tabs.Content>
      <Tabs.Content value="settings">Settings content</Tabs.Content>
    </Tabs>
  )
}

afterEach(() => {
  vi.restoreAllMocks()
})

describe('Tabs.styles', () => {
  it('renders the indicator slot classes in the SSR fallback markup', () => {
    const { renderToString } = require('react-dom/server')
    const html = renderToString(renderTestTabs())

    expect(html).toContain('bg-red-500')
    expect(html).toContain('border-4')
    expect(html).toContain('border-background-700')
    expect(html).toContain('rounded-sm')
    expect(html).toContain('data-indicator-fallback="true"')
  })

  it('renders the underline fallback flush with the trigger border box in SSR markup', () => {
    const { renderToString } = require('react-dom/server')
    const html = renderToString(
      <Tabs default="portfolio" variant="underline">
        <Tabs.List
          styles={{
            indicator: 'bg-red-500 border-4 border-background-700 rounded-sm',
          }}
          aria-label="Portfolio sections"
        >
          <Tabs.Trigger value="portfolio">Portfolio</Tabs.Trigger>
          <Tabs.Trigger value="activity">Activity</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="portfolio">Portfolio content</Tabs.Content>
        <Tabs.Content value="activity">Activity content</Tabs.Content>
      </Tabs>
    )

    expect(html).toContain('bottom:-2px')
    expect(html).toContain('height:2px')
    expect(html).toContain('data-indicator-fallback="true"')
  })

  it('hydrates with the measured indicator after the triggers so list spacing utilities do not reflow tabs', async () => {
    vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function (this: HTMLElement) {
      if (this.getAttribute('role') === 'tablist') {
        return createRect(0, 0, 260, 40)
      }

      switch (this.getAttribute('data-tabs-value')) {
        case 'portfolio':
          return createRect(8, 4, 88, 32)
        case 'activity':
          return createRect(112, 4, 76, 32)
        case 'settings':
          return createRect(204, 4, 84, 32)
        default:
          return createRect(0, 0, 0, 0)
      }
    })

    render(renderTestTabs())

    const tablist = screen.getByRole('tablist', { name: 'Portfolio sections' })
    const selectedTrigger = screen.getByRole('tab', { name: 'Portfolio' })

    await waitFor(() => {
      expect(tablist.lastElementChild).toHaveClass('bg-red-500')
    })

    expect(tablist.firstElementChild).toHaveAttribute('role', 'tab')
    expect(tablist.lastElementChild).toHaveClass(
      'bg-red-500',
      'border-4',
      'border-background-700',
      'rounded-sm'
    )
    expect(tablist.lastElementChild).toHaveAttribute('aria-hidden', 'true')
    expect(tablist.lastElementChild).toHaveStyle({
      left: '8px',
      top: '4px',
      width: '88px',
      height: '32px',
      margin: '0px',
    })
    expect(selectedTrigger).not.toHaveAttribute('data-indicator-fallback')
    expect(selectedTrigger.querySelector('.bg-red-500')).toBeNull()
  })
})
