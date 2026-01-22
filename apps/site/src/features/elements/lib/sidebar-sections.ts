import { elementsList } from 'ui-lab-registry';

export function getElementsListForSidebar() {
  return elementsList;
}

export type ElementsNavType = 'elements' | 'sections';

export function getActiveElementsNavFromPathname(pathname: string): ElementsNavType {
  if (pathname.startsWith('/sections')) return 'sections';
  return 'elements';
}
