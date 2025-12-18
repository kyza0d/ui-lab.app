import React, { useState } from "react";
import {
  Searchable,
  Select,
  SelectListBox,
} from "ui-lab-components";
import { ComponentDetail } from "@/types/component";
import { ControlDef } from "@/components/component-configurator";

// Control definitions for the select configurator
const selectControls: ControlDef[] = [
  {
    name: "placeholder",
    label: "Placeholder",
    type: "text",
    defaultValue: "Select an option",
  },
  {
    name: "disabled",
    label: "Disabled",
    type: "toggle",
    defaultValue: false,
  },
];

const selectBasicCode = `import {
  Select,
  SelectListBox,
} from "ui-lab-components";

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

const searchableTriggerCode = `import {
  Select,
  Searchable,
  SelectListBox,
} from "ui-lab-components";

export function Example() {
  return (
    <Select>
      <Searchable.Trigger placeholder="Search frameworks..." />
      <Select.Content>
        <SelectListBox>
          <Select.Item value="react">React</Select.Item>
          <Select.Item value="vue">Vue</Select.Item>
          <Select.Item value="angular">Angular</Select.Item>
          <Select.Item value="svelte">Svelte</Select.Item>
          <Select.Item value="nextjs">Next.js</Select.Item>
        </SelectListBox>
      </Select.Content>
    </Select>
  );
}`;

const searchableContentCode = `import {
  Select,
  Searchable,
  SelectListBox,
} from "ui-lab-components";

export function Example() {
  return (
    <Select>
      <Select.Trigger>
        <Select.Value placeholder="Select a country" />
      </Select.Trigger>
      <Searchable.Content searchPlaceholder="Find country...">
        <SelectListBox>
          <Select.Item value="usa">United States</Select.Item>
          <Select.Item value="canada">Canada</Select.Item>
          <Select.Item value="mexico">Mexico</Select.Item>
          <Select.Item value="brazil">Brazil</Select.Item>
          <Select.Item value="france">France</Select.Item>
          <Select.Item value="germany">Germany</Select.Item>
          <Select.Item value="japan">Japan</Select.Item>
          <Select.Item value="australia">Australia</Select.Item>
        </SelectListBox>
      </Searchable.Content>
    </Select>
  );
}`;

const searchableBothCode = `import {
  Select,
  Searchable,
  SelectListBox,
} from "ui-lab-components";

export function Example() {
  return (
    <Select>
      <Searchable.Trigger placeholder="Search..." />
      <Searchable.Content searchPlaceholder="Filter items...">
        <SelectListBox>
          <Select.Item value="apple">Apple</Select.Item>
          <Select.Item value="apricot">Apricot</Select.Item>
          <Select.Item value="banana">Banana</Select.Item>
          <Select.Item value="blueberry">Blueberry</Select.Item>
          <Select.Item value="cherry">Cherry</Select.Item>
          <Select.Item value="cranberry">Cranberry</Select.Item>
          <Select.Item value="date">Date</Select.Item>
          <Select.Item value="elderberry">Elderberry</Select.Item>
          <Select.Item value="fig">Fig</Select.Item>
          <Select.Item value="grape">Grape</Select.Item>
        </SelectListBox>
      </Searchable.Content>
    </Select>
  );
}`;

const hoverTriggerCode = `import {
  Select,
  SelectListBox,
} from "ui-lab-components";

