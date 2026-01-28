import React from 'react'
import { Button } from 'ui-lab-components'

export const metadata = {
  title: 'Button Variants',
  description: 'All available button variants including primary, default, secondary, outline, and ghost styles.'
}

export default function Example() {
  return (
    <div className="p-4 space-y-8">
      <div>
        <h3 className="text-sm font-semibold text-foreground-200 mb-3">Primary Variant</h3>
        <div className="flex gap-2 flex-wrap">
          <Button variant="primary">Primary Button</Button>
          <Button variant="primary" disabled>Disabled</Button>
        </div>
      </div>
    </div>
  )
}
