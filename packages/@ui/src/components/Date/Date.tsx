"use client"

import * as React from "react"
import { useFocusRing, useHover, mergeProps } from "react-aria"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import styles from "./Date.module.css"

/**
 * Context type for Date state management
 */
export interface DateContextValue {
  selectedDate: Date | null
  focusedDate: Date | null
  currentMonth: Date | null
  selectDate: (date: Date) => void
  focusDate: (date: Date) => void
  navigateMonth: (offset: number) => void
  isDateDisabled: (date: Date) => boolean
  isDateOutOfRange: (date: Date) => boolean
}

const DateContext = React.createContext<DateContextValue | null>(null)

export function useDateContext() {
  const context = React.useContext(DateContext)
  if (!context) {
    throw new Error("Date component must be used within Date root")
  }
  return context
}

/**
 * Props for Date component
 */
export interface DateProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  value?: Date | null
  onChange?: (date: Date) => void
  disabled?: (date: Date) => boolean
  minDate?: Date
  maxDate?: Date
  defaultMonth?: Date
}

/**
 * Helper functions for date calculations
 */
function getDaysInMonth(date: Date): number {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
}

function getFirstDayOfMonth(date: Date): number {
  return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
}

function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  )
}

function isToday(date: Date): boolean {
  return isSameDay(date, new Date())
}

/**
 * Date grid computation
 */
function getDateGrid(currentMonth: Date): Date[][] {
  const daysInMonth = getDaysInMonth(currentMonth)
  const firstDay = getFirstDayOfMonth(currentMonth)

  const grid: Date[] = []

  // Handle previous month's days
  if (firstDay > 0) {
    const prevMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 0)
    const daysInPrevMonth = getDaysInMonth(prevMonth)

    for (let i = firstDay - 1; i >= 0; i--) {
      const date = new Date(prevMonth.getFullYear(), prevMonth.getMonth(), daysInPrevMonth - i)
      grid.push(date)
    }
  }

  // Current month days
  for (let i = 1; i <= daysInMonth; i++) {
    grid.push(new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i))
  }

  // Pad with next month's days
  while (grid.length % 7 !== 0) {
    const nextDay = grid.length - (grid.length - daysInMonth - firstDay) + 1
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, nextDay)
    grid.push(date)
  }

  // Convert to rows
  const rows: Date[][] = []
  for (let i = 0; i < grid.length; i += 7) {
    rows.push(grid.slice(i, i + 7))
  }

  return rows
}

