import { readdir, readFile } from 'fs/promises'
import matter from 'gray-matter'
import path from 'path'
import { cacheTag, cacheLife } from 'next/cache'

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

export async function getAllDocs(): Promise<DocMetadata[]> {
  'use cache'
  cacheLife('hours')
  cacheTag('docs')

  try {
    const files = await readdir(DOCS_DIR, { recursive: true })
    const docs: DocMetadata[] = []

    for (const file of files) {
      const fileName = file.toString()
      if (!fileName.endsWith('.mdx')) continue

      const filePath = path.join(DOCS_DIR, fileName)
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

export async function getDocBySlug(slug: string): Promise<DocContent | null> {
  'use cache'
  cacheLife('hours')
  cacheTag('docs', `doc-${slug}`)

  try {
    const filePath = path.join(DOCS_DIR, `${slug}.mdx`)
    const source = await readFile(filePath, 'utf8')
    const { data: frontmatter, content } = matter(source)

    return {
      metadata: {
        slug,
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

export async function getDocsByCategory(category: string): Promise<DocMetadata[]> {
  const docs = await getAllDocs()
  return docs.filter(doc => doc.category === category)
}

export function extractHeadings(markdown: string) {
  const headingRegex = /^(#{1,3})\s+(.+)$/gm
  const headings: { level: number; title: string; id: string }[] = []

  let match
  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length
    const title = match[2]
    const id = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')

    headings.push({ level, title, id })
  }

  return headings
}
