import { docsSource } from '@/features/docs/lib/docs-source'
import { DocPage as DocumentationPage } from '@/features/docs/components/doc-page'
import { DocsPagination } from '@/features/docs/components/docs-pagination'
import { generateDocRouteMetadata, getDocRoutePage } from '@/features/docs/lib/doc-routes'

export function generateStaticParams() {
  return docsSource.generateParams('docs')
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  return generateDocRouteMetadata('docs', slug)
}

export default async function DocPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const page = await getDocRoutePage('docs', slug)
  const adjacent = docsSource.getAdjacentPages('docs', slug)

  return (
    <DocumentationPage
      page={page}
      afterBody={<DocsPagination adjacent={adjacent} />}
    />
  )
}
