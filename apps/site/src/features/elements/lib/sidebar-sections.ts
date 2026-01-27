import { elementsList, getAllStarters } from 'ui-lab-registry';

export function getElementsListForSidebar() {
  return elementsList;
}

export type ElementsNavType = 'elements' | 'sections' | 'starters';

export function getActiveElementsNavFromPathname(pathname: string): ElementsNavType {
  if (pathname.startsWith('/sections')) return 'sections';
  if (pathname.startsWith('/starters')) return 'starters';
  return 'elements';
}
