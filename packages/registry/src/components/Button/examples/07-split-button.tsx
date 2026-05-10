"use client";

import React, { useState } from 'react'
import { Button, Divider, Flex, Group, Select } from 'ui-lab-components'
import { FaChevronDown } from 'react-icons/fa6'

const splitActions = [
  { value: "publish", label: "Publish now" },
  { value: "schedule", label: "Schedule publish" },
  { value: "save", label: "Save draft" },
] as const;

export const metadata = {
  title: 'Split Button',
  description: 'Group + Select primitives for a classic split button with a primary action and a separate menu trigger.'
};

export default function Example() {
  const [action, setAction] = useState<string | number | null>(splitActions[0].value);
  const selectedAction = splitActions.find((item) => item.value === action) ?? splitActions[0];

  return (
    <Flex direction="column" gap="sm" align="center">
      <Group orientation="horizontal">
        <Group.Select className="w-full" selectedKey={action} onSelectionChange={setAction}>
          <Select.Value>
            <Button variant="primary">{selectedAction.label}</Button>
          </Select.Value>
          <Divider />
          <Select.Trigger
            chevron={<FaChevronDown className="h-3.5 w-3.5" />}
            aria-label="Choose split action"
          />
          <Select.Content>
            <Select.List>
              {splitActions.map((item) => (
                <Select.Item key={item.value} value={item.value} textValue={item.label}>
                  {item.label}
                </Select.Item>
              ))}
            </Select.List>
          </Select.Content>
        </Group.Select>
      </Group>
    </Flex>
  )
}
