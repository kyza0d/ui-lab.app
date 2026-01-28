'use client';

import React, { useState } from 'react'
import { Group } from 'ui-lab-components'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export const metadata = {
  title: 'Pagination Controls',
  description: 'Ghost variant Group with active prop automatically styles active buttons with default variant and full border radius, while inactive buttons remain ghost.'
}

export default function Example() {
  const [currentPage, setCurrentPage] = useState(2)
  const totalPages = 8

  return (
    <div className="p-4 space-y-4">
      <div className="space-y-2 flex items-center">

        <Group variant='ghost' spacing="tight">
          <Group.Button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            isDisabled={currentPage === totalPages}
            icon={{ left: <ChevronLeft size={16} /> }}
            size="p-1"
            title="Next page"
          />
          {[1, 2, 3].map((page) => (
            <Group.Button
              key={page}
              active={currentPage === page}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </Group.Button>
          ))}
          {totalPages > 4 && (
            <Group.Button
              active={currentPage === totalPages}
              onClick={() => setCurrentPage(totalPages)}
            >
              ...
            </Group.Button>
          )}
          {totalPages > 5 && (
            <Group.Button
              active={currentPage === totalPages}
              onClick={() => setCurrentPage(totalPages)}
            >
              {totalPages}
            </Group.Button>
          )}
          <Group.Button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            isDisabled={currentPage === totalPages}
            icon={{ left: <ChevronRight size={16} /> }}
            size="p-1"
            title="Next page"
          />
        </Group>
      </div>
    </div>
  )
}
