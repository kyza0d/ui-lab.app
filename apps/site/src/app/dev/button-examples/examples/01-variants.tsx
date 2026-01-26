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

      <div>
        <h3 className="text-sm font-semibold text-foreground-200 mb-3">Default Variant</h3>
        <div className="flex gap-2 flex-wrap">
          <Button variant="default">Default Button</Button>
          <Button variant="default" disabled>Disabled</Button>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-foreground-200 mb-3">Secondary Variant</h3>
        <div className="flex gap-2 flex-wrap">
          <Button variant="secondary">Secondary Button</Button>
          <Button variant="secondary" disabled>Disabled</Button>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-foreground-200 mb-3">Outline Variant</h3>
        <div className="flex gap-2 flex-wrap">
          <Button variant="outline">Outline Button</Button>
          <Button variant="outline" disabled>Disabled</Button>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-foreground-200 mb-3">Ghost Variant</h3>
        <div className="flex gap-2 flex-wrap">
          <Button variant="ghost">Ghost Button</Button>
          <Button variant="ghost" disabled>Disabled</Button>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-foreground-200 mb-3">Sizes</h3>
        <div className="flex gap-2 flex-wrap items-center">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
      </div>
    </div>
  )
}
