import React from 'react'
import { Date as DatePicker } from 'ui-lab-components'

export const metadata = {
  title: 'Date with Disabled Dates',
  description: 'Date component with certain dates disabled (weekends). Disabled dates cannot be selected.'
}

export default function Example() {
  const [date, setDate] = React.useState<Date | null>(null)

  const isDisabled = React.useCallback(
    (dateToCompare: Date) => {
      const day = dateToCompare.getDay()
      return day === 0 || day === 6 // Disable weekends only
    },
    []
  )

  return <DatePicker value={date} onChange={setDate} disabled={isDisabled} />
}

