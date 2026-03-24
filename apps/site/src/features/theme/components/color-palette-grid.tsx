'use client'

import { ColorScale } from './color-scale'
import { COLOR_FAMILIES } from '../lib/color-utils'

export default function ColorPaletteGrid() {
  return (
    <div>
      {COLOR_FAMILIES.map(family => (
        <ColorScale key={family} family={family} />
      ))}
    </div>
  )
}
