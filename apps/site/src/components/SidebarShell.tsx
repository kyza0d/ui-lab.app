'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { FadeContainer } from './FadeContainer';
import { getHeaderHeight } from '@/lib/route-config';
import type { IconType } from 'react-icons';

interface MainNavItem {
  id: string;
  label: string;
  href: string;
  icon: IconType;
  badge?: React.ReactNode;
}

interface SidebarShellProps {
  mainNav: MainNavItem[];
  activeNav: string;
  contextualContent: React.ReactNode;
}

export function SidebarShell({ mainNav, activeNav, contextualContent }: SidebarShellProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const headerHeight = getHeaderHeight(pathname);

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

  return (
    <aside className="hidden md:flex w-56 flex-col">
      <div className="flex flex-col sticky" style={{ top: headerHeight }}>
        <div className="z-10">
          <nav className="py-3 px-2 space-y-1">
            {mainNav.map((nav) => {
              const isActive = activeNav === nav.id;
              const Icon = nav.icon;

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
                  {nav.badge}
                </Link>
              );
            })}
          </nav>
        </div>

        <FadeContainer className="flex-1 mb-26">
          <div
            ref={scrollContainerRef}
            className="overflow-y-auto py-5 px-5 h-full"
          >
            {contextualContent}
          </div>
        </FadeContainer>
      </div>
    </aside>
  );
}
