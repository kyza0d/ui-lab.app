import { elementsList, getAllStarters, getAllPackages, getElementsInPackage, elementRegistry } from 'ui-lab-registry';

export function getElementsListForSidebar() {
  return elementsList;
}

export function getPackagesForSidebar() {
  return getAllPackages();
}

export function getPackageElementsForSidebar(packageId: string) {
  const elementIds = getElementsInPackage(packageId);
  return elementIds.map(id => elementRegistry[id]).filter(Boolean);
}

export type ElementsNavType = 'elements' | 'sections' | 'starters';

export function getActiveElementsNavFromPathname(pathname: string): ElementsNavType {
  if (pathname.startsWith('/sections')) return 'sections';
  if (pathname.startsWith('/starters')) return 'starters';
  return 'elements';
}
