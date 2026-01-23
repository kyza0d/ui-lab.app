"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useMemo, memo } from "react";
import { ThemeToggle, SettingsPanel } from "@/features/landing";
import { CommandPalette } from "@/features/command-palette";
import { Logo } from "@/shared";
import { Input, Tabs, TabsList, TabsTrigger, Select, Button, Badge, Divider } from "ui-lab-components";
import { useApp } from "@/features/theme";
import { cn } from "@/shared";
import {
  FaChevronDown,
  FaBars,
  FaMagnifyingGlass,
  FaBagShopping,
  FaTree,
  FaGithub
} from "react-icons/fa6";
import { HiX } from "react-icons/hi";
import { getHeaderHeight, shouldApplyRevealCollapse, getTabGroupForPathname, getActiveTabForPathname } from "@/shared";
import type { TabConfig } from "@/shared/lib/route-config";

import { MobileMenu } from "./mobile-menu";
import { navigationData } from "./data";
import { Command } from "lucide-react";

const TabItem = memo(({ tab }: { tab: TabConfig }) => {
  const Icon = tab.icon;
  return (
    <Link href={tab.path}>
      <TabsTrigger
        icon={<Icon />}
        value={tab.id}
        className="text-sm mb-1"
        disabled={tab.isPlaceholder}
      >
        {tab.label}
      </TabsTrigger>
    </Link>
  );
});

TabItem.displayName = "TabItem";

interface HeaderProps {
  pathname: string;
}

