"use client";

import { FaGear } from "react-icons/fa6";
import { Button } from "ui-lab-components";
import { useRef, useState } from "react";
import { FloatingSettingsDialog } from "@/features/theme/components/floating-settings-dialog";

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
        <FaGear className="text-foreground-300" />
      </Button>
      <FloatingSettingsDialog
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        triggerRef={buttonRef}
      />
    </>
  );
};
