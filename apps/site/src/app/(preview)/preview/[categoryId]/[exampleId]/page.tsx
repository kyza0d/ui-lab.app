import { Dashboard } from '@/lib/demos/dashboard';
import { getElementById } from 'ui-lab-registry';
import { getDemoComponent } from '@/lib/get-element-demo';

interface PreviewPageProps {
  params: Promise<{
    categoryId: string;
    exampleId: string;
  }>;
}

function DashboardContent() {
  return <Dashboard />;
}

function PlaceholderContent({
  categoryId,
  exampleId,
  exampleName,
}: {
  categoryId: string;
  exampleId: string;
  exampleName: string;
}) {
  return (
    <div className="w-screen h-screen bg-background-950 flex items-center justify-center p-6">
      <div className="text-center max-w-md">
        <h1 className="text-3xl font-bold text-foreground-50 mb-4">{exampleName}</h1>
        <p className="text-foreground-400 mb-2">Preview: {categoryId}/{exampleId}</p>
        <p className="text-foreground-500 text-sm">
          This is a standalone preview window for the {exampleName} example.
        </p>
        <div className="mt-8 p-6 bg-background-900 rounded-lg border border-background-700">
          <p className="text-foreground-300 text-sm font-mono">
            Route: /preview/{categoryId}/{exampleId}
          </p>
        </div>
      </div>
    </div>
  );
}

const exampleNames: Record<string, string> = {
  'saas-1': 'Dashboard',
  'saas-2': 'User Management',
  'saas-3': 'Billing',
  'saas-4': 'Settings',
  'saas-5': 'Notifications',
  'saas-6': 'Team Collaboration',
  'docs-1': 'API Reference',
  'docs-2': 'Component Showcase',
  'docs-3': 'Search Results',
  'docs-4': 'Code Examples',
  'marketing-1': 'Landing Page',
  'marketing-2': 'Features Showcase',
  'marketing-3': 'Pricing Table',
  'marketing-4': 'Testimonials',
  'marketing-5': 'Blog Grid',
  'marketing-6': 'Case Study',
  'marketing-7': 'FAQ',
};

export default async function PreviewPage({ params }: PreviewPageProps) {
  const { categoryId, exampleId } = await params;
  const exampleName = exampleNames[exampleId] || exampleId;

  if (categoryId === 'elements') {
    const parts = exampleId.split('-');
    const variantIndex = parseInt(parts[parts.length - 1], 10);
    const elementId = parts.slice(0, -1).join('-');
    const element = getElementById(elementId);

    if (element && element.variants[variantIndex]) {
      const variant = element.variants[variantIndex];
      const DemoComponent = variant.demoPath ? getDemoComponent(variant.demoPath) : null;

      return (
        <div className="w-screen h-screen bg-background-950 overflow-auto">
          {DemoComponent ? (
            <DemoComponent />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center">
                <p className="text-foreground-400">Demo not available for {element.name} - {variant.name}</p>
              </div>
            </div>
          )}
        </div>
      );
    }

    return (
      <PlaceholderContent
        categoryId={categoryId}
        exampleId={exampleId}
        exampleName={`${elementId} - Variant ${variantIndex}`}
      />
    );
  }

  if (exampleId === 'saas-1') {
    return (
      <div className="w-full h-full bg-background-950">
        <DashboardContent />
      </div>
    );
  }

  return (
    <PlaceholderContent
      categoryId={categoryId}
      exampleId={exampleId}
      exampleName={exampleName}
    />
  );
}
