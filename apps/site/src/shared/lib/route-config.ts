import { FaBook, FaShapes, FaRegWindowMaximize, FaBox, FaCube } from 'react-icons/fa6';

export type DomainId = 'docs' | 'components' | 'elements' | 'sections';

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
  elements: {
    id: 'elements',
    label: 'Elements',
    icon: FaBox,
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
  icon?: React.ComponentType;
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
      { id: 'elements', label: 'Elements', icon: FaCube, path: '/elements' },
    ],
  },
};

export const ROUTE_TAB_GROUPS: RouteTabGroupConfig[] = [
  { path: '/docs', tabGroupId: 'documentation' },
  { path: '/components', tabGroupId: 'documentation' },
  { path: '/design-system', tabGroupId: 'documentation' },
  { path: '/elements', tabGroupId: 'documentation' },
  { path: '/sections', tabGroupId: 'documentation' },
  { path: '/blocks', tabGroupId: 'documentation' },
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
  if (!domainId) return '3.50rem';
  return DOMAINS[domainId]?.headerHeight || '3.50rem';
};

export const getTabGroupForPathname = (pathname: string): TabGroup | undefined => {
  const sortedRoutes = [...ROUTE_TAB_GROUPS].sort((a, b) => b.path.length - a.path.length);
  const routeConfig = sortedRoutes.find((r) => pathname.startsWith(r.path));
  if (!routeConfig) return undefined;
  return TAB_GROUPS[routeConfig.tabGroupId];
};

const ACTIVE_TAB_OVERRIDES: Record<string, string | undefined> = {
  '/design-system': 'docs',
  '/sections': 'elements',
  '/blocks': 'elements',
};

export const getActiveTabForPathname = (pathname: string): string | undefined => {
  for (const [pattern, tabId] of Object.entries(ACTIVE_TAB_OVERRIDES)) {
    if (pathname.startsWith(pattern)) {
      return tabId;
    }
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
