import { cacheLife } from 'next/cache';
import SectionDetailClient from './client';
import { sectionRegistry, getAllSections } from 'ui-lab-registry';
import { generateMetadata as generateSiteMetadata } from '@/shared';

const sectionIds = Object.keys(sectionRegistry);

export function generateStaticParams() {
  return sectionIds.map((id) => ({ 'section-id': id }));
}

export async function generateMetadata({ params }: { params: Promise<{ 'section-id': string }> }) {
  'use cache';
  cacheLife('hours');

  const { 'section-id': sectionId } = await params;
  const sections = getAllSections();
  const section = sections.find(s => s.id === sectionId);

  if (!section) {
    return generateSiteMetadata({ title: 'Section Not Found' });
  }

  return generateSiteMetadata({
    title: section.name,
    description: section.description,
  });
}

export default async function SectionDetailPage({
  params
}: {
  params: Promise<{ 'section-id': string }>
}) {
  'use cache';
  cacheLife('hours');

  const { 'section-id': sectionId } = await params;
  return <SectionDetailClient sectionId={sectionId} />;
}
