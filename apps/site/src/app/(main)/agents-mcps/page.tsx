import { MDXRemote } from 'next-mdx-remote-client/rsc'
import rehypeSlug from 'rehype-slug'
import { getAgentsMcpsDocBySlug } from "@/features/docs";
import { mdxComponents } from '@/features/docs'
import { DocumentationHeader } from '@/features/docs/components/documentation-header';

export default async function AgentsMcpsPage() {
  const doc = await getAgentsMcpsDocBySlug('index');

  if (!doc) {
    return <div>Agents & MCPs documentation not found</div>;
  }

  return (
    <>
      <div className="w-full text-foreground-100">
        <div className="flex flex-col lg:flex-row justify-between gap-0">
          <main className="w-full mx-auto max-w-3xl px-6 py-16 font-sans text-sm leading-relaxed antialiased lg:w-48rem">
            <DocumentationHeader
              title={doc.metadata.title}
              description={doc.metadata.description}
            />

            <div className="h-px bg-background-800 my-12"></div>

            <div id="doc-content" className="prose dark:prose-invert prose-lg max-w-none min-h-screen">
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
        </div>
      </div>
    </>
  );
}
