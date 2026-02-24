"use client";

import { useState } from "react";
import { DevExampleLayout, type DevExample } from "../dev-example-layout";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "ui-lab-components";

function DefaultTabsPreview() {
  const [selected, setSelected] = useState("tab1");

  return (
    <Tabs value={selected} onValueChange={setSelected} className="w-full">
      <TabsList aria-label="Tab options">
        <TabsTrigger value="tab1">Overview</TabsTrigger>
        <TabsTrigger value="tab2">Features</TabsTrigger>
        <TabsTrigger value="tab3">Pricing</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1" className="p-4 text-sm text-foreground-300">Overview content</TabsContent>
      <TabsContent value="tab2" className="p-4 text-sm text-foreground-300">Features content</TabsContent>
      <TabsContent value="tab3" className="p-4 text-sm text-foreground-300">Pricing content</TabsContent>
    </Tabs>
  );
}

function UnderlineTabsPreview() {
  const [selected, setSelected] = useState("tab1");

  return (
    <Tabs value={selected} onValueChange={setSelected} variant="underline" className="w-full">
      <TabsList aria-label="Tab options">
        <TabsTrigger value="tab1">Install</TabsTrigger>
        <TabsTrigger value="tab2">Usage</TabsTrigger>
        <TabsTrigger value="tab3">API</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1" className="p-4 text-sm text-foreground-300">Tabs Content 1</TabsContent>
      <TabsContent value="tab2" className="p-4 text-sm text-foreground-300">Tabs Content 2</TabsContent>
      <TabsContent value="tab3" className="p-4 text-sm text-foreground-300">Tabs Content 3</TabsContent>
    </Tabs>
  );
}

function VerticalTabsPreview() {
  const [selected, setSelected] = useState("tab1");

  return (
    <Tabs value={selected} onValueChange={setSelected} orientation="vertical" className="flex gap-4">
      <TabsList aria-label="Tab options" className="flex flex-col w-32">
        <TabsTrigger value="tab1">Account</TabsTrigger>
        <TabsTrigger value="tab2">Settings</TabsTrigger>
        <TabsTrigger value="tab3">Security</TabsTrigger>
      </TabsList>
      <div className="flex-1">
        <TabsContent value="tab1" className="text-sm text-foreground-300">Account settings content</TabsContent>
        <TabsContent value="tab2" className="text-sm text-foreground-300">Preferences and configuration</TabsContent>
        <TabsContent value="tab3" className="text-sm text-foreground-300">Password and security options</TabsContent>
      </div>
    </Tabs>
  );
}

function VerticalUnderlineTabsPreview() {
  const [selected, setSelected] = useState("tab1");

  return (
    <Tabs value={selected} onValueChange={setSelected} variant="underline" orientation="vertical" className="flex gap-4">
      <TabsList aria-label="Tab options" className="flex flex-col w-32">
        <TabsTrigger value="tab1">Profile</TabsTrigger>
        <TabsTrigger value="tab2">Billing</TabsTrigger>
        <TabsTrigger value="tab3">Team</TabsTrigger>
      </TabsList>
      <div className="flex-1">
        <TabsContent value="tab1" className="text-sm text-foreground-300">Profile information and details</TabsContent>
        <TabsContent value="tab2" className="text-sm text-foreground-300">Billing history and invoices</TabsContent>
        <TabsContent value="tab3" className="text-sm text-foreground-300">Team members and roles</TabsContent>
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
