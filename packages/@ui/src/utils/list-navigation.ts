import * as React from "react"
import { type Key } from "react-aria"

export interface ItemData {
  key: Key
  textValue: string
  isDisabled?: boolean
  icon?: React.ReactNode
}

export function useMergedRef<T>(...refs: any[]) {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return React.useCallback((el: T | null) => {
    for (const ref of refs) {
      if (typeof ref === "function") ref(el)
      else if (ref) ref.current = el
    }
  }, refs)
}

export function scrollItemIntoView(el: HTMLElement) {
  let scroller: HTMLElement | null = el.parentElement
  while (scroller && scroller !== document.body && scroller.scrollHeight <= scroller.clientHeight) {
    scroller = scroller.parentElement
  }
  if (!scroller || scroller === document.body) return

  const scrollerRect = scroller.getBoundingClientRect()
  const itemRect = el.getBoundingClientRect()
  const buffer = el.offsetHeight * 2

  const itemTop = itemRect.top - scrollerRect.top
  const itemBottom = itemRect.bottom - scrollerRect.top

  if (itemTop < buffer) {
    scroller.scrollTo({ top: Math.max(0, scroller.scrollTop + itemTop - buffer), behavior: 'smooth' })
  } else if (itemBottom > scroller.clientHeight - buffer) {
    scroller.scrollTo({ top: scroller.scrollTop + itemBottom - scroller.clientHeight + buffer, behavior: 'smooth' })
  }
}

interface ListKeyboardActions {
  navigateNext: () => void
  navigatePrev: () => void
  confirm: () => void
  close: () => void
  filteredItems: ItemData[]
  setFocusedKey: React.Dispatch<React.SetStateAction<Key | null>>
  requireCtrlForHomeEnd?: boolean
}

export function handleListKeyDown(e: React.KeyboardEvent, a: ListKeyboardActions): boolean {
  switch (e.key) {
    case 'ArrowDown':
      e.preventDefault()
      a.navigateNext()
      return true
    case 'ArrowUp':
      e.preventDefault()
      a.navigatePrev()
      return true
    case 'Enter':
      e.preventDefault()
      a.confirm()
      return true
    case ' ':
      if (document.activeElement?.tagName !== 'INPUT') {
        e.preventDefault()
        a.confirm()
        return true
      }
      return false
    case 'Escape':
      e.preventDefault()
      a.close()
      return true
    case 'Home': {
      if (a.requireCtrlForHomeEnd && !e.ctrlKey) return false
      e.preventDefault()
      const first = a.filteredItems.find(item => !item.isDisabled)
      if (first) a.setFocusedKey(first.key)
      return true
    }
    case 'End': {
      if (a.requireCtrlForHomeEnd && !e.ctrlKey) return false
      e.preventDefault()
      const last = [...a.filteredItems].reverse().find(item => !item.isDisabled)
      if (last) a.setFocusedKey(last.key)
      return true
    }
    default:
      return false
  }
}

export interface UseListNavigationOptions {
  isOpen: boolean
  externalItems?: ItemData[]
}

export function useListNavigation({ isOpen, externalItems }: UseListNavigationOptions) {
  const registeredItemsRef = React.useRef<Map<Key, ItemData>>(new Map())
  const [registeredItems, setRegisteredItems] = React.useState<ItemData[]>([])
  const [searchValue, setSearchValue] = React.useState("")
  const [focusedKey, setFocusedKey] = React.useState<Key | null>(null)

  const registerItem = React.useCallback((key: Key, textValue: string, isDisabled?: boolean, icon?: React.ReactNode) => {
    registeredItemsRef.current.set(key, { key, textValue, isDisabled, icon })
    setRegisteredItems(Array.from(registeredItemsRef.current.values()))
  }, [])

  const unregisterItem = React.useCallback((key: Key) => {
    registeredItemsRef.current.delete(key)
    setRegisteredItems(Array.from(registeredItemsRef.current.values()))
  }, [])

  const items = externalItems && externalItems.length > 0 ? externalItems : registeredItems

  const filteredItems = React.useMemo(() => {
    if (!searchValue.trim()) return items
    const query = searchValue.toLowerCase()
    return items.filter(item => item.textValue.toLowerCase().includes(query))
  }, [items, searchValue])

  const visibleKeys = React.useMemo(() => new Set(filteredItems.map(item => item.key)), [filteredItems])
  const enabledFilteredItems = React.useMemo(() => filteredItems.filter(item => !item.isDisabled), [filteredItems])

  const navigateToNextItem = React.useCallback(() => {
    if (enabledFilteredItems.length === 0) return
    const idx = focusedKey !== null ? enabledFilteredItems.findIndex(item => item.key === focusedKey) : -1
    setFocusedKey(enabledFilteredItems[idx < enabledFilteredItems.length - 1 ? idx + 1 : 0].key)
  }, [enabledFilteredItems, focusedKey])

  const navigateToPrevItem = React.useCallback(() => {
    if (enabledFilteredItems.length === 0) return
    const idx = focusedKey !== null ? enabledFilteredItems.findIndex(item => item.key === focusedKey) : 0
    setFocusedKey(enabledFilteredItems[idx > 0 ? idx - 1 : enabledFilteredItems.length - 1].key)
  }, [enabledFilteredItems, focusedKey])

  React.useEffect(() => { if (!isOpen) setSearchValue("") }, [isOpen])

  React.useEffect(() => {
    if (focusedKey !== null && !visibleKeys.has(focusedKey)) {
      setFocusedKey(enabledFilteredItems.length > 0 ? enabledFilteredItems[0].key : null)
    }
  }, [visibleKeys, enabledFilteredItems, focusedKey])

  React.useEffect(() => {
    if (isOpen && searchValue) {
      setFocusedKey(enabledFilteredItems.length > 0 ? enabledFilteredItems[0].key : null)
    }
  }, [isOpen, searchValue, enabledFilteredItems])

  return {
    items, registerItem, unregisterItem,
    searchValue, setSearchValue,
    filteredItems, visibleKeys, enabledFilteredItems,
    focusedKey, setFocusedKey,
    navigateToNextItem, navigateToPrevItem,
  }
}
