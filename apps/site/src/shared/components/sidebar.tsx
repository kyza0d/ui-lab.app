'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useRef, useMemo, memo } from 'react';
import { Scroll } from 'ui-lab-components';
import { cn, FadeContainer, usePrefetchOnHover } from '@/shared';
import {
  getActiveDomainForPathname,
  getActiveNavItemForDomain,
  getMainNavItemsForDomain,
} from '@/app/lib/sidebar-config';
import { getSectionsForNav, getHrefForNavItem, isNavItemActive, getTotalComponentCount } from '@/features/navigation/lib/sidebar-sections';
import { getElementsListForSidebar, getActiveElementsNavFromPathname } from '@/features/elements/lib/sidebar-sections';
import { ElementsList } from '@/features/elements/components/elements-sidebar-content';

const SidebarItemLink = memo(function SidebarItemLink({
  href,
  className,
  children,
}: {
  href: string;
  className: string;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { onMouseEnter } = usePrefetchOnHover(href);

  return (
    <>
      <Link
        href={href}
        prefetch={false}
        onMouseEnter={onMouseEnter}
        style={{ display: 'none' }}
        aria-hidden
      />
      <div
        role="button"
        tabIndex={0}
        onClick={() => router.push(href)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            router.push(href);
          }
        }}
        onMouseEnter={onMouseEnter}
        className={className}
      >
        {children}
      </div>
    </>
  );
});

export function Sidebar() {
  const pathname = usePathname();
  const activeDomain = getActiveDomainForPathname(pathname);
  const activeNavItem = getActiveNavItemForDomain(activeDomain);
  const mainNavItems = useMemo(() => getMainNavItemsForDomain(activeDomain), [activeDomain]);
  const sections = useMemo(() => {
    if (activeDomain === 'elements' || activeDomain === 'sections') {
      return [];
    }
    return getSectionsForNav(activeNavItem);
  }, [activeDomain, activeNavItem]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const isElementsOrSections = activeDomain === 'elements' || activeDomain === 'sections';
  const elementsList = useMemo(() => (isElementsOrSections ? getElementsListForSidebar() : []), [isElementsOrSections]);
  const activeElementsNav = useMemo(() => (isElementsOrSections ? getActiveElementsNavFromPathname(pathname) : 'elements'), [isElementsOrSections, pathname]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const storageKey = isElementsOrSections ? `sidebar-scroll-${activeElementsNav}` : `sidebar-scroll-${activeNavItem}`;
    const savedPosition = sessionStorage.getItem(storageKey);
    if (savedPosition) {
      container.scrollTop = parseInt(savedPosition, 10);
    }

    const handleScroll = () => {
      sessionStorage.setItem(storageKey, container.scrollTop.toString());
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [activeNavItem, activeElementsNav, isElementsOrSections]);

  const sidebarWidth = isElementsOrSections ? 'w-56' : 'w-62';

  return (
    <aside className={cn('hidden md:flex', sidebarWidth, 'flex-col')}>
      <div className="flex flex-col h-screen sticky top-(--header-height)">
        {mainNavItems.length > 0 && (
          <div className="z-10">
            <nav className="py-3 px-2 space-y-1">
              {mainNavItems.map((navItem) => {
                const isActive = activeNavItem === navItem.id;
                const Icon = navItem.icon;

                return (
                  <Link
                    key={navItem.id}
                    href={navItem.href}
                    className={cn(
                      'flex border items-center gap-3 pl-0.5 pr-2 py-0.5 text-sm font-medium rounded-base',
                      isActive
                        ? 'border-background-700 text-foreground-200 bg-background-800/70'
                        : 'border-transparent text-foreground-400 hover:text-foreground-200 hover:bg-background-800/60'
                    )}
                  >
                    <div
                      className={cn(
                        'w-8 h-8 bg-background-700 rounded-base flex items-center justify-center',
                        isActive ? 'text-foreground-200' : 'text-foreground-400'
                      )}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <span>{navItem.label}</span>
                    {navItem.id === 'components-core' && (
                      <span
                        className={cn(
                          'ml-auto px-1 py-0.5 rounded-sm text-xs font-bold',
                          isActive
                            ? 'bg-accent-500/15 text-accent-400 border border-accent-500/20'
                            : 'border border-background-700 bg-background-800 text-foreground-300'
                        )}
                      >
                        {getTotalComponentCount()}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>
        )}

        <FadeContainer className="flex-1">
          <Scroll
            ref={scrollContainerRef}
            className="h-[calc(100vh-var(--header-height))]"
            maxHeight="100%"
          >
            {isElementsOrSections ? (
              <div className="py-5 px-5">
                <ElementsList
                  activeNav={activeElementsNav}
                  elements={elementsList}
                  pathname={pathname}
                  activeCategory={null}
                />
              </div>
            ) : (
              <div className="py-5 px-5 space-y-8">
                {sections.map((section) => (
                  <div key={section.label}>
                    <span className="text-sm text-foreground-400">{section.label}</span>
                    <div className="relative mt-2.5">
                      <div className="absolute left-0.5 top-0 bottom-0 w-px bg-background-600"></div>
                      <div className="space-y-1 pl-3">
                        {section.items.map((item) => {
                          const active = isNavItemActive(item.id, pathname, activeNavItem);
                          const href = getHrefForNavItem(activeNavItem, item.id);
                          return (
                            <SidebarItemLink
                              key={item.id}
                              href={href}
                              className={cn(
                                'block px-3 py-1.5 text-sm rounded-base cursor-pointer',
                                'transition-colors duration-300 ease-out',
                                'hover:duration-0',
                                active
                                  ? 'text-foreground-50 bg-background-800 font-medium'
                                  : cn('text-foreground-200', 'hover:text-foreground-200 hover:bg-background-800/50')
                              )}
                            >
                              {item.label}
                            </SidebarItemLink>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Scroll>
        </FadeContainer>
      </div>
    </aside>
  );
}
