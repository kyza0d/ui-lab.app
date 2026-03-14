"use client"

import * as React from "react"

import { mergeProps, } from "@react-aria/utils";
import { useHover } from "@react-aria/interactions";
import { useFocusRing } from "@react-aria/focus"

import { ChevronLeft, ChevronRight } from "lucide-react"

import { type StyleValue, cn } from "@/lib/utils"
import { type StylesProp, createStylesResolver } from "@/lib/styles"

import dateModuleStyles from "./Date.module.css"

// Alias global Date to avoid shadowing by component name
const NativeDate = globalThis.Date;

export interface DateStyleSlots {
  root?: StyleValue;
  header?: StyleValue;
  "day-headers"?: StyleValue;
  grid?: StyleValue;
  "day-cell"?: StyleValue; // individual date button
}

export type DateStylesProp = StylesProp<DateStyleSlots>;

const dateStyleSlotKeys = ['root', 'header', 'day-headers', 'grid', 'day-cell'] as const;
const resolveDateBaseStyles = createStylesResolver(dateStyleSlotKeys);

function normalizeDateStyles(styles: DateStylesProp | undefined) {
  if (!styles || typeof styles === "string" || Array.isArray(styles)) {
    return styles;
  }

  return {
    root: styles.root,
    header: styles.header,
    "day-headers": styles["day-headers"],
    grid: styles.grid,
    "day-cell": styles["day-cell"],
  };
}

/**
 * Context type for Calendar state management
 */
export interface DateContextValue {
  selectedDate: Date | null
  focusedDate: Date | null
  currentMonth: Date | null
  today: Date | null
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
 * Props for Calendar component
 */
export interface DateProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Controlled selected date */
  value?: Date | null
  /** Called when the user selects a date */
  onChange?: (date: Date) => void
  /** Function returning true for dates that should be unselectable */
  disabled?: (date: Date) => boolean
  /** Earliest selectable date */
  minDate?: Date
  /** Latest selectable date */
  maxDate?: Date
  /** Month shown initially when no date is selected */
  defaultMonth?: Date;
  /** Classes applied to the root or named slots. Accepts a string, cn()-compatible array, slot object, or array of any of those. */
  styles?: DateStylesProp;
}

/**
 * Helper functions for date calculations
 */
function getDaysInMonth(date: Date): number {
  return new NativeDate(date.getFullYear(), date.getMonth() + 1, 0).getDate()
}

function getFirstDayOfMonth(date: Date): number {
  return new NativeDate(date.getFullYear(), date.getMonth(), 1).getDay()
}

function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  )
}

function isToday(date: Date, today: Date | null): boolean {
  if (!today) return false;
  return isSameDay(date, today)
}

/**
 * Calendar grid computation
 */
function getCalendarGrid(currentMonth: Date | null): Date[][] {
  if (!currentMonth) return [];

  const daysInMonth = getDaysInMonth(currentMonth)
  const firstDay = getFirstDayOfMonth(currentMonth)

  const grid: Date[] = []

  // Handle previous month's days
  if (firstDay > 0) {
    const prevMonth = new NativeDate(currentMonth.getFullYear(), currentMonth.getMonth(), 0)
    const daysInPrevMonth = getDaysInMonth(prevMonth)

    for (let i = firstDay - 1; i >= 0; i--) {
      const date = new NativeDate(prevMonth.getFullYear(), prevMonth.getMonth(), daysInPrevMonth - i)
      grid.push(date)
    }
  }

  // Current month days
  for (let i = 1; i <= daysInMonth; i++) {
    grid.push(new NativeDate(currentMonth.getFullYear(), currentMonth.getMonth(), i))
  }

  // Pad with next month's days
  while (grid.length % 7 !== 0) {
    const nextDay = grid.length - firstDay - daysInMonth + 1
    const date = new NativeDate(currentMonth.getFullYear(), currentMonth.getMonth() + 1, nextDay)
    grid.push(date)
  }

  // Convert to rows
  const rows: Date[][] = []
  for (let i = 0; i < grid.length; i += 7) {
    rows.push(grid.slice(i, i + 7))
  }

  return rows
}

