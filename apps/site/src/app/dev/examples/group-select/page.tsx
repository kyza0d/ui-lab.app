"use client";

import { useState } from "react";
import { DevExampleLayout, type DevExample } from "../dev-example-layout";
import { Divider, Group, Select, Slider } from "ui-lab-components";
import { FaPercent, FaMagnifyingGlass, FaCopy, FaEnvelope, FaFilter, FaXmark, FaPencil, FaStar, FaTrash } from "react-icons/fa6";

function FilterBarPreview() {
  const [category, setCategory] = useState<string | number | null>("all");
  const [status, setStatus] = useState<string | number | null>("active");

  return (
    <Group orientation="horizontal">
      <Group.Input prefixIcon={<FaMagnifyingGlass />} placeholder="Search...">

      </Group.Input>
      <Group.Select selectedKey={category} onSelectionChange={setCategory} className="w-44">
        <Select.Trigger><Select.Value placeholder="Category" /></Select.Trigger>
        <Divider />
        <Select.Content>
          <Select.List>
            <Select.Item value="all" textValue="All Items">All Items</Select.Item>
            <Select.Item value="recent" textValue="Recent">Recent</Select.Item>
            <Select.Item value="featured" textValue="Featured">Featured</Select.Item>
          </Select.List>
        </Select.Content>
      </Group.Select>
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
      <Group.Button variant="default" size="md"><FaFilter className="mr-1.5" /> Apply</Group.Button>
    </Group>
  );
}

function InputGroupPreview() {
  return (
    <div className="space-y-4">
      <Group>
        <div className="bg-background-800 flex items-center px-3 text-foreground-400">
          <FaMagnifyingGlass />
        </div>
        <Group.Input placeholder="Search documentation..." className="w-64" />
        <Group.Button variant="primary">Search</Group.Button>
      </Group>
      <Group>
        <div className="bg-background-800 flex items-center px-3 text-foreground-400">
          <FaEnvelope />
        </div>
        <Group.Input placeholder="you@example.com" type="email" className="w-64" />
        <Group.Button variant="primary">Subscribe</Group.Button>
      </Group>
      <Group>
        <Group.Input defaultValue="npm install ui-lab" readOnly className="w-64 font-mono text-sm" />
        <Group.Button variant="outline" icon={{ left: <FaCopy className="mr-1.5 text-foreground-400" /> }} />
      </Group>
    </div>
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
    id: "filter-bar",
    title: "Filter Bar with Selects",
    description: "Horizontal group combining Select dropdowns with action buttons for filtering interfaces.",
    code: `import { useState } from "react";
import { Group, Select } from "ui-lab-components";
import { FaFilter, FaXmark } from "react-icons/fa6";

export function FilterBar() {
  const [category, setCategory] = useState("all");
  const [status, setStatus] = useState("active");

  return (
    <Group orientation="horizontal" spacing="sm">
      <Group.Select selectedKey={category} onSelectionChange={setCategory}>
        <Select.Trigger><Select.Value placeholder="Category" /></Select.Trigger>
        <Select.Content>
          <Select.List>
            <Select.Item value="all">All Items</Select.Item>
            <Select.Item value="recent">Recent</Select.Item>
            <Select.Item value="featured">Featured</Select.Item>
          </Select.List>
        </Select.Content>
      </Group.Select>
      <Group.Select selectedKey={status} onSelectionChange={setStatus}>
        <Select.Trigger><Select.Value placeholder="Status" /></Select.Trigger>
        <Select.Content>
          <Select.List>
            <Select.Item value="active">Active</Select.Item>
            <Select.Item value="inactive">Inactive</Select.Item>
          </Select.List>
        </Select.Content>
      </Group.Select>
      <Group.Button variant="primary"><FaFilter className="mr-1.5" /> Apply</Group.Button>
      <Group.Button variant="ghost"><FaXmark className="mr-1.5" /> Clear</Group.Button>
    </Group>
  );
}`,
    preview: <FilterBarPreview />,
    previewLayout: "start",
  },
  {
    id: "input-groups",
    title: "Input with Button Groups",
    description: "Search bars, email subscriptions, and copy-to-clipboard patterns with icon prefixes.",
    code: `import { Group } from "ui-lab-components";
import { FaMagnifyingGlass, FaEnvelope, FaCopy } from "react-icons/fa6";

export function SearchBar() {
  return (
    <Group>
      <div className="bg-background-800 flex items-center px-3 text-foreground-400">
        <FaMagnifyingGlass />
      </div>
      <Group.Input placeholder="Search documentation..." className="w-64" />
      <Group.Button variant="primary">Search</Group.Button>
    </Group>
  );
}

export function EmailSubscribe() {
  return (
    <Group>
      <div className="bg-background-800 flex items-center px-3 text-foreground-400">
        <FaEnvelope />
      </div>
      <Group.Input placeholder="you@example.com" type="email" />
      <Group.Button variant="primary">Subscribe</Group.Button>
    </Group>
  );
}

export function CopyCommand() {
  return (
    <Group>
      <Group.Input defaultValue="npm install ui-lab" readOnly className="font-mono text-sm" />
      <Group.Button variant="outline"><FaCopy className="mr-1.5" /> Copy</Group.Button>
    </Group>
  );
}`,
    preview: <InputGroupPreview />,
    previewLayout: "start",
  },
  {
    id: "slider-integration",
    title: "Slider with Input Group",
    description: "Numeric input synced with a slider for precise value selection.",
    code: `import { useState } from "react";
import { Group, Slider } from "ui-lab-components";
import { FaPercent } from "react-icons/fa6";

export function SliderInput() {
  const [value, setValue] = useState([45]);

  return (
    <div className="space-y-4">
      <Group>
        <Group.Input
          type="number"
          value={value[0]}
          onChange={(e) => setValue([+e.target.value])}
        />
        <div className="bg-background-800 px-3 flex items-center">
          <FaPercent />
        </div>
      </Group>
      <Slider.Root value={value} onValueChange={setValue} max={100} />
    </div>
  );
}`,
    preview: <SliderGroupPreview />,
  },
];

export default function GroupSelectExamplesPage() {
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
