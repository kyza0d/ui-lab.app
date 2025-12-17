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
import { getSectionsForDomain } from "@/lib/sidebar-registry-resolver";
import { usePrefetchOnHover } from "@/hooks/usePrefetchOnHover";
import { FadeContainer } from "./FadeContainer";
import {
  FaShapes,
  FaPaintbrush,
  FaTerminal,
  FaPaperclip,
  FaFlag,
  FaArrowsSplitUpAndLeft,
  FaBookOpen,
} from "react-icons/fa6";

export type MainNavItem = "overview" | "components" | "design-system" | "agents-mcps" | "agents-mcps-introduction" | "agents-mcps-workflows" | "agents-mcps-references" | "cli-getting-started" | "cli-advanced";

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
  const allItems: Array<{ id: MainNavItem; label: string }> = [
    { id: "overview", label: "UI Lab Overview" },
    { id: "design-system", label: "Design System" },
    { id: "components", label: "Components" },
  ];

  if (activeNav?.startsWith("agents-mcps")) {
    return [
      { id: "agents-mcps-introduction", label: "Introduction" },
      { id: "agents-mcps-workflows", label: "Workflows" },
      { id: "agents-mcps-references", label: "References" },
    ];
  }

  if (activeNav?.startsWith("cli")) {
    return [
      { id: "cli-getting-started", label: "Getting Started" },
      { id: "cli-advanced", label: "Advanced" },
    ];
  }

  return allItems;
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

export function getActiveSectionForPathname(pathname: string): MainNavItem {
  if (pathname.startsWith("/docs")) return "overview";
  if (pathname.startsWith("/agents-mcps")) {
    if (pathname === "/agents-mcps" || pathname.includes("/introduction") || pathname.includes("/installation") || pathname.includes("/quick-start") || pathname.includes("/core-concepts")) {
      return "agents-mcps-introduction";
    }
    if (pathname.includes("/designing-ai-workflows") || pathname.includes("/prompting-strategies") || pathname.includes("/state-management") || pathname.includes("/examples-use-cases")) {
      return "agents-mcps-workflows";
    }
    if (pathname.includes("/mcps-overview") || pathname.includes("/custom-mcps") || pathname.includes("/integrations") || pathname.includes("/api-reference")) {
      return "agents-mcps-references";
    }
    return "agents-mcps-introduction";
  }
  if (pathname.startsWith("/cli")) {
    if (pathname === "/cli" || pathname.includes("/introduction") || pathname.includes("/installation") || pathname.includes("/commands") || pathname.includes("/quick-start")) {
      return "cli-getting-started";
    }
    if (pathname.includes("/hooks") || pathname.includes("/skills") || pathname.includes("/agents") || pathname.includes("/mcp-servers") || pathname.includes("/configuration") || pathname.includes("/best-practices")) {
      return "cli-advanced";
    }
    return "cli-getting-started";
  }
  if (pathname.startsWith("/design-system")) return "design-system";
  return "components";
}

export function getSectionsForNav(nav: MainNavItem): SidebarSection[] {
  switch (nav) {
    case "overview":
      return getSectionsForDomain("docs");
    case "agents-mcps-introduction":
    case "agents-mcps-workflows":
    case "agents-mcps-references":
      return getSectionsForDomain("agents-mcps");
    case "cli-getting-started":
    case "cli-advanced":
      return getSectionsForDomain("cli");
    case "design-system":
      return getSectionsForDomain("design-system");
    case "components":
    default:
      return getComponentSections();
  }
}

export function getHrefForItem(activeNav: MainNavItem, itemId: string): string {
  switch (activeNav) {
    case "overview":
      return itemId === "introduction" ? "/docs" : `/docs/${itemId}`;
    case "agents-mcps-introduction":
    case "agents-mcps-workflows":
    case "agents-mcps-references":
      return itemId === "introduction" ? "/agents-mcps" : `/agents-mcps/${itemId}`;
    case "cli-getting-started":
    case "cli-advanced":
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
    <aside className="hidden md:flex w-56 flex-col border-r border-background-700">
      {/* Fixed height container with sticky header + scrollable body */}
      <div className="flex flex-col h-screen sticky top-(--header-height)">
        {/* Sticky Top Navigation */}
        <div className="border-b border-background-700 z-10">
          <nav className="py-3 px-2 space-y-1">
            {mainNav.map((nav) => {
              let href = "/components";
              if (nav.id === "overview") href = "/docs";
              else if (nav.id === "agents-mcps-introduction") href = "/agents-mcps";
              else if (nav.id === "agents-mcps-workflows") href = "/agents-mcps/designing-ai-workflows";
              else if (nav.id === "agents-mcps-references") href = "/agents-mcps/mcps-overview";
              else if (nav.id === "cli-getting-started") href = "/cli";
              else if (nav.id === "cli-advanced") href = "/cli/hooks";
              else if (nav.id === "design-system") href = "/design-system";

              const isActive = activeNav === nav.id;

              const iconMap: Record<string, any> = {
                "overview": FaPaperclip,
                "agents-mcps-introduction": FaFlag,
                "agents-mcps-workflows": FaArrowsSplitUpAndLeft,
                "agents-mcps-references": FaBookOpen,
                "cli-getting-started": FaTerminal,
                "cli-advanced": FaTerminal,
                components: FaShapes,
                "design-system": FaPaintbrush,
              };
              const Icon = iconMap[nav.id];

              return (
                <Link
                  key={nav.id}
                  href={href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg",
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
                            "block px-3 py-1.5 text-sm rounded-md cursor-pointer",
                            "transition-colors duration-300 ease-out",
                            "hover:duration-0",

                            active
                              ? "text-foreground-50 bg-background-800 font-medium"
                              : cn("text-foreground-400", "hover:text-foreground-200 hover:bg-background-800/50")
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