export function Example() {
  return (
    <Select trigger="hover">
      <Select.Trigger>
        <Select.Value placeholder="Hover to open" />
      </Select.Trigger>
      <Select.Content>
        <SelectListBox>
          <Select.Item value="view">View</Select.Item>
          <Select.Item value="edit">Edit</Select.Item>
          <Select.Item value="delete">Delete</Select.Item>
        </SelectListBox>
      </Select.Content>
    </Select>
  );
}`;

function BasicSelectExample({ placeholder }: any) {
  return (
    <Select>
      <Select.Trigger className="w-48">
        <Select.Value placeholder={placeholder} />
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

function SearchableTriggerExample() {
  const [selectedKey, setSelectedKey] = React.useState<string | null>(null);
  const frameworks = [
    { value: "react", label: "React" },
    { value: "vue", label: "Vue" },
    { value: "angular", label: "Angular" },
    { value: "svelte", label: "Svelte" },
    { value: "nextjs", label: "Next.js" },
  ];

  return (
    <Select selectedKey={selectedKey} onSelectionChange={(key) => setSelectedKey(key as string | null)}>
      <Searchable.Trigger
        className="w-48"
        placeholder="Search frameworks..."
      />
      <Select.Content>
        <SelectListBox>
          {frameworks.map(f => (
            <Select.Item key={f.value} value={f.value}>{f.label}</Select.Item>
          ))}
        </SelectListBox>
      </Select.Content>
    </Select>
  );
}

function SearchableContentExample() {
  const [selectedKey, setSelectedKey] = React.useState<string | null>(null);
  const countries = [
    { value: "usa", label: "United States" },
    { value: "canada", label: "Canada" },
    { value: "mexico", label: "Mexico" },
    { value: "brazil", label: "Brazil" },
    { value: "france", label: "France" },
    { value: "germany", label: "Germany" },
    { value: "japan", label: "Japan" },
    { value: "australia", label: "Australia" },
  ];

  const selectedLabel = countries.find(c => c.value === selectedKey)?.label;

  return (
    <Select selectedKey={selectedKey} onSelectionChange={(key) => setSelectedKey(key as string | null)}>
      <Select.Trigger className="w-48">
        <Select.Value placeholder={selectedLabel || "Select a country"} />
      </Select.Trigger>
      <Searchable.Content searchPlaceholder="Find country...">
        <SelectListBox>
          {countries.map(c => (
            <Select.Item key={c.value} value={c.value}>{c.label}</Select.Item>
          ))}
        </SelectListBox>
      </Searchable.Content>
    </Select>
  );
}

function SearchableBothExample() {
  const [selectedKey, setSelectedKey] = React.useState<string | null>(null);
  const fruits = [
    { value: "apple", label: "Apple" },
    { value: "apricot", label: "Apricot" },
    { value: "banana", label: "Banana" },
    { value: "blueberry", label: "Blueberry" },
    { value: "cherry", label: "Cherry" },
    { value: "cranberry", label: "Cranberry" },
    { value: "date", label: "Date" },
    { value: "elderberry", label: "Elderberry" },
    { value: "fig", label: "Fig" },
    { value: "grape", label: "Grape" },
  ];

  return (
    <Select selectedKey={selectedKey} onSelectionChange={(key) => setSelectedKey(key as string | null)}>
      <Searchable.Trigger
        className="w-48"
        placeholder="Search fruits..."
      />
      <Searchable.Content searchPlaceholder="Filter items...">
        <SelectListBox>
          {fruits.map(f => (
            <Select.Item key={f.value} value={f.value}>{f.label}</Select.Item>
          ))}
        </SelectListBox>
      </Searchable.Content>
    </Select>
  );
}

function HoverTriggerExample() {
  const [selectedKey, setSelectedKey] = React.useState<string | null>(null);
  const actions = [
    { value: "view", label: "View" },
    { value: "edit", label: "Edit" },
    { value: "delete", label: "Delete" },
  ];

  const selectedLabel = actions.find(a => a.value === selectedKey)?.label;

  return (
    <Select trigger="hover" selectedKey={selectedKey} onSelectionChange={(key) => setSelectedKey(key as string | null)}>
      <Select.Trigger className="w-48">
        <Select.Value placeholder={selectedLabel || "Hover to open"} />
      </Select.Trigger>
      <Select.Content>
        <SelectListBox>
          {actions.map(a => (
            <Select.Item key={a.value} value={a.value}>{a.label}</Select.Item>
          ))}
        </SelectListBox>
      </Select.Content>
    </Select>
  );
}

export const selectDetail: ComponentDetail = {
  id: "select",
  name: "Select",
  description: "A dropdown select component built on React Aria that allows users to choose from a list of options.",
  overview: (
    <div className="space-y-4 text-foreground-300">
      <p>
        The Select component provides a flexible and accessible way for users to choose from a list of options. Built on top of React Aria's Select primitive, it ensures proper keyboard navigation and accessibility.
      </p>
      <p>
        Use it for form inputs, filters, settings, or any situation where you need users to pick from a predefined set of options. It supports grouping, disabled states, and controlled values.
      </p>
    </div>
  ),

  examples: [
    {
      id: "basic",
      title: "Basic Select",
      description: "A simple select component with a placeholder and a few options.",
      code: selectBasicCode,
      preview: <BasicSelectExample placeholder="Select an option" />,
      controls: selectControls,
      renderPreview: (props: any) => <BasicSelectExample placeholder={props.placeholder} />,
    },
    {
      id: "searchable-trigger",
      title: "Searchable Trigger",
      description: "Select with a searchable input trigger. Type to filter options from the trigger field. Shows selected value when an option is chosen.",
      code: searchableTriggerCode,
      preview: <SearchableTriggerExample />,
    },
    {
      id: "searchable-content",
      title: "Searchable Content",
      description: "Select with a search input inside the dropdown content. Useful for long lists of options. Trigger updates when selection is made.",
      code: searchableContentCode,
      preview: <SearchableContentExample />,
    },
    {
      id: "searchable-both",
      title: "Searchable Trigger & Content",
      description: "Select with search in both the trigger and content. Combines both searchable capabilities with proper state management.",
      code: searchableBothCode,
      preview: <SearchableBothExample />,
    },
    {
      id: "hover-trigger",
      title: "Hover Trigger",
      description: "Select that opens on hover instead of click. The dropdown stays open while hovering over the trigger or content, and closes when the mouse leaves.",
      code: hoverTriggerCode,
      preview: <HoverTriggerExample />,
    },
  ],

  variants: [
    {
      id: "default",
      name: "Default",
      description: "Standard select component with dark styling.",
      code: selectBasicCode,
      preview: <BasicSelectExample placeholder="Select an option" />,
    },
    {
      id: "searchable-trigger-variant",
      name: "Searchable Trigger",
      description: "Select with input trigger for immediate search capability.",
      code: searchableTriggerCode,
      preview: <SearchableTriggerExample />,
    },
    {
      id: "searchable-content-variant",
      name: "Searchable Content",
      description: "Select with search input in the dropdown for filtering options.",
      code: searchableContentCode,
      preview: <SearchableContentExample />,
    },
    {
      id: "hover-trigger-variant",
      name: "Hover Trigger",
      description: "Select that opens on hover instead of click.",
      code: hoverTriggerCode,
      preview: <HoverTriggerExample />,
    },
  ],
};
