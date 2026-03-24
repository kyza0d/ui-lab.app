"use client";

import { useState } from "react";
import { DevExampleLayout, type DevExample } from "../dev-example-layout";
import { Tabs } from "ui-lab-components";

function DefaultTabsPreview() {
  const [selected, setSelected] = useState("tab1");

  return (
    <Tabs value={selected} onValueChange={setSelected} className="w-full">
      <Tabs.List aria-label="Tab options">
        <Tabs.Trigger value="tab1">Overview</Tabs.Trigger>
        <Tabs.Trigger value="tab2">Features</Tabs.Trigger>
        <Tabs.Trigger value="tab3">Pricing</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="tab1" className="p-4 text-sm text-foreground-300">Overview content</Tabs.Content>
      <Tabs.Content value="tab2" className="p-4 text-sm text-foreground-300">Features content</Tabs.Content>
      <Tabs.Content value="tab3" className="p-4 text-sm text-foreground-300">Pricing content</Tabs.Content>
    </Tabs>
  );
}

function UnderlineTabsPreview() {
  const [selected, setSelected] = useState("tab1");

  return (
    <Tabs value={selected} onValueChange={setSelected} variant="underline" className="w-full">
      <Tabs.List aria-label="Tab options">
        <Tabs.Trigger value="tab1">Install</Tabs.Trigger>
        <Tabs.Trigger value="tab2">Usage</Tabs.Trigger>
        <Tabs.Trigger value="tab3">API</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value="tab1" className="p-4 text-sm text-foreground-300">Tabs Content 1</Tabs.Content>
      <Tabs.Content value="tab2" className="p-4 text-sm text-foreground-300">Tabs Content 2</Tabs.Content>
      <Tabs.Content value="tab3" className="p-4 text-sm text-foreground-300">Tabs Content 3</Tabs.Content>
    </Tabs>
  );
}

function VerticalTabsPreview() {
  const [selected, setSelected] = useState("tab1");

  return (
    <Tabs value={selected} onValueChange={setSelected} orientation="vertical" className="flex gap-4">
      <Tabs.List aria-label="Tab options" className="flex flex-col w-32">
        <Tabs.Trigger value="tab1">Account</Tabs.Trigger>
        <Tabs.Trigger value="tab2">Settings</Tabs.Trigger>
        <Tabs.Trigger value="tab3">Security</Tabs.Trigger>
      </Tabs.List>
      <div className="flex-1">
        <Tabs.Content value="tab1" className="text-sm text-foreground-300">Account settings content</Tabs.Content>
        <Tabs.Content value="tab2" className="text-sm text-foreground-300">Preferences and configuration</Tabs.Content>
        <Tabs.Content value="tab3" className="text-sm text-foreground-300">Password and security options</Tabs.Content>
      </div>
    </Tabs>
  );
}

function VerticalUnderlineTabsPreview() {
  const [selected, setSelected] = useState("tab1");

  return (
    <Tabs value={selected} onValueChange={setSelected} variant="underline" orientation="vertical" className="flex gap-4">
      <Tabs.List aria-label="Tab options" className="flex flex-col w-32">
        <Tabs.Trigger value="tab1">Profile</Tabs.Trigger>
        <Tabs.Trigger value="tab2">Billing</Tabs.Trigger>
        <Tabs.Trigger value="tab3">Team</Tabs.Trigger>
      </Tabs.List>
      <div className="flex-1">
        <Tabs.Content value="tab1" className="text-sm text-foreground-300">Profile information and details</Tabs.Content>
        <Tabs.Content value="tab2" className="text-sm text-foreground-300">Billing history and invoices</Tabs.Content>
        <Tabs.Content value="tab3" className="text-sm text-foreground-300">Team members and roles</Tabs.Content>
      </div>
    </Tabs>
  );
}

const examples: DevExample[] = [
  {
    id: "default-variant",
    title: "Default Variant",
    description: "Basic horizontal tabs with background highlight on active tab.",
    preview: <DefaultTabsPreview />,
    previewLayout: "start",
  },
  {
    id: "underline-variant",
    title: "Underline Variant",
    description: "Horizontal tabs with underline indicator. Great for documentation sites.",
    preview: <UnderlineTabsPreview />,
    previewLayout: "start",
  },
  {
    id: "vertical-layout",
    title: "Vertical Layout",
    description: "Vertical tabs with default variant. Perfect for settings pages and sidebars.",
    preview: <VerticalTabsPreview />,
    previewLayout: "start",
  },
  {
    id: "vertical-underline",
    title: "Vertical Underline",
    description: "Vertical tabs with underline variant indicator.",
    preview: <VerticalUnderlineTabsPreview />,
    previewLayout: "start",
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
