'use client'

import { useEffect, useState, useRef } from 'react'
import { cssToOklch, getShadesForRole, type OklchColor, type ShadeScale, type ColorRole } from '../lib/color-utils'

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

export function useColorVariables(family: ColorRole): Partial<Record<ShadeScale, OklchColor | null>> {
  const [colors, setColors] = useState<Partial<Record<ShadeScale, OklchColor | null>>>({})
  const observerRef = useRef<MutationObserver | null>(null)

  useEffect(() => {
    const shades = getShadesForRole(family)

    const updateColors = () => {
      if (typeof window !== 'undefined') {
        const newColors = {} as Partial<Record<ShadeScale, OklchColor | null>>
        shades.forEach((shade: ShadeScale) => {
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
