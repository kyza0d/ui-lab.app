"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { LandingThemeToggle } from "../landing/theme-toggle";
import { SettingsPanel } from "../landing/settings-panel";
import { Logo } from "../ui/logo";
import { Badge, Button, Divider } from "ui-lab-components";
import { useHeader } from "@/lib/header-context";
import { cn } from "@/lib/utils";
import { getComponentsGroupedByCategory } from "@/lib/component-registry";
import {
  FaChevronDown,
  FaSliders,
  FaPalette,
  FaFill,
  FaIcons,
  FaWandMagicSparkles,
  FaBars,
  FaWrench,
  FaGithub,
} from "react-icons/fa6";
import { HiX } from "react-icons/hi";

const navigationData = [
  { name: "marketplace", label: "Marketplace", href: "/marketplace" },
  { name: "documentation", label: "Documentation", isDropdown: true },
  { name: "components", label: "Components", isDropdown: true },
  { name: "tools", label: "Tools", isDropdown: true },
] as const;

const documentationItems = [
  { id: "overview", label: "Overview" },
  { id: "installation", label: "Installation" },
  { id: "usage", label: "Usage" },
];

const getDocumentationLink = (id: string) =>
  id === "overview" ? "/docs" : `/docs/${id}`;

const toolsItems = [
  {
    title: "Color Palette Generator",
    description: "Generate beautiful color schemes.",
    href: "/tools/color-palette",
    icon: FaPalette,
  },
  {
    title: "Gradient Generator",
    description: "Create smooth CSS gradients easily.",
    href: "/tools/gradient",
    icon: FaFill,
  },
  {
    title: "Icon Finder",
    description: "Search and copy any icon instantly.",
    href: "/tools/icons",
    icon: FaIcons,
  },
  {
    title: "CSS Gradient Animator",
    description: "Animate gradients with pure CSS.",
    href: "/tools/css-animator",
    icon: FaWandMagicSparkles,
  },
];

