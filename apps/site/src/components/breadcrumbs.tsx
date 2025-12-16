"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { FaChevronRight } from "react-icons/fa6";

export interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
  sticky?: boolean;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav
      className={cn(
        "grid grid-cols-[1fr_auto]",
        "sticky top-(--header-height) pl-6 pr-2 py-4 bg-background-950 border-b border-background-800 z-90",
        className
      )}
      aria-label="Breadcrumb"
    >
      <ol className="flex items-center gap-2 text-sm">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-3">
            {index > 0 && (
              <FaChevronRight
                className="w-2.5 h-2.5 text-foreground-300"
              />
            )}
            {index === items.length - 1 ? (
              <span className="text-foreground-400">{item.label}</span>
            ) : (
              <Link
                href={item.href}
                className="text-foreground-400 hover:text-foreground-50 transition-colors"
              >
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
