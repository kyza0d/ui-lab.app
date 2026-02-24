'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Expand } from 'ui-lab-components';
import { cn } from '@/shared';
import { SidebarItemLink } from '@/features/navigation';
import {
  getAllSections,
  getAllStarters,
  getSectionsInCategory,
  getAllPackages,
  getElementsInPackage,
  elementRegistry,
  getAllPatternCategories,
  getPatternsByCategory,
  type ElementCategoryId,
  type SectionCategoryId,
} from 'ui-lab-registry';

interface ElementsSidebarContentProps {
  activeNav: 'packages' | 'sections' | 'starters' | 'patterns';
  pathname: string;
  activeCategory?: ElementCategoryId | SectionCategoryId | null;
}

const NAV_LINK_BASE = 'block px-3 py-1.5 text-xs rounded-sm cursor-pointer transition-colors duration-300 ease-out hover:duration-0';
const LINK_ACTIVE = 'text-foreground-50 bg-background-800 font-medium';
const LINK_INACTIVE = 'text-foreground-200 hover:text-foreground-200 hover:bg-background-800/50';

function NavLink({ href, isActive, children }: { href: string; isActive: boolean; children: React.ReactNode }) {
  return (
    <SidebarItemLink href={href} className={cn(NAV_LINK_BASE, isActive ? LINK_ACTIVE : LINK_INACTIVE)}>
      {children}
    </SidebarItemLink>
  );
}

function ExpandGroup({
  name, isExpanded, onToggle, triggerBold, children,
}: {
  name: string;
  isExpanded: boolean;
  onToggle: (expanded: boolean) => void;
  triggerBold?: boolean;
  children: React.ReactNode;
}) {
  return (
    <Expand isExpanded={isExpanded} onExpandedChange={onToggle} className="rounded-sm">
      <Expand.Trigger className="text-xs" title={<span className={triggerBold ? 'font-medium' : undefined}>{name}</span>} />
      <Expand.Content className="pl-3">
        <div className="space-y-0.5 mt-1">{children}</div>
      </Expand.Content>
    </Expand>
  );
}

