import React from 'react'
import { Calendar } from 'ui-lab-components'

export const metadata = {
  title: 'Calendar with Disabled Dates',
  description: 'Calendar with certain dates disabled (weekends and past dates). Disabled dates cannot be selected.'
}

export default function Example() {
  const [date, setDate] = React.useState<Date | null>(null)

  const isDisabled = (date: Date) => {
    const day = date.getDay()
    const isPastDate = date < new Date()
    return day === 0 || day === 6 || isPastDate
  }

  return <Calendar value={date} onChange={setDate} disabled={isDisabled} />
}
