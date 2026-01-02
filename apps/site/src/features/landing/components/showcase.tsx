"use client";

import { useState } from "react";
import { FaArrowUp, FaBook, FaShop, FaStar } from "react-icons/fa6";
import { Fold, Grid, Button, Input, Checkbox, Radio, Badge, Card, Select, SelectListBox, Slider, Gallery } from "ui-lab-components";
import { PreviewProvider, PreviewContent } from "@/features/preview";

interface Example {
  id: string;
  name: string;
  code?: string;
  description?: string;
}

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  examples: Example[];
}

const categories: Category[] = [
  {
    id: "saas",
    name: "SaaS",
    icon: <FaShop />,
    examples: [
      { id: "saas-1", name: "Dashboard" },
      { id: "saas-2", name: "User Management" },
      { id: "saas-3", name: "Billing" },
      { id: "saas-4", name: "Settings" },
      { id: "saas-5", name: "Notifications" },
      { id: "saas-6", name: "Team Collaboration" },
    ],
  },
  {
    id: "documentation",
    name: "Documentation",
    icon: <FaBook />,
    examples: [
      { id: "docs-1", name: "API Reference" },
      { id: "docs-2", name: "Component Showcase" },
      { id: "docs-3", name: "Search Results" },
      { id: "docs-4", name: "Code Examples" },
    ],
  },
  {
    id: "marketing",
    name: "Marketing",
    icon: <FaArrowUp />,
    examples: [
      { id: "marketing-1", name: "Landing Page" },
      { id: "marketing-2", name: "Features Showcase" },
      { id: "marketing-3", name: "Pricing Table" },
      { id: "marketing-4", name: "Testimonials" },
      { id: "marketing-5", name: "Blog Grid" },
      { id: "marketing-6", name: "Case Study" },
      { id: "marketing-7", name: "FAQ" },
    ],
  },
];

const examplePrompts: Record<string, string> = {
  "saas-1": "Create a comprehensive analytics dashboard with real-time metrics, charts, and KPI displays for a SaaS application",
  "saas-2": "Build a user management interface with user listing, editing, role assignment, and permission management",
  "saas-3": "Design a billing and subscription management interface with plan selection, payment methods, and invoice history",
  "docs-1": "Generate an API reference documentation page with endpoint listings, parameter descriptions, and code examples",
  "marketing-1": "Create a modern landing page hero section with headline, subheading, and call-to-action buttons",
  "marketing-2": "Design a features showcase section highlighting key product features with icons and descriptions",
};

const coreComponents = [
  {
    id: "button",
    name: "Button",
    category: "basic",
    height: "h-20",
    columnSpan: 1,
    rowSpan: 1,
    render: () => <Button variant="secondary">Click me</Button>,
  },
  {
    id: "input",
    name: "Input",
    category: "basic",
    height: "h-32",
    columnSpan: 2,
    rowSpan: 1,
    render: () => <Input placeholder="Enter text..." />,
  },
  {
    id: "checkbox",
    name: "Checkbox",
    category: "basic",
    height: "h-28",
    columnSpan: 1,
    rowSpan: 2,
    render: () => <Checkbox defaultChecked label="Accept" />,
  },
  {
    id: "radio",
    name: "Radio",
    category: "basic",
    height: "h-24",
    columnSpan: 2,
    rowSpan: 2,
    render: () => <Radio value="option1" label="Select" />,
  },
  {
    id: "badge",
    name: "Badge",
    category: "basic",
    height: "h-16",
    columnSpan: 1,
    rowSpan: 1,
    render: () => <Badge>New</Badge>,
  },
  {
    id: "slider",
    name: "Slider",
    category: "basic",
    height: "h-36",
    columnSpan: 2,
    rowSpan: 1,
    render: () => (
      <div className="w-full">
        <Slider.Root min={0} max={100} defaultValue={[50]} />
      </div>
    ),
  },
  {
    id: "card",
    name: "Card",
    category: "container",
    height: "h-40",
    columnSpan: 1,
    rowSpan: 2,
    render: () => (
      <Card className="w-full h-full">
        <Card.Body>
          <p className="text-xs">Card content</p>
        </Card.Body>
      </Card>
    ),
  },
  {
    id: "select",
    name: "Select",
    category: "basic",
    height: "h-26",
    columnSpan: 1,
    rowSpan: 1,
    render: () => (
      <Select>
        <Select.Trigger>
          <Select.Value placeholder="Pick one" />
        </Select.Trigger>
        <Select.Content>
          <SelectListBox>
            <Select.Item value="option1">Option 1</Select.Item>
            <Select.Item value="option2">Option 2</Select.Item>
          </SelectListBox>
        </Select.Content>
      </Select>
    ),
  },
];

