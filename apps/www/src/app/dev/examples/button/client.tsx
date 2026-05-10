"use client";

import { useState } from "react";

import { Button, Divider, Flex, Group, Select } from "ui-lab-components";
import { FaArrowRight, FaChevronDown, FaDownload, FaEllipsisVertical, FaGrip, FaList, FaPlus, FaTable } from "react-icons/fa6";

import { DevExampleLayout, type DevExample } from "../dev-example-layout";

const buttonVariants = [
  { label: "Primary", variant: "primary" },
  { label: "Default", variant: "default" },
  { label: "Secondary", variant: "secondary" },
  { label: "Outline", variant: "outline" },
  { label: "Ghost", variant: "ghost" },
  { label: "Danger", variant: "danger" },
] as const;

function VariantPreview() {
  return (
    <Flex gap="xs" align="center" justify="center" wrap="nowrap">
      {buttonVariants.map((button) => (
        <Button key={button.variant} variant={button.variant}>
          {button.label}
        </Button>
      ))}
    </Flex>
  );
}

function SplitButtonPreview() {
  const splitActions = [
    { value: "publish", label: "Publish now" },
    { value: "schedule", label: "Schedule publish" },
    { value: "save", label: "Save draft" },
  ] as const;
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
  );
}

function IconPreview() {
  return (
    <Flex gap="xs" align="center" justify="center" wrap="wrap">
      <Button variant="primary" icon={{ left: <FaPlus /> }}>
        New Project
      </Button>
      <Button variant="outline" icon={{ right: <FaArrowRight /> }}>
        Continue
      </Button>
      <Button variant="secondary" icon={<FaDownload />}>
        Download
      </Button>
      <Button size="icon" variant="ghost" aria-label="More actions" icon={<FaEllipsisVertical />} />
    </Flex>
  );
}

function ButtonGroupPreview() {
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
  );
}

const examples: DevExample[] = [
  {
    id: "variants",
    title: "Variants",
    description: "Show the available button styles side by side in a single row.",
    preview: <VariantPreview />,
  },
  {
    id: "split-button",
    title: "Split Button",
    description: "Use Group + Select primitives for a classic split button with a primary action and a separate menu trigger.",
    preview: <SplitButtonPreview />,
  },
  {
    id: "icons",
    title: "Icons",
    description: "Keep icon examples focused on left, right, and icon-only button patterns.",
    preview: <IconPreview />,
  },
  {
    id: "button-group",
    title: "Button Group",
    description: "Use the Group compound component with active items to build a joined view switcher.",
    preview: <ButtonGroupPreview />,
  },
];

export default function ButtonExamplesPage() {
  return (
    <DevExampleLayout
      title="Button Examples"
      description="Simple button examples that focus on a single concept at a time."
      examples={examples}
      backHref="/dev/examples"
      backLabel="Examples"
    />
  );
}
