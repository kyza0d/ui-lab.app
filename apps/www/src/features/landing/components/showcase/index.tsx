"use client";

import dynamic from "next/dynamic";
import { Grid } from "ui-lab-components";
import { IntegrationsPanel } from "./examples/integrations";
import { AIComposer } from "./examples/ai-composer";
import { MemberRolePanel } from "./examples/team-members";
import { TextEditor } from "./examples/text-editor";
import { FileBrowser } from "./examples/media-browser";

const SessionConfigPanel = dynamic(
  () => import("./examples/session-config").then((mod) => mod.SessionConfigPanel),
  { ssr: false }
);

export function Showcase() {
  return (
    <div className="bg-background-950 min-h-250">
      <Grid className="rounded-t-md bg-background-950 border-background-700" columns={{ sm: 1, md: 2 }} rows="masonry" alignItems="start" gap="md">
        <IntegrationsPanel />
        <AIComposer />
        <FileBrowser />
        <TextEditor />
        <SessionConfigPanel />
        <MemberRolePanel />
      </Grid>
    </div>
  );
}
