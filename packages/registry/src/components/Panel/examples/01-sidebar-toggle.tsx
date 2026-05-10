import { Panel } from "ui-lab-components";

export const metadata = {
  title: "Sidebar with Toggle",
  description: "Left sidebar that collapses and expands via a toggle button in the content area.",
};

export default function Example() {
  return (
    <Panel style={{ height: "400px" }} className="w-full border border-background-700 rounded-lg bg-background-900">
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
