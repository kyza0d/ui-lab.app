"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { cn } from "@/shared";
import { FaChevronDown, FaCodeBranch } from "react-icons/fa6";
import { Divider, Button } from "ui-lab-components";
import { getTabGroupForPathname, shouldApplyRevealCollapse } from "@/shared";
import type { TabConfig } from "../../lib/route-config";
import {
  navigationData,
  documentationItems,
  getDocumentationLink,
} from "./data";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  pathname: string;
}

export function MobileMenu({ isOpen, onClose, pathname }: MobileMenuProps) {
  const [expanded, setExpanded] = useState<string | null>(null);

  const isLandingPage = pathname === "/";
  const hasRevealCollapse = shouldApplyRevealCollapse(pathname);
  const tabGroup = useMemo(() => getTabGroupForPathname(pathname), [pathname]);

  const homeNavTabs = useMemo(() => navigationData
    .filter((item) => item.name !== "tools")
    .map((item) => ({
      id: item.name,
      label: item.label,
      icon: item.icon,
      path: item.name === "documentation" ? "/docs" : item.name === "elements" ? "/packages" : "/components",
      isPlaceholder: false,
    }) as TabConfig), []);

  const visibleTabs: TabConfig[] = useMemo(() => {
    if (isLandingPage) {
      return homeNavTabs;
    }
    return (hasRevealCollapse && tabGroup) ? tabGroup.tabs : [];
  }, [isLandingPage, hasRevealCollapse, tabGroup, homeNavTabs]);

  const getDocumentationSubItems = () => {
    return documentationItems.map((i) => ({
      label: i.label,
      href: getDocumentationLink(i.id),
    }));
  };

  const renderTab = (tab: TabConfig) => {
    const shouldShowDropdown = tab.id === "documentation" && !isLandingPage;

    if (shouldShowDropdown) {
      return (
        <div key={tab.id} className="flex flex-col">
          <button
            onClick={() =>
              setExpanded((prev) => (prev === tab.id ? null : tab.id))
            }
            className={cn(
              "flex w-full items-center justify-between rounded-md px-3 py-2",
              "font-medium hover:bg-background-800"
            )}
          >
            <span>{tab.label}</span>
            <FaChevronDown
              className={cn(
                "h-2.5 w-2.5 text-foreground-300",
                expanded === tab.id && "rotate-180"
              )}
            />
          </button>

          {expanded === tab.id && (
            <div className="flex flex-col mx-2 mb-2 rounded-md">
              <div className="py-3 space-y-2 text-sm">
                {getDocumentationSubItems().map((sub) => (
                  <Link
                    key={sub.href}
                    href={sub.href}
                    onClick={onClose}
                    className={cn(
                      "flex flex-col rounded-md px-3 py-2 hover:bg-background-800 text-foreground-300"
                    )}
                  >
                    <div className="font-semibold">{sub.label}</div>
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
        key={tab.id}
        href={tab.path}
        onClick={onClose}
        className={cn(
          "rounded-md px-4 py-3 text-sm hover:bg-background-800"
        )}
      >
        {tab.label}
      </Link>
    );
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
            "fixed top-15 left-0 right-0 z-50 pt-7 border-b border-background-700/60 md:hidden",
            "overflow-y-auto max-h-[calc(100vh-3.75rem)] bg-background-950 animate-in slide-in-from-top-2"
          )}
        >
          <div className="flex flex-col px-2 py-4 space-y-1">
            {visibleTabs.map((tab) => renderTab(tab))}
            <Divider variant="dashed" className="my-3" />
            <div className="flex flex-col gap-2">
              <Button className="w-full">
                Feedback
              </Button>
              <a
                href="https://github.com/kyza0d/ui-lab.app"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                <Button className="w-full flex items-center justify-center gap-2">
                  <FaCodeBranch size={14} />
                  Source
                </Button>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
