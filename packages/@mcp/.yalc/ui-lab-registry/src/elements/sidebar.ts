import type { ElementMetadata } from '../types';

export const sidebar: ElementMetadata = {
  id: 'sidebar',
  name: 'Sidebar',
  description: 'Vertical navigation sidebar with collapsible sections',
  category: 'navigation',
  tags: ['sidebar', 'navigation', 'layout', 'responsive'],
  componentDependencies: [],
  layout: {
    layoutClass: 'featured-sidebar',
    columnSpan: 2,
    rowSpan: 32,
    previewConfig: {
      adaptiveProps: { isPreview: true },
    },
  },
  variants: [
    {
      name: 'Expanded',
      description: 'Sidebar showing full labels and submenu items with collapsible support',
      demoPath: 'sidebar-expanded',
      files: [
        {
          filename: 'Sidebar.tsx',
          language: 'tsx',
          isEntryPoint: true,
          description: 'Main sidebar component with collapsible state management',
          code: `"use client";

import React, { useState } from "react";
import type { SidebarProps, SidebarItem } from "./types";
import { SidebarItemComponent } from "./SidebarItem";

const widthMap = {
  sm: "w-48",
  md: "w-64",
  lg: "w-80",
} as const;

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
    const containerClass = \`flex h-full bg-background-800 border-r border-background-700 \${widthClass} transition-all duration-300 ease-in-out \${className || ""}\`;

    return (
      <div ref={ref} className={containerClass}>
        <div className="flex flex-col w-full">
          {collapsible && (
            <div className="flex items-center justify-end px-4 py-3 border-b border-background-700">
              <button
                onClick={handleToggle}
                className="p-2 hover:bg-background-700 rounded-md transition-colors text-foreground-400 hover:text-foreground-50"
                aria-label={open ? "Collapse sidebar" : "Expand sidebar"}
              >
                {open ? "←" : "→"}
              </button>
            </div>
          )}

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

          {items.length > 0 && (
            <div className="border-t border-background-700" role="separator"></div>
          )}

          <div
            className={\`px-4 py-3 text-xs text-foreground-500 \${!open ? "hidden" : ""}\`}
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
export type { SidebarProps, SidebarItem } from "./types";`,
        },
        {
          filename: 'SidebarItem.tsx',
          language: 'tsx',
          description: 'Sub-component for rendering individual sidebar items with submenu support',
          code: `import { useState } from 'react';
import type { SidebarItem } from './types';

interface SidebarItemComponentProps {
  item: SidebarItem;
  level?: number;
  onItemClick?: (item: SidebarItem) => void;
}

export function SidebarItemComponent({
  item,
  level = 0,
  onItemClick,
}: SidebarItemComponentProps) {
  const [expanded, setExpanded] = useState(false);
  const hasSubmenu = item.submenu && item.submenu.length > 0;
  const paddingLeft = level * 12;
  const baseClasses =
    "flex items-center gap-3 px-4 py-2 rounded-md text-sm transition-colors";
  const activeClasses = item.active
    ? "bg-accent-500 text-foreground-50 font-medium"
    : "text-foreground-400 hover:bg-background-700 hover:text-foreground-50";

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
        className={\`\${baseClasses} \${activeClasses}\`}
        style={{ paddingLeft: \`\${16 + paddingLeft}px\` }}
      >
        {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
        <span className="flex-1">{item.label}</span>
        {hasSubmenu && (
          <span
            className={\`flex-shrink-0 transition-transform \${expanded ? "rotate-90" : ""}\`}
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
}`,
        },
        {
          filename: 'types.ts',
          language: 'typescript',
          description: 'TypeScript interfaces for Sidebar and navigation items',
          code: `export interface SidebarItem {
  id: string;
  label: string;
  href?: string;
  icon?: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
  submenu?: SidebarItem[];
}

export interface SidebarProps {
  items: SidebarItem[];
  isOpen?: boolean;
  onOpenChange?: (isOpen: boolean) => void;
  collapsible?: boolean;
  width?: 'sm' | 'md' | 'lg';
  className?: string;
  onItemClick?: (item: SidebarItem) => void;
}`,
        },
        {
          filename: 'useSidebarState.ts',
          language: 'typescript',
          description: 'Hook for managing sidebar open/closed state and active items',
          code: `import { useState, useCallback } from 'react';
import type { SidebarItem } from './types';

export function useSidebarState(defaultOpen = true) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [activeItemId, setActiveItemId] = useState<string | null>(null);

  const handleToggle = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const handleItemClick = useCallback((item: SidebarItem) => {
    setActiveItemId(item.id);
  }, []);

  return { isOpen, handleToggle, activeItemId, handleItemClick };
}`,
        },
      ],
    },
  ],
};
