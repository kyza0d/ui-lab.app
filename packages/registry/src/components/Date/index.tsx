import React from 'react'
import { Date } from 'ui-lab-components'
import { ControlDef, ComponentDetail } from '@/types'
import Example1, { metadata as metadata1 } from './examples/01-basic-date.js'
import Example2, { metadata as metadata2 } from './examples/02-with-disabled-dates.js'
import examplesJson from './examples.json'
import { loadComponentExamples } from '../../utils/load-component-examples'

export function getPreview(): React.ReactNode {
  return (
    <div style={{ width: "80%", maxWidth: "110px" }} className="rounded-sm overflow-hidden border border-background-700 flex flex-col gap-1 p-1">
      {/* Header */}
      <div className='h-4 gap-1 flex items-center justify-between border-b border-background-700 pb-1'>
        <div style={{ width: 8, height: 8, backgroundColor: "var(--background-500)" }} className='opacity-20 rounded-sm'></div>
        <div style={{ width: 40, height: 6, backgroundColor: "var(--background-500)" }} className='opacity-20 rounded-sm'></div>
        <div style={{ width: 8, height: 8, backgroundColor: "var(--background-500)" }} className='opacity-20 rounded-sm'></div>
      </div>

      {/* Mini calendar grid */}
      <div className='grid gap-0.5' style={{ gridTemplateColumns: 'repeat(7, 1fr)' }}>
        {[...Array(28)].map((_, i) => (
          <div key={`day-${i}`} style={{ width: 10, height: 10, backgroundColor: "var(--background-500)" }} className='opacity-15 rounded-sm'></div>
        ))}
      </div>
    </div>
  )
}

const examplesData = [
  { id: '01-basic-date', Component: Example1, metadata: metadata1 },
  { id: '02-with-disabled-dates', Component: Example2, metadata: metadata2 },
]

const dateControls: ControlDef[] = []

const dateBasicCode = `import React from 'react'
import { Date } from "ui-lab-components"

export function Example() {
  const [date, setDate] = React.useState<Date | null>(null)
  return <Date value={date} onChange={setDate} />
}`

export const dateDetail: ComponentDetail = {
  id: 'date',
  name: 'Date',
  description: 'A minimal, modern date component for date selection with keyboard navigation and accessibility support.',
  overview: (
    <div className="space-y-4 text-foreground-300">
      <p>
        The Date component provides a clean, accessible way to select dates. It features a single-month grid view with today indicator, ISO week numbers, and full keyboard navigation support.
      </p>
      <p>
        Built with React Aria for accessibility, it supports keyboard-only navigation, screen reader announcements, and customizable date disabling through a callback function.
      </p>
    </div>
  ),
  examples: [
    {
      id: 'preview',
      title: 'Preview',
      description: 'Interactive date for date selection',
      code: dateBasicCode,
      preview: <Date />,
      controls: dateControls,
      renderPreview: (props: any) => (
        <Date />
      ),
    },
    ...loadComponentExamples(examplesData, examplesJson),
  ],
}
