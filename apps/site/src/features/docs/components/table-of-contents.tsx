"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/shared";
import { Scroll } from "ui-lab-components";

export interface TableOfContentsItem {
  id: string;
  title: string;
  level: number;
}

interface TableOfContentsProps {
  items: TableOfContentsItem[];
}

function getCurrentPageItems(initialItems: TableOfContentsItem[]): TableOfContentsItem[] {
  const pageTocNode = document.querySelector('[data-docs-page-toc]');

  if (!(pageTocNode instanceof HTMLScriptElement)) {
    return initialItems;
  }

  try {
    const parsedItems = JSON.parse(pageTocNode.textContent ?? '[]');
    if (!Array.isArray(parsedItems)) {
      return initialItems;
    }

    return parsedItems
      .filter((item): item is TableOfContentsItem => (
        typeof item?.id === 'string' &&
        typeof item?.title === 'string' &&
        typeof item?.level === 'number'
      ));
  } catch {
    return initialItems;
  }
}

export function TableOfContents({ items: initialItems }: TableOfContentsProps) {
  const pathname = usePathname();
  const [activeId, setActiveId] = useState<string>("");
  const [visibleItems, setVisibleItems] = useState<TableOfContentsItem[]>(initialItems);
  const isClickScrolling = useRef(false);
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const filterVisibleHeadings = useCallback(() => {
    const sourceItems = getCurrentPageItems(initialItems);
    const registryIds = new Set(sourceItems.map(item => item.id));
    const visible: TableOfContentsItem[] = [];
    const headingRoot = document.getElementById('doc-content')
      ?? document.querySelector('#docs main')
      ?? document.body;

    for (const item of sourceItems) {
      const element = document.getElementById(item.id);
      if (element && (element as HTMLElement).offsetParent !== null) {
        visible.push(item);
      }
    }

    const domHeadings = new Set<string>();
    headingRoot.querySelectorAll('h2[id], h3[id], h4[id], h5[id], h6[id]').forEach(heading => {
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

  useEffect(() => {
    const frameId = requestAnimationFrame(() => {
      filterVisibleHeadings();
    });
    const timeoutIds = [
      window.setTimeout(filterVisibleHeadings, 100),
      window.setTimeout(filterVisibleHeadings, 300),
    ];

    return () => {
      cancelAnimationFrame(frameId);
      timeoutIds.forEach(window.clearTimeout);
    };
  }, [filterVisibleHeadings, pathname]);

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
    if (!activeId || !scrollRef.current) return;
    const scrollContent = scrollRef.current.firstElementChild as HTMLElement;
    if (!scrollContent) return;
    const activeButton = scrollContent.querySelector(
      `button[data-toc-id="${activeId}"]`
    ) as HTMLButtonElement | null;
    if (!activeButton) return;

    const buttonTop =
      activeButton.getBoundingClientRect().top -
      scrollContent.getBoundingClientRect().top +
      scrollContent.scrollTop;
    const targetPosition = buttonTop - scrollContent.clientHeight * 0.33;
    scrollContent.scrollTop = Math.max(0, targetPosition);
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
      <aside className="pr-4 w-[20rem] top-(--header-height) sticky hidden lg:block self-start">
        <nav className="space-y-6 px-4 py-5">
          <div>
            <span className="text-md font-semibold text-foreground-50">
              On this page
            </span>
            <div className="mt-2 h-140">
              <Scroll fadeY ref={scrollRef} maxHeight="100%">
                <div className="flex flex-col space-y-0">
                  {visibleItems.map((item) => (
                    <button
                      key={item.id}
                      data-toc-id={item.id}
                      onClick={() => handleClick(item.id)}
                      className={cn(
                        "block w-full my-0.25 text-left font-medium text-xs px-2 py-1.5 rounded-sm cursor-pointer overflow-hidden",
                        "transition-colors duration-450 ease-out",
                        "hover:duration-0",

                        item.level === 3 && "pl-6",
                        item.level === 4 && "pl-10",
                        item.level && item.level > 4 && "pl-14",

                        activeId === item.id
                          ? "text-foreground-50 bg-background-800"
                          : "text-foreground-400 hover:text-foreground-300 hover:bg-background-800/50"
                      )}
                    >
                      <span className="whitespace-nowrap block [-webkit-mask-image:linear-gradient(to_right,black_0%,black_80%,transparent_100%)]">
                        {item.title}
                      </span>
                    </button>
                  ))}
                </div>
              </Scroll>
            </div>
          </div>
        </nav>
      </aside>
    </>
  );
}
