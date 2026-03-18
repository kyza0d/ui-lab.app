import { DocPage } from '@/features/docs/components/doc-page'
import { generateDocRouteMetadata, getDocRoutePage } from '@/features/docs/lib/doc-routes'
import { docsSource } from '@/features/docs/lib/docs-source'

export function generateStaticParams() {
  return docsSource
    .generateParams('design-system')
    .map(({ slug }) => ({ slug: [slug] }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = await params
  return generateDocRouteMetadata('design-system', slug)
}

export default async function DesignSystemPage({
  params,
}: {
  params: Promise<{ slug?: string[] }>
}) {
  const { slug } = await params
  const page = await getDocRoutePage('design-system', slug)

  return <DocPage page={page} />
}
