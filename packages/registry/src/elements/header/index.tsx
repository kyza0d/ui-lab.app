"use client";

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
          className={`w-full bg-white ${sticky ? "sticky top-0 z-50" : ""} ${className || ""}`}
          role="banner"
        >
          <div className="flex items-center justify-between gap-6 px-4 py-3 md:px-6 md:py-4">
            {/* Logo/Branding Section */}
            <div className="flex items-center gap-2 flex-shrink-0">
              {logo ? (
                <div className="text-xl font-bold">{logo}</div>
              ) : (
                <div className="text-lg font-bold">{logoText}</div>
              )}
            </div>

            {/* Navigation Links - Hidden on mobile, visible on md and up */}
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
                    className="text-sm text-gray-700 hover:text-gray-900 transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            )}

            {/* Actions Section */}
            {actions.length > 0 && (
              <div className="flex gap-2 items-center flex-shrink-0">
                {actions.map((action, index) => (
                  <button
                    key={index}
                    onClick={action.onClick}
                    className="px-3 py-2 text-sm rounded-md hover:bg-gray-100 transition-colors"
                    aria-label={action.label}
                  >
                    {action.icon || action.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </header>
        <div className="border-b border-gray-200" role="separator"></div>
      </>
    );
  }
);

Header.displayName = "Header";

export { Header };
export type { HeaderProps } from "./types";
