'use client'

import { DevExampleLayout, type DevExample } from "../dev-example-layout";
import { Panel } from 'ui-lab-components'

function SidebarTogglePreview() {
  return (
    <Panel style={{ height: '400px' }} className="border border-background-700 rounded-lg bg-background-900 w-full">
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
          <p className="text-sm text-foreground-300">Click the toggle button to collapse/expand the sidebar.</p>
        </div>
      </Panel.Content>
    </Panel>
  );
}

function RightSidebarPreview() {
  return (
    <Panel style={{ height: '400px' }} className="border border-background-700 rounded-lg bg-background-900 w-full">
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
          <p className="text-sm text-foreground-300">Properties, details, or additional info.</p>
        </div>
      </Panel.Sidebar>
    </Panel>
  );
}

function ResizableHorizontalPreview() {
  return (
    <div style={{ height: '400px' }} className="border border-background-700 rounded-lg overflow-hidden bg-background-900 w-full">
      <Panel.Group direction="horizontal">
        <Panel>
          <Panel.Header sticky>
            <h3 className="font-semibold text-foreground-50">Left Panel</h3>
          </Panel.Header>
          <Panel.Content>
            <div className="p-4">
              <p className="text-sm text-foreground-300">Drag the resize handle to adjust the width.</p>
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
              <p className="text-sm text-foreground-300">Drag the handle between panels to resize.</p>
            </div>
          </Panel.Content>
        </Panel>
      </Panel.Group>
    </div>
  );
}

function ThreePanelPreview() {
  return (
    <div style={{ height: '400px' }} className="border border-background-700 rounded-lg overflow-hidden bg-background-900 w-full">
      <Panel.Group direction="horizontal">
        <Panel>
          <Panel.Header sticky><h3 className="font-semibold text-foreground-50">Panel 1</h3></Panel.Header>
          <Panel.Content><div className="p-4"><p className="text-sm text-foreground-300">First panel.</p></div></Panel.Content>
        </Panel>
        <Panel.Resize />
        <Panel>
          <Panel.Header sticky><h3 className="font-semibold text-foreground-50">Panel 2</h3></Panel.Header>
          <Panel.Content><div className="p-4"><p className="text-sm text-foreground-300">Middle panel.</p></div></Panel.Content>
        </Panel>
        <Panel.Resize />
        <Panel>
          <Panel.Header sticky><h3 className="font-semibold text-foreground-50">Panel 3</h3></Panel.Header>
          <Panel.Content><div className="p-4"><p className="text-sm text-foreground-300">Third panel.</p></div></Panel.Content>
        </Panel>
      </Panel.Group>
    </div>
  );
}

function VerticalResizablePreview() {
  return (
    <div style={{ height: '400px' }} className="border border-background-700 rounded-lg overflow-hidden bg-background-900 w-full">
      <Panel.Group direction="vertical">
        <Panel>
          <Panel.Header sticky><h3 className="font-semibold text-foreground-50">Top Panel</h3></Panel.Header>
          <Panel.Content><div className="p-4"><p className="text-sm text-foreground-300">Top panel with vertical resize.</p></div></Panel.Content>
        </Panel>
        <Panel.Resize />
        <Panel>
          <Panel.Header sticky><h3 className="font-semibold text-foreground-50">Bottom Panel</h3></Panel.Header>
          <Panel.Content><div className="p-4"><p className="text-sm text-foreground-300">Drag the horizontal handle to adjust height.</p></div></Panel.Content>
        </Panel>
      </Panel.Group>
    </div>
  );
}

const examples: DevExample[] = [
  {
    id: "sidebar-toggle",
    title: "Sidebar with Toggle",
    description: "Left sidebar that collapses and expands via a toggle button in the content area.",
    preview: <SidebarTogglePreview />,
  },
  {
    id: "right-sidebar",
    title: "Right Sidebar",
    description: "Sidebar positioned on the right, useful for properties panels and detail views.",
    preview: <RightSidebarPreview />,
  },
  {
    id: "resizable-horizontal",
    title: "Resizable Panels (Horizontal)",
    description: "Two horizontally split panels with a draggable resize handle.",
    preview: <ResizableHorizontalPreview />,
  },
  {
    id: "three-panels",
    title: "Three Resizable Panels",
    description: "Three panels sharing the container width with two resize handles.",
    preview: <ThreePanelPreview />,
  },
  {
    id: "vertical-resize",
    title: "Vertical Resizable Panels",
    description: "Two vertically stacked panels with a horizontal resize handle.",
    preview: <VerticalResizablePreview />,
  },
];

export default function PanelExamplesPage() {
  return (
    <DevExampleLayout
      title="Panel Examples"
      description="Layout panel patterns including collapsible sidebars and resizable split views."
      examples={examples}
      backHref="/dev/examples"
      backLabel="Examples"
    />
  );
}
