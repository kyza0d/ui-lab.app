import {
  getAllPackages,
  getElementById,
  getElementsInPackage,
  getPackageById,
} from "ui-lab-registry";

export interface PackageSourceEntry {
  id: string;
  displayName: string;
  description: string;
  tags: string[];
}

export interface ElementSourceEntry {
  package: string;
  id: string;
  displayName: string;
  description: string;
}

export function listPackages(): PackageSourceEntry[] {
  return getAllPackages().map((pkg) => ({
    id: pkg.id,
    displayName: pkg.name,
    description: pkg.description,
    tags: pkg.tags,
  }));
}

export function listElements(packageId: string): ElementSourceEntry[] {
  return getElementsInPackage(packageId).flatMap((elementId) => {
    const element = getElementById(elementId);
    if (!element) return [];

    return [
      {
        package: packageId,
        id: element.id,
        displayName: element.name,
        description: element.description,
      },
    ];
  });
}

export function getElementPreview(packageId: string, _elementId: string) {
  return getPackageById(packageId)?.getPreview?.();
}

export type { ElementMetadata, ElementPackageMetadata } from "ui-lab-registry";
