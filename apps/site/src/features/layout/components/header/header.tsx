"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, useMemo } from "react";
import { ThemeToggle, SettingsPanel } from "@/features/landing";
import { Logo } from "@/shared";
import { Input, Tabs, TabsList, TabsTrigger, CommandPalette, Select, SelectListBox } from "ui-lab-components";
import { ElementsSearchHeader, ElementsFilterPopover, ElementsSortDropdown, ElementsLayoutToggle } from "@/features/elements";
import { useApp } from "@/features/theme";
import { cn } from "@/shared";
import { componentRegistry } from "@/features/component-docs";
import {
  FaChevronDown,
  FaBars,
  FaWrench,
  FaGithub,
  FaMagnifyingGlass,
  FaBagShopping,
  FaTree,
  FaBook,
  FaPlug,
  FaTerminal,
  FaMoon,
  FaSun,
  FaIcons,
} from "react-icons/fa6";
import { HiX } from "react-icons/hi";
import { shouldShowHeaderTabs, getActiveTabValue, getDomainsWithTabs, shouldShowHeaderSearch, getHeaderHeight } from "@/shared";
import { type Command } from "ui-lab-components";

import { useElementsSearch } from "./elements-search";
import { ToolsDropdown } from "./tools-dropdown";
import { MobileMenu } from "./mobile-menu";
import { navigationData, toolsItems } from "./data";

interface HeaderProps {
  pathname: string;
}

