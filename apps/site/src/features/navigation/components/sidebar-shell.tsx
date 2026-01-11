'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { cn, FadeContainer } from '@/shared';
import { FaChevronDown } from 'react-icons/fa6';
import type { IconType } from 'react-icons';

export interface NestedNavItem {
  id: string;
  label: string;
  href: string;
  description?: string;
}

export interface MainNavItem {
  id: string;
  label: string;
  href: string;
  icon: IconType;
  children?: NestedNavItem[];
  isExpandable?: boolean;
}

interface SidebarShellProps {
  mainNav: MainNavItem[];
  activeNav: string;
  contextualContent: React.ReactNode;
  activeCategory?: string | null;
}

export function SidebarShell({ mainNav, activeNav, contextualContent, activeCategory }: SidebarShellProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const [expandedNavItems, setExpandedNavItems] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (pathname.startsWith('/elements')) {
      setExpandedNavItems(new Set(['elements']));
    }
  }, [pathname]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const storageKey = `sidebar-scroll-${activeNav}`;

    const savedPosition = sessionStorage.getItem(storageKey);
    if (savedPosition) {
      container.scrollTop = parseInt(savedPosition, 10);
    }

    const handleScroll = () => {
      sessionStorage.setItem(storageKey, container.scrollTop.toString());
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [activeNav]);

  const toggleNavItem = (navId: string) => {
    setExpandedNavItems((prev) => {
      const next = new Set(prev);
      if (next.has(navId)) next.delete(navId);
      else next.add(navId);
      return next;
    });
  };

  return (
    <aside className="hidden md:flex w-56 flex-col h-screen">
      <div className="flex flex-col sticky pt-2 top-(--header-height)" >
        <div className="z-10">
          <nav className="px-2 space-y-1">
            {mainNav.map((nav) => {
              const isActive = activeNav === nav.id;
              const isExpanded = expandedNavItems.has(nav.id);
              const Icon = nav.icon;

              if (nav.isExpandable) {
                return (
                  <div key={nav.id}>
                    <button
                      onClick={() => {
                        toggleNavItem(nav.id);
                        router.push(nav.href);
                      }}
                      className={cn(
                        'w-full flex border items-center gap-3 pl-1 pr-2 py-1 text-sm font-medium rounded-md',
                        isActive
                          ? 'border-background-700 text-foreground-50 bg-background-800/70'
                          : 'border-transparent text-foreground-400 hover:text-foreground-200 hover:bg-background-800/60'
                      )}
                    >
                      <div
                        className={cn(
                          'w-8 h-8 rounded-md flex items-center justify-center',
                          isActive ? 'text-foreground-50' : 'text-foreground-400'
                        )}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="flex-1 text-left">{nav.label}</span>
                      <FaChevronDown
                        className={cn(
                          'w-3 h-3 transition-transform',
                          !isExpanded && '-rotate-90'
                        )}
                      />
                    </button>

                    {isExpanded && nav.children && (
                      <div className="relative ml-3">
                        <div className="absolute left-0.5 top-0 bottom-0 w-px bg-background-600" />
                        <div className="space-y-0.5 pl-3">
                          {nav.children.map((child) => {
                            const isChildActive = activeCategory === child.id;
                            return (
                              <Link
                                key={child.id}
                                href={child.href}
                                className={cn(
                                  'block px-3 py-1.5 text-sm rounded-md pl-2.5',
                                  isChildActive
                                    ? 'border-accent-500 text-foreground-50 bg-background-800 font-medium'
                                    : 'border-background-600 text-foreground-400 hover:text-foreground-200 hover:bg-background-800/50'
                                )}
                              >
                                {child.label}
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={nav.id}
                  href={nav.href}
                  className={cn(
                    'flex border items-center gap-3 pl-1 pr-2 py-1 text-sm font-medium rounded-md',
                    isActive
                      ? 'border-background-700 text-foreground-50 bg-background-800/70'
                      : 'border-transparent text-foreground-400 hover:text-foreground-200 hover:bg-background-800/60'
                  )}
                >
                  <div
                    className={cn(
                      'w-8 h-8 rounded-md flex items-center justify-center',
                      isActive ? 'text-foreground-50' : 'text-foreground-400'
                    )}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span>{nav.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <FadeContainer className="flex-1 mb-26">
          <div
            ref={scrollContainerRef}
            className="overflow-y-auto py-3 h-full"
          >
            {contextualContent}
          </div>
        </FadeContainer>
      </div>
    </aside>
  );
}
