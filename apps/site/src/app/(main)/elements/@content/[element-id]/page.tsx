import { cacheLife } from 'next/cache';
import ElementDetailClient from './client';
import { elementRegistry } from 'ui-lab-registry';
import { generateMetadata as generateSiteMetadata } from '@/shared';
import { extractElementMetadata } from '@/shared/lib/metadata-extractors';

const elementIds = ["header", "sidebar"];

export function generateStaticParams() {
  return elementIds.map((id) => ({ 'element-id': id }));
}

export async function generateMetadata({ params }: { params: Promise<{ 'element-id': string }> }) {
  'use cache';
  cacheLife('hours');

  const { 'element-id': elementId } = await params;
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

export default async function ElementDetailPage({
  params
}: {
  params: Promise<{ 'element-id': string }>
}) {
  'use cache';
  cacheLife('hours');

  const { 'element-id': elementId } = await params;
  return <ElementDetailClient elementId={elementId} />;
}
