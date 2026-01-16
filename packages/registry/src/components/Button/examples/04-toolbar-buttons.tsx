import React from 'react'
import { Button, Group, Divider } from 'ui-lab-components'
import { Bold, Italic, Underline, Link as LinkIcon, List, Type } from 'lucide-react'

export const metadata = {
  title: 'Editor Toolbar',
  description: 'Icon buttons grouped by function with dividers for visual separation. Common pattern in text editors and content creation tools.'
}

export default function Example() {
  return (
    <div className="p-4 space-y-4">
      <div className="border border-background-700 rounded-lg p-1 bg-background-800 w-fit">
        <Group orientation="horizontal" spacing="tight">
          <Group.Button variant="ghost" size="sm" title="Bold">
            <Bold size={16} />
          </Group.Button>
          <Group.Button variant="ghost" size="sm" title="Italic">
            <Italic size={16} />
          </Group.Button>
          <Group.Button variant="ghost" size="sm" title="Underline">
            <Underline size={16} />
          </Group.Button>
        </Group>
        <Divider orientation="vertical" size="sm" spacing="sm" className="mx-1" />
        <Group orientation="horizontal" spacing="tight">
          <Group.Button variant="ghost" size="sm" title="Link">
            <LinkIcon size={16} />
          </Group.Button>
          <Group.Button variant="ghost" size="sm" title="List">
            <List size={16} />
          </Group.Button>
        </Group>
        <Divider orientation="vertical" size="sm" spacing="sm" className="mx-1" />
        <Group orientation="horizontal" spacing="tight">
          <Group.Button variant="ghost" size="sm" title="Format">
            <Type size={16} />
          </Group.Button>
        </Group>
      </div>
    </div>
  )
}
