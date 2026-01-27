import { cacheLife } from 'next/cache';
import ElementDetailClient from './client';
import { elementRegistry, getElementsInPackage } from 'ui-lab-registry';
import { generateMetadata as generateSiteMetadata } from '@/shared';
import { extractElementMetadata } from '@/shared/lib/metadata-extractors';

export function generateStaticParams() {
  const packageId = 'foundation';
  const elementIds = getElementsInPackage(packageId);
  return elementIds.map((elementId) => ({ packageId, elementId }));
}

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ packageId: string; elementId: string }> 
}) {
  'use cache';
  cacheLife('hours');

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
  params: Promise<{ packageId: string; elementId: string }>
}) {
  'use cache';
  cacheLife('hours');

  const { elementId } = await params;
  return <ElementDetailClient elementId={elementId} />;
}
