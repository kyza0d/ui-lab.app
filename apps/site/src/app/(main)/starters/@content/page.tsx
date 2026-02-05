'use client';
import { BreadcrumbsNav } from '@/features/navigation';
import { getAllStarters } from 'ui-lab-registry';
import { StartersGridClient } from '@/features/starters';
import type { StarterMetadata } from 'ui-lab-registry';

const placeholderStarters: StarterMetadata[] = [
  {
    id: 'premium-dashboard',
    name: 'Premium Dashboard',
    description: 'Full-featured enterprise dashboard with analytics, charts, and real-time data visualization.',
    category: 'dashboard',
    tags: ['premium', 'enterprise', 'dashboard', 'analytics'],
    files: [],
    pricing: { price: 99.99 }
  },
  {
    id: 'saas-landing',
    name: 'SaaS Landing',
    description: 'Modern SaaS landing page with conversion-optimized sections and responsive design.',
    category: 'landing',
    tags: ['saas', 'landing', 'conversion', 'premium'],
    files: [],
    pricing: { price: 79.99 }
  }
];

export default function StartersPage() {
  const allStarters = getAllStarters();
  const combinedStarters = [...allStarters, ...placeholderStarters];

  return (
    <div className='pl-12 mt-38 pt-(header-height)'>
      <BreadcrumbsNav />
      <div className="w-full bg-background-950 px-4 mx-auto pb-12">
        <div className="space-y-4 mb-12">
          <h2 className="font-bold text-foreground-50">Starters</h2>
          <p className="text-foreground-400 max-w-2xl">
            Full-page templates and layouts to jumpstart your projects. Each starter includes complete implementations with all necessary components.
          </p>
        </div>
        <div className="space-y-6">
          <StartersGridClient starters={combinedStarters} />
        </div>
      </div>
    </div>
  );
}
