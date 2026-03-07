"use client";

import { Checkbox, Divider, Grid } from "ui-lab-components";
import { BuildStatus } from "./examples/deployments";
import { IntegrationsPanel } from "./examples/integrations";
import { AIComposer } from "./examples/ai-composer";
import { SessionConfigPanel } from "./examples/session-config";
import { MemberRolePanel } from "./examples/team-members";
import { TextEditor } from "./examples/text-editor";
import { FileBrowser } from "./examples/media-browser";

export function Showcase() {
  return (
    <div className="bg-background-950 min-h-300 overflow-hidden">
      <Grid columns={{ sm: "1", md: "2" }} rows="masonry" alignItems="start" gap="md">
        <TextEditor />
        <IntegrationsPanel />
        <AIComposer />
        <FileBrowser />
        <SessionConfigPanel />
        <MemberRolePanel />
      </Grid>
    </div>
  );
}
