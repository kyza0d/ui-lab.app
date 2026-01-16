import React, { useState } from 'react'
import { Button, Group } from 'ui-lab-components'
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
        <p className="text-sm text-foreground-500">Display mode:</p>
        <Group orientation="horizontal" spacing="tight">
          <Group.Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            <LayoutList size={16} className="mr-2" />
            List
          </Group.Button>
          <Group.Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('grid')}
          >
            <LayoutGrid size={16} className="mr-2" />
            Grid
          </Group.Button>
          <Group.Button
            variant={viewMode === 'table' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('table')}
          >
            <Table size={16} className="mr-2" />
            Table
          </Group.Button>
        </Group>
      </div>
    </div>
  )
}
