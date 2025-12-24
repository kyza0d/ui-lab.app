import { BreadcrumbsNav } from '@/components/layout/BreadcrumbsNav';

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

          <div className="flex items-center justify-center py-24">
            <div className="text-center">
              <p className="text-lg text-foreground-300 mb-2">Blocks coming soon</p>
              <p className="text-sm text-foreground-500">Check back soon for component combinations and patterns</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
