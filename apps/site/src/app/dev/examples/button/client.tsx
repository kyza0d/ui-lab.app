"use client";


import { useEffect, useReducer, useState } from "react";
import { DevExampleLayout, type DevExample } from "../dev-example-layout";
import { Button, Group, Divider, Select, Searchable, Tooltip, useAnimatedWidth, Badge, Input, Flex, Menu } from "ui-lab-components";

import { FaList, FaGrip, FaTable, FaBold, FaItalic, FaUnderline, FaChevronLeft, FaChevronRight, FaChevronUp, FaChevronDown, FaAnglesLeft, FaAnglesRight, FaEllipsis, FaStrikethrough, FaListUl, FaLink, FaImage, FaQuoteLeft, FaRocket, FaCheck, FaRotateRight, FaSpinner, FaStop, FaTerminal, FaGear, FaBug, FaPlay, FaClock, FaCopy, FaMagnifyingGlass, FaShare, FaPlus, FaShareNodes, FaEllipsisVertical, FaWandMagicSparkles, FaHashtag, FaLock } from "react-icons/fa6";
import { LuSearch } from "react-icons/lu";

type DeployStage = "idle" | "queued" | "deploying" | "succeeded" | "failed";

type DeployAction = { type: "START" } | { type: "NEXT" } | { type: "COMPLETE"; success: boolean };

function deployReducer(state: DeployStage, action: DeployAction): DeployStage {
  switch (action.type) {
    case "START":
      return (state === "idle" || state === "succeeded" || state === "failed") ? "queued" : state;
    case "NEXT":
      return state === "queued" ? "deploying" : state;
    case "COMPLETE":
      return state === "deploying" ? (action.success ? "succeeded" : "failed") : state;
    default:
      return state;
  }
}

function DeployPipelineButton() {
  const [stage, dispatch] = useReducer(deployReducer, "idle");
  const wrapperRef = useAnimatedWidth({ duration: 200, easing: "cubic-bezier(0.25, 0, 0.25, 1)", trigger: stage });

  useEffect(() => {
    if (stage === "queued") {
      const t = setTimeout(() => dispatch({ type: "NEXT" }), 1200);
      return () => clearTimeout(t);
    }
    if (stage === "deploying") {
      const t = setTimeout(() => {
        dispatch({ type: "COMPLETE", success: Math.random() > 0.25 });
      }, 3000);
      return () => clearTimeout(t);
    }
  }, [stage]);

  const stageConfig: Record<DeployStage, { label: string; icon: React.ReactNode; variant: "ghost" | "default" | "outline" | "danger"; disabled: boolean }> = {
    idle: { label: "Deploy to Production", icon: <FaRocket />, variant: "ghost", disabled: false },
    queued: { label: "Queued…", icon: <FaSpinner className="animate-spin" />, variant: "outline", disabled: true },
    deploying: { label: "Deploying…", icon: <FaSpinner className="animate-spin" />, variant: "outline", disabled: true },
    succeeded: { label: "Deployed", icon: <FaCheck />, variant: "outline", disabled: false },
    failed: { label: "Failed — Retry", icon: <FaRotateRight />, variant: "danger", disabled: false },
  };

  const cfg = stageConfig[stage];

  return (
    <div className="flex flex-col gap-3">
      <div
        ref={wrapperRef}
      >
        <Button
          variant={cfg.variant}
          icon={{ left: cfg.icon }}
          isDisabled={cfg.disabled}
          onPress={() => dispatch({ type: "START" })}
        >
          {cfg.label}
        </Button>
      </div>
    </div>
  );
}

function JoinedTogglePreview() {
  const [viewMode, setViewMode] = useState("list");
  return (
    <Group orientation="horizontal" value={viewMode} onChange={setViewMode}>
      <Group.Button value="list"><FaList className="mr-1.5 text-foreground-400" /> List</Group.Button>
      <Divider orientation="vertical" />
      <Group.Button value="grid"><FaGrip className="mr-1.5 text-foreground-400" /> Grid</Group.Button>
      <Divider orientation="vertical" />
      <Group.Button value="table"><FaTable className="mr-1.5 text-foreground-400" /> Table</Group.Button>
    </Group>
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

function CopyInviteLinkPreview() {
  const [copied, setCopied] = useState(false);
  const inviteLink = "https://app.acme.io/invite/tk_8xN2mP4qRv";

  const handleCopy = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-sm font-medium text-foreground-300">Invite Link</span>
      <Input
        readOnly
        value={inviteLink}
        actions={[
          <Button
            key="copy"
            size="sm"
            variant="ghost"
            className="p-1"
            icon={{ left: copied ? <FaCheck /> : <FaCopy /> }}
            onPress={handleCopy}
          />,
        ]}
      />
    </div>
  );
}

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
    <Flex gap="xs" align="center">
      <Select
        selectedKey={channel}
        valueLabel={selectedChannel ? `#${selectedChannel.label}` : undefined}
        onSelectionChange={setChannel}
        className="flex h-10"
        isDisabled={status !== "idle"}
      >
        <Searchable.Input icon={<FaHashtag />} placeholder="Select channel..." />
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
      <Divider orientation="vertical" />
      <Select className="flex h-10" selectedKey={action} onSelectionChange={(key) => setAction(key as PublishAction)} isDisabled={status !== "idle"}>
        <Button
          onPress={handleExecute}
          variant="ghost"
          className=" px-2 py-0 h-full"
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
    <Flex gap="xs">
      <Group orientation="horizontal" spacing="xs" value={viewMode} onChange={setViewMode}>
        <Group.Button size="icon" value="list"><FaList className="text-foreground-400" /></Group.Button>
        <Group.Button size="icon" value="grid"><FaGrip className="text-foreground-400" /></Group.Button>
      </Group>
      <Input
        placeholder="Search..."
        icon={<LuSearch />}
        hint={<Badge size="sm" variant="secondary" >Ctrl+K</Badge>}
      />
      <Button styles="p-1" variant="outline" icon={<FaShareNodes />} />
      <Button icon={{ right: <FaPlus /> }} >Upload</Button>
    </Flex>
  );
}

const examples: DevExample[] = [
  {
    id: "joined-toggle",
    title: "Joined Toggle Buttons",
    description: "Multiple buttons grouped together for view/mode selection with active state indication.",
    preview: <JoinedTogglePreview />,
  },
  {
    id: "copy-invite-link",
    title: "Copy Invite Link",
    description: "Inline copy-to-clipboard button with transient confirmation state — common in share dialogs and settings pages.",
    preview: <CopyInviteLinkPreview />,
  },
  {
    id: "split-action-button",
    title: "Split Action Button",
    description: "A primary action button joined with a Select dropdown that changes what the button does — useful for publish workflows with multiple delivery options.",
    preview: <SplitActionButtonPreview />,
  },
  {
    id: "multi-actions",
    title: "Actions",
    description: "A primary action button joined with a Select dropdown that changes what the button does — useful for publish workflows with multiple delivery options.",
    preview: <MultipleActions />,
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
