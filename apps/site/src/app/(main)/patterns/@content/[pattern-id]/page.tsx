import { cacheLife } from 'next/cache';
import PatternDetailClient from './client';
import { getAllPatterns, getPatternById } from 'ui-lab-registry';
import { generateMetadata as generateSiteMetadata } from '@/shared';

export function generateStaticParams() {
  return getAllPatterns().map((p) => ({ 'pattern-id': p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ 'pattern-id': string }> }) {
  'use cache';
  cacheLife('hours');

  const { 'pattern-id': patternId } = await params;
  const pattern = getPatternById(patternId);

  if (!pattern) {
    return generateSiteMetadata({ title: 'Pattern Not Found' });
  }

  return generateSiteMetadata({
    title: `${pattern.name} — UI Lab Patterns`,
    description: pattern.description,
  });
}

export default async function PatternDetailPage({
  params,
}: {
  params: Promise<{ 'pattern-id': string }>;
}) {
  'use cache';
  cacheLife('hours');

  const { 'pattern-id': patternId } = await params;
  return <PatternDetailClient patternId={patternId} />;
}
