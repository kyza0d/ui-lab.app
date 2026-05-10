import { elementsList, getAllStarters, getAllPackages, getElementsInPackage, elementRegistry } from 'ui-lab-registry';

function getElementsListForSidebar() {
  return elementsList;
}

function getPackagesForSidebar() {
  return getAllPackages();
}

function getPackageElementsForSidebar(packageId: string) {
  const elementIds = getElementsInPackage(packageId);
  return elementIds.map(id => elementRegistry[id]).filter(Boolean);
}

type ElementsNavType = 'packages' | 'sections' | 'starters' | 'patterns';

export function getActiveElementsNavFromPathname(pathname: string): ElementsNavType {
  if (pathname.startsWith('/sections')) return 'sections';
  if (pathname.startsWith('/starters')) return 'starters';
  if (pathname.startsWith('/patterns')) return 'patterns';
  return 'packages';
}
