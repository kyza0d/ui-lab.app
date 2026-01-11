import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote-client/rsc'
import rehypeSlug from 'rehype-slug'
import { cacheLife } from 'next/cache'
import { getDocBySlug, getAllDocs } from '@/features/docs'
import { mdxComponents } from '@/features/docs'
import { DocumentationHeader } from '@/features/docs/components/documentation-header'

export async function generateStaticParams() {
  const docs = await getAllDocs()
  return docs.map(doc => ({ slug: doc.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  'use cache';
  cacheLife('hours');

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
  'use cache';
  cacheLife('hours');

  const { slug } = await params
  const doc = await getDocBySlug(slug)

  if (!doc) {
    notFound()
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

          <div id="doc-content" className="prose dark:prose-invert prose-lg max-w-none">
            <MDXRemote
              source={doc.content}
              components={mdxComponents}
              options={{ mdxOptions: { rehypePlugins: [rehypeSlug] } }}
            />
          </div>

          <div className="mt-20 text-sm text-foreground-500">
            © 2026 UI Lab • Built for humans and machines
          </div>
        </main>

        <div className="w-full lg:w-auto">
        </div>
      </div>
    </div>
  )
}
