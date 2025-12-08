import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@ui-lab/components";
import { Badge } from "@ui-lab/components";
import { Button } from "@ui-lab/components";
import { ComponentDetail } from "@/types/component";
import { ControlDef } from "@/components/component-configurator";
import { FaUser, FaGear, FaBell, FaBook, FaCode, FaDatabase, FaWrench, FaLock } from "react-icons/fa6";

// Control definitions for the tabs configurator
const tabsControls: ControlDef[] = [
  {
    name: "variant",
    label: "Variant",
    type: "select",
    options: [
      { label: "Default", value: "default" },
      { label: "Underline", value: "underline" },
    ],
    defaultValue: "default",
  },
  {
    name: "disabled",
    label: "Disable Second Tab",
    type: "toggle",
    defaultValue: false,
  },
];

const tabsBasicCode = `import { Tabs, TabsList, TabsTrigger, TabsContent } from "@ui-lab/components";

export function Example() {
  return (
    <Tabs defaultValue="tab1">
      <TabsList>
        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        <TabsTrigger value="tab3">Tab 3</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <p className="text-foreground-300">Content for Tab 1</p>
      </TabsContent>
      <TabsContent value="tab2">
        <p className="text-foreground-300">Content for Tab 2</p>
      </TabsContent>
      <TabsContent value="tab3">
        <p className="text-foreground-300">Content for Tab 3</p>
      </TabsContent>
    </Tabs>
  );
}`;

const tabsWithIconsCode = `import { Tabs, TabsList, TabsTrigger, TabsContent } from "@ui-lab/components";
import { FaUser, FaGear, FaBell } from "react-icons/fa6";

export function Example() {
  return (
    <Tabs defaultValue="account">
      <TabsList>
        <TabsTrigger value="account" icon={<FaUser className="w-4 h-4" />}>
          Account
        </TabsTrigger>
        <TabsTrigger value="settings" icon={<FaGear className="w-4 h-4" />}>
          Settings
        </TabsTrigger>
        <TabsTrigger value="notifications" icon={<FaBell className="w-4 h-4" />}>
          Notifications
        </TabsTrigger>
      </TabsList>
      <TabsContent value="account" className="space-y-2">
        <p className="text-foreground-300">Account settings go here</p>
      </TabsContent>
      <TabsContent value="settings" className="space-y-2">
        <p className="text-foreground-300">Application settings go here</p>
      </TabsContent>
      <TabsContent value="notifications" className="space-y-2">
        <p className="text-foreground-300">Notification preferences go here</p>
      </TabsContent>
    </Tabs>
  );
}`;

const tabsUnderlineCode = `import { Tabs, TabsList, TabsTrigger, TabsContent } from "@ui-lab/components";

export function Example() {
  return (
    <Tabs defaultValue="overview" variant="underline">
      <TabsList variant="underline">
        <TabsTrigger value="overview" variant="underline">
          Overview
        </TabsTrigger>
        <TabsTrigger value="analytics" variant="underline">
          Analytics
        </TabsTrigger>
        <TabsTrigger value="reports" variant="underline">
          Reports
        </TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="mt-6">
        <p className="text-foreground-300">Overview content</p>
      </TabsContent>
      <TabsContent value="analytics" className="mt-6">
        <p className="text-foreground-300">Analytics content</p>
      </TabsContent>
      <TabsContent value="reports" className="mt-6">
        <p className="text-foreground-300">Reports content</p>
      </TabsContent>
    </Tabs>
  );
}`;

const tabsDisabledCode = `import { Tabs, TabsList, TabsTrigger, TabsContent } from "@ui-lab/components";

export function Example() {
  return (
    <Tabs defaultValue="enabled1">
      <TabsList>
        <TabsTrigger value="enabled1">Enabled</TabsTrigger>
        <TabsTrigger value="disabled" disabled>
          Disabled
        </TabsTrigger>
        <TabsTrigger value="enabled2">Enabled</TabsTrigger>
      </TabsList>
      <TabsContent value="enabled1">
        <p className="text-foreground-300">This tab is enabled</p>
      </TabsContent>
      <TabsContent value="disabled">
        <p className="text-foreground-300">You cannot reach this tab</p>
      </TabsContent>
      <TabsContent value="enabled2">
        <p className="text-foreground-300">This tab is also enabled</p>
      </TabsContent>
    </Tabs>
  );
}`;

