import {
  FaShapes,
  FaPaintbrush,
  FaTerminal,
  FaPaperclip,
  FaFlag,
  FaCube,
  FaRegWindowMaximize,
} from 'react-icons/fa6';

export type SidebarDomain =
  | 'docs'
  | 'components'
  | 'elements'
  | 'sections'
  | 'agents-mcps'
  | 'cli'
  | 'design-system';

export type MainNavItem =
  | 'overview'
  | 'components-core'
  | 'elements'
  | 'sections'
  | 'agents-mcps-introduction'
  | 'cli-getting-started'
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
    icon: FaPaperclip,
    domain: 'docs',
  },
  {
    id: 'design-system',
    label: 'Design System',
    href: '/design-system',
    icon: FaPaintbrush,
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
    id: 'agents-mcps-introduction',
    label: 'Agents & MCPs',
    href: '/agents-mcps',
    icon: FaFlag,
    domain: 'agents-mcps',
  },
  {
    id: 'cli-getting-started',
    label: 'CLI',
    href: '/cli',
    icon: FaTerminal,
    domain: 'cli',
  },
];

export function getActiveDomainForPathname(pathname: string): SidebarDomain {
  if (pathname.startsWith('/docs')) return 'docs';
  if (pathname.startsWith('/components')) return 'components';
  if (pathname.startsWith('/elements')) return 'elements';
  if (pathname.startsWith('/sections')) return 'sections';
  if (pathname.startsWith('/agents-mcps')) return 'agents-mcps';
  if (pathname.startsWith('/cli')) return 'cli';
  if (pathname.startsWith('/design-system')) return 'design-system';
  return 'docs';
}

export function getActiveNavItemForDomain(domain: SidebarDomain): MainNavItem {
  const navItem = MAIN_NAV_ITEMS.find(item => item.domain === domain);
  return navItem?.id ?? 'overview';
}

export function getMainNavItemsForDomain(domain: SidebarDomain): MainNavItemConfig[] {
  if (domain === 'agents-mcps') {
    return MAIN_NAV_ITEMS.filter(item => item.domain === 'agents-mcps');
  }
  if (domain === 'cli') {
    return MAIN_NAV_ITEMS.filter(item => item.domain === 'cli');
  }
  if (domain === 'components') {
    return [];
  }
  if (domain === 'elements' || domain === 'sections') {
    return MAIN_NAV_ITEMS.filter(item => item.domain === 'elements' || item.domain === 'sections');
  }
  return MAIN_NAV_ITEMS.filter(item => item.domain === 'docs' || item.domain === 'design-system');
}

export function getMainNavItemConfig(id: MainNavItem): MainNavItemConfig | undefined {
  return MAIN_NAV_ITEMS.find(item => item.id === id);
}
