'use client';
import { BreadcrumbsNav } from '@/features/navigation';
import { getAllStarters } from 'ui-lab-registry';
import { StartersGridClient } from '@/features/starters';

export default function StartersPage() {
  const allStarters = getAllStarters();

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
          <StartersGridClient starters={allStarters} />
        </div>
      </div>
    </div>
  );
}
