'use client'

import { useState } from 'react'
import { oklchToHex, oklchToCss, type OklchColor, type ShadeScale, type ColorRole } from '@/lib/color-utils'

interface ColorSwatchProps {
  family: ColorRole
  shade: ShadeScale
  oklch: OklchColor
}

export function ColorSwatch({ family, shade, oklch }: ColorSwatchProps) {
  const [copied, setCopied] = useState<string | null>(null)
  const cssVar = `--${family}-${shade}`
  const cssValue = oklchToCss(oklch)
  const hexValue = oklchToHex(oklch)

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    setCopied(label)
    setTimeout(() => setCopied(null), 2000)
  }

  // Helper to render copy status or the actual value
  const renderCopyLabel = (label: string, value: string) => {
    if (copied === label) return <span className="text-green-500 font-bold">Copied!</span>
    return value
  }

  return (
    <div className="flex flex-col p-1 bg-background-900 border border-background-700 w-full rounded-md overflow-hidden h-full group">
      {/* Color Preview - Fills width, fixed height for consistency */}
      <div
        className="w-full h-30 rounded-md border border-background-700"
        style={{ backgroundColor: cssValue }}
        title={`${family} ${shade}`}
      />

      {/* Info Container */}
      <div className="flex flex-col text-xs">

        {/* Header: Shade + Hex */}
        <div className="flex p-1 mt-1 justify-between items-between">
          <span className="font-semibold text-foreground-200">{shade}</span>
          <button
            onClick={() => handleCopy(hexValue, 'hex')}
            className="font-mono text-foreground-400 hover:text-foreground-100 transition-colors uppercase"
            title="Copy Hex"
          >
            {renderCopyLabel('hex', hexValue)}
          </button>
        </div>

        {/* Details: CSS Var + OKLCH */}
        <div className="space-y-1.5 border-t border-background-700 p-2 font-mono text-[10px] sm:text-xs text-foreground-500">
          <button
            className="block w-full text-left truncate hover:text-foreground-300 transition-colors"
            onClick={() => handleCopy(cssVar, 'var')}
            title={cssVar}
          >
            {renderCopyLabel('var', cssVar)}
          </button>

          <button
            className="block w-full text-left truncate hover:text-foreground-300 transition-colors"
            onClick={() => handleCopy(cssValue, 'oklch')}
            title={cssValue}
          >
            {copied === 'oklch'
              ? <span className="text-green-500 font-bold">Copied!</span>
              : `oklch(${Math.round(oklch.l * 100)}% ${oklch.c.toFixed(3)} ${oklch.h.toFixed(1)})`
            }
          </button>
        </div>
      </div>
    </div>
  )
}