const Date = React.forwardRef<HTMLDivElement, DateProps>(
  (
    {
      value: controlledValue,
      onChange,
      disabled: disabledProp = () => false,
      minDate,
      maxDate,
      defaultMonth,
      className,
      styles,
      ...props
    },
    ref
  ) => {
    const [uncontrolledValue, setUncontrolledValue] = React.useState<Date | null>(null)
    const [today, setToday] = React.useState<Date | null>(null)
    const [currentMonth, setCurrentMonth] = React.useState<Date | null>(null)
    const [focusedDate, setFocusedDate] = React.useState<Date | null>(null)

    const selectedDate = controlledValue !== undefined ? controlledValue : uncontrolledValue

    const resolved = resolveDateBaseStyles(normalizeDateStyles(styles));

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
        if (!currentMonth) return false;
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
        const baseDate = prev ?? new NativeDate(); // Handle null prev
        const newMonth = new NativeDate(baseDate.getFullYear(), baseDate.getMonth() + offset, 1)
        return newMonth
      })
    }, [])

    const calendarGrid = React.useMemo(
      () => currentMonth ? getCalendarGrid(currentMonth) : [],
      [currentMonth]
    )

    const contextValue: DateContextValue = React.useMemo(
      () => ({
        selectedDate,
        focusedDate,
        currentMonth,
        today,
        selectDate,
        focusDate,
        navigateMonth,
        isDateDisabled,
        isDateOutOfRange,
      }),
      [selectedDate, focusedDate, currentMonth, today, selectDate, focusDate, navigateMonth, isDateDisabled, isDateOutOfRange]
    )

    const handleKeyDown = React.useCallback(
      (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (!focusedDate) return

        let newFocusedDate: Date | null = null

        switch (e.key) {
          case "ArrowUp":
            e.preventDefault()
            newFocusedDate = new NativeDate(focusedDate.getFullYear(), focusedDate.getMonth(), focusedDate.getDate() - 7)
            break
          case "ArrowDown":
            e.preventDefault()
            newFocusedDate = new NativeDate(focusedDate.getFullYear(), focusedDate.getMonth(), focusedDate.getDate() + 7)
            break
          case "ArrowLeft":
            e.preventDefault()
            newFocusedDate = new NativeDate(focusedDate.getFullYear(), focusedDate.getMonth(), focusedDate.getDate() - 1)
            break
          case "ArrowRight":
            e.preventDefault()
            newFocusedDate = new NativeDate(focusedDate.getFullYear(), focusedDate.getMonth(), focusedDate.getDate() + 1)
            break
          case "Home":
            e.preventDefault()
            newFocusedDate = new NativeDate(focusedDate.getFullYear(), focusedDate.getMonth(), 1)
            break
          case "End":
            e.preventDefault()
            const daysInMonth = getDaysInMonth(focusedDate)
            newFocusedDate = new NativeDate(focusedDate.getFullYear(), focusedDate.getMonth(), daysInMonth)
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
          if (newFocusedDate.getMonth() !== currentMonth!.getMonth() || newFocusedDate.getFullYear() !== currentMonth!.getFullYear()) {
            setCurrentMonth(new NativeDate(newFocusedDate.getFullYear(), newFocusedDate.getMonth(), 1))
          }
        }
      },
      [focusedDate, currentMonth, selectDate, navigateMonth]
    )

    // Set initial focus, today, and current month on client mount
    React.useEffect(() => {
      const now = new NativeDate()
      setToday(now)

      if (currentMonth === null) { // Only set if not yet initialized
        setCurrentMonth(defaultMonth ?? now)
      }

      if (focusedDate === null) { // Only set if not yet initialized
        setFocusedDate(selectedDate ?? now)
      }
    }, [defaultMonth, currentMonth, focusedDate, selectedDate]) // Add relevant dependencies

    return (
      <DateContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={cn("date", dateModuleStyles.calendar, className, resolved.root)}
          role="application"
          aria-label="Date picker calendar"
          onKeyDown={handleKeyDown}
          {...props}
        >
          {currentMonth && (
            <>
              <DateHeader className={resolved.header} />
              <DateDayHeaders className={resolved["day-headers"]} />
              <DateGrid grid={calendarGrid} className={resolved.grid} dayCellClassName={resolved["day-cell"]} />
            </>
          )}
        </div>
      </DateContext.Provider>
    )
  }
)

