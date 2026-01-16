'use client';

import { useMemo, useState, useEffect } from 'react';
import { Fold } from 'ui-lab-components';
import { cn } from '@/shared';
import { SidebarItemLink } from '@/features/navigation';
import {
  StarterMetadata,
  StartersNav,
} from '../lib/starters-types';
import {
  getFeaturedStarters,
  getUniqueCategoriesByUseCase,
  getUniqueCategoriesByFramework,
  getUniqueCategoriesByFeatures,
  getStartersByUseCase,
  getStartersByFramework,
  getStartersByFeatures,
} from '../lib/starters-registry';

interface StartersSidebarContentProps {
  activeNav: StartersNav;
  pathname: string;
  starters: StarterMetadata[];
}

export function StartersSidebarContent({
  activeNav,
  pathname,
  starters,
}: StartersSidebarContentProps) {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  const currentStarterId = useMemo(() => {
    const match = pathname.match(/\/starters\/([^/?]+)/);
    return match ? match[1] : null;
  }, [pathname]);

  useEffect(() => {
    if (currentStarterId && currentStarterId !== 'all' &&
      currentStarterId !== 'use-case' && currentStarterId !== 'framework' &&
      currentStarterId !== 'features') {
      setExpandedCategories((prev) => new Set([...prev, currentStarterId]));
    }
  }, [currentStarterId]);

  if (activeNav === 'featured') {
    const featuredStarters = useMemo(() => getFeaturedStarters(starters), [starters]);

    if (featuredStarters.length === 0) {
      return (
        <div className="flex items-center justify-center h-64 px-6 text-center">
          <p className="text-foreground-400 text-sm">No featured starters yet</p>
        </div>
      );
    }

    return (
      <div className="space-y-2">
        <p className="text-xs text-foreground-500 uppercase tracking-wider mb-4">
          Featured Starters
        </p>
        {featuredStarters.map((starter) => (
          <SidebarItemLink
            key={starter.id}
            href={`/starters/${starter.id}`}
            className={cn(
              'flex flex-col gap-1 px-3 py-2 text-sm rounded-md cursor-pointer',
              'transition-colors duration-300 ease-out hover:duration-0',
              currentStarterId === starter.id
                ? 'text-foreground-50 bg-background-800 font-medium'
                : 'text-foreground-400 hover:text-foreground-200 hover:bg-background-800/50'
            )}
          >
            <span className="font-medium">{starter.name}</span>
            <span className="text-xs text-foreground-500">{starter.description}</span>
          </SidebarItemLink>
        ))}
      </div>
    );
  }

  if (activeNav === 'all') {
    const sortedStarters = useMemo(
      () => [...starters].sort((a, b) => a.name.localeCompare(b.name)),
      [starters]
    );

    if (sortedStarters.length === 0) {
      return (
        <div className="flex items-center justify-center h-64 px-6 text-center">
          <p className="text-foreground-400 text-sm">No starters available yet</p>
        </div>
      );
    }

    return (
      <div className="space-y-2">
        <p className="text-xs text-foreground-500 uppercase tracking-wider mb-4">
          All Starters
        </p>
        {sortedStarters.map((starter) => (
          <SidebarItemLink
            key={starter.id}
            href={`/starters/${starter.id}`}
            className={cn(
              'flex flex-col gap-1 px-3 py-2 text-sm rounded-md cursor-pointer',
              'transition-colors duration-300 ease-out hover:duration-0',
              currentStarterId === starter.id
                ? 'text-foreground-50 bg-background-800 font-medium'
                : 'text-foreground-400 hover:text-foreground-200 hover:bg-background-800/50'
            )}
          >
            <span className="font-medium">{starter.name}</span>
          </SidebarItemLink>
        ))}
      </div>
    );
  }

  if (activeNav === 'use-case') {
    const categories = useMemo(
      () => getUniqueCategoriesByUseCase(starters),
      [starters]
    );

    if (categories.length === 0) {
      return (
        <div className="flex items-center justify-center h-64 px-6 text-center">
          <p className="text-foreground-400 text-sm">No use cases available yet</p>
        </div>
      );
    }

    return (
      <div className="space-y-2">
        <p className="text-xs text-foreground-500 uppercase tracking-wider mb-4">
          Use Cases
        </p>
        {categories.map((category) => {
          const categoryStarters = getStartersByUseCase(category.id, starters);
          const isExpanded = expandedCategories.has(category.id);

          return (
            <Fold
              key={category.id}
              isExpanded={isExpanded}
              onExpandedChange={(expanded) => {
                setExpandedCategories((prev) => {
                  const next = new Set(prev);
                  if (expanded) next.add(category.id);
                  else next.delete(category.id);
                  return next;
                });
              }}
              className="rounded-md"
              style={{
                '--fold-trigger-foreground': isExpanded
                  ? 'var(--foreground-200)'
                  : 'var(--foreground-400)',
                '--fold-trigger-background-hover': 'rgb(55 65 81 / 0.5)',
              } as React.CSSProperties}
            >
              <Fold.Trigger className="text-sm">
                <span>{category.label}</span>
                <span className="text-xs text-foreground-500">{category.count}</span>
              </Fold.Trigger>
              <Fold.Content className="pl-3">
                <div className="space-y-0.5 mt-1">
                  {categoryStarters.map((starter) => (
                    <SidebarItemLink
                      key={starter.id}
                      href={`/starters/${starter.id}`}
                      className={cn(
                        'block px-3 py-2 text-sm rounded-md cursor-pointer',
                        'transition-colors duration-300 ease-out hover:duration-0',
                        currentStarterId === starter.id
                          ? 'text-foreground-50 bg-background-800 font-medium'
                          : 'text-foreground-500 hover:text-foreground-300 hover:bg-background-800/50'
                      )}
                    >
                      {starter.name}
                    </SidebarItemLink>
                  ))}
                </div>
              </Fold.Content>
            </Fold>
          );
        })}
      </div>
    );
  }

  if (activeNav === 'framework') {
    const categories = useMemo(
      () => getUniqueCategoriesByFramework(starters),
      [starters]
    );

    if (categories.length === 0) {
      return (
        <div className="flex items-center justify-center h-64 px-6 text-center">
          <p className="text-foreground-400 text-sm">No frameworks available yet</p>
        </div>
      );
    }

    return (
      <div className="space-y-2">
        <p className="text-xs text-foreground-500 uppercase tracking-wider mb-4">
          Frameworks
        </p>
        {categories.map((category) => {
          const categoryStarters = getStartersByFramework(category.id, starters);
          const isExpanded = expandedCategories.has(category.id);

          return (
            <Fold
              key={category.id}
              isExpanded={isExpanded}
              onExpandedChange={(expanded) => {
                setExpandedCategories((prev) => {
                  const next = new Set(prev);
                  if (expanded) next.add(category.id);
                  else next.delete(category.id);
                  return next;
                });
              }}
              className="rounded-md"
              style={{
                '--fold-trigger-foreground': isExpanded
                  ? 'var(--foreground-200)'
                  : 'var(--foreground-400)',
                '--fold-trigger-background-hover': 'rgb(55 65 81 / 0.5)',
              } as React.CSSProperties}
            >
              <Fold.Trigger className="text-sm">
                <span>{category.label}</span>
                <span className="text-xs text-foreground-500">{category.count}</span>
              </Fold.Trigger>
              <Fold.Content className="pl-3">
                <div className="space-y-0.5 mt-1">
                  {categoryStarters.map((starter) => (
                    <SidebarItemLink
                      key={starter.id}
                      href={`/starters/${starter.id}`}
                      className={cn(
                        'block px-3 py-2 text-sm rounded-md cursor-pointer',
                        'transition-colors duration-300 ease-out hover:duration-0',
                        currentStarterId === starter.id
                          ? 'text-foreground-50 bg-background-800 font-medium'
                          : 'text-foreground-500 hover:text-foreground-300 hover:bg-background-800/50'
                      )}
                    >
                      {starter.name}
                    </SidebarItemLink>
                  ))}
                </div>
              </Fold.Content>
            </Fold>
          );
        })}
      </div>
    );
  }

  if (activeNav === 'features') {
    const categories = useMemo(
      () => getUniqueCategoriesByFeatures(starters),
      [starters]
    );

    if (categories.length === 0) {
      return (
        <div className="flex items-center justify-center h-64 px-6 text-center">
          <p className="text-foreground-400 text-sm">No features available yet</p>
        </div>
      );
    }

    return (
      <div className="space-y-2">
        <p className="text-xs text-foreground-500 uppercase tracking-wider mb-4">
          Features
        </p>
        {categories.map((category) => {
          const categoryStarters = getStartersByFeatures(category.id, starters);
          const isExpanded = expandedCategories.has(category.id);

          return (
            <Fold
              key={category.id}
              isExpanded={isExpanded}
              onExpandedChange={(expanded) => {
                setExpandedCategories((prev) => {
                  const next = new Set(prev);
                  if (expanded) next.add(category.id);
                  else next.delete(category.id);
                  return next;
                });
              }}
              className="rounded-md"
            >
              <Fold.Trigger className="text-sm">
                <span>{category.label}</span>
                <span className="text-xs text-foreground-500">{category.count}</span>
              </Fold.Trigger>
              <Fold.Content className="pl-3">
                <div className="space-y-0.5 mt-1">
                  {categoryStarters.map((starter) => (
                    <SidebarItemLink
                      key={starter.id}
                      href={`/starters/${starter.id}`}
                      className={cn(
                        'block px-3 py-2 text-sm rounded-md cursor-pointer',
                        'transition-colors duration-300 ease-out hover:duration-0',
                        currentStarterId === starter.id
                          ? 'text-foreground-50 bg-background-800 font-medium'
                          : 'text-foreground-500 hover:text-foreground-300 hover:bg-background-800/50'
                      )}
                    >
                      {starter.name}
                    </SidebarItemLink>
                  ))}
                </div>
              </Fold.Content>
            </Fold>
          );
        })}
      </div>
    );
  }

  return null;
}
