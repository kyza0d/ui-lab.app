import ElementDetailClient from './client';
import { elementRegistry, getAllPackages, getElementsInPackage } from 'ui-lab-registry';
import { generateMetadata as generateSiteMetadata } from '@/shared';
import { extractElementMetadata } from '@/shared/lib/metadata-extractors';

export function generateStaticParams() {
  const packages = getAllPackages();

  return packages.flatMap((pkg) => {
    const elementIds = getElementsInPackage(pkg.id);
    return elementIds.map((elementId) => ({ id: pkg.id, elementId }));
  });
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ id: string; elementId: string }>
}) {
  const { elementId } = await params;
  const element = elementRegistry[elementId as keyof typeof elementRegistry];

  if (!element) {
    return generateSiteMetadata({ title: 'Element Not Found' });
  }

  const extracted = extractElementMetadata(element);
  return generateSiteMetadata({
    title: extracted.title,
    description: extracted.description,
  });
}

export default async function PackageElementDetailPage({
  params
}: {
  params: Promise<{ id: string; elementId: string }>
}) {
  const { elementId } = await params;
  return <ElementDetailClient elementId={elementId} />;
}
