"use client";


import { useState } from "react";
import { DevExampleLayout, type DevExample } from "../dev-example-layout";
import { Divider, Group, Select, Slider } from "ui-lab-components";
import { FaPercent, FaMagnifyingGlass, FaCopy, FaEnvelope, FaFilter, FaPlus, FaTrash } from "react-icons/fa6";

function CreateProjectPreview() {
  return (
    <Group variant="primary" orientation="horizontal" spacing="xs">
      <Group.Input aria-label="Project name" placeholder="Untitled project" className="w-56" />
      <Divider orientation="vertical" />
      <Group.Button>
        <FaPlus className="mr-1.5" /> Create
      </Group.Button>
    </Group>
  );
}

function FilterBarPreview() {
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

function DocumentationSearchPreview() {
  return (
    <Group variant="secondary">
      <div className="bg-background-800 flex items-center px-3 text-foreground-400">
        <FaMagnifyingGlass />
      </div>
      <Divider />
      <Group.Input placeholder="Search documentation..." className="w-64" />
      <Divider />
      <Group.Button className="w-full">Search</Group.Button>
    </Group>
  );
}

function EmailSignupPreview() {
  return (
    <Group variant="outline">
      <div className="bg-background-800 flex items-center px-3 text-foreground-400">
        <FaEnvelope />
      </div>
      <Divider />
      <Group.Input placeholder="you@example.com" type="email" className="w-64" />
      <Divider />
      <Group.Button>Subscribe</Group.Button>
    </Group>
  );
}

function CopyCommandPreview() {
  return (
    <Group>
      <Group.Input defaultValue="npm install ui-lab" readOnly className="w-full font-mono text-sm" />
      <Divider />
      <Group.Button icon={{ left: <FaCopy className="mr-1.5 text-foreground-400" /> }} />
    </Group>
  );
}

function DeleteConfirmationPreview() {
  return (
    <Group variant="danger">
      <Group.Input aria-label="Confirmation" placeholder="Type DELETE" className="w-48" />
      <Divider />
      <Group.Button>
        <FaTrash className="mr-1.5" /> Delete
      </Group.Button>
    </Group>
  );
}

function SliderGroupPreview() {
  const [sliderValue, setSliderValue] = useState<number[]>([45]);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value);
    if (!isNaN(val)) setSliderValue([Math.min(Math.max(val, 0), 100)]);
  };

  return (
    <div className="space-y-4 w-64">
      <Group>
        <Group.Input type="number" min={0} max={100} value={sliderValue[0]} onChange={handleInputChange} className="w-full" />
        <div className="bg-background-800 flex items-center px-3 text-foreground-400 text-sm font-medium">
          <FaPercent />
        </div>
      </Group>
      <Slider.Root value={sliderValue} onValueChange={setSliderValue} max={100} step={1} />
    </div>
  );
}

const examples: DevExample[] = [
  {
    id: "create-project",
    title: "Create Project",
    description: "A primary grouped action for creating a named item.",
    preview: <CreateProjectPreview />,
    previewLayout: "start",
  },
  {
    id: "filter-bar",
    title: "Filter Bar with Selects",
    description: "Horizontal group combining Select dropdowns with action buttons for filtering interfaces.",
    preview: <FilterBarPreview />,
    previewLayout: "start",
  },
  {
    id: "documentation-search",
    title: "Documentation Search",
    description: "A search input with an icon prefix and joined submit button.",
    preview: <DocumentationSearchPreview />,
    previewLayout: "start",
  },
  {
    id: "email-signup",
    title: "Email Signup",
    description: "An email input with a joined subscription action.",
    preview: <EmailSignupPreview />,
    previewLayout: "start",
  },
  {
    id: "copy-command",
    title: "Copy Command",
    description: "A read-only command field with a joined copy action.",
    preview: <CopyCommandPreview />,
    previewLayout: "start",
  },
  {
    id: "delete-confirmation",
    title: "Delete Confirmation",
    description: "A danger variant group for destructive confirmation flows.",
    preview: <DeleteConfirmationPreview />,
    previewLayout: "start",
  },
  {
    id: "slider-integration",
    title: "Slider with Input Group",
    description: "Numeric input synced with a slider for precise value selection.",
    preview: <SliderGroupPreview />,
  },
];

export default function GroupExamplesPage() {
  return (
    <DevExampleLayout
      title="Group & Select Examples"
      description="Component grouping patterns with Select dropdowns, Inputs, Buttons, and Sliders."
      examples={examples}
      backHref="/dev/examples"
      backLabel="Examples"
    />
  );
}
