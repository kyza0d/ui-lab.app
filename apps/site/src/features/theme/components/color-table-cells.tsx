'use client'

import { useState } from 'react'
import type { OklchColor } from '../lib/color-utils'

interface ColorPreviewCellProps {
  oklch: OklchColor
  family: string
  shade: string
}

export function ColorPreviewCell({ oklch, family, shade }: ColorPreviewCellProps) {
  const cssValue = `oklch(${(oklch.l * 100).toFixed(1)}% ${oklch.c.toFixed(3)} ${oklch.h.toFixed(1)})`

  return (
    <div
      className="w-7 h-7 rounded-sm border border-background-700"
      style={{ backgroundColor: cssValue }}
      title={`${family} ${shade}`}
    />
  )
}

interface CopyableCellProps {
  value: string
  label: string
}

export function CopyableCell({ value, label }: CopyableCellProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      className="w-full text-left font-mono text-sm hover:text-foreground-100 transition-colors"
      title={value}
    >
      {copied ? (
        <span className="text-foreground-400/60 font-bold">Copied!</span>
      ) : (
        <span className="text-foreground-400 truncate">{value}</span>
      )}
    </button>
  )
}
