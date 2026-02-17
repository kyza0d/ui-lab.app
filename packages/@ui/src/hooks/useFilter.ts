import { useMemo } from 'react'

/**
 * Generic hook for filtering arrays of items based on a predicate function.
 *
 * @template T - The type of items in the array
 * @param items - The array of items to filter
 * @param predicate - Optional function that returns true if an item should be included.
 *                    If not provided, all items are returned.
 * @returns Filtered array of items, memoized to prevent unnecessary re-filtering
 *
 * @example
 * // Filter items by a custom property
 * const filtered = useFilter(items, item => item.active === true)
 *
 * @example
 * // Filter items based on search text
 * const filtered = useFilter(items, item => item.name.includes(searchText))
 *
 * @example
 * // No filtering - returns all items
 * const filtered = useFilter(items) // returns items unchanged
 */
export function useFilter<T>(items: T[], predicate?: (item: T) => boolean): T[] {
  return useMemo(() => {
    if (!predicate) return items
    return items.filter(predicate)
  }, [items, predicate])
}
