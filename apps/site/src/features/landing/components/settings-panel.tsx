"use client";

import { FaPaintRoller } from "react-icons/fa6";
import { Button, Tooltip } from "ui-lab-components";
import { useRef } from "react";
import dynamic from "next/dynamic";
import { Suspense } from "react";
const SettingsDialog = dynamic(
  () => import("@/features/theme/components/settings-dialog").then(mod => ({ default: mod.SettingsDialog })),
  { ssr: false }
);
import { useApp } from "@/features/theme";

export const SettingsPanel = () => {
  const { isSettingsPanelOpen, setIsSettingsPanelOpen } = useApp();
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <Tooltip showArrow content="Open Theme Settings" position="bottom" hint="t">
        <Button
          ref={buttonRef}
          variant="ghost"
          className="hover:text-foreground-300 transition-colors text-foreground-400 p-2 hover:bg-theme-border/30"
          onClick={() => setIsSettingsPanelOpen(!isSettingsPanelOpen)}
        >
          <FaPaintRoller size={14} />
        </Button>
      </Tooltip>
      <Suspense fallback={null}>
        <SettingsDialog
          isOpen={isSettingsPanelOpen}
          onOpenChange={setIsSettingsPanelOpen}
          triggerRef={buttonRef}
        />
      </Suspense>
    </>
  );
};
