'use client';

import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useMemo, memo, useState, type ReactNode } from 'react';
import { Divider, Scroll, Select } from 'ui-lab-components';
import { SiAstro, SiFlutter, SiReact, SiSvelte } from 'react-icons/si';
import { cn, usePrefetchOnHover } from '@/shared';
import { useSidebarToggle } from '@/features/layout/hooks/sidebar-context';
import {
  getActiveDomainForPathname,
  getActiveNavItemForDomain,
  getMainNavItemsForDomain,
} from '@/app/lib/sidebar-config';
import { getSectionsForNav, getHrefForNavItem, isNavItemActive } from '@/features/navigation/lib/sidebar-sections';
import { useDocsNavigationData } from '@/features/navigation/lib/docs-navigation-context';
import { getActiveElementsNavFromPathname } from '@/features/packages/lib/sidebar-sections';
import { ElementsList } from '@/features/packages/components/sidebar-content';
import { RiExpandUpDownFill } from "react-icons/ri";

type FrameworkOption = {
  value: 'react' | 'svelte' | 'astro' | 'flutter';
  label: string;
  icon: ReactNode;
};

const FRAMEWORK_STORAGE_KEY = 'ui-lab-selected-framework';
const FRAMEWORK_OPTIONS: FrameworkOption[] = [
  {
    value: 'react',
    label: 'React',
    icon: <SiReact className="aspect-square min-w-5 h-5 text-foreground-300" />,
  },
  {
    value: 'flutter',
    label: 'Flutter',
    icon: <SiFlutter className="aspect-square min-w-4.5 h-4.5 text-foreground-300" />,
  },
  {
    value: 'svelte',
    label: 'Svelte',
    icon: <SiSvelte className="aspect-square min-w-4.5 h-4.5 text-foreground-300" />,
  },
];

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
  const docsNavigationData = useDocsNavigationData();
  const pathname = usePathname();
  const [selectedFramework, setSelectedFramework] = useState<FrameworkOption['value']>('react');
  const activeDomain = getActiveDomainForPathname(pathname);
  const activeNavItem = getActiveNavItemForDomain(activeDomain);
  const mainNavItems = useMemo(() => getMainNavItemsForDomain(activeDomain), [activeDomain]);
  const sections = useMemo(() => {
    if (activeDomain === 'packages' || activeDomain === 'sections' || activeDomain === 'starters' || activeDomain === 'patterns') {
      return [];
    }
    return getSectionsForNav(activeNavItem, docsNavigationData);
  }, [activeDomain, activeNavItem, docsNavigationData]);

  const isElementsOrSectionsOrStarters = activeDomain === 'packages' || activeDomain === 'sections' || activeDomain === 'starters' || activeDomain === 'patterns';
  const activeElementsNav = useMemo(() => (isElementsOrSectionsOrStarters ? getActiveElementsNavFromPathname(pathname) : 'packages'), [isElementsOrSectionsOrStarters, pathname]);
  const scrollStorageKey = useMemo(
    () => (isElementsOrSectionsOrStarters ? `sidebar-scroll-${activeElementsNav}` : `sidebar-scroll-${activeNavItem}`),
    [activeElementsNav, activeNavItem, isElementsOrSectionsOrStarters]
  );
  const selectedFrameworkOption = useMemo(
    () => FRAMEWORK_OPTIONS.find((option) => option.value === selectedFramework) ?? FRAMEWORK_OPTIONS[0],
    [selectedFramework]
  );

  useEffect(() => {
    const storedFramework = window.localStorage.getItem(FRAMEWORK_STORAGE_KEY);
    if (!storedFramework) return;

    const matchingFramework = FRAMEWORK_OPTIONS.find((option) => option.value === storedFramework);
    if (matchingFramework) {
      setSelectedFramework(matchingFramework.value);
    }
  }, []);

  const handleFrameworkChange = (key: string | number | null) => {
    if (key === null) return;

    const value = String(key) as FrameworkOption['value'];
    setSelectedFramework(value);
    window.localStorage.setItem(FRAMEWORK_STORAGE_KEY, value);
  };

  const sidebarWidth = isElementsOrSectionsOrStarters ? 'w-80 md:w-64 lg:w-54 xl:w-64' : 'w-80 md:w-64 lg:w-50 xl:w-64';

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 lg:hidden"
          onClick={closeSidebar}
          onKeyDown={(e) => {
            if (e.key === 'Escape') closeSidebar();
          }}
          role="button"
          tabIndex={0}
        />
      )}

      <aside className={cn(
        sidebarWidth, 'flex flex-col',
        'fixed lg:static left-0 top-0 h-screen lg:h-auto',
        'z-[55] lg:z-20',
        'transition-transform duration-300 ease-out',
        'lg:transition-none lg:transform-none',
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      )}>
        <div className="flex border-r bg-background-950 border-background-700/40 flex-col h-screen lg:h-[calc(100vh-var(--header-height))] sticky top-0 lg:top-[var(--header-height)]">
          {false && <div className="px-2 pt-4">
            <Select
              selectedKey={selectedFramework}
              valueLabel={selectedFrameworkOption.label}
              onSelectionChange={handleFrameworkChange}
            >
              <Select.Trigger
                chevron={<RiExpandUpDownFill />}
                className="h-11">
                <Select.Value
                  placeholder="Choose a framework"
                  styles={{ root: "pl-1", icon: "w-5 h-5 mr-2" }}
                  icon={selectedFrameworkOption.icon}
                />
              </Select.Trigger>
              <Select.Content >
                <Select.List >
                  {FRAMEWORK_OPTIONS.map((option) => (
                    <Select.Item
                      key={option.value}
                      value={option.value}
                      textValue={option.label}
                      icon={option.icon}
                      styles={{ iconWrapper: "w-6 h-6" }}
                    >
                      {option.label}
                    </Select.Item>
                  ))}
                </Select.List>
              </Select.Content>
            </Select>
          </div>
          }

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
                        'flex border items-center py-2.5 px-4 gap-3 text-xs rounded-sm',
                        isActive
                          ? 'border-background-700 text-foreground-50 bg-background-800'
                          : 'border-transparent text-foreground-400 hover:text-foreground-200 hover:bg-background-800/60'
                      )}
                    >
                      {Icon && <div
                        className={cn(
                          '-ml-4 w-10 rounded-sm flex items-center justify-center',
                          isActive ? 'bg-transparent text-foreground-100' : 'text-foreground-400'
                        )}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      }
                      <span className='text-xs font-body-medium'>{navItem.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>
          )}

          <Scroll
            className="flex-1"
            maxHeight="100%"
            fade-y
            storageKey={scrollStorageKey}
          >
            {isElementsOrSectionsOrStarters ? (
              <div className="px-4 opacity-20 pointer-events-none">
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
                    <p className="text-xs font-body-semibold text-foreground-300">{section.label}</p>
                    <div className="relative mt-2.5">
                      <Divider orientation='vertical' size="sm" variant='dashed' spacing='none' className="absolute left-0.5 top-0 bottom-0 bg-foreground-400" />
                      <div className="pl-3">
                        {section.items.map((item) => {
                          const active = isNavItemActive(item.id, pathname, activeNavItem);
                          const href = getHrefForNavItem(activeNavItem, item.id);
                          return (
                            <SidebarItemLink
                              key={item.id}
                              href={href}
                              className={cn(
                                'block relative leading-body text-xs px-3 py-2 rounded-sm cursor-pointer',
                                'transition-colors duration-300 ease-out',
                                'hover:duration-0  hover:bg-background-800/50',
                                active
                                  ? 'text-foreground-100 font-medium after:content-[""] after:absolute after:-left-2.5 after:top-0 after:bg-foreground-400 after:w-0.5 after:h-full'
                                  : cn('text-foreground-400', 'hover:text-foreground-200')
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
