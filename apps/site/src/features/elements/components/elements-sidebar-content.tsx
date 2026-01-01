'use client';

import { useEffect, useMemo, useState } from 'react';
import { FaChevronDown } from 'react-icons/fa6';
import { cn } from '@/shared';
import { SidebarItemLink } from '@/features/navigation';
import {
  getElementsInCategory,
  type ElementMetadata,
  type ElementCategoryId,
} from 'ui-lab-registry';

interface ElementsSidebarContentProps {
  activeNav: 'elements' | 'blocks' | 'starters';
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

  const toggleElement = (elementId: string) => {
    setExpandedElements((prev) => {
      const next = new Set(prev);
      if (next.has(elementId)) next.delete(elementId);
      else next.add(elementId);
      return next;
    });
  };

  const filteredElements = useMemo(() => {
    if (!activeCategory) return elements;
    return getElementsInCategory(elements, activeCategory);
  }, [elements, activeCategory]);

  const sortedElements = useMemo(
    () => [...filteredElements].sort((a, b) => a.name.localeCompare(b.name)),
    [filteredElements]
  );

  if (activeNav === 'blocks' || activeNav === 'starters') {
    return (
      <div className="flex items-center justify-center h-full px-6 text-center">
        <p className="text-foreground-400 text-sm">
          {activeNav === 'blocks' ? 'Blocks coming soon' : 'Starters coming soon'}
        </p>
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
        const isElementExpanded = expandedElements.has(element.id);
        const href = `/elements/${element.id}`;

        return (
          <div key={element.id}>
            <div className="flex items-center">
              <SidebarItemLink
                href={href}
                className={cn(
                  'flex-1 flex justify-between px-3 py-1.5 text-sm rounded-md cursor-pointer',
                  'transition-colors duration-300 ease-out hover:duration-0',
                  isActive
                    ? 'text-foreground-50 bg-background-800 font-medium'
                    : 'text-foreground-400 hover:text-foreground-200 hover:bg-background-800/50'
                )}
              >
                <span className="capitalize">{element.name}</span>
                {element.variants.length > 0 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleElement(element.id);
                    }}
                    className="py-0.5 text-foreground-400 hover:text-foreground-200 transition-colors"
                    aria-label={isElementExpanded ? 'Collapse variants' : 'Expand variants'}
                  >
                    <FaChevronDown
                      size={10}
                      className={cn(
                        'transition-transform',
                        !isElementExpanded && '-rotate-90'
                      )}
                    />
                  </button>
                )}
              </SidebarItemLink>
            </div>

            {isElementExpanded && element.variants.length > 0 && (
              <div className="relative mt-1 ml-3">
                <div className="absolute left-0.5 top-0 bottom-0 w-px bg-background-600" />
                <div className="space-y-0.5 pl-3">
                  {element.variants.map((variant, index) => (
                    <SidebarItemLink
                      key={`${element.id}-${index}`}
                      href={href}
                      className="block px-3 py-1 text-sm rounded-md cursor-pointer transition-colors text-foreground-500 hover:text-foreground-300 hover:bg-background-800/50"
                    >
                      {variant.name}
                    </SidebarItemLink>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
