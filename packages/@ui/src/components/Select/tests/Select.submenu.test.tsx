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

  it('applies submenu surface and inherited radius tokens to portaled sub-content', async () => {
    const rootStyle = document.documentElement.style
    rootStyle.setProperty('--background-900', 'rgb(10, 20, 30)')
    rootStyle.setProperty('--background-700', 'rgb(40, 50, 60)')
    rootStyle.setProperty('--radius-sm', '12px')
    rootStyle.setProperty('--border-width-base', '2px')

    try {
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
      const subContentStyles = window.getComputedStyle(subContent!)

      expect(subContentStyles.backgroundColor).toBe('rgb(10, 20, 30)')
      expect(subContentStyles.borderTopLeftRadius).toBe('12px')
      expect(subContentStyles.borderTopRightRadius).toBe('12px')

      const subItem = Array.from(subContent!.querySelectorAll('[role="option"]')).find(option => option.textContent?.includes('Nested item')) as HTMLElement | undefined
      expect(subItem).toBeDefined()

      const subItemStyles = window.getComputedStyle(subItem!)
      expect(subItemStyles.borderTopLeftRadius).not.toBe('')
      expect(subItemStyles.borderTopLeftRadius).not.toBe('0px')
    } finally {
      rootStyle.removeProperty('--background-900')
      rootStyle.removeProperty('--background-700')
      rootStyle.removeProperty('--radius-sm')
      rootStyle.removeProperty('--border-width-base')
    }
  })
})
