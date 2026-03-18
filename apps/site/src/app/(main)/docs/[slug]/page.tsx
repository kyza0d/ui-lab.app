import { notFound } from 'next/navigation'

import { getDocBySlug, getAllDocs } from '@/features/docs'
import { DocumentationHeader } from '@/features/docs/components/documentation-header'
import { DocsMDX } from '@/features/docs/components/docs-mdx'
import { generateMetadata as generateSiteMetadata } from '@/shared'
import { extractDocMetadata } from '@/shared/lib/metadata-extractors'

export async function generateStaticParams() {
  const docs = await getAllDocs()
  return docs.map(doc => ({ slug: doc.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const doc = await getDocBySlug(slug)

  if (!doc) {
    return generateSiteMetadata({ title: 'Not Found' })
  }

  const extracted = extractDocMetadata(doc.metadata)
  return generateSiteMetadata({
    title: extracted.title,
    description: extracted.description,
    keywords: extracted.keywords,
  })
}

export default async function DocPage({ params }: { params: Promise<{ slug: string }> }) {
  'use cache'
  const { slug } = await params
  const doc = await getDocBySlug(slug)

  if (!doc) {
    notFound()
  }

  return (
    <div className="w-full text-foreground-100">
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
  )
}
