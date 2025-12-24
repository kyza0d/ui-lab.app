'use client';

import { useEffect, useMemo, useState } from 'react';
import { FaChevronDown } from 'react-icons/fa6';
import { cn } from '@/lib/utils';
import { SidebarItemLink } from '@/components/SidebarItemLink';
import type { ElementMetadata } from 'ui-lab-registry';

interface ElementsSidebarContentProps {
  activeNav: 'elements' | 'blocks' | 'starters';
  elements: ElementMetadata[];
  pathname: string;
}

export function ElementsSidebarContent({
  activeNav,
  elements,
  pathname,
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

  const toggleExpanded = (elementId: string) => {
    setExpandedElements((prev) => {
      const next = new Set(prev);
      if (next.has(elementId)) {
        next.delete(elementId);
      } else {
        next.add(elementId);
      }
      return next;
    });
  };

  const sortedElements = useMemo(
    () => [...elements].sort((a, b) => a.name.localeCompare(b.name)),
    [elements]
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

  return (
    <div className="space-y-8">
      <div>
        <span className="text-sm text-foreground-200">Elements</span>
        <div className="space-y-1 mt-1.5">
          {sortedElements.map((element) => {
            const isActive = currentElementId === element.id;
            const isExpanded = expandedElements.has(element.id);
            const href = `/elements/${element.id}`;

            return (
              <div key={element.id}>
                <div className="flex items-center gap-0">
                  <SidebarItemLink
                    href={href}
                    className={cn(
                      'flex-1 block py-1.5 text-sm rounded-md cursor-pointer',
                      'transition-colors duration-300 ease-out',
                      'hover:duration-0',
                      isActive
                        ? 'text-foreground-50 bg-background-800 font-medium'
                        : cn('text-foreground-400', 'hover:text-foreground-200 hover:bg-background-800/50')
                    )}
                  >
                    <span className="capitalize">{element.name}</span>
                  </SidebarItemLink>
                  <button
                    onClick={() => toggleExpanded(element.id)}
                    className="px-2 py-1.5 text-foreground-400 hover:text-foreground-200 transition-colors"
                    aria-label={isExpanded ? 'Collapse' : 'Expand'}
                  >
                    <FaChevronDown
                      size={10}
                      className={`transition-transform ${isExpanded ? '' : '-rotate-90'}`}
                    />
                  </button>
                </div>

                {isExpanded && (
                  <div className="space-y-1 mt-1">
                    {element.variants.map((variant, index) => (
                      <SidebarItemLink
                        key={`${element.id}-${index}`}
                        href={href}
                        className="block px-3 py-1 pl-4 text-sm rounded-md cursor-pointer transition-colors text-foreground-500 hover:text-foreground-300 hover:bg-background-800/50"
                      >
                        {variant.name}
                      </SidebarItemLink>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
