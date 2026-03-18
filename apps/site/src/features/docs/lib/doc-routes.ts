import { notFound } from 'next/navigation'

import { generateMetadata as generateSiteMetadata } from '@/shared'

import { docsSource, type DocsSourceDomain } from './docs-source'

function resolveSlug(slug?: string | string[]): string | null {
  if (Array.isArray(slug)) {
    return slug.length > 0 ? slug.join('/') : null
  }

  return slug ?? null
}

async function getSourcePage(domain: DocsSourceDomain, slug?: string | string[]) {
  const resolvedSlug = resolveSlug(slug)

  if (resolvedSlug === null) {
    return docsSource.getRootPage(domain)
  }

  return docsSource.getPage(domain, resolvedSlug)
}

function getSourcePageMetadata(domain: DocsSourceDomain, slug?: string | string[]) {
  const resolvedSlug = resolveSlug(slug)

  if (resolvedSlug === null) {
    return docsSource.getRootPageMetadata(domain)
  }

  return docsSource.getPageMetadata(domain, resolvedSlug)
}

export async function getDocRoutePage(domain: DocsSourceDomain, slug?: string | string[]) {
  const page = await getSourcePage(domain, slug)

  if (!page) {
    notFound()
  }

  return page
}

export async function generateDocRouteMetadata(domain: DocsSourceDomain, slug?: string | string[]) {
  const page = getSourcePageMetadata(domain, slug)

  if (!page) {
    return generateSiteMetadata({ title: 'Not Found' })
  }

  return generateSiteMetadata({
    pathname: page.url,
    title: page.title,
    description: page.description ?? undefined,
    keywords: page.tags,
  })
}
