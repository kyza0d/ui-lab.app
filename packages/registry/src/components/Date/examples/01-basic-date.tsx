import React from 'react'
import { Date as DatePicker } from 'ui-lab-components'

export const metadata = {
  title: 'Basic Date',
  description: 'A simple date component for date selection with today indicator and week numbers. Click a date to select it.'
}

export default function Example() {
  const [date, setDate] = React.useState<Date | null>(null)
  return <DatePicker value={date} onChange={setDate} />
}
