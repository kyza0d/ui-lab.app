import { Group, Divider } from 'ui-lab-components'
import { Bold, Italic, Underline, Link as LinkIcon, List, Type } from 'lucide-react'

export const metadata = {
  title: 'Editor Toolbar',
  description: 'Icon buttons grouped by function with dividers for visual separation. Common pattern in text editors and content creation tools.'
}

export default function Example() {
  return (
    <div className="p-4 space-y-4">
      <div className="flex flex-row">
        <Group orientation="horizontal" spacing="tight">
          <Group.Button variant="ghost" title="Bold">
            <Bold size={16} />
          </Group.Button>
          <Group.Button variant="ghost" title="Italic">
            <Italic size={16} />
          </Group.Button>
          <Group.Button variant="ghost" title="Underline">
            <Underline size={16} />
          </Group.Button>
        </Group>
        <Divider orientation="vertical" spacing="sm" className="mx-1" />
        <Group orientation="horizontal" spacing="tight">
          <Group.Button variant="ghost" title="Link">
            <LinkIcon size={16} />
          </Group.Button>
          <Group.Button variant="ghost" title="List">
            <List size={16} />
          </Group.Button>
        </Group>
        <Divider orientation="vertical" spacing="sm" className="mx-1" />
        <Group orientation="horizontal" spacing="tight">
          <Group.Button variant="ghost" title="Format">
            <Type size={16} />
          </Group.Button>
        </Group>
      </div>
    </div>
  )
}
