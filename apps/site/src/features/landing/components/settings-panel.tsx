"use client";

import { FaPaintRoller } from "react-icons/fa6";
import { Button } from "ui-lab-components";
import { useRef, useState } from "react";
import { SettingsDialog } from "@/features/theme/components/settings-dialog";

export const SettingsPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <Button
        ref={buttonRef}
        variant="ghost"
        className="rounded-xl p-2 hover:bg-theme-border/30"
        aria-label="Open settings"
        title="Open theme settings"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaPaintRoller size={14} className="text-foreground-300" />
      </Button>
      <SettingsDialog
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        triggerRef={buttonRef}
      />
    </>
  );
};
