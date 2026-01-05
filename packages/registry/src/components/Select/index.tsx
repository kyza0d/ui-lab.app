import React from 'react';
import { Select, SelectListBox } from 'ui-lab-components';
import { ControlDef, ComponentDetail } from '@/types';
import Example1, { metadata as metadata1 } from './examples/01-basic-select.js';
import examplesJson from './examples.json';
import { loadComponentExamples } from '../../utils/load-component-examples';
import { FaChevronDown } from 'react-icons/fa6';

export function getPreview(): React.ReactNode {
  return (
    <div style={{ width: 140, height: 30 }} className="w-full flex bg-background-900 pl-2 pr-4 items-center justify-center border border-background-700 rounded-md">
      <div style={{ width: "70%", backgroundColor: "var(--background-500)" }} className='opacity-10 rounded-md h-2'></div>
      <FaChevronDown size={10} className='text-foreground-500 ml-auto' />
    </div>
  );
}

const examplesData = [
  { id: '01-basic-select', Component: Example1, metadata: metadata1 },
];

const selectControls: ControlDef[] = [
  { name: "placeholder", label: "Placeholder", type: "text", defaultValue: "Select an option" },
  { name: "disabled", label: "Disabled", type: "toggle", defaultValue: false },
];

const selectBasicCode = `import { Select, SelectListBox } from "ui-lab-components";

export function Example() {
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
}`;

export const selectDetail: ComponentDetail = {
  id: "select",
  name: "Select",
  description: "A dropdown select component built on React Aria that allows users to choose from a list of options.",
  overview: (
    <div className="space-y-4 text-foreground-300">
      <p>The Select component provides a flexible and accessible way for users to choose from a list of options. Built on top of React Aria's Select primitive, it ensures proper keyboard navigation and accessibility.</p>
      <p>Use it for form inputs, filters, settings, or any situation where you need users to pick from a predefined set of options. It supports grouping, disabled states, and controlled values.</p>
    </div>
  ),
  examples: [
    {
      id: "preview",
      title: "Preview",
      description: "Adjust props to customize the component",
      code: selectBasicCode,
      preview: (
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
      ),
      controls: selectControls,
      renderPreview: (props: any) => (
        <Select isDisabled={props.disabled}>
          <Select.Trigger>
            <Select.Value placeholder={props.placeholder} />
          </Select.Trigger>
          <Select.Content>
            <SelectListBox>
              <Select.Item value="option1">Option 1</Select.Item>
              <Select.Item value="option2">Option 2</Select.Item>
              <Select.Item value="option3">Option 3</Select.Item>
            </SelectListBox>
          </Select.Content>
        </Select>
      ),
    },
    ...loadComponentExamples(examplesData, examplesJson),
  ],
  variants: [
    {
      id: "default",
      name: "Default",
      description: "Standard select component with placeholder.",
      code: selectBasicCode,
      preview: (
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
      ),
    },
  ],
};

export { selectControls };
export * from './examples';
