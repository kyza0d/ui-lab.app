export function extractHeadings(markdown: string) {
  const headingRegex = /^(#{1,3})\s+(.+)$/gm
  const headings: { level: number; title: string; id: string }[] = []
  const idCounts = new Map<string, number>()

  let match
  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length
    const title = match[2]
    let id = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')

    const count = (idCounts.get(id) || 0) + 1
    idCounts.set(id, count)
    if (count > 1) {
      id = `${id}-${count}`
    }

    headings.push({ level, title, id })
  }

  return headings
}
