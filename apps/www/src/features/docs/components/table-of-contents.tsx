"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/shared";
import { Divider, Scroll } from "ui-lab-components";
import { DOCS_MANIFEST } from "../lib/generated-docs-manifest";

export interface TableOfContentsItem {
  id: string;
  title: string;
  level: number;
}

interface TableOfContentsProps {
  items: TableOfContentsItem[];
  mode?: "dynamic" | "static";
  className?: string;
}

function getRouteTocItems(pathname: string | null): TableOfContentsItem[] | null {
  if (!pathname || (!pathname.startsWith("/docs") && !pathname.startsWith("/design-system"))) {
    return null;
  }

  const domain = pathname.startsWith("/design-system") ? "design-system" : "docs";
  const page = DOCS_MANIFEST[domain].pages.find((entry) => entry.url === pathname);
  return page?.toc ?? null;
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

function getHeadingRoot() {
  return document.getElementById("doc-content")
    ?? document.querySelector("#docs main")
    ?? document.body;
}

export function TableOfContents({ items: initialItems, mode = "dynamic", className }: TableOfContentsProps) {
  const pathname = usePathname();
  const routeItems = useMemo(
    () => getRouteTocItems(pathname) ?? initialItems,
    [initialItems, pathname]
  );
  const [activeId, setActiveId] = useState<string>("");
  const [visibleState, setVisibleState] = useState<{
    pathname: string | null;
    items: TableOfContentsItem[];
  }>({
    pathname,
    items: routeItems,
  });
  const isClickScrolling = useRef(false);
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const visibleItems = mode === "static"
    ? routeItems
    : visibleState.pathname === pathname
      ? visibleState.items
      : routeItems;

  const filterVisibleHeadings = useCallback(() => {
    const sourceItems = getCurrentPageItems(routeItems);
    const registryIds = new Set(sourceItems.map(item => item.id));
    const seenIds = new Set<string>();
    const visible: TableOfContentsItem[] = [];
    const headingRoot = getHeadingRoot();

    for (const item of sourceItems) {
      const element = document.getElementById(item.id);
      if (element && (element as HTMLElement).offsetParent !== null) {
        seenIds.add(item.id);
        visible.push(item);
      }
    }

    headingRoot.querySelectorAll("h2[id], h3[id], h4[id], h5[id], h6[id]").forEach((heading) => {
      const id = heading.getAttribute("id");
      if (!id || seenIds.has(id)) return;

      const htmlElement = heading as HTMLElement;
      if (htmlElement.offsetParent === null) return;

      if (!registryIds.has(id)) {
        const level = parseInt(heading.tagName[1], 10);
        seenIds.add(id);
        visible.push({
          id,
          title: heading.textContent || "",
          level
        });
      }
    });

    setVisibleState({
      pathname,
      items: visible,
    });
  }, [pathname, routeItems]);

  useEffect(() => {
    if (mode === "static") return;

    let frameId: number | null = null;
    let observer: MutationObserver | null = null;

    const scheduleFilter = () => {
      if (frameId !== null) {
        cancelAnimationFrame(frameId);
      }

      frameId = requestAnimationFrame(() => {
        frameId = null;
        filterVisibleHeadings();
      });
    };

    const observeRoot = () => {
      observer?.disconnect();

      observer = new MutationObserver(() => {
        scheduleFilter();

        const nextRoot = getHeadingRoot();
        if (nextRoot !== observedRoot) {
          observeRoot();
        }
      });

      observedRoot = getHeadingRoot();
      observer.observe(observedRoot, {
        subtree: true,
        childList: true,
        attributes: true,
        attributeFilter: ["class", "style", "hidden", "id"],
      });
    };

    let observedRoot = getHeadingRoot();
    observeRoot();
    scheduleFilter();
    window.addEventListener("resize", scheduleFilter);

    return () => {
      if (frameId !== null) {
        cancelAnimationFrame(frameId);
      }
      observer?.disconnect();
      window.removeEventListener("resize", scheduleFilter);
    };
  }, [filterVisibleHeadings, mode]);

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
  }, [findActiveHeading, visibleItems.length]);

  useEffect(() => {
    if (!activeId || !scrollRef.current) return;
    const maskEl = scrollRef.current.firstElementChild as HTMLElement;
    const scrollContent = maskEl?.firstElementChild as HTMLElement;
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
      <aside className={cn("ml-auto w-65 top-(--header-height) sticky md:block self-start h-full min-h-0 overflow-hidden", className)}>
        <nav className="flex h-full min-h-0 flex-col pt-12">
          <span className="text-md font-semibold text-foreground-50">
            On this page
          </span>
          <Divider variant="dashed" spacing="lg" />
          <div className="mt-2 flex min-h-0 flex-1 overflow-hidden max-h-160">
            <Scroll inline fade-y ref={scrollRef} className="w-full h-full min-h-0 max-h-160 overflow-auto">
              <div className="flex flex-col space-y-0">
                {visibleItems.map((item) => (
                  <button
                    key={item.id}
                    data-toc-id={item.id}
                    onClick={() => handleClick(item.id)}
                    className={cn(
                      "block w-full my-0.25 text-left font-medium px-2 py-1.5 rounded-sm cursor-pointer overflow-hidden",
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
                    <span className="text-xs whitespace-nowrap block [-webkit-mask-image:linear-gradient(to_right,black_0%,black_80%,transparent_100%)]">
                      {item.title}
                    </span>
                  </button>
                ))}
              </div>
            </Scroll>
          </div>
        </nav>
      </aside>
    </>
  );
}
