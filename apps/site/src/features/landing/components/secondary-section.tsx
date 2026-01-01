"use client";

import { useState } from "react";
import { FaArrowUp, FaBook, FaShop } from "react-icons/fa6";
import { Fold } from "ui-lab-components";
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
      { id: "saas-1", name: "Dashboard", description: "Analytics dashboard with real-time metrics" },
      { id: "saas-2", name: "User Management", description: "User administration interface" },
      { id: "saas-3", name: "Billing", description: "Subscription and payment interface" },
      { id: "saas-4", name: "Settings", description: "Application configuration panel" },
      { id: "saas-5", name: "Notifications", description: "Alert and notification center" },
      { id: "saas-6", name: "Team Collaboration", description: "Team workspace and sharing" },
    ],
  },
  {
    id: "documentation",
    name: "Documentation",
    icon: <FaBook />,
    examples: [
      { id: "docs-1", name: "API Reference", description: "API documentation interface" },
      { id: "docs-2", name: "Component Showcase", description: "Component gallery and examples" },
      { id: "docs-3", name: "Search Results", description: "Search and filter documentation" },
      { id: "docs-4", name: "Code Examples", description: "Code snippet viewer" },
    ],
  },
  {
    id: "marketing",
    name: "Marketing",
    icon: <FaArrowUp />,
    examples: [
      { id: "marketing-1", name: "Landing Page", description: "Hero section with CTA" },
      { id: "marketing-2", name: "Features Showcase", description: "Feature highlight section" },
      { id: "marketing-3", name: "Pricing Table", description: "Pricing plans comparison" },
      { id: "marketing-4", name: "Testimonials", description: "Customer testimonials section" },
      { id: "marketing-5", name: "Blog Grid", description: "Blog post listing" },
      { id: "marketing-6", name: "Case Study", description: "Case study showcase" },
      { id: "marketing-7", name: "FAQ", description: "Frequently asked questions" },
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

export function SecondarySection() {
  const [selectedCategoryId, setSelectedCategoryId] = useState(categories[0].id);
  const [selectedExampleId, setSelectedExampleId] = useState(categories[0].examples[0].id);

  const selectedCategory = categories.find((c) => c.id === selectedCategoryId);
  const selectedExample = selectedCategory?.examples.find((e) => e.id === selectedExampleId);

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
    <div className="bg-background-950 shadow-2xl ml-auto h-200 grid grid-cols-[400px_1fr] border-[2px] border-b-0 border-r-0 border-background-700 overflow-hidden">
      <div className="border-r-[2px] h-200 overflow-y-scroll border-background-700 flex flex-col">
        <div className="flex flex-col gap-2 p-3 flex-1">
          {categories.map((category) => (
            <Fold
              key={category.id}
              title={
                <div className="flex items-center gap-8">
                  {category.icon}
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
                    {example.description && (
                      <div className="text-sm text-foreground-400 mt-0.5">{example.description}</div>
                    )}
                  </button>
                ))}
              </div>
            </Fold>
          ))}
        </div>
      </div>

      <div className="overflow-auto flex flex-col">
        {selectedExample && (
          <PreviewProvider>
            <PreviewContent
              categoryId={selectedCategoryId}
              exampleId={selectedExample.id}
              exampleName={selectedExample.name}
              examplePrompts={examplePrompts}
              exampleCode={exampleCode}
            />
          </PreviewProvider>
        )}
      </div>
    </div>
  );
}
