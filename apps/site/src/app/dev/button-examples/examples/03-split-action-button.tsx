'use client'
import { useState } from 'react'
import { Group, Select, Divider } from 'ui-lab-components'

export const metadata = {
  title: 'Split Action Button',
  description: 'Primary action with dropdown trigger. Combines main action with secondary options menu.'
}

export default function Example() {
  const [action, setAction] = useState<string | number | null>('run')

  return (
    <div className="p-4 space-y-4">
      <div className="space-y-2">
        <Group orientation="horizontal" spacing="tight">
          <Group.Select selectedKey={action} onSelectionChange={setAction}>
            <Group.Button className="border-r border-background-700" size="md">Run Pipeline</Group.Button>
            <Select.Trigger />
            <Select.Content>
              <Select.List>
                <Select.Item value="run" textValue="Run Pipeline">Run Pipeline</Select.Item>
                <Select.Item value="schedule" textValue="Schedule Run">Schedule Run</Select.Item>
                <Select.Item value="debug" textValue="Debug Mode">Debug Mode</Select.Item>
                <Select.Item value="test" textValue="Test Run">Test Run</Select.Item>
              </Select.List>
            </Select.Content>
          </Group.Select>
        </Group>
      </div>
    </div>
  )
}
