'use client'

import { ColorSwatch } from './color-swatch'
import { useColorVariables } from '../hooks/use-color-variables'
import { CHROMA_BOUNDARIES, getShadesForRole, type ColorRole, type ShadeScale } from '../lib/color-utils'

interface ColorScaleProps {
  family: ColorRole
}

export function ColorScale({ family }: ColorScaleProps) {
  const colors = useColorVariables(family)
  const chromaBounds = CHROMA_BOUNDARIES[family]
  const shadesForFamily = getShadesForRole(family)
  const hasAnyColor = Object.values(colors).some(c => c !== null)

  if (!hasAnyColor) {
    return <div className="text-foreground-400">No color data available</div>
  }

  const renderSwatch = (shade: ShadeScale) => {
    const color = colors[shade]
    if (!color) return null
    return <ColorSwatch key={shade} family={family} shade={shade} oklch={color} />
  }

  return (
    <div className="mb-12">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground-100 capitalize mb-2">
          {family} Colors ({shadesForFamily.length} shades: {shadesForFamily[0]}–{shadesForFamily[shadesForFamily.length - 1]})
        </h3>
        <p className="text-sm text-foreground-400">
          Chroma range: {chromaBounds.min.toFixed(3)} – {chromaBounds.max.toFixed(3)}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pb-8 border-b border-background-700">
        {shadesForFamily.map(renderSwatch)}
      </div>
    </div>
  )
}
