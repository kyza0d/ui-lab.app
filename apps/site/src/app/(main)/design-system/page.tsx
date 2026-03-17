import { MDXRemote } from 'next-mdx-remote-client/rsc'

import { getDesignSystemDocBySlug } from '@/features/docs'
import { mdxComponents, mdxOptions } from '@/features/docs'
import { DocumentationHeader } from '@/features/docs/components/documentation-header'
import { Metadata } from 'next'
import { generateMetadata as buildMetadata } from '@/shared/lib/metadata'

export const metadata: Metadata = buildMetadata({
  pathname: '/design-system',
  description: 'Foundations, tokens, and component guidance for the UI Lab design system.',
});

export default async function DesignSystemPage() {
  const doc = await getDesignSystemDocBySlug('index')

  if (!doc) {
    return (
      <div className="w-full text-foreground-100">
        <div className="flex flex-col lg:flex-row justify-between gap-0">
          <main>
            <div className="text-red-500">Design System documentation not found</div>
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
            <MDXRemote
              source={doc.content}
              components={mdxComponents}
              options={mdxOptions}
            />
          </div>
        </main>

      </div>
    </div>
  );
}