export default function Header({
  pathname,
}: HeaderProps) {
  const hasRevealCollapse = shouldApplyRevealCollapse(pathname);
  const headerHeight = getHeaderHeight(pathname);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const hasScrolledDownRef = useRef(false);
  const lastPathnameRef = useRef(pathname);
  const { setIsCommandPaletteOpen } = useApp();

  const tabGroup = useMemo(() => getTabGroupForPathname(pathname), [pathname]);
  const activeTabId = useMemo(() => getActiveTabForPathname(pathname), [pathname]);

  useEffect(() => {
    const isDesktop = typeof window !== "undefined" && window.matchMedia("(min-width: 768px)").matches;
    const visibleHeight = hasRevealCollapse && !isHeaderVisible && isDesktop ? "53px" : headerHeight;
    document.documentElement.style.setProperty('--header-height', visibleHeight);
  }, [headerHeight, isHeaderVisible, hasRevealCollapse]);

  useEffect(() => {
    if (!hasRevealCollapse || typeof window === "undefined") return;

    const isDesktop = window.matchMedia("(min-width: 768px)").matches;
    if (!isDesktop) return;

    // Reset state on navigation
    if (pathname !== lastPathnameRef.current) {
      // Persist the current visibility state.
      // If it was visible, keep it visible. If hidden, keep it hidden.
      hasScrolledDownRef.current = false;
      lastPathnameRef.current = pathname;
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > 10) {
        setIsHeaderVisible(false);
        hasScrolledDownRef.current = true;
      } else {
        if (hasScrolledDownRef.current) {
          setIsHeaderVisible(true);
        }
      }
    };

    const handleWheel = (e: WheelEvent) => {
      // If at top and scrolling up (negative deltaY), reveal header
      if (window.scrollY <= 10 && e.deltaY < 0) {
        setIsHeaderVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("wheel", handleWheel, { passive: true });

    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", handleWheel);
    };
  }, [hasRevealCollapse, pathname]);

  return (
    <>
      {/* background bar */}
      <div
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b border-background-700",
          pathname === "/" ? "bg-background-950" : "bg-background-950"
        )}
        style={{ height: hasRevealCollapse && !isHeaderVisible ? "53px" : headerHeight }}
      />

      <header
        className={cn("items-start justify-between flex flex-col fixed top-0 left-1/2 -translate-x-1/2 z-100 w-full pr-6 pl-3", pathname === "/" ? "max-w-[1100px]" : "max-w-(--page-width) bg-background-800/30 ")}
        style={{
          height: hasRevealCollapse && !isHeaderVisible ? "53px" : headerHeight,
        }}
      >
        <div
          className={cn("flex justify-between w-full pt-2.5", hasRevealCollapse && "md:absolute md:top-0 left-0md:z-50")}
          style={{
            transform: hasRevealCollapse && !isHeaderVisible ? "translateY(-100%)" : "translateY(0)",
            transitionTimingFunction: "var(--ease-gentle-ease)",
          }}
        >
          <div className={cn(
            "flex md:space-x-6 mx-auto",
          )}>
            <Link
              href="/"
              className={cn(
                pathname === "/" ? "visible" : "hidden",
                "absolute top-3 left-0 mr-auto flex items-center transition-opacity hover:opacity-80"
              )}
            >
              <div className="mr-2 rounded-sm">
                <Logo />
              </div>
              <span className="text-md font-semibold text-foreground-50">UI Lab</span>
            </Link>
            {/* Desktop navigation */}
            <nav className="hidden md:flex items-center space-x-2 lg:space-x-4">
              {navigationData.filter((item) => item.name !== "tools").map((item) => (
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
              ))}
              <Select trigger="hover" className="hidden relative flex items-center">
                <Select.Trigger className="bg-transparent border-0  text-foreground-300" chevron={<FaChevronDown size={10} className="relative top-1/2 -translate-y-1/2" />}>
                  <Select.Value icon={<FaBagShopping className="text-foreground-400" />} placeholder="Marketplace" />
                </Select.Trigger>
                <Select.Content>
                  <Select.List>
                    <Select.Item icon={<FaTree />} value="option1">Option 1</Select.Item>
                    <Select.Item value="option2">Option 2</Select.Item>
                    <Select.Item value="option3">Option 3</Select.Item>
                  </Select.List>
                </Select.Content>
              </Select>

            </nav>
          </div>

        </div>
        <div className="z-20 absolute flex items-center gap-2 bottom-2 right-3">
          <div className="relative">
            <Input
              placeholder="Search..."
              prefixIcon={<FaMagnifyingGlass size={14} />}
              className="w-40 py-1.5 pr-1 bg-background-900 border-background-700 focus:ring-1 focus:ring-accent-500/50 transition-all"
              onClick={() => setIsCommandPaletteOpen(true)}
              readOnly
            />
            <Badge className="text-foreground-200 absolute h-6 top-1/2 -translate-y-1/2 right-1.5 w-10 rounded-[9px] gap-1 bg-background-700/50 border border-background-700" size="sm" icon={<Command size={12} strokeWidth={2.6} />}> <span className="font-bold mt-2">K</span> </Badge>
          </div>
          {/* Right side: Settings, Theme Toggle */}
          <div className="flex items-center">
            <div className="flex">
              <a
                href="https://github.com/kyza0d/ui-lab.app"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center rounded-md p-2 text-foreground-300 hover:bg-background-800 hover:text-foreground-50 transition-colors"
                aria-label="GitHub Repository"
              >
                <FaGithub size={17} />
              </a>
              <Divider orientation="vertical" />
              <SettingsPanel />
              <ThemeToggle />
            </div>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setIsMobileMenuOpen((v) => !v)}
              className="md:hidden flex items-center justify-center rounded-md p-2 text-foreground-300 hover:bg-background-800"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? <HiX size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
        {hasRevealCollapse && tabGroup && activeTabId && (
          <div className="absolute bottom-0 left-0 md:px-2 w-full">
            <Tabs className="w-fit" value={activeTabId} variant="underline">
              <TabsList>
                <Link
                  href="/"
                  className={cn("mr-4 mb-2.5 flex items-center transition-opacity hover:opacity-80")}
                >
                  <div className="mr-2 rounded-sm">
                    <Logo />
                  </div>
                  <span className="text-md font-semibold text-foreground-50 mr-3">UI Lab</span>
                  <span className="ml-auto inline-block px-3 py-1 text-xs font-bold mr-12 bg-accent-500/20 text-accent-500 rounded-md">
                    Early Beta
                  </span>
                </Link>
                {tabGroup.tabs.map((tab) => (
                  <TabItem key={tab.id} tab={tab} />
                ))}
              </TabsList>
            </Tabs>
          </div>
        )}

        <div className={cn(
          "absolute h-20 border-x border-background-700 bottom-0 right-0 w-[1100px] pointer-events-none",
          pathname === "/" ? "visible" : "hidden"
        )}>
          <div className="absolute bottom-px -left-px w-[16px] h-[16px] rounded-[5px] border-[2px] border-background-700 bg-background-950 -translate-x-1/2 translate-y-1/2" />
          <div className="absolute bottom-px -right-px w-[17px] h-[16px] rounded-[5px] border-[2px] border-background-700 bg-background-950 translate-x-1/2 translate-y-1/2" />
        </div>
      </header>

      <CommandPalette />

      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </>
  );
}
