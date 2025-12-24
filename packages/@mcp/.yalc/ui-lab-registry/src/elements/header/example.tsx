import { ComponentExample } from "../../types";

export const headerExamples: ComponentExample[] = [
  {
    name: "Basic Header",
    description: "A simple header with logo and navigation items",
    code: `import { Header } from "@/elements/header";

export function Example() {
  const navItems = [
    { label: "Home", href: "/" },
    { label: "Features", href: "/features" },
    { label: "Pricing", href: "/pricing" },
    { label: "Docs", href: "/docs" }
  ];

  return (
    <Header
      logoText="MyApp"
      navItems={navItems}
    />
  );
}`,
  },
  {
    name: "Header with Actions",
    description:
      "A header with navigation, search, and user action buttons",
    code: `import { Header } from "@/elements/header";

export function Example() {
  const navItems = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "About", href: "/about" }
  ];

  const actions = [
    {
      label: "Search",
      icon: "🔍",
      onClick: () => console.log("Search clicked")
    },
    {
      label: "Profile",
      icon: "👤",
      onClick: () => console.log("Profile clicked")
    }
  ];

  return (
    <Header
      logoText="MyApp"
      navItems={navItems}
      actions={actions}
    />
  );
}`,
  },
  {
    name: "Sticky Header",
    description: "A header that remains fixed at the top when scrolling",
    code: `import { Header } from "@/elements/header";

export function Example() {
  const navItems = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Contact", href: "/contact" }
  ];

  return (
    <div>
      <Header
        logoText="Brand"
        navItems={navItems}
        sticky={true}
      />
      <main className="pt-16">
        {/* Page content goes here */}
      </main>
    </div>
  );
}`,
  },
];
