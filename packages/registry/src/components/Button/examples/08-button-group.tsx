"use client";

import React, { useState } from 'react'
import { Button, Divider, Group } from 'ui-lab-components'
import { FaGrip, FaList, FaTable } from 'react-icons/fa6'

export const metadata = {
  title: 'Button Group',
  description: 'Joined view switcher using the Group compound component with active state.'
};

export default function Example() {
  const [viewMode, setViewMode] = useState("list");

  return (
    <Group orientation="horizontal" spacing="xs">
      <Group.Button active={viewMode === "list"} onPress={() => setViewMode("list")}>
        <FaList className="mr-1.5 text-foreground-400" /> List
      </Group.Button>
      <Divider orientation="vertical" />
      <Group.Button active={viewMode === "grid"} onPress={() => setViewMode("grid")}>
        <FaGrip className="mr-1.5 text-foreground-400" /> Grid
      </Group.Button>
      <Divider orientation="vertical" />
      <Group.Button active={viewMode === "table"} onPress={() => setViewMode("table")}>
        <FaTable className="mr-1.5 text-foreground-400" /> Table
      </Group.Button>
    </Group>
  )
}
