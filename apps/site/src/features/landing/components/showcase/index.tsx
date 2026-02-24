"use client";

import { Checkbox, Divider, Grid } from "ui-lab-components";
import { BuildStatus } from "./examples/deployments";
import { IntegrationsPanel } from "./examples/integrations";
import { AIComposer } from "./examples/ai-composer";
import { SessionConfigPanel } from "./examples/session-config";
import { MemberRolePanel } from "./examples/team-members";
import { TextEditor } from "./examples/text-editor";
import { FileBrowser } from "./examples/media-browser";
import { FormInputs } from "./examples/account-settings";
import { TogglesAndSwitches } from "./examples/preferences";

export function Showcase() {
  return (
    <div className="bg-background-950 min-h-300 overflow-hidden">
      <Grid columns={{ sm: "1", md: "2", lg: "3" }} rows="masonry" alignItems="start" gap="md">
        <AIComposer />
        <TogglesAndSwitches />
        <TextEditor />
        <div>
          <BuildStatus />
          <div className="px-4 py-3">
            <div className="text-xs text-foreground-400 mb-2">Notifications</div>
            <Divider size="sm" spacing="none" className="mt-2 mb-6" />
            <div className="flex items-start flex-col gap-1.5">
              <Checkbox id="fi-notif-3" label="Weekly digest" defaultChecked />
              <Checkbox id="fi-notif-2" label="Marketing emails" />
            </div>
          </div>
        </div>
        <IntegrationsPanel />
        <FormInputs />
        <FileBrowser />
        <SessionConfigPanel />
        <MemberRolePanel />
      </Grid>
    </div>
  );
}
