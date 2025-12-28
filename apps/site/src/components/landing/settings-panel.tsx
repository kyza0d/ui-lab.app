"use client";

import { FaPaintbrush } from "react-icons/fa6";
import { Button } from "ui-lab-components";
import { useState } from "react";

export const SettingsPanel = () => {
  const [popupWindow, setPopupWindow] = useState<Window | null>(null);

  const openPopup = () => {
    // Check if existing popup is valid and open
    if (popupWindow && !popupWindow.closed) {
      popupWindow.focus();
      return;
    }

    const width = 400;
    const height = 600;
    // Calculate center or specific position
    const left = window.screen.width - width - 100;
    const top = 100;

    const win = window.open(
      "/settings-popup",
      "UILabSettings",
      `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`,
    );

    if (win) {
      setPopupWindow(win);
      win.focus();
    }
  };

  return (
    <Button
      variant="ghost"
      className="rounded-xl p-2 hover:bg-theme-border/30"
      aria-label="Open settings"
      title="Open theme settings"
      onClick={openPopup}
    >
      <FaPaintbrush />
    </Button>
  );
};
