import type { Column } from '../components/table'

export interface ParsedTable {
  columns: Column<Record<string, string>>[]
  data: Record<string, string>[]
}

export function parseMarkdownTable(markdown: string): ParsedTable {
  const lines = markdown
    .trim()
    .split('\n')
    .map(line => line.trim())
    .filter(line => line && line.startsWith('|') && line.endsWith('|'))

  if (lines.length < 2) {
    return { columns: [], data: [] }
  }

  const headerRow = lines[0]
  const headers = headerRow
    .split('|')
    .map(cell => cell.trim())
    .filter(cell => cell.length > 0)

  const columns: Column<Record<string, string>>[] = headers.map(label => ({
    key: label.toLowerCase().replace(/\s+/g, '_') as any,
    label,
  }))

  const dataRows = lines.slice(2)
  const data = dataRows.map(row => {
    const cells = row
      .split('|')
      .map(cell => cell.trim())
      .filter(cell => cell.length > 0)

    const obj: Record<string, string> = {}
    headers.forEach((header, index) => {
      const key = header.toLowerCase().replace(/\s+/g, '_')
      obj[key] = cells[index] || ''
    })

    return obj
  })

  return { columns, data }
}
