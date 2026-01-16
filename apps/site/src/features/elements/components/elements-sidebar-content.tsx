'use client';

import { useEffect, useMemo, useState } from 'react';
import { Fold } from 'ui-lab-components';
import { cn } from '@/shared';
import { SidebarItemLink } from '@/features/navigation';
import {
  getElementsInCategory,
  type ElementMetadata,
  type ElementCategoryId,
} from 'ui-lab-registry';

interface ElementsSidebarContentProps {
  activeNav: 'elements' | 'sections';
  elements: ElementMetadata[];
  pathname: string;
  activeCategory?: ElementCategoryId | null;
}

export function ElementsList({
  activeNav,
  elements,
  pathname,
  activeCategory,
}: ElementsSidebarContentProps) {
  const [expandedElements, setExpandedElements] = useState<Set<string>>(new Set());

  const currentElementId = useMemo(() => {
    const match = pathname.match(/\/elements\/([^/?]+)/);
    return match ? match[1] : null;
  }, [pathname]);

  useEffect(() => {
    if (currentElementId) {
      setExpandedElements((prev) => new Set([...prev, currentElementId]));
    }
  }, [currentElementId]);

  const filteredElements = useMemo(() => {
    if (!activeCategory) return elements;
    return getElementsInCategory(elements, activeCategory);
  }, [elements, activeCategory]);

  const sortedElements = useMemo(
    () => [...filteredElements].sort((a, b) => a.name.localeCompare(b.name)),
    [filteredElements]
  );

  if (activeNav === 'sections') {
    return (
      <div className="flex items-center justify-center h-full px-6 text-center">
        <p className="text-foreground-400 text-sm">Sections coming soon</p>
      </div>
    );
  }

  if (sortedElements.length === 0) {
    return (
      <div className="flex items-center justify-center h-full px-6 text-center">
        <p className="text-foreground-400 text-sm">
          No elements in this category yet.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {sortedElements.map((element) => {
        const isActive = currentElementId === element.id;
        const href = `/elements/${element.id}`;

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

        const isExpanded = expandedElements.has(element.id);

        return (
          <Fold
            key={element.id}
            isExpanded={isExpanded}
            onExpandedChange={(expanded) => {
              setExpandedElements((prev) => {
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
                {element.variants.map((variant, index) => (
                  <SidebarItemLink
                    key={`${element.id}-${index}`}
                    href={href}
                    className="block px-3 py-2 text-sm rounded-md cursor-pointer transition-colors text-foreground-500 hover:text-foreground-300 hover:bg-background-800/50"
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
