"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  getComponentsGroupedByCategory,
  categoryMap,
  type ComponentCategory,
} from "@/lib/component-registry";
import { FaBook, FaShapes, FaPaintbrush } from "react-icons/fa6";

type MainNavItem = "documentation" | "components" | "customization";

interface SidebarSection {
  label: string;
  items: Array<{
    id: string;
    label: string;
  }>;
}

function getMainNav(): Array<{
  id: MainNavItem;
  label: string;
}> {
  return [
    { id: "documentation", label: "Documentation" },
    { id: "components", label: "Components" },
    { id: "customization", label: "Customization" },
  ];
}

function getDocumentationSections(): SidebarSection[] {
  return [
    {
      label: "Getting Started",
      items: [
        { id: "introduction", label: "Introduction" },
        { id: "installation", label: "Installation" },
        { id: "getting-started", label: "Getting Started" },
      ],
    },
    {
      label: "Development",
      items: [
        { id: "customization", label: "Customization" },
        { id: "best-practices", label: "Best Practices" },
        { id: "accessibility", label: "Accessibility" },
      ],
    },
    {
      label: "Advanced",
      items: [
        { id: "ai-integration", label: "AI Integration" },
        { id: "troubleshooting", label: "Troubleshooting" },
      ],
    },
  ];
}

function getComponentSections(): SidebarSection[] {
  const groupedComponents = getComponentsGroupedByCategory();
  return Object.entries(groupedComponents)
    .filter(([, components]) => components.length > 0)
    .map(([category, components]) => ({
      label: categoryMap[category as ComponentCategory].label || category,
      items: components.map((comp) => ({
        id: comp.id,
        label: comp.name,
      })),
    }));
}

function getCustomizationSections(): SidebarSection[] {
  return [
    {
      label: "Customization",
      items: [
        { id: "theming", label: "Theming" },
        { id: "typography", label: "Typography" },
        { id: "icons", label: "Icons" },
      ],
    },
  ];
}

function getActiveSectionForPathname(pathname: string): MainNavItem {
  if (pathname.startsWith("/docs")) return "documentation";
  if (pathname.startsWith("/customize")) return "customization";
  return "components";
}

function getSectionsForNav(nav: MainNavItem): SidebarSection[] {
  switch (nav) {
    case "documentation":
      return getDocumentationSections();
    case "customization":
      return getCustomizationSections();
    case "components":
    default:
      return getComponentSections();
  }
}

function getHrefForItem(activeNav: MainNavItem, itemId: string): string {
  switch (activeNav) {
    case "documentation":
      return itemId === "introduction" ? "/docs" : `/docs/${itemId}`;
    case "customization":
      return itemId === "theming" ? "/customize" : `/customize/${itemId}`;
    case "components":
    default:
      return itemId === "overview" ? "/components" : `/components/${itemId}`;
  }
}

function isItemActive(itemId: string, pathname: string, activeNav: MainNavItem): boolean {
  const href = getHrefForItem(activeNav, itemId);
  if (href === pathname) return true;
  if (itemId === "introduction" && pathname === "/docs") return true;
  if (itemId === "overview" && pathname === "/components") return true;
  return pathname.includes(`/${itemId}`);
}

export function Sidebar() {
  const pathname = usePathname();
  const mainNav = getMainNav();
  const activeNav = getActiveSectionForPathname(pathname);
  const sections = getSectionsForNav(activeNav);

  return (
    <aside className="hidden md:flex w-64 flex-col border-r border-background-700">
      {/* Fixed height container with sticky header + scrollable body */}
      <div className="flex flex-col h-screen sticky top-15">
        {/* Sticky Top Navigation */}
        <div className="flex-shrink-0 border-b border-background-700 z-10">
          <nav className="py-4 px-2 space-y-1">
            {mainNav.map((nav) => {
              const href =
                nav.id === "documentation"
                  ? "/docs"
                  : nav.id === "customization"
                    ? "/customize"
                    : "/components";
              const isActive = activeNav === nav.id;

              const iconMap = {
                documentation: FaBook,
                components: FaShapes,
                customization: FaPaintbrush,
              };
              const Icon = iconMap[nav.id];

              return (
                <Link
                  key={nav.id}
                  href={href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                    isActive
                      ? "text-foreground-50 bg-background-800"
                      : "text-foreground-400 hover:text-foreground-200 hover:bg-background-800"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span>{nav.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Scrollable Contextual Content */}
        <div className="flex-1 overflow-y-auto py-6 px-5 mb-15">
          <div className="space-y-8">
            {sections.map((section) => (
              <div key={section.label}>
                <span className="text-sm text-foreground-200">{section.label}</span>
                <div className="space-y-0 mt-1.5">
                  {section.items.map((item) => {
                    const active = isItemActive(item.id, pathname, activeNav);
                    const href = getHrefForItem(activeNav, item.id);

                    return (
                      <Link
                        key={item.id}
                        href={href}
                        className={cn(
                          "block px-3 py-1.5 text-sm rounded-md transition-colors",
                          active
                            ? "text-foreground-50 bg-background-800 font-medium"
                            : "text-foreground-400 hover:text-foreground-200 hover:bg-background-800/50"
                        )}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}
