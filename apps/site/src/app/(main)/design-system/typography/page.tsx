import { MDXRemote } from 'next-mdx-remote-client/rsc'

import { getDesignSystemDocBySlug } from '@/features/docs'
import { mdxComponents, mdxOptions } from '@/features/docs'
import { DocumentationHeader } from '@/features/docs/components/documentation-header'
import { generateMetadata as generateSiteMetadata } from '@/shared'

export async function generateMetadata() {
  const doc = await getDesignSystemDocBySlug('typography')
  if (!doc) {
    return generateSiteMetadata({ title: 'Typography' })
  }
  return generateSiteMetadata({
    title: doc.metadata.title,
    description: doc.metadata.description,
  })
}

export default async function TypographyPage() {
  const doc = await getDesignSystemDocBySlug('typography')

  if (!doc) {
    return (
      <div className="w-full text-foreground-100">
        <div className="flex flex-col lg:flex-row justify-between gap-0">
          <main className="w-full mx-auto max-w-3xl px-6 py-16 lg:w-48rem">
            <div className="text-red-500">Typography documentation not found</div>
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

          <div className="mt-20 text-sm text-foreground-400">
            © 2026 UI Lab • Built for humans and machines
          </div>
        </main>

      </div>
    </div>
  );
}
