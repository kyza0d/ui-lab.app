"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TableOfContentsItem {
  id: string;
  title: string;
}

interface TableOfContentsProps {
  items: TableOfContentsItem[];
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150;

      for (const item of items) {
        const element = document.getElementById(item.id);
        if (!element) continue;

        const elementTop = element.getBoundingClientRect().top + window.scrollY;
        const elementBottom = elementTop + element.offsetHeight;

        if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
          setActiveId(item.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [items]);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveId(id);
    }
  };

  return (
    <aside className="border-l border-background-700 sticky top-27 overflow-y-auto py-4 h-[calc(100vh-3.75rem)] hidden lg:block">
      <nav className="space-y-6 px-4">
        <div>
          <span className="text-md font-semibold text-foreground-50">On this page</span>
          <div className="space-y-0 mt-2">
            {items.map((item) => (
              <button
                key={item.id}
                onClick={() => handleClick(item.id)}
                className={cn(
                  "text-left text-sm px-2 py-1.5 rounded-md transition-colors",
                  activeId === item.id
                    ? "text-foreground-50 bg-background-800"
                    : "text-foreground-400 hover:text-foreground-300"
                )}
              >
                {item.title}
              </button>
            ))}
          </div>
        </div>
      </nav>
    </aside>
  );
}
