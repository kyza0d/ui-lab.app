"use client";

import { useState } from "react";
import { Divider, Group, Select } from "ui-lab-components";
import { FaMagnifyingGlass, FaFilter } from "react-icons/fa6";

export const metadata = {
  title: "Filter Bar with Selects",
  description: "Horizontal group combining Select dropdowns with action buttons for filtering interfaces.",
};

export default function Example() {
  const [status, setStatus] = useState<string | number | null>("active");

  return (
    <Group variant="default" orientation="horizontal">
      <Group.Input icon={<FaMagnifyingGlass />} placeholder="Search...">
      </Group.Input>
      <Divider />
      <Group.Select selectedKey={status} onSelectionChange={setStatus} className="w-36">
        <Select.Trigger><Select.Value placeholder="Status" /></Select.Trigger>
        <Select.Content>
          <Select.List>
            <Select.Item value="active" textValue="Active">Active</Select.Item>
            <Select.Item value="inactive" textValue="Inactive">Inactive</Select.Item>
            <Select.Item value="pending" textValue="Pending">Pending</Select.Item>
          </Select.List>
        </Select.Content>
      </Group.Select>
      <Divider />
      <Group.Button size="md"><FaFilter className="mr-1.5" /> Apply</Group.Button>
    </Group>
  );
}
