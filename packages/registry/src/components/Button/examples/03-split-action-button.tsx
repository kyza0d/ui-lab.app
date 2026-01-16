import React from 'react'
import { Button, Group } from 'ui-lab-components'
import { ChevronDown } from 'lucide-react'

export const metadata = {
  title: 'Split Action Button',
  description: 'Primary action with dropdown trigger. Combines main action with secondary options menu.'
}

export default function Example() {
  return (
    <div className="p-4 space-y-4">
      <div className="space-y-2">
        <p className="text-sm text-foreground-500">Pipeline actions:</p>
        <Group orientation="horizontal" spacing="tight">
          <Group.Button size="md">Run Pipeline</Group.Button>
          <Group.Button size="md" className="px-2">
            <ChevronDown size={16} />
          </Group.Button>
        </Group>
      </div>
    </div>
  )
}
