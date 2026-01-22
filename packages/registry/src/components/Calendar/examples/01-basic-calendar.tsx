import React from 'react'
import { Calendar } from 'ui-lab-components'

export const metadata = {
  title: 'Basic Calendar',
  description: 'A simple calendar for date selection with today indicator and week numbers. Click a date to select it.'
}

export default function Example() {
  const [date, setDate] = React.useState<Date | null>(null)
  return <Calendar value={date} onChange={setDate} />
}
