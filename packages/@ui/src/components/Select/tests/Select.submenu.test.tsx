import { describe, it, expect } from 'vitest'
import { renderSelectWithChildren, openSelect, getSelectTrigger } from './Select.test-utils'
import { Select } from '../'
import { createMockSelectItems, getAllElementsByRole } from '@/tests/utils'

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
})
