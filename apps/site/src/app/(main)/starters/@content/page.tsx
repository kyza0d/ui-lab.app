import { BreadcrumbsNav } from '@/features/navigation';

export default function StartersPage() {
  return (
    <div>
      <BreadcrumbsNav />
      <div className="w-full bg-background-950 mx-auto pt-32 pb-12">
        <div className="mx-auto px-4">
          <div className="space-y-4 mb-12">
            <h2 className="text-4xl font-bold text-foreground-50">Starters</h2>
            <p className="text-foreground-400 max-w-2xl">
              Ready-to-use project templates and boilerplates coming soon. Jump-start your development.
            </p>
          </div>

          <div className="flex items-center justify-center py-24">
            <div className="text-center">
              <p className="text-lg text-foreground-300 mb-2">Starters coming soon</p>
              <p className="text-sm text-foreground-500">Check back soon for starter templates and boilerplates</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
