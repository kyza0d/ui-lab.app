"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { LandingThemeToggle } from "./landing/theme-toggle";
import { SettingsPanel } from "./landing/settings-panel";
import { Logo } from "./ui/logo";
import { Button, Divider } from "@ui-lab/components";
import { useHeader } from "@/lib/header-context";
import { cn } from "@/lib/utils";
import { getComponentsGroupedByCategory } from "@/lib/component-registry";
import { FaChevronDown, FaSliders, FaPalette, FaFill, FaIcons, FaCode, FaWandMagicSparkles, FaBars, FaWrench } from "react-icons/fa6";
import { HiX } from "react-icons/hi";

const navigationData = [
  { name: "showcase", label: "Showcase", href: "showcase" },
  { name: "documentation", label: "Documentation", href: "documentation" },
  { name: "components", label: "Components", href: "components" },
  { name: "customization", label: "Customization", href: "customization" },
  { name: "tools", label: "Tools", isDropdown: true },
];

const documentationItems = [
  { id: "overview", label: "Overview" },
  { id: "installation", label: "Installation" },
  { id: "usage", label: "Usage" },
];

const getDocumentationLink = (id: string) => id === "overview" ? "/docs" : `/docs/${id}`;

const toolsItems = [
  {
    title: "Color Palette Generator",
    description: "Generate beautiful color schemes.",
    href: "/tools/color-palette",
    icon: FaPalette
  },
  {
    title: "Gradient Generator",
    description: "Create smooth CSS gradients easily.",
    href: "/tools/gradient",
    icon: FaFill
  },
  {
    title: "Icon Finder",
    description: "Search and copy any icon instantly.",
    href: "/tools/icons",
    icon: FaIcons
  },
  {
    title: "CSS Gradient Animator",
    description: "Animate gradients with pure CSS.",
    href: "/tools/css-animator",
    icon: FaWandMagicSparkles
  },
];

const customizationItems = [
  { id: "theming", label: "Theming" },
  { id: "typography", label: "Typography" },
  { id: "icons", label: "Icons" },
];

const getCustomizationLink = (id: string) => id === "theming" ? "/customize" : `/customize/${id}`;