const tabsDocumentationCode = `import { Tabs, TabsList, TabsTrigger, TabsContent } from "@ui-lab/components";
import { FaBook, FaCode, FaDatabase } from "react-icons/fa6";

export function Example() {
  return (
    <Tabs defaultValue="docs" className="w-full">
      <TabsList className="w-full">
        <TabsTrigger value="docs" icon={<FaBook className="w-4 h-4" />} className="flex-1">
          Documentation
        </TabsTrigger>
        <TabsTrigger value="api" icon={<FaCode className="w-4 h-4" />} className="flex-1">
          API Reference
        </TabsTrigger>
        <TabsTrigger value="schema" icon={<FaDatabase className="w-4 h-4" />} className="flex-1">
          Schema
        </TabsTrigger>
      </TabsList>
      <TabsContent value="docs" className="mt-6">
        <div className="space-y-4">
          <h3 className="font-semibold text-foreground-100">Getting Started</h3>
          <p className="text-sm text-foreground-400">
            Learn how to integrate and use our component library in your project.
          </p>
        </div>
      </TabsContent>
      <TabsContent value="api" className="mt-6">
        <div className="space-y-4">
          <h3 className="font-semibold text-foreground-100">API Endpoints</h3>
          <div className="space-y-2">
            <div className="p-2 bg-background-800 rounded text-xs text-foreground-400">
              GET /api/components
            </div>
            <div className="p-2 bg-background-800 rounded text-xs text-foreground-400">
              POST /api/components
            </div>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="schema" className="mt-6">
        <div className="space-y-4">
          <h3 className="font-semibold text-foreground-100">Data Schema</h3>
          <pre className="p-3 bg-background-800 rounded text-xs text-foreground-300 overflow-auto">
{JSON.stringify({ id: "string", name: "string", type: "string" }, null, 2)}
          </pre>
        </div>
      </TabsContent>
    </Tabs>
  );
}`;

