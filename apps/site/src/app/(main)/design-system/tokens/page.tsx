import { MDXRemote } from 'next-mdx-remote-client/rsc'
import rehypeSlug from 'rehype-slug'
import { getDesignSystemDocBySlug } from '@/lib/docs'
import { tocRegistry } from '@/lib/generated-toc-registry'
import { mdxComponents } from '@/lib/mdx-components'
import { TableOfContents } from '@/components/TableOfContents'
import { packageMetadata } from 'ui-lab-registry'

export default async function TokensPage() {
  const doc = await getDesignSystemDocBySlug('tokens')
  const tocItems = tocRegistry['tokens'] || []

  if (!doc) {
    return (
      <div className="w-full text-foreground-100">
        <div className="flex flex-col lg:flex-row justify-between gap-0">
          <main className="w-full mx-auto max-w-2xl px-6 py-16 font-sans text-sm leading-relaxed antialiased lg:w-48rem">
            <div className="text-red-500">Design Tokens documentation not found</div>
          </main>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full text-foreground-100">
      <div className="flex flex-col lg:flex-row justify-between gap-0">
        <main className="w-full mx-auto max-w-2xl px-6 py-16 font-sans text-sm leading-relaxed antialiased lg:w-48rem">
          <div className="mb-8 flex items-center gap-4 text-foreground-400">
            <span className="inline-flex items-center gap-2 rounded border border-background-700 px-2 py-0.5 text-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
              v{packageMetadata.version}
            </span>
            <span>·</span>
            <span>{doc.metadata.category || 'Design System'}</span>
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
          {tocItems.length > 0 && <TableOfContents items={tocItems} />}
        </div>
      </div>
    </div>
  );
}
