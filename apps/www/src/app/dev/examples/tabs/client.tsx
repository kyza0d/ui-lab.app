"use client";

import { useState } from "react";
import { DevExampleLayout, type DevExample } from "../dev-example-layout";
import { Tabs } from "ui-lab-components";

function DefaultTabsPreview() {
  const [selected, setSelected] = useState("tab1");

  return (
    <Tabs value={selected} onValueChange={setSelected} className="w-fit">
      <Tabs.List aria-label="Tab options">
        <Tabs.Trigger value="tab1">Overview</Tabs.Trigger>
        <Tabs.Trigger value="tab2">Features</Tabs.Trigger>
        <Tabs.Trigger value="tab3">Pricing</Tabs.Trigger>
      </Tabs.List>
    </Tabs>
  );
}

function UnderlineTabsPreview() {
  const [selected, setSelected] = useState("tab1");

  return (
    <Tabs value={selected} onValueChange={setSelected} variant="underline" className="w-fit">
      <Tabs.List aria-label="Tab options">
        <Tabs.Trigger value="tab1">Install</Tabs.Trigger>
        <Tabs.Trigger value="tab2">Usage</Tabs.Trigger>
        <Tabs.Trigger value="tab3">API</Tabs.Trigger>
      </Tabs.List>
    </Tabs>
  );
}

function VerticalTabsPreview() {
  const [selected, setSelected] = useState("tab1");

  return (
    <Tabs value={selected} onValueChange={setSelected} orientation="vertical" className="flex w-fit gap-4">
      <Tabs.List aria-label="Tab options" className="flex flex-col w-fit">
        <Tabs.Trigger value="tab1">Account</Tabs.Trigger>
        <Tabs.Trigger value="tab2">Settings</Tabs.Trigger>
        <Tabs.Trigger value="tab3">Security</Tabs.Trigger>
      </Tabs.List>
    </Tabs>
  );
}

function VerticalUnderlineTabsPreview() {
  const [selected, setSelected] = useState("tab1");

  return (
    <Tabs value={selected} onValueChange={setSelected} variant="underline" orientation="vertical" className="flex w-fit gap-4">
      <Tabs.List aria-label="Tab options" className="flex flex-col w-fit">
        <Tabs.Trigger value="tab1">Profile</Tabs.Trigger>
        <Tabs.Trigger value="tab2">Billing</Tabs.Trigger>
        <Tabs.Trigger value="tab3">Team</Tabs.Trigger>
      </Tabs.List>
    </Tabs>
  );
}

const examples: DevExample[] = [
  {
    id: "default-variant",
    title: "Default Variant",
    description: "Basic horizontal tabs with background highlight on active tab.",
    preview: <DefaultTabsPreview />,
    previewLayout: "center",
  },
  {
    id: "underline-variant",
    title: "Underline Variant",
    description: "Horizontal tabs with underline indicator. Great for documentation sites.",
    preview: <UnderlineTabsPreview />,
    previewLayout: "center",
  },
  {
    id: "vertical-layout",
    title: "Vertical Layout",
    description: "Vertical tabs with default variant. Perfect for settings pages and sidebars.",
    preview: <VerticalTabsPreview />,
    previewLayout: "center",
  },
  {
    id: "vertical-underline",
    title: "Vertical Underline",
    description: "Vertical tabs with underline variant indicator.",
    preview: <VerticalUnderlineTabsPreview />,
    previewLayout: "center",
  },
];

export default function TabsExamplesPage() {
  return (
    <DevExampleLayout
      title="Tabs Examples"
      description="Simple, focused examples of horizontal and vertical tab layouts."
      examples={examples}
      backHref="/dev/examples"
      backLabel="Examples"
    />
  );
}
