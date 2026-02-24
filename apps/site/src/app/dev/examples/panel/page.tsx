'use client'

import { Panel } from 'ui-lab-components'

const PanelExamplePage = () => {
  return (
    <div className="w-full max-w-6xl mx-auto p-8 space-y-12">
      <h1 className="text-4xl font-bold mb-8 text-foreground-50">Panel Component Examples</h1>

      {/* Example 1: Sidebar with Toggle */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground-50">Sidebar with Toggle</h2>
        <Panel style={{ height: '400px' }} className="border border-background-700 rounded-lg bg-background-900">
          <Panel.Sidebar side="left" defaultOpen width="200px" collapsedWidth="0">
            <div className="p-4">
              <h3 className="font-semibold mb-4 text-foreground-50">Sidebar</h3>
              <nav>
                <ul className="space-y-2">
                  <li className="text-sm text-foreground-300">Navigation Item 1</li>
                  <li className="text-sm text-foreground-300">Navigation Item 2</li>
                  <li className="text-sm text-foreground-300">Navigation Item 3</li>
                </ul>
              </nav>
            </div>
          </Panel.Sidebar>
          <Panel.Content>
            <div className="flex items-center gap-4 p-4 border-b border-background-700">
              <Panel.Toggle>
                <button className="px-2 py-2 bg-background-800 hover:bg-background-700 text-foreground-200 rounded text-sm font-medium transition-colors border border-background-700">
                  ☰
                </button>
              </Panel.Toggle>
              <h3 className="font-semibold text-foreground-50">Main Content</h3>
            </div>
            <div className="p-4 space-y-3">
              <p className="text-sm text-foreground-300">This is the main content area. Click the toggle button to collapse/expand the sidebar.</p>
              <p className="text-sm text-foreground-300">
                The sidebar smoothly transitions in and out of view with a 0.2s animation. You can place any content inside the sidebar.
              </p>
            </div>
          </Panel.Content>
        </Panel>
      </section>

      {/* Example 2: Right Sidebar */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground-50">Right Sidebar</h2>
        <Panel style={{ height: '400px' }} className="border border-background-700 rounded-lg bg-background-900">
          <Panel.Content>
            <div className="flex items-center justify-between p-4 border-b border-background-700">
              <h3 className="font-semibold text-foreground-50">Main Content</h3>
              <Panel.Toggle>
                <button className="px-2 py-2 bg-background-800 hover:bg-background-700 text-foreground-200 rounded text-sm font-medium transition-colors border border-background-700">
                  ☰
                </button>
              </Panel.Toggle>
            </div>
            <div className="p-4">
              <p className="text-sm text-foreground-300">Main content with a sidebar on the right side.</p>
            </div>
          </Panel.Content>
          <Panel.Sidebar side="right" defaultOpen width="180px" collapsedWidth="0">
            <div className="p-4 border-l border-background-700">
              <h3 className="font-semibold mb-4 text-foreground-50">Right Panel</h3>
              <div className="space-y-2">
                <p className="text-sm text-foreground-300">This sidebar appears on the right.</p>
                <p className="text-sm text-foreground-300">Properties panel, details, or additional information can go here.</p>
              </div>
            </div>
          </Panel.Sidebar>
        </Panel>
      </section>

      {/* Example 3: Resizable Panels */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground-50">Resizable Panels (Horizontal)</h2>
        <div style={{ height: '400px' }} className="border border-background-700 rounded-lg overflow-hidden bg-background-900">
          <Panel.Group direction="horizontal">
            <Panel>
              <Panel.Header sticky>
                <h3 className="font-semibold text-foreground-50">Left Panel</h3>
              </Panel.Header>
              <Panel.Content>
                <div className="p-4">
                  <p className="text-sm text-foreground-300">This is the left panel. Drag the resize handle to adjust the width.</p>
                </div>
              </Panel.Content>
            </Panel>
            <Panel.Resize />
            <Panel>
              <Panel.Header sticky>
                <h3 className="font-semibold text-foreground-50">Right Panel</h3>
              </Panel.Header>
              <Panel.Content>
                <div className="p-4">
                  <p className="text-sm text-foreground-300">This is the right panel. You can resize it by dragging the handle between panels.</p>
                </div>
              </Panel.Content>
            </Panel>
          </Panel.Group>
        </div>
      </section>

      {/* Example 4: Three Panels with Resize */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground-50">Three Resizable Panels</h2>
        <div style={{ height: '400px' }} className="border border-background-700 rounded-lg overflow-hidden bg-background-900">
          <Panel.Group direction="horizontal">
            <Panel>
              <Panel.Header sticky>
                <h3 className="font-semibold text-foreground-50">Panel 1</h3>
              </Panel.Header>
              <Panel.Content>
                <div className="p-4">
                  <p className="text-sm text-foreground-300">First panel with equal initial width.</p>
                </div>
              </Panel.Content>
            </Panel>
            <Panel.Resize />
            <Panel>
              <Panel.Header sticky>
                <h3 className="font-semibold text-foreground-50">Panel 2</h3>
              </Panel.Header>
              <Panel.Content>
                <div className="p-4">
                  <p className="text-sm text-foreground-300">Middle panel. All panels share the container width.</p>
                </div>
              </Panel.Content>
            </Panel>
            <Panel.Resize />
            <Panel>
              <Panel.Header sticky>
                <h3 className="font-semibold text-foreground-50">Panel 3</h3>
              </Panel.Header>
              <Panel.Content>
                <div className="p-4">
                  <p className="text-sm text-foreground-300">Third panel. Resize handles let you adjust proportions.</p>
                </div>
              </Panel.Content>
            </Panel>
          </Panel.Group>
        </div>
      </section>

      {/* Example 5: Vertical Resize */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-foreground-50">Vertical Resizable Panels</h2>
        <div style={{ height: '500px' }} className="border border-background-700 rounded-lg overflow-hidden bg-background-900">
          <Panel.Group direction="vertical">
            <Panel>
              <Panel.Header sticky>
                <h3 className="font-semibold text-foreground-50">Top Panel</h3>
              </Panel.Header>
              <Panel.Content>
                <div className="p-4">
                  <p className="text-sm text-foreground-300">Top panel with vertical resize.</p>
                </div>
              </Panel.Content>
            </Panel>
            <Panel.Resize />
            <Panel>
              <Panel.Header sticky>
                <h3 className="font-semibold text-foreground-50">Bottom Panel</h3>
              </Panel.Header>
              <Panel.Content>
                <div className="p-4">
                  <p className="text-sm text-foreground-300">Bottom panel. Drag the horizontal resize handle to adjust height.</p>
                </div>
              </Panel.Content>
            </Panel>
          </Panel.Group>
        </div>
      </section>
    </div>
  )
}

export default PanelExamplePage
