import React from "react";
import { Page } from "@/components/page";
import { ComponentDetail } from "@/types/component";
import { FaGraduationCap, FaCode } from "react-icons/fa6";

const basicPageCode = `import { Page } from "@ui-lab/components";

export function Example() {
  return (
    <Page>
      <Page.Header>
        <h1 className="text-2xl font-bold">Page Title</h1>
      </Page.Header>
      <Page.Content>
        <div className="space-y-4">
          <p>Welcome to the page content area.</p>
        </div>
      </Page.Content>
    </Page>
  );
}`;

const sidebarLeftCode = `import { Page } from "@ui-lab/components";

export function Example() {
  return (
    <Page layout="sidebar-left">
      <Page.Sidebar>
        <nav className="space-y-2 p-4">
          <div className="px-3 py-2 rounded hover:bg-background-700 cursor-pointer">
            Dashboard
          </div>
          <div className="px-3 py-2 rounded hover:bg-background-700 cursor-pointer">
            Settings
          </div>
          <div className="px-3 py-2 rounded hover:bg-background-700 cursor-pointer">
            Profile
          </div>
        </nav>
      </Page.Sidebar>
      <div className="flex-1 flex flex-col">
        <Page.Header>
          <h1 className="text-2xl font-bold">Dashboard</h1>
        </Page.Header>
        <Page.Content>
          <p>Your main content goes here.</p>
        </Page.Content>
      </div>
    </Page>
  );
}`;

const fullLayoutCode = `import { Page } from "@ui-lab/components";

export function Example() {
  return (
    <Page>
      <Page.Header>
        <h1 className="text-2xl font-bold">Application</h1>
      </Page.Header>
      <div className="flex flex-1">
        <Page.Sidebar width="md">
          <nav className="space-y-2 p-4">
            <div className="px-3 py-2 rounded hover:bg-background-700 cursor-pointer">
              Navigation Item 1
            </div>
            <div className="px-3 py-2 rounded hover:bg-background-700 cursor-pointer">
              Navigation Item 2
            </div>
          </nav>
        </Page.Sidebar>
        <Page.Content>
          <h2 className="text-xl font-semibold mb-4">Main Content</h2>
          <p>Your content area here.</p>
        </Page.Content>
      </div>
      <Page.Footer>
        <p className="text-sm text-foreground-400">© 2024 Your Company</p>
      </Page.Footer>
    </Page>
  );
}`;

const compactSidebarCode = `import { Page } from "@ui-lab/components";

export function Example() {
  return (
    <Page layout="sidebar-right">
      <div className="flex flex-1 flex-col">
        <Page.Header>
          <h1 className="text-2xl font-bold">Main Content</h1>
        </Page.Header>
        <Page.Content>
          <h2 className="text-lg font-semibold mb-2">Article Title</h2>
          <p className="text-foreground-300">
            Main content goes here with detailed information.
          </p>
        </Page.Content>
      </div>
      <Page.Sidebar width="sm">
        <div className="p-4 space-y-4">
          <div className="bg-background-700 p-3 rounded">
            <h3 className="font-semibold mb-2">Related</h3>
            <ul className="text-sm text-foreground-300 space-y-1">
              <li>• Related Item 1</li>
              <li>• Related Item 2</li>
            </ul>
          </div>
        </div>
      </Page.Sidebar>
    </Page>
  );
}`;

