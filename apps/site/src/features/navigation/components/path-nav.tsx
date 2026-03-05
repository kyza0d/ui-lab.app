"use client";

import { usePathname } from "next/navigation";
import { Path, PathItem } from "ui-lab-components";
import { usePath } from "../hooks/use-path";
import { cn } from "@/shared";
import { FaChevronRight } from "react-icons/fa6";

interface PathNavProps {
  className?: string;
}

export function PathNav({ className }: PathNavProps) {
  const pathname = usePathname();
  const items = usePath(pathname);

  if (items.length === 0) return null;

  return (
    <nav
      className={cn(
        "hidden sticky top-(--header-height) py-2 pl-6 pr-2",
        "bg-background-950 border-b border-background-700/40 z-90",
        className
      )}
    >
      <Path separator={<FaChevronRight className="text-foreground-400 mt-0.5" size={10} />}>
        {items.map((item: any, index: number) => (
          <PathItem
            key={index}
            href={item.href}
            isDisabled={!item.href}
          >
            {item.label}
          </PathItem>
        ))}
      </Path>
    </nav>
  );
}
