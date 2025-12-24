"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { FadeContainer } from "./FadeContainer";

interface TableOfContentsItem {
  id: string;
  title: string;
  level: number;
}

interface TableOfContentsProps {
  items: TableOfContentsItem[];
}

export function TableOfContents({ items: initialItems }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [visibleItems, setVisibleItems] = useState<TableOfContentsItem[]>(initialItems);
  const isClickScrolling = useRef(false);
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const observerRef = useRef<MutationObserver | null>(null);
  const filterTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const tocContainerRef = useRef<HTMLElement | null>(null);

  const filterVisibleHeadings = useCallback(() => {
    const registryIds = new Set(initialItems.map(item => item.id));
    const visible: TableOfContentsItem[] = [];

    for (const item of initialItems) {
      const element = document.getElementById(item.id);
      if (element && (element as HTMLElement).offsetParent !== null) {
        visible.push(item);
      }
    }

    const domHeadings = new Set<string>();
    document.querySelectorAll('h2[id], h3[id], h4[id], h5[id], h6[id]').forEach(heading => {
      const id = heading.getAttribute('id')!;
      const htmlElement = heading as HTMLElement;
      if (htmlElement.offsetParent === null) return;

      domHeadings.add(id);
      if (!registryIds.has(id)) {
        const level = parseInt(heading.tagName[1], 10);
        visible.push({
          id,
          title: heading.textContent || '',
          level
        });
      }
    });

    setVisibleItems(visible);
  }, [initialItems]);

  const debouncedFilter = useCallback(() => {
    if (filterTimeoutRef.current) {
      clearTimeout(filterTimeoutRef.current);
    }
    filterTimeoutRef.current = setTimeout(() => {
      filterVisibleHeadings();
    }, 50);
  }, [filterVisibleHeadings]);

  useEffect(() => {
    filterVisibleHeadings();

    const container = document.documentElement;
    observerRef.current = new MutationObserver(() => {
      debouncedFilter();
    });

    observerRef.current.observe(container, {
      childList: true,
      subtree: true,
    });

    return () => {
      observerRef.current?.disconnect();
      if (filterTimeoutRef.current) {
        clearTimeout(filterTimeoutRef.current);
      }
    };
  }, [filterVisibleHeadings, debouncedFilter]);

  const findActiveHeading = useCallback(() => {
    if (visibleItems.length === 0) return;
    const scrollOffset = window.innerHeight * 0.20;
    const headingPositions: { id: string; top: number }[] = [];
    for (const item of visibleItems) {
      const element = document.getElementById(item.id);
      if (element) {
        headingPositions.push({
          id: item.id,
          top: element.getBoundingClientRect().top,
        });
      }
    }
    if (headingPositions.length === 0) return;
    let activeHeading = headingPositions[0].id;
    for (const { id, top } of headingPositions) {
      if (top <= scrollOffset) {
        activeHeading = id;
      } else {
        break;
      }
    }
    setActiveId(activeHeading);
  }, [visibleItems]);

  useEffect(() => {
    if (visibleItems.length === 0) return;
    const timer = setTimeout(() => {
      findActiveHeading();
    }, 100);
    return () => clearTimeout(timer);
  }, [visibleItems, findActiveHeading]);

  useEffect(() => {
    if (visibleItems.length === 0) return;
    const handleScroll = () => {
      if (isClickScrolling.current) return;
      findActiveHeading();
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [findActiveHeading]);

  useEffect(() => {
    if (!activeId || !tocContainerRef.current) return;
    const activeButton = tocContainerRef.current.querySelector(
      `button[data-toc-id="${activeId}"]`
    ) as HTMLButtonElement | null;
    if (!activeButton) return;

    const container = tocContainerRef.current;
    const containerHeight = container.clientHeight;
    const buttonTop = activeButton.offsetTop;
    const buttonHeight = activeButton.clientHeight;
    const targetPosition = buttonTop - containerHeight * 0.33;

    container.scrollTop = Math.max(0, targetPosition);
  }, [activeId]);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;
    setActiveId(id);
    isClickScrolling.current = true;
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
    }
    const elementTop = element.getBoundingClientRect().top + window.scrollY;
    const topPadding = 200;
    window.scrollTo({ top: elementTop - topPadding, behavior: "smooth" });
    clickTimeoutRef.current = setTimeout(() => {
      isClickScrolling.current = false;
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current);
      }
    };
  }, []);

  if (visibleItems.length === 0) return null;

  return (
    <>
      <aside
        ref={tocContainerRef}
        className="pb-42 w-[14rem] overflow-x-hidden h-screen top-[calc(var(--header-height)+2.9rem)] sticky overflow-y-auto hidden lg:block"
      >
        <nav className="space-y-6 px-4 py-5">
          <div>
            <span className="text-md font-semibold text-foreground-50">
              On this page
            </span>
            <div className="flex flex-col space-y-0 mt-2">
              {visibleItems.map((item) => (
                <button
                  key={item.id}
                  data-toc-id={item.id}
                  onClick={() => handleClick(item.id)}
                  className={cn(
                    "block w-full text-left text-sm px-2 py-1.5 rounded-md cursor-pointer overflow-hidden",
                    "transition-colors duration-300 ease-out",
                    "hover:duration-0",

                    // 3. Indentation Logic
                    item.level === 3 && "pl-6",
                    item.level === 4 && "pl-10",
                    item.level && item.level > 4 && "pl-14",

                    // 4. Active vs Inactive State
                    activeId === item.id
                      ? "text-foreground-50 bg-background-800 font-medium"
                      : "text-foreground-400 hover:text-foreground-300 hover:bg-background-800/50"
                  )}
                >
                  <span className="whitespace-nowrap block [-webkit-mask-image:linear-gradient(to_right,black_0%,black_80%,transparent_100%)]">
                    {item.title}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </nav>
      </aside>
    </>
  );
}
