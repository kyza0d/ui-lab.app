'use client';

import Link from 'next/link';
import { useRef, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { Scroll } from 'ui-lab-components';
import { cn, FadeContainer } from '@/shared';
import { useSidebarScroll } from '@/features/navigation';
import { ElementsList } from './elements-sidebar-content';
import { FaCube, FaRegWindowMaximize } from 'react-icons/fa6';
import type { ElementMetadata, ElementCategoryId } from 'ui-lab-registry';
import { getCategoriesWithElements } from 'ui-lab-registry';

type ElementsNav = 'elements' | 'sections';

function getActiveNavFromPathname(pathname: string): ElementsNav {
  if (pathname.startsWith('/sections')) return 'sections';
  return 'elements';
}

interface ElementsSidebarProps {
  elements: ElementMetadata[];
  pathname: string;
}

export function ElementsSidebar({ elements, pathname }: ElementsSidebarProps) {
  const activeNav = getActiveNavFromPathname(pathname);
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get('category') as ElementCategoryId | null;
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const categoriesWithElements = useMemo(
    () => getCategoriesWithElements(elements),
    [elements]
  );

  const mainNav = useMemo(
    () => [
      {
        id: 'elements',
        label: 'Elements',
        href: '/elements',
        icon: FaCube,
      },
      {
        id: 'sections',
        label: 'Sections',
        href: '/sections',
        icon: FaRegWindowMaximize,
      },
    ],
    []
  );

  useSidebarScroll(`sidebar-scroll-${activeNav}`, scrollContainerRef as React.RefObject<HTMLDivElement>);

  return (
    <aside className="hidden md:flex w-56 flex-col">
      <div className="flex flex-col h-screen sticky top-(--header-height)">
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
                    'flex border items-center gap-3 pl-1 pr-2 py-0.5 text-sm font-medium rounded-md',
                    isActive
                      ? 'border-background-700 text-foreground-200 bg-background-800/70'
                      : 'border-transparent text-foreground-400 hover:text-foreground-200 hover:bg-background-800/60'
                  )}
                >
                  <div
                    className={cn(
                      'w-8 h-8 rounded-md flex items-center justify-center',
                      isActive ? 'text-foreground-200' : 'text-foreground-400'
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

        <FadeContainer className="flex-1">
          <Scroll
            ref={scrollContainerRef}
            className="h-[calc(100vh-var(--header-height))]"
            maxHeight="100%"
          >
            <div className="py-5 px-5">
              <ElementsList
                activeNav={activeNav}
                elements={elements}
                pathname={pathname}
                activeCategory={activeCategory}
              />
            </div>
          </Scroll>
        </FadeContainer>
      </div>
    </aside>
  );
}
