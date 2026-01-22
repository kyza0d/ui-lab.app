'use client';

import { useRef, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { List, Scroll } from 'ui-lab-components';
import { cn, FadeContainer } from '@/shared';
import { useSidebarScroll } from '@/features/navigation';
import { StartersSidebarContent } from './starters-sidebar-content';
import { FaFire, FaStar, FaTag, FaBox, FaCheck, FaEye, FaGear, FaLayerGroup, FaList, FaWrench } from 'react-icons/fa6';
import { StartersNav } from '../lib/starters-types';
import { startersRegistry } from '../lib/starters-registry';

interface StartersSidebarProps {
  pathname: string;
}

function getActiveNavFromPathname(pathname: string): StartersNav {
  if (pathname.startsWith('/starters/framework')) return 'framework';
  if (pathname.startsWith('/starters/use-case')) return 'use-case';
  if (pathname.startsWith('/starters/features')) return 'features';
  if (pathname === '/starters/all') return 'all';
  return 'featured';
}

type MainNavItem = {
  id: StartersNav;
  label: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  description: string;
};

function getMainNav(): MainNavItem[] {
  return [
    {
      id: 'all',
      label: 'All Starters',
      href: '/starters/all',
      icon: FaList,
      description: 'Browse all templates',
    },
    {
      id: 'featured',
      label: 'Featured',
      href: '/starters',
      icon: FaStar,
      description: 'Curated starter templates',
    },
  ];
}

export function StartersSidebar({ pathname }: StartersSidebarProps) {
  const activeNav = getActiveNavFromPathname(pathname);
  const searchParams = useSearchParams();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const mainNav = useMemo(() => getMainNav(), []);

  useSidebarScroll(`sidebar-scroll-starters`, scrollContainerRef as React.RefObject<HTMLDivElement>);

  return (
    <aside className="hidden md:flex w-56 flex-col">
      <div className="flex flex-col h-screen sticky top-(--header-height)">
        <div className="z-10">
          <nav className="py-3 px-2 space-y-1">
            {mainNav.map((nav) => {
              const isActive = activeNav === nav.id;
              const Icon = nav.icon;

              return (
                <a
                  key={nav.id}
                  href={nav.href}
                  className={cn(
                    'flex border items-center gap-3 pl-1 pr-2 py-0.5 text-sm font-medium rounded-base',
                    isActive
                      ? 'border-background-700 text-foreground-200 bg-background-800/70'
                      : 'border-transparent text-foreground-400 hover:text-foreground-200 hover:bg-background-800/60'
                  )}
                >
                  <div
                    className={cn(
                      'w-8 h-8 rounded-base flex items-center justify-center',
                      isActive ? 'text-foreground-200' : 'text-foreground-400'
                    )}
                  >
                    {Icon && <Icon className="w-4 h-4" />}
                  </div>
                  <span>{nav.label}</span>
                </a>
              );
            })}
          </nav>
        </div>

        <FadeContainer className="flex-1">
          <Scroll
            ref={scrollContainerRef}
            className="h-[calc(100vh-var(--header-height))]"
            maxHeight="100%"
          >
            <StartersSidebarContent
              activeNav={activeNav}
              pathname={pathname}
              starters={startersRegistry}
            />
          </Scroll>
        </FadeContainer>
      </div>
    </aside>
  );
}
