import {
  FaShapes,
  FaCube,
  FaRegWindowMaximize,
  FaSwatchbook,
  FaBook,
  FaRocket,
  FaTableCells,
  FaBox,
  FaBoxOpen,
  FaToolbox,
  FaGift,
  FaFile,
  FaSeedling,
} from 'react-icons/fa6';

export type SidebarDomain =
  | 'docs'
  | 'components'
  | 'packages'
  | 'sections'
  | 'starters'
  | 'patterns'
  | 'design-system';

export type MainNavItem =
  | 'overview'
  | 'components-core'
  | 'packages'
  | 'sections'
  | 'starters'
  | 'patterns'
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
    label: 'Library',
    href: '/components',
    icon: FaCube,
    domain: 'components',
  },
  {
    id: 'packages',
    label: 'Packages',
    href: '/packages',
    icon: FaGift,
    domain: 'packages',
  },
  {
    id: 'sections',
    label: 'Sections',
    href: '/sections',
    icon: FaRegWindowMaximize,
    domain: 'sections',
  },
  {
    id: 'patterns',
    label: 'Patterns',
    href: '/patterns',
    icon: FaTableCells,
    domain: 'patterns',
  },
  {
    id: 'starters',
    label: 'Starters',
    href: '/starters',
    icon: FaSeedling,
    domain: 'starters',
  },
];

export function getActiveDomainForPathname(pathname: string): SidebarDomain {
  if (pathname.startsWith('/docs')) return 'docs';
  if (pathname.startsWith('/components')) return 'components';
  if (pathname.startsWith('/packages')) return 'packages';
  if (pathname.startsWith('/sections')) return 'sections';
  if (pathname.startsWith('/starters')) return 'starters';
  if (pathname.startsWith('/patterns')) return 'patterns';
  if (pathname.startsWith('/design-system')) return 'design-system';
  return 'docs';
}

export function getActiveNavItemForDomain(domain: SidebarDomain): MainNavItem {
  const navItem = MAIN_NAV_ITEMS.find(item => item.domain === domain);
  return navItem?.id ?? 'overview';
}

export function getMainNavItemsForDomain(domain: SidebarDomain): MainNavItemConfig[] {
  if (domain === 'components') {
    return MAIN_NAV_ITEMS.filter(item => item.domain === 'components');
  }
  if (domain === 'packages' || domain === 'sections' || domain === 'starters' || domain === 'patterns') {
    return MAIN_NAV_ITEMS.filter(item => item.domain === 'packages' || item.domain === 'sections' || item.domain === 'starters' || item.domain === 'patterns');
  }
  return MAIN_NAV_ITEMS.filter(item => item.domain === 'docs' || item.domain === 'design-system');
}

export function getMainNavItemConfig(id: MainNavItem): MainNavItemConfig | undefined {
  return MAIN_NAV_ITEMS.find(item => item.id === id);
}
