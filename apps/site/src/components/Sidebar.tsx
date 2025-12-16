"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import {
  getComponentsGroupedByCategory,
  categoryMap,
  type ComponentCategory,
} from "@/lib/component-registry";
import { DOCUMENTATION_SECTIONS } from "@/lib/generated-docs";
import { usePrefetchOnHover } from "@/hooks/usePrefetchOnHover";
import { FadeContainer } from "./FadeContainer";
import { FaBook, FaShapes, FaPaintbrush, FaPalette, FaPlug, FaTerminal, FaRoad, FaPaperclip } from "react-icons/fa6";

type MainNavItem = "overview" | "components" | "design-system" | "agents-mcps" | "cli";

interface SidebarSection {
  label: string;
  items: Array<{
    id: string;
    label: string;
  }>;
}

function getMainNav(activeNav?: MainNavItem): Array<{
  id: MainNavItem;
  label: string;
}> {
  const allItems = [
    { id: "overview", label: "UI Lab Overview" },
    { id: "design-system", label: "Design System" },
    { id: "agents-mcps", label: "Agents & MCPs" },
    { id: "cli", label: "CLI" },
    { id: "components", label: "Components" },
  ] as const;

  if (activeNav === "agents-mcps" || activeNav === "cli") {
    return allItems.filter(item => item.id === activeNav);
  }

  return allItems.filter(item => item.id !== "agents-mcps" && item.id !== "cli");
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

function getDesignSystemSections(): SidebarSection[] {
  return [
    {
      label: "Foundation",
      items: [
        { id: "colors", label: "Colors" },
        { id: "typography", label: "Typography" },
        { id: "spacing", label: "Spacing" },
      ],
    },
    {
      label: "Systems",
      items: [
        { id: "tokens", label: "Tokens" },
        { id: "variables", label: "Variables" },
      ],
    },
    {
      label: "Guidelines",
      items: [
        { id: "components-guidelines", label: "Component Guidelines" },
        { id: "accessibility", label: "Accessibility" },
      ],
    },
  ];
}

function getAgentsMcpsSections(): SidebarSection[] {
  return [
    {
      label: "Getting Started",
      items: [
        { id: "introduction", label: "Introduction" },
        { id: "setup", label: "Setup" },
        { id: "configuration", label: "Configuration" },
      ],
    },
  ];
}

function getCliSections(): SidebarSection[] {
  return [
    {
      label: "Getting Started",
      items: [
        { id: "introduction", label: "Introduction" },
        { id: "installation", label: "Installation" },
        { id: "commands", label: "Commands" },
      ],
    },
  ];
}

function getActiveSectionForPathname(pathname: string): MainNavItem {
  if (pathname.startsWith("/docs")) return "overview";
  if (pathname.startsWith("/agents-mcps")) return "agents-mcps";
  if (pathname.startsWith("/cli")) return "cli";
  if (pathname.startsWith("/design-system")) return "design-system";
  return "components";
}

function getSectionsForNav(nav: MainNavItem): SidebarSection[] {
  switch (nav) {
    case "overview":
      return DOCUMENTATION_SECTIONS;
    case "agents-mcps":
      return getAgentsMcpsSections();
    case "cli":
      return getCliSections();
    case "design-system":
      return getDesignSystemSections();
    case "components":
    default:
      return getComponentSections();
  }
}

function getHrefForItem(activeNav: MainNavItem, itemId: string): string {
  switch (activeNav) {
    case "overview":
      return itemId === "introduction" ? "/docs" : `/docs/${itemId}`;
    case "agents-mcps":
      return itemId === "introduction" ? "/agents-mcps" : `/agents-mcps/${itemId}`;
    case "cli":
      return itemId === "introduction" ? "/cli" : `/cli/${itemId}`;
    case "design-system":
      return itemId === "overview" ? "/design-system" : `/design-system/${itemId}`;
    case "components":
    default:
      return itemId === "overview" ? "/components" : `/components/${itemId}`;
  }
}

function isItemActive(itemId: string, pathname: string, activeNav: MainNavItem): boolean {
  const href = getHrefForItem(activeNav, itemId);
  if (href === pathname) return true;
  if (itemId === "introduction" && (pathname === "/docs" || pathname === "/agents-mcps" || pathname === "/cli" || pathname === "/design-system")) return true;
  if (itemId === "overview" && (pathname === "/components" || pathname === "/design-system")) return true;
  return pathname.includes(`/${itemId}`);
}

function SidebarItemLink({
  href,
  className,
  children,
}: {
  href: string;
  className: string;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { onMouseEnter } = usePrefetchOnHover(href);

  return (
    <>
      {/* Hidden link for prefetch on hover */}
      <Link
        href={href}
        prefetch={false}
        onMouseEnter={onMouseEnter}
        style={{ display: "none" }}
        aria-hidden
      />
      {/* Visible element that navigates programmatically */}
      <div
        role="button"
        tabIndex={0}
        onClick={() => router.push(href)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            router.push(href);
          }
        }}
        onMouseEnter={onMouseEnter}
        className={className}
      >
        {children}
      </div>
    </>
  );
}

export function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const activeNav = getActiveSectionForPathname(pathname);
  const mainNav = getMainNav(activeNav);
  const sections = getSectionsForNav(activeNav);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const storageKey = `sidebar-scroll-${activeNav}`;

    const savedPosition = sessionStorage.getItem(storageKey);
    if (savedPosition) {
      container.scrollTop = parseInt(savedPosition, 10);
    }

    const handleScroll = () => {
      sessionStorage.setItem(storageKey, container.scrollTop.toString());
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [activeNav]);

  return (
    <aside className="hidden md:flex w-64 flex-col border-r border-background-700">
      {/* Fixed height container with sticky header + scrollable body */}
      <div className="flex flex-col h-screen sticky top-(--header-height)">
        {/* Sticky Top Navigation */}
        <div className="border-b border-background-700 z-10">
          <nav className="py-3 px-2 space-y-1">
            {mainNav.map((nav) => {
              let href = "/components";
              if (nav.id === "overview") href = "/docs";
              else if (nav.id === "agents-mcps") href = "/agents-mcps";
              else if (nav.id === "cli") href = "/cli";
              else if (nav.id === "design-system") href = "/design-system";

              const isActive = activeNav === nav.id;

              const iconMap = {
                "overview": FaPaperclip,
                "agents-mcps": FaPlug,
                cli: FaTerminal,
                components: FaShapes,
                "design-system": FaPaintbrush,
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
        <FadeContainer className="flex-1 mb-26">
          <div
            ref={scrollContainerRef}
            className="overflow-y-auto py-5 px-5 h-full"
          >
            <div className="space-y-8">
              {sections.map((section) => (
                <div key={section.label}>
                  <span className="text-sm text-foreground-200">{section.label}</span>
                  <div className="space-y-0 mt-1.5">
                    {section.items.map((item) => {
                      const active = isItemActive(item.id, pathname, activeNav);
                      const href = getHrefForItem(activeNav, item.id);

                      return (
                        <SidebarItemLink
                          key={item.id}
                          href={href}
                          className={cn(
                            "block px-3 py-1.5 text-sm rounded-md transition-colors cursor-pointer",
                            active
                              ? "text-foreground-50 bg-background-800 font-medium"
                              : "text-foreground-400 hover:text-foreground-200 hover:bg-background-800/50"
                          )}
                        >
                          {item.label}
                        </SidebarItemLink>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeContainer>
      </div>
    </aside>
  );
}
