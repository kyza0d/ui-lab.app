import { FaBook, FaPlug, FaTerminal } from 'react-icons/fa6';

export type DomainId = 'docs' | 'agents-mcps' | 'cli';

export interface DomainConfig {
  id: DomainId;
  label: string;
  icon: React.ComponentType;
  hasHeaderTabs: true;
}

export const DOMAINS: Record<DomainId, DomainConfig> = {
  docs: {
    id: 'docs',
    label: 'Documentation',
    icon: FaBook,
    hasHeaderTabs: true,
  },
  'agents-mcps': {
    id: 'agents-mcps',
    label: 'Agents & MCPs',
    icon: FaPlug,
    hasHeaderTabs: true,
  },
  cli: {
    id: 'cli',
    label: 'CLI',
    icon: FaTerminal,
    hasHeaderTabs: true,
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
    domainId: 'docs',
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
};

const ROUTES_ARRAY = Object.values(ROUTES);

export const getDomainForPathname = (pathname: string): DomainId | undefined => {
  const route = ROUTES_ARRAY.find((r) => pathname.startsWith(r.path));
  return route?.domainId;
};

export const shouldShowHeaderTabs = (pathname: string): boolean => {
  const domainId = getDomainForPathname(pathname);
  return (domainId !== undefined && DOMAINS[domainId]?.hasHeaderTabs) ?? false;
};

export const getActiveTabValue = (pathname: string): string | undefined => {
  const domainId = getDomainForPathname(pathname);
  return domainId;
};

export const getDomainsWithTabs = (): DomainConfig[] => {
  return Object.values(DOMAINS).filter((domain) => domain.hasHeaderTabs);
};
