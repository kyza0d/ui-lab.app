'use client'

import { useEffect, useState, useRef } from 'react'
import { cssToOklch, type OklchColor, type ShadeScale, type ColorRole } from '@/lib/color-utils'

export function useColorVariable(family: ColorRole, shade: ShadeScale): OklchColor | null {
  const [color, setColor] = useState<OklchColor | null>(null)
  const observerRef = useRef<MutationObserver | null>(null)

  useEffect(() => {
    const updateColor = () => {
      if (typeof window !== 'undefined') {
        const css = getComputedStyle(document.documentElement)
          .getPropertyValue(`--${family}-${shade}`)
          .trim()
        const oklch = cssToOklch(css)
        setColor(oklch)
      }
    }

    updateColor()

    observerRef.current = new MutationObserver(() => {
      updateColor()
    })

    observerRef.current.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['style'],
    })

    return () => {
      observerRef.current?.disconnect()
    }
  }, [family, shade])

  return color
}

export function useColorVariables(family: ColorRole): Record<ShadeScale, OklchColor | null> {
  const [colors, setColors] = useState<Record<ShadeScale, OklchColor | null>>({} as any)
  const observerRef = useRef<MutationObserver | null>(null)
  const SHADES: ShadeScale[] = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]

  useEffect(() => {
    const updateColors = () => {
      if (typeof window !== 'undefined') {
        const newColors = {} as Record<ShadeScale, OklchColor | null>
        SHADES.forEach(shade => {
          const css = getComputedStyle(document.documentElement)
            .getPropertyValue(`--${family}-${shade}`)
            .trim()
          newColors[shade] = cssToOklch(css)
        })
        setColors(newColors)
      }
    }

    updateColors()

    observerRef.current = new MutationObserver(() => {
      updateColors()
    })

    observerRef.current.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['style'],
    })

    return () => {
      observerRef.current?.disconnect()
    }
  }, [family])

  return colors
}
