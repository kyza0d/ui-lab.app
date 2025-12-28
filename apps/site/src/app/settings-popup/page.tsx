"use client";

import { SettingsContent } from "@/components/settings/settings-content";

export default function SettingsPopupPage() {
  return (
    <div className="w-screen h-screen overflow-hidden bg-background-900">
      <SettingsContent />
    </div>
  );
}
