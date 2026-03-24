"use client";

import Link from "next/link";
import { useState, useMemo, memo } from "react";
import { ThemeToggle, SettingsPanel } from "@/features/landing";
import dynamic from "next/dynamic";
const CommandPalette = dynamic(
  () => import("@/features/command-palette").then(mod => ({ default: mod.CommandPalette })),
  { ssr: false, loading: () => null }
);
import { Logo } from "@/shared";
import { Input, Divider, Tabs, Button, Tooltip } from "ui-lab-components";
import { useApp } from "@/features/theme";
import { useChat } from "@/features/chat";
import { cn } from "@/shared";
import {
  FaCodeBranch,
  FaBars,
} from "react-icons/fa6";
import { LuSearch } from "react-icons/lu";
import { HiX } from "react-icons/hi";
import { HiMiniSparkles } from "react-icons/hi2";
import { PanelRight } from "lucide-react";
import { getTabGroupForPathname, getActiveTabForPathname, shouldApplyRevealCollapse, type TabConfig } from "@/shared";
import { MobileMenu } from "./mobile-menu";
import { navigationData } from "./data";
import { useSidebarToggle } from "@/features/layout/hooks/sidebar-context";
import { useLandingSidebarToggle } from "@/features/layout/hooks/landing-sidebar-context";

const TabItem = memo(({ tab }: { tab: TabConfig }) => {
  return (
    <Link href={tab.path}>
      <Tabs.Trigger
        value={tab.id}
        disabled={tab.isPlaceholder}
        className="text-sm pb-[15px] pt-[17px]"
      >
        {tab.label}
      </Tabs.Trigger>
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
      path: item.name === "documentation" ? "/docs" : item.name === "elements" ? "/packages" : "/components",
      isPlaceholder: false,
    })), []);

  const activeHomeTab = pathname === "/docs" ? "documentation" : pathname === "/packages" ? "elements" : pathname === "/components" ? "components" : undefined;

  return (
    <>
      <header className="fixed left-0 -mr-2 top-0 z-50 w-full border-b border-background-700/40 bg-background-950 h-[58px]">
        <div className={cn("relative h-full max-w-(--page-width) flex items-center justify-between px-3 w-full overflow-hidden transition-[margin] duration-300", isChatOpen ? "mx-auto lg:ml-0 lg:mr-[28vw] xl:mr-[22vw] 2xl:mr-[18vw]" : "mx-auto")}>

          {/* LEFT SECTION: Logo & Tabs - Added shrink-0 to prevent it being crushed */}
          <div className="flex items-center shrink-0">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity shrink-0">
              <div className="scale-100">
                <Logo />
              </div>
            </Link>

            <button
              onClick={handleToggleSidebar}
              className="lg:hidden flex items-center justify-center rounded-md p-0.5 text-foreground-300 hover:bg-background-800 min-w-[44px] min-h-[44px]"
              aria-label="Toggle sidebar"
            >
              <PanelRight strokeWidth={2.4} size={20} />
            </button>

            {pathname === "/" && homeNavTabs && (
              <Tabs className="hidden ml-8 lg:block" value={activeHomeTab || ""} variant="underline">
                <Tabs.List>
                  {homeNavTabs.map((tab) => (
                    <TabItem key={tab.id} tab={tab} />
                  ))}
                </Tabs.List>
              </Tabs>
            )}

            {hasRevealCollapse && tabGroup && activeTabId && (
              <Tabs className="w-fit ml-8 hidden md:block" value={activeTabId} variant="underline">
                <Tabs.List>
                  {tabGroup.tabs.map((tab) => (
                    <TabItem key={tab.id} tab={tab} />
                  ))}
                </Tabs.List>
              </Tabs>
            )}
          </div>

          <div className="flex-1 flex justify-center md:pr-6 pl-4 lg:pr-0 lg:pr-12  max-w-sm">
            <div className="hidden lg:block relative w-full flex items-center">
              <Tooltip showArrow content="Open Command Palette" position="bottom" hint="ctrl-k" className="w-full">
                <Input
                  placeholder="Search..."
                  icon={<LuSearch strokeWidth={3.0} className="-translate-y-px" size={16} />}
                  onClick={() => setIsCommandPaletteOpen(true)}
                  readOnly
                />
              </Tooltip>
            </div>

            {/* AI Chat: This comes later */}
            <div className="hidden ml-2">
              <Tooltip showArrow content="Open Chat Panel" position="bottom" hint="ctrl-i">
                <Button
                  variant="ghost"
                  className="p-2"
                  styles={[isChatOpen ? "text-accent-500" : "text-foreground-300"]}
                  icon={{ left: <HiMiniSparkles size={15} /> }}
                  onClick={toggleChat}
                  aria-label="Toggle AI chat"
                />
              </Tooltip>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <div className="block lg:hidden flex items-center justify-end">
              <Tooltip showArrow content="Open Command Palette" position="bottom" hint="ctrl-k">
                <Button
                  variant="ghost"
                  className="text-foreground-300 hover:text-foreground-300 transition-colors"
                  styles="p-2"
                  icon={{ left: <LuSearch strokeWidth={3.0} size={16} /> }}
                  onClick={() => setIsCommandPaletteOpen(true)}
                />
              </Tooltip>
            </div>

            <div className="hidden lg:flex items-center gap-2">
              <Button variant="ghost" size="sm">
                Feedback
              </Button>
              <a
                href="https://github.com/kyza0d/ui-lab.app"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="ghost"
                  aria-label="GitHub Repository"
                  className="hover:text-foreground-300 transition-colors text-foreground-300 p-2"
                  size="sm"
                >
                  <FaCodeBranch className="mr-1" size={16} />
                  Source
                </Button>
              </a>
              <Divider size='sm' className="-my-3" orientation="vertical" />
            </div>
            <SettingsPanel />
            <ThemeToggle />

            <Tooltip showArrow content="Toggle Theme" position="bottom" hint="d">
              <Button
                onClick={() => setIsMobileMenuOpen((v) => !v)}
                variant="ghost"
                className="text-foreground-300 md:hidden flex items-center justify-center p-2"
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {isMobileMenuOpen ? <HiX size={16} /> : <FaBars size={16} />}
              </Button>
            </Tooltip>
          </div>
        </div>
      </header>

      <CommandPalette />
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} pathname={pathname} />
    </>
  );
}