function ToolsDropdown({ isOpen, onMouseEnter, onMouseLeave }: { isOpen: boolean; onMouseEnter: () => void; onMouseLeave: () => void }) {
  return (
    <div
      className={cn(
        "absolute top-full left-0 z-50 bg-background-950",
        "overflow-hidden flex rounded-2xl border-background-700 border",
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
            <span className="flex text-sm items-center h-13 px-3 text-foreground-50"><FaWrench className="mr-3" /> Utilities</span>
            <Divider variant="dashed" className="mt-0 mb-2" />
            <div className="flex flex-col space-y-1 mt-2">
              {toolsItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Link
                    key={item.title}
                    href={item.href}
                    className={cn(
                      "rounded-xl p-1",
                      "text-foreground-300 hover:bg-background-800",
                      "flex items-center gap-3 group"
                    )}
                  >
                    <div className="group-hover:bg-background-600 flex-shrink-0 w-10 h-10 rounded-lg bg-background-800/50 flex items-center justify-center">
                      <IconComponent className="h-5 w-5 text-foreground-100" />
                    </div>
                    <div className="flex flex-col">
                      <div className="font-semibold text-foreground-50 text-sm">{item.title}</div>
                      <div className="text-sm text-foreground-400 mt-0.5">{item.description}</div>
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

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [expanded, setExpanded] = useState<string | null>(null);

  const getMenuItems = (itemName: string): Array<{ label: string; href: string; description?: string }> => {
    switch (itemName) {
      case "documentation":
        return documentationItems.map((item) => ({
          label: item.label,
          href: getDocumentationLink(item.id),
        }));
      case "components":
        const groupedComponents = getComponentsGroupedByCategory();
        const allComponents: Array<{ label: string; href: string }> = [];
        Object.values(groupedComponents).forEach((components) => {
          components.forEach((comp) => {
            allComponents.push({
              label: comp.name,
              href: `/components/${comp.id}`,
            });
          });
        });
        return allComponents;
      case "customization":
        return customizationItems.map((item) => ({
          label: item.label,
          href: getCustomizationLink(item.id),
        }));
      case "tools":
        return toolsItems.map((tool) => ({
          label: tool.title,
          description: tool.description,
          href: tool.href,
        }));
      default:
        return [];
    }
  };

  return (
    <>
      <div
        className={cn("fixed bg-background-950 inset-0 z-30 transition-opacity md:hidden")}
        style={{ opacity: isOpen ? 1 : 0, pointerEvents: isOpen ? "auto" : "none" }}
        onClick={onClose}
      />

      {isOpen && (
        <div
          className={cn(
            "fixed top-15 left-0 right-0 z-50 pt-6 border-b-2 border-background-700/60 md:hidden overflow-y-auto max-h-[calc(100vh-3.75rem)]",
            "animate-in slide-in-from-top-2 bg-background-950"
          )}
        >
          <div className="flex flex-col px-2 py-4 space-y-1">
            {navigationData.map((item) => {
              const shouldShowDropdown = item.isDropdown || ["documentation", "components", "customization"].includes(item.name);

              if (shouldShowDropdown) {
                const menuItems = getMenuItems(item.name);
                return (
                  <div key={item.name} className="flex flex-col">
                    <button
                      onClick={() => setExpanded(expanded === item.name ? null : item.name)}
                      className={cn(
                        "inline-flex items-center justify-between w-full rounded-lg px-3 py-2",
                        "font-medium hover:bg-background-800"
                      )}
                    >
                      <span>{item.label}</span>
                      <FaChevronDown
                        className={cn("h-2.5 w-2.5 text-foreground-300", expanded === item.name && "rotate-180")}
                      />
                    </button>

                    {expanded === item.name && (
                      <div className="flex flex-col rounded-lg mx-2 mb-2">
                        <div className="py-3 space-y-2 text-sm">
                          {menuItems.map((subItem) => (
                            <Link
                              key={subItem.href}
                              href={subItem.href}
                              onClick={onClose}
                              className={cn(
                                "flex flex-col rounded-md px-3 py-2 text-left",
                                "hover:bg-background-800",
                                "text-foreground-300"
                              )}
                            >
                              <div className="font-semibold">{subItem.label}</div>
                              {subItem.description && (
                                <div className="text-sm text-foreground-300">{subItem.description}</div>
                              )}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={item.name}
                  href={`/${item.href}`}
                  onClick={onClose}
                  className={cn(
                    "inline-flex items-center rounded-lg px-4 py-3",
                    "text-sm hover:bg-background-800"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}

            <Divider variant="dashed" className="my-3" />
          </div>
        </div>
      )}
    </>
  );
}

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

  return (
    <>
      <div
        className={cn(
          "fixed top-0 left-1/2 -translate-x-1/2 right-0 z-50 w-full h-15 flex items-center justify-between px-4",
          "bg-background-950 border-b border-background-700"
        )}
      />
      <header
        className={cn(
          "mx-auto  max-w-[1400px] fixed top-0 left-1/2 -translate-x-1/2 right-0 z-50 w-full h-15 flex items-center justify-between px-4"
        )}
      >
        <div className="flex items-center space-x-4 md:space-x-6 ">
          <Link href="/" className="mr-6 mb-1 flex-shrink-0 transition-opacity hover:opacity-80">
            <Logo />
          </Link>

          <nav className="hidden md:flex items-center space-x-2 lg:space-x-4">
            {navigationData.map((item) => {
              if (item.isDropdown) {
                return (
                  <div key={item.name} className="relative">
                    <button
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                      className={cn(
                        "inline-flex items-center rounded-xl px-3 py-2 text-sm",
                        "hover:text-foreground-50 hover:bg-background-800"
                      )}
                    >
                      {item.label}
                      <FaChevronDown
                        className={cn("h-2.5 w-2.5 ml-2 text-foreground-300", isToolsOpen && "rotate-180")}
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
                  href={item.href!}
                  className={cn(
                    "inline-flex text-sm items-center rounded-xl px-3 py-2",
                    "hover:text-foreground-50 hover:bg-background-800"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsSettingsPanelOpen(!isSettingsPanelOpen)}
            className="z-[250] cursor-pointer bg rounded-xl hover:bg-theme-border/30 p-2"
            aria-label="Open settings"
            title="Open theme settings"
          >
            <FaSliders />
          </button>
          <LandingThemeToggle />
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
      <div className="h-15" />
    </>
  );
}
