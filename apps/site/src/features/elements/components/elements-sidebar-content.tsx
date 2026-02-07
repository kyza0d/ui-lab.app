'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Fold } from 'ui-lab-components';
import { cn } from '@/shared';
import { SidebarItemLink } from '@/features/navigation';
import {
  getElementsInCategory,
  getAllSections,
  getAllStarters,
  getSectionsInCategory,
  getAllPackages,
  getElementsInPackage,
  elementRegistry,
  type ElementMetadata,
  type SectionMetadata,
  type StarterMetadata,
  type ElementCategoryId,
  type SectionCategoryId,
} from 'ui-lab-registry';

interface ElementsSidebarContentProps {
  activeNav: 'elements' | 'sections' | 'starters';
  elements: ElementMetadata[];
  pathname: string;
  activeCategory?: ElementCategoryId | SectionCategoryId | null;
}

export function ElementsList({
  activeNav,
  elements,
  pathname,
  activeCategory,
}: ElementsSidebarContentProps) {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const searchParams = useSearchParams();
  const currentVariant = searchParams.get('variant');

  const currentItemId = useMemo(() => {
    if (activeNav === 'sections') {
      const match = pathname.match(/\/sections\/([^/?]+)/);
      return match ? match[1] : null;
    }
    if (activeNav === 'starters') {
      const match = pathname.match(/\/starters\/([^/?]+)/);
      return match ? match[1] : null;
    }
    const match = pathname.match(/\/elements\/([^/?]+)/);
    return match ? match[1] : null;
  }, [pathname, activeNav]);

  const currentPackageId = useMemo(() => {
    if (activeNav !== 'elements') return null;
    const match = pathname.match(/\/elements\/([^/?]+)/);
    return match ? match[1] : null;
  }, [pathname, activeNav]);

  const currentElementId = useMemo(() => {
    if (activeNav !== 'elements') return null;
    const match = pathname.match(/\/elements\/[^/?]+\/([^/?]+)/);
    return match ? match[1] : null;
  }, [pathname, activeNav]);

  const isOnPackageRoute = useMemo(() => {
    return activeNav === 'elements' && currentPackageId !== null;
  }, [activeNav, currentPackageId]);

  useEffect(() => {
    if (currentItemId) {
      setExpandedItems((prev) => new Set([...prev, currentItemId]));
    }
    if (currentElementId) {
      setExpandedItems((prev) => new Set([...prev, currentElementId]));
    }
    if (currentPackageId && activeNav === 'elements') {
      setExpandedItems((prev) => new Set([...prev, currentPackageId]));
    }
  }, [currentItemId, currentElementId, currentPackageId, activeNav]);

  const sections = useMemo(() => getAllSections(), []);
  const starters = useMemo(() => getAllStarters(), []);

  const filteredSections = useMemo(() => {
    if (!activeCategory) return sections;
    return getSectionsInCategory(sections, activeCategory as SectionCategoryId);
  }, [sections, activeCategory]);

  const sortedSections = useMemo(
    () => [...filteredSections].sort((a, b) => a.name.localeCompare(b.name)),
    [filteredSections]
  );

  const filteredElements = useMemo(() => {
    if (!activeCategory) return elements;
    return getElementsInCategory(elements, activeCategory as ElementCategoryId);
  }, [elements, activeCategory]);

  const sortedElements = useMemo(
    () => [...filteredElements].sort((a, b) => a.name.localeCompare(b.name)),
    [filteredElements]
  );

  const sortedStarters = useMemo(
    () => [...starters].sort((a, b) => a.name.localeCompare(b.name)),
    [starters]
  );

  const packages = useMemo(() => getAllPackages(), []);
  const packageElements = useMemo(() => {
    if (!currentPackageId) return [];
    const elementIds = getElementsInPackage(currentPackageId);
    return elementIds.map(id => elementRegistry[id]).filter(Boolean);
  }, [currentPackageId]);

  if (activeNav === 'elements' && !isOnPackageRoute) {
    return (
      <div className="space-y-1">
        {packages.map((pkg) => {
          const isActive = currentPackageId === pkg.id;
          const href = `/elements/${pkg.id}`;
          const pkgElementIds = getElementsInPackage(pkg.id);
          const pkgElements = pkgElementIds.map(id => elementRegistry[id]).filter(Boolean);

          if (pkgElements.length === 0) {
            return (
              <SidebarItemLink
                key={pkg.id}
                href={href}
                className={cn(
                  'block px-3 py-1.5 text-sm rounded-md cursor-pointer capitalize',
                  'transition-colors duration-300 ease-out hover:duration-0',
                  isActive
                    ? 'text-foreground-50 bg-background-800 font-medium'
                    : 'text-foreground-400 hover:text-foreground-200 hover:bg-background-800/50'
                )}
              >
                {pkg.name}
              </SidebarItemLink>
            );
          }

          const isExpanded = expandedItems.has(pkg.id);

          return (
            <Fold
              key={pkg.id}
              isExpanded={isExpanded}
              onExpandedChange={(expanded) => {
                setExpandedItems((prev) => {
                  const next = new Set(prev);
                  if (expanded) next.add(pkg.id);
                  else next.delete(pkg.id);
                  return next;
                });
              }}
              className="rounded-md"
            >
              <Fold.Trigger className="text-sm  capitalize">
                <span className='font-medium'>{pkg.name}</span>
              </Fold.Trigger>
              <Fold.Content className="pl-3">
                <div className="mt-1">
                  {pkgElements.map((element) => {
                    const elementHref = `/elements/${pkg.id}/${element.id}`;
                    const isElementActive = currentElementId === element.id;

                    return (
                      <SidebarItemLink
                        key={element.id}
                        href={elementHref}
                        className={cn(
                          'block px-3 py-2 font-medium text-sm rounded-md cursor-pointer capitalize transition-colors',
                          isElementActive
                            ? 'text-foreground-50 bg-background-800 font-medium'
                            : 'text-foreground-300 hover:text-foreground-300 hover:bg-background-800/50'
                        )}
                      >
                        {element.name}
                      </SidebarItemLink>
                    );
                  })}
                </div>
              </Fold.Content>
            </Fold>
          );
        })}
      </div>
    );
  }

  if (activeNav === 'elements' && isOnPackageRoute) {
    if (packageElements.length === 0) {
      return (
        <div className="flex items-center justify-center h-full px-6 text-center">
          <p className="text-foreground-400 text-sm">
            No elements in this package yet.
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-1">
        {packageElements.map((element) => {
          const isActive = currentElementId === element.id;
          const href = `/elements/${currentPackageId}/${element.id}`;

          if (element.variants.length === 0) {
            return (
              <SidebarItemLink
                key={element.id}
                href={href}
                className={cn(
                  'block px-3 py-1.5 text-sm rounded-md cursor-pointer capitalize',
                  'transition-colors duration-300 ease-out hover:duration-0',
                  isActive
                    ? 'text-foreground-50 bg-background-800 font-medium'
                    : 'text-foreground-400 hover:text-foreground-200 hover:bg-background-800/50'
                )}
              >
                {element.name}
              </SidebarItemLink>
            );
          }

          const isExpanded = expandedItems.has(element.id);

          return (
            <Fold
              key={element.id}
              isExpanded={isExpanded}
              onExpandedChange={(expanded) => {
                setExpandedItems((prev) => {
                  const next = new Set(prev);
                  if (expanded) next.add(element.id);
                  else next.delete(element.id);
                  return next;
                });
              }}
              className="rounded-md"
            >
              <Fold.Trigger className="text-sm capitalize">
                <span>{element.name}</span>
              </Fold.Trigger>
              <Fold.Content className="pl-3">
                <div className="space-y-0.5 mt-1">
                  {element.variants.map((variant, index) => {
                    const variantId = variant.demoPath || `variant-${index}`;
                    const variantHref = `${href}?variant=${variantId}`;
                    const isVariantActive = isActive && currentVariant === variantId;

                    return (
                      <SidebarItemLink
                        key={`${element.id}-${index}`}
                        href={variantHref}
                        className={cn(
                          'block px-3 py-2 text-sm rounded-md cursor-pointer transition-colors',
                          isVariantActive
                            ? 'text-foreground-50 bg-background-800 font-medium'
                            : 'text-foreground-300 hover:text-foreground-200 hover:bg-background-800/50'
                        )}
                      >
                        {variant.name}
                      </SidebarItemLink>
                    );
                  })}
                </div>
              </Fold.Content>
            </Fold>
          );
        })}
      </div>
    );
  }

  if (activeNav === 'starters') {
    if (sortedStarters.length === 0) {
      return (
        <div className="flex items-center justify-center h-full px-6 text-center">
          <p className="text-foreground-400 text-sm">
            No starters available yet.
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-1">
        {sortedStarters.map((starter) => {
          const isActive = currentItemId === starter.id;
          const href = `/starters/${starter.id}`;

          return (
            <SidebarItemLink
              key={starter.id}
              href={href}
              className={cn(
                'block px-3 py-1.5 text-sm rounded-md cursor-pointer capitalize',
                'transition-colors duration-300 ease-out hover:duration-0',
                isActive
                  ? 'text-foreground-50 bg-background-800 font-medium'
                  : 'text-foreground-400 hover:text-foreground-200 hover:bg-background-800/50'
              )}
            >
              {starter.name}
            </SidebarItemLink>
          );
        })}
      </div>
    );
  }

  if (activeNav === 'sections') {
    if (sortedSections.length === 0) {
      return (
        <div className="flex items-center justify-center h-full px-6 text-center">
          <p className="text-foreground-400 text-sm">
            No sections in this category yet.
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-1">
        {sortedSections.map((section) => {
          const isActive = currentItemId === section.id;
          const href = `/sections/${section.id}`;

          if (section.variants.length === 0) {
            return (
              <SidebarItemLink
                key={section.id}
                href={href}
                className={cn(
                  'block px-3 py-1.5 text-sm rounded-md cursor-pointer capitalize',
                  'transition-colors duration-300 ease-out hover:duration-0',
                  isActive
                    ? 'text-foreground-50 bg-background-800 font-medium'
                    : 'text-foreground-400 hover:text-foreground-200 hover:bg-background-800/50'
                )}
              >
                {section.name}
              </SidebarItemLink>
            );
          }

          const isExpanded = expandedItems.has(section.id);

          return (
            <Fold
              key={section.id}
              isExpanded={isExpanded}
              onExpandedChange={(expanded) => {
                setExpandedItems((prev) => {
                  const next = new Set(prev);
                  if (expanded) next.add(section.id);
                  else next.delete(section.id);
                  return next;
                });
              }}
              className="rounded-md"
            >
              <Fold.Trigger className="text-sm capitalize">
                <span>{section.name}</span>
              </Fold.Trigger>
              <Fold.Content className="pl-3">
                <div className="space-y-0.5 mt-1">
                  {section.variants.map((variant, index) => (
                    <SidebarItemLink
                      key={`${section.id}-${index}`}
                      href={href}
                      className="block px-3 py-2 text-sm rounded-md cursor-pointer transition-colors text-foreground-200 hover:text-foreground-300 hover:bg-background-800/50"
                    >
                      {variant.name}
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