export function ElementsList({
  activeNav,
  pathname,
  activeCategory,
}: ElementsSidebarContentProps) {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const searchParams = useSearchParams();
  const currentVariant = searchParams.get('variant');

  const toggleItem = useCallback((id: string) => (expanded: boolean) => {
    setExpandedItems(prev => {
      const next = new Set(prev);
      if (expanded) next.add(id); else next.delete(id);
      return next;
    });
  }, []);

  const currentItemId = useMemo(() => {
    if (activeNav === 'sections') {
      const match = pathname.match(/\/sections\/([^/?]+)/);
      return match ? match[1] : null;
    }
    if (activeNav === 'starters') {
      const match = pathname.match(/\/starters\/([^/?]+)/);
      return match ? match[1] : null;
    }
    if (activeNav === 'patterns') {
      const match = pathname.match(/\/patterns\/([^/?]+)/);
      return match ? match[1] : null;
    }
    const match = pathname.match(/\/elements\/([^/?]+)/);
    return match ? match[1] : null;
  }, [pathname, activeNav]);

  const currentPackageId = useMemo(() => {
    if (activeNav !== 'packages') return null;
    const match = pathname.match(/\/elements\/([^/?]+)/);
    return match ? match[1] : null;
  }, [pathname, activeNav]);

  const currentElementId = useMemo(() => {
    if (activeNav !== 'packages') return null;
    const match = pathname.match(/\/elements\/[^/?]+\/([^/?]+)/);
    return match ? match[1] : null;
  }, [pathname, activeNav]);

  const isOnPackageRoute = useMemo(() => {
    return activeNav === 'packages' && currentPackageId !== null;
  }, [activeNav, currentPackageId]);

  useEffect(() => {
    if (currentItemId) setExpandedItems(prev => new Set([...prev, currentItemId]));
    if (currentElementId) setExpandedItems(prev => new Set([...prev, currentElementId]));
    if (currentPackageId && activeNav === 'packages') setExpandedItems(prev => new Set([...prev, currentPackageId]));
  }, [currentItemId, currentElementId, currentPackageId, activeNav]);

  const sections = useMemo(() => getAllSections(), []);
  const starters = useMemo(() => getAllStarters(), []);

  const sortedSections = useMemo(() => {
    const filtered = activeCategory ? getSectionsInCategory(sections, activeCategory as SectionCategoryId) : sections;
    return [...filtered].sort((a, b) => a.name.localeCompare(b.name));
  }, [sections, activeCategory]);

  const sortedStarters = useMemo(
    () => [...starters].sort((a, b) => a.name.localeCompare(b.name)),
    [starters]
  );

  const packages = useMemo(() => getAllPackages(), []);
  const packageElements = useMemo(() => {
    if (!currentPackageId) return [];
    return getElementsInPackage(currentPackageId).map(id => elementRegistry[id]).filter(Boolean);
  }, [currentPackageId]);

  if (activeNav === 'packages' && !isOnPackageRoute) {
    return (
      <div className="space-y-1 pt-2">
        {packages.map((pkg) => {
          const pkgElements = getElementsInPackage(pkg.id).map(id => elementRegistry[id]).filter(Boolean);
          const href = `/packages/${pkg.id}`;

          if (pkgElements.length === 0) {
            return <NavLink key={pkg.id} href={href} isActive={currentPackageId === pkg.id}>{pkg.name}</NavLink>;
          }

          return (
            <div key={pkg.id}>
              <ExpandGroup
                name={pkg.name}
                isExpanded={expandedItems.has(pkg.id)}
                onToggle={toggleItem(pkg.id)}
                triggerBold
              >
                {pkgElements.map((element) => (
                  <SidebarItemLink
                    key={element.id}
                    href={`/packages/${pkg.id}/${element.id}`}
                    className={cn(
                      'block last:mb-6 px-2 py-2 font-medium text-xs rounded-sm cursor-pointer transition-colors',
                      currentElementId === element.id
                        ? 'text-foreground-50 bg-background-800 font-medium'
                        : 'text-foreground-300 hover:text-foreground-300 hover:bg-background-800/50'
                    )}
                  >
                    {element.name}
                  </SidebarItemLink>
                ))}
              </ExpandGroup>
            </div>
          );
        })}
      </div>
    );
  }

  if (activeNav === 'packages' && isOnPackageRoute) {
    if (packageElements.length === 0) {
      return (
        <div className="flex items-center justify-center h-full px-6 text-center">
          <p className="text-foreground-400 text-xs">No elements in this package yet.</p>
        </div>
      );
    }

    return (
      <div className="space-y-1">
        {packageElements.map((element) => {
          const isActive = currentElementId === element.id;
          const href = `/packages/${currentPackageId}/${element.id}`;

          if (element.variants.length === 0) {
            return <NavLink key={element.id} href={href} isActive={isActive}>{element.name}</NavLink>;
          }

          return (
            <ExpandGroup
              key={element.id}
              name={element.name}
              isExpanded={expandedItems.has(element.id)}
              onToggle={toggleItem(element.id)}
            >
              {element.variants.map((variant, i) => {
                const variantId = variant.demoPath || `variant-${i}`;
                const isVariantActive = isActive && currentVariant === variantId;
                return (
                  <SidebarItemLink
                    key={`${element.id}-${i}`}
                    href={`${href}?variant=${variantId}`}
                    className={cn(
                      'block py-2 text-xs rounded-sm cursor-pointer transition-colors',
                      isVariantActive
                        ? 'text-foreground-200 bg-background-800 font-medium'
                        : 'text-foreground-300 hover:text-foreground-200 hover:bg-background-800/50'
                    )}
                  >
                    {variant.name}
                  </SidebarItemLink>
                );
              })}
            </ExpandGroup>
          );
        })}
      </div>
    );
  }

  if (activeNav === 'starters') {
    if (sortedStarters.length === 0) {
      return (
        <div className="flex items-center justify-center h-full px-6 text-center">
          <p className="text-foreground-400 text-xs">No starters available yet.</p>
        </div>
      );
    }

    return (
      <div className="space-y-1">
        {sortedStarters.map((starter) => (
          <NavLink key={starter.id} href={`/starters/${starter.id}`} isActive={currentItemId === starter.id}>
            {starter.name}
          </NavLink>
        ))}
      </div>
    );
  }

  if (activeNav === 'patterns') {
    const patternCategories = getAllPatternCategories();

    return (
      <div className="space-y-4 pt-2">
        {patternCategories.map((category) => {
          const patterns = getPatternsByCategory(category);
          return (
            <div key={category} className='not-first:mt-8'>
              <p className="mb-1 text-xs font-semibold text-foreground-200 capitalize">{category}</p>
              <div className="space-y-0.5">
                {patterns.map((pattern) => {
                  const href = `/patterns/${pattern.id}`;

                  if (!pattern.variations || pattern.variations.length === 0) {
                    return (
                      <NavLink key={pattern.id} href={href} isActive={currentItemId === pattern.id}>
                        {pattern.name}
                      </NavLink>
                    );
                  }

                  return (
                    <ExpandGroup
                      key={pattern.id}
                      name={pattern.name}
                      isExpanded={expandedItems.has(pattern.id)}
                      onToggle={toggleItem(pattern.id)}
                    >
                      {(pattern.variations ?? []).map((variation, i) => (
                        <SidebarItemLink
                          key={`${pattern.id}-${i}`}
                          href={href}
                          className="block last:mb-6 px-2 py-2 text-xs rounded-sm cursor-pointer transition-colors text-foreground-200 hover:text-foreground-300 hover:bg-background-800/50"
                        >
                          {variation.name}
                        </SidebarItemLink>
                      ))}
                    </ExpandGroup>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  if (activeNav === 'sections') {
    if (sortedSections.length === 0) {
      return (
        <div className="flex items-center justify-center h-full px-6 text-center">
          <p className="text-foreground-400 text-xs">No sections in this category yet.</p>
        </div>
      );
    }

    return (
      <div className="space-y-1">
        {sortedSections.map((section) => {
          const href = `/sections/${section.id}`;

          if (section.variants.length === 0) {
            return <NavLink key={section.id} href={href} isActive={currentItemId === section.id}>{section.name}</NavLink>;
          }

          return (
            <ExpandGroup
              key={section.id}
              name={section.name}
              isExpanded={expandedItems.has(section.id)}
              onToggle={toggleItem(section.id)}
            >
              {section.variants.map((variant, i) => (
                <SidebarItemLink
                  key={`${section.id}-${i}`}
                  href={href}
                  className="block last:mb-6 px-2 py-2 text-xs rounded-sm cursor-pointer transition-colors text-foreground-200 hover:text-foreground-300 hover:bg-background-800/50"
                >
                  {variant.name}
                </SidebarItemLink>
              ))}
            </ExpandGroup>
          );
        })}
      </div>
    );
  }

  return null;
}
