import {
  FaShapes,
  FaCube,
  FaRegWindowMaximize,
  FaSwatchbook,
  FaBook,
  FaRocket,
} from 'react-icons/fa6';

export type SidebarDomain =
  | 'docs'
  | 'components'
  | 'elements'
  | 'sections'
  | 'starters'
  | 'design-system';

export type MainNavItem =
  | 'overview'
  | 'components-core'
  | 'elements'
  | 'sections'
  | 'starters'
  | 'design-system';

interface MainNavItemConfig {
  id: MainNavItem;
  label: string;
  href: string;
  icon: any;
  domain: SidebarDomain;
}

interface SidebarSection {
  label: string;
  items: Array<{
    id: string;
    label: string;
  }>;
}

const MAIN_NAV_ITEMS: MainNavItemConfig[] = [
  {
    id: 'overview',
    label: 'Introduction',
    href: '/docs',
    icon: FaBook,
    domain: 'docs',
  },
  {
    id: 'design-system',
    label: 'Design System',
    href: '/design-system',
    icon: FaSwatchbook,
    domain: 'design-system',
  },
  {
    id: 'components-core',
    label: 'Components',
    href: '/components',
    icon: FaShapes,
    domain: 'components',
  },
  {
    id: 'elements',
    label: 'Elements',
    href: '/elements',
    icon: FaCube,
    domain: 'elements',
  },
  {
    id: 'sections',
    label: 'Sections',
    href: '/sections',
    icon: FaRegWindowMaximize,
    domain: 'sections',
  },
  {
    id: 'starters',
    label: 'Starters',
    href: '/starters',
    icon: FaRocket,
    domain: 'starters',
  },
];

export function getActiveDomainForPathname(pathname: string): SidebarDomain {
  if (pathname.startsWith('/docs')) return 'docs';
  if (pathname.startsWith('/components')) return 'components';
  if (pathname.startsWith('/elements')) return 'elements';
  if (pathname.startsWith('/sections')) return 'sections';
  if (pathname.startsWith('/starters')) return 'starters';
  if (pathname.startsWith('/design-system')) return 'design-system';
  return 'docs';
}

export function getActiveNavItemForDomain(domain: SidebarDomain): MainNavItem {
  const navItem = MAIN_NAV_ITEMS.find(item => item.domain === domain);
  return navItem?.id ?? 'overview';
}

export function getMainNavItemsForDomain(domain: SidebarDomain): MainNavItemConfig[] {
  if (domain === 'components') {
    return [];
  }
  if (domain === 'elements' || domain === 'sections' || domain === 'starters') {
    return MAIN_NAV_ITEMS.filter(item => item.domain === 'elements' || item.domain === 'sections' || item.domain === 'starters');
  }
  return MAIN_NAV_ITEMS.filter(item => item.domain === 'docs' || item.domain === 'design-system');
}

export function getMainNavItemConfig(id: MainNavItem): MainNavItemConfig | undefined {
  return MAIN_NAV_ITEMS.find(item => item.id === id);
}