export const tabsDetail: ComponentDetail = {
  id: "tabs",
  name: "Tabs",
  description: "A tabbed interface component for organizing content into multiple sections with icon support and accessible tab management.",
  overview: (
    <div className="space-y-4 text-foreground-300">
      <p>
        The Tabs component provides a clean and intuitive way to organize content into multiple sections. Users can switch between content areas without leaving the page, making it perfect for dashboards, settings panels, and documentation.
      </p>
      <p>
        Built on Radix UI's Tabs primitive, it ensures proper keyboard navigation and accessibility. Supports icon badges, disabled states, and two visual variants: default (boxed) and underline.
      </p>
    </div>
  ),

  examples: [
    {
      id: "basic",
      title: "Basic Tabs",
      description: "The simplest form of tabs with three sections.",
      code: tabsBasicCode,
      preview: (
        <Tabs defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2">Tab 2</TabsTrigger>
            <TabsTrigger value="tab3">Tab 3</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">
            <p className="text-foreground-300">Content for Tab 1</p>
          </TabsContent>
          <TabsContent value="tab2">
            <p className="text-foreground-300">Content for Tab 2</p>
          </TabsContent>
          <TabsContent value="tab3">
            <p className="text-foreground-300">Content for Tab 3</p>
          </TabsContent>
        </Tabs>
      ),
      controls: tabsControls,
      renderPreview: (props: any) => (
        <Tabs defaultValue="tab1">
          <TabsList variant={props.variant as any}>
            <TabsTrigger value="tab1" variant={props.variant as any}>
              Tab 1
            </TabsTrigger>
            <TabsTrigger value="tab2" variant={props.variant as any} disabled={props.disabled}>
              Tab 2
            </TabsTrigger>
            <TabsTrigger value="tab3" variant={props.variant as any}>
              Tab 3
            </TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">
            <p className="text-foreground-300">Content for Tab 1</p>
          </TabsContent>
          <TabsContent value="tab2">
            <p className="text-foreground-300">Content for Tab 2</p>
          </TabsContent>
          <TabsContent value="tab3">
            <p className="text-foreground-300">Content for Tab 3</p>
          </TabsContent>
        </Tabs>
      ),
    },
    {
      id: "with-icons",
      title: "Tabs with Icons",
      description: "Tabs with icon support for enhanced visual communication.",
      code: tabsWithIconsCode,
      preview: (
        <Tabs defaultValue="account">
          <TabsList>
            <TabsTrigger value="account" icon={<FaUser className="w-4 h-4" />}>
              Account
            </TabsTrigger>
            <TabsTrigger value="settings" icon={<FaGear className="w-4 h-4" />}>
              Settings
            </TabsTrigger>
            <TabsTrigger value="notifications" icon={<FaBell className="w-4 h-4" />}>
              Notifications
            </TabsTrigger>
          </TabsList>
          <TabsContent value="account" className="space-y-2">
            <p className="text-foreground-300">Account settings go here</p>
          </TabsContent>
          <TabsContent value="settings" className="space-y-2">
            <p className="text-foreground-300">Application settings go here</p>
          </TabsContent>
          <TabsContent value="notifications" className="space-y-2">
            <p className="text-foreground-300">Notification preferences go here</p>
          </TabsContent>
        </Tabs>
      ),
    },
    {
      id: "underline",
      title: "Underline Variant",
      description: "Minimal underline tab variant for a cleaner look.",
      code: tabsUnderlineCode,
      preview: (
        <Tabs defaultValue="overview">
          <TabsList variant="underline">
            <TabsTrigger value="overview" variant="underline">
              Overview
            </TabsTrigger>
            <TabsTrigger value="analytics" variant="underline">
              Analytics
            </TabsTrigger>
            <TabsTrigger value="reports" variant="underline">
              Reports
            </TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="mt-6">
            <p className="text-foreground-300">Overview content</p>
          </TabsContent>
          <TabsContent value="analytics" className="mt-6">
            <p className="text-foreground-300">Analytics content</p>
          </TabsContent>
          <TabsContent value="reports" className="mt-6">
            <p className="text-foreground-300">Reports content</p>
          </TabsContent>
        </Tabs>
      ),
    },
    {
      id: "disabled",
      title: "Disabled States",
      description: "Tabs support disabled states to prevent interaction with certain sections.",
      code: tabsDisabledCode,
      preview: (
        <Tabs defaultValue="enabled1">
          <TabsList>
            <TabsTrigger value="enabled1">Enabled</TabsTrigger>
            <TabsTrigger value="disabled" disabled>
              Disabled
            </TabsTrigger>
            <TabsTrigger value="enabled2">Enabled</TabsTrigger>
          </TabsList>
          <TabsContent value="enabled1">
            <p className="text-foreground-300">This tab is enabled</p>
          </TabsContent>
          <TabsContent value="disabled">
            <p className="text-foreground-300">You cannot reach this tab</p>
          </TabsContent>
          <TabsContent value="enabled2">
            <p className="text-foreground-300">This tab is also enabled</p>
          </TabsContent>
        </Tabs>
      ),
    },
    {
      id: "documentation",
      title: "Documentation Example",
      description: "Multi-section documentation interface with icons and structured content.",
      code: tabsDocumentationCode,
      preview: (
        <Tabs defaultValue="docs" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="docs" icon={<FaBook className="w-4 h-4" />} className="flex-1">
              Documentation
            </TabsTrigger>
            <TabsTrigger value="api" icon={<FaCode className="w-4 h-4" />} className="flex-1">
              API Reference
            </TabsTrigger>
            <TabsTrigger value="schema" icon={<FaDatabase className="w-4 h-4" />} className="flex-1">
              Schema
            </TabsTrigger>
          </TabsList>
          <TabsContent value="docs" className="mt-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground-100">Getting Started</h3>
              <p className="text-sm text-foreground-400">
                Learn how to integrate and use our component library in your project.
              </p>
            </div>
          </TabsContent>
          <TabsContent value="api" className="mt-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground-100">API Endpoints</h3>
              <div className="space-y-2">
                <div className="p-2 bg-background-800 rounded text-xs text-foreground-400">
                  GET /api/components
                </div>
                <div className="p-2 bg-background-800 rounded text-xs text-foreground-400">
                  POST /api/components
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="schema" className="mt-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground-100">Data Schema</h3>
              <pre className="p-3 bg-background-800 rounded text-xs text-foreground-300 overflow-auto">
                {JSON.stringify({ id: "string", name: "string", type: "string" }, null, 2)}
              </pre>
            </div>
          </TabsContent>
        </Tabs>
      ),
    },
  ],

  variants: [
    {
      id: "default",
      name: "Default",
      description: "Standard boxed tabs with active state highlighting.",
      code: tabsBasicCode,
      preview: (
        <Tabs defaultValue="tab1">
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2">Tab 2</TabsTrigger>
            <TabsTrigger value="tab3">Tab 3</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">
            <p className="text-foreground-300">Content for Tab 1</p>
          </TabsContent>
          <TabsContent value="tab2">
            <p className="text-foreground-300">Content for Tab 2</p>
          </TabsContent>
          <TabsContent value="tab3">
            <p className="text-foreground-300">Content for Tab 3</p>
          </TabsContent>
        </Tabs>
      ),
    },
    {
      id: "underline",
      name: "Underline",
      description: "Minimal underline tabs for a cleaner, less prominent appearance.",
      code: tabsUnderlineCode,
      preview: (
        <Tabs defaultValue="tab1">
          <TabsList variant="underline">
            <TabsTrigger value="tab1" variant="underline">
              Tab 1
            </TabsTrigger>
            <TabsTrigger value="tab2" variant="underline">
              Tab 2
            </TabsTrigger>
            <TabsTrigger value="tab3" variant="underline">
              Tab 3
            </TabsTrigger>
          </TabsList>
          <TabsContent value="tab1" className="mt-6">
            <p className="text-foreground-300">Content for Tab 1</p>
          </TabsContent>
          <TabsContent value="tab2" className="mt-6">
            <p className="text-foreground-300">Content for Tab 2</p>
          </TabsContent>
          <TabsContent value="tab3" className="mt-6">
            <p className="text-foreground-300">Content for Tab 3</p>
          </TabsContent>
        </Tabs>
      ),
    },
  ],
};
