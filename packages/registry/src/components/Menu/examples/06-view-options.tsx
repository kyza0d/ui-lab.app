"use client";

import { useState } from "react";
import { Menu, Button } from "ui-lab-components";

export const metadata = {
  title: "View Options",
  description: "Mixed checkbox and radio items for toggling display state and selecting a single density.",
};

export default function Example() {
  const [showGrid, setShowGrid] = useState(true);
  const [showRulers, setShowRulers] = useState(false);
  const [density, setDensity] = useState("comfortable");

  return (
    <Menu type="pop-over">
      <Menu.Trigger>
        <Button>View</Button>
      </Menu.Trigger>
      <Menu.Content align="start">
        <Menu.Label>Display</Menu.Label>
        <Menu.CheckboxItem checked={showGrid} onCheckedChange={setShowGrid}>
          Show grid
        </Menu.CheckboxItem>
        <Menu.CheckboxItem checked={showRulers} onCheckedChange={setShowRulers}>
          Show rulers
        </Menu.CheckboxItem>
        <Menu.Separator />
        <Menu.Label>Density</Menu.Label>
        <Menu.RadioGroup value={density} onValueChange={setDensity}>
          <Menu.RadioItem value="compact">Compact</Menu.RadioItem>
          <Menu.RadioItem value="comfortable">Comfortable</Menu.RadioItem>
          <Menu.RadioItem value="spacious">Spacious</Menu.RadioItem>
        </Menu.RadioGroup>
      </Menu.Content>
    </Menu>
  );
}