const exampleCode = `import { Flex } from "ui-lab-components";

export function Example() {
  return (
    <Flex direction="column" gap="md" className="p-6">
      <div className="p-4 bg-accent-500/10 rounded-lg border border-accent-500/30">
        <h2 className="text-foreground-50 font-semibold mb-2">Header</h2>
        <p className="text-foreground-400 text-sm">This is the generated UI content</p>
      </div>
      <Flex gap="md">
        <div className="flex-1 p-4 bg-background-800 rounded-lg">Sidebar</div>
        <div className="flex-1 p-4 bg-background-800 rounded-lg">Content</div>
      </Flex>
    </Flex>
  );
}`;

export function Showcase() {
  const [selectedCategoryId, setSelectedCategoryId] = useState("core");
  const [selectedExampleId, setSelectedExampleId] = useState(categories[0].examples[0].id);

  const isCore = selectedCategoryId === "core";
  const selectedCategory = !isCore ? categories.find((c) => c.id === selectedCategoryId) : null;
  const selectedExample = !isCore ? selectedCategory?.examples.find((e) => e.id === selectedExampleId) : null;

  const handleCoreClick = () => {
    setSelectedCategoryId("core");
  };

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    const category = categories.find((c) => c.id === categoryId);
    if (category) {
      setSelectedExampleId(category.examples[0].id);
    }
  };

  const handleExampleClick = (exampleId: string) => {
    setSelectedExampleId(exampleId);
  };

  return (
    <div className="bg-background-950 ml-auto h-200 grid grid-cols-[230px_1fr] border-t-[2px] border-b-0 border-background-700 overflow-hidden">
      <div className="h-200 border-r-[2px] overflow-y-scroll border-background-700 flex flex-col">
        <div className="flex flex-col gap-2 flex-1">
          <button
            onClick={handleCoreClick}
            className={`border-background-700 m-2 mb-0 flex items-center gap-4 p-2 hover:bg-background-800 transition-all rounded-[6px] ${isCore
              ? "bg-background-800 text-foreground-200"
              : "text-foreground-400"
              }`}
          >
            <div className="text-left">
              <div className="text-sm font-medium text-foreground-200">Core</div>
              <div className="text-sm text-foreground-400">{coreComponents.length} components</div>
            </div>
          </button>

          <div className="border-t border-background-700">
            {categories.map((category) => (
              <Fold
                key={category.id}
                className="p-2 border-b border-background-700"
                title={
                  <div
                    className="flex items-center gap-4 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCategoryClick(category.id);
                    }}
                  >
                    <div>
                      <div className="text-sm font-medium text-foreground-200">{category.name}</div>
                      <div className="text-sm text-foreground-400">{category.examples.length} examples</div>
                    </div>
                  </div>
                }
                defaultExpanded={selectedCategoryId === category.id}
                onChange={() => {
                  handleCategoryClick(category.id);
                }}
              >
                <Fold.Divider className="hidden" />
                <div className="grid grid-cols-1 gap-2">
                  {category.examples.map((example) => (
                    <button
                      key={example.id}
                      onClick={() => handleExampleClick(example.id)}
                      className={`text-left px-3 py-2 hover:bg-background-800 rounded-lg transition-all text-sm ${selectedExampleId === example.id
                        ? "bg-background-800 text-foreground-200"
                        : "text-foreground-400"
                        }`}
                    >
                      <strong className="font-medium">{example.name}</strong>
                    </button>
                  ))}
                </div>
              </Fold>
            ))}
          </div>
        </div>
      </div>

      <div className="overflow-auto flex flex-col">
        {isCore ? (
          <div className="flex-1 overflow-auto">
            <Gallery columns={4} gap="md" className="-mr-1">
              {coreComponents.map((component) => (
                <Gallery.Item className="border-l-0 border-t-0 rounded-none" key={component.id} columnSpan={component.columnSpan} rowSpan={component.rowSpan}>
                  <Gallery.View aspectRatio="auto" className="bg-transparent!">
                    <div className={`flex flex-col gap-3 p-4 h-full ${component.height}`}>
                      <div className="flex items-center justify-center flex-1 p-2">
                        {component.render()}
                      </div>
                    </div>
                  </Gallery.View>
                </Gallery.Item>
              ))}
            </Gallery>
          </div>
        ) : selectedExample ? (
          <PreviewProvider>
            <PreviewContent
              categoryId={selectedCategoryId}
              exampleId={selectedExample.id}
              exampleName={selectedExample.name}
              examplePrompts={examplePrompts}
              exampleCode={exampleCode}
            />
          </PreviewProvider>
        ) : null}
      </div>
    </div>
  );
}
