import { cacheLife } from 'next/cache';
import ElementDetailClient from './client';

const elementIds = ["header", "sidebar"];

export function generateStaticParams() {
  return elementIds.map((id) => ({ 'element-id': id }));
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
