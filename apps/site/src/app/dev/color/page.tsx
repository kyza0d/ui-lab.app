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

        <div className='w-full h-200 flex items-center justify-center'>
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
        </div>
      </div>
    </div>
  )
}
