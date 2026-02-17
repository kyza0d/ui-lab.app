import React from 'react'
import { Panel } from 'ui-lab-components'
import { ControlDef, ComponentDetail } from '@/types'

const panelControls: ControlDef[] = [
  {
    name: 'spacing',
    label: 'Spacing',
    type: 'select',
    options: [
      { label: 'None', value: 'none' },
      { label: 'Small', value: 'sm' },
      { label: 'Medium', value: 'md' },
      { label: 'Large', value: 'lg' },
    ],
    defaultValue: 'md',
  },
  {
    name: 'variant',
    label: 'Variant',
    type: 'select',
    options: [
      { label: 'Default', value: 'default' },
      { label: 'Compact', value: 'compact' },
    ],
    defaultValue: 'default',
  },
  {
    name: 'sticky',
    label: 'Sticky Header',
    type: 'toggle',
    defaultValue: true,
  },
]

const panelBasicCode = `import { Panel } from "ui-lab-components";

export function Example() {
  return (
    <Panel spacing="md">
      <Panel.Header sticky>
        <div className="p-4">Header</div>
      </Panel.Header>
      <Panel.Content>
        <div className="p-4">Content area</div>
      </Panel.Content>
      <Panel.Footer>
        <div className="p-4">Footer</div>
      </Panel.Footer>
    </Panel>
  );
}`

export const panelDetail: ComponentDetail = {
  id: 'panel',
  name: 'Panel',
  description: 'A flexible region coordinator that manages header, footer, and content areas with responsive stacking.',
  overview: (
    <div className="space-y-4 text-foreground-300">
      <p>
        The Panel component coordinates multiple page regions (header, content, footer) with unified
        spacing, responsive behavior, and sticky/fixed positioning support.
      </p>
      <p>
        Perfect for building page structures that need header, content, and footer regions. Provides
        context about responsive state so child components know when to collapse or reorganize.
      </p>
      <p>
        Use Panel.Header, Panel.Content, and Panel.Footer sub-components to organize your page regions.
      </p>
    </div>
  ),
  examples: [
    {
      id: 'preview',
      title: 'Preview',
      description: 'Adjust props to customize the panel',
      code: panelBasicCode,
      preview: (
        <div style={{ height: '300px', border: '1px solid var(--color-border)', borderRadius: '4px', overflow: 'hidden' }}>
          <Panel spacing="md">
            <Panel.Header sticky>
              <div
                style={{
                  padding: '1rem',
                  backgroundColor: 'var(--color-surface-secondary)',
                  borderBottom: '1px solid var(--color-border)',
                }}
              >
                Header
              </div>
            </Panel.Header>
            <Panel.Content>
              <div style={{ padding: '1rem' }}>Content area</div>
            </Panel.Content>
            <Panel.Footer>
              <div
                style={{
                  padding: '1rem',
                  backgroundColor: 'var(--color-surface-secondary)',
                  borderTop: '1px solid var(--color-border)',
                }}
              >
                Footer
              </div>
            </Panel.Footer>
          </Panel>
        </div>
      ),
      controls: panelControls,
      renderPreview: (props: any) => (
        <div style={{ height: '300px', border: '1px solid var(--color-border)', borderRadius: '4px', overflow: 'hidden' }}>
          <Panel spacing={props.spacing} variant={props.variant}>
            <Panel.Header sticky={props.sticky}>
              <div
                style={{
                  padding: '1rem',
                  backgroundColor: 'var(--color-surface-secondary)',
                  borderBottom: '1px solid var(--color-border)',
                }}
              >
                Header
              </div>
            </Panel.Header>
            <Panel.Content>
              <div style={{ padding: '1rem' }}>Content area</div>
            </Panel.Content>
            <Panel.Footer>
              <div
                style={{
                  padding: '1rem',
                  backgroundColor: 'var(--color-surface-secondary)',
                  borderTop: '1px solid var(--color-border)',
                }}
              >
                Footer
              </div>
            </Panel.Footer>
          </Panel>
        </div>
      ),
    },
  ],
}

export { panelControls }
