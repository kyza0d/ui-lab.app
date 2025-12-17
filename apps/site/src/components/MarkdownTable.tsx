'use client'

import { parseMarkdownTable } from '@/lib/table-parser'
import { Table, type Column } from './table'

interface MarkdownTableProps {
  markdown: string
}

function renderCellWithCode(value: string) {
  const parts: (string | React.ReactNode)[] = []
  let lastIndex = 0
  const codeRegex = /`([^`]+)`/g
  let match

  while ((match = codeRegex.exec(value)) !== null) {
    if (match.index > lastIndex) {
      parts.push(value.substring(lastIndex, match.index))
    }
    parts.push(
      <code key={match.index} className="text-foreground-400 bg-background-900 px-1.5 py-0.5 rounded text-sm font-mono">
        {match[1]}
      </code>
    )
    lastIndex = match.index + match[0].length
  }

  if (lastIndex < value.length) {
    parts.push(value.substring(lastIndex))
  }

  return parts.length > 0 ? parts : value
}

export function MarkdownTable({ markdown }: MarkdownTableProps) {
  try {
    const normalizedMarkdown = markdown
      .replace(/\\n/g, '\n')
      .replace(/\\`/g, '`')
    const { columns, data } = parseMarkdownTable(normalizedMarkdown)

    if (columns.length === 0 || data.length === 0) {
      return null
    }

    const enhancedColumns: Column<Record<string, string>>[] = columns.map(col => ({
      ...col,
      render: (value: string) => renderCellWithCode(value)
    }))

    return (
      <div className='mb-12 mt-2'><Table columns={enhancedColumns} data={data} /></div>
    )
  } catch (error) {
    console.error('MarkdownTable error:', error)
    return null
  }
}
