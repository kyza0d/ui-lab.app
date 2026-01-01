import { BreadcrumbsNav } from '@/features/navigation';
import { BlocksPageClient } from '@/features/blocks';

export default function BlocksPage() {
  return (
    <div>
      <BreadcrumbsNav />
      <div className="w-full bg-background-950 mx-auto pt-32 pb-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="space-y-4 mb-12">
            <h2 className="text-4xl font-bold text-foreground-50">Blocks</h2>
            <p className="text-foreground-400 max-w-2xl">
              Reusable component combinations coming soon. Build faster with pre-composed patterns.
            </p>
          </div>
          <BlocksPageClient />
        </div>
      </div>
    </div>
  );
}
