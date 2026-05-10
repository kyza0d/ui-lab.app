import type { ReactNode } from 'react'

import type { DocsSourcePage } from '../lib/docs-source'
import { DocsMDX } from './docs-mdx'
import { DocumentationHeader } from './documentation-header'

interface DocPageProps {
  page: DocsSourcePage
  beforeBody?: ReactNode
  afterBody?: ReactNode
  className?: string
}

export function DocPage({ page, beforeBody, afterBody, className }: DocPageProps) {
  const serializedTocItems = JSON
    .stringify(page.toc)
    .replace(/</g, '\\u003c')

  return (
    <main className={className}>
      <script
        type="application/json"
        data-docs-page-toc
        dangerouslySetInnerHTML={{ __html: serializedTocItems }}
      />

      <DocumentationHeader
        title={page.title}
        description={page.description ?? undefined}
      />

      {beforeBody ?? <div className="h-px bg-background-800 my-12"></div>}

      <div id="doc-content">
        <DocsMDX source={page.body} />
      </div>

      {afterBody}
    </main>
  )
}
