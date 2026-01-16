import { BreadcrumbsNav } from '@/features/navigation';
import { SectionsPageClient } from '@/features/sections/components/sections-page-client';

export default function SectionsPage() {
  return (
    <div>
      <BreadcrumbsNav />
      <div className="w-full bg-background-950 mx-auto pt-32 pb-12">
        <div className="mx-auto px-4">
          <SectionsPageClient />
        </div>
      </div>
    </div>
  );
}
