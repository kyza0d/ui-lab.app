import { cacheLife } from 'next/cache';
import StarterDetailClient from './client';
import { starterRegistry } from 'ui-lab-registry';
import { generateMetadata as generateSiteMetadata } from '@/shared';

const starterIds = ["nextjs-basic"];

export function generateStaticParams() {
  return starterIds.map((id) => ({ 'starter-id': id }));
}

export async function generateMetadata({ params }: { params: Promise<{ 'starter-id': string }> }) {
  'use cache';
  cacheLife('hours');

  const { 'starter-id': starterId } = await params;
  const starter = starterRegistry[starterId as keyof typeof starterRegistry];

  if (!starter) {
    return generateSiteMetadata({ title: 'Starter Not Found' });
  }

  return generateSiteMetadata({
    title: starter.name,
    description: starter.description,
  });
}

export default async function StarterDetailPage({
  params
}: {
  params: Promise<{ 'starter-id': string }>
}) {
  'use cache';
  cacheLife('hours');

  const { 'starter-id': starterId } = await params;
  return <StarterDetailClient starterId={starterId} />;
}
