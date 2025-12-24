import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote-client/rsc'
import rehypeSlug from 'rehype-slug'
import { getCliDocBySlug, getAllCliDocs } from '@/lib/docs'
import { mdxComponents } from '@/lib/mdx-components'
import { TableOfContents } from "@/components/TableOfContents";
import { packageMetadata } from 'ui-lab-registry'

export async function generateStaticParams() {
  const docs = await getAllCliDocs()
  return docs.map(doc => ({ slug: doc.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const doc = await getCliDocBySlug(slug)

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

export default async function CliDocPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const doc = await getCliDocBySlug(slug)

  if (!doc) {
    notFound()
  }

  return (
    <div className="w-full text-foreground-100">
      <div className="flex flex-col lg:flex-row justify-between gap-0">
        <main className="w-full mx-auto max-w-3xl px-6 py-16 font-sans text-sm leading-relaxed antialiased lg:w-48rem min-h-screen">
          <div className="mb-8 flex items-center gap-4 text-foreground-400">
            <span className="inline-flex items-center gap-2 rounded border border-background-700 px-2 py-0.5 text-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
              v{packageMetadata.version}
            </span>
            <span>·</span>
            <span>{doc.metadata.category || 'CLI'}</span>
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

          <div className="h-px bg-background-800 my-12"></div>

          <div id="doc-content" className="prose dark:prose-invert prose-lg max-w-none">
            <MDXRemote
              source={doc.content}
              components={mdxComponents}
              options={{ mdxOptions: { rehypePlugins: [rehypeSlug] } }}
            />
          </div>

          <div className="mt-20 text-sm text-foreground-500">
            © 2025 UI Lab • Built for humans and machines
          </div>
        </main>

        <div className="w-full lg:w-auto">
        </div>
      </div>
    </div>
  )
}
