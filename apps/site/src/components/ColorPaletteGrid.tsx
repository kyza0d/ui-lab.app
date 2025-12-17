'use client'

import { ColorScale } from './ColorScale'
import { COLOR_FAMILIES } from '@/lib/color-data'

export function ColorPaletteGrid() {
  return (
    <div className="space-y-8">
      {COLOR_FAMILIES.map(family => (
        <ColorScale key={family} family={family} />
      ))}
    </div>
  )
}
