"use client";

import Link from "next/link";
import { useState, useMemo, memo } from "react";
import { ThemeToggle, SettingsPanel } from "@/features/landing";
import { CommandPalette } from "@/features/command-palette";
import { Logo } from "@/shared";
import { Input, Badge, Divider, Tabs, TabsList, TabsTrigger, Button } from "ui-lab-components";
import { useApp } from "@/features/theme";
import { cn } from "@/shared";
import {
  FaBars,
  FaMagnifyingGlass,
  FaCodeBranch,
  FaMessage,
  FaInbox
} from "react-icons/fa6";
import { HiSparkles, HiX } from "react-icons/hi";
import { HiMiniSparkles } from "react-icons/hi2";
import { getTabGroupForPathname, getActiveTabForPathname, shouldApplyRevealCollapse } from "@/shared";
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
        className="text-sm mb-3"
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { setIsCommandPaletteOpen } = useApp();

  const hasRevealCollapse = shouldApplyRevealCollapse(pathname);
  const tabGroup = useMemo(() => getTabGroupForPathname(pathname), [pathname]);
  const activeTabId = useMemo(() => getActiveTabForPathname(pathname), [pathname]);

  return (
    <>
      <header className="fixed top-0 left-0 z-50 w-full border-b border-background-700 bg-background-950 h-16">
        <div className="h-full flex items-center justify-between px-3 w-full">
          <div className="flex items-center gap-4 flex-1">

            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <div className="scale-120">
                <Logo />
              </div>
              <span className="text-md font-bold text-foreground-100 mr-24">UI Lab</span>
              <div className="flex text-xs items-center text-foreground-400 h-[25px] rounded-md border border-background-600 px-[10px] font-bold">v0.4</div>
            </Link>


            {pathname === "/" && (
              <nav className="hidden ml-4 mr-8 md:flex items-center gap-12">
                {navigationData.filter((item) => item.name !== "tools").map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      href={item.name === "documentation" ? "/docs" : item.name === "elements" ? "/elements" : `/components`}
                      className="text-sm gap-3 flex items-center font-normal"
                    >
                      {Icon && <Icon size={13} className="text-foreground-400" />}
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            )}

            {hasRevealCollapse && tabGroup && activeTabId && (
              <Tabs className="mt-3 w-fit" value={activeTabId} variant="underline">
                <TabsList>
                  {tabGroup.tabs.map((tab) => (
                    <TabItem key={tab.id} tab={tab} />
                  ))}
                </TabsList>
              </Tabs>
            )}
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">

              <div className="flex gap-2">
                <div className="relative hidden sm:block">
                  <Input
                    placeholder="Search..."
                    prefixIcon={<FaMagnifyingGlass size={13} />}
                    className="w-50 py-1.5 pr-1 pl-9 bg-background-800/40 border-background-700 focus:ring-1 focus:ring-accent-500/50"
                    onClick={() => setIsCommandPaletteOpen(true)}
                    readOnly
                  />
                  <Badge className="text-foreground-300 text-xs absolute px-2 top-1/2 -translate-y-1/2 right-1.5 rounded-xs gap-1 border border-background-700" size="sm">
                    Ctrl {" "} K
                  </Badge>
                </div>
                <Button variant="default" className="bg-background-800/40 px-2 flex items-center justify-center">
                  <HiMiniSparkles size={15} className="text-foreground-300 text-sm" />
                </Button>
              </div>
              <Divider size='sm' className="-my-1" orientation="vertical" />

              <Button>
                Feedback
              </Button>
              <a
                href="https://github.com/kyza0d/ui-lab.app"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  aria-label="GitHub Repository"
                >
                  <FaCodeBranch size={14} />
                  Source
                </Button>
              </a>

              <Divider size='sm' className="-my-1" orientation="vertical" />
              <SettingsPanel />
              <ThemeToggle />
            </div>

            <button
              onClick={() => setIsMobileMenuOpen((v) => !v)}
              className="md:hidden flex items-center justify-center rounded-md p-2 text-foreground-300 hover:bg-background-800"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? <HiX size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </header>

      <CommandPalette />
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </>
  );
}
