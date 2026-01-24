'use server'

import { readdir, readFile } from 'fs/promises'
import matter from 'gray-matter'
import path from 'path'
import { cacheTag, cacheLife } from 'next/cache'

export interface TocItem {
  id: string
  title: string
  level: number
}

export interface DocMetadata {
  slug: string
  title: string
  description?: string
  category?: string
  publishedOn?: string
  tags?: string[]
}

export interface DocContent {
  metadata: DocMetadata
  content: string
}

const DOCS_DIR = path.join(process.cwd(), 'content/docs')
const DESIGN_SYSTEM_DIR = path.join(process.cwd(), 'content/design-system')

async function getAllDocsFromDir(dir: string): Promise<DocMetadata[]> {
  'use cache'
  cacheLife('hours')
  cacheTag('docs')

  try {
    const files = await readdir(dir, { recursive: true })
    const docs: DocMetadata[] = []

    for (const file of files) {
      const fileName = file.toString()
      if (!fileName.endsWith('.mdx')) continue

      const filePath = path.join(dir, fileName)
      const content = await readFile(filePath, 'utf8')
      const { data } = matter(content)

      docs.push({
        slug: fileName.replace(/\.mdx$/, ''),
        title: data.title || 'Untitled',
        description: data.description,
        category: data.category,
        publishedOn: data.publishedOn,
        tags: data.tags || [],
      })
    }

    return docs.sort((a, b) => {
      if (a.publishedOn && b.publishedOn) {
        return new Date(b.publishedOn).getTime() - new Date(a.publishedOn).getTime()
      }
      return 0
    })
  } catch (error) {
    console.error('Error reading docs directory:', error)
    return []
  }
}

async function getDocBySlugFromDir(slug: string, dir: string): Promise<DocContent | null> {
  'use cache'
  cacheLife('hours')
  cacheTag('docs', `doc-${slug}`)

  try {
    const decodedSlug = decodeURIComponent(slug)
    const filePath = path.join(dir, `${decodedSlug}.mdx`)
    const source = await readFile(filePath, 'utf8')
    const { data: frontmatter, content } = matter(source)

    return {
      metadata: {
        slug: decodedSlug,
        title: frontmatter.title || 'Untitled',
        description: frontmatter.description,
        category: frontmatter.category,
        publishedOn: frontmatter.publishedOn,
        tags: frontmatter.tags || [],
      },
      content,
    }
  } catch (error) {
    console.error(`Error reading doc ${slug}:`, error)
    return null
  }
}

export async function getAllDocs(): Promise<DocMetadata[]> {
  return getAllDocsFromDir(DOCS_DIR)
}

export async function getDocBySlug(slug: string): Promise<DocContent | null> {
  return getDocBySlugFromDir(slug, DOCS_DIR)
}

export async function getAllDesignSystemDocs(): Promise<DocMetadata[]> {
  return getAllDocsFromDir(DESIGN_SYSTEM_DIR)
}

export async function getDesignSystemDocBySlug(slug: string): Promise<DocContent | null> {
  return getDocBySlugFromDir(slug, DESIGN_SYSTEM_DIR)
}

export async function getDocsByCategory(category: string): Promise<DocMetadata[]> {
  const docs = await getAllDocs()
  return docs.filter(doc => doc.category === category)
}
