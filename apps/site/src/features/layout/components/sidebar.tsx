'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useRef, useMemo, memo } from 'react';
import { Scroll } from 'ui-lab-components';
import { cn, usePrefetchOnHover } from '@/shared';
import { useSidebarToggle } from '@/features/layout/hooks/sidebar-context';
import {
  getActiveDomainForPathname,
  getActiveNavItemForDomain,
  getMainNavItemsForDomain,
} from '@/app/lib/sidebar-config';
import { getSectionsForNav, getHrefForNavItem, isNavItemActive } from '@/features/navigation/lib/sidebar-sections';
import { getActiveElementsNavFromPathname } from '@/features/packages/lib/sidebar-sections';
import { ElementsList } from '@/features/packages/components/elements-sidebar-content';

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
      <p
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
      </p>
    </>
  );
});

export function Sidebar() {
  const { isOpen, closeSidebar } = useSidebarToggle();
  const pathname = usePathname();
  const activeDomain = getActiveDomainForPathname(pathname);
  const activeNavItem = getActiveNavItemForDomain(activeDomain);
  const mainNavItems = useMemo(() => getMainNavItemsForDomain(activeDomain), [activeDomain]);
  const sections = useMemo(() => {
    if (activeDomain === 'packages' || activeDomain === 'sections' || activeDomain === 'starters' || activeDomain === 'patterns') {
      return [];
    }
    return getSectionsForNav(activeNavItem);
  }, [activeDomain, activeNavItem]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const isElementsOrSectionsOrStarters = activeDomain === 'packages' || activeDomain === 'sections' || activeDomain === 'starters' || activeDomain === 'patterns';
  const activeElementsNav = useMemo(() => (isElementsOrSectionsOrStarters ? getActiveElementsNavFromPathname(pathname) : 'packages'), [isElementsOrSectionsOrStarters, pathname]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const storageKey = isElementsOrSectionsOrStarters ? `sidebar-scroll-${activeElementsNav}` : `sidebar-scroll-${activeNavItem}`;
    const savedPosition = sessionStorage.getItem(storageKey);
    if (savedPosition) {
      container.scrollTop = parseInt(savedPosition, 10);
    }

    const handleScroll = () => {
      sessionStorage.setItem(storageKey, container.scrollTop.toString());
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, [activeNavItem, activeElementsNav, isElementsOrSectionsOrStarters]);

  const sidebarWidth = isElementsOrSectionsOrStarters ? 'w-80 md:w-64 lg:w-54 xl:w-64' : 'w-80 md:w-64 lg:w-50 xl:w-64';

  return (
    <>
      {isOpen && <div className="fixed inset-0 bg-black/50 z-50 lg:hidden" onClick={closeSidebar} />}

      <aside className={cn(
        sidebarWidth, 'flex flex-col',
        'fixed lg:static left-0 top-0 h-screen lg:h-auto',
        'z-[55] lg:z-20',
        'transition-transform duration-300 ease-out',
        'lg:transition-none lg:transform-none',
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      )}>
        <div className="flex border-r bg-background-950 border-background-700 flex-col h-screen lg:h-[calc(100vh-var(--header-height))] sticky top-0 lg:top-[var(--header-height)]">
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
                        'flex border items-center gap-3 pl-0.5 pr-2 py-0.5 text-xs rounded-sm',
                        isActive
                          ? 'border-background-700 text-foreground-50 bg-background-800'
                          : 'border-transparent text-foreground-400 hover:text-foreground-200 hover:bg-background-800/60'
                      )}
                    >
                      <div
                        className={cn(
                          'w-10 h-10 bg-background-800 border border-background-700 rounded-sm flex items-center justify-center',
                          isActive ? 'bg-transparent text-foreground-50' : 'text-foreground-300'
                        )}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className='font-semibold'>{navItem.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>
          )}

          <Scroll
            ref={scrollContainerRef}
            className="flex-1"
            maxHeight="100%"
            fadeY
          >
            {isElementsOrSectionsOrStarters ? (
              <div className="px-4">
                <ElementsList
                  activeNav={activeElementsNav}
                  pathname={pathname}
                  activeCategory={null}
                />
              </div>
            ) : (
              <div className="py-4 px-5 space-y-8">
                {sections.map((section) => (
                  <div key={section.label}>
                    <h5 className="text-xs font-semibold text-foreground-300">{section.label}</h5>
                    <div className="relative mt-2.5">
                      <div className="absolute left-0.5 top-0 bottom-0 w-px bg-background-600"></div>
                      <div className="pl-3">
                        {section.items.map((item) => {
                          const active = isNavItemActive(item.id, pathname, activeNavItem);
                          const href = getHrefForNavItem(activeNavItem, item.id);
                          return (
                            <SidebarItemLink
                              key={item.id}
                              href={href}
                              className={cn(
                                'block px-3 py-2 text-xs rounded-sm cursor-pointer',
                                'transition-colors duration-300 ease-out',
                                'hover:duration-0',
                                active
                                  ? 'text-foreground-50 bg-background-800'
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
        </div>
      </aside>
    </>
  );
}
