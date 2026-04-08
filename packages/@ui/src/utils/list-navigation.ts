import * as React from "react"
import { type Key } from "@react-types/shared"

const DEFAULT_LIST_POINTER_KEYS = ['ArrowDown', 'ArrowUp', 'Home', 'End']

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

export function scrollItemIntoView(el: HTMLElement, behavior: ScrollBehavior = 'smooth') {
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
    scroller.scrollTo({ top: Math.max(0, scroller.scrollTop + itemTop - buffer), behavior })
  } else if (itemBottom > scroller.clientHeight - buffer) {
    scroller.scrollTo({ top: scroller.scrollTop + itemBottom - scroller.clientHeight + buffer, behavior })
  }
}

const TABBABLE_SELECTOR = [
  'a[href]',
  'button',
  'input',
  'select',
  'textarea',
  '[tabindex]',
  '[contenteditable="true"]',
].join(', ')

function isElementVisible(el: HTMLElement) {
  if (el.hidden) return false
  if (el.getAttribute('aria-hidden') === 'true') return false
  return el.getClientRects().length > 0
}

function isElementDisabled(el: HTMLElement) {
  return (
    el.hasAttribute('disabled') ||
    el.getAttribute('aria-disabled') === 'true' ||
    el.getAttribute('data-disabled') === 'true'
  )
}

function isElementTabbable(el: HTMLElement) {
  if (isElementDisabled(el) || !isElementVisible(el)) return false
  if (el.getAttribute('tabindex') === '-1') return false
  return el.tabIndex >= 0
}

export function focusAdjacentTabStop(
  from: HTMLElement,
  direction: 1 | -1,
  skipWithin?: HTMLElement | null,
) {
  const doc = from.ownerDocument
  const tabbableElements = Array.from(doc.querySelectorAll<HTMLElement>(TABBABLE_SELECTOR)).filter(isElementTabbable)
  const currentIndex = tabbableElements.indexOf(from)

  if (currentIndex === -1) return false

  for (let index = currentIndex + direction; index >= 0 && index < tabbableElements.length; index += direction) {
    const candidate = tabbableElements[index]
    if (!candidate) continue
    if (skipWithin?.contains(candidate)) continue
    candidate.focus({ preventScroll: true })
    return true
  }

  return false
}

interface UseListPointerModalityOptions {
  isOpen: boolean
  mouseMoveDetectedRef: React.MutableRefObject<boolean>
  keyboardKeys?: string[]
}

export function useListPointerModality({
  isOpen,
  mouseMoveDetectedRef,
  keyboardKeys = DEFAULT_LIST_POINTER_KEYS,
}: UseListPointerModalityOptions) {
  React.useEffect(() => {
    if (!isOpen) return

    const handleWindowKeyDown = (e: KeyboardEvent) => {
      if (keyboardKeys.includes(e.key)) {
        mouseMoveDetectedRef.current = false
      }
    }

    const handleWindowMouseMove = () => {
      if (!mouseMoveDetectedRef.current) {
        mouseMoveDetectedRef.current = true
      }
    }

    window.addEventListener('keydown', handleWindowKeyDown)
    window.addEventListener('mousemove', handleWindowMouseMove)

    return () => {
      window.removeEventListener('keydown', handleWindowKeyDown)
      window.removeEventListener('mousemove', handleWindowMouseMove)
    }
  }, [isOpen, keyboardKeys, mouseMoveDetectedRef])
}

interface UseListScrollIntoViewOptions {
  activeKey: Key | null
  container: HTMLElement | null
  isOpen: boolean
  mouseMoveDetectedRef: React.MutableRefObject<boolean>
  shouldScrollRef?: React.MutableRefObject<boolean>
  itemSelector?: string
  initialBehavior?: ScrollBehavior
  behavior?: ScrollBehavior
}

export function useListScrollIntoView({
  activeKey,
  container,
  isOpen,
  mouseMoveDetectedRef,
  shouldScrollRef,
  itemSelector = '[data-highlighted="true"], [data-focused="true"]',
  initialBehavior = 'instant',
  behavior = 'smooth',
}: UseListScrollIntoViewOptions) {
  const justOpenedRef = React.useRef(false)

  React.useEffect(() => {
    if (isOpen) {
      justOpenedRef.current = true
    }
  }, [isOpen])

  React.useEffect(() => {
    if (!isOpen || activeKey === null || !container) return

    const el = container.querySelector(itemSelector) as HTMLElement | null
    if (!el) return

    if (justOpenedRef.current) {
      justOpenedRef.current = false
      scrollItemIntoView(el, initialBehavior)
      if (shouldScrollRef) {
        shouldScrollRef.current = false
      }
      return
    }

    if (shouldScrollRef && !shouldScrollRef.current) return
    if (mouseMoveDetectedRef.current) return

    scrollItemIntoView(el, behavior)
    if (shouldScrollRef) {
      shouldScrollRef.current = false
    }
  }, [activeKey, behavior, container, initialBehavior, isOpen, itemSelector, mouseMoveDetectedRef, shouldScrollRef])
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

interface UseListNavigationOptions {
  isOpen: boolean
  externalItems?: ItemData[]
  filter?: (item: ItemData) => boolean
}

export function useListNavigation({ isOpen, externalItems, filter }: UseListNavigationOptions) {
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
    let result = items
    if (filter) {
      result = result.filter(filter)
    }
    if (!searchValue.trim()) return result
    const query = searchValue.toLowerCase()
    return result.filter(item => item.textValue.toLowerCase().includes(query))
  }, [items, searchValue, filter])

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