export default function Header({
  pathname,
}: HeaderProps) {
  const elementsSearch = useElementsSearch();
  const { currentQuery, currentSort, selectedCategory, selectedTags, onSearch, onSortChange, onCategoryChange, onTagsChange, onClearFilters } = elementsSearch;
  const router = useRouter();
  const isDocRoute = shouldShowHeaderTabs(pathname);
  const isElementsRoute = shouldShowHeaderSearch(pathname);
  const headerHeight = getHeaderHeight(pathname);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { isCommandPaletteOpen, setIsCommandPaletteOpen, currentThemeMode, setCurrentThemeMode } = useApp();

  const handleMouseEnter = () => {
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    setIsToolsOpen(true);
  };

  const handleMouseLeave = () => {
    hideTimeoutRef.current = setTimeout(() => setIsToolsOpen(false), 200);
  };

  // const [stars, setStars] = useState<string>("—");

  useEffect(() => document.documentElement.style.setProperty('--header-height', headerHeight), [headerHeight]);

  /*
  useEffect(() => {
    fetch("https://api.github.com/repos/kyza0d/ui-lab.app")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        const count = data.stargazers_count || 0;
        setStars(count > 1000 ? `${(count / 1000).toFixed(1)}k` : count.toString());
      })
      .catch((err) => {
        console.error("Failed to load GitHub stars:", err);
        setStars("12.4k");
      });
  }, []);
  */

  const commands: Command[] = useMemo(() => {
    const cmds: Command[] = [];

    cmds.push({
      id: "docs-overview",
      label: "Documentation Overview",
      description: "View the documentation home page",
      category: "Documentation",
      icon: <FaBook className="w-4 h-4" />,
      keywords: ["docs", "overview", "documentation"],
      action: () => router.push("/docs"),
    });

    cmds.push({
      id: "docs-installation",
      label: "Installation Guide",
      description: "How to install and set up UI Lab",
      category: "Documentation",
      icon: <FaBook className="w-4 h-4" />,
      keywords: ["install", "setup", "guide"],
      action: () => router.push("/docs/installation"),
    });

    cmds.push({
      id: "docs-usage",
      label: "Usage Guide",
      description: "Learn how to use UI Lab components",
      category: "Documentation",
      icon: <FaBook className="w-4 h-4" />,
      keywords: ["usage", "how-to", "guide"],
      action: () => router.push("/docs/usage"),
    });

    componentRegistry.forEach((component) => {
      cmds.push({
        id: `component-${component.id}`,
        label: component.name,
        description: component.description,
        category: "Components",
        icon: <FaIcons className="w-4 h-4" />,
        keywords: [component.id, component.name.toLowerCase()],
        action: () => router.push(`/components/${component.id}`),
      });
    });

    toolsItems.forEach((tool) => {
      cmds.push({
        id: `tool-${tool.title.toLowerCase().replace(/\s+/g, "-")}`,
        label: tool.title,
        description: tool.description,
        category: "Tools",
        icon: <FaWrench className="w-4 h-4" />,
        keywords: [tool.title.toLowerCase()],
        action: () => router.push(tool.href),
      });
    });

    cmds.push({
      id: "agents-mcps",
      label: "Agents & MCPs",
      description: "View agents and MCP documentation",
      category: "Navigation",
      icon: <FaPlug className="w-4 h-4" />,
      keywords: ["agents", "mcps", "plugins"],
      action: () => router.push("/agents-mcps"),
    });

    cmds.push({
      id: "cli",
      label: "CLI",
      description: "View CLI documentation",
      category: "Navigation",
      icon: <FaTerminal className="w-4 h-4" />,
      keywords: ["cli", "command", "terminal"],
      action: () => router.push("/cli"),
    });

    cmds.push({
      id: "github",
      label: "GitHub Repository",
      description: "Open UI Lab on GitHub",
      category: "Navigation",
      icon: <FaGithub className="w-4 h-4" />,
      keywords: ["github", "source", "repo"],
      action: () => {
        window.open("https://github.com/kyza0d/ui-lab.app", "_blank");
      },
    });

    cmds.push({
      id: "theme-toggle",
      label: `Switch to ${currentThemeMode === "light" ? "Dark" : "Light"} Mode`,
      description: `Toggle between light and dark themes`,
      category: "Settings",
      icon: currentThemeMode === "light" ? <FaMoon className="w-4 h-4" /> : <FaSun className="w-4 h-4" />,
      keywords: ["theme", "dark", "light", "mode"],
      action: () => setCurrentThemeMode(currentThemeMode === "light" ? "dark" : "light"),
    });

    return cmds;
  }, [router, currentThemeMode, setCurrentThemeMode]);

  const activeTabValue = getActiveTabValue(pathname);

  return (
    <>
      {/* background bar */}
      <div
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b border-background-700",
          pathname === "/" ? "bg-background-950" : "bg-background-950"
        )}
        style={{ height: headerHeight }}
      />

      <header
        className={cn("items-start justify-between flex flex-col fixed top-0 left-1/2 -translate-x-1/2 z-100 w-full px-4", pathname === "/" ? "max-w-[1100px]" : "max-w-(--page-width)")}
        style={{ height: headerHeight }}
      >
        <div className="flex justify-between w-full pt-2.5">
          <div className="flex items-center space-x-4 md:space-x-6">
            <Link
              href="/"
              className="mr-5 mb-1 flex items-center transition-opacity hover:opacity-80"
            >
              <Logo />
              <span className="text-md font-semibold text-foreground-50 mr-6">UI Lab</span>
            </Link>
            {/* Desktop navigation */}
            <nav className="hidden md:flex items-center space-x-2 lg:space-x-4">
              {navigationData.map((item) => {
                if (item.name === "tools") {
                  return (
                    <div key={item.name} className="relative">
                      <button
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        className={cn(
                          "flex items-center rounded-xl px-3 py-2 text-sm",
                          "hover:bg-background-800 hover:text-foreground-50"
                        )}
                      >
                        {item.label}
                        <FaChevronDown
                          className={cn(
                            "ml-2 h-2.5 w-2.5 text-foreground-300",
                            isToolsOpen && "rotate-180"
                          )}
                        />
                      </button>
                      <ToolsDropdown
                        isOpen={isToolsOpen}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                      />
                    </div>
                  );
                }
                return (
                  <Link
                    key={item.name}
                    href={item.name === "documentation" ? "/docs" : item.name === "elements" ? "/elements" : `/components`}
                    className={cn(
                      "rounded-xl px-3 py-2 text-sm",
                      "hover:bg-background-800 hover:text-foreground-50"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
              <Select trigger="hover" className="hidden relative flex items-center">
                <Select.Trigger className="bg-transparent border-0  text-foreground-300" chevron={<FaChevronDown size={10} className="relative top-1/2 -translate-y-1/2" />}>
                  <Select.Value icon={<FaBagShopping className="text-foreground-400" />} placeholder="Marketplace" />
                </Select.Trigger>
                <Select.Content>
                  <SelectListBox>
                    <Select.Item icon={<FaTree />} value="option1">Option 1</Select.Item>
                    <Select.Item value="option2">Option 2</Select.Item>
                    <Select.Item value="option3">Option 3</Select.Item>
                  </SelectListBox>
                </Select.Content>
              </Select>

            </nav>
          </div>

          {/* Right side: Settings, Theme Toggle, GitHub Stars */}
          <div className="flex items-center">
            <ThemeToggle />
            <SettingsPanel />

            {/* Mobile menu toggle */}
            <button
              onClick={() => setIsMobileMenuOpen((v) => !v)}
              className="md:hidden flex items-center justify-center rounded-lg p-2 text-foreground-300 hover:bg-background-800"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? <HiX size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
        {isDocRoute && activeTabValue && (
          <Tabs value={activeTabValue} variant="underline">
            <TabsList>
              {getDomainsWithTabs().map((domain) => {
                const Icon = domain.icon;
                return (
                  <Link key={domain.id} href={domain.id === 'docs' ? '/docs' : `/${domain.id}`}>
                    <TabsTrigger icon={<Icon />} value={domain.id} className="text-sm mb-1">
                      {domain.label}
                    </TabsTrigger>
                  </Link>
                );
              })}
            </TabsList>
            <div className="absolute bottom-2 right-3">
              <Input
                placeholder="Search documentation"
                prefixIcon={<FaMagnifyingGlass size={14} />}
                className="pl-10 pr-12 w-full bg-background-900 border-background-700 focus:ring-1 focus:ring-accent-500/50 transition-all"
                size="md"
                onClick={() => setIsCommandPaletteOpen(true)}
                readOnly
              />
            </div>
          </Tabs>
        )}
        {isElementsRoute && (
          <div className="w-full grid grid-cols-[auto_1fr] items-center pb-3 pt-2 mt-1">

            {/* Center: Prominent Search */}
            <div className="flex justify-center">
              <ElementsSearchHeader
                className="lg:w-[400px]"
                currentQuery={currentQuery}
                pathname={pathname}
                onSearch={onSearch}
              />
            </div>

            {/* Right: Layout & Actions */}
            <div className="flex items-center justify-end gap-2">
              <ElementsSortDropdown
                currentSort={currentSort}
                onSortChange={onSortChange}
              />
              <div className="h-4 w-[1px] bg-background-700 mx-1" />
              <ElementsLayoutToggle />
              <ElementsFilterPopover
                selectedCategory={selectedCategory}
                selectedTags={selectedTags}
                onCategoryChange={onCategoryChange}
                onTagsChange={onTagsChange}
                onClearAll={onClearFilters}
              />
            </div>

          </div>
        )}

        <div className={cn(
          "absolute h-20 border-x border-background-700 bottom-0 left-1/2 -translate-x-1/2 w-[1100px] pointer-events-none",
          pathname === "/" ? "visible" : "hidden"
        )}>
          <div className="absolute bottom-0 left-0 w-[16px] h-[16px] rounded-[5px] border-[2px] border-background-700 bg-background-950 -translate-x-1/2 translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-[17px] h-[16px] rounded-[5px] border-[2px] border-background-700 bg-background-950 translate-x-1/2 translate-y-1/2" />
        </div>
      </header>

      <CommandPalette
        open={isCommandPaletteOpen}
        onOpenChange={setIsCommandPaletteOpen}
        commands={commands}
        placeholder="Search commands, components, docs..."
        showCategories={true}
      />

      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </>
  );
}
