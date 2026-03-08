import { describe, it, expect } from 'vitest'
import * as React from 'react'
import { render as rtlRender } from '@testing-library/react'
import { renderSelectWithItems, getSelectTrigger } from './Select.test-utils'
import { createMockSelectItems, waitForCondition } from '@/tests/utils'
import { Select } from '../'

// ─── helpers ────────────────────────────────────────────────────────────────

/** Renders Select with valueLabel and returns the trigger element */
function renderWithValueLabel(
  valueLabel: string,
  selectedKey: string,
  items = createMockSelectItems(3),
  extra: Partial<React.ComponentProps<typeof Select>> = {}
) {
  const element = React.createElement(
    Select,
    { defaultSelectedKey: selectedKey, valueLabel, ...extra },
    React.createElement(Select.Trigger, null, React.createElement(Select.Value)),
    React.createElement(
      Select.Content,
      null,
      items.map(item =>
        React.createElement(Select.Item, { key: item.key, value: item.key }, item.label)
      )
    )
  )
  const { container } = rtlRender(element)
  return container
}

// ─── tests ──────────────────────────────────────────────────────────────────

describe('Select.valueLabel', () => {
  describe('initial render display', () => {
    it('shows valueLabel text on initial render', () => {
      const items = createMockSelectItems(3)
      // Real-world usage: valueLabel matches the item's label (known at SSR time)
      const container = renderWithValueLabel(items[0].label, items[0].key, items)
      const trigger = getSelectTrigger(container)
      expect(trigger.textContent).toContain(items[0].label)
    })

    it('shows valueLabel with defaultSelectedKey', () => {
      const items = createMockSelectItems(3)
      const container = renderWithValueLabel(items[1].label, items[1].key, items)
      const trigger = getSelectTrigger(container)
      expect(trigger.textContent).toContain(items[1].label)
    })

    it('shows valueLabel with controlled selectedKey', () => {
      const items = createMockSelectItems(3)
      const element = React.createElement(
        Select,
        { selectedKey: items[0].key, valueLabel: items[0].label },
        React.createElement(Select.Trigger, null, React.createElement(Select.Value)),
        React.createElement(
          Select.Content,
          null,
          items.map(item =>
            React.createElement(Select.Item, { key: item.key, value: item.key }, item.label)
          )
        )
      )
      const { container } = rtlRender(element)
      const trigger = getSelectTrigger(container)
      expect(trigger.textContent).toContain(items[0].label)
    })

    it('shows placeholder when neither valueLabel nor defaultSelectedKey provided', () => {
      const items = createMockSelectItems(3)
      const container = renderSelectWithItems(items)
      const trigger = getSelectTrigger(container)
      // Without a selected key or valueLabel, placeholder should appear
      expect(trigger.textContent).toContain('Select an option')
    })
  })

  describe('valueLabel when key has no matching item', () => {
    it('shows valueLabel even when key does not match any rendered item', () => {
      const items = createMockSelectItems(3)
      // Use a key that doesn't exist in items
      const element = React.createElement(
        Select,
        { defaultSelectedKey: 'non-existent-key', valueLabel: 'External Model' },
        React.createElement(Select.Trigger, null, React.createElement(Select.Value)),
        React.createElement(
          Select.Content,
          null,
          items.map(item =>
            React.createElement(Select.Item, { key: item.key, value: item.key }, item.label)
          )
        )
      )
      const { container } = rtlRender(element)
      const trigger = getSelectTrigger(container)
      expect(trigger.textContent).toContain('External Model')
    })

    it('falls back to placeholder when key has no match and no valueLabel', () => {
      const items = createMockSelectItems(3)
      const element = React.createElement(
        Select,
        { defaultSelectedKey: 'non-existent-key' },
        React.createElement(Select.Trigger, null, React.createElement(Select.Value)),
        React.createElement(
          Select.Content,
          null,
          items.map(item =>
            React.createElement(Select.Item, { key: item.key, value: item.key }, item.label)
          )
        )
      )
      const { container } = rtlRender(element)
      const trigger = getSelectTrigger(container)
      expect(trigger.textContent).toContain('Select an option')
    })
  })

  describe('valueLabel priority', () => {
    it('item textValue takes precedence over valueLabel once items register', async () => {
      const items = createMockSelectItems(3)
      // item label is what SelectItem renders; textValue defaults to children string
      const container = renderWithValueLabel('Override Label', items[0].key, items)
      const trigger = getSelectTrigger(container)

      // After effects settle, the actual item label should be shown
      await waitForCondition(() => trigger.textContent?.includes(items[0].label))
      expect(trigger.textContent).toContain(items[0].label)
    })

    it('valueLabel persists when no item matches selectedKey after registration', async () => {
      const items = createMockSelectItems(3)
      const element = React.createElement(
        Select,
        { selectedKey: 'external-key', valueLabel: 'External Value' },
        React.createElement(Select.Trigger, null, React.createElement(Select.Value)),
        React.createElement(
          Select.Content,
          null,
          items.map(item =>
            React.createElement(Select.Item, { key: item.key, value: item.key }, item.label)
          )
        )
      )
      const { container } = rtlRender(element)
      const trigger = getSelectTrigger(container)
      // key doesn't match any item, so valueLabel should persist
      await waitForCondition(() => !!trigger.textContent)
      expect(trigger.textContent).toContain('External Value')
    })
  })

  describe('controlled mode with valueLabel', () => {
    it('updates display when selectedKey changes and new valueLabel provided', async () => {
      const items = createMockSelectItems(3)
      const element = React.createElement(
        Select,
        { selectedKey: items[0].key, valueLabel: items[0].label },
        React.createElement(Select.Trigger, null, React.createElement(Select.Value)),
        React.createElement(
          Select.Content,
          null,
          items.map(item =>
            React.createElement(Select.Item, { key: item.key, value: item.key }, item.label)
          )
        )
      )
      const { container, rerender } = rtlRender(element)
      const trigger = getSelectTrigger(container)
      expect(trigger.textContent).toContain(items[0].label)

      // Rerender with new selectedKey and valueLabel
      rerender(
        React.createElement(
          Select,
          { selectedKey: items[1].key, valueLabel: items[1].label },
          React.createElement(Select.Trigger, null, React.createElement(Select.Value)),
          React.createElement(
            Select.Content,
            null,
            items.map(item =>
              React.createElement(Select.Item, { key: item.key, value: item.key }, item.label)
            )
          )
        )
      )
      await waitForCondition(() => trigger.textContent?.includes(items[1].label))
      expect(trigger.textContent).toContain(items[1].label)
    })
  })

  describe('SSR simulation: synchronous render output', () => {
    it('renders correct text without relying on effects (simulates SSR)', () => {
      // Capture what React.renderToString would produce — no effects run on server
      const { renderToString } = require('react-dom/server')
      const items = createMockSelectItems(3)
      const element = React.createElement(
        Select,
        { defaultSelectedKey: items[0].key, valueLabel: items[0].label },
        React.createElement(Select.Trigger, null, React.createElement(Select.Value)),
        React.createElement(
          Select.Content,
          null,
          items.map(item =>
            React.createElement(Select.Item, { key: item.key, value: item.key }, item.label)
          )
        )
      )
      const html = renderToString(element)
      // The server-rendered HTML should contain the valueLabel text
      expect(html).toContain(items[0].label)
    })
  })
})
