import { BreadcrumbsNav } from '@/features/navigation';
import { BlocksPageClient } from '@/features/blocks';

export default function BlocksPage() {
  return (
    <div>
      <BreadcrumbsNav />
      <div className="w-full bg-background-950 mx-auto pt-32 pb-12">
        <div className="mx-auto px-4">
          <BlocksPageClient />
        </div>
      </div>
    </div>
  );
}
