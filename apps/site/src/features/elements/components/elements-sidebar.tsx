'use client';

import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { SidebarShell } from '@/features/navigation';
import { ElementsList } from './elements-sidebar-content';
import { FaShapes, FaRectangleList, FaWindowRestore, FaBorderAll, FaFolderTree, FaFlag } from 'react-icons/fa6';
import type { ElementMetadata, ElementCategoryId } from 'ui-lab-registry';
import { getCategoriesWithElements } from 'ui-lab-registry';

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
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get('category') as ElementCategoryId | null;

  const categoriesWithElements = useMemo(
    () => getCategoriesWithElements(elements),
    [elements]
  );

  const mainNav = useMemo(
    () => [
      {
        id: 'elements',
        label: 'Elements',
        href: '/elements',
        icon: FaShapes,
        isExpandable: true,
        children: categoriesWithElements.map(({ category }) => ({
          id: category.id,
          label: category.label,
          href: `/elements?category=${category.id}`,
          description: category.description,
        })),
      },
      {
        id: 'starters',
        label: 'Starters',
        href: '/starters',
        icon: FaFlag,
      },
      {
        id: 'blocks',
        label: 'Blocks',
        href: '/blocks',
        icon: FaBorderAll,
      },
    ],
    [categoriesWithElements]
  );

  return (
    <SidebarShell
      mainNav={mainNav}
      activeNav={activeNav}
      activeCategory={activeCategory}
      contextualContent={
        <ElementsList
          activeNav={activeNav}
          elements={elements}
          pathname={pathname}
          activeCategory={activeCategory}
        />
      }
    />
  );
}
