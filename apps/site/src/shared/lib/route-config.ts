import { FaBook, FaPlug, FaTerminal, FaShapes, FaRocket, FaImages, FaStar, FaRegWindowMaximize } from 'react-icons/fa6';

export type DomainId = 'docs' | 'components' | 'agents-mcps' | 'cli' | 'elements' | 'sections';

export interface DomainConfig {
  id: DomainId;
  label: string;
  icon: React.ComponentType;
  headerType: 'tabs' | 'search';
  headerHeight?: string;
}

export const DOMAINS: Record<DomainId, DomainConfig> = {
  docs: {
    id: 'docs',
    label: 'Documentation',
    icon: FaBook,
    headerType: 'tabs',
  },
  components: {
    id: 'components',
    label: 'Components',
    icon: FaShapes,
    headerType: 'tabs',
  },
  'agents-mcps': {
    id: 'agents-mcps',
    label: 'Agents & MCPs',
    icon: FaPlug,
    headerType: 'tabs',
  },
  cli: {
    id: 'cli',
    label: 'CLI',
    icon: FaTerminal,
    headerType: 'tabs',
  },
  elements: {
    id: 'elements',
    label: 'Elements',
    icon: FaShapes,
    headerType: 'search',
  },
  sections: {
    id: 'sections',
    label: 'Sections',
    icon: FaRegWindowMaximize,
    headerType: 'search',
  },
};

export interface TabConfig {
  id: string;
  label: string;
  icon: React.ComponentType;
  path: string;
  isPlaceholder?: boolean;
}

export interface TabGroup {
  id: string;
  tabs: TabConfig[];
}

export interface RouteTabGroupConfig {
  path: string;
  tabGroupId: string;
}

export const TAB_GROUPS: Record<string, TabGroup> = {
  documentation: {
    id: 'documentation',
    tabs: [
      { id: 'docs', label: 'Documentation', icon: FaBook, path: '/docs' },
      { id: 'components', label: 'Components', icon: FaShapes, path: '/components' },
      { id: 'agents-mcps', label: 'Agents & MCPs', icon: FaPlug, path: '/agents-mcps' },
      { id: 'cli', label: 'CLI', icon: FaTerminal, path: '/cli' },
    ],
  },
  elements: {
    id: 'elements',
    tabs: [
      { id: 'elements', label: 'Elements', icon: FaShapes, path: '/elements' },
      { id: 'starters', label: 'Starters', icon: FaRocket, path: '/starters' },
      { id: 'assets', label: 'Assets', icon: FaImages, path: '/assets', isPlaceholder: true }
    ],
  },
};

export const ROUTE_TAB_GROUPS: RouteTabGroupConfig[] = [
  { path: '/docs', tabGroupId: 'documentation' },
  { path: '/components', tabGroupId: 'documentation' },
  { path: '/design-system', tabGroupId: 'documentation' },
  { path: '/agents-mcps', tabGroupId: 'documentation' },
  { path: '/cli', tabGroupId: 'documentation' },
  { path: '/elements', tabGroupId: 'elements' },
  { path: '/sections', tabGroupId: 'elements' },
  { path: '/blocks', tabGroupId: 'elements' },
  { path: '/starters', tabGroupId: 'elements' },
];

export interface RouteConfig {
  path: string;
  domainId: DomainId;
}

export const ROUTES: Record<string, RouteConfig> = {
  docs: {
    path: '/docs',
    domainId: 'docs',
  },
  components: {
    path: '/components',
    domainId: 'components',
  },
  'design-system': {
    path: '/design-system',
    domainId: 'docs',
  },
  'agents-mcps': {
    path: '/agents-mcps',
    domainId: 'agents-mcps',
  },
  cli: {
    path: '/cli',
    domainId: 'cli',
  },
  elements: {
    path: '/elements',
    domainId: 'elements',
  },
  sections: {
    path: '/sections',
    domainId: 'sections',
  },
  blocks: {
    path: '/blocks',
    domainId: 'elements',
  },
  starters: {
    path: '/starters',
    domainId: 'elements',
  },
};

const ROUTES_ARRAY = Object.values(ROUTES);

export const getDomainForPathname = (pathname: string): DomainId | undefined => {
  const route = ROUTES_ARRAY.find((r) => pathname.startsWith(r.path));
  return route?.domainId;
};

export const shouldShowHeaderTabs = (pathname: string): boolean => {
  const domainId = getDomainForPathname(pathname);
  const domain = domainId ? DOMAINS[domainId] : undefined;
  return domain?.headerType === 'tabs' || false;
};

export const shouldApplyRevealCollapse = (pathname: string): boolean => {
  const domainId = getDomainForPathname(pathname);
  if (!domainId) return false;
  const domain = DOMAINS[domainId];
  return domain?.headerType === 'tabs' || domainId === 'elements' || domainId === 'sections';
};

export const getActiveTabValue = (pathname: string): string | undefined => {
  const domainId = getDomainForPathname(pathname);
  return domainId;
};

export const getDomainsWithTabs = (): DomainConfig[] => {
  return Object.values(DOMAINS).filter((domain) => domain.headerType === 'tabs');
};

export const shouldShowHeaderSearch = (pathname: string): boolean => {
  const domainId = getDomainForPathname(pathname);
  const domain = domainId ? DOMAINS[domainId] : undefined;
  return domain?.headerType === 'search' || false;
};

export const getHeaderHeight = (pathname: string): string => {
  const domainId = getDomainForPathname(pathname);
  if (!domainId) return '3.4rem';
  return DOMAINS[domainId]?.headerHeight || '7rem';
};

export const getTabGroupForPathname = (pathname: string): TabGroup | undefined => {
  const sortedRoutes = [...ROUTE_TAB_GROUPS].sort((a, b) => b.path.length - a.path.length);
  const routeConfig = sortedRoutes.find((r) => pathname.startsWith(r.path));
  if (!routeConfig) return undefined;
  return TAB_GROUPS[routeConfig.tabGroupId];
};

const ACTIVE_TAB_OVERRIDES: Record<string, string | undefined> = {
  '/design-system': 'docs',
};

export const getActiveTabForPathname = (pathname: string): string | undefined => {
  for (const [pattern, tabId] of Object.entries(ACTIVE_TAB_OVERRIDES)) {
    if (pathname.startsWith(pattern)) {
      return tabId;
    }
  }

  if (pathname.startsWith('/sections')) {
    return 'elements';
  }

  const tabGroup = getTabGroupForPathname(pathname);
  if (!tabGroup) return undefined;
  const sortedTabs = [...tabGroup.tabs].sort((a, b) => b.path.length - a.path.length);
  const activeTab = sortedTabs.find((tab) => pathname.startsWith(tab.path));
  return activeTab?.id;
};

export const shouldShowTabsForPathname = (pathname: string): boolean => {
  return getTabGroupForPathname(pathname) !== undefined;
};
