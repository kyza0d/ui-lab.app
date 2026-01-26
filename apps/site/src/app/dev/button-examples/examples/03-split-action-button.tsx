'use client'

import { Workflow } from 'lucide-react'
import { FaRoute } from 'react-icons/fa6'
import { Select, Group, Badge } from 'ui-lab-components'

export const metadata = {
  title: 'Split Action Button',
  description: 'Primary action with dropdown trigger. Combines main action with secondary options menu.'
}

export default function Example() {
  const handleAction = (action: string) => {
    console.log(`Selected action: ${action}`)
  }

  return (
    <div className="p-4 space-y-4">
      <div className="space-y-2">
        <Group orientation="horizontal">
          <Group.Select
            onSelectionChange={(key) => {
              if (key) handleAction(String(key))
            }}
          >
            <Group.Button icon={{ left: <FaRoute />, right: <Badge count={2} /> }} size="md">Run Pipeline</Group.Button>
            <Select.Trigger />
            <Select.Content>
              <Select.List>
                <Select.Item value="run-now" textValue="Run Now">
                  Run Now
                </Select.Item>
                <Select.Item value="schedule" textValue="Schedule Later">
                  Schedule Later
                </Select.Item>
                <Select.Item value="run-with-config" textValue="Run with Config">
                  Run with Config
                </Select.Item>
                <Select.Separator />
                <Select.Item value="view-logs" textValue="View Logs">
                  View Logs
                </Select.Item>
              </Select.List>
            </Select.Content>
          </Group.Select>
        </Group>
      </div>
    </div>
  )
}
