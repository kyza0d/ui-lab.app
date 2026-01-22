'use client'

import { useState } from 'react'
import { Calendar } from './Calendar'

export default function CalendarTestPage() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  return (
    <div className="min-h-screen bg-background-950 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-foreground-50">Calendar Component</h1>
        <p className="text-foreground-400 mb-8">
          Local test environment for refining the Calendar component design
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Calendar Component */}
          <div className="flex items-center justify-center">
            <Calendar
              value={selectedDate}
              onChange={(date) => {
                setSelectedDate(date)
                console.log('Selected date:', date)
              }}
            />
          </div>

          {/* Info Panel */}
          <div className="space-y-6">
            <div className="bg-background-900 border border-background-700 rounded-md p-6">
              <h2 className="text-lg font-semibold text-foreground-50 mb-4">Selected Date</h2>
              {selectedDate ? (
                <div className="space-y-2">
                  <p className="text-foreground-300">
                    <span className="font-mono text-foreground-400">
                      {selectedDate.toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  </p>
                  <p className="text-sm text-foreground-500">
                    ISO: {selectedDate.toISOString().split('T')[0]}
                  </p>
                </div>
              ) : (
                <p className="text-foreground-500">No date selected</p>
              )}
            </div>

            <div className="bg-background-900 border border-background-700 rounded-md p-6">
              <h2 className="text-lg font-semibold text-foreground-50 mb-4">Features</h2>
              <ul className="space-y-2 text-sm text-foreground-400">
                <li className="flex items-start gap-2">
                  <span className="text-accent-500 mt-1">•</span>
                  <span>Monochrome color scheme</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-500 mt-1">•</span>
                  <span>Chevron navigation icons</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-500 mt-1">•</span>
                  <span>7-column grid (no week numbers)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-500 mt-1">•</span>
                  <span>Keyboard navigation (arrow keys, Enter)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-500 mt-1">•</span>
                  <span>Focus management and accessibility</span>
                </li>
              </ul>
            </div>

            <div className="bg-background-900 border border-background-700 rounded-md p-6">
              <h2 className="text-lg font-semibold text-foreground-50 mb-4">Keyboard Shortcuts</h2>
              <ul className="space-y-1 text-sm text-foreground-400">
                <li><span className="font-mono text-foreground-300">↑/↓</span> Navigate weeks</li>
                <li><span className="font-mono text-foreground-300">←/→</span> Navigate days</li>
                <li><span className="font-mono text-foreground-300">Home/End</span> First/last day of month</li>
                <li><span className="font-mono text-foreground-300">PgUp/PgDn</span> Previous/next month</li>
                <li><span className="font-mono text-foreground-300">Enter/Space</span> Select date</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
