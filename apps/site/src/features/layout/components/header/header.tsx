"use client";

import Link from "next/link";
import { useState, useMemo, memo } from "react";
import { ThemeToggle, SettingsPanel } from "@/features/landing";
import { CommandPalette } from "@/features/command-palette";
import { Logo } from "@/shared";
import { Input, Badge, Divider, Tabs, TabsList, TabsTrigger, Button } from "ui-lab-components";
import { useApp } from "@/features/theme";
import { useChat } from "@/features/chat";
import { cn } from "@/shared";
import {
  FaMagnifyingGlass,
  FaCodeBranch,
  FaBars
} from "react-icons/fa6";
import { HiChat, HiX } from "react-icons/hi";
import { HiMiniSparkles } from "react-icons/hi2";
import { PanelRight } from "lucide-react";
import { getTabGroupForPathname, getActiveTabForPathname, shouldApplyRevealCollapse } from "@/shared";
import type { TabConfig } from "@/shared/lib/route-config";
import { MobileMenu } from "./mobile-menu";
import { navigationData } from "./data";
import { useSidebarToggle } from "@/features/layout/hooks/sidebar-context";
import { useLandingSidebarToggle } from "@/features/layout/hooks/landing-sidebar-context";

const TabItem = memo(({ tab }: { tab: TabConfig }) => {
  const Icon = tab.icon as any;
  return (
    <Link href={tab.path}>
      <TabsTrigger
        value={tab.id}
        className="gap-4 text-sm mb-3"
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
  const { toggleChat, isOpen: isChatOpen } = useChat();
  const { toggleSidebar } = useSidebarToggle();
  const { toggleSidebar: toggleLandingSidebar } = useLandingSidebarToggle();
  const isLandingPage = pathname === "/";
  const handleToggleSidebar = () => {
    if (isLandingPage) {
      toggleLandingSidebar();
    } else {
      toggleSidebar();
    }
  };

  const hasRevealCollapse = shouldApplyRevealCollapse(pathname);
  const tabGroup = useMemo(() => getTabGroupForPathname(pathname), [pathname]);
  const activeTabId = useMemo(() => getActiveTabForPathname(pathname), [pathname]);

  const homeNavTabs = useMemo(() => navigationData
    .filter((item) => item.name !== "tools")
    .map((item) => ({
      id: item.name,
      label: item.label,
      icon: item.icon,
      path: item.name === "documentation" ? "/docs" : item.name === "elements" ? "/elements" : "/components",
      isPlaceholder: false,
    })), []);

  const activeHomeTab = pathname === "/docs" ? "documentation" : pathname === "/elements" ? "elements" : pathname === "/components" ? "components" : undefined;

  return (
    <>
      <header className="fixed top-0 left-0 z-50 w-full border-b border-background-700 bg-background-950 h-16">
        <div className="h-full flex items-center justify-between px-3 w-full overflow-hidden">
          <div className="flex items-center gap-4 flex-1 min-w-0">

            <button
              onClick={handleToggleSidebar}
              className="lg:hidden flex items-center justify-center rounded-md p-0.5 text-foreground-300 hover:bg-background-800 min-w-[44px] min-h-[44px]"
              aria-label="Toggle sidebar"
            >
              <PanelRight strokeWidth={2.4} size={20} />
            </button>

            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity flex-shrink-0">
              <div className="scale-100">
                <Logo />
              </div>
            </Link>


            {pathname === "/" && homeNavTabs && (
              <Tabs className="mt-3 hidden md:block" value={activeHomeTab || ""} variant="underline">
                <TabsList>
                  {homeNavTabs.map((tab) => (
                    <TabItem key={tab.id} tab={tab} />
                  ))}
                </TabsList>
              </Tabs>
            )}

            {hasRevealCollapse && tabGroup && activeTabId && (
              <Tabs className="mt-3 w-fit hidden md:block" value={activeTabId} variant="underline">
                <TabsList>
                  {tabGroup.tabs.map((tab) => (
                    <TabItem key={tab.id} tab={tab} />
                  ))}
                </TabsList>
              </Tabs>
            )}
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="relative hidden lg:flex items-center">
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

            <Button
              variant="ghost"
              className="lg:hidden px-2 flex items-center justify-center min-w-[30px] min-h-[30px]"
              onClick={() => setIsCommandPaletteOpen(true)}
              aria-label="Search"
            >
              <FaMagnifyingGlass size={16} className="text-foreground-300" />
            </Button>

            <div className="hidden md:flex items-center gap-2">
              <Button size="sm">
                Feedback
              </Button>
              <a
                href="https://github.com/kyza0d/ui-lab.app"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  aria-label="GitHub Repository"
                  size="sm"

                >
                  <FaCodeBranch size={14} />
                  Source
                </Button>
              </a>
              <Divider size='sm' className="-my-1" orientation="vertical" />
              <SettingsPanel />
            </div>

            <Button
              variant="ghost"
              className="px-2 flex items-center justify-center min-w-[30px] min-h-[30px]"
              onClick={toggleChat}
              aria-label="Toggle AI chat"
            >
              <HiMiniSparkles
                size={15}
                className={cn(
                  "transition-colors",
                  isChatOpen
                    ? "text-accent-500"
                    : "text-foreground-300"
                )}
              />
            </Button>

            <ThemeToggle />

            <button
              onClick={() => setIsMobileMenuOpen((v) => !v)}
              className="md:hidden flex items-center justify-center rounded-md p-2 text-foreground-300 hover:bg-background-800 min-w-[30px] min-h-[30px]"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? <HiX size={20} /> : <FaBars size={20} />}
            </button>
          </div>
        </div>
      </header>

      <CommandPalette />
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </>
  );
}
