'use client';

import React, { useState } from 'react'
import { Group } from 'ui-lab-components'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export const metadata = {
  title: 'Pagination Controls',
  description: 'Previous/Next navigation with page indicators. Demonstrates button sizing and state management for data pagination.'
}

export default function Example() {
  const [currentPage, setCurrentPage] = useState(2)
  const totalPages = 8

  return (
    <div className="p-4 space-y-4">
      <div className="space-y-2">
        <Group orientation="horizontal" spacing="none">
          <Group.Button
            variant="ghost"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            isDisabled={currentPage === 1}
            title="Previous page"
          >
            <ChevronLeft size={16} />
          </Group.Button>

          {[1, 2, 3].map((page) => (
            <Group.Button
              key={page}
              variant={currentPage === page ? 'default' : 'outline'}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </Group.Button>
          ))}

          {currentPage > 5 && (
            <span className="text-foreground-500 text-xs px-2 flex items-center">…</span>
          )}

          {totalPages > 3 && (
            <Group.Button
              variant={currentPage === totalPages ? 'default' : 'outline'}
              onClick={() => setCurrentPage(totalPages)}
            >
              {totalPages}
            </Group.Button>
          )}

          <Group.Button
            variant="ghost"
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            isDisabled={currentPage === totalPages}
            title="Next page"
          >
            <ChevronRight size={16} />
          </Group.Button>
        </Group>
      </div>
    </div>
  )
}
