"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Breadcrumbs, Breadcrumb } from "ui-lab-components";
import { useBreadcrumbs } from "@/hooks/use-breadcrumbs";
import { cn } from "@/lib/utils";
import { FaChevronRight } from "react-icons/fa6";

interface BreadcrumbsNavProps {
  className?: string;
}

export function BreadcrumbsNav({ className }: BreadcrumbsNavProps) {
  const pathname = usePathname();
  const items = useBreadcrumbs(pathname);

  if (items.length === 0) return null;

  return (
    <nav
      className={cn(
        "hidden sticky top-(--header-height) py-2 pl-6 pr-2",
        "bg-background-950 border-b border-background-800 z-90",
        className
      )}
    >
      <Breadcrumbs separator={<FaChevronRight className="text-foreground-500 mt-0.5" size={10} />}>
        {items.map((item, index) => (
          <Breadcrumb
            key={index}
            href={item.href}
            isDisabled={!item.href}
          >
            {item.label}
          </Breadcrumb>
        ))}
      </Breadcrumbs>
    </nav>
  );
}
