"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/shared";
import { FaChevronDown } from "react-icons/fa6";
import { Divider } from "ui-lab-components";
import { getComponentsGroupedByCategory } from "@/features/component-docs";
import {
  navigationData,
  documentationItems,
  getDocumentationLink,
  toolsItems,
} from "./data";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
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
            "fixed top-15 left-0 right-0 z-50 pt-7 border-b border-background-700/60 md:hidden",
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
                    href={(item as any).href}
                    onClick={onClose}
                    className={cn(
                      "rounded-lg px-4 py-3 text-sm hover:bg-background-800"
                    )}
                  >
                    {item.label}
                  </Link>
                );
              }

              const href = item.name === "documentation" ? "/docs" : item.name === "elements" ? "/elements" : `/components`;
              return (
                <Link
                  key={item.name}
                  href={href}
                  onClick={onClose}
                  className={cn(
                    "rounded-lg px-4 py-3 text-sm hover:bg-background-800"
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
