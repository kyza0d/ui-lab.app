'use client'

import { useColorVariables } from '../hooks/use-color-variables'
import { CHROMA_BOUNDARIES, getShadesForRole, oklchToHex, oklchToCss, type ColorRole } from '../lib/color-utils'
import { Divider } from 'ui-lab-components'
import { ColorPreviewCell, CopyableCell } from './color-table-cells'

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

  const colorRows = shadesForFamily
    .map(shade => ({ shade, color: colors[shade] }))
    .filter(item => item.color !== null)

  return (
    <div>
      <div className='mb-8'>
        <h3 className="text-md font-semibold text-foreground-100 capitalize">
          {family} Colors ({shadesForFamily.length} shades: {shadesForFamily[0]}–{shadesForFamily[shadesForFamily.length - 1]})
        </h3>
        <p className="text-sm text-foreground-400 mt-0!">
          Chroma range: {chromaBounds.min.toFixed(3)} – {chromaBounds.max.toFixed(3)}
        </p>
      </div>

      <div className="overflow-x-auto my-6 border border-background-800 rounded-sm">
        <table className="w-full text-xs">
          <thead className="bg-background-900 border-b border-background-800">
            <tr className="border-b border-background-800 last:border-b-0">
              <th className="px-4 py-3 text-left font-semibold text-foreground-200 w-[60px]"></th>
              <th className="px-4 py-3 text-left font-semibold text-foreground-200">Shade</th>
              <th className="px-4 py-3 text-left font-semibold text-foreground-200">Hex</th>
              <th className="px-4 py-3 text-left font-semibold text-foreground-200">CSS Variable</th>
              <th className="px-4 py-3 text-left font-semibold text-foreground-200">OKLCH</th>
            </tr>
          </thead>
          <tbody>
            {colorRows.map(({ shade, color }) => (
              <tr key={shade} className="border-b border-background-800 last:border-b-0">
                <td className="px-4 text-xs py-3 text-foreground-300">
                  <div className="flex justify-center">
                    <ColorPreviewCell oklch={color!} family={family} shade={shade.toString()} />
                  </div>
                </td>
                <td className="px-4 text-xs py-3 text-foreground-300">
                  <span className="font-semibold text-foreground-200">{shade}</span>
                </td>
                <td className="px-4 text-xs py-3 text-foreground-300">
                  <CopyableCell value={oklchToHex(color!)} label="hex" />
                </td>
                <td className="px-4 text-xs py-3 text-foreground-300">
                  <CopyableCell value={`--${family}-${shade}`} label="var" />
                </td>
                <td className="px-4 text-xs py-3 text-foreground-300">
                  <CopyableCell value={oklchToCss(color!)} label="oklch" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Divider variant='dashed' className='my-24' />
    </div>
  )
}
