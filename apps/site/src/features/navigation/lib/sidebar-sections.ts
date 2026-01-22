import {
  categoryMap,
  getCategoriesInOrder,
  getComponentsGroupedByCategory,
  getComponentsInCategoryOrder,
} from '@/features/component-docs';
import { getSectionsForDomain } from './sidebar-registry-resolver';
import { MainNavItem } from '@/app/lib/sidebar-config';

interface SidebarSection {
  label: string;
  items: Array<{
    id: string;
    label: string;
  }>;
}

const SECTION_LABEL_FILTERS: Record<MainNavItem, string[] | null> = {
  'overview': null,
  'components-core': null,
  'design-system': null,
  'agents-mcps-introduction': null,
  'cli-getting-started': ['Getting Started'],
  'elements': null,
  'sections': null,
};

function deduplicateSectionItems(section: SidebarSection): SidebarSection {
  const seenLabels = new Map<string, { id: string; index: number }>();
  const uniqueItems: Array<{ id: string; label: string }> = [];

  for (const item of section.items) {
    const normalizedLabel = item.label.toLowerCase();
    if (!seenLabels.has(normalizedLabel)) {
      seenLabels.set(normalizedLabel, { id: item.id, index: uniqueItems.length });
      uniqueItems.push(item);
    } else {
      const stored = seenLabels.get(normalizedLabel)!;
      const storedId = uniqueItems[stored.index].id;

      const storedHyphens = storedId.split('-').length;
      const currentHyphens = item.id.split('-').length;

      if (currentHyphens < storedHyphens || (currentHyphens === storedHyphens && item.id.length < storedId.length)) {
        uniqueItems[stored.index] = item;
        seenLabels.set(normalizedLabel, { id: item.id, index: stored.index });
      }
    }
  }

  return {
    label: section.label,
    items: uniqueItems,
  };
}

function getComponentSections(): SidebarSection[] {
  return getCategoriesInOrder()
    .map((category: any) => ({ category, components: getComponentsInCategoryOrder(category) }))
    .filter(({ components }: any) => components.length > 0)
    .map(({ category, components }: any) => ({
      label: categoryMap[category as keyof typeof categoryMap].label || category,
      items: components.map((comp: any) => ({
        id: comp.id,
        label: comp.name,
      })),
    }));
}

export function getSectionsForNav(nav: MainNavItem): SidebarSection[] {
  let sections: SidebarSection[] = [];

  switch (nav) {
    case 'overview':
      sections = getSectionsForDomain('docs');
      break;
    case 'components-core':
      return getComponentSections();
    case 'agents-mcps-introduction':
      sections = getSectionsForDomain('agents-mcps');
      break;
    case 'cli-getting-started':
      sections = getSectionsForDomain('cli');
      break;
    case 'design-system':
      sections = getSectionsForDomain('design-system');
      break;
    default:
      return getComponentSections();
  }

  const allowedLabels = SECTION_LABEL_FILTERS[nav];
  if (allowedLabels) {
    sections = sections.filter(s => allowedLabels.includes(s.label));
  }

  return sections.map(deduplicateSectionItems);
}

export function getHrefForNavItem(activeNav: MainNavItem, itemId: string): string {
  switch (activeNav) {
    case 'overview':
      return itemId === 'introduction' ? '/docs' : `/docs/${itemId}`;
    case 'components-core':
      return itemId === 'overview' ? '/components' : `/components/${itemId}`;
    case 'agents-mcps-introduction':
      return itemId === 'introduction' ? '/agents-mcps' : `/agents-mcps/${itemId}`;
    case 'cli-getting-started':
      return itemId === 'introduction' ? '/cli' : `/cli/${itemId}`;
    case 'design-system':
      return itemId === 'overview' ? '/design-system' : `/design-system/${itemId}`;
    default:
      return itemId === 'overview' ? '/components' : `/components/${itemId}`;
  }
}

export function isNavItemActive(itemId: string, pathname: string, activeNav: MainNavItem): boolean {
  const href = getHrefForNavItem(activeNav, itemId);
  if (href === pathname) return true;
  if (itemId === 'introduction' && (pathname === '/docs' || pathname === '/agents-mcps' || pathname === '/cli' || pathname === '/design-system')) return true;
  if (itemId === 'overview' && (pathname === '/components' || pathname === '/design-system')) return true;
  return pathname.includes(`/${itemId}`);
}

export function getTotalComponentCount(): number {
  const groupedComponents = getComponentsGroupedByCategory();
  return Object.values(groupedComponents).reduce((sum, components) => sum + components.length, 0);
}
