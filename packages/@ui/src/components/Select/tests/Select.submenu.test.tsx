import { describe, it, expect } from 'vitest'
import { renderSelectWithChildren, openSelect, getSelectTrigger } from './Select.test-utils'
import { Select } from '../'
import { createMockSelectItems, getAllElementsByRole, hoverElement, waitForCondition } from '@/tests/utils'

describe('Select.submenu', () => {
  describe('submenu registration', () => {
    it('submenu items register with isSubmenuTrigger flag', async () => {
      const items = createMockSelectItems(3)

      const container = renderSelectWithChildren(
        <>
          <Select.Trigger />
          <Select.Content>
            {items.map(item => (
              <Select.Sub key={item.key}>
                <Select.SubTrigger>{item.label}</Select.SubTrigger>
                <Select.SubContent>
                  <Select.Item value={`${item.value}-sub`}>{item.label}-SubItem</Select.Item>
                </Select.SubContent>
              </Select.Sub>
            ))}
          </Select.Content>
        </>
      )

      const trigger = getSelectTrigger(container)
      await openSelect(trigger)

      const options = getAllElementsByRole('option')
      expect(options.length).toBeGreaterThan(0)
    })
  })

  it('renders portaled submenu content with the submenu surface class', async () => {
    const container = renderSelectWithChildren(
      <>
        <Select.Trigger />
        <Select.Content>
          <Select.Sub>
            <Select.SubTrigger>More options</Select.SubTrigger>
            <Select.SubContent>
              <Select.Item value="sub-1">Nested item</Select.Item>
            </Select.SubContent>
          </Select.Sub>
        </Select.Content>
      </>
    )

    const trigger = getSelectTrigger(container)
    await openSelect(trigger)

    const subTrigger = getAllElementsByRole('option').find(option => option.textContent?.includes('More options'))
    if (!subTrigger) throw new Error('Submenu trigger not found')

    await hoverElement(subTrigger)

    await waitForCondition(() => {
      const subContent = document.querySelector('[data-select-submenu-content="true"]') as HTMLElement | null
      return !!subContent && subContent.getAttribute('data-state') === 'open'
    })

    const subContent = document.querySelector('[data-select-submenu-content="true"]') as HTMLElement | null
    expect(subContent).not.toBeNull()
    expect(subContent).toHaveClass('sub-content')

    const subItem = Array.from(subContent!.querySelectorAll('[role="option"]')).find(option => option.textContent?.includes('Nested item')) as HTMLElement | undefined
    expect(subItem).toBeDefined()
  })
})
