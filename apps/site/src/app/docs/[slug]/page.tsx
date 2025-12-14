import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote-client/rsc'
import { getDocBySlug, getAllDocs, extractHeadings } from '@/lib/docs'
import { mdxComponents } from '@/lib/mdx-components'
import { TableOfContents } from '@/components/TableOfContents'

export async function generateStaticParams() {
  const docs = await getAllDocs()
  return docs.map(doc => ({ slug: doc.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const doc = await getDocBySlug(slug)

  if (!doc) {
    return { title: 'Not Found' }
  }

  return {
    title: doc.metadata.title,
    description: doc.metadata.description,
    openGraph: {
      title: doc.metadata.title,
      description: doc.metadata.description,
    },
  }
}

export default async function DocPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const doc = await getDocBySlug(slug)

  if (!doc) {
    notFound()
  }

  const headings = extractHeadings(doc.content)
  const tocItems = headings.map(h => ({ id: h.id, title: h.title }))

  return (
    <div className="w-full text-foreground-100">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_16%] gap-8">
        <main className="max-w-2xl mx-auto w-full px-6 py-16 font-sans text-sm leading-relaxed antialiased">
          <div className="mb-8 flex items-center gap-4 text-foreground-400">
            <span className="inline-flex items-center gap-2 rounded border border-foreground-800 px-2 py-0.5 text-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
              v0.1.1
            </span>
            <span>·</span>
            <span>{doc.metadata.category || 'Documentation'}</span>
          </div>

          <div className="mb-10">
            <div className="text-base font-medium text-foreground-50">{doc.metadata.title}</div>
            {doc.metadata.description && (
              <div className="mt-1 text-foreground-300">
                {doc.metadata.description}
              </div>
            )}
            {doc.metadata.publishedOn && (
              <div className="mt-3 text-sm text-foreground-500">
                Published: {new Date(doc.metadata.publishedOn).toLocaleDateString()}
              </div>
            )}
          </div>

          <div className="h-px bg-foreground-800 my-12"></div>

          <div className="prose dark:prose-invert prose-lg max-w-none">
            <MDXRemote
              source={doc.content}
              components={mdxComponents}
            />
          </div>

          <div className="mt-20 text-sm text-foreground-500">
            © 2025 UI Lab • Built for humans and machines
          </div>
        </main>

        {tocItems.length > 0 && <TableOfContents items={tocItems} />}
      </div>
    </div>
  )
}
