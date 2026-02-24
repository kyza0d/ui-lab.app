export type RoutePath = string;

export interface RouteTitle {
  path: RoutePath;
  title: string;
}

const ROUTE_TITLES: Record<RoutePath, string> = {
  '/': 'UI Lab',
  '/docs': 'Documentation',
  '/components': 'Components',
  '/packages': 'Examples',
  '/blocks': 'Blocks',
  '/design-system': 'Design System',
  '/config': 'Config',
};

export function getTitleForPath(pathname: string): string | undefined {
  const route = Object.entries(ROUTE_TITLES).find(([path]) => pathname === path || pathname.startsWith(path + '/'));
  return route?.[1];
}

export function generateTitleFromPathname(pathname: string): string {
  if (pathname === '/') return 'Home';
  const segments = pathname
    .split('/')
    .filter(Boolean)
    .map(seg => seg.replace(/-/g, ' '));
  const lastSegment = segments[segments.length - 1];
  return lastSegment
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
