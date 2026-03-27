"use client";


import { useEffect, useReducer, useState } from "react";
import { DevExampleLayout, type DevExample } from "../dev-example-layout";
import { Button, Group, Divider, Select, Searchable, Badge, Input, Flex, Menu } from "ui-lab-components";

import { FaList, FaGrip, FaTable, FaRocket, FaCheck, FaRotateRight, FaSpinner, FaCopy, FaPlus, FaShareNodes, FaEllipsisVertical, FaHashtag, FaLock, } from "react-icons/fa6";

import { LuSearch } from "react-icons/lu";

function JoinedTogglePreview() {
  const [viewMode, setViewMode] = useState("list");
  return (
    <Flex className="w-110" gap="xs" align="center">
      <Input
        placeholder="Search items..."
        icon={<LuSearch />}
        className="w-full"
      />
      <Group orientation="horizontal" value={viewMode} onChange={setViewMode}>
        <Group.Button size="icon" value="list"><FaList /></Group.Button>
        <Divider orientation="vertical" />
        <Group.Button size="icon" value="grid"><FaGrip /></Group.Button>
        <Divider orientation="vertical" />
        <Group.Button size="icon" value="table"><FaTable /></Group.Button>
      </Group>
      <Button size="sm" icon={{ left: <FaPlus size={12} /> }} >New</Button>
    </Flex>
  );
}

type Channel = { value: string; label: string; description: string; private?: boolean };

const channels: Channel[] = [
  { value: "general", label: "general", description: "General team discussion" },
  { value: "announcements", label: "announcements", description: "Important team updates", private: true },
  { value: "design", label: "design", description: "Design work and feedback" },
  { value: "engineering", label: "engineering", description: "Engineering discussions" },
  { value: "marketing", label: "marketing", description: "Marketing campaigns" },
  { value: "product", label: "product", description: "Product roadmap and planning" },
  { value: "random", label: "random", description: "Off-topic conversations" },
  { value: "releases", label: "releases", description: "Release announcements", private: true },
];

type PublishAction = "publish" | "draft" | "schedule";

const publishActions: Record<PublishAction, { label: string; variant: "ghost" | "default" | "outline" }> = {
  publish: { label: "Publish Now", variant: "ghost" },
  draft: { label: "Save as Draft", variant: "ghost" },
  schedule: { label: "Schedule for Later", variant: "outline" },
};

function SplitActionButtonPreview() {
  const [action, setAction] = useState<PublishAction>("publish");
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const [channel, setChannel] = useState<string | number | null>("general");
  const selectedChannel = channels.find((c) => c.value === channel);
  const cfg = publishActions[action];

  const handleExecute = () => {
    setStatus("loading");
    setTimeout(() => {
      setStatus("done");
      setTimeout(() => setStatus("idle"), 2000);
    }, 1500);
  };

  const leftIcon = status === "loading" ? <FaSpinner className="animate-spin" /> : status === "done" ? <FaCheck /> : undefined;
  const label = status === "loading" ? "Saving..." : status === "done" ? "Done!" : cfg.label;

  return (
    <Flex gap="xs" className="w-110" align="center">
      <Select
        selectedKey={channel}
        valueLabel={selectedChannel ? `#${selectedChannel.label}` : undefined}
        onSelectionChange={setChannel}
        className="flex h-10"
        isDisabled={status !== "idle"}
      >
        <Searchable.Input className="w-50" icon={<FaHashtag />} placeholder="Select channel..." />
        <Select.Content>
          <Select.List>
            {channels.map((c) => (
              <Select.Item
                key={c.value}
                value={c.value}
                textValue={c.label}
                icon={c.private ? <FaLock className="h-3 w-3" /> : <FaHashtag className="h-3 w-3" />}
                description={c.description}
              >
                {c.label}
              </Select.Item>
            ))}
          </Select.List>
        </Select.Content>
      </Select>
      <Select className="flex h-10" selectedKey={action} onSelectionChange={(key) => setAction(key as PublishAction)} isDisabled={status !== "idle"}>
        <Button
          onPress={handleExecute}
          variant="ghost"
          size="sm"
          className="w-full"
          isDisabled={status !== "idle"}
          icon={leftIcon}
        >
          {label}
        </Button>
        <Divider orientation="vertical" spacing="none" />
        <Select.Trigger />
        <Select.Content>
          <Select.Item value="publish" textValue="Publish Now">Publish Now</Select.Item>
          <Select.Item value="draft" textValue="Save as Draft">Save as Draft</Select.Item>
          <Select.Item value="schedule" textValue="Schedule for Later">Schedule for Later</Select.Item>
        </Select.Content>
      </Select>
      <Menu type="pop-over">
        <Menu.Trigger>
          <Button size="icon" variant="outline" icon={<FaEllipsisVertical />} />
        </Menu.Trigger>
        <Menu.Content offset={8} side="bottom" align="end">
          <Menu.Item>Preview</Menu.Item>
          <Menu.Item>View History</Menu.Item>
          <Menu.Item>Discard Changes</Menu.Item>
        </Menu.Content>
      </Menu>
    </Flex>
  );
}

function MultipleActions() {
  const [viewMode, setViewMode] = useState("list");
  return (
    <Flex gap="xs" className="w-110 *:not-last:flex-1">
      <Button size="sm" variant="primary" >Subscribe</Button>
      <Button size="sm" >Message</Button>
      <Button size="icon" variant="outline" icon={<FaEllipsisVertical />} />
    </Flex>
  );
}

function SubStackActions() {
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
        hint={<Badge size="sm" variant="secondary" >Ctrl+K</Badge>}
      />
      <Button size="sm" icon={{ right: <FaPlus size={12} /> }} >Upload</Button>
    </Flex>
  );
}

const examples: DevExample[] = [
  {
    id: "multi-actions",
    title: "Actions",
    description: "A primary action button joined with a Select dropdown that changes what the button does — useful for publish workflows with multiple delivery options.",
    preview: <MultipleActions />,
  },
  {
    id: "joined-toggle",
    title: "Joined Toggle Buttons",
    description: "Multiple buttons grouped together for view/mode selection with active state indication.",
    preview: <JoinedTogglePreview />,
  },
  {
    id: "sub-stack-actions",
    title: "Actions",
    description: "A primary action button joined with a Select dropdown that changes what the button does — useful for publish workflows with multiple delivery options.",
    preview: <SubStackActions />,
  },
  {
    id: "split-action-button",
    title: "Split Action Button",
    description: "A primary action button joined with a Select dropdown that changes what the button does — useful for publish workflows with multiple delivery options.",
    preview: <SplitActionButtonPreview />,
  },
];

export default function ButtonExamplesPage() {
  return (
    <DevExampleLayout
      title="Button Examples"
      description="Development environment for Button component examples. These render exactly as they would on the production component page."
      examples={examples}
      backHref="/dev/examples"
      backLabel="Examples"
    />
  );
}
