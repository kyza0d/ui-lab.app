import React from 'react'
import { Date as DatePicker, Button, Flex } from 'ui-lab-components'

export const metadata = {
  title: 'Controlled Mode',
  description: 'Date picker with controlled value and external state management. Includes a "Today" button to programmatically set the current date.'
}

export default function Example() {
  const [date, setDate] = React.useState<Date | null>(null)

  const handleSetToday = () => {
    setDate(new Date())
  }

  const handleClear = () => {
    setDate(null)
  }

  const formatDate = (d: Date | null) => {
    if (!d) return 'No date selected'
    return d.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <Flex direction="column" gap="md">
      <Flex gap="sm">
        <Button variant="primary" onClick={handleSetToday}>
          Today
        </Button>
        <Button variant="outline" onClick={handleClear}>
          Clear
        </Button>
      </Flex>
      <div className="text-sm text-foreground-400">
        Selected: {formatDate(date)}
      </div>
      <DatePicker value={date} onChange={setDate} />
    </Flex>
  )
}