const DatePicker = React.forwardRef<HTMLDivElement, DateProps>(
  (
    {
      value: controlledValue,
      onChange,
      disabled: disabledProp = () => false,
      minDate,
      maxDate,
      defaultMonth,
      className,
      ...props
    },
    ref
  ) => {
    const [uncontrolledValue, setUncontrolledValue] = React.useState<Date | null>(null)
    const [currentMonth, setCurrentMonth] = React.useState<Date | null>(null)
    const [focusedDate, setFocusedDate] = React.useState<Date | null>(null)

    const selectedDate = controlledValue !== undefined ? controlledValue : uncontrolledValue

    // Initialize currentMonth on client side only
    React.useEffect(() => {
      if (currentMonth === null) {
        setCurrentMonth(defaultMonth ?? new Date())
      }
    }, [defaultMonth])

    const isDateDisabled = React.useCallback(
      (date: Date): boolean => {
        if (disabledProp(date)) return true
        if (minDate && date < minDate) return true
        if (maxDate && date > maxDate) return true
        return false
      },
      [disabledProp, minDate, maxDate]
    )

    const isDateOutOfRange = React.useCallback(
      (date: Date): boolean => {
        if (!currentMonth) return false
        return (
          date.getMonth() !== currentMonth.getMonth() ||
          date.getFullYear() !== currentMonth.getFullYear()
        )
      },
      [currentMonth]
    )

    const selectDate = React.useCallback(
      (date: Date) => {
        if (!isDateDisabled(date)) {
          if (controlledValue === undefined) {
            setUncontrolledValue(date)
          }
          onChange?.(date)
          setFocusedDate(null)
        }
      },
      [controlledValue, onChange, isDateDisabled]
    )

    const focusDate = React.useCallback((date: Date) => {
      setFocusedDate(date)
    }, [])

    const navigateMonth = React.useCallback((offset: number) => {
      setCurrentMonth(prev => {
        if (!prev) return new Date()
        const newMonth = new Date(prev.getFullYear(), prev.getMonth() + offset, 1)
        return newMonth
      })
    }, [])

    const dateGrid = React.useMemo(
      () => currentMonth ? getDateGrid(currentMonth) : [],
      [currentMonth]
    )

    const contextValue: DateContextValue = React.useMemo(
      () => ({
        selectedDate,
        focusedDate,
        currentMonth,
        selectDate,
        focusDate,
        navigateMonth,
        isDateDisabled,
        isDateOutOfRange,
      }),
      [selectedDate, focusedDate, currentMonth, selectDate, focusDate, navigateMonth, isDateDisabled, isDateOutOfRange]
    )

    const handleKeyDown = React.useCallback(
      (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (!focusedDate) return

        let newFocusedDate: Date | null = null

        switch (e.key) {
          case "ArrowUp":
            e.preventDefault()
            newFocusedDate = new Date(focusedDate.getFullYear(), focusedDate.getMonth(), focusedDate.getDate() - 7)
            break
          case "ArrowDown":
            e.preventDefault()
            newFocusedDate = new Date(focusedDate.getFullYear(), focusedDate.getMonth(), focusedDate.getDate() + 7)
            break
          case "ArrowLeft":
            e.preventDefault()
            newFocusedDate = new Date(focusedDate.getFullYear(), focusedDate.getMonth(), focusedDate.getDate() - 1)
            break
          case "ArrowRight":
            e.preventDefault()
            newFocusedDate = new Date(focusedDate.getFullYear(), focusedDate.getMonth(), focusedDate.getDate() + 1)
            break
          case "Home":
            e.preventDefault()
            newFocusedDate = new Date(focusedDate.getFullYear(), focusedDate.getMonth(), 1)
            break
          case "End":
            e.preventDefault()
            const daysInMonth = getDaysInMonth(focusedDate)
            newFocusedDate = new Date(focusedDate.getFullYear(), focusedDate.getMonth(), daysInMonth)
            break
          case "PageUp":
            e.preventDefault()
            navigateMonth(-1)
            return
          case "PageDown":
            e.preventDefault()
            navigateMonth(1)
            return
          case "Enter":
          case " ":
            e.preventDefault()
            selectDate(focusedDate)
            return
        }

        if (newFocusedDate) {
          setFocusedDate(newFocusedDate)
          // Auto-navigate month if needed
          if (currentMonth && (newFocusedDate.getMonth() !== currentMonth.getMonth() || newFocusedDate.getFullYear() !== currentMonth.getFullYear())) {
            setCurrentMonth(new Date(newFocusedDate.getFullYear(), newFocusedDate.getMonth(), 1))
          }
        }
      },
      [focusedDate, currentMonth, selectDate, navigateMonth]
    )

    // Set initial focus to today or selected date
    React.useEffect(() => {
      if (!focusedDate) {
        const dateToFocus = selectedDate ?? new Date()
        setFocusedDate(dateToFocus)
      }
    }, [])

    // Don't render until currentMonth is initialized on client
    if (!currentMonth) {
      return (
        <div
          ref={ref}
          className={cn("date", styles.date, className)}
          role="application"
          aria-label="Date picker calendar"
          {...props}
        />
      )
    }

    return (
      <DateContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={cn("date", styles.date, className)}
          role="application"
          aria-label="Date picker calendar"
          onKeyDown={handleKeyDown}
          {...props}
        >
          <DateHeader />
          <DateGrid grid={dateGrid} />
        </div>
      </DateContext.Provider>
    )
  }
)

DatePicker.displayName = "Date"

/**
 * Date Header component
 */
interface DateHeaderProps extends React.HTMLAttributes<HTMLDivElement> { }

