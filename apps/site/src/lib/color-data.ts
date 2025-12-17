import { cssToOklch, type OklchColor, type ShadeScale, type ColorRole } from './color-utils'

const SHADES: ShadeScale[] = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950]

export function getColorValue(role: ColorRole, shade: ShadeScale): OklchColor | null {
  if (typeof window !== 'undefined') {
    const css = getComputedStyle(document.documentElement)
      .getPropertyValue(`--${role}-${shade}`)
      .trim()
    return cssToOklch(css)
  }
  return null
}

export function getAllColorValues(role: ColorRole): Record<ShadeScale, OklchColor | null> {
  return SHADES.reduce((acc, shade) => {
    acc[shade] = getColorValue(role, shade)
    return acc
  }, {} as Record<ShadeScale, OklchColor | null>)
}

export const COLOR_FAMILIES = ['background', 'foreground', 'accent', 'success', 'danger', 'warning', 'info'] as const
export const COLOR_SHADES = SHADES
