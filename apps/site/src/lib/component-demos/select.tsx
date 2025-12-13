import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectListBox,
  SelectTrigger,
  SelectValue,
  SearchableTrigger,
  SearchableContent,
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
  SelectContent,
  SelectItem,
  SelectListBox,
  SelectTrigger,
  SelectValue,
} from "ui-lab-components";

export function Example() {
  return (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="Select an option" />
      </SelectTrigger>
      <SelectContent>
        <SelectListBox>
          <SelectItem value="option1">Option 1</SelectItem>
          <SelectItem value="option2">Option 2</SelectItem>
          <SelectItem value="option3">Option 3</SelectItem>
        </SelectListBox>
      </SelectContent>
    </Select>
  );
}`;

const searchableTriggerCode = `import {
  Select,
  SelectContent,
  SelectItem,
  SelectListBox,
  SearchableTrigger,
} from "ui-lab-components";

export function Example() {
  return (
    <Select>
      <SearchableTrigger placeholder="Search frameworks..." />
      <SelectContent>
        <SelectListBox>
          <SelectItem value="react">React</SelectItem>
          <SelectItem value="vue">Vue</SelectItem>
          <SelectItem value="angular">Angular</SelectItem>
          <SelectItem value="svelte">Svelte</SelectItem>
          <SelectItem value="nextjs">Next.js</SelectItem>
        </SelectListBox>
      </SelectContent>
    </Select>
  );
}`;

const searchableContentCode = `import {
  Select,
  SelectContent,
  SelectItem,
  SelectListBox,
  SelectTrigger,
  SelectValue,
  SearchableContent,
} from "ui-lab-components";

export function Example() {
  return (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="Select a country" />
      </SelectTrigger>
      <SearchableContent searchPlaceholder="Find country...">
        <SelectListBox>
          <SelectItem value="usa">United States</SelectItem>
          <SelectItem value="canada">Canada</SelectItem>
          <SelectItem value="mexico">Mexico</SelectItem>
          <SelectItem value="brazil">Brazil</SelectItem>
          <SelectItem value="france">France</SelectItem>
          <SelectItem value="germany">Germany</SelectItem>
          <SelectItem value="japan">Japan</SelectItem>
          <SelectItem value="australia">Australia</SelectItem>
        </SelectListBox>
      </SearchableContent>
    </Select>
  );
}`;

const searchableBothCode = `import {
  Select,
  SelectContent,
  SelectItem,
  SelectListBox,
  SearchableTrigger,
  SearchableContent,
} from "ui-lab-components";

export function Example() {
  return (
    <Select>
      <SearchableTrigger placeholder="Search..." />
      <SearchableContent searchPlaceholder="Filter items...">
        <SelectListBox>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="apricot">Apricot</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
          <SelectItem value="cherry">Cherry</SelectItem>
          <SelectItem value="cranberry">Cranberry</SelectItem>
          <SelectItem value="date">Date</SelectItem>
          <SelectItem value="elderberry">Elderberry</SelectItem>
          <SelectItem value="fig">Fig</SelectItem>
          <SelectItem value="grape">Grape</SelectItem>
        </SelectListBox>
      </SearchableContent>
    </Select>
  );
}`;

const hoverTriggerCode = `import {
  Select,
  SelectContent,
  SelectItem,
  SelectListBox,
  SelectTrigger,
  SelectValue,
} from "ui-lab-components";

export function Example() {
  return (
    <Select trigger="hover">
      <SelectTrigger>
        <SelectValue placeholder="Hover to open" />
      </SelectTrigger>
      <SelectContent>
        <SelectListBox>
          <SelectItem value="view">View</SelectItem>
          <SelectItem value="edit">Edit</SelectItem>
          <SelectItem value="delete">Delete</SelectItem>
        </SelectListBox>
      </SelectContent>
    </Select>
  );
}`;

function BasicSelectExample({ placeholder }: any) {
  return (
    <Select>
      <SelectTrigger className="w-48">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        <SelectListBox>
          <SelectItem value="option1">Option 1</SelectItem>
          <SelectItem value="option2">Option 2</SelectItem>
          <SelectItem value="option3">Option 3</SelectItem>
        </SelectListBox>
      </SelectContent>
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
    <Select selectedKey={selectedKey} onSelectionChange={setSelectedKey}>
      <SearchableTrigger
        className="w-48"
        placeholder="Search frameworks..."
      />
      <SelectContent>
        <SelectListBox>
          {frameworks.map(f => (
            <SelectItem key={f.value} value={f.value}>{f.label}</SelectItem>
          ))}
        </SelectListBox>
      </SelectContent>
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
    <Select selectedKey={selectedKey} onSelectionChange={setSelectedKey}>
      <SelectTrigger className="w-48">
        <SelectValue placeholder={selectedLabel || "Select a country"} />
      </SelectTrigger>
      <SearchableContent searchPlaceholder="Find country...">
        <SelectListBox>
          {countries.map(c => (
            <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
          ))}
        </SelectListBox>
      </SearchableContent>
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
    <Select selectedKey={selectedKey} onSelectionChange={setSelectedKey}>
      <SearchableTrigger
        className="w-48"
        placeholder="Search fruits..."
      />
      <SearchableContent searchPlaceholder="Filter items...">
        <SelectListBox>
          {fruits.map(f => (
            <SelectItem key={f.value} value={f.value}>{f.label}</SelectItem>
          ))}
        </SelectListBox>
      </SearchableContent>
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
    <Select trigger="hover" selectedKey={selectedKey} onSelectionChange={setSelectedKey}>
      <SelectTrigger className="w-48">
        <SelectValue placeholder={selectedLabel || "Hover to open"} />
      </SelectTrigger>
      <SelectContent>
        <SelectListBox>
          {actions.map(a => (
            <SelectItem key={a.value} value={a.value}>{a.label}</SelectItem>
          ))}
        </SelectListBox>
      </SelectContent>
    </Select>
  );
}

export const selectDetail: ComponentDetail = {
  id: "select",
  name: "Select",
  description: "A dropdown select component built on Radix UI that allows users to choose from a list of options.",
  overview: (
    <div className="space-y-4 text-foreground-300">
      <p>
        The Select component provides a flexible and accessible way for users to choose from a list of options. Built on top of Radix UI's Select primitive, it ensures proper keyboard navigation and accessibility.
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
