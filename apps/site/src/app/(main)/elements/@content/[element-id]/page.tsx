import { BreadcrumbsNav } from '@/components/layout/BreadcrumbsNav';
import { getElementById } from 'ui-lab-registry';
import { getElementSourceCode } from '@/lib/get-element-source';
import ElementDetailClient from './client';

interface ElementDetailPageProps {
  params: Promise<{
    'element-id': string;
  }>;
}

export default async function ElementDetailPage({ params }: ElementDetailPageProps) {
  const { 'element-id': elementId } = await params;
  const element = getElementById(elementId);

  if (!element) {
    return (
      <div>
        <BreadcrumbsNav />
        <div className="w-full bg-background-950 mx-auto pt-12 pb-12">
          <div className="max-w-4xl mx-auto px-4">
            <div className="text-center py-12">
              <p className="text-foreground-400">Element not found.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const variantsWithCode = element.variants.map((variant, index) => ({
    ...variant,
    sourceCode: variant.demoPath ? getElementSourceCode(variant.demoPath) : null,
    index,
  }));

  return <ElementDetailClient element={element} variantsWithCode={variantsWithCode} elementId={elementId} />;
}
