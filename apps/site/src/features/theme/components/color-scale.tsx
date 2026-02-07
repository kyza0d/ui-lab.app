'use client'

import { useColorVariables } from '../hooks/use-color-variables'
import { CHROMA_BOUNDARIES, getShadesForRole, oklchToHex, oklchToCss, type ColorRole } from '../lib/color-utils'
import { Table } from '@/features/docs'
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

  type ColorRow = typeof colorRows[number]

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

      <Table<ColorRow>
        data={colorRows}
        columns={[
          {
            key: 'color' as const,
            label: '',
            width: '60px',
            render: (_, row) => (
              <div className="flex justify-center">
                <ColorPreviewCell oklch={row.color!} family={family} shade={row.shade.toString()} />
              </div>
            ),
          },
          {
            key: 'shade' as const,
            label: 'Shade',
            render: (value) => <span className="font-semibold text-foreground-200">{value}</span>,
          },
          {
            key: 'shade' as const,
            label: 'Hex',
            render: (_, row) => (
              <CopyableCell value={oklchToHex(row.color!)} label="hex" />
            ),
          },
          {
            key: 'shade' as const,
            label: 'CSS Variable',
            render: (_, row) => (
              <CopyableCell value={`--${family}-${row.shade}`} label="var" />
            ),
          },
          {
            key: 'shade' as const,
            label: 'OKLCH',
            render: (_, row) => (
              <CopyableCell value={oklchToCss(row.color!)} label="oklch" />
            ),
          },
        ]}
      />

      <Divider variant='dashed' className='my-24' />
    </div>
  )
}
