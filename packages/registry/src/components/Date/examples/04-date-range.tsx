import React from 'react'
import { Date as DatePicker, Flex } from 'ui-lab-components'

export const metadata = {
  title: 'Date Range Selection',
  description: 'Two date pickers for selecting start and end dates. Useful for booking, event scheduling, or filtering data by date range. The start date is locked once selected until both dates are set.'
}

export default function Example() {
  const [startDate, setStartDate] = React.useState<Date | null>(null)
  const [endDate, setEndDate] = React.useState<Date | null>(null)

  const handleStartDateChange = (date: Date) => {
    setStartDate(date)
    // Reset end date if it's before the new start date
    if (endDate && date > endDate) {
      setEndDate(null)
    }
  }

  const handleEndDateChange = (date: Date) => {
    if (startDate && date >= startDate) {
      setEndDate(date)
    }
  }

  const formatDate = (date: Date | null) => {
    if (!date) return 'Select date'
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const daysDifference = startDate && endDate
    ? Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1
    : null

  const isEndDateDisabled = (date: Date) => {
    return !startDate || date < startDate
  }

  return (
    <Flex direction="column" gap="lg">
      <Flex direction="column" gap="md">
        <div>
          <div className="text-sm font-medium text-foreground-700 mb-2">
            Check-in Date
          </div>
          <DatePicker value={startDate} onChange={handleStartDateChange} />
        </div>

        <div>
          <div className="text-sm font-medium text-foreground-700 mb-2">
            Check-out Date
          </div>
          <DatePicker
            value={endDate}
            onChange={handleEndDateChange}
            disabled={isEndDateDisabled}
          />
        </div>
      </Flex>

      {/* Range summary */}
      <div className="p-3 bg-background-300 rounded-md">
        <div className="text-sm text-foreground-600 mb-1">
          Selected Range
        </div>
        <div className="text-foreground-900 font-medium">
          {formatDate(startDate)} → {formatDate(endDate)}
        </div>
        {daysDifference !== null && (
          <div className="text-sm text-foreground-600 mt-2">
            Duration: {daysDifference} {daysDifference === 1 ? 'day' : 'days'}
          </div>
        )}
      </div>
    </Flex>
  )
}
