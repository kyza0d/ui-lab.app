import { MDXRemote } from 'next-mdx-remote-client/rsc'
import rehypeSlug from 'rehype-slug'
import { getCliDocBySlug } from "@/features/docs";
import { mdxComponents } from '@/features/docs'
import { TableOfContents } from "@/features/docs";
import { packageMetadata } from 'ui-lab-registry/generated-data'

export default async function CliPage() {
  const doc = await getCliDocBySlug('index');

  if (!doc) {
    return <div>CLI documentation not found</div>;
  }

  return (
    <>
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
    </>
  );
}
