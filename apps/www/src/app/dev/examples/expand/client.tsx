"use client";

import { useState } from "react";
import { Expand, Flex, Badge } from "ui-lab-components";
import { FaChevronDown, FaCircleInfo, FaGear, FaUser, FaCode } from "react-icons/fa6";

import { DevExampleLayout, type DevExample } from "../dev-example-layout";

function BasicPreview() {
  return (
    <div className="w-full max-w-sm border border-background-700 rounded-sm divide-y divide-background-700">
      <Expand title="What is UI Lab?">
        <p className="text-sm text-foreground-400 px-3 py-3">
          UI Lab is a component library built for building beautiful, accessible interfaces with a consistent design system.
        </p>
      </Expand>
    </div>
  );
}

function AccordionPreview() {
  const [open, setOpen] = useState<string | null>("shipping");

  const items = [
    {
      id: "shipping",
      title: "Shipping & Delivery",
      content: "Standard shipping takes 3–5 business days. Express options are available at checkout for next-day delivery.",
    },
    {
      id: "returns",
      title: "Returns & Refunds",
      content: "Items can be returned within 30 days of purchase. Refunds are processed within 5–7 business days after we receive the item.",
    },
    {
      id: "warranty",
      title: "Warranty",
      content: "All products include a 12-month manufacturer warranty. Extended coverage can be purchased at checkout.",
    },
  ];

  return (
    <div className="w-full max-w-sm border border-background-700 rounded-sm divide-y divide-background-700">
      {items.map((item) => (
        <Expand
          key={item.id}
          title={item.title}
          isExpanded={open === item.id}
          onExpandedChange={(expanded) => setOpen(expanded ? item.id : null)}
        >
          <p className="text-sm text-foreground-400 px-3 py-3">{item.content}</p>
        </Expand>
      ))}
    </div>
  );
}

function CustomTriggerPreview() {
  return (
    <div className="w-full max-w-sm border border-background-700 rounded-sm">
      <Expand>
        <Expand.Trigger>
          <Flex align="center" gap="xs" className="flex-1 px-3 py-2.5">
            <FaUser className="text-foreground-400 text-xs shrink-0" />
            <span className="text-sm font-medium">Account Settings</span>
            <Badge className="ml-auto mr-2">New</Badge>
          </Flex>
          <Expand.Icon />
        </Expand.Trigger>
        <Expand.Divider />
        <Expand.Content>
          <Flex direction="column" gap="xs" className="px-3 py-3">
            <p className="text-sm text-foreground-400">Manage your profile, password, and notification preferences.</p>
          </Flex>
        </Expand.Content>
      </Expand>
    </div>
  );
}

function DirectionPreview() {
  return (
    <Flex direction="column" gap="lg" className="w-full max-w-sm">
      <div>
        <p className="text-xs text-foreground-500 mb-2 px-1">from="above"</p>
        <div className="border border-background-700 rounded-sm">
          <Expand title="Reveal above">
            <Expand.Content from="above">
              <p className="text-sm text-foreground-400 px-3 py-3">This content slides in from above the trigger.</p>
            </Expand.Content>
          </Expand>
        </div>
      </div>
      <div>
        <p className="text-xs text-foreground-500 mb-2 px-1">from="right"</p>
        <div className="border border-background-700 rounded-sm">
          <Expand title="Reveal right">
            <Expand.Content from="right">
              <p className="text-sm text-foreground-400 px-3 py-3">Expands horizontally to the right.</p>
            </Expand.Content>
          </Expand>
        </div>
      </div>
    </Flex>
  );
}

