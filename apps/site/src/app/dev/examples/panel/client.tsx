'use client'

import { DevExampleLayout, type DevExample } from "../dev-example-layout";
import { Panel } from 'ui-lab-components'


function SidebarTogglePreview() {
  return (
    <Panel style={{ height: '400px' }} className="w-150 border border-background-700 rounded-lg bg-background-900">
      <Panel.Sidebar side="left" defaultOpen width="200px" collapsedWidth="0">
      </Panel.Sidebar>
      <Panel.Content>
        <Panel.Toggle>
          <button>☰</button>
        </Panel.Toggle>
      </Panel.Content>
    </Panel>
  );
}

const examples: DevExample[] = [
  {
    id: "sidebar-toggle",
    title: "Sidebar with Toggle",
    description: "Left sidebar that collapses and expands via a toggle button in the content area.",
    preview: <SidebarTogglePreview />,
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
