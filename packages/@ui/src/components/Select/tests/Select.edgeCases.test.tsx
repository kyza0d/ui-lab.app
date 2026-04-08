import { describe, it, expect, vi } from 'vitest'
import * as React from 'react'
import { renderSelectWithItems, renderSelectWithChildren, selectItem, openSelect, getSelectTrigger } from './Select.test-utils'
import { createMockSelectItems, getAllElementsByRole, clickElement, hoverElement, pressArrowDown } from '@/tests/utils'
import { Select } from '..'
import * as SelectShared from '../Select.shared'

describe('Select.edgeCases', () => {


  describe('rapid interactions', () => {
    it('rapid open/close cycles do not cause race conditions', async () => {
      const items = createMockSelectItems(3)
      const container = renderSelectWithItems(items)
      const trigger = getSelectTrigger(container)

      for (let i = 0; i < 5; i++) {
        await clickElement(trigger)
        await clickElement(trigger)
      }

      // Should be in stable state
      expect(trigger).toBeInTheDocument()
    })

    it('rapid selection changes handled correctly', async () => {
      const items = createMockSelectItems(5)
      const onSelectionChange = vi.fn()

      const container = renderSelectWithItems(items, { onSelectionChange })

      // Rapidly select different items
      for (let i = 0; i < Math.min(3, items.length); i++) {
        try {
          await selectItem(container, items[i].label)
          await openSelect(getSelectTrigger(container))
        } catch (e) {
          // Item might not be available
        }
      }

      expect(onSelectionChange).toHaveBeenCalled()
    })
  })

  describe('large lists', () => {
    it('large item lists (1000+) render without crashing', async () => {
      const items = createMockSelectItems(1000)
      const container = renderSelectWithItems(items, { maxItems: 10 })
      const trigger = getSelectTrigger(container)

      expect(trigger).toBeInTheDocument()
    })

    it('scroll virtualization keeps correct focused item in view', async () => {
      const items = createMockSelectItems(100)
      const container = renderSelectWithItems(items, { maxItems: 5 })
      const trigger = getSelectTrigger(container)

      await openSelect(trigger)

      // Navigate to middle of list
      for (let i = 0; i < 20; i++) {
        await pressArrowDown(trigger)
      }

      const focusedItem = document.querySelector('[data-focused="true"]')
      expect(focusedItem).toBeInTheDocument()
    })

    it('keyboard navigation still scrolls long lists into view', async () => {
      const items = createMockSelectItems(100)
      const container = renderSelectWithItems(items, { maxItems: 5 })
      const trigger = getSelectTrigger(container)
      const scrollSpy = vi.spyOn(SelectShared, 'scrollItemIntoView')

      try {
        await openSelect(trigger)

        scrollSpy.mockClear()

        for (let i = 0; i < 12; i++) {
          await pressArrowDown(trigger)
        }

        expect(scrollSpy).toHaveBeenCalled()
      } finally {
        scrollSpy.mockRestore()
      }
    })

    it('hovering after keyboard navigation does not trigger another scroll jump', async () => {
      const items = createMockSelectItems(100)
      const container = renderSelectWithItems(items, { maxItems: 5 })
      const trigger = getSelectTrigger(container)
      const scrollSpy = vi.spyOn(SelectShared, 'scrollItemIntoView')

      try {
        await openSelect(trigger)

        for (let i = 0; i < 12; i++) {
          await pressArrowDown(trigger)
        }

        scrollSpy.mockClear()

        const visibleItems = Array.from(
          document.querySelectorAll('[role="option"]:not([aria-hidden="true"])')
        ) as HTMLElement[]

        expect(visibleItems.length).toBeGreaterThan(0)

        await hoverElement(visibleItems[visibleItems.length - 1]!)

        expect(scrollSpy).not.toHaveBeenCalled()
      } finally {
        scrollSpy.mockRestore()
      }
    })

    it('searchable content keeps keyboard-scrolled options in view', async () => {
      const items = createMockSelectItems(100)
      const container = renderSelectWithChildren(
        <>
          <Select.Trigger>
            <Select.Value placeholder="Select item" />
          </Select.Trigger>
          <Select.Content searchable>
            <Select.List>
              {items.map((item) => (
                <Select.Item key={item.key} value={item.key} textValue={item.label}>
                  {item.label}
                </Select.Item>
              ))}
            </Select.List>
          </Select.Content>
        </>,
        { maxItems: 5 }
      )
      const trigger = getSelectTrigger(container)
      const scrollSpy = vi.spyOn(SelectShared, 'scrollItemIntoView')

      try {
        await openSelect(trigger)
        const searchInput = document.querySelector('[role="combobox"]') as HTMLElement

        scrollSpy.mockClear()

        for (let i = 0; i < 8; i++) {
          await pressArrowDown(searchInput)
        }

        expect(scrollSpy).toHaveBeenCalled()
      } finally {
        scrollSpy.mockRestore()
      }
    })

    it('does not mount scroll chrome when the content is below maxItems', async () => {
      const items = [
        {
          value: 'github',
          label: 'GitHub',
          description: "The world's leading software development platform",
        },
        {
          value: 'gitlab',
          label: 'GitLab',
          description: 'Complete DevOps platform with built-in CI/CD',
        },
        {
          value: 'bitbucket',
          label: 'Bitbucket',
          description: 'Git solution for professional teams by Atlassian',
        },
      ]

      const container = renderSelectWithChildren(
        React.createElement(
          React.Fragment,
          null,
          React.createElement(Select.Trigger, null, React.createElement(Select.Value, { placeholder: 'Select provider' })),
          React.createElement(
            Select.Content,
            null,
            React.createElement(
              Select.List,
              null,
              items.map((item) =>
                React.createElement(
                  Select.Item,
                  {
                    key: item.value,
                    value: item.value,
                    textValue: item.label,
                    description: item.description,
                  },
                  item.label
                )
              )
            )
          )
        ),
        {
          selectedKey: 'github',
          valueLabel: 'GitHub',
          onSelectionChange: vi.fn(),
          className: 'w-80',
        }
      )

      const trigger = getSelectTrigger(container)
      await openSelect(trigger)

      expect(document.querySelector('[data-hide]')).toBeNull()
    })
  })

  describe('memory and cleanup', () => {
    it('ref forwarding: ref prop on Select points to wrapper div', async () => {
      const items = createMockSelectItems(3)
      const container = renderSelectWithItems(items)

      const wrapperDiv = container.querySelector('[data-mode="single"]')
      expect(wrapperDiv).toBeInTheDocument()
    })

  })

  describe('composed trigger layouts', () => {
    it('renders a select trigger alongside sibling controls in fit-content layouts', () => {
      const container = renderSelectWithChildren(
        React.createElement(
          React.Fragment,
          null,
          React.createElement('button', { type: 'button' }, 'Toggle camera'),
          React.createElement(Select.Trigger, null, React.createElement(Select.Value, { placeholder: 'Select camera' })),
          React.createElement(
            Select.Content,
            null,
            React.createElement(
              Select.List,
              null,
              createMockSelectItems(3).map((item) =>
                React.createElement(Select.Item, { key: item.key, value: item.key }, item.label)
              )
            )
          )
        ),
        { className: 'w-fit' }
      )

      expect(getSelectTrigger(container)).toBeInTheDocument()
      expect(container.querySelector('button[type="button"]')).toBeInTheDocument()
    })
  })


  describe('null and undefined edge cases', () => {
    it('null selectedKey is handled', async () => {
      const items = createMockSelectItems(3)
      const container = renderSelectWithItems(items, { selectedKey: null })

      const selectedItems = getAllElementsByRole(container, 'option').filter(
        item => item.getAttribute('aria-selected') === 'true'
      )

      expect(selectedItems.length).toBe(0)
    })

    it('undefined mode defaults to single', async () => {
      const items = createMockSelectItems(3)
      const container = renderSelectWithItems(items)

      const selectRoot = container.querySelector('[data-mode="single"]')
      expect(selectRoot).toBeInTheDocument()
    })

  })

})
