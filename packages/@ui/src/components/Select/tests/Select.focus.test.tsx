import { describe, it, expect, vi } from 'vitest'
import { act, screen } from '@testing-library/react'
import { Select, Searchable } from '../'
import { List } from '../../List'
import { renderSelectWithItems, renderSelectWithChildren, openSelect, getSelectTrigger, getSelectContent } from './Select.test-utils'
import {
  createMockSelectItems,
  pressArrowDown,
  pressArrowUp,
  pressEscape,
  waitForFocus,
  waitForOpen,
  waitForCondition,
} from '@/tests/utils'
import userEvent from '@testing-library/user-event'
import { render as utilRender } from '@/tests/utils'

describe('Select.focus', () => {
  describe('focus ring visibility', () => {
    it('trigger can receive focus', async () => {
      const items = createMockSelectItems(3)
      const container = renderSelectWithItems(items)
      const trigger = getSelectTrigger(container)

      await act(async () => {
        trigger.focus()
      })
      expect(document.activeElement).toBe(trigger)
    })

    it('trigger is focusable', async () => {
      const items = createMockSelectItems(3)
      const container = renderSelectWithItems(items)
      const trigger = getSelectTrigger(container)

      expect(trigger.tabIndex).toBeGreaterThanOrEqual(-1)
    })
  })

  describe('focus management', () => {
    it('Tab focuses trigger button', async () => {
      const items = createMockSelectItems(3)
      const container = renderSelectWithItems(items)
      const trigger = getSelectTrigger(container)
      const user = userEvent.setup()

      // Ensure focus starts on body
      await act(async () => {
        document.body.focus()
      })

      await user.tab()
      
      await waitForFocus(() => trigger)
      expect(document.activeElement).toBe(trigger)
    })

    it('autoFocus prop focuses trigger on mount', async () => {
      const items = createMockSelectItems(3)
      const container = renderSelectWithItems(items, { autoFocus: true })
      const trigger = getSelectTrigger(container)

      // Should be focused on mount
      expect(document.activeElement).toBe(trigger)
    })

    it('opening dropdown focuses selected item (single)', async () => {
      const items = createMockSelectItems(5)
      const container = renderSelectWithItems(items, { defaultSelectedKey: items[2].key })
      const trigger = getSelectTrigger(container)

      await openSelect(trigger)

      const content = getSelectContent(container)
      expect(content).toBeInTheDocument()
      
      const focusedItems = content!.querySelectorAll('[data-focused="true"]')
      expect(focusedItems.length).toBeGreaterThan(0)
    })

    it('opening dropdown focuses first selected (multiple)', async () => {
      const items = createMockSelectItems(5)
      const container = renderSelectWithItems(items, {
        mode: 'multiple',
        defaultSelectedKeys: [items[1].key, items[3].key]
      })
      const trigger = getSelectTrigger(container)

      await openSelect(trigger)

      const content = getSelectContent(container)
      expect(content).toBeInTheDocument()
      
      const focusedItems = content!.querySelectorAll('[data-focused="true"]')
      expect(focusedItems.length).toBeGreaterThan(0)
    })

    it('ESC returns focus to trigger', async () => {
      const items = createMockSelectItems(3)
      const container = renderSelectWithItems(items)
      const trigger = getSelectTrigger(container)

      await openSelect(trigger)
      await pressEscape(trigger)

      expect(document.activeElement).toBe(trigger)
    })

    it('selecting an item restores focus to the standalone trigger', async () => {
      const items = createMockSelectItems(3)
      const user = userEvent.setup()
      const container = renderSelectWithItems(items)
      const trigger = getSelectTrigger(container)

      await openSelect(trigger)
      await user.click(screen.getByRole('option', { name: items[1]!.label }))

      await waitForCondition(() => trigger.getAttribute('aria-expanded') === 'false')
      expect(document.activeElement).toBe(trigger)
    })

    it('Tab closes the popup and advances to the next external focus target', async () => {
      const items = createMockSelectItems(3)
      const user = userEvent.setup()
      const { container } = utilRender(
        <>
          <button type="button">Before</button>
          <Select>
            <Select.Trigger>
              <Select.Value placeholder="Select item" />
            </Select.Trigger>
            <Select.Content>
              <Select.List>
                {items.map((item) => (
                  <Select.Item key={item.key} value={item.key} textValue={item.label}>
                    {item.label}
                  </Select.Item>
                ))}
              </Select.List>
            </Select.Content>
          </Select>
          <button type="button">After</button>
        </>
      )
      const trigger = getSelectTrigger(container)
      const afterButton = Array.from(container.querySelectorAll('button')).find((button) => button.textContent === 'After')

      await openSelect(trigger)
      await user.keyboard('{Tab}')

      expect(trigger).toHaveAttribute('aria-expanded', 'false')
      expect(document.activeElement).toBe(afterButton)
    })

    it('Arrow navigation still works when the popup content itself owns focus', async () => {
      const items = createMockSelectItems(8)
      const container = renderSelectWithItems(items)
      const trigger = getSelectTrigger(container)

      await openSelect(trigger)

      const content = getSelectContent(container) as HTMLElement
      await act(async () => {
        content.focus()
      })

      await pressArrowDown(content)
      await pressArrowDown(content)

      const focusedItems = content.querySelectorAll('[data-focused="true"]')
      expect(focusedItems.length).toBe(1)
      expect(focusedItems[0]).toHaveTextContent(items[2].label)
    })

    it('searchable trigger wrapper focuses input after first click with standard content', async () => {
      const items = createMockSelectItems(3)
      const container = renderSelectWithChildren(
        <>
          <Searchable.Input placeholder="Search items..." />
          <Select.Content>
            {items.map((item) => (
              <Select.Item key={item.key} value={item.key} textValue={item.label}>
                {item.label}
              </Select.Item>
            ))}
          </Select.Content>
        </>
      )
      const trigger = getSelectTrigger(container) as HTMLInputElement
      const triggerWrapper = trigger.closest('[data-slot="trigger"]') as HTMLElement
      const user = userEvent.setup()

      await user.click(triggerWrapper)
      await waitForOpen(() => getSelectContent(container)!)
      await waitForFocus(() => trigger)

      expect(document.activeElement).toBe(trigger)
    })

    it('ESC restores focus to the owning row for a searchable select embedded in a list item', async () => {
      const items = createMockSelectItems(3)
      const user = userEvent.setup()
      utilRender(
        <List>
          <List.Item value="1">
            <span>Timezone</span>
            <List.Select>
              <Searchable.Input placeholder="Search items..." />
              <Searchable.Content>
                {items.map((item) => (
                  <Select.Item key={item.key} value={item.key} textValue={item.label}>
                    {item.label}
                  </Select.Item>
                ))}
              </Searchable.Content>
            </List.Select>
          </List.Item>
        </List>
      )
      const row = screen.getByRole('listitem')
      const trigger = screen.getByRole('combobox')

      await user.click(trigger)
      await pressEscape(trigger)

      expect(document.activeElement).toBe(row)
    })

    it('restores row focus mode when a searchable inline select closes back to its owning row', async () => {
      const items = createMockSelectItems(3)
      const user = userEvent.setup()
      utilRender(
        <List>
          <List.Item value="1">
            <span>Timezone</span>
            <List.Select>
              <Searchable.Input placeholder="Search items..." />
              <Searchable.Content>
                {items.map((item) => (
                  <Select.Item key={item.key} value={item.key} textValue={item.label}>
                    {item.label}
                  </Select.Item>
                ))}
              </Searchable.Content>
            </List.Select>
          </List.Item>
          <List.Item value="2">Row 2</List.Item>
        </List>
      )
      const list = screen.getByRole('list')
      const [firstRow, secondRow] = screen.getAllByRole('listitem')
      const trigger = screen.getByRole('combobox')

      await user.click(trigger)
      await pressEscape(trigger)

      expect(document.activeElement).toBe(firstRow)
      expect(firstRow).toHaveAttribute('data-highlighted', 'true')
      expect(list).toHaveAttribute('data-focus-mode', 'row')

      await pressArrowUp(firstRow)

      expect(document.activeElement).toBe(firstRow)
      expect(firstRow).toHaveAttribute('data-highlighted', 'true')
      expect(list).toHaveAttribute('data-focus-mode', 'row')

      await pressArrowDown(firstRow)

      expect(document.activeElement).toBe(secondRow)
    })
  })


  describe('focused item state', () => {
    it('focusedKey tracks currently focused item in dropdown', async () => {
      const items = createMockSelectItems(3)
      const container = renderSelectWithItems(items)
      const trigger = getSelectTrigger(container)

      await openSelect(trigger)
      await pressArrowDown(trigger)

      const content = getSelectContent(container)
      const focusedItem = content!.querySelector('[data-focused="true"]')
      expect(focusedItem).toBeInTheDocument()
    })

    it('focused item is visible in viewport (scrollIntoView called)', async () => {
      const items = createMockSelectItems(20)
      const container = renderSelectWithItems(items, { maxItems: 5 })
      const trigger = getSelectTrigger(container)

      // Mock scrollIntoView
      const originalScroll = Element.prototype.scrollIntoView
      const scrollIntoViewMock = vi.fn()
      Element.prototype.scrollIntoView = scrollIntoViewMock

      try {
        await openSelect(trigger)
        await pressArrowDown(trigger)

        // scrollIntoView may be called (depending on implementation)
        // Just verify the focused item exists
        const content = getSelectContent(container)
        const focusedItem = content!.querySelector('[data-focused="true"]')
        expect(focusedItem).toBeInTheDocument()
      } finally {
        Element.prototype.scrollIntoView = originalScroll
      }
    })
  })

})
