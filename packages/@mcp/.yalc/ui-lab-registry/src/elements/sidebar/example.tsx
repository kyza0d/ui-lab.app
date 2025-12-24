import { ComponentExample } from "../../types";

export const sidebarExamples: ComponentExample[] = [
  {
    name: "Basic Sidebar",
    description: "A simple sidebar with navigation items",
    code: `import { Sidebar } from "@/elements/sidebar";

export function Example() {
  const sidebarItems = [
    { id: "1", label: "Dashboard", href: "/", icon: "📊" },
    { id: "2", label: "Projects", href: "/projects", icon: "📁" },
    { id: "3", label: "Settings", href: "/settings", icon: "⚙️" }
  ];

  return (
    <div className="flex h-screen">
      <Sidebar items={sidebarItems} />
      <main className="flex-1">
        {/* Page content */}
      </main>
    </div>
  );
}`,
  },
  {
    name: "Sidebar with Submenu",
    description: "A sidebar with expandable submenu items",
    code: `import { Sidebar } from "@/elements/sidebar";

export function Example() {
  const sidebarItems = [
    {
      id: "1",
      label: "Dashboard",
      href: "/",
      icon: "📊"
    },
    {
      id: "2",
      label: "Products",
      icon: "📦",
      submenu: [
        { id: "2-1", label: "All Products", href: "/products" },
        { id: "2-2", label: "Categories", href: "/categories" }
      ]
    },
    {
      id: "3",
      label: "Analytics",
      icon: "📈",
      submenu: [
        { id: "3-1", label: "Reports", href: "/reports" },
        { id: "3-2", label: "Metrics", href: "/metrics" }
      ]
    },
    { id: "4", label: "Settings", href: "/settings", icon: "⚙️" }
  ];

  return (
    <div className="flex h-screen">
      <Sidebar items={sidebarItems} />
      <main className="flex-1">
        {/* Page content */}
      </main>
    </div>
  );
}`,
  },
  {
    name: "Collapsible Sidebar",
    description: "A sidebar with toggle functionality for collapse/expand",
    code: `import { Sidebar } from "@/elements/sidebar";
import { useState } from "react";

export function Example() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const sidebarItems = [
    { id: "1", label: "Home", href: "/", icon: "🏠", active: true },
    { id: "2", label: "Search", href: "/search", icon: "🔍" },
    { id: "3", label: "Notifications", href: "/notifications", icon: "🔔" },
    { id: "4", label: "Messages", href: "/messages", icon: "💬" },
    { id: "5", label: "Profile", href: "/profile", icon: "👤" }
  ];

  return (
    <div className="flex h-screen">
      <Sidebar
        items={sidebarItems}
        isOpen={sidebarOpen}
        onOpenChange={setSidebarOpen}
        collapsible={true}
        width="md"
      />
      <main className="flex-1 bg-gray-50">
        {/* Page content */}
      </main>
    </div>
  );
}`,
  },
  {
    name: "Sidebar with Active State",
    description: "A sidebar that highlights the active navigation item",
    code: `import { Sidebar } from "@/elements/sidebar";
import { useState } from "react";

export function Example() {
  const [activeId, setActiveId] = useState("1");

  const sidebarItems = [
    { id: "1", label: "Dashboard", href: "/", icon: "📊", active: activeId === "1" },
    { id: "2", label: "Users", href: "/users", icon: "👥", active: activeId === "2" },
    { id: "3", label: "Content", href: "/content", icon: "📝", active: activeId === "3" },
    { id: "4", label: "Settings", href: "/settings", icon: "⚙️", active: activeId === "4" }
  ];

  return (
    <div className="flex h-screen">
      <Sidebar
        items={sidebarItems}
        onItemClick={(item) => setActiveId(item.id)}
      />
      <main className="flex-1">
        {/* Page content */}
      </main>
    </div>
  );
}`,
  },
];
