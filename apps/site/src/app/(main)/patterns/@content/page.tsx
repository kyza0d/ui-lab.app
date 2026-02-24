import { BreadcrumbsNav } from '@/features/navigation';
import { getAllPatterns } from 'ui-lab-registry';
import { PatternsGridClient } from '@/features/patterns';

export default function PatternsPage() {
  const patterns = getAllPatterns();

  return (
    <div className='mt-38 pt-(header-height)'>
      <BreadcrumbsNav />
      <div className="w-full bg-background-950 px-4 mx-auto pb-12">
        <div className="space-y-4 mb-12">
          <h2 className="font-bold text-foreground-50">Patterns</h2>
          <p className="text-foreground-400 max-w-2xl">
            Production-ready code patterns for common UI challenges. Copy and adapt them to your project.
          </p>
        </div>
        <PatternsGridClient patterns={patterns} />
      </div>
    </div>
  );
}