export const pageDetail: ComponentDetail = {
  id: "page",
  name: "Page",
  description: "A flexible layout component for building page structures with optional headers, sidebars, content areas, and footers.",
  overview: (
    <div className="space-y-4 text-foreground-300">
      <p>
        The Page component provides a powerful compound component pattern for building complete page layouts. It supports multiple layout configurations including sidebar-left, sidebar-right, and default layouts.
      </p>
      <p>
        Perfect for dashboards, admin panels, documentation sites, and any application that needs a structured page layout with navigation sidebars and content areas.
      </p>
    </div>
  ),

  examples: [
    {
      id: "basic",
      title: "Basic Page",
      description: "A simple page with header and content area.",
      code: basicPageCode,
      preview: (
        <div className="h-64 bg-background-900 rounded-lg overflow-hidden border border-background-700">
          <Page>
            <Page.Header>
              <h1 className="text-xl font-bold">Page Title</h1>
            </Page.Header>
            <Page.Content>
              <div className="space-y-4">
                <p className="text-sm">Welcome to the page content area.</p>
              </div>
            </Page.Content>
          </Page>
        </div>
      ),
    },
    {
      id: "sidebar-left",
      title: "Sidebar Layout (Left)",
      description: "Page with sidebar navigation on the left side.",
      code: sidebarLeftCode,
      preview: (
        <div className="h-64 bg-background-900 rounded-lg overflow-hidden border border-background-700">
          <Page layout="sidebar-left">
            <Page.Sidebar width="sm">
              <nav className="space-y-1 p-3">
                <div className="px-3 py-1.5 text-sm rounded hover:bg-background-700 cursor-pointer">
                  Dashboard
                </div>
                <div className="px-3 py-1.5 text-sm rounded hover:bg-background-700 cursor-pointer">
                  Settings
                </div>
                <div className="px-3 py-1.5 text-sm rounded hover:bg-background-700 cursor-pointer">
                  Profile
                </div>
              </nav>
            </Page.Sidebar>
            <div className="flex-1 flex flex-col">
              <Page.Header>
                <h2 className="text-lg font-bold">Dashboard</h2>
              </Page.Header>
              <Page.Content>
                <p className="text-sm">Your main content.</p>
              </Page.Content>
            </div>
          </Page>
        </div>
      ),
    },
    {
      id: "full-layout",
      title: "Complete Layout",
      description: "Full page layout with header, sidebar, content, and footer.",
      code: fullLayoutCode,
      preview: (
        <div className="h-80 bg-background-900 rounded-lg overflow-hidden border border-background-700">
          <Page>
            <Page.Header>
              <h1 className="text-xl font-bold">Application</h1>
            </Page.Header>
            <div className="flex flex-1">
              <Page.Sidebar width="sm">
                <nav className="space-y-1 p-3">
                  <div className="px-3 py-1.5 text-sm rounded hover:bg-background-700 cursor-pointer">
                    Nav 1
                  </div>
                  <div className="px-3 py-1.5 text-sm rounded hover:bg-background-700 cursor-pointer">
                    Nav 2
                  </div>
                </nav>
              </Page.Sidebar>
              <Page.Content>
                <h2 className="text-base font-semibold mb-2">Main Content</h2>
                <p className="text-sm">Your content here.</p>
              </Page.Content>
            </div>
            <Page.Footer>
              <p className="text-xs text-foreground-400">© 2024</p>
            </Page.Footer>
          </Page>
        </div>
      ),
    },
    {
      id: "sidebar-right",
      title: "Sidebar Layout (Right)",
      description: "Page with sidebar on the right side for related content or metadata.",
      code: compactSidebarCode,
      preview: (
        <div className="h-64 bg-background-900 rounded-lg overflow-hidden border border-background-700">
          <Page layout="sidebar-right">
            <div className="flex flex-1 flex-col">
              <Page.Header>
                <h2 className="text-lg font-bold">Main Content</h2>
              </Page.Header>
              <Page.Content>
                <h3 className="text-base font-semibold mb-1">Article</h3>
                <p className="text-sm">Main content area.</p>
              </Page.Content>
            </div>
            <Page.Sidebar width="sm">
              <div className="p-3 space-y-3">
                <div className="bg-background-700 p-2 rounded text-xs">
                  <h4 className="font-semibold mb-1">Related</h4>
                  <ul className="text-foreground-400 space-y-0.5">
                    <li>• Item 1</li>
                    <li>• Item 2</li>
                  </ul>
                </div>
              </div>
            </Page.Sidebar>
          </Page>
        </div>
      ),
    },
  ],

  variants: [
    {
      id: "default",
      name: "Default Layout",
      description: "Standard vertical layout with header and content.",
      code: basicPageCode,
      preview: (
        <div className="h-48 bg-background-900 rounded-lg overflow-hidden border border-background-700">
          <Page>
            <Page.Header>
              <h1 className="text-lg font-bold">Default Layout</h1>
            </Page.Header>
            <Page.Content>
              <p className="text-sm">Content area</p>
            </Page.Content>
          </Page>
        </div>
      ),
    },
    {
      id: "sidebar-left-variant",
      name: "Sidebar Left",
      description: "Sidebar positioned on the left for navigation.",
      code: sidebarLeftCode,
      preview: (
        <div className="h-48 bg-background-900 rounded-lg overflow-hidden border border-background-700">
          <Page layout="sidebar-left">
            <Page.Sidebar width="sm">
              <div className="p-3 text-xs text-foreground-400">Navigation</div>
            </Page.Sidebar>
            <div className="flex-1">
              <Page.Header>
                <h2 className="text-base font-bold">Content</h2>
              </Page.Header>
            </div>
          </Page>
        </div>
      ),
    },
    {
      id: "sidebar-right-variant",
      name: "Sidebar Right",
      description: "Sidebar positioned on the right for related content.",
      code: compactSidebarCode,
      preview: (
        <div className="h-48 bg-background-900 rounded-lg overflow-hidden border border-background-700">
          <Page layout="sidebar-right">
            <div className="flex-1">
              <Page.Header>
                <h2 className="text-base font-bold">Content</h2>
              </Page.Header>
            </div>
            <Page.Sidebar width="sm">
              <div className="p-3 text-xs text-foreground-400">Related</div>
            </Page.Sidebar>
          </Page>
        </div>
      ),
    },
  ],

  props: [
    {
      name: "layout",
      type: '"default" | "sidebar-left" | "sidebar-right"',
      default: '"default"',
      description: "The layout configuration for the page structure.",
    },
    {
      name: "className",
      type: "string",
      description: "Additional CSS classes to apply to the page root.",
    },
    {
      name: "width",
      type: '"sm" | "md" | "lg"',
      default: '"md"',
      description: "Width of the sidebar (Sidebar component only).",
    },
  ],

  usage: (
    <div className="space-y-4 text-foreground-300">
      <div>
        <h3 className="font-semibold text-foreground-100 mb-2">Common Patterns</h3>
        <ul className="space-y-2 text-sm">
          <li className="flex items-start gap-2">
            <FaCode className="mt-1 flex-shrink-0" />
            <span><strong>Dashboard:</strong> Use sidebar-left with navigation items for admin dashboards.</span>
          </li>
          <li className="flex items-start gap-2">
            <FaGraduationCap className="mt-1 flex-shrink-0" />
            <span><strong>Documentation:</strong> Use sidebar-left for navigation and main content area.</span>
          </li>
          <li className="flex items-start gap-2">
            <FaCode className="mt-1 flex-shrink-0" />
            <span><strong>Blog/Articles:</strong> Use sidebar-right for metadata, tags, or related articles.</span>
          </li>
        </ul>
      </div>
    </div>
  ),
};