Date.displayName = "Date"

/**
 * Calendar Header component
 */
interface DateHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Additional CSS class for the header */
  className?: string;
}

/** Navigation header with month/year display and prev/next controls */
const DateHeader = React.forwardRef<HTMLDivElement, DateHeaderProps>(
  ({ className, ...props }, ref) => {
    const { currentMonth, navigateMonth } = useDateContext()

    const monthYear = currentMonth
      ? currentMonth.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
      : ""

    return (
      <div
        ref={ref}
        className={cn("date", "date-header", dateModuleStyles.header, className)}
        {...props}
      >
        <div className={cn("date-month-year", dateModuleStyles["month-year"])}>
          {monthYear}
        </div>
        <div>
          <button
            onClick={() => navigateMonth(-1)}
            className={cn("date", "date-nav-button", "date-prev-button", dateModuleStyles["nav-button"])}
            aria-label="Previous month"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => navigateMonth(1)}
            className={cn("date", "date-nav-button", "date-next-button", dateModuleStyles["nav-button"])}
            aria-label="Next month"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    )
  }
)

DateHeader.displayName = "Date.Header"

/**
 * Calendar Day Headers component
 */
interface DateDayHeadersProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Additional CSS class for the day headers row */
  className?: string;
}

/** Row of weekday abbreviation labels above the calendar grid */
const DateDayHeaders = React.forwardRef<HTMLDivElement, DateDayHeadersProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("date", "date-day-headers", dateModuleStyles["day-headers"], className)}
        {...props}
      >
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className={cn("date", "date-day-header", dateModuleStyles["day-header"])}
          >
            {day}
          </div>
        ))}
      </div>
    )
  }
)

DateDayHeaders.displayName = "Date.DayHeaders"

/**
 * Calendar Grid component
 */
interface DateGridProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Calendar grid rows, each containing 7 Date objects */
  grid: Date[][]
  /** Classes applied to each individual date cell (DateDay component) */
  dayCellClassName?: string;
}

/** The 7-column calendar grid containing date cells */
const DateGrid = React.forwardRef<HTMLDivElement, DateGridProps>(
  ({ grid, className, dayCellClassName, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("date", "date-grid", dateModuleStyles.grid, className)}
        role="grid"
        {...props}
      >
        {/* Week headers */}
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className={cn("date-day-header", dateModuleStyles["week-header"])}
            role="columnheader"
          >
            {day}
          </div>
        ))}

        {/* Calendar rows */}
        {grid.map((week: Date[], weekIndex: number) => {
          return (
            <React.Fragment key={weekIndex}>
              {week.map((date: Date, dayIndex: number) => (
                <DateDay key={`${weekIndex}-${dayIndex}`} date={date} className={dayCellClassName} />
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
 * Calendar Day component
 */
interface DateDayProps extends React.HTMLAttributes<HTMLButtonElement> {
  /** The date this cell represents */
  date: Date
}
/**
 * Individual date cell in the calendar grid
 */
const DateDay = React.forwardRef<HTMLButtonElement, DateDayProps>(
  ({ date, className, onClick, ...props }, ref) => {
    const {
      selectedDate,
      focusedDate,
      today,
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
    const isCurrentToday = isToday(date, today)
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
        className={cn("date", "date-day", dateModuleStyles["day-cell"], className)}
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

export { Date, DateDayHeaders, DateHeader, DateGrid, DateDay }
