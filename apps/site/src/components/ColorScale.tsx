'use client'

import { ColorSwatch } from './ColorSwatch'
import { useColorVariables } from '@/hooks/use-color-variables'
import { COLOR_SHADES } from '@/lib/color-data'
import { CHROMA_BOUNDARIES, type ColorRole, type ShadeScale } from '@/lib/color-utils'

interface ColorScaleProps {
  family: ColorRole
}

export function ColorScale({ family }: ColorScaleProps) {
  const colors = useColorVariables(family)
  const chromaBounds = CHROMA_BOUNDARIES[family]
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
          {family} Colors
        </h3>
        <p className="text-sm text-foreground-400">
          Chroma range: {chromaBounds.min.toFixed(3)} – {chromaBounds.max.toFixed(3)}
        </p>
      </div>

      {/* Single grid container with exactly 3 rows on md+ screens */}
      <div className="grid grid-rows-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-6 lg:grid-cols-4 gap-3 pb-8 border-b border-background-700">
        {/* Map all shades – the grid will automatically flow them into the defined columns/rows */}
        {COLOR_SHADES.map(renderSwatch)}
      </div>
    </div>
  )
}