/* ---------- Tools Dropdown (desktop) ---------- */
function ToolsDropdown({
  isOpen,
  onMouseEnter,
  onMouseLeave,
}: {
  isOpen: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  return (
    <div
      className={cn(
        "absolute top-full left-0 z-50 bg-background-800",
        "overflow-hidden flex rounded-xl border border-background-700",
        "shadow-lg w-96"
      )}
      style={{
        opacity: isOpen ? 1 : 0,
        pointerEvents: isOpen ? "auto" : "none",
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="w-full px-2 pb-2">
        <div className="grid gap-0 grid-cols-1">
          <div className="flex flex-col">
            <span className="flex text-sm items-center h-13 px-3 text-foreground-50">
              <FaWrench className="mr-3" /> Utilities
            </span>
            <Divider variant="dashed" className="mt-0 mb-2" />
            <div className="flex flex-col space-y-1 mt-2">
              {toolsItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.title}
                    href={item.href}
                    className={cn(
                      "rounded-lg p-1",
                      "text-foreground-300 hover:bg-background-700",
                      "flex items-center gap-3 group"
                    )}
                  >
                    <div className="group-hover:bg-background-600 flex-shrink-0 w-10 h-10 rounded-lg bg-background-800/50 flex items-center justify-center">
                      <Icon className="h-5 w-5 text-foreground-100" />
                    </div>
                    <div className="flex flex-col">
                      <div className="font-semibold text-foreground-50 text-sm">
                        {item.title}
                      </div>
                      <div className="text-sm text-foreground-400 mt-0.5">
                        {item.description}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------- Mobile menu */
interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}
function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [expanded, setExpanded] = useState<string | null>(null);

  const getMenuItems = (
    itemName: string
  ): Array<{ label: string; href: string; description?: string }> => {
    switch (itemName) {
      case "documentation":
        return documentationItems.map((i) => ({
          label: i.label,
          href: getDocumentationLink(i.id),
        }));
      case "components": {
        const grouped = getComponentsGroupedByCategory();
        const all: Array<{ label: string; href: string }> = [];
        Object.values(grouped).forEach((list) =>
          list.forEach((c) => all.push({ label: c.name, href: `/components/${c.id}` }))
        );
        return all;
      }
      case "tools":
        return toolsItems.map((t) => ({
          label: t.title,
          description: t.description,
          href: t.href,
        }));
      default:
        return [];
    }
  };

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-30 bg-background-950/80 transition-opacity md:hidden"
        )}
        style={{ opacity: isOpen ? 1 : 0, pointerEvents: isOpen ? "auto" : "none" }}
        onClick={onClose}
      />
      {isOpen && (
        <div
          className={cn(
            "fixed top-15 left-0 right-0 z-50 pt-6 border-b-2 border-background-700/60 md:hidden",
            "overflow-y-auto max-h-[calc(100vh-3.75rem)] bg-background-950 animate-in slide-in-from-top-2"
          )}
        >
          <div className="flex flex-col px-2 py-4 space-y-1">
            {navigationData.map((item) => {
              const hasDropdown = "isDropdown" in item && item.isDropdown;

              if (hasDropdown) {
                const subItems = getMenuItems(item.name);
                return (
                  <div key={item.name} className="flex flex-col">
                    <button
                      onClick={() =>
                        setExpanded((prev) => (prev === item.name ? null : item.name))
                      }
                      className={cn(
                        "flex w-full items-center justify-between rounded-lg px-3 py-2",
                        "font-medium hover:bg-background-800"
                      )}
                    >
                      <span>{item.label}</span>
                      <FaChevronDown
                        className={cn(
                          "h-2.5 w-2.5 text-foreground-300",
                          expanded === item.name && "rotate-180"
                        )}
                      />
                    </button>

                    {expanded === item.name && (
                      <div className="flex flex-col mx-2 mb-2 rounded-lg">
                        <div className="py-3 space-y-2 text-sm">
                          {subItems.map((sub) => (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              onClick={onClose}
                              className={cn(
                                "flex flex-col rounded-md px-3 py-2 hover:bg-background-800 text-foreground-300"
                              )}
                            >
                              <div className="font-semibold">{sub.label}</div>
                              {sub.description && (
                                <div className="text-sm text-foreground-400">
                                  {sub.description}
                                </div>
                              )}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              if ("href" in item) {
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      "rounded-lg px-4 py-3 text-sm hover:bg-background-800"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              }

              return null;
            })}
            <Divider variant="dashed" className="my-3" />
          </div>
        </div>
      )}
    </>
  );
}

/* ---------- Main Header ---------- */
export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { isSettingsPanelOpen, setIsSettingsPanelOpen } = useHeader();

  const handleMouseEnter = () => {
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    setIsToolsOpen(true);
  };

  const handleMouseLeave = () => {
    hideTimeoutRef.current = setTimeout(() => setIsToolsOpen(false), 200);
  };

  // Inside your component
  const [stars, setStars] = useState<string>("—"); // nice loading state

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

  return (
    <>
      {/* background bar */}
      <div className="fixed inset-x-0 top-0 z-100 h-15 border-b border-background-700 bg-background-900" />
      <header className="mx-auto max-w-[1600px] fixed top-0 left-1/2 -translate-x-1/2 z-100 flex h-15 w-full items-center justify-between px-4">
        <div className="flex items-center space-x-4 md:space-x-6">
          <Link
            href="/"
            className="mr-6 mb-1 flex items-center flex-shrink-0 transition-opacity hover:opacity-80"
          >
            <Logo />
            <span className="text-md font-semibold text-foreground-100">UI Lab</span>
            <Badge className="ml-2 mt-1 border-0 bg-transparent px-2! text-xs! font-semibold" pill size="sm">
              v0.1.2
            </Badge>
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
                  href={item.name === "documentation" ? "/docs" : `/components`}
                  className={cn(
                    "rounded-xl px-3 py-2 text-sm",
                    "hover:bg-background-800 hover:text-foreground-50"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right side: Settings, Theme Toggle, GitHub Stars */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsSettingsPanelOpen(!isSettingsPanelOpen)}
            className="z-[250] rounded-xl p-2 hover:bg-theme-border/30"
            aria-label="Open settings"
            title="Open theme settings"
          >
            <FaSliders />
          </button>

          <LandingThemeToggle />

          {/* GitHub Stars Button */}
          <a
            href="https://github.com/kyza0d/ui-lab.app"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center space-x-1.5 rounded-xl bg-background-700 border border-background-600 px-3 py-1.5 text-xs font-medium text-foreground-50 transition-all hover:bg-background-600 md:flex"
            aria-label="Star on GitHub"
          >
            <FaGithub />
            <span>{stars}</span>
          </a>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setIsMobileMenuOpen((v) => !v)}
            className="md:hidden flex items-center justify-center rounded-lg p-2 text-foreground-300 hover:bg-background-800"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <HiX size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </header>

      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
      <SettingsPanel />
    </>
  );
}
