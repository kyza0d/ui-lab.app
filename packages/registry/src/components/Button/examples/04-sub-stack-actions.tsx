"use client";

import React, { useState } from 'react'
import { Button, Group, Input, Badge, Flex } from 'ui-lab-components'
import { FaList, FaGrip, FaPlus } from "react-icons/fa6";
import { LuSearch } from "react-icons/lu";

export const metadata = {
  title: 'Sub Stack Actions',
  description: 'A collection of buttons and inputs arranged horizontally for grouped actions and filtering.'
};

export default function Example() {
  const [viewMode, setViewMode] = useState("list");
  return (
    <Flex align="center" gap="xs" className="w-110">
      <Group orientation="horizontal" spacing="xs" value={viewMode} onChange={setViewMode}>
        <Group.Button size="icon" value="list"><FaList /></Group.Button>
        <Group.Button size="icon" value="grid"><FaGrip /></Group.Button>
      </Group>
      <Input
        placeholder="Search..."
        icon={<LuSearch />}
        hint={<Badge variant="secondary" >Ctrl+K</Badge>}
      />
      <Button size="sm" icon={{ right: <FaPlus size={12} /> }} >Upload</Button>
    </Flex>
  );
}
