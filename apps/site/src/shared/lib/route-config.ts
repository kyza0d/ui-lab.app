import { FaBook, FaPlug, FaTerminal, FaShapes } from 'react-icons/fa6';

export type DomainId = 'docs' | 'components' | 'agents-mcps' | 'cli' | 'elements';

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
    label: 'Foundations',
    icon: FaBook,
    headerType: 'tabs',
    headerHeight: '6.8rem'
  },
  components: {
    id: 'components',
    label: 'Components',
    icon: FaShapes,
    headerType: 'tabs',
    headerHeight: '6.8rem'
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
    headerHeight: '9rem',
  },
};

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
  return DOMAINS[domainId]?.headerHeight || '6.8rem';
};
