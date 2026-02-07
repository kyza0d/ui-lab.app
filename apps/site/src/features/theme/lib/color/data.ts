import type { OklchColor, ShadeScale, ColorRole } from './types'
import { cssToOklch } from './conversions'
import { getShadesForRole } from './scales'

export function getColorValue(role: ColorRole, shade: ShadeScale): OklchColor | null {
  if (typeof window !== 'undefined') {
    const css = getComputedStyle(document.documentElement)
      .getPropertyValue(`--${role}-${shade}`)
      .trim()
    return cssToOklch(css)
  }
  return null
}

export function getAllColorValues(role: ColorRole): Partial<Record<ShadeScale, OklchColor | null>> {
  const shades = getShadesForRole(role);
  return shades.reduce((acc, shade) => {
    acc[shade] = getColorValue(role, shade)
    return acc
  }, {} as Partial<Record<ShadeScale, OklchColor | null>>)
}

export const COLOR_FAMILIES = ['background', 'foreground', 'accent', 'success', 'danger', 'warning', 'info'] as const;

export function getColorShades(role?: ColorRole): ShadeScale[] {
  return role ? getShadesForRole(role) : [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
}

export const COLOR_SHADES = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;