function SettingsPanelPreview() {
  return (
    <div className="w-full max-w-sm border border-background-700 rounded-sm divide-y divide-background-700">
      <Expand defaultExpanded>
        <Expand.Trigger>
          <Flex align="center" gap="xs" className="flex-1 px-3 py-2.5">
            <FaGear className="text-foreground-400 text-xs" />
            <span className="text-sm font-medium">General</span>
          </Flex>
          <Expand.Icon />
        </Expand.Trigger>
        <Expand.Divider />
        <Expand.Content>
          <Flex direction="column" className="divide-y divide-background-700">
            {["Language", "Timezone", "Date format"].map((setting) => (
              <Flex key={setting} justify="between" align="center" className="px-3 py-2.5">
                <span className="text-sm text-foreground-300">{setting}</span>
                <span className="text-xs text-foreground-500">Auto</span>
              </Flex>
            ))}
          </Flex>
        </Expand.Content>
      </Expand>
      <Expand>
        <Expand.Trigger>
          <Flex align="center" gap="xs" className="flex-1 px-3 py-2.5">
            <FaCode className="text-foreground-400 text-xs" />
            <span className="text-sm font-medium">Developer</span>
          </Flex>
          <Expand.Icon />
        </Expand.Trigger>
        <Expand.Divider />
        <Expand.Content>
          <Flex direction="column" className="divide-y divide-background-700">
            {["API keys", "Webhooks", "Debug mode"].map((setting) => (
              <Flex key={setting} justify="between" align="center" className="px-3 py-2.5">
                <span className="text-sm text-foreground-300">{setting}</span>
                <span className="text-xs text-foreground-500">Off</span>
              </Flex>
            ))}
          </Flex>
        </Expand.Content>
      </Expand>
    </div>
  );
}

function DisabledPreview() {
  return (
    <div className="w-full max-w-sm border border-background-700 rounded-sm divide-y divide-background-700">
      <Expand title="Available section">
        <p className="text-sm text-foreground-400 px-3 py-3">This section is accessible and can be expanded.</p>
      </Expand>
      <Expand title="Restricted section" isDisabled>
        <p className="text-sm text-foreground-400 px-3 py-3">This content is not accessible.</p>
      </Expand>
    </div>
  );
}

function InlineInfoPreview() {
  return (
    <div className="w-full max-w-sm rounded-sm border border-background-700 bg-background-900">
      <Expand>
        <Expand.Trigger>
          <Flex align="center" gap="xs" className="flex-1 px-3 py-2.5">
            <FaCircleInfo className="text-foreground-400 text-xs shrink-0" />
            <span className="text-sm font-medium text-foreground-200">Why do we collect this?</span>
          </Flex>
          <Expand.Icon />
        </Expand.Trigger>
        <Expand.Divider />
        <Expand.Content>
          <p className="text-sm text-foreground-400 px-3 py-3 leading-relaxed">
            We use this information only to verify your identity and improve the service. It is never shared with third parties.
          </p>
        </Expand.Content>
      </Expand>
    </div>
  );
}

const examples: DevExample[] = [
  {
    id: "basic",
    title: "Basic",
    description: "Preset mode using the title prop — the simplest way to render a labeled expandable section.",
    preview: <BasicPreview />,
  },
  {
    id: "accordion",
    title: "Accordion",
    description: "Controlled expand group where only one item can be open at a time.",
    preview: <AccordionPreview />,
  },
  {
    id: "custom-trigger",
    title: "Custom Trigger",
    description: "Compound mode with a fully composed trigger — custom icon, badge, and layout.",
    preview: <CustomTriggerPreview />,
  },
  {
    id: "directions",
    title: "Reveal Directions",
    description: "Content can reveal from above or horizontally using the from prop on Expand.Content.",
    preview: <DirectionPreview />,
  },
  {
    id: "settings-panel",
    title: "Settings Panel",
    description: "Grouped settings sections using compound mode with icons, dividers, and a list of rows.",
    preview: <SettingsPanelPreview />,
  },
  {
    id: "disabled",
    title: "Disabled State",
    description: "An isDisabled section is visually dimmed and blocks interaction.",
    preview: <DisabledPreview />,
  },
  {
    id: "inline-info",
    title: "Inline Info",
    description: "A contextual disclosure pattern for surfacing supplementary information inline.",
    preview: <InlineInfoPreview />,
  },
];

export default function ExpandExamplesPage() {
  return (
    <DevExampleLayout
      title="Expand Examples"
      description="Focused examples showing the Expand component in real-world usage patterns."
      examples={examples}
      backHref="/dev/examples"
      backLabel="Examples"
    />
  );
}
