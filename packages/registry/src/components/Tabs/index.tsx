import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from 'ui-lab-components';
import { ControlDef, ComponentDetail } from '@/types';
import Example1, { metadata as metadata1 } from './examples/01-basic-tabs.js';
import Example2, { metadata as metadata2 } from './examples/02-vertical-tabs.js';
import examplesJson from './examples.json';
import { loadComponentExamples } from '../../utils/load-component-examples';

// Define examplesData locally
const examplesData = [
  { id: '01-basic-tabs', Component: Example1, metadata: metadata1 },
  { id: '02-vertical-tabs', Component: Example2, metadata: metadata2 },
];


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
]

const tabsBasicCode = `import { Tabs } from "ui-lab-components";

export function Example() {
  return (
    <Tabs defaultValue="tab1">
      <TabsList>
        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">Content 1</TabsContent>
      <TabsContent value="tab2">Content 2</TabsContent>
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
        Built using React Aria hooks, it ensures proper keyboard navigation and accessibility. Supports icon badges, disabled states, and two visual variants: default (boxed) and underline.
      </p>
    </div>
  ),

  examples: [
    {
      id: "preview",
      title: "Preview",
      description: "Adjust props to customize the component",
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
        <Tabs defaultValue="tab1" variant={props.variant}>
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2" disabled={props.disabled}>Tab 2</TabsTrigger>
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
    ...loadComponentExamples(examplesData, examplesJson),
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
          </TabsList>
          <TabsContent value="tab1">
            <p className="text-foreground-300">Content 1</p>
          </TabsContent>
          <TabsContent value="tab2">
            <p className="text-foreground-300">Content 2</p>
          </TabsContent>
        </Tabs>
      ),
    },
    {
      id: "underline",
      name: "Underline",
      description: "Minimal underline tabs for a cleaner appearance.",
      code: `<Tabs variant="underline">...</Tabs>`,
      preview: (
        <Tabs defaultValue="tab1" variant="underline">
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2">Tab 2</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1" className="mt-6">
            <p className="text-foreground-300">Content 1</p>
          </TabsContent>
          <TabsContent value="tab2" className="mt-6">
            <p className="text-foreground-300">Content 2</p>
          </TabsContent>
        </Tabs>
      ),
    },
  ],
};

export { tabsControls };
export * from './examples';
