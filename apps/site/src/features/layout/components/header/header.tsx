"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
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
  FaTree
} from "react-icons/fa6";
import { HiX } from "react-icons/hi";
import { getActiveTabValue, getDomainsWithTabs, getHeaderHeight, shouldApplyRevealCollapse } from "@/shared";

import { MobileMenu } from "./mobile-menu";
import { navigationData } from "./data";
import { Command } from "lucide-react";

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
        // At the top (< 10)
        // Only show if we have previously scrolled down (return to top)
        // or if explicitly triggered by wheel (handled below)
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

  const activeTabValue = getActiveTabValue(pathname);

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
        className={cn("items-start justify-between flex flex-col fixed top-0 left-1/2 -translate-x-1/2 z-100 w-full px-6", pathname === "/" ? "max-w-[1100px]" : "max-w-(--page-width)")}
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
          <div className="flex items-center space-x-4 md:space-x-6">
            <Link
              href="/"
              className="mr-5 flex items-center transition-opacity hover:opacity-80"
            >
              <Logo />
              <span className="text-md font-semibold text-foreground-50 mr-8">UI Lab</span>
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
              placeholder="Search"
              prefixIcon={<FaMagnifyingGlass size={14} />}
              className="pl-10 pr-12 w-42 bg-background-900 border-background-700 focus:ring-1 focus:ring-accent-500/50 transition-all"
              size="md"
              onClick={() => setIsCommandPaletteOpen(true)}
              readOnly
            />
            <Badge className="absolute top-1/2 -translate-y-1/2 right-2 w-10 rounded-[9px] gap-1 bg-background-700/50 border border-background-700" size="sm" icon={<Command className="mt-px" size={12} strokeWidth={2.4} />}> K </Badge>
          </div>
          {/* Right side: Settings, Theme Toggle */}
          <div className="flex items-center">
            <div className="flex">
              <Divider orientation="vertical" />
              <SettingsPanel />
              <ThemeToggle />
            </div>

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
        {hasRevealCollapse && activeTabValue && (
          <div className="absolute bottom-0 left-0 md:px-2 w-full">
            <Tabs className="w-fit" value={activeTabValue} variant="underline">
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
