'use client';

import { SidebarShell } from '@/features/navigation';
import { ElementsSidebarContent } from './elements-sidebar-content';
import { FaShapes, FaRectangleList, FaWindowRestore } from 'react-icons/fa6';
import { cn } from '@/shared';
import type { ElementMetadata } from 'ui-lab-registry';

type ElementsNav = 'elements' | 'blocks' | 'starters';

function getActiveNavFromPathname(pathname: string): ElementsNav {
  if (pathname.startsWith('/blocks')) return 'blocks';
  if (pathname.startsWith('/starters')) return 'starters';
  return 'elements';
}

interface ElementsSidebarProps {
  elements: ElementMetadata[];
  pathname: string;
}

export function ElementsSidebar({ elements, pathname }: ElementsSidebarProps) {
  const activeNav = getActiveNavFromPathname(pathname);

  const mainNav = [
    { id: 'elements', label: 'Elements', href: '/elements', icon: FaShapes },
    { id: 'blocks', label: 'Blocks', href: '/blocks', icon: FaRectangleList },
    { id: 'starters', label: 'Starters', href: '/starters', icon: FaWindowRestore },
  ].map((nav) => ({
    ...nav,
    badge:
      nav.id === 'elements' ? (
        <span
          className={cn(
            'ml-auto px-1 py-0.5 rounded text-xs font-bold',
            activeNav === 'elements'
              ? 'bg-accent-500/15 text-accent-400 border border-accent-500/20'
              : 'border border-background-700 bg-background-800 text-foreground-300'
          )}
        >
          {elements.length}
        </span>
      ) : undefined,
  }));

  return (
    <SidebarShell
      mainNav={mainNav}
      activeNav={activeNav}
      contextualContent={
        <ElementsSidebarContent
          activeNav={activeNav}
          elements={elements}
          pathname={pathname}
        />
      }
    />
  );
}