const DateHeader = React.forwardRef<HTMLDivElement, DateHeaderProps>(
  ({ className, ...props }, ref) => {
    const { currentMonth, navigateMonth } = useDateContext()

    const monthYear = currentMonth ? currentMonth.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    }) : ""

    return (
      <div
        ref={ref}
        className={cn("date-header", styles.header, className)}
        {...props}
      >
        <button
          onClick={() => navigateMonth(-1)}
          className={cn("date-prev-button", styles.navButton)}
          aria-label="Previous month"
        >
          <ChevronLeft size={20} />
        </button>
        <div className={cn("date-month-year", styles.monthYear)}>
          {monthYear}
        </div>
        <button
          onClick={() => navigateMonth(1)}
          className={cn("date-next-button", styles.navButton)}
          aria-label="Next month"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    )
  }
)

DateHeader.displayName = "Date.Header"

/**
 * Date Grid component
 */
interface DateGridProps extends React.HTMLAttributes<HTMLDivElement> {
  grid: Date[][]
}

const DateGrid = React.forwardRef<HTMLDivElement, DateGridProps>(
  ({ grid, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("date-grid", styles.grid, className)}
        role="grid"
        {...props}
      >
        {/* Week headers */}
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className={cn("date-day-header", styles.weekHeader)}
            role="columnheader"
          >
            {day}
          </div>
        ))}

        {/* Date rows */}
        {grid.map((week: Date[], weekIndex: number) => {
          return (
            <React.Fragment key={weekIndex}>
              {week.map((date: Date, dayIndex: number) => (
                <DateDay key={`${weekIndex}-${dayIndex}`} date={date} />
              ))}
            </React.Fragment>
          )
        })}
      </div>
    )
  }
)

DateGrid.displayName = "Date.Grid"

/**
 * Date Day component
 */
interface DateDayProps extends React.HTMLAttributes<HTMLButtonElement> {
  date: Date
}

const DateDay = React.forwardRef<HTMLButtonElement, DateDayProps>(
  ({ date, className, onClick, ...props }, _ref) => {
    const {
      selectedDate,
      focusedDate,
      selectDate,
      focusDate,
      isDateDisabled,
      isDateOutOfRange,
    } = useDateContext()

    const isDisabled = isDateDisabled(date)

    const buttonRef = React.useRef<HTMLButtonElement>(null)
    const { focusProps, isFocusVisible } = useFocusRing()
    const { hoverProps } = useHover({ isDisabled })

    const isSelected = selectedDate ? isSameDay(date, selectedDate) : false
    const isFocused = focusedDate ? isSameDay(date, focusedDate) : false
    const isCurrentToday = isToday(date)
    const isOutOfRange = isDateOutOfRange(date)

    const handleClick = React.useCallback(
      (e: React.MouseEvent<HTMLButtonElement>) => {
        selectDate(date)
        focusDate(date)
        onClick?.(e)
      },
      [date, selectDate, focusDate, onClick]
    )

    const handleFocus = React.useCallback(() => {
      focusDate(date)
    }, [date, focusDate])

    React.useEffect(() => {
      if (isFocused && buttonRef.current) {
        buttonRef.current.focus({ preventScroll: true })
      }
    }, [isFocused])

    return (
      <button
        ref={buttonRef}
        onClick={handleClick}
        onFocus={handleFocus}
        className={cn("date-day", styles.dayCell, className)}
        data-selected={isSelected ? "true" : undefined}
        data-today={isCurrentToday ? "true" : undefined}
        data-disabled={isDisabled ? "true" : undefined}
        data-out-of-range={isOutOfRange ? "true" : undefined}
        data-focus-visible={isFocusVisible && isFocused ? "true" : undefined}
        disabled={isDisabled}
        aria-selected={isSelected}
        aria-label={date.toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
        })}
        {...mergeProps(focusProps, hoverProps, props)}
      >
        {date.getDate()}
      </button>
    )
  }
)

DateDay.displayName = "Date.Day"

export { DatePicker as Date, DateHeader, DateGrid, DateDay }
