import type { ElementMetadata } from '../types';

export const header: ElementMetadata = {
  id: 'header',
  name: 'Header',
  description: 'Navigation header component with logo and menu items',
  category: 'navigation',
  tags: ['header', 'navigation', 'layout'],
  componentDependencies: ['Button'],
  layout: {
    layoutClass: 'featured-header',
    columnSpan: 5,
    rowSpan: 2,
    previewConfig: {
      scale: 0.9,
      maxHeight: '72px',
      centeringStrategy: 'horizontal',
    },
  },
  variants: [
    {
      name: 'With Navigation',
      description: 'Header with logo, main nav, and user menu',
      demoPath: 'header-with-nav',
      files: [
        {
          filename: 'Header.tsx',
          language: 'tsx',
          isEntryPoint: true,
          description: 'Main header component with responsive navigation',
          code: `"use client";

import React from "react";
import type { HeaderProps } from "./types";

const Header = React.forwardRef<HTMLElement, HeaderProps>(
  (
    {
      logo,
      logoText = "Logo",
      navItems = [],
      actions = [],
      onSearchChange,
      sticky = false,
      className,
    },
    ref
  ) => {
    return (
      <>
        <header
          ref={ref}
          className={\`w-full bg-background-800 \${sticky ? "sticky top-0 z-50" : ""} border-b border-background-700 \${className || ""}\`}
          role="banner"
        >
          <div className="flex items-center justify-between gap-6 px-4 py-3 md:px-6 md:py-4">
            <div className="flex items-center gap-2 flex-shrink-0">
              {logo ? (
                <div className="text-xl font-bold text-foreground-50">{logo}</div>
              ) : (
                <div className="text-lg font-bold text-foreground-50">{logoText}</div>
              )}
            </div>

            {navItems.length > 0 && (
              <nav className="hidden md:flex gap-6 flex-1" role="navigation">
                {navItems.map((item, index) => (
                  <a
                    key={index}
                    href={item.href || "#"}
                    onClick={(e) => {
                      if (item.onClick) {
                        e.preventDefault();
                        item.onClick();
                      }
                    }}
                    className="text-sm text-foreground-300 hover:text-foreground-50 transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            )}

            {actions.length > 0 && (
              <div className="flex gap-2 items-center flex-shrink-0">
                {actions.map((action, index) => (
                  <button
                    key={index}
                    onClick={action.onClick}
                    className="px-3 py-2 text-sm rounded-md hover:bg-background-700 transition-colors text-foreground-300 hover:text-foreground-50"
                    aria-label={action.label}
                  >
                    {action.icon || action.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </header>
      </>
    );
  }
);

Header.displayName = "Header";

export { Header };
export type { HeaderProps } from "./types";`,
        },
        {
          filename: 'types.ts',
          language: 'typescript',
          description: 'TypeScript interfaces for Header component',
          code: `export interface NavItem {
  label: string;
  href?: string;
  onClick?: () => void;
}

export interface UserAction {
  label: string;
  icon?: string;
  onClick: () => void;
}

export interface HeaderProps {
  logo?: React.ReactNode;
  logoText?: string;
  navItems?: NavItem[];
  actions?: UserAction[];
  onSearchChange?: (query: string) => void;
  sticky?: boolean;
  className?: string;
}`,
        },
        {
          filename: 'useNavigation.ts',
          language: 'typescript',
          description: 'Hook for managing navigation state and active items',
          code: `import { useState, useCallback } from 'react';
import type { NavItem } from './types';

export function useNavigation(items: NavItem[] = []) {
  const [activeItemIndex, setActiveItemIndex] = useState<number | null>(null);

  const handleNavigate = useCallback((index: number) => {
    setActiveItemIndex(index);
  }, []);

  const navItemsWithActive = items.map((item, index) => ({
    ...item,
    isActive: index === activeItemIndex,
  }));

  return { activeItemIndex, handleNavigate, navItemsWithActive };
}`,
        },
      ],
    },
  ],
};
