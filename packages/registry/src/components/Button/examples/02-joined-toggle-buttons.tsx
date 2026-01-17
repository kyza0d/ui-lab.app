import { useState } from 'react'
import { Group } from 'ui-lab-components'
import { LayoutList, LayoutGrid, Table } from 'lucide-react'

export const metadata = {
  title: 'Joined Toggle Buttons',
  description: 'Multiple buttons grouped together for view/mode selection. Demonstrates Group component with toggle state.'
}

export default function Example() {
  const [viewMode, setViewMode] = useState('list')

  return (
    <div className="p-4 space-y-4">
      <div className="space-y-2">
        <Group orientation="horizontal" spacing="tight">
          <Group.Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            onClick={() => setViewMode('list')}
          >
            <LayoutList size={17} className="mr-2 text-foreground-400" />
            List
          </Group.Button>
          <Group.Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            onClick={() => setViewMode('grid')}
          >
            <LayoutGrid size={17} className="mr-2 text-foreground-400" />
            Grid
          </Group.Button>
          <Group.Button
            variant={viewMode === 'table' ? 'default' : 'outline'}
            onClick={() => setViewMode('table')}
          >
            <Table size={17} className="mr-2 text-foreground-400" />
            Table
          </Group.Button>
        </Group>
      </div>
    </div>
  )
}
