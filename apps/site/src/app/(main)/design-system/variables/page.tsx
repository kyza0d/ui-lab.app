import { Metadata } from 'next'

import { getDesignSystemDocBySlug } from '@/features/docs'
import { DocumentationHeader } from '@/features/docs/components/documentation-header'
import { generateMetadata as buildMetadata } from '@/shared/lib/metadata'
import { DocsMDX } from '@/features/docs/components/docs-mdx'

export const metadata: Metadata = buildMetadata({
  pathname: '/design-system/variables',
  description: 'Complete reference for CSS custom properties implementing design tokens',
})

export default async function VariablesPage() {
  const doc = await getDesignSystemDocBySlug('variables')

  if (!doc) {
    return (
      <div className="w-full text-foreground-100">
        <div className="flex flex-col lg:flex-row justify-between gap-0">
          <main className="w-full mx-auto max-w-3xl px-6 py-16 lg:w-48rem">
            <div className="text-red-500">Variables documentation not found</div>
          </main>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full text-foreground-100">
      <div className="flex flex-col lg:flex-row justify-between gap-0">
        <main>
          <DocumentationHeader
            title={doc.metadata.title}
            description={doc.metadata.description}
          />

          <div className="h-px bg-background-800 my-12"></div>

          <div id="doc-content">
            <DocsMDX source={doc.content} />
          </div>
        </main>

      </div>
    </div>
  );
}
