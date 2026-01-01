"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useRef, useMemo, memo } from "react";
import { cn, FadeContainer, usePrefetchOnHover } from "@/shared";
import {
  categoryMap,
  getCategoriesInOrder,
  getComponentsGroupedByCategory,
  getComponentsInCategoryOrder,
  type ComponentCategory,
} from "@/features/component-docs";
import { getSectionsForDomain } from "../lib/sidebar-registry-resolver";
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
    { id: "overview", label: "Overview" },
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
  return getCategoriesInOrder()
    .map((category: any) => ({ category, components: getComponentsInCategoryOrder(category) }))
    .filter(({ components }: any) => components.length > 0)
    .map(({ category, components }: any) => ({
      label: categoryMap[category as keyof typeof categoryMap].label || category,
      items: components.map((comp: any) => ({
        id: comp.id,
        label: comp.name,
      })),
    }));
}

function getTotalComponentCount(): number {
  const groupedComponents = getComponentsGroupedByCategory();
  return Object.values(groupedComponents).reduce((sum, components) => sum + components.length, 0);
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

const SECTION_LABEL_FILTERS: Record<MainNavItem, string[] | null> = {
  "agents-mcps": null,
  "agents-mcps-introduction": ["Getting Started"],
  "agents-mcps-workflows": ["Building Workflows"],
  "agents-mcps-references": ["Reference", "Technical Reference"],
  "cli-getting-started": ["Getting Started"],
  "cli-advanced": ["Advanced"],
  "overview": null,
  "components": null,
  "design-system": null,
};

function deduplicateSectionItems(section: SidebarSection): SidebarSection {
  const seenLabels = new Map<string, { id: string; index: number }>();
  const uniqueItems: Array<{ id: string; label: string }> = [];

  for (const item of section.items) {
    const normalizedLabel = item.label.toLowerCase();
    if (!seenLabels.has(normalizedLabel)) {
      seenLabels.set(normalizedLabel, { id: item.id, index: uniqueItems.length });
      uniqueItems.push(item);
    } else {
      const stored = seenLabels.get(normalizedLabel)!;
      const storedId = uniqueItems[stored.index].id;

      const storedHyphens = storedId.split('-').length;
      const currentHyphens = item.id.split('-').length;

      if (currentHyphens < storedHyphens || (currentHyphens === storedHyphens && item.id.length < storedId.length)) {
        uniqueItems[stored.index] = item;
        seenLabels.set(normalizedLabel, { id: item.id, index: stored.index });
      }
    }
  }

  return {
    label: section.label,
    items: uniqueItems,
  };
}

export function getSectionsForNav(nav: MainNavItem): SidebarSection[] {
  let sections: SidebarSection[] = [];

  switch (nav) {
    case "overview":
      sections = getSectionsForDomain("docs");
      break;
    case "agents-mcps-introduction":
    case "agents-mcps-workflows":
    case "agents-mcps-references":
      sections = getSectionsForDomain("agents-mcps");
      break;
    case "cli-getting-started":
    case "cli-advanced":
      sections = getSectionsForDomain("cli");
      break;
    case "design-system":
      sections = getSectionsForDomain("design-system");
      break;
    case "components":
    default:
      return getComponentSections();
  }

  const allowedLabels = SECTION_LABEL_FILTERS[nav];
  if (allowedLabels) {
    sections = sections.filter(s => allowedLabels.includes(s.label));
  }

  return sections.map(deduplicateSectionItems);
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

const SidebarItemLink = memo(function SidebarItemLink({
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
});

export function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const activeNav = getActiveSectionForPathname(pathname);
  const mainNav = getMainNav(activeNav);
  const sections = useMemo(() => getSectionsForNav(activeNav), [activeNav]);
  const totalComponentCount = useMemo(() => getTotalComponentCount(), []);
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
    <aside className="hidden md:flex w-56 flex-col">
      {/* Fixed height container with sticky header + scrollable body */}
      <div className="flex flex-col h-screen sticky top-(--header-height)">
        {/* Sticky Top Navigation */}
        <div className="z-10">
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
                    "flex border items-center gap-3 pl-1 pr-2 py-0.5 text-sm font-medium rounded-md",
                    isActive
                      ? "border-background-700 text-foreground-50 bg-background-800/70"
                      : "border-transparent text-foreground-400 hover:text-foreground-200 hover:bg-background-800/60"
                  )}
                >
                  <div className={
                    cn(
                      "w-8 h-8 rounded-md flex items-center justify-center",
                      isActive ? "text-foreground-50 "
                        : "text-foreground-400 ")}
                  >

                    <Icon className="w-4 h-4" />
                  </div>
                  <span>{nav.label}</span>
                  {nav.id === "components" && (
                    <span className={cn(
                      "ml-auto px-1 py-0.5 rounded text-xs font-bold",
                      isActive
                        ? "bg-accent-500/15 text-accent-400 border border-accent-500/20"
                        : "border border-background-700 bg-background-800 text-foreground-300"
                    )}>
                      {totalComponentCount}
                    </span>
                  )}
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
                  <div className="relative mt-2.5">
                    <div className="absolute left-0.5 top-0 bottom-0 w-px bg-background-600"></div>
                    <div className="space-y-1 pl-3">
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
                </div>
              ))}
            </div>
          </div>
        </FadeContainer>
      </div>
    </aside>
  );
}
