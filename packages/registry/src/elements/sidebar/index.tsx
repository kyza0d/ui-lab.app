"use client";

import React, { useState } from "react";
import type { SidebarProps, SidebarItem } from "./types";

const widthMap = {
  sm: "w-48",
  md: "w-64",
  lg: "w-80",
} as const;

const SidebarItemComponent = ({
  item,
  level = 0,
  onItemClick,
}: {
  item: SidebarItem;
  level?: number;
  onItemClick?: (item: SidebarItem) => void;
}) => {
  const [expanded, setExpanded] = useState(false);
  const hasSubmenu = item.submenu && item.submenu.length > 0;
  const paddingLeft = level * 12;
  const baseClasses =
    "flex items-center gap-3 px-4 py-2 rounded-md text-sm transition-colors";
  const activeClasses = item.active
    ? "bg-blue-100 text-blue-900 font-medium"
    : "text-gray-700 hover:bg-gray-100";

  return (
    <div key={item.id}>
      <a
        href={item.href || "#"}
        onClick={(e) => {
          if (item.onClick || onItemClick) {
            e.preventDefault();
            item.onClick?.();
            onItemClick?.(item);
          }
          if (hasSubmenu) {
            e.preventDefault();
            setExpanded(!expanded);
          }
        }}
        className={`${baseClasses} ${activeClasses}`}
        style={{ paddingLeft: `${16 + paddingLeft}px` }}
      >
        {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
        <span className="flex-1">{item.label}</span>
        {hasSubmenu && (
          <span
            className={`flex-shrink-0 transition-transform ${expanded ? "rotate-90" : ""}`}
          >
            →
          </span>
        )}
      </a>
      {hasSubmenu && expanded && (
        <div className="space-y-1">
          {item.submenu!.map((subitem) => (
            <SidebarItemComponent
              key={subitem.id}
              item={subitem}
              level={level + 1}
              onItemClick={onItemClick}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  (
    {
      items,
      isOpen = true,
      onOpenChange,
      collapsible = false,
      width = "md",
      className,
      onItemClick,
    },
    ref
  ) => {
    const [open, setOpen] = useState(isOpen);

    const handleToggle = () => {
      const newState = !open;
      setOpen(newState);
      onOpenChange?.(newState);
    };

    const widthClass = open ? widthMap[width] : "w-16";
    const containerClass = `flex h-full bg-white border-r border-gray-200 ${widthClass} transition-all duration-300 ease-in-out ${className || ""}`;

    return (
      <div ref={ref} className={containerClass}>
        <div className="flex flex-col w-full">
          {/* Sidebar Header with Toggle */}
          {collapsible && (
            <div className="flex items-center justify-end px-4 py-3 border-b border-gray-200">
              <button
                onClick={handleToggle}
                className="p-2 hover:bg-gray-100 rounded-md transition-colors"
                aria-label={open ? "Collapse sidebar" : "Expand sidebar"}
              >
                {open ? "←" : "→"}
              </button>
            </div>
          )}

          {/* Navigation Items */}
          <nav
            className="flex-1 overflow-y-auto px-2 py-4 space-y-1"
            role="navigation"
          >
            {items.map((item) => (
              <div
                key={item.id}
                className={!open ? "opacity-0 pointer-events-none" : ""}
              >
                <SidebarItemComponent
                  item={item}
                  onItemClick={onItemClick}
                />
              </div>
            ))}
          </nav>

          {/* Optional Divider before footer */}
          {items.length > 0 && (
            <div className="border-t border-gray-200" role="separator"></div>
          )}

          {/* Sidebar Footer */}
          <div
            className={`px-4 py-3 text-xs text-gray-500 ${!open ? "hidden" : ""}`}
          >
            <p>© 2024 App</p>
          </div>
        </div>
      </div>
    );
  }
);

Sidebar.displayName = "Sidebar";

export { Sidebar };
export type { SidebarProps, SidebarItem } from "./types";
