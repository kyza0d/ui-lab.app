import {
  listPackages as listPrivatePackages,
  listElements as listPrivateElements,
  getElementPreview as getPrivateElementPreview,
  type ElementPackage,
  type ElementSourceEntry,
} from '@private';

export interface PackageSourceEntry {
  id: string;
  displayName: string;
  description: string;
}

export interface ElementEntry {
  package: string;
  id: string;
  displayName: string;
  description?: string;
  access: ElementSourceEntry['access'];
  visibility: ElementSourceEntry['visibility'];
  previewable: boolean;
  groupPath: string[];
}

export function listPackages(): PackageSourceEntry[] {
  return listPrivatePackages().map((pkg: ElementPackage) => ({
    id: pkg.id,
    displayName: pkg.displayName,
    description: pkg.description,
  }));
}

export function listElements(packageId: string): ElementEntry[] {
  return listPrivateElements(packageId).map((el: ElementSourceEntry) => ({
    package: el.package,
    id: el.id,
    displayName: el.displayName,
    description: el.description,
    access: el.access,
    visibility: el.visibility,
    previewable: el.previewable,
    groupPath: el.groupPath,
  }));
}

export function getElementPreview(packageId: string, elementId: string) {
  return getPrivateElementPreview(packageId, elementId);
}
