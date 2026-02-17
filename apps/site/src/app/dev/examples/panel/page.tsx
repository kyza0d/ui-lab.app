'use client'

import { Panel } from '@ui/components'

export default function PanelExamples() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', padding: '2rem' }}>
      <section>
        <h2>Default Panel (md spacing)</h2>
        <div
          style={{
            height: '600px',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            overflow: 'hidden',
          }}
        >
          <Panel spacing="md">
            <Panel.Header sticky>
              <div
                style={{
                  padding: '1rem',
                  backgroundColor: 'var(--color-surface-secondary)',
                  borderBottom: '1px solid var(--color-border)',
                }}
              >
                Header (sticky)
              </div>
            </Layout.Header>
            <Panel.Content>
              <div style={{ padding: '1rem', overflow: 'auto' }}>
                <h3>Main Content</h3>
                <p>This is the main content area. It will grow to fill available space.</p>
                {Array.from({ length: 20 }).map((_, i) => (
                  <p key={i}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua.
                  </p>
                ))}
              </div>
            </Layout.Content>
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
            </Layout.Footer>
          </Layout>
        </div>
      </section>

      <section>
        <h2>Compact Panel (sm spacing)</h2>
        <div
          style={{
            height: '400px',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            overflow: 'hidden',
          }}
        >
          <Panel spacing="sm" variant="compact">
            <Panel.Header sticky>
              <div
                style={{
                  padding: '0.75rem',
                  backgroundColor: 'var(--color-surface-secondary)',
                  borderBottom: '1px solid var(--color-border)',
                  fontSize: '0.875rem',
                }}
              >
                Compact Header
              </div>
            </Layout.Header>
            <Panel.Content>
              <div style={{ padding: '0.75rem' }}>Content area</div>
            </Layout.Content>
            <Panel.Footer>
              <div
                style={{
                  padding: '0.75rem',
                  backgroundColor: 'var(--color-surface-secondary)',
                  borderTop: '1px solid var(--color-border)',
                  fontSize: '0.875rem',
                }}
              >
                Compact Footer
              </div>
            </Layout.Footer>
          </Layout>
        </div>
      </section>

      <section>
        <h2>No Sticky Header</h2>
        <div
          style={{
            height: '400px',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            overflow: 'hidden',
          }}
        >
          <Panel>
            <Panel.Header sticky={false}>
              <div
                style={{
                  padding: '1rem',
                  backgroundColor: 'var(--color-surface-secondary)',
                  borderBottom: '1px solid var(--color-border)',
                }}
              >
                Static Header
              </div>
            </Layout.Header>
            <Panel.Content>
              <div style={{ padding: '1rem', overflow: 'auto' }}>
                {Array.from({ length: 10 }).map((_, i) => (
                  <p key={i}>Scrollable content {i + 1}</p>
                ))}
              </div>
            </Layout.Content>
          </Layout>
        </div>
      </section>

      <section>
        <h2>Large Spacing</h2>
        <div
          style={{
            height: '300px',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            overflow: 'hidden',
          }}
        >
          <Panel spacing="lg">
            <Panel.Header>
              <div
                style={{
                  padding: '1rem',
                  backgroundColor: 'var(--color-surface-secondary)',
                  borderBottom: '1px solid var(--color-border)',
                }}
              >
                Header
              </div>
            </Layout.Header>
            <Panel.Content>
              <div style={{ padding: '1rem' }}>Content</div>
            </Layout.Content>
          </Layout>
        </div>
      </section>

      <p style={{ marginTop: '2rem', fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
        Resize your browser window to see the responsive stacking behavior at &lt;768px width.
      </p>
    </div>
  )
}
