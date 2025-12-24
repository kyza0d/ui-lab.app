import React from 'react';
import { Select, SelectListBox } from 'ui-lab-components';

export const metadata = {
  title: 'Basic Select',
  description: 'A simple dropdown select component with options. Use this for form inputs and user choices.'
};

export default function Example() {
  return (
    <Select>
      <Select.Trigger>
        <Select.Value placeholder="Select an option" />
      </Select.Trigger>
      <Select.Content>
        <SelectListBox>
          <Select.Item value="option1">Option 1</Select.Item>
          <Select.Item value="option2">Option 2</Select.Item>
          <Select.Item value="option3">Option 3</Select.Item>
        </SelectListBox>
      </Select.Content>
    </Select>
  );
}
