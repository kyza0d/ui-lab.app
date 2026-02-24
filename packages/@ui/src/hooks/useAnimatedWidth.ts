import { useLayoutEffect, useRef } from 'react'

interface UseAnimatedWidthOptions {
  duration?: number
  easing?: string
  trigger?: any
}

/**
 * Animates the first child element's width when content changes.
 *
 * Root cause of the original failure: the wrapper div was being animated,
 * but the wrapper is transparent/borderless. The visible element (e.g., a button)
 * is display:inline-flex with content-based sizing — it was already at its new
 * natural size when the animation started, making the wrapper animation invisible.
 *
 * Fix: animate the child directly. The wrapper (align-self:flex-start, width:auto)
 * follows the child's animated width at each frame automatically — no wrapper
 * transition needed.
 */
export function useAnimatedWidth(options: UseAnimatedWidthOptions = {}) {
  const { duration = 300, easing = 'ease-out', trigger } = options
  const wrapperRef = useRef<HTMLDivElement>(null)
  const prevWidthRef = useRef<number | null>(null)

  useLayoutEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return

    const child = wrapper.firstElementChild as HTMLElement | null
    if (!child) return

    // One-time setup: align-self:flex-start prevents the wrapper from stretching
    // to fill the flex container (the default for flex children). With width:auto,
    // the wrapper sizes to its content (the child) and follows the child's width
    // during animation without needing its own CSS transition.
    if (!wrapper.style.alignSelf) {
      wrapper.style.alignSelf = 'flex-start'
      // Prevent text from wrapping to a second line when the child is compressed
      // during the "growing" phase of the animation.
      child.style.whiteSpace = 'nowrap'
    }

    // Clear any explicit width from a previous animation cycle so we can measure
    // the child's natural content width for the new trigger value.
    child.style.width = ''
    const newWidth = child.offsetWidth
    const oldWidth = prevWidthRef.current

    // First render: just record the natural width, no animation needed.
    if (oldWidth === null) {
      prevWidthRef.current = newWidth
      return
    }

    if (oldWidth === newWidth) return

    // Animation choreography:
    // 1. Lock child to old width (no transition) and clip overflow
    // 2. Force reflow so the browser records the old width as the "from" state
    // 3. rAF: enable transition + set new width → browser animates old → new
    //
    // The wrapper (width:auto, align-self:flex-start) follows the child's animated
    // width at each paint frame — no wrapper animation required.
    wrapper.style.overflow = 'hidden' // clip content that overflows during animation
    child.style.transition = 'none'
    child.style.width = oldWidth + 'px'

    child.offsetHeight // force reflow: browser commits old width as the transition "from" state

    requestAnimationFrame(() => {
      child.style.transition = `width ${duration}ms ${easing}`
      child.style.width = newWidth + 'px'

      // Restore overflow after animation so focus rings (box-shadow) aren't clipped
      const onDone = () => {
        wrapper.style.overflow = ''
        child.removeEventListener('transitionend', onDone)
        child.removeEventListener('transitioncancel', onDone)
      }
      child.addEventListener('transitionend', onDone)
      child.addEventListener('transitioncancel', onDone)
    })

    prevWidthRef.current = newWidth
  }, [trigger, duration, easing])

  return wrapperRef
}
