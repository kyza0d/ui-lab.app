import Link from 'next/link'
import type { DocsAdjacentPages } from '../lib/docs-source'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6'

interface DocsPaginationProps {
  adjacent: DocsAdjacentPages
}

export function DocsPagination({ adjacent }: DocsPaginationProps) {
  const { prev, next } = adjacent

  if (!prev && !next) return null

  return (
    <div className="p-1 mt-16 flex items-stretch border border-background-700 rounded-sm overflow-hidden">
      {prev ? (
        <Link
          href={prev.url}
          className="rounded-sm flex items-center gap-3 px-4 py-3.5 text-foreground-300 hover:text-foreground-50 hover:bg-background-800 transition-colors text-sm"
        >
          <FaChevronLeft size={12} />
          <span>Previous</span>
        </Link>
      ) : (
        <div className="px-5 py-4" />
      )}

      <div className="flex-1" />

      {next && (
        <Link
          href={next.url}
          className="rounded-sm flex items-center hover:bg-background-800 transition-colors"
        >
          <div className="px-4 py-3.5 text-right">
            <div className="text-sm font-semibold text-foreground-50">{next.title}</div>
            {next.description && (
              <div className="text-xs text-foreground-400 mt-0.5 max-w-xs truncate">{next.description}</div>
            )}
          </div>
          <div className="flex items-center gap-3 px-5 py-4 text-foreground-300 text-sm border-l border-background-700">
            <span>Next</span>
            <FaChevronRight size={12} />
          </div>
        </Link>
      )}
    </div>
  )
}
