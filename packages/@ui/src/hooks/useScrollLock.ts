import { useEffect } from "react"

let lockCount = 0

const SCROLL_KEYS = new Set([
  "ArrowUp", "ArrowDown", "Space", " ",
  "PageUp", "PageDown", "Home", "End",
])

function createPreventWheel(scrollableElement?: Element | null) {
  return (e: WheelEvent) => {
    if (scrollableElement?.contains(e.target as Node)) {
      return
    }
    e.preventDefault()
  }
}

function createPreventTouch(scrollableElement?: Element | null) {
  return (e: TouchEvent) => {
    if (scrollableElement?.contains(e.target as Node)) {
      return
    }
    e.preventDefault()
  }
}

function createPreventKeyScroll(scrollableElement?: Element | null) {
  return (e: KeyboardEvent) => {
    if (!SCROLL_KEYS.has(e.key)) return
    if (scrollableElement?.contains(document.activeElement as Node)) {
      return
    }
    e.preventDefault()
  }
}

export function useScrollLock(enabled: boolean, scrollableElement?: Element | null): void {
  useEffect(() => {
    if (!enabled) return

    const preventWheel = createPreventWheel(scrollableElement)
    const preventTouch = createPreventTouch(scrollableElement)
    const preventKeyScroll = createPreventKeyScroll(scrollableElement)

    lockCount++
    if (lockCount === 1) {
      document.addEventListener("wheel", preventWheel, { passive: false })
      document.addEventListener("touchmove", preventTouch, { passive: false })
      document.addEventListener("keydown", preventKeyScroll)
    }

    return () => {
      lockCount--
      if (lockCount === 0) {
        document.removeEventListener("wheel", preventWheel)
        document.removeEventListener("touchmove", preventTouch)
        document.removeEventListener("keydown", preventKeyScroll)
      }
    }
  }, [enabled, scrollableElement])
}
