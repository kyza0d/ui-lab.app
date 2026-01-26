'use client'

import { useState } from 'react'
import { Color } from './Color'

export default function ColorTestPage() {
  const [color, setColor] = useState('#FF6B6B')

  return (
    <div className="min-h-screen bg-background-950 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-foreground-50">Color Component</h1>
        <p className="text-foreground-400 mb-8">
          Local test environment for refining the Color component design
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Color Component */}
          <div className="flex items-center justify-center">
            <Color
              value={color}
              onChange={(newColor) => {
                setColor(newColor)
                console.log('Color changed:', newColor)
              }}
            />
          </div>

          {/* Info Panel */}
          <div className="space-y-6">
            <div className="bg-background-900 border border-background-700 rounded-md p-6">
              <h2 className="text-lg font-semibold text-foreground-50 mb-4">Selected Color</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-foreground-400 mb-2">Hex Value</p>
                  <p className="text-foreground-300 font-mono text-lg">{color}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div
                    className="w-16 h-16 rounded-md border border-background-700"
                    style={{ backgroundColor: color }}
                  />
                  <div className="flex-1">
                    <p className="text-sm text-foreground-400 mb-2">Preview</p>
                    <p className="text-foreground-300 text-sm">Current selection</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-background-900 border border-background-700 rounded-md p-6">
              <h2 className="text-lg font-semibold text-foreground-50 mb-4">Features</h2>
              <ul className="space-y-2 text-sm text-foreground-400">
                <li className="flex items-start gap-2">
                  <span className="text-accent-500 mt-1">•</span>
                  <span>2D saturation/lightness canvas</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-500 mt-1">•</span>
                  <span>Horizontal hue slider (0-360°)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-500 mt-1">•</span>
                  <span>Optional opacity slider</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-500 mt-1">•</span>
                  <span>Recent colors history</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-500 mt-1">•</span>
                  <span>Hex and RGB format support</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-accent-500 mt-1">•</span>
                  <span>Manual color input</span>
                </li>
              </ul>
            </div>

            <div className="bg-background-900 border border-background-700 rounded-md p-6">
              <h2 className="text-lg font-semibold text-foreground-50 mb-4">Variants</h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-foreground-400 mb-2">Size Options</p>
                  <p className="text-foreground-300 text-sm">sm, md (default), lg</p>
                </div>
                <div>
                  <p className="text-sm text-foreground-400 mb-2">Format Options</p>
                  <p className="text-foreground-300 text-sm">hex (default), rgb</p>
                </div>
                <div>
                  <p className="text-sm text-foreground-400 mb-2">Props</p>
                  <p className="text-foreground-300 text-sm">showOpacity, showPreview, disabled</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
